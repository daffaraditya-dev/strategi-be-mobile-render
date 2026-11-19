import { AppDataSource } from "@/data-source";
import { DataSaranaBus } from "@/entities/DataSaranaBus";
import { MstTerminal } from "@/entities/MstTerminal";
import { User } from "@/entities/User";
import Joi from "joi";
import { compact, isEmpty } from "lodash";

export const queryTerminalSchema = Joi.object({
  search: Joi.string().allow("").optional(),
  terminalId: Joi.string().allow("").optional(),
  provinsi: Joi.string().allow("").optional(),
  page: Joi.string().allow("").optional(),
  limit: Joi.string().allow("").optional(),
  filterBySimpul: Joi.string().valid("0", "1").required(),
});

interface GetBusParams {
  search?: string | null;
  provinsi?: string | null;
  page?: number;
  limit?: number;
  filterBySimpul?: string;
  terminalId?: string;
}

export const getDataMasterTerminal = async (params: GetBusParams, userId: string) => {
  try {
    const repository = AppDataSource.getRepository(MstTerminal);
    const repositoryUser = AppDataSource.getRepository(User);

    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 10;
    const offset = (page - 1) * limit;

    const user = await repositoryUser.findOneBy({ id: userId });

    const simpulData = (user?.simpul ?? [])
      .map((item, i) => (item === "terminal" ? (user?.simpulId ?? [])[i] : null))
      .filter(Boolean);

    let query = repository
      .createQueryBuilder("terminal");

    if (params.filterBySimpul === "1" && simpulData.length > 0) {
      query.andWhere("terminal.id IN (:...simpulIds)", {
        simpulIds: compact(simpulData),
      });
    }

    if (params.terminalId) {
      query.andWhere("terminal.id = :terminalId", {
        terminalId: params.terminalId,
      });
    }


    if (params.provinsi) {
      query = query.andWhere(
        "(terminal.idProvinsi = :provinsi OR terminal.idProvinsi = :provinsi)",
        { provinsi: params.provinsi }
      );
    }

    if (!isEmpty(params.search)) {
      query.andWhere("terminal.namaTerminal ILIKE :search", {
        search: `%${params.search}%`,
      });
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
    throw new Error("Gagal mengambil data master terminal.");
  }
};

export const getDataMasterPoTerminal = async (params: GetBusParams, userId?: string) => {
  try {
    const repository = AppDataSource.getRepository(DataSaranaBus);

    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 10;
    const offset = (page - 1) * limit;

    let query = repository
      .createQueryBuilder("po").select(
        "po.namaPo", "namaPo"
      ).leftJoinAndSelect("po.terminalAsal", "terminalAsal")
      .leftJoinAndSelect("po.terminalTujuan", "terminalTujuan").addSelect("COUNT(po.id)", "total");

    if (!isEmpty(params.search)) {
      query.andWhere("po.namaPo LIKE :search", {
        search: `%${params.search}%`,
      });
    }

    // if (params.provinsi) {
    //   query = query.andWhere(
    //     "(terminalAsal.idProvinsi = :provinsi OR terminalTujuan.idProvinsi = :provinsi)",
    //     { provinsi: params.provinsi }
    //   );
    // }


    query.skip(offset).take(limit).groupBy("po.namaPo").addGroupBy("terminalAsal.id").addGroupBy("terminalTujuan.id").orderBy("po.namaPo", "ASC");

    const data = await query.getRawMany();
    const total = data.length;
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (err) {
    console.error("Database Operation Failed:", err);
    throw new Error("Gagal mengambil data master terminal.");
  }
};
