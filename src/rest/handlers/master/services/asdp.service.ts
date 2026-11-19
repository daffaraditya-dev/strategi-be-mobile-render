import { AppDataSource } from "@/data-source";
import { MstKapalAsdp } from "@/entities/MstKapalAsdp";
import { MstTrayek } from "@/entities/MstTrayek";
import { User } from "@/entities/User";
import Joi from "joi";
import { compact, isEmpty } from "lodash";
import { In } from "typeorm";

export const querySchema = Joi.object({
  search: Joi.string().allow("").optional(),
  page: Joi.string().allow("").optional(),
  limit: Joi.string().allow("").optional(),
  idPelabuhanAsal: Joi.number().optional(),
  filterBySimpul: Joi.string().valid("0", "1").required(),
});

interface GetParams {
  search?: string | null;
  page?: number;
  limit?: number;
  filterBySimpul?: string;
  idPelabuhanAsal?: number;
}

export const getDataMasterTrayek = async (
  params: GetParams,
  userId: string
) => {
  try {
    const trayekRepo = AppDataSource.getRepository(MstTrayek);
    const userRepo = AppDataSource.getRepository(User);
    const KapalRepo = AppDataSource.getRepository(MstKapalAsdp);

    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 10;
    const offset = (page - 1) * limit;

    const user = await userRepo.findOneBy({ id: userId });
    const simpulData = (user?.simpul ?? [])
      .map((item, i) =>
        item.includes("pelabuhan") ? (user?.simpulId ?? [])[i] : null
      )
      .filter(Boolean);
    let query = trayekRepo
      .createQueryBuilder("trayek")
      .leftJoinAndSelect("trayek.pelabuhanAsal", "pelabuhanAsal")
      .leftJoinAndSelect("trayek.pelabuhanTujuan", "pelabuhanTujuan")
      .leftJoinAndSelect(
        MstKapalAsdp,
        "kapal",
        "kapal.idKapal = trayek.idKapal"
      );

    if (params.filterBySimpul === "1" && simpulData.length > 0) {
      query.andWhere(
        "(pelabuhanAsal.id IN (:...simpulIds) OR pelabuhanTujuan.id IN (:...simpulIds))",
        { simpulIds: compact(simpulData) }
      );
    }
    if (params.idPelabuhanAsal) {
      query.andWhere("trayek.idPelabuhanAsal = :idPelabuhanAsal OR trayek.idPelabuhanTujuan = :idPelabuhanAsal", {
        idPelabuhanAsal: params.idPelabuhanAsal,
      });
    }

    if (!isEmpty(params.search)) {
      query.andWhere(
        "(pelabuhanAsal.namaPelabuhan ILIKE :search OR pelabuhanTujuan.namaPelabuhan ILIKE :search OR kapal.namaKapal ILIKE :search)",
        { search: `%${params.search}%` }
      );
    }

    query.skip(offset).take(limit);

    const [data, total] = await query.getManyAndCount();

    const kapalIds = data.map((t) => t.idKapal);
    const kapalMap: Record<number, string | null> = {};
    if (kapalIds.length) {
      const kapalList = await KapalRepo.findBy({ idKapal: In(kapalIds) });
      kapalList.forEach((k) => {
        kapalMap[k.idKapal] = k.namaKapal ?? null;
      });
    }
    const result = data.map((item) => ({
      id: item.id,
      namaKapal: kapalMap[item.idKapal] ?? null,
      pelabuhanAsal: item.pelabuhanAsal?.namaPelabuhan ?? null,
      pelabuhanTujuan: item.pelabuhanTujuan?.namaPelabuhan ?? null,
      order: item.order,
      idKapal: item.idKapal,
      idPelabuhanAsal: item.idPelabuhanAsal,
      idPelabuhanTujuan: item.idPelabuhanTujuan,
      updatedDate: item.updatedDate ?? null,
    }));

    return {
      data: result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (err) {
    console.error("Database Operation Failed:", err);
    throw new Error("Gagal mengambil data master trayek.");
  }
};

export const querySchemaKapalAsdp = Joi.object({
  search: Joi.string().allow("").optional(),
  listLintasan: Joi.string().allow("").optional(),
  listIdKapal: Joi.string().allow("").optional(),
  page: Joi.string().allow("").optional(),
  limit: Joi.string().allow("").optional(),
});

interface GetParams {
  search?: string | null;
  listLintasan?: Array<string>;
  listIdKapal?: Array<string>;
  page?: number;
  limit?: number;
}

export const getDataMasterKapalAsdp = async (params: GetParams) => {
  try {
    console.log(params, "-----params-----");

    const KapalRepo = AppDataSource.getRepository(MstKapalAsdp);

    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 10;
    const offset = (page - 1) * limit;

    let query = KapalRepo.createQueryBuilder("kapal").leftJoinAndSelect(
      "kapal.perusahaan",
      "perusahaan"
    );

    if (!isEmpty(params.search)) {
      query.andWhere("kapal.namaKapal ILIKE :search", {
        search: `%${params.search}%`,
      });
    }

    if (!isEmpty(params.listLintasan)) {
      query.andWhere("kapal.id_lintasan IN (:...listLintasan)", {
        listLintasan: compact(params.listLintasan),
      });
    }

    if (!isEmpty(params.listIdKapal)) {
      query.andWhere("kapal.id_kapal IN (:...listIdKapal)", {
        listIdKapal: compact(params.listIdKapal),
      });
    }

    query.skip(offset).take(limit);

    query.select(["kapal", "perusahaan.namaPerusahaan", "perusahaan.id"]);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (err) {
    console.error("Database Operation Failed:", err);
    throw new Error("Gagal mengambil data master kapal laut.");
  }
};
