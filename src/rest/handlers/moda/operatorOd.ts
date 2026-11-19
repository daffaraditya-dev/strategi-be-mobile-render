import { Request, Response } from "express";
import Joi from "joi";
import { OperatorOdData } from "./type/common";
import { AppDataSource } from "@/data-source";
import { DataSaranaBus } from "@/entities/DataSaranaBus";
import { MODA } from "@/constants/moda";

const operatorRoutineRequest = Joi.object({
  idOperator: Joi.string().required(),
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
  search: Joi.string().optional(),
});

export const operatorOdHandler = async (req: Request, res: Response) => {
  const { moda } = req.params;
  const { error, value } = operatorRoutineRequest.validate(req.query);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details.map((err) => err.message).join(", "),
    });
  }

  const { idOperator, page, limit, search } = value;

  let dataList: OperatorOdData[] = [];
  let totalData = 0;
  switch (moda.toLowerCase()) {
    case MODA.JALAN:
      const busRepository = AppDataSource.getRepository(DataSaranaBus);
      const [dataBus, total] = await busRepository
        .createQueryBuilder("DataSaranaBus")
        .leftJoinAndSelect("DataSaranaBus.terminalAsal", "terminalAsal")
        .leftJoinAndSelect("DataSaranaBus.terminalTujuan", "terminalTujuan")
        .where("TRIM(DataSaranaBus.namaPo) = :idOperator", {
          idOperator: idOperator,
        })
        .andWhere("DataSaranaBus.isNihil = 0")
        .andWhere("DataSaranaBus.isDelete = 0")
        .andWhere(search ? "(DataSaranaBus.namaPo ILIKE :search)" : "1=1", {
          search: `%${search}%`,
        })
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      totalData = total;
      dataList = dataBus.map((item): OperatorOdData => {
        return {
          id: `${item.idTerminalAsal}-${item.idTerminalTujuan}`,
          name: item.terminalTujuan.namaTerminal || "-",
          origin: item.terminalAsal.namaTerminal ?? "-",
          destination: item.terminalTujuan.namaTerminal ?? "-",
        };
      });
      break;
    default:
      break;
  }

  return res.json({
    status: true,
    message: "success get origin destination data",
    data: dataList,
    count: totalData,
    page,
    limit,
    totalPages: Math.ceil(totalData / limit),
  });
};
