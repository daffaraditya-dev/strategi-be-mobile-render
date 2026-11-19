import { AppDataSource } from "@/data-source";
import { MstKapal } from "@/entities/MstKapal";
import Joi from "joi";
import { compact, isEmpty } from "lodash";

export const querySchema = Joi.object({
  search: Joi.string().allow("").optional(),
  page: Joi.string().allow("").optional(),
  limit: Joi.string().allow("").optional(),
  listIdKapal: Joi.string().allow("").optional(),
});

interface GetParams {
  search?: string | null;
  page?: number;
  listIdKapal?: Array<string>;
  limit?: number;
}

export const getDataMasterKapalLaut = async (params: GetParams) => {
  try {
    const KapalRepo = AppDataSource.getRepository(MstKapal);

    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 10;
    const offset = (page - 1) * limit;

    let query = KapalRepo.createQueryBuilder("kapal").leftJoinAndSelect(
      "kapal.perusahaan",
      "perusahaan"
    );

    if (!isEmpty(params.listIdKapal)) {
      query.andWhere("kapal.id IN (:...listIdKapal)", {
        listIdKapal: compact(params.listIdKapal),
      });
    }

    if (!isEmpty(params.search)) {
      query.andWhere("kapal.namaKapal ILIKE :search", {
        search: `%${params.search}%`,
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
