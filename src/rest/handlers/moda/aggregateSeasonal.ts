import { Request, Response } from "express";
import Joi from "joi";
import {
  AggregateSeasonalGraphData,
  AggregateSeasonalResponse,
} from "./type/aggregateSeasonal";
import {
  getDataEvent,
  getDataPantauProduksiSeasonal,
} from "@/services/apiHubnet";
import { MODA } from "@/constants/moda";
import { mobillityByDate } from "@/rest/mapper/mobillityByDate";
import { mapHighestNodeModa } from "@/rest/mapper/mapHighestNodeModa";
import { sumAsdpCapacity } from "@/rest/mapper/sumAsdpCapacity";
import { MstProvinsi } from "@/entities/MstProvinsi";
import { AppDataSource } from "@/data-source";
import { createErrorResponse } from "@/utils/error";
import { mapDataSeasonal } from "@/rest/mapper/common";
import { sumFlightData } from "@/rest/mapper/sumFlight";
import { sumSailingData } from "@/rest/mapper/sumSailing";

const aggregateSeasonalRequest = Joi.object({
  event: Joi.string().required(),
  provinsi: Joi.string().optional(),
});

export const aggregateSeasonalHandler = async (req: Request, res: Response) => {
  const { moda } = req.params;
  const { error, value } = aggregateSeasonalRequest.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { event, provinsi } = value;

    let provinceName = "";
    if (provinsi) {
      const provinceRepository = AppDataSource.getRepository(MstProvinsi);
      provinceName =
        (await provinceRepository
          .findOne({
            where: {
              kodeBps: provinsi,
            },
          })
          .then((data) => data?.namaProvinsi)) ?? "";
    }

    const dataAll = await getDataPantauProduksiSeasonal({
      event,
      provinsi: provinsi ?? "",
      moda: moda,
      endpoints: ["data-pantau", "data-produksi", "data-produksi-pertitik"],
    });
    const data = mapDataSeasonal(event, dataAll);

    const graphData = mobillityByDate(data, moda, true);
    const graphResult: AggregateSeasonalGraphData = {};
    graphData.forEach((item) => {
      graphResult[item.date] = {
        arrival: item.arrival,
        departure: item.departure,
        vehicleArrival: item.vehicleArrival,
        vehicleDeparture: item.vehicleDeparture,
      };
    });

    const eventData = await getDataEvent();
    const eventDataFiltered = eventData.data.filter((item) => item.id == event);
    if (eventDataFiltered.length === 0) {
      return res.status(404).json(createErrorResponse("Event not found", 404));
    }

    const summaryFlight = sumFlightData(data);
    const summarySailing = sumSailingData(data);

    const response: AggregateSeasonalResponse = {
      status: true,
      message: "Success",
      data: {
        graph: {
          seasonal: graphResult,
        },
        chart: mapHighestNodeModa(data, moda, provinceName),
      },
    };
    if (moda === MODA.UDARA) {
      response.data.chartFlight = {
        passengers: {
          domestic: summaryFlight.udara.passengers.departure,
          outbound: summaryFlight.udara.passengers.intDeparture,
          inbound: summaryFlight.udara.passengers.intArrival,
        },
        aircraft: {
          domestic: summaryFlight.udara.aircraft.departure,
          outbound: summaryFlight.udara.aircraft.intDeparture,
          inbound: summaryFlight.udara.aircraft.intArrival,
        },
      };
    }
    if (moda === MODA.ASDP) {
      response.data.chartCapacity = sumAsdpCapacity(data);
    }
    if (moda === MODA.LAUT) {
      response.data.chartSailing = {
        passengers: {
          domestic: summarySailing.laut.passengers.departure,
          outbound: summarySailing.laut.passengers.intDeparture,
          inbound: summarySailing.laut.passengers.intArrival,
        },
        ship: {
          domestic: summarySailing.laut.ship.departure,
          outbound: summarySailing.laut.ship.intDeparture,
          inbound: summarySailing.laut.ship.intArrival,
        },
      };
    }

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
