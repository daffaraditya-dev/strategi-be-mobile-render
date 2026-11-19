import { AppDataSource } from "@/data-source";
import { Request, Response } from "express";
import Joi from "joi";
import { OdResponse } from "./type/common";
import { DataSaranaBus } from "@/entities/DataSaranaBus";
import { MODA } from "@/constants/moda";
import { toCamelCase } from "@/utils/convert";
import {
  getTopDestinationTrainTransportation,
  getTopDestinationASDPTransportation,
  getTopDestinationAirTransportation,
  getTopDestinationSeaTransportation,
  getDataPantau,
} from "@/services/backendApiHubnet";
import { DataPantauLocation } from "@/services/type/backendApiHubnet";

const odRoutineRequest = Joi.object({
  tanggalAwal1: Joi.string().required(),
  tanggalAkhir1: Joi.string().required(),
  search: Joi.string().optional(),
  type: Joi.string().optional(),
});

export const odRoutineHandler = async (req: Request, res: Response) => {
  const { moda } = req.params;
  const { error, value } = odRoutineRequest.validate(req.query);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details.map((err) => err.message).join(", "),
    });
  }

  try {
    const { tanggalAwal1, tanggalAkhir1, search, type } = value;

    const rawDataPantau = await getDataPantau();
    const dataPantau = rawDataPantau.data[moda.toLowerCase()];

    let dataList = [];
    switch (moda.toLowerCase()) {
      case MODA.JALAN:
        const repository = AppDataSource.getRepository(DataSaranaBus);
        dataList = await repository
          .createQueryBuilder("DataSaranaBus")
          .leftJoinAndSelect("DataSaranaBus.terminalAsal", "terminalAsal")
          .leftJoinAndSelect("DataSaranaBus.terminalTujuan", "terminalTujuan")
          .where(
            "DataSaranaBus.tglData BETWEEN :tanggalAwal AND :tanggalAkhir",
            {
              tanggalAwal: tanggalAwal1,
              tanggalAkhir: tanggalAkhir1,
            }
          )
          .andWhere(
            search
              ? "(terminalAsal.namaTerminal ILIKE :search OR terminalTujuan.namaTerminal ILIKE :search)"
              : "1=1",
            {
              search: `%${search}%`,
            }
          )
          .andWhere("DataSaranaBus.isNihil = 0")
          .andWhere("DataSaranaBus.isDelete = 0")
          .select([
            "terminalAsal.id as id_origin",
            "terminalAsal.namaTerminal as origin",
            "terminalAsal.tipe as origin_type",
            "terminalTujuan.id as id_destination",
            "terminalTujuan.namaTerminal as destination",
            "terminalTujuan.tipe as destination_type",
            "SUM(DataSaranaBus.jmlPenumpangNaik) as departure",
            "SUM(DataSaranaBus.jmlPenumpangTurun) as arrival",
            "COUNT(CASE WHEN DataSaranaBus.jmlPenumpangNaik > 0 THEN 1 END) as vehicle_departure",
            "COUNT(CASE WHEN DataSaranaBus.jmlPenumpangTurun > 0 THEN 1 END) as vehicle_arrival",
          ])
          .addGroupBy("terminalAsal.id")
          .addGroupBy("terminalTujuan.id")
          .getRawMany();
        break;
      case MODA.ASDP:
        const hubnetAsdp = await getTopDestinationASDPTransportation({
          tanggal_awal: tanggalAwal1,
          tanggal_akhir: tanggalAkhir1,
          keyword: search,
        });
        dataList = hubnetAsdp.data.map((item) => {
          return {
            id_origin: item.origin,
            origin: item.origin_name,
            id_destination: item.destination,
            destination: item.destination_name,
            departure: item.penumpang,
            arrival: item.penumpang,
            vehicle_departure: item.sarana,
            vehicle_arrival: item.sarana,
          };
        });
        break;
      case MODA.LAUT:
        const hubnetSea = await getTopDestinationSeaTransportation({
          tanggal_awal: tanggalAwal1,
          tanggal_akhir: tanggalAkhir1,
          jenis: type,
          keyword: search,
        });
        dataList = hubnetSea.data.map((item) => {
          return {
            id_origin: item.id_origin,
            origin: item.origin_name,
            id_destination: item.id_destination,
            destination: item.destination_name,
            departure: item.penumpang,
            arrival: item.penumpang,
            vehicle_departure: item.sarana,
            vehicle_arrival: item.sarana,
          };
        });
        break;
      case MODA.STASIUN:
        const stasiunData = await getTopDestinationTrainTransportation({
          tanggal_awal: tanggalAwal1,
          tanggal_akhir: tanggalAkhir1,
          keyword: search,
        });

        dataList = stasiunData.data.map((item) => {
          return {
            id_origin: item.origin,
            origin: item.origin_name,
            id_destination: item.destination,
            destination: item.destination_name,
            departure: item.penumpang,
            arrival: item.penumpang,
            vehicle_departure: item.sarana,
            vehicle_arrival: item.sarana,
          };
        });
        break;
      case MODA.UDARA:
        const udaraData = await getTopDestinationAirTransportation({
          tanggal_awal: tanggalAwal1,
          tanggal_akhir: tanggalAkhir1,
          jenis: type,
          keyword: search,
        });

        dataList = udaraData.data.map((item) => {
          return {
            id_origin: item.origin,
            origin: item.origin_name,
            id_destination: item.destination,
            destination: item.destination_name,
            departure: item.penumpang,
            arrival: item.penumpang,
            vehicle_departure: item.sarana,
            vehicle_arrival: item.sarana,
          };
        });
        break;
      default:
        break;
    }

    dataList = dataList.map((item) => {
      const originCity = dataPantau.find(
        (itemPantau: DataPantauLocation) =>
          itemPantau.id_lokasi?.toString() === item.id_origin?.toString() ||
          itemPantau.kode_referensi?.toString() === item.id_origin?.toString()
      )?.kota;
      const destinationCity = dataPantau.find(
        (itemPantau: DataPantauLocation) =>
          itemPantau.id_lokasi?.toString() ===
            item.id_destination?.toString() ||
          itemPantau.kode_referensi?.toString() ===
            item.id_destination?.toString()
      )?.kota;
      return {
        ...item,
        idOrigin: item.id_origin?.toString(),
        originCity: originCity || "",
        idDestination: item.id_destination?.toString(),
        destinationCity: destinationCity || "",
        departure: parseInt(item.departure) || 0,
        arrival: parseInt(item.arrival) || 0,
        vehicleDeparture: parseInt(item.vehicle_departure) || 0,
        vehicleArrival: parseInt(item.vehicle_arrival) || 0,
      };
    });

    // Apply search filter if search parameter is provided
    if (search && search.trim() !== "") {
      const searchTerm = search.trim().toLowerCase();
      dataList = dataList.filter((item) => {
        return (
          (item.origin && item.origin.toLowerCase().indexOf(searchTerm) > -1) ||
          (item.destination &&
            item.destination.toLowerCase().indexOf(searchTerm) > -1)
        );
      });
    }

    const response: OdResponse = {
      status: true,
      message: "Success",
      data: toCamelCase(
        dataList
          .sort((a, b) => b.departure + b.arrival - (a.departure + a.arrival))
          .slice(0, 10)
      ),
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
