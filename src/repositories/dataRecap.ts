import { MODA } from "@/constants/moda";
import { AppDataSource } from "@/data-source";
import { MatrikPertitik } from "@/entities/MatrikPertitik";
import { MatrikProduksi } from "@/entities/MatrikProduksi";
import { getPerformanceReport } from "@/services/backendApiHubnet";
import { PerformanceReportData } from "@/services/type/backendApiHubnet";
import { Moda } from "@/type/produksi.titik.type";
import { isArray, isEmpty, map } from "lodash";

export type AggregationPeriod = "daily" | "weekly" | "monthly" | "yearly";

interface matrikPayload {
  moda?: Moda;
  startDate: string;
  endDate: string;
  periodType?: AggregationPeriod;
  sort?: "DESC" | "ASC";
  type?: string[];
  page?: string;
  pageSize?: string;
  event?: number;
}

export interface SummaryResponse {
  data: {
    graph: { name: string; count: number }[];
    vehicle: { type: any; name: string; count: number; percent: number }[];
    network: { type: any; name: string; count: number; point: number }[];
    flight: {
      passengers: { domestic: number; outbound: number; inbound: number };
      aircraft: { domestic: number; outbound: number; inbound: number };
    };
    sailing: {
      passengers: { domestic: number; outbound: number; inbound: number };
      ship: { domestic: number; outbound: number; inbound: number };
    };
  };
}

export const summaryData = async ({
  startDate,
  endDate,
  event,
}: matrikPayload): Promise<SummaryResponse> => {
  const matrikProduksiRepository = AppDataSource.getRepository(MatrikProduksi);
  const queryBuilder = matrikProduksiRepository
    .createQueryBuilder("dr")
    .select("dr.moda", "moda")
    .addSelect("dr.type", "type")
    .addSelect("SUM(dr.departure)", "totalDeparture")
    .addSelect("SUM(dr.arrival)", "totalArrival")
    .addSelect("SUM(dr.vehicleDeparture)", "totalVehicleDeparture")
    .addSelect("SUM(dr.vehicleArrival)", "totalVehicleArrival")
    .addSelect("COUNT(dr.id)", "totalItemCount");

  if (event) {
    queryBuilder.andWhere("dr.event = :event", { event: event });
  } else {
    queryBuilder
      .andWhere("dr.event = :event", { event: 0 })
      .andWhere("dr.date >= :startDate", { startDate: startDate })
      .andWhere("dr.date <= :endDate", { endDate: endDate });
  }

  queryBuilder.groupBy("dr.moda").addGroupBy("dr.type").addGroupBy("dr.date");

  const dataRekapSum = await queryBuilder.getRawMany();
  const response: SummaryResponse = {
    data: {
      graph: [
        { name: MODA.JALAN, count: 0 },
        { name: MODA.UDARA, count: 0 },
        { name: MODA.LAUT, count: 0 },
        { name: MODA.ASDP, count: 0 },
        { name: MODA.STASIUN, count: 0 },
      ],
      vehicle: [
        { type: MODA.JALAN, name: "Bus", count: 0, percent: 0 },
        { type: MODA.UDARA, name: "Pesawat", count: 0, percent: 0 },
        { type: MODA.LAUT, name: "Kapal Laut", count: 0, percent: 0 },
        { type: MODA.ASDP, name: "Kapal Penyeberangan", count: 0, percent: 0 },
        { type: MODA.STASIUN, name: "Kereta Api", count: 0, percent: 0 },
      ],
      network: [
        { type: MODA.TOLL, name: "Lalu Lintas Jalan Tol", count: 0, point: 0 },
        {
          type: MODA.ARTERI,
          name: "Lalu Lintas Jalan Arteri",
          count: 0,
          point: 0,
        },
      ],
      flight: {
        passengers: { domestic: 0, outbound: 0, inbound: 0 },
        aircraft: { domestic: 0, outbound: 0, inbound: 0 },
      },
      sailing: {
        passengers: { domestic: 0, outbound: 0, inbound: 0 },
        ship: { domestic: 0, outbound: 0, inbound: 0 },
      },
    },
  };

  let totalVehicleCount = 0;

  for (const item of dataRekapSum) {
    const moda: Moda = item.moda;
    const type: any = item.type;
    // point
    let point = parseInt(item.totalItemCount);
    // vehicles
    let vehicles = 0;
    let vehiclesDomestic = 0;
    let vehiclesInbound = 0;
    let vehiclesOutbound = 0;

    // passangers
    let passengers = 0;
    let passengersDomestic = 0;
    let passengersInbound = 0;
    let passengersOutbound = 0;

    if (!["INTL", "DOM"].includes(item.type)) {
      passengers = parseInt(item.totalDeparture || 0, 10);
      vehicles = parseInt(item.totalVehicleDeparture || 0, 10);
      totalVehicleCount += vehicles;
    }

    // intl dom
    if (["INTL"].includes(item.type)) {
      passengersInbound = parseInt(item.totalArrival || 0, 10);
      passengersOutbound = parseInt(item.totalDeparture || 0, 10);
      vehiclesInbound = parseInt(item.totalVehicleArrival || 0, 10);
      vehiclesOutbound = parseInt(item.totalVehicleDeparture || 0, 10);
    }

    if (["DOM"].includes(item.type)) {
      passengersDomestic = parseInt(item.totalDeparture || 0, 10);
      vehiclesDomestic = parseInt(item.totalVehicleDeparture || 0, 10);
    }

    // --- Populate Graph ---
    const graphItem = response.data.graph.find((g) => g.name === moda);
    if (graphItem) {
      graphItem.count += passengers;
    }

    // --- Populate Vehicle ---
    let mappedVehicleType: Moda | undefined;
    switch (moda) {
      case MODA.JALAN:
        mappedVehicleType = MODA.JALAN;
        break;
      case MODA.UDARA:
        mappedVehicleType = MODA.UDARA;
        break;
      case MODA.LAUT:
        mappedVehicleType = MODA.LAUT;
        break;
      case MODA.ASDP:
        mappedVehicleType = MODA.ASDP;
        break;
      case MODA.STASIUN:
        mappedVehicleType = MODA.STASIUN;
        break;
      default:
        mappedVehicleType = undefined;
    }

    if (mappedVehicleType) {
      const vehicleItem = response.data.vehicle.find(
        (v) => v.type === mappedVehicleType
      );
      if (vehicleItem) {
        vehicleItem.count += vehicles;
      }
    }

    // --- Populate Network ---
    if (moda === MODA.TOLL || moda === MODA.ARTERI) {
      const networkItem = response.data.network.find((n) => n.type === moda);
      if (networkItem) {
        networkItem.count += vehicles;
        networkItem.point += point;
      }
    }

    // --- Populate Flight and Sailing ---
    if (moda === MODA.UDARA) {
      if (type === "DOM") {
        response.data.flight.passengers.domestic += passengersDomestic;
        response.data.flight.aircraft.domestic += vehiclesDomestic;
      } else if (type === "INTL") {
        response.data.flight.passengers.outbound += passengersOutbound;
        response.data.flight.passengers.inbound += passengersInbound;
        response.data.flight.aircraft.outbound += vehiclesOutbound;
        response.data.flight.aircraft.inbound += vehiclesInbound;
      }
    } else if (moda === MODA.LAUT || moda === MODA.ASDP) {
      if (type === "DOM") {
        response.data.sailing.passengers.domestic += passengersDomestic;
        response.data.sailing.ship.domestic += vehiclesDomestic;
      } else if (type === "INTL") {
        response.data.sailing.passengers.outbound += passengersOutbound;
        response.data.sailing.passengers.inbound += passengersInbound;
        response.data.sailing.ship.outbound += vehiclesOutbound;
        response.data.sailing.ship.inbound += vehiclesInbound;
      }
    }
  }

  // --- Calculate Percentages for Vehicles ---
  if (totalVehicleCount > 0) {
    // for (const vehicleItem of response.data.vehicle) {
    //   // vehicleItem.percent = (vehicleItem.count / totalVehicleCount) * 100;
    //   const percent = await getAvgPerformanceData(
    //     MODA.JALAN,
    //     startDate,
    //     endDate
    //   );
    //   vehicleItem.percent = Number(percent);

    // }

    const performancePromises = response.data.vehicle.map(
      async (vehicleItem) => {
        const performance = await getAvgPerformanceData(
          vehicleItem.type.toLowerCase(),
          startDate,
          endDate
        );
        vehicleItem.percent = Number(performance);
        return vehicleItem;
      }
    );

    await Promise.all(performancePromises);
  }

  response.data.graph = map(response.data.graph, (item) => {
    const { name } = item;
    let newName = name;

    if (name === "asdp") {
      newName = "SDP";
    } else if (name === "stasiun") {
      newName = "KA";
    } else {
      newName = newName.charAt(0).toUpperCase() + newName.slice(1);
    }

    return { ...item, name: newName };
  });

  return response;
};

export const recapData = ({
  moda,
  endDate,
  startDate,
  periodType,
  event,
}: matrikPayload) => {
  const dataRekapRepository = AppDataSource.getRepository(MatrikProduksi);

  let periodFormat: string;
  let labelFormat: string;

  switch (periodType) {
    case "daily":
      periodFormat = "YYYY-MM-DD";
      labelFormat = "DD";
      // periodFormat = 'Week-DD';
      break;
    case "weekly":
      periodFormat = "YYYY-IW";
      labelFormat = "IW";
      break;
    case "monthly":
      periodFormat = "YYYY-MM";
      labelFormat = "Mon";
      break;
    case "yearly":
      periodFormat = "YYYY";
      labelFormat = "YYYY";
      break;
    default:
      periodFormat = "YYYY-MM-DD";
      labelFormat = "DD";
      // periodFormat = 'Week-DD';
      break;
  }

  const baseQueryBuilder = dataRekapRepository
    .createQueryBuilder("dm")
    .select("COALESCE(SUM(dm.departure), 0)::FLOAT", "departure")
    .addSelect("COALESCE(SUM(dm.arrival), 0)::FLOAT", "arrival")
    .addSelect(
      "COALESCE(SUM(dm.vehicleDeparture), 0)::FLOAT",
      "vehicleDeparture"
    )
    .addSelect("COALESCE(SUM(dm.vehicleArrival), 0)::FLOAT", "vehicleArrival")
    .addSelect(`TO_CHAR(dm.date, '${periodFormat}')`, "period");

  if (event)
    baseQueryBuilder.addSelect(
      event ? `dm.label` : `TO_CHAR(dm.date, '${periodFormat}')`,
      "label"
    );

  baseQueryBuilder.where("dm.moda = :moda", { moda: moda });

  if (event) {
    baseQueryBuilder.andWhere("dm.event = :event", { event: event });
  } else {
    baseQueryBuilder
      .andWhere("dm.event = :event", { event: 0 })
      .andWhere("dm.date >= :startDate", { startDate: startDate })
      .andWhere("dm.date <= :endDate", { endDate: endDate });
  }

  baseQueryBuilder
    .andWhere(
      "(dm.type NOT IN (:...type) OR dm.type IS NULL OR dm.type = '')",
      { type: ["INTL", "DOM"] }
    )
    .groupBy("period");

  if (event) baseQueryBuilder.addGroupBy("label");

  // .addGroupBy("dm.date")
  baseQueryBuilder.orderBy("period", "ASC");

  console.log("Final SQL: ", baseQueryBuilder.getSql());

  return baseQueryBuilder.getRawMany();
};
export const recapDataByTypeModa = ({
  moda,
  type,
  endDate,
  startDate,
  periodType,
  event,
}: matrikPayload) => {
  const dataRekapRepository = AppDataSource.getRepository(MatrikProduksi);

  const queryBuilder = dataRekapRepository.createQueryBuilder("dm");

  if (moda === "asdp") {
    queryBuilder
      .select(
        "COALESCE(SUM(((dm.response_api)::jsonb->>'motor')::INT), 0)::FLOAT",
        "motor"
      )
      .addSelect(
        "COALESCE(SUM(((dm.response_api)::jsonb->>'roda4')::INT), 0)::FLOAT",
        "roda4"
      )
      .addSelect(
        "COALESCE(SUM(((dm.response_api)::jsonb->>'bus')::INT), 0)::FLOAT",
        "bus"
      )
      .addSelect(
        "COALESCE(SUM(((dm.response_api)::jsonb->>'truk')::INT), 0)::FLOAT",
        "truk"
      );
    // .addSelect("COALESCE(SUM(((dm.response_api)::jsonb->>'roda4lebih')::INT), 0)::FLOAT", "roda4lebih");
  } else {
    if (moda && ["toll", "arteri"].includes(moda)) {
      queryBuilder
        .addSelect("0", "departure")
        .addSelect("0", "arrival")
        .addSelect(
          "COALESCE(SUM(((dm.response_api)::jsonb->>'jml_dari_jkt')::INT), 0)::FLOAT",
          "vehicleDeparture"
        )
        .addSelect(
          "COALESCE(SUM(((dm.response_api)::jsonb->>'jml_ke_jkt')::INT), 0)::FLOAT",
          "vehicleArrival"
        );
    } else {
      queryBuilder
        .select("COALESCE(SUM(dm.departure), 0)::FLOAT", "departure")
        .addSelect("COALESCE(SUM(dm.arrival), 0)::FLOAT", "arrival")
        .addSelect(
          "COALESCE(SUM(dm.vehicleDeparture), 0)::FLOAT",
          "vehicleDeparture"
        )
        .addSelect(
          "COALESCE(SUM(dm.vehicleArrival), 0)::FLOAT",
          "vehicleArrival"
        );
    }
  }

  const baseQueryBuilder = queryBuilder
    .addSelect("dm.type", "type")
    .where("dm.moda = :moda", { moda: moda })
    .andWhere(
      !isEmpty(type) && isArray(type) && type?.length > 0
        ? "dm.type IN (:...type)"
        : "TRUE",
      { type: type }
    );

  if (event) {
    baseQueryBuilder.andWhere("dm.event = :event", { event: event });
  } else {
    baseQueryBuilder
      .andWhere("dm.event = :event", { event: 0 })
      .andWhere("dm.date >= :startDate", { startDate: startDate })
      .andWhere("dm.date <= :endDate", { endDate: endDate });
  }

  return queryBuilder.addSelect("dm.type", "type").groupBy("type").getRawMany();
};

const getAvgPerformanceData = async (
  moda: string,
  tanggalAwal: string,
  tanggalAkhir: string
) => {
  try {
    const performanceData = await getPerformanceReport(
      {
        tanggal_awal: tanggalAwal,
        tanggal_akhir: tanggalAkhir,
      },
      moda
    );

    const validPersentase: number[] = performanceData?.data
      ? performanceData.data
          .map((item: PerformanceReportData) => parseFloat(item.persentase ?? ""))
          .filter((value: number) => !isNaN(value))
      : [];

    const averagePersentase: number =
      validPersentase.length > 0
        ? validPersentase.reduce((sum, val) => sum + val, 0) /
          validPersentase.length
        : 0;

    return averagePersentase.toFixed(2);
  } catch (err) {
    console.warn(`[dataRecap] Warning getAvgPerformanceData ${moda}:`, err);
    return "0.00";
  }
};
