import { Request, Response } from "express";
import Joi from "joi";
import { OdDetailMappedResponse, OdDetailResponse } from "./type/common";
import { AggregationPeriod, periodMatriksLocation } from "@/repositories/dataMatriks";
import { Moda } from "@/type/produksi.titik.type";
import { reduce } from "lodash";

const odRoutineDetailRequest = Joi.object({
  tanggalAwal1: Joi.string().required(),
  tanggalAkhir1: Joi.string().required(),
  idOrigin: Joi.string().required(),
  idDestination: Joi.string().required(),
  reportType: Joi.string().valid("daily", "weekly", "monthly", "yearly")
});

export const odRoutineDetailHandler = async (req: Request, res: Response) => {
  const { moda } = req.params;
  const { error, value } = odRoutineDetailRequest.validate(req.query);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details.map((err) => err.message).join(", "),
    });
  }

  try {
    const { tanggalAwal1, tanggalAkhir1, idOrigin, idDestination, reportType } = value;

    const dataResp: OdDetailMappedResponse = await mapODRoutineDetailResponseV2({
      idOrigin,
      idDestination,
      tanggalAwal: tanggalAwal1,
      tanggalAkhir: tanggalAkhir1,
      moda,
      reportType: reportType
    });

    const response: OdDetailResponse = {
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

export const mapODRoutineDetailResponseV2 = async ({
  idOrigin,
  idDestination,
  tanggalAwal,
  tanggalAkhir,
  moda,
  event = 0,
  reportType = "daily"
}: {
  idOrigin: string | number;
  idDestination: string | number;
  tanggalAwal: string;
  tanggalAkhir: string;
  moda: string;
  reportType?: AggregationPeriod;
  event?: number;
}): Promise<OdDetailMappedResponse> => {
  const [dataMatrikOrigin, dataMatrikDestination] = await Promise.all([
    periodMatriksLocation({
      endDate: tanggalAkhir,
      startDate: tanggalAwal,
      moda: moda as Moda,
      periodType: reportType,
      idLokasi: String(idOrigin),
      event: Number(event) === 0 || isNaN(event) ? undefined : event,
    }),
    periodMatriksLocation({
      endDate: tanggalAkhir,
      startDate: tanggalAwal,
      moda: moda as Moda,
      periodType: reportType,
      idLokasi: String(idDestination),
      event: Number(event) === 0 || isNaN(event) ? undefined : event,
    }),
  ]);

  // origin
  const finalMatrikSumOrigin = { daily: {}, weekly: {}, monthly: {}, yearly: {} };
  const computeMatrikSumOrigin = reduce(dataMatrikOrigin, (acc: any, item) => {
    const key = event && (Number(event) !== 0 || !isNaN(event)) ? item?.label : item?.period;
    acc[key] = {
      idLokasi: item.idLokasi,
      label: item.period,
      departure: item.departure,
      arrival: item.arrival,
      vehicleDeparture: item.vehicleDeparture,
      vehicleArrival: item.vehicleArrival,
    };
    return acc;
  }, {});

  finalMatrikSumOrigin["daily"] = reportType as AggregationPeriod == "daily" ? computeMatrikSumOrigin : {};
  finalMatrikSumOrigin["weekly"] = reportType as AggregationPeriod == "weekly" ? computeMatrikSumOrigin : {};
  finalMatrikSumOrigin["monthly"] = reportType as AggregationPeriod == "monthly" ? computeMatrikSumOrigin : {};
  finalMatrikSumOrigin["yearly"] = reportType as AggregationPeriod == "yearly" ? computeMatrikSumOrigin : {};

  // destination
  const finalMatrikSumDestinations = { daily: {}, weekly: {}, monthly: {}, yearly: {} };
  const computeMatrikSumDestinations = reduce(dataMatrikDestination, (acc: any, item) => {
    const key = event && (Number(event) !== 0 || !isNaN(event)) ? item?.label : item?.period;
    acc[key] = {
      idLokasi: item.idLokasi,
      label: item.period,
      departure: item.departure,
      arrival: item.arrival,
      vehicleDeparture: item.vehicleDeparture,
      vehicleArrival: item.vehicleArrival,
    };
    return acc;
  }, {});

  finalMatrikSumDestinations["daily"] = reportType as AggregationPeriod == "daily" ? computeMatrikSumDestinations : {};
  finalMatrikSumDestinations["weekly"] = reportType as AggregationPeriod == "weekly" ? computeMatrikSumDestinations : {};
  finalMatrikSumDestinations["monthly"] = reportType as AggregationPeriod == "monthly" ? computeMatrikSumDestinations : {};
  finalMatrikSumDestinations["yearly"] = reportType as AggregationPeriod == "yearly" ? computeMatrikSumDestinations : {};

  return {
    destination: finalMatrikSumDestinations,
    origin: finalMatrikSumOrigin
  };
};


