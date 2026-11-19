import "module-alias/register";
import express, { Request } from "express";
import logger from "@/utils/logger";
import morganMiddleware from "@/rest/middlewares/logger";
import { registerRoute } from "./routes";
import { swaggerDocs } from "./swagger";
import "dotenv/config";
import { AppDataSource } from "@/data-source";
import cors from "cors";
import cron from 'node-cron';
import { cronPertitik } from "./cron/dataPertitik";
import { cronProduksi } from "./cron/cronProduksi";
import { cronOperator } from "./cron/cronOperator";
import { cronOD } from "./cron/cronOD";
import { Moda } from "@/type/produksi.titik.type";
import pMap from "p-map";
import { DataSync } from "@/entities/DataSync";
import moment from "moment";
import { DataSyncHubnet } from "@/entities/DataSyncHubnet";
import { every, values } from "lodash";
// import { runPendingSyncByPartialStatus } from "@/minapp/test";
import { clearCache } from "./middlewares/cache";
import { withLock } from "@/utils/cronLock";

const app = express();
const port = process.env.PORT || 3003;

AppDataSource.initialize()
  .then(() => {
    // runPendingSyncByPartialStatus();

    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(cors<Request>());

app.use(morganMiddleware);

swaggerDocs(app);
registerRoute(app);

const modaList: Moda[] = ["jalan", "asdp", "arteri", "toll", "laut", "udara", "stasiun"];

// job pertitik — staggered to :07,:27,:47 to avoid overlapping with produksi at :02,:12,...
cron.schedule("7,27,47 * * * *", async () => {
  await withLock("cron:pertitik", async () => {
    console.log("Cron Pertitik started...");
    for (const moda of modaList) {
      try {
        await cronPertitik({ moda });
        await cronPertitik({ moda, isEvent: true });
        await cronOD({ moda });
        await cronOperator({ moda });
        console.log(`done cronPertitik ${moda}`);
      } catch (err) {
        console.error(`Error cronPertitik ${moda}:`, err);
      }
    }
    await clearCache("/v2/");
    console.log("-----cron pertitik finished-----");
  });
});

// job produksi — staggered to :02,:12,...,:52 to avoid overlapping with pertitik at :07,:27,:47
cron.schedule("2,12,22,32,42,52 * * * *", async () => {
  await withLock("cron:produksi", async () => {
    console.log("Cron Produksi started...");
    for (const moda of modaList) {
      try {
        await cronProduksi({ moda });
        await cronProduksi({ moda, isEvent: true });
        console.log(`done cronProduksi ${moda}`);
      } catch (err) {
        console.error(`Error cronProduksi ${moda}:`, err);
      }
    }
    await clearCache("/v2/");
    console.log("-----cron produksi finished-----");
  });
});


// job pertitik ke tabel partitioned — terpisah dari job pertitik (data_matriks) di atas,
// lock berbeda, menit berbeda (:17,:37,:57) supaya tidak menumpuk dengan job lain
cron.schedule("17,37,57 * * * *", async () => {
  await withLock("cron:pertitik-partitioned", async () => {
    console.log("Cron Pertitik Partitioned started...");
    for (const moda of modaList) {
      try {
        await cronPertitik({ moda, target: "partitioned" });
        await cronPertitik({ moda, isEvent: true, target: "partitioned" });
        console.log(`done cronPertitik partitioned ${moda}`);
      } catch (err) {
        console.error(`Error cronPertitik partitioned ${moda}:`, err);
      }
    }
    await clearCache("/v2/");
    console.log("-----cron pertitik partitioned finished-----");
  });
});

// backfill 30 hari ke tabel partitioned, terpisah dari backfill 01:30
cron.schedule("30 3 * * *", async () => {
  await withLock("cron:daily-backfill-partitioned", async () => {
    console.log("Starting 03:30 Cron Job for Pertitik partitioned");
    const startDate = moment().subtract(30, "days").format("YYYY-MM-DD");
    const endDate = moment().format("YYYY-MM-DD");

    for (const moda of modaList) {
      try {
        await cronPertitik({ moda, startDate, endDate, target: "partitioned" });
        await cronPertitik({ moda, startDate, endDate, isEvent: true, target: "partitioned" });
      } catch (err) {
        console.error(`[03:30] Error partitioned ${moda}:`, err);
      }
    }
    await clearCache("/v2/");
    console.log("-----03:30 Cron Job partitioned completed-----");
  }, 2 * 60 * 60 * 1000);
});


//  job db
const VALID_MODAS_DB = ["jalan", "asdp", "laut", "udara", "stasiun", "toll", "arteri", "lalin_tol", "ka"];
const MODA_MAP: Record<string, string> = { lalin_tol: "toll", ka: "stasiun" };
const DBSYNC_BATCH_SIZE = 100;
const DBSYNC_LOOKBACK_DAYS = 30;

cron.schedule('40 * * * *', async () => {
  await withLock("cron:dbsync", async () => {
    try {
      console.log('Checking for pending tasks at', new Date().toISOString());

      const dataSync = AppDataSource.getRepository(DataSyncHubnet);
      const minDate = moment().subtract(DBSYNC_LOOKBACK_DAYS, "days").format("YYYY-MM-DD");
      const pendingTasks = await dataSync
        .createQueryBuilder("s")
        .where("(s.statusMatriks = :f OR s.statusOD = :f OR s.statusOperator = :f)", { f: false })
        .andWhere("s.moda IN (:...modas)", { modas: VALID_MODAS_DB })
        .andWhere("s.dateHit >= :minDate", { minDate })
        .orderBy("s.dateHit", "DESC")
        .take(DBSYNC_BATCH_SIZE)
        .getMany();

      if (pendingTasks.length === 0) {
        console.log('No pending tasks to process');
        return;
      }

      console.log(`Processing ${pendingTasks.length} pending tasks`);

      await pMap(
        pendingTasks,
        async (item) => {
          const { moda, dateHit, id, statusMatriks, statusOD, statusOperator } = item;
          const modaLower = (MODA_MAP[moda.toLowerCase()] ?? moda.toLowerCase()) as Moda;
          const tmpStatus = { od: statusOD, matriks: statusMatriks, operator: statusOperator };

          const dateStr = moment(dateHit).format("YYYY-MM-DD");

          try {
            await dataSync.update({ id }, { syncAt: moment().toISOString() });

            // =====  Matrik (Produksi + Pertitik) =====
            if (!statusMatriks) {
              try {
                await cronProduksi({ moda: modaLower, startDate: dateStr, endDate: dateStr });
                await cronPertitik({ moda: modaLower, startDate: dateStr, endDate: dateStr });
                tmpStatus.matriks = true;
                console.log(`[Matrik Done] ID ${id} → ${modaLower}`);
              } catch (matrikError) {
                console.error(`[Matrik Error] ID ${id}`, matrikError);
                tmpStatus.matriks = false;
              }
            }

            // ===== Operator =====
            if (!statusOperator) {
              try {
                await cronOperator({ moda: modaLower, startDate: dateStr, endDate: dateStr });
                tmpStatus.operator = true;
                console.log(`[Operator Done] ID ${id} → ${modaLower}`);
              } catch (operatorError) {
                console.error(`[Operator Error] ID ${id}`, operatorError);
                tmpStatus.operator = false;
              }
            }

            // ===== OD =====
            if (!statusOD) {
              try {
                await cronOD({ moda: modaLower, startDate: dateStr, endDate: dateStr });
                tmpStatus.od = true;
                console.log(`[OD Done] ID ${id} → ${modaLower}`);
              } catch (odError) {
                console.error(`[OD Error] ID ${id}`, odError);
                tmpStatus.od = false;
              }
            }

            const allTrue = every(values(tmpStatus), Boolean);

            await dataSync.update({ id }, {
              statusOD: tmpStatus.od,
              statusMatriks: tmpStatus.matriks,
              statusOperator: tmpStatus.operator,
              completedAt: moment().format("YYYY-MM-DD HH:mm:ssZ"),
              status: allTrue,
            });

          } catch (err) {
            console.error(`[Task Error] ID ${id}`, err);
          }
        },
        { concurrency: 2 }
      );
      await clearCache("/v2/");
    } catch (error) {
      console.error('Fatal error in cron task:', error);
    }
  }); // end withLock
});

cron.schedule("30 1 * * *", async () => {
  await withLock("cron:daily-backfill", async () => {
    console.log("Starting 01:30 Cron Job for Pertitik and Produksi");
    const startDate = moment().subtract(30, "days").format("YYYY-MM-DD");
    const endDate = moment().format("YYYY-MM-DD");

    for (const moda of modaList) {
      try {
        console.log(`[01:30] Running cronPertitik for ${moda}`);
        await cronPertitik({ moda, startDate, endDate });
        await cronPertitik({ moda, startDate, endDate, isEvent: true });

        console.log(`[01:30] Running cronProduksi for ${moda}`);
        await cronProduksi({ moda, startDate, endDate });
        await cronProduksi({ moda, isEvent: true, startDate, endDate });
        console.log(`[01:30] Finished both jobs for ${moda}`);
      } catch (err) {
        console.error(`[01:30] Error in ${moda}:`, err);
      }
    }
    await clearCache("/v2/");
    console.log("-----01:30 Cron Job completed-----");
  }, 2 * 60 * 60 * 1000); // 2h TTL for the daily backfill
});


app.listen(port, () => {
  const environment = process.env.NODE_ENV;
  logger.info(`Server running at port :${port} in ${environment} mode`);
});
