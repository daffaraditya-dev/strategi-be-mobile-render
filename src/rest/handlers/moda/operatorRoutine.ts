import { Request, Response } from "express";
import Joi from "joi";
import { MODA } from "@/constants/moda";
import {
  getTrainOperators,
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
  TrainOperatorData,
} from "@/services/type/backendApiHubnet";

const operatorRoutineRequest = Joi.object({
  dateStart: Joi.string().optional(),
  dateEnd: Joi.string().optional(),
  period: Joi.string().optional(),
  search: Joi.string().optional(),
  sortColumn: Joi.string().optional().default("name"),
  sortDirection: Joi.string().optional().default("asc"),
});

export const operatorRoutineHandler = async (req: Request, res: Response) => {
  const { moda } = req.params;
  const { error, value } = operatorRoutineRequest.validate(req.query);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details.map((err) => err.message).join(", "),
    });
  }

  try {
    const { dateStart, dateEnd, period, search, sortColumn, sortDirection } =
      value;

    let dataList = [];
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
        const stasiunData = await getTrainOperators({
          tanggal_akhir: dateEnd,
          tanggal_awal: dateStart,
          keyword: search?.trim(),
        });

        dataList = stasiunData.data;

        dataList = dataList.map((item: TrainOperatorData): OperatorData => {
          return {
            id: item.operator,
            name: item.operator || "",
            logo: "",
            contactPerson: item.nama_pic || "-",
            contactPhone: item.no_hp_pic || "-",
            contactEmail: "-",
            contactLocation: item.lokasi || "-",
            addressLongLat: "-",
            fleetSize: 0,
            passengerCount: Number(item.penumpang) || 0,
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
        const tollData = await getTollOperators({
          tanggal_akhir: dateEnd,
          tanggal_awal: dateStart,
          keyword: search?.trim(),
        });

        dataList = tollData.data;

        dataList = dataList.map((item: TollOperatorData): OperatorData => {
          return {
            id: item.operator,
            name: item.operator || "-",
            logo: "",
            contactPerson: item.nama_pic || "-",
            contactPhone: item.no_hp_pic || "-",
            contactEmail: "-",
            contactLocation: item.lokasi || "-",
            addressLongLat: "-",
            fleetSize: 0,
            passengerCount: 0,
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
        const airlineData = await getAirlineOperators({
          tanggal_akhir: dateEnd,
          tanggal_awal: dateStart,
          keyword: search?.trim(),
        });

        dataList = airlineData.data;

        dataList = dataList.map((item: AirlineOperatorData): OperatorData => {
          return {
            id: item.icaoOperator,
            name: item.airlines_nm || "-",
            logo: "",
            contactPerson: item.nama_pic || "-",
            contactPhone: item.no_hp_pic || "-",
            contactEmail: "-",
            contactLocation: item.lokasi || "-",
            addressLongLat: "-",
            fleetSize: item.sarana,
            passengerCount: Number(item.penumpang) || 0,
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
        const sailingData = await getSailingOperators({
          tanggal_akhir: dateEnd,
          tanggal_awal: dateStart,
          keyword: search?.trim(),
        });

        dataList = sailingData.data;

        dataList = dataList.map((item: SailingOperatorData): OperatorData => {
          return {
            id: item.operator,
            name: item.operator || "-",
            logo: "",
            contactPerson: item.nama_pic || "-",
            contactPhone: item.no_hp_pic || "-",
            contactEmail: "-",
            contactLocation: item.lokasi || "-",
            addressLongLat: "-",
            fleetSize: item.sarana,
            passengerCount: Number(item.penumpang) || 0,
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
        const crossingData = await getCrossingOperators({
          tanggal_akhir: dateEnd,
          tanggal_awal: dateStart,
          keyword: search?.trim(),
        });

        dataList = crossingData.data;

        dataList = dataList.map((item: CrossingOperatorData): OperatorData => {
          return {
            id: item.operator,
            name: item.operator || "-",
            logo: "",
            contactPerson: item.nama_pic || "-",
            contactPhone: item.no_hp_pic || "-",
            contactEmail: "-",
            contactLocation: item.lokasi || "-",
            addressLongLat: "-",
            fleetSize: item.sarana,
            passengerCount: Number(item.penumpang) || 0,
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
    if (search && search?.trim() !== "") {
      const searchTerm = search?.trim().toLowerCase();
      dataList = dataList.filter((item: OperatorData) => {
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
