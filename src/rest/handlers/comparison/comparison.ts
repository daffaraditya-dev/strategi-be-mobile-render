import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import {
  getDataPantauProduksiRutin,
  getDataPantauProduksiSeasonal,
} from "@/services/apiHubnet";
import { mobillityByDate } from "@/rest/mapper/mobillityByDate";
import Joi from "joi";
import { mapDataByRanges } from "@/rest/mapper/mapDataByDateRange";
import { RANGE_DATE } from "@/constants/range";
import {
  ComparisonData,
  ComparisonResponse,
  TransportationMetrics,
} from "./type/comparison";
import { mapRegionNodeModa } from "@/rest/mapper/mapRegionNodeModa";
import { mobillityPointByDate } from "@/rest/mapper/mobillityPointByDate";
import { mapDataSeasonal } from "@/rest/mapper/common";

const comparisonRequest = Joi.object({
  tanggalAwal1: Joi.string(),
  tanggalAkhir1: Joi.string(),
  event: Joi.string(),
  idLocation: Joi.number().required(),
  moda: Joi.string().required(),
});

export const comparisonHandler = async (req: Request, res: Response) => {
  const { error, value } = comparisonRequest.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { tanggalAwal1, tanggalAkhir1, event, idLocation, moda } = value;
    const modaLower = moda.toLowerCase();

    const comparisonData: ComparisonData[] = [];
    const validation = idLocation !== "null" && idLocation != "0" && idLocation !== undefined;

    // routine
    if (tanggalAwal1 || tanggalAkhir1) {
      const data = await getDataPantauProduksiRutin({
        tanggal_awal_1: tanggalAwal1,
        tanggal_akhir_1: tanggalAkhir1,
        provinsi: "",
        moda: modaLower,
        endpoints: ["data-pantau", "data-produksi", "data-produksi-pertitik"],
      });

      const graphData = mobillityPointByDate(data, modaLower).filter(
        (item) => item.idLokasi == idLocation
      );
      const graphRange = mapDataByRanges(graphData, [
        RANGE_DATE.WEEKLY,
        RANGE_DATE.MONTHLY,
        RANGE_DATE.YEARLY,
      ]);

      const regionData = mapRegionNodeModa(data, modaLower, "");

      const regionFilter = regionData.find(
        (item) => item.idLocation == idLocation
      );

      if (regionFilter) {
        comparisonData.push({
          moda: moda,
          idLocation: idLocation,
          location: regionFilter?.name ?? "",
          arrivalSummary: regionFilter?.arrival ?? 0,
          vehicleArrivalSummary: regionFilter?.vehicleArrival ?? 0,
          departureSummary: regionFilter?.departure ?? 0,
          vehicleDepartureSummary: regionFilter?.vehicleDeparture ?? 0,
          weekly: graphRange.weekly,
          monthly: graphRange.monthly,
          yearly: graphRange.yearly,
        });
      }
    }

    // seasonal
    if (event) {
      const dataAll = await getDataPantauProduksiSeasonal({
        event,
        provinsi: "",
        moda: modaLower,
        endpoints: ["data-pantau", "data-produksi", "data-produksi-pertitik"],
      });
      const data = mapDataSeasonal(event, dataAll);

      const graphData = mobillityPointByDate(data, modaLower, true).filter(
        (item) => item.idLokasi == idLocation
      );

      const graphResult: Record<string, TransportationMetrics> = {};
      graphData.forEach((item) => {
        graphResult[item.date] = {
          arrival: item.arrival,
          departure: item.departure,
          vehicleArrival: item.vehicleArrival,
          vehicleDeparture: item.vehicleDeparture,
        };
      });

      const regionData = mapRegionNodeModa(data, modaLower, "");
      const regionFilter = regionData.find(
        (item) => item.idLocation == idLocation
      );

      if (regionFilter) {
        comparisonData.push({
          moda: moda,
          idLocation: idLocation,
          location: regionFilter?.name ?? "",
          arrivalSummary: regionFilter?.arrival ?? 0,
          vehicleArrivalSummary: regionFilter?.vehicleArrival ?? 0,
          departureSummary: regionFilter?.departure ?? 0,
          vehicleDepartureSummary: regionFilter?.vehicleDeparture ?? 0,
          seasonal: graphResult,
        });
      }
    }

    const response: ComparisonResponse = {
      success: true,
      data: comparisonData,
    };
    return res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching focus records:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to fetch focus records", 500));
  }
};
