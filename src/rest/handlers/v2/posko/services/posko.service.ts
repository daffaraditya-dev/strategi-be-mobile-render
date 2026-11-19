import { AppDataSource } from "@/data-source";
import { FileUpload } from "@/entities/FileUpload";
import { LaporanPosko } from "@/entities/LaporanPosko";
import { getDataEvent } from "@/services/apiHubnet";
import { randomUUID } from "crypto";
import { compact, isEmpty } from "lodash";
import { Brackets } from "typeorm";

function isUUID(str: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    str,
  );
}

async function getFilesByPaths(files: string[]) {
  if (!files?.length) return [];

  const normalized = files
    .map((f) => {
      if (!f) return null;

      if (isUUID(f)) return f;

      if (f.includes("/")) {
        return f.substring(f.lastIndexOf("/") + 1);
      }

      return f;
    })
    .filter(Boolean) as string[];

  const repo = AppDataSource.getRepository(FileUpload);
  const qb = repo.createQueryBuilder("f");

  normalized.forEach((token, i) => {
    if (isUUID(token)) {
      qb.orWhere(`f.id = :id${i}`, { [`id${i}`]: token });
    } else {
      qb.orWhere(`f.path LIKE :p${i}`, { [`p${i}`]: `%${token}%` });
    }
  });

  const rows = await qb.getMany();

  return rows.map((r) => {
    const p = r.path ?? "";
    return p.substring(p.lastIndexOf("/") + 1);
  });
}

async function getFilesByIds(ids: string[]) {
  if (!ids.length) return [];
  const repo = AppDataSource.getRepository(FileUpload);
  return await repo
    .createQueryBuilder("f")
    .where("f.id IN (:...ids)", { ids })
    .getMany();
}

const HOST_30S = `https://strategi.kemenhub.go.id/api/getFile`;

export const createLaporanPosko = async (payload: {
  judulLaporan?: string;
  tanggalLaporan?: string;
  deskripsi?: string;
  userId?: string;
  uploadedFiles?: string[];
  eventId?: number;
  laporanPoskoShiftId?: number;
  posko?: string;
  totalKecelakaan?: number;
  totalMeninggal?: number;
  totalLukaBerat?: number;
  totalLukaRingan?: number;
  totalKerugian?: number;
  createdBy: string;
}) => {
  const repo = AppDataSource.getRepository(LaporanPosko);

  const tanggal = payload.tanggalLaporan;
  const existing = await repo
    .createQueryBuilder("lap")
    .where("lap.tanggal_laporan = :tanggal", { tanggal })
    .andWhere("lap.event_id = :eventId", { eventId: payload.eventId })
    .andWhere("lap.laporan_posko_shift_id = :shiftId", {
      shiftId: payload.laporanPoskoShiftId,
    })
    .andWhere("lap.deleted_at IS NULL")
    .getOne();

  if (existing) {
    throw new Error(
      `Laporan untuk shift ${payload.laporanPoskoShiftId} pada tanggal ${tanggal} sudah ada.`,
    );
  }
  const dataFile = await getFilesByIds(payload?.uploadedFiles || []);

  const listOfFile = dataFile
    ?.map((f) => {
      if (!f?.path) return null;
      return f.path.substring(f.path.lastIndexOf("/") + 1);
    })
    .filter((item): item is string => item !== null);

  const data = repo.create({
    id: randomUUID(),
    ...payload,
    uploadedFiles: listOfFile ?? [],
    createdAt: new Date(),
    userId: payload.createdBy,
  });

  return await repo.save(data);
};

export const getLaporanPoskoList = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  tanggalAwal?: string;
  tanggalAkhir?: string;
  eventId?: number;
  shiftId?: number;
  instansi?: string;
}) => {
  const {
    page = 1,
    limit = 10,
    search,
    tanggalAwal,
    tanggalAkhir,
    eventId,
    shiftId,
    instansi,
  } = params;

  const repo = AppDataSource.getRepository(LaporanPosko);

  const qb = repo
    .createQueryBuilder("lp")
    .select([
      `lp.id AS "id"`,
      `lp.judul_laporan AS "judulLaporan"`,
      `lp.tanggal_laporan AS "tanggalLaporan"`,
      `lp.deskripsi AS "deskripsi"`,
      `lp.uploaded_files AS "uploadedFiles"`,
      `lp.event_id AS "eventId"`,
      `lp.laporan_posko_shift_id AS "shiftId"`,
      `lp.posko AS "posko"`,
      `lp.created_at AS "createdAt"`,
      `lp.updated_at AS "updatedAt"`,
      `lp.total_kecelakaan AS "totalKecelakaan"`,
      `lp.total_meninggal AS "totalMeninggal"`,
      `lp.total_luka_berat AS "totalLukaBerat"`,
      `lp.total_luka_ringan AS "totalLukaRingan"`,
      `lp.total_kerugian AS "totalKerugian"`,
    ])
    .innerJoin("lp.user", "user")
    .where("1=1")
    .andWhere("lp.deleted_at IS NULL")
    .andWhere("lp.deleted_by IS NULL");

  if (tanggalAwal && tanggalAkhir) {
    qb.andWhere("lp.tanggal_laporan BETWEEN :start AND :end", {
      start: tanggalAwal,
      end: tanggalAkhir,
    });
  }

  if (eventId) qb.andWhere("lp.event_id = :eventId", { eventId });
  if (shiftId) qb.andWhere("lp.laporan_posko_shift_id = :shiftId", { shiftId });
  if (instansi) qb.andWhere("user.kantor = :instansi", { instansi });

  if (search && search.trim() !== "") {
    const like = `%${search.toLowerCase()}%`;
    qb.andWhere(
      new Brackets((qb) => {
        qb.where("LOWER(lp.judul_laporan) LIKE :s", { s: like })
          .orWhere("LOWER(lp.deskripsi) LIKE :s", { s: like })
          .orWhere("LOWER(lp.posko) LIKE :s", { s: like });
      }),
    );
  }

  qb.orderBy("lp.tanggal_laporan", "DESC")
    .addOrderBy("lp.laporan_posko_shift_id", "ASC")
    .addOrderBy("lp.posko", "ASC")
    .skip((page - 1) * limit)
    .take(limit);

  const rows = await qb.getRawMany();

  const data = await Promise.all(
    rows.map(async (row) => {
      let fileIds: string[] = row.uploadedFiles;

      const files = fileIds.map((name) => `${HOST_30S}/${name}?download=false`);

      return {
        ...row,
        files,
        uploadedFiles: undefined,
      };
    }),
  );

  const total = await qb.getCount();

  return {
    data,
    pagination: { page, limit, total },
  };
};

export const getLaporanPoskoDetail = async (id: string) => {
  const repo = AppDataSource.getRepository(LaporanPosko);
  const dataEvent = await getDataEvent();

  console.log(dataEvent, "=====dataEvent=====");

  const qb = repo
    .createQueryBuilder("lp")
    .select([
      `lp.id AS "id"`,
      `lp.judul_laporan AS "judulLaporan"`,
      `lp.tanggal_laporan AS "tanggalLaporan"`,
      `lp.deskripsi AS "deskripsi"`,
      `lp.uploaded_files AS "uploadedFiles"`,
      `lp.event_id AS "eventId"`,
      `lp.laporan_posko_shift_id AS "shiftId"`,
      `lp.posko AS "posko"`,
      `lp.created_at AS "createdAt"`,
      `lp.updated_at AS "updatedAt"`,
      `lp.total_kecelakaan AS "totalKecelakaan"`,
      `lp.total_meninggal AS "totalMeninggal"`,
      `lp.total_luka_berat AS "totalLukaBerat"`,
      `lp.total_luka_ringan AS "totalLukaRingan"`,
      `lp.total_kerugian AS "totalKerugian"`,
    ])
    .where("lp.id = :id", { id });

  const { uploadedFiles, ...row } = await qb.getRawOne();
  if (!row) return null;

  let fileIds: string[] = uploadedFiles;
  const files = fileIds.map(
    (name: string) => `${HOST_30S}/${name}?download=false`,
  );

  return {
    ...row,
    files,
  };
};

export const updateLaporanPosko = async (
  id: string,
  payload: {
    judulLaporan?: string;
    tanggalLaporan?: string;
    deskripsi?: string;
    uploadedFiles?: string[];
    eventId?: number;
    laporanPoskoShiftId?: number;
    posko?: string;
    totalKecelakaan?: number;
    totalMeninggal?: number;
    totalLukaBerat?: number;
    totalLukaRingan?: number;
    totalKerugian?: number;
    updatedBy: string;
  },
) => {
  const repo = AppDataSource.getRepository(LaporanPosko);
  const tanggal = payload.tanggalLaporan;

  const existing = await repo
    .createQueryBuilder("lap")
    .where("lap.tanggal_laporan = :tanggal", { tanggal })
    .andWhere("lap.event_id = :eventId", { eventId: payload.eventId })
    .andWhere("lap.laporan_posko_shift_id = :shiftId", {
      shiftId: payload.laporanPoskoShiftId,
    })
    .andWhere("lap.id != :id", { id })
    .andWhere("lap.deleted_at IS NULL")
    .getOne();

  if (existing) {
    throw new Error(
      `Laporan untuk shift ${payload.laporanPoskoShiftId} pada tanggal ${tanggal} sudah ada.`,
    );
  }
  const listOfFile = await getFilesByPaths(payload.uploadedFiles ?? []);
  const laporanOld = await repo.findOne({ where: { id } });
  const oldFile = compact(laporanOld?.uploadedFiles);

  const finalFile = !isEmpty(listOfFile) ? listOfFile : [];
  await repo.update(id, {
    ...payload,
    uploadedFiles: [...oldFile, ...finalFile],
    updatedAt: new Date(),
  });

  return await repo.findOne({ where: { id } });
};

export const deleteLaporanPosko = async (id: string, deletedBy: string) => {
  const repo = AppDataSource.getRepository(LaporanPosko);

  await repo.update(id, {
    deletedAt: new Date(),
    deletedBy,
  });

  return { success: true };
};
