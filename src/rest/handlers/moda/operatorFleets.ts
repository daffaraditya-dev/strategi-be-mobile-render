import { MODA } from "@/constants/moda";
import { AppDataSource } from "@/data-source";
import { DataSaranaBus } from "@/entities/DataSaranaBus";
import { Request, Response } from "express";
import Joi from "joi";
import { mapColumnSort, OperatorFleetData } from "./type/common";

const operatorFleetsRequest = Joi.object({
  idOperator: Joi.string().required(),
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
  search: Joi.string().optional(),
  sortColumn: Joi.string().optional().default("name"),
  sortDirection: Joi.string().optional().default("asc"),
});

export const operatorFleetsHandler = async (req: Request, res: Response) => {
  const { moda } = req.params;
  const { error, value } = operatorFleetsRequest.validate(req.query);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details.map((err) => err.message).join(", "),
    });
  }
  const { idOperator, page, limit, search, sortColumn, sortDirection } = value;

  let dataList: OperatorFleetData[] = [];
  let totalData = 0;
  switch (moda.toLowerCase()) {
    case MODA.JALAN:
      const busRepository = AppDataSource.getRepository(DataSaranaBus);
      const [dataBus, total] = await busRepository
        .createQueryBuilder("DataSaranaBus")
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
        .orderBy(mapColumnSort(sortColumn), sortDirection ?? "ASC")
        .getManyAndCount();

      totalData = total;
      dataList = dataBus.map((item): OperatorFleetData => {
        return {
          id: item.namaPo ?? "-",
          name: item.namaPo || "-",
          location: "",
          plateNumber: item.noPol ?? "-",
          brand: "-",
          wheelCount: 0,
          maxPassengerCount: 0,
          documents: [
            {
              id: 1,
              name: "-",
              type: "PDF",
              fileUrl: "https://example.com/doc1.pdf",
            },
          ],
        };
      });
      break;
    default:
      break;
  }

  // Apply sort if sortColumn and sortDirection are provided
  if (sortColumn != "" && sortDirection != "") {
    dataList = dataList.sort((a, b) => {
      const valA = a[sortColumn as keyof OperatorFleetData];
      const valB = b[sortColumn as keyof OperatorFleetData];

      if (typeof valA === "number" && typeof valB === "number") {
        return sortDirection === "asc" ? valA - valB : valB - valA;
      }

      if (typeof valA === "string" && typeof valB === "string") {
        return sortDirection === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return 0;
    });
  }

  return res.json({
    status: true,
    message: "success get fleets data",
    data: dataList,
    count: totalData,
    page,
    limit,
    totalPages: Math.ceil(totalData / limit),
  });
};
