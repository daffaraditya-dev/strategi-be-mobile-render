import { Request, Response } from "express";
import Joi from "joi";
import { AggregateRoutineResponse } from "./type/aggregateRoutine";
import { getDataPantauProduksiRutin } from "@/services/apiHubnet";
import { mobillityByDate } from "@/rest/mapper/mobillityByDate";
import { RANGE_DATE } from "@/constants/range";
import { mapDataByRanges } from "@/rest/mapper/mapDataByDateRange";
import { mapHighestNodeModa } from "@/rest/mapper/mapHighestNodeModa";
import { MODA } from "@/constants/moda";
import { sumAsdpCapacity } from "@/rest/mapper/sumAsdpCapacity";
import { AppDataSource } from "@/data-source";
import { MstProvinsi } from "@/entities/MstProvinsi";
import { getMovementDomesticInternational } from "@/services/backendApiHubnet";
import { mapInboundOutboundDomestic } from "@/rest/mapper/mapInboundOutboundDomestic";
import { sumFlightData } from "@/rest/mapper/sumFlight";
import { sumSailingData } from "@/rest/mapper/sumSailing";

const aggregateRoutineRequest = Joi.object({
  tanggalAwal1: Joi.string().required(),
  tanggalAkhir1: Joi.string().required(),
  provinsi: Joi.string().optional(),
});

export const aggregateRoutineHandler = async (req: Request, res: Response) => {
  const { error, value } = aggregateRoutineRequest.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { moda } = req.params;
    const { tanggalAwal1, tanggalAkhir1, provinsi } = value;

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

    const data = await getDataPantauProduksiRutin({
      tanggal_awal_1: tanggalAwal1,
      tanggal_akhir_1: tanggalAkhir1,
      provinsi: provinsi ?? "",
      moda: moda,
      endpoints: ["data-pantau", "data-produksi", "data-produksi-pertitik"],
    });

    const graphData = mobillityByDate(data, moda);

    const summaryFlight = sumFlightData(data);
    const summarySailing = sumSailingData(data);

    const response: AggregateRoutineResponse = {
      status: true,
      message: "Success",
      data: {
        graph: mapDataByRanges(graphData, [
          RANGE_DATE.WEEKLY,
          RANGE_DATE.MONTHLY,
          RANGE_DATE.YEARLY,
        ]),
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
