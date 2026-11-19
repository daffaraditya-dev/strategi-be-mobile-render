import { Request, Response } from "express";
import Joi from "joi";
import { MODA } from "@/constants/moda";
import {
  getTollOperators,
  getAirlineOperators,
  getSailingOperators,
  getCrossingOperators,
} from "@/services/backendApiHubnet";
import { mapColumnSort, OperatorData } from "./type/common";
import { AppDataSource } from "@/data-source";
import { DataSaranaBus } from "@/entities/DataSaranaBus";
import {
  AirlineOperatorData,
  CrossingOperatorData,
  SailingOperatorData,
  TollOperatorData,
} from "@/services/type/backendApiHubnet";
import { getOperator } from "./services/operator.service";
import { isArray } from "lodash";

const operatorRequest = Joi.object({
  dateStart: Joi.string().optional(),
  dateEnd: Joi.string().optional(),
  period: Joi.string().optional(),
  search: Joi.string().optional(),
  sortColumn: Joi.string().optional().default("name"),
  sortDirection: Joi.string().optional().default("asc"),
  // moda: Joi.string().required(),
  page: Joi.string(),
  pageSize: Joi.string(),
});

export const operatorHandler = async (req: Request, res: Response) => {
  const { moda } = req.params;
  const { error, value } = operatorRequest.validate(req.query);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details.map((err) => err.message).join(", "),
    });
  }

  try {
    const { event, dateStart, dateEnd, period, search, sortColumn, sortDirection, pageSize, page, } =
      value;

    const modaLower = moda.toLowerCase();


    let dataList: any[] = [];

    switch (moda.toLowerCase()) {
      case MODA.JALAN:
        const busRepository = AppDataSource.getRepository(DataSaranaBus);
        const dataBus = await busRepository
          .createQueryBuilder("DataSaranaBus")
          .select("TRIM(DataSaranaBus.namaPo)", "operator")
          .addSelect("COUNT(DataSaranaBus.id)", "armada")
          .addSelect("SUM(DataSaranaBus.jmlPenumpangNaik)", "penumpang")
          .where("DataSaranaBus.tglData BETWEEN :startDate AND :endDate", {
            startDate: dateStart,
            endDate: dateEnd,
          })
          .andWhere("DataSaranaBus.isNihil = 0")
          .andWhere("DataSaranaBus.isDelete = 0")
          .andWhere(search ? "(DataSaranaBus.namaPo ILIKE :search)" : "1=1", {
            search: `%${search}%`,
          })
          .orderBy(
            mapColumnSort(sortColumn),
            sortDirection.toUpperCase() ?? "ASC"
          )
          .groupBy("DataSaranaBus.namaPo")
          .getRawMany();
        dataList = dataBus.map((item): OperatorData => {
          return {
            id: item.operator,
            name: item.operator || "-",
            logo: "",
            contactPerson: "-",
            contactPhone: "-",
            contactEmail: "-",
            contactLocation: "-",
            addressLongLat: "-",
            fleetSize: Number(item.armada) || 0,
            passengerCount: Number(item.penumpang) || 0,
            otpRate: 0,
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
      case MODA.STASIUN:
        const stasiunData = await getOperator({ event, moda: modaLower, tanggalAkhir1: dateEnd, tanggalAwal1: dateStart, reportType: period, limit: pageSize, page, search });

        dataList = stasiunData;

        dataList = dataList.map((item): OperatorData => {
          return {
            id: item.operator,
            name: item.operator || "",
            logo: "",
            contactPerson: item.picName || "-",
            contactPhone: item.picPhone || "-",
            contactEmail: "-",
            contactLocation: item.location || "-",
            addressLongLat: "-",
            fleetSize: Number(item.passenger) || 0,
            passengerCount: Number(item.passenger) || 0,
            otpRate: Number(item.otp) || 0,
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
      case MODA.TOLL:
        const tollData = await getOperator({ event, moda: modaLower, tanggalAkhir1: dateEnd, tanggalAwal1: dateStart, reportType: period, limit: pageSize, page, search });

        dataList = tollData;

        dataList = dataList.map((item): OperatorData => {
          return {
            id: item.operator,
            name: item.operator || "",
            logo: "",
            contactPerson: item.picName || "-",
            contactPhone: item.picPhone || "-",
            contactEmail: "-",
            contactLocation: item.location || "-",
            addressLongLat: "-",
            fleetSize: Number(item.vehicle) || 0,
            passengerCount: Number(item.passenger) || 0,
            otpRate: Number(item.otp) || 0,
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
      case MODA.UDARA:
        const airlineData = await getOperator({ event, moda: modaLower, tanggalAkhir1: dateStart, tanggalAwal1: dateEnd, reportType: period, limit: pageSize, page, search });

        dataList = airlineData;

        dataList = dataList.map((item): OperatorData => {
          return {
            id: item.operator,
            name: item.operator || "",
            logo: "",
            contactPerson: item.picName || "-",
            contactPhone: item.picPhone || "-",
            contactEmail: "-",
            contactLocation: item.location || "-",
            addressLongLat: "-",
            fleetSize: Number(item.vehicle) || 0,
            passengerCount: Number(item.passenger) || 0,
            otpRate: Number(item.otp) || 0,
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
      case MODA.LAUT:
        const sailingData = await getOperator({ event, moda: modaLower, tanggalAkhir1: dateStart, tanggalAwal1: dateEnd, reportType: period, limit: pageSize, page, search });

        dataList = sailingData;

        dataList = dataList.map((item): OperatorData => {
          return {
            id: item.operator,
            name: item.operator || "",
            logo: "",
            contactPerson: item.picName || "-",
            contactPhone: item.picPhone || "-",
            contactEmail: "-",
            contactLocation: item.location || "-",
            addressLongLat: "-",
            fleetSize: Number(item.passenger) || 0,
            passengerCount: Number(item.passenger) || 0,
            otpRate: Number(item.otp) || 0,
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
      case MODA.ASDP:
        const crossingData = await getOperator({ event, moda: modaLower, tanggalAkhir1: dateStart, tanggalAwal1: dateEnd, reportType: period, limit: pageSize, page, search });
        dataList = crossingData;

        dataList = dataList.map((item): OperatorData => {
          return {
            id: item.operator,
            name: item.operator || "",
            logo: "",
            contactPerson: item.picName || "-",
            contactPhone: item.picPhone || "-",
            contactEmail: "-",
            contactLocation: item.location || "-",
            addressLongLat: "-",
            fleetSize: Number(item.passenger) || 0,
            passengerCount: Number(item.passenger) || 0,
            otpRate: Number(item.otp) || 0,
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
        dataList = [];
    }

    // Apply search filter if search parameter is provided
    if (search && search?.trim() !== "" && modaLower === "jalan" && isArray(dataList)) {
      const searchTerm = search?.trim().toLowerCase();
      dataList = dataList?.filter((item: OperatorData) => {
        return (
          (item.name && item.name.toLowerCase().indexOf(searchTerm) > -1) ||
          (item.contactPerson &&
            item.contactPerson.toLowerCase().indexOf(searchTerm) > -1) ||
          (item.contactPhone &&
            item.contactPhone.toLowerCase().indexOf(searchTerm) > -1) ||
          (item.contactEmail &&
            item.contactEmail.toLowerCase().indexOf(searchTerm) > -1) ||
          (item.contactLocation &&
            item.contactLocation.toLowerCase().indexOf(searchTerm) > -1)
        );
      });
    }

    // Apply sort if sortColumn and sortDirection are provided
    if (sortColumn != "" && sortDirection != "") {
      dataList = dataList.sort((a: OperatorData, b: OperatorData) => {
        const valA = a[sortColumn as keyof OperatorData];
        const valB = b[sortColumn as keyof OperatorData];

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

    return res.status(200).json(dataList);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
