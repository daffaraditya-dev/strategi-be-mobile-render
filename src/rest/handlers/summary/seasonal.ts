import {
  getDataEvent,
  getDataPantauProduksiSeasonal,
} from "@/services/apiHubnet";
import { sumPassengerData } from "@/rest/mapper/sumPassengers";
import { Request, Response } from "express";
import Joi from "joi";
import { SummaryResponse } from "./type/common";
import { sumVehicleData } from "@/rest/mapper/sumVehicle";
import { sumNetworkData } from "@/rest/mapper/sumNetwork";
import { sumFlightData } from "@/rest/mapper/sumFlight";
import { MODA } from "@/constants/moda";
import { createErrorResponse } from "@/utils/error";
import { mapDataSeasonal } from "@/rest/mapper/common";
import { sumSailingData } from "@/rest/mapper/sumSailing";
import { getPerformanceReport } from "@/services/backendApiHubnet";
import { EventData } from "@/services/type/apiHubnet";
import { PerformanceReportData } from "@/services/type/backendApiHubnet";

const seasonalRequest = Joi.object({
  event: Joi.string().required(),
  provinsi: Joi.string().optional(),
  moda: Joi.string().optional(),
});

export const seasonalHandler = async (req: Request, res: Response) => {
  const { error, value } = seasonalRequest.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { event, provinsi, moda } = value;

    const dataAll = await getDataPantauProduksiSeasonal({
      event,
      provinsi: provinsi ?? "",
      moda: moda ?? "",
      endpoints: ["data-pantau", "data-produksi", "data-produksi-pertitik"],
    });
    const data = mapDataSeasonal(event, dataAll);

    const summaryGraph = sumPassengerData(data, [
      MODA.JALAN,
      MODA.ASDP,
      MODA.LAUT,
      MODA.UDARA,
      MODA.STASIUN,
    ]);
    const summaryVehicle = sumVehicleData(data, [
      MODA.TERMINALB,
      MODA.UDARA,
      MODA.LAUT,
      MODA.ASDP,
      MODA.STASIUN,
      MODA.JALAN,
    ]);
    const summaryNetwork = sumNetworkData(data, ["toll", "toll_2", "arteri"]);
    const summaryFlight = sumFlightData(data);
    const summarySailing = sumSailingData(data);

    const eventData = await getDataEvent();
    const eventDataFiltered = eventData.data.filter((item) => item.id == event);
    if (eventDataFiltered.length === 0) {
      return res.status(404).json(createErrorResponse("Event not found", 404));
    }

    const avgPerformanceJalan = await getAvgPerformanceData(
      MODA.JALAN,
      eventDataFiltered
    );
    const avgPerformanceAsdp = await getAvgPerformanceData(
      MODA.ASDP,
      eventDataFiltered
    );
    const avgPerformanceLaut = await getAvgPerformanceData(
      MODA.LAUT,
      eventDataFiltered
    );
    const avgPerformanceUdara = await getAvgPerformanceData(
      MODA.UDARA,
      eventDataFiltered
    );
    const avgPerformanceKa = await getAvgPerformanceData(
      MODA.STASIUN,
      eventDataFiltered
    );

    const response: SummaryResponse = {
      status: true,
      data: {
        graph: [
          { name: "Jalan", count: summaryGraph.jalan?.total },
          { name: "SDP", count: summaryGraph.asdp?.total },
          { name: "Laut", count: summaryGraph.laut?.total },
          { name: "Udara", count: summaryGraph.udara?.total },
          { name: "KA", count: summaryGraph.stasiun?.total },
        ],
        vehicle: [
          {
            type: MODA.JALAN,
            name: "Bus",
            count: summaryVehicle.produksi.jalan?.total,
            percent: Number(avgPerformanceJalan),
          },
          {
            type: MODA.UDARA,
            name: "Pesawat",
            count: summaryVehicle.produksi.udara?.total,
            percent: Number(avgPerformanceUdara),
          },
          {
            type: MODA.LAUT,
            name: "Kapal Laut",
            count: summaryVehicle.produksi.laut?.total,
            percent: Number(avgPerformanceLaut),
          },
          {
            type: MODA.ASDP,
            name: "Kapal Penyeberangan",
            count: summaryVehicle.produksi.asdp?.total,
            percent: Number(avgPerformanceAsdp),
          },
          {
            type: MODA.STASIUN,
            name: "Kereta Api",
            count: summaryVehicle.produksi.stasiun?.total,
            percent: Number(avgPerformanceKa),
          },
        ],
        network: [
          {
            type: MODA.TOLL,
            name: "Lalu Lintas Jalan Tol",
            count:
              summaryNetwork.produksi.toll?.total +
              summaryNetwork.produksi.toll_2?.total,
            point:
              summaryNetwork.pantau.toll?.total +
              summaryNetwork.pantau.toll_2?.total,
          },
          {
            type: MODA.ARTERI,
            name: "Lalu Lintas Jalan Arteri",
            count: summaryNetwork.produksi.arteri?.total,
            point: summaryNetwork.pantau.arteri?.total,
          },
        ],
        flight: {
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
        },
        sailing: {
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
        },
      },
      filter: value,
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
const getAvgPerformanceData = async (moda: string, event: EventData[]) => {
  const performanceData = await getPerformanceReport(
    {
      tanggal_awal: event[0].tanggal_mulai,
      tanggal_akhir: event[0].tanggal_selesai,
    },
    moda
  );

  const validPersentase: number[] = performanceData.data
    .map((item: PerformanceReportData) => parseFloat(item.persentase ?? ""))
    .filter((value: number) => !isNaN(value));

  const averagePersentase: number =
    validPersentase.length > 0
      ? validPersentase.reduce((sum, val) => sum + val, 0) /
        validPersentase.length
      : 0;

  return averagePersentase.toFixed(2);
};
