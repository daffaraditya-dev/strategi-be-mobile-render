import { AppDataSource } from "@/data-source";
import { Request, Response } from "express";
import Joi from "joi";
import { OdDetailMappedResponse, OdDetailResponse } from "./type/common";
import { DataSaranaBus } from "@/entities/DataSaranaBus";
import { MODA } from "@/constants/moda";
import { formatDateString } from "@/utils/date";
import { mapDataByRanges } from "@/rest/mapper/mapDataByDateRange";
import { RANGE_DATE } from "@/constants/range";
import {
  getDataEvent,
  getDataPantauProduksiSeasonal,
} from "@/services/apiHubnet";
import { createErrorResponse } from "@/utils/error";
import { mapODRoutineDetailResponseV2 } from "./odRoutineDetail";
import { mapDaysToDateLabels } from "@/rest/mapper/mapDaysToDateLabels";
import { mapMissingODKeys } from "@/rest/mapper/mapMissingODKeys";
import { mapDataSeasonal } from "@/rest/mapper/common";

const odSeasonalDetailRequest = Joi.object({
  event: Joi.string().required(),
  idOrigin: Joi.string().required(),
  idDestination: Joi.string().required(),
  reportType: Joi.string().valid("daily", "weekly", "monthly", "yearly")
});

export const odSeasonalDetailHandler = async (req: Request, res: Response) => {
  const { moda } = req.params;
  const { error, value } = odSeasonalDetailRequest.validate(req.query);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details.map((err) => err.message).join(", "),
    });
  }

  try {
    const { event, idOrigin, idDestination, reportType } = value;
    const eventData = await getDataEvent();
    const eventDataFiltered = eventData.data.filter((item) => item.id == event);
    if (eventDataFiltered.length === 0) {
      return res.status(404).json(createErrorResponse("Event not found", 404));
    }

    let dataList = [];
    let dataResp: OdDetailMappedResponse = {};

    const startDate = new Date(eventDataFiltered[0].tanggal_mulai);
    const endDate = new Date(eventDataFiltered[0].tanggal_selesai);

    const productionData = await getDataPantauProduksiSeasonal({
      event,
      provinsi: "",
      moda: "",
      endpoints: [],
    });
    const mappedProductionData = mapDataSeasonal(event, productionData);

    const eventDates: Date[] = Object.entries(mappedProductionData.data.event)
      .filter(([key]) => /^h_\d+$/.test(key)) // filter `h_x` keys
      .sort(([aKey], [bKey]) => {
        const aNum = parseInt(aKey.split("_")[1], 10);
        const bNum = parseInt(bKey.split("_")[1], 10);
        return aNum - bNum;
      })
      .map(([, value]) => new Date(value));

    switch (moda.toLowerCase()) {
      case MODA.JALAN:
      // const repository = AppDataSource.getRepository(DataSaranaBus);
      // dataList = await repository
      //   .createQueryBuilder("DataSaranaBus")
      //   .leftJoinAndSelect("DataSaranaBus.terminalAsal", "terminalAsal")
      //   .leftJoinAndSelect("DataSaranaBus.terminalTujuan", "terminalTujuan")
      //   .where(
      //     "DataSaranaBus.idTerminalAsal = :idOrigin OR DataSaranaBus.idTerminalTujuan = :idDestination",
      //     { idOrigin, idDestination }
      //   )
      //   .andWhere("DataSaranaBus.isNihil = 0")
      //   .andWhere("DataSaranaBus.isDelete = 0")
      //   .select([
      //     "DataSaranaBus.tglData as date",
      //     "terminalAsal.id as id_origin",
      //     "terminalAsal.namaTerminal as origin",
      //     "terminalTujuan.id as id_destination",
      //     "terminalTujuan.namaTerminal as destination",
      //     "SUM(DataSaranaBus.jmlPenumpangNaik) as departure",
      //     "SUM(DataSaranaBus.jmlPenumpangTurun) as arrival",
      //     "COUNT(CASE WHEN DataSaranaBus.jmlPenumpangNaik > 0 THEN 1 END) as vehicle_departure",
      //     "COUNT(CASE WHEN DataSaranaBus.jmlPenumpangTurun > 0 THEN 1 END) as vehicle_arrival",
      //   ])
      //   .where(
      //     "DataSaranaBus.tglData BETWEEN :tanggalAwal AND :tanggalAkhir",
      //     {
      //       tanggalAwal: startDate,
      //       tanggalAkhir: endDate,
      //     }
      //   )
      //   .groupBy("DataSaranaBus.tglData")
      //   .addGroupBy("terminalAsal.id")
      //   .addGroupBy("terminalTujuan.id")
      //   .getRawMany();

      // dataList = dataList.map((item) => {
      //   return {
      //     ...item,
      //     date: formatDateString(item.date),
      //     departure: parseInt(item.departure),
      //     arrival: parseInt(item.arrival),
      //     vehicleDeparture: parseInt(item.vehicle_departure),
      //     vehicleArrival: parseInt(item.vehicle_arrival),
      //   };
      // });

      // dataResp = {
      //   origin: mapDataByRanges(
      //     dataList.filter((item) => item.id_origin == idOrigin),
      //     [RANGE_DATE.WEEKLY, RANGE_DATE.MONTHLY, RANGE_DATE.YEARLY]
      //   ),
      //   destination: mapDataByRanges(
      //     dataList.filter((item) => item.id_destination == idDestination),
      //     [RANGE_DATE.WEEKLY, RANGE_DATE.MONTHLY, RANGE_DATE.YEARLY]
      //   ),
      // };

      // break;
      case MODA.ASDP:
      case MODA.LAUT:
      case MODA.UDARA:
      case MODA.STASIUN:
        dataResp = await mapODRoutineDetailResponseV2({
          idOrigin,
          idDestination,
          tanggalAwal: eventDataFiltered[0].tanggal_mulai,
          tanggalAkhir: eventDataFiltered[0].tanggal_selesai,
          moda,
          reportType,
          event
        });
        break;
      default:
        break;
    }

    if (dataResp.origin != null) {
      dataResp.origin!.weekly = mapDaysToDateLabels(
        dataResp.origin?.weekly,
        eventDates
      );
    }
    if (dataResp.destination != null) {
      dataResp.destination!.weekly = mapDaysToDateLabels(
        dataResp.destination?.weekly,
        eventDates
      );
    }

    const mappedWeeklyData = mapMissingODKeys(
      dataResp.origin!.weekly,
      dataResp.destination!.weekly
    );
    dataResp.origin!.weekly = mappedWeeklyData.origin;
    dataResp.destination!.weekly = mappedWeeklyData.destination;

    const response = {
      eventDates,
      status: true,
      message: "Success",
      data: dataResp,
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
