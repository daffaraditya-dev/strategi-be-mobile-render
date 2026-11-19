import { Request, Response } from "express";
import Joi from "joi";
// import { sumDataPertitik } from "./util/sumData";
import {
  AggregationPeriod,
  matriksData,
  periodMatriksRegional,
} from "@/repositories/dataMatriks";
import { reduce, sumBy } from "lodash";
// import { createProduksiPertitik } from "@/constants/sampleData";

const comparisonRequest = Joi.object({
  idLokasi: Joi.string(),
  namaProvinsi: Joi.string().allow(""),
  tanggalAwal1: Joi.string(),
  tanggalAkhir1: Joi.string(),
  moda: Joi.string().required(),
  sort: Joi.string().valid("asc", "desc").optional(),
  reportType: Joi.string()
    .valid("daily", "weekly", "monthly", "yearly")
    .required(),
  page: Joi.string(),
  pageSize: Joi.string(),
  event: Joi.string(),
});

export const comparisonHub = async (req: Request, res: Response) => {
  const { error, value } = comparisonRequest.validate(req.query);

  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const {
      tanggalAwal1,
      tanggalAkhir1,
      moda,
      sort,
      reportType,
      idLokasi,
      page,
      pageSize,
      event,
    } = value;

    const eventFilter = Number(event) === 0 || Number.isNaN(Number(event)) ? undefined : Number(event);

    let time: any = {
      message: [],
      totalProcess: 0,
    };

    const startProcessDB = performance.now();
    const { data: dataMatrik, ...paginateData } = await matriksData({
      endDate: tanggalAkhir1,
      ids: idLokasi,
      startDate: tanggalAwal1,
      page,
      pageSize,
      moda,
      sort,
      event: eventFilter,
      isUseTotal: ["toll", "arteri"].includes(moda),
    });

    const dataMatrikSum = await periodMatriksRegional({
      endDate: tanggalAkhir1,
      startDate: tanggalAwal1,
      moda,
      periodType: reportType,
      idLokasi,
      event: eventFilter,
      isUseTotal: ["toll", "arteri"].includes(moda),
    });

    const endProcessDB = performance.now();
    time["processDB"] = (startProcessDB - endProcessDB) / 1000;

    const startProcess = performance.now();
    const finalMatrik = dataMatrik.map((item) => {
      return {
        idLocation: item?.idLokasi,
        location: item?.kota,
        departureSummary: item?.departure,
        arrivalSummary: item?.arrival,
        vehicleDepartureSummary: item?.vehicleDeparture,
        vehicleArrivalSummary: item?.vehicleArrival,
      };
    });
    const finalMatrikSum = { daily: {}, weekly: {}, monthly: {}, yearly: {} };
    const computeMatrikSum = reduce(
      dataMatrikSum,
      (acc: any, item) => {
        acc[eventFilter ? item?.label : item?.period] = {
          label: item.period,
          departure: item.departure,
          arrival: item.arrival,
          vehicleDeparture: item.vehicleDeparture,
          vehicleArrival: item.vehicleArrival,
        };
        return acc;
      },
      {}
    );

    finalMatrikSum["daily"] =
      (reportType as AggregationPeriod) == "daily" ? computeMatrikSum : {};
    finalMatrikSum["weekly"] =
      (reportType as AggregationPeriod) == "weekly" ? computeMatrikSum : {};
    finalMatrikSum["monthly"] =
      (reportType as AggregationPeriod) == "monthly" ? computeMatrikSum : {};
    finalMatrikSum["yearly"] =
      (reportType as AggregationPeriod) == "yearly" ? computeMatrikSum : {};

    const endProcess = performance.now();
    time["computeProcess"] = (startProcess - endProcess) / 1000;

    const total = {
      departure: sumBy(dataMatrik, "departure"),
      arrival: sumBy(dataMatrik, "arrival"),
      vehicleDeparture: sumBy(dataMatrik, "vehicleDeparture"),
      vehicleArrival: sumBy(dataMatrik, "vehicleArrival"),
    };

    return res.status(200).json({
      status: true,
      ...paginateData,
      message: "Data retrived",
      data: {
        time,
        list: finalMatrik,
        graph: finalMatrikSum,
        total,
      },
    });
  } catch (error) {
    console.log(error, "-----error----");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
