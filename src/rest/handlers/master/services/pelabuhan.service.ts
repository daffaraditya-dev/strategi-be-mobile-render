import { AppDataSource } from "@/data-source";
import { MstPelabuhan } from "@/entities/MstPelabuhan";
import { User } from "@/entities/User";
import Joi from "joi";
import { compact, isEmpty } from "lodash";

export const querySchema = Joi.object({
  search: Joi.string().allow("").optional(),
  pelabuhanId: Joi.string().allow("").optional(),
  provinsiId: Joi.string().allow("").optional(),
  isAsdp: Joi.boolean().required(),
  page: Joi.string().allow("").optional(),
  limit: Joi.string().allow("").optional(),
  filterBySimpul: Joi.string().valid("0", "1").required(),
  isDeleted: Joi.boolean().required(),
});

interface GetParams {
  search?: string | null;
  pelabuhanId?: string | null;
  provinsiId?: string | null;
  isAsdp?: boolean;
  page?: number;
  limit?: number;
  filterBySimpul?: string;
  isDeleted?: boolean;
}

export const getDataMasterPelabuhan = async (
  params: GetParams,
  userId: string
) => {
  try {
    const pelabuhanRepo = AppDataSource.getRepository(MstPelabuhan);
    const userRepo = AppDataSource.getRepository(User);

    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 10;
    const offset = (page - 1) * limit;

    const user = await userRepo.findOneBy({ id: userId });

    // Ambil simpul pelabuhan dari user
    const simpulData = (user?.simpul ?? [])
      .map((item, i) =>
        item.includes("pelabuhan") ? (user?.simpulId ?? [])[i] : null
      )
      .filter(Boolean);

    // Query utama
    let query = pelabuhanRepo
      .createQueryBuilder("pelabuhan")
      .leftJoinAndSelect("pelabuhan.provinsi", "provinsi");
    // .where("pelabuhan.isAsdp = :isAsdp", { isAsdp: params.isAsdp ? 1 : 0 });

    if (params.isAsdp === true) {
      query.andWhere("pelabuhan.isAsdp = :isAsdp", {
        isAsdp: 1,
      });
    }

    // Filter simpul (kalau filterBySimpul = 1)
    if (params.filterBySimpul === "1" && simpulData.length > 0) {
      query.andWhere("pelabuhan.id IN (:...simpulIds)", {
        simpulIds: compact(simpulData),
      });
    }

    if (params.pelabuhanId) {
      query.andWhere("pelabuhan.id = :pelabuhanId", {
        pelabuhanId: params.pelabuhanId,
      });
    }
    if (params.provinsiId) {
      query.andWhere("pelabuhan.idProvinsi = :provinsiId", {
        provinsiId: params.provinsiId,
      });
    }

    // Filter pencarian
    if (!isEmpty(params.search)) {
      query.andWhere("pelabuhan.namaPelabuhan ILIKE :search", {
        search: `%${params.search}%`,
      });
    }

    // Filter isDeleted
    if (params.isDeleted) {
      // tampilkan yang sudah dihapus
      query.andWhere(
        "(pelabuhan.deletedBy IS NOT NULL OR pelabuhan.deletedDate IS NOT NULL)"
      );
    }

    query.skip(offset).take(limit);

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
    throw new Error("Gagal mengambil data master pelabuhan.");
  }
};
