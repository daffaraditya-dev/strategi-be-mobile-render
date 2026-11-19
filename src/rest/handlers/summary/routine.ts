import { getDataPantauProduksiRutin } from "@/services/apiHubnet";
import { sumPassengerData } from "@/rest/mapper/sumPassengers";
import { Request, Response } from "express";
import Joi from "joi";
import { SummaryResponse } from "./type/common";
import { sumVehicleData } from "@/rest/mapper/sumVehicle";
import { sumNetworkData } from "@/rest/mapper/sumNetwork";
import { sumFlightData } from "@/rest/mapper/sumFlight";
import { MODA } from "@/constants/moda";
import {
  getDataSailingDomesticInternational,
  getPerformanceReport,
} from "@/services/backendApiHubnet";
import { mapSailingDomesticInternational } from "@/rest/mapper/mapSailingDomesticInternational";
import { sumSailingData } from "@/rest/mapper/sumSailing";
import { PerformanceReportData } from "@/services/type/backendApiHubnet";

const routineRequest = Joi.object({
  tanggalAwal1: Joi.string().required(),
  tanggalAkhir1: Joi.string().required(),
  provinsi: Joi.string().optional(),
  moda: Joi.string().optional(),
});

export const routineHandler = async (req: Request, res: Response) => {
  const { error, value } = routineRequest.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { tanggalAwal1, tanggalAkhir1, provinsi, moda } = value;

    const data = await getDataPantauProduksiRutin({
      tanggal_awal_1: tanggalAwal1,
      tanggal_akhir_1: tanggalAkhir1,
      provinsi: provinsi ?? "",
      moda: moda ?? "",
      endpoints: ["data-pantau", "data-produksi", "data-produksi-pertitik"],
    });

    const summaryGraph = sumPassengerData(data, [
      MODA.JALAN,
      MODA.ASDP,
      MODA.LAUT,
      MODA.UDARA,
      MODA.STASIUN,
    ]);
    const summaryVehicle = sumVehicleData(data, [
      MODA.JALAN,
      MODA.UDARA,
      MODA.LAUT,
      MODA.ASDP,
      MODA.STASIUN,
    ]);
    const summaryNetwork = sumNetworkData(data, ["toll", "toll_2", "arteri"]);
    const summaryFlight = sumFlightData(data);
    const summarySailing = sumSailingData(data);

    const avgPerformanceJalan = await getAvgPerformanceData(
      MODA.JALAN,
      tanggalAwal1,
      tanggalAkhir1
    );
    const avgPerformanceAsdp = await getAvgPerformanceData(
      MODA.ASDP,
      tanggalAwal1,
      tanggalAkhir1
    );
    const avgPerformanceLaut = await getAvgPerformanceData(
      MODA.LAUT,
      tanggalAwal1,
      tanggalAkhir1
    );
    const avgPerformanceUdara = await getAvgPerformanceData(
      MODA.UDARA,
      tanggalAwal1,
      tanggalAkhir1
    );
    const avgPerformanceKa = await getAvgPerformanceData(
      MODA.STASIUN,
      tanggalAwal1,
      tanggalAkhir1
    );

    const response: SummaryResponse = {
      status: true,
      data: {
        graph: [
          { name: "Jalan", count: summaryGraph.jalan.total },
          { name: "SDP", count: summaryGraph.asdp.total },
          { name: "Laut", count: summaryGraph.laut.total },
          { name: "Udara", count: summaryGraph.udara.total },
          { name: "KA", count: summaryGraph.stasiun.total },
        ],
        vehicle: [
          {
            type: MODA.JALAN,
            name: "Bus",
            count: summaryVehicle.produksi.jalan.total,
            percent: Number(avgPerformanceJalan),
          },
          {
            type: MODA.UDARA,
            name: "Pesawat",
            count: summaryVehicle.produksi.udara.total,
            percent: Number(avgPerformanceUdara),
          },
          {
            type: MODA.LAUT,
            name: "Kapal Laut",
            count: summaryVehicle.produksi.laut.total,
            percent: Number(avgPerformanceLaut),
          },
          {
            type: MODA.ASDP,
            name: "Kapal Penyeberangan",
            count: summaryVehicle.produksi.asdp.total,
            percent: Number(avgPerformanceAsdp),
          },
          {
            type: MODA.STASIUN,
            name: "Kereta Api",
            count: summaryVehicle.produksi.stasiun.total,
            percent: Number(avgPerformanceKa),
          },
        ],
        network: [
          {
            type: MODA.TOLL,
            name: "Lalu Lintas Jalan Tol",
            count:
              summaryNetwork.produksi.toll.total +
              summaryNetwork.produksi.toll_2.total,
            point:
              summaryNetwork.pantau.toll.total +
              summaryNetwork.pantau.toll_2.total,
          },
          {
            type: MODA.ARTERI,
            name: "Lalu Lintas Jalan Arteri",
            count: summaryNetwork.produksi.arteri.total,
            point: summaryNetwork.pantau.arteri.total,
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

const getAvgPerformanceData = async (
  moda: string,
  tanggalAwal: string,
  tanggalAkhir: string
) => {
  const performanceData = await getPerformanceReport(
    {
      tanggal_awal: tanggalAwal,
      tanggal_akhir: tanggalAkhir,
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
