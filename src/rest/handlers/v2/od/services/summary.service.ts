import { DataOD } from "@/entities/DataOD";
import { AppDataSource } from "@/data-source";
import { Brackets } from "typeorm";
import { MatrikPertitikPartitioned } from "@/entities/MatrikPertitikPartitioned";


export const getTanggalEvent = async (params: {
  tanggalAwal1: string;
  tanggalAkhir1: string;
  moda: string;
  event: number;
}) => {
  const { tanggalAwal1, tanggalAkhir1, moda, event } = params;

  const qb = AppDataSource.getRepository(MatrikPertitikPartitioned)
    .createQueryBuilder("data_matriks")
    .select([
      'data_matriks.label AS "label"',
      'data_matriks.date AS "date"',
    ])
    .where("data_matriks.date BETWEEN :start AND :end", {
      start: tanggalAwal1,
      end: tanggalAkhir1,
    })
    .andWhere("data_matriks.moda = :moda", { moda })
    .andWhere("data_matriks.event = :event", { event: event || 0 }).groupBy("date").addGroupBy("label");

  const result = await qb.getRawMany();

  return result;
};

export const getODSummary = async (params: {
  tanggalAwal1: string;
  tanggalAkhir1: string;
  moda: string;
  event: number;
  type?: string[];
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const { tanggalAwal1, tanggalAkhir1, moda, event, type, page = 1, limit = 10, search } = params;

  const qb = AppDataSource.getRepository(DataOD)
    .createQueryBuilder("data_od")
    .select([
      'data_od.origin_id AS "idOrigin"',
      'data_od.origin_name AS "origin"',
      'data_od.origin_city AS "originCity"',
      'data_od.origin_type AS "originType"',
      'data_od.destination_id AS "idDestination"',
      'data_od.destination_name AS "destination"',
      'data_od.destination_city AS "destinationCity"',
      'data_od.destination_type AS "destinationType"',
      'SUM(data_od.passengers) AS "passenger"',
      'SUM(data_od.vehicle) AS "vehicle"',
    ])
    .where("data_od.date BETWEEN :start AND :end", {
      start: tanggalAwal1,
      end: tanggalAkhir1,
    })
    .andWhere("data_od.moda = :moda", { moda })
    .andWhere("data_od.event_id = :event", { event: event || 0 });

  if (search && search.trim() !== "") {
    const searchLower = `%${search.toLowerCase()}%`;
    qb.andWhere(
      new Brackets((qb) => {
        qb.where("LOWER(data_od.origin_name) LIKE :search", { search: searchLower })
          .orWhere("LOWER(data_od.destination_name) LIKE :search", { search: searchLower });
      })
    );
  }


  if (type && type.length && !type.includes("ALL")) {
    qb.andWhere(
      new Brackets((qb) => {
        qb.where("data_od.origin_type IN (:...type)", { type }).orWhere(
          "data_od.destination_type IN (:...type)",
          { type }
        );
      })
    );
  }

  qb.groupBy("data_od.origin_id")
    .addGroupBy("data_od.origin_name")
    .addGroupBy("data_od.origin_city")
    .addGroupBy("data_od.origin_type")
    .addGroupBy("data_od.destination_id")
    .addGroupBy("data_od.destination_name")
    .addGroupBy("data_od.destination_city")
    .addGroupBy("data_od.destination_type");

  qb.orderBy('"passenger"', "DESC");

  qb.skip((page - 1) * limit).take(limit);

  const result = await qb.getRawMany();

  return result.map((row) => ({
    ...row,
    passenger: parseInt(row.passenger, 10),
    vehicle: parseInt(row.vehicle, 10),
  }));
};

export const getODDetail = async ({
  tanggalAwal1,
  tanggalAkhir1,
  idOrigin,
  idDestination,
  event,
  moda,
  reportType,
  type
}: {
  tanggalAwal1: string;
  tanggalAkhir1: string;
  idOrigin: string;
  idDestination: string;
  event: number;
  moda: string;
  reportType: "daily" | "weekly" | "monthly" | "yearly";
  type?: string[];
}) => {
  let periodFormat = "YYYY-MM-DD";

  switch (reportType) {
    case "daily":
      periodFormat = "YYYY-MM-DD";
      break;
    case "weekly":
      periodFormat = "IYYY-IW";
      break;
    case "monthly":
      periodFormat = "YYYY-MM";
      break;
    case "yearly":
      periodFormat = "YYYY";
      break;
  }

  const repository = AppDataSource.getRepository(DataOD);

  const queryOD = async (queryType: "origin" | "destination" | "information") => {
    const qb = repository.createQueryBuilder("data_od");

    if (queryType === "information") {
      qb.select([
        'data_od.origin_id AS "idOrigin"',
        'data_od.origin_name AS "origin"',
        'data_od.origin_city AS "originCity"',
        'data_od.origin_type AS "originType"',
        'data_od.destination_id AS "idDestination"',
        'data_od.destination_name AS "destination"',
        'data_od.destination_city AS "destinationCity"',
        'data_od.destination_type AS "destinationType"',
        'SUM(data_od.passengers) AS "passengers"',
        'SUM(data_od.vehicle) AS "vehicle"',
      ])
        .where("data_od.date BETWEEN :start AND :end", {
          start: tanggalAwal1,
          end: tanggalAkhir1,
        })
        .andWhere("data_od.origin_id = :idOrigin", { idOrigin })
        .andWhere("data_od.destination_id = :idDestination", { idDestination })
        .andWhere("data_od.moda = :moda", { moda })
        .andWhere("data_od.event_id = :event", { event: event || 0 })
        .groupBy(`
        data_od.origin_id, data_od.origin_name, data_od.origin_city, data_od.origin_type,
        data_od.destination_id, data_od.destination_name, data_od.destination_city, data_od.destination_type
      `)
        .orderBy(`SUM(data_od.passengers)`, "DESC");
    } else {
      qb.select([
        `TO_CHAR(data_od.date, '${periodFormat}') AS "period"`,
        `SUM(${queryType === "origin" ? "data_od.passengers" : "0"}) AS "passengersOrigin"`,
        `SUM(${queryType === "destination" ? "data_od.passengers" : "0"}) AS "passengersDestination"`,
        `SUM(${queryType === "origin" ? "data_od.vehicle" : "0"}) AS "vehicleOrigin"`,
        `SUM(${queryType === "destination" ? "data_od.vehicle" : "0"}) AS "vehicleDestination"`,
      ])
        .where("data_od.date BETWEEN :start AND :end", {
          start: tanggalAwal1,
          end: tanggalAkhir1,
        })
        .andWhere("data_od.moda = :moda", { moda })
        .andWhere("data_od.event_id = :event", { event: event || 0 });

      if (queryType === "origin") {
        qb.andWhere("data_od.origin_id = :idOrigin", { idOrigin })
          .andWhere("data_od.destination_id = :idDestination", { idDestination });
      } else {
        qb.andWhere("data_od.origin_id = :idDestination", { idDestination })
          .andWhere("data_od.destination_id = :idOrigin", { idOrigin });
      }

      qb.groupBy(`TO_CHAR(data_od.date, '${periodFormat}')`)
        .orderBy(`TO_CHAR(data_od.date, '${periodFormat}')`, "ASC");
    }

    if (type && type.length && !type.includes("ALL")) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where("data_od.origin_type IN (:...type)", { type }).orWhere(
            "data_od.destination_type IN (:...type)",
            { type }
          );
        })
      );
    }

    return await qb.getRawMany();
  };


  const [originData, informationData] = await Promise.all([
    queryOD("origin"),
    queryOD("information"),
  ]);

  const transformToPeriodMap = (data: any[], type: "origin" | "destination") => {
    return data.reduce((acc, row) => {
      if (type === "origin") {
        acc[row.period] = {
          passengers: parseInt(row.passengersOrigin || 0, 10),
          vehicle: parseInt(row.vehicleOrigin || 0, 10),
        };
      } else {
        acc[row.period] = {
          passengers: parseInt(row.passengersDestination || 0, 10),
          vehicle: parseInt(row.vehicleDestination || 0, 10),
        };
      }
      return acc;
    }, {} as Record<string, any>);
  };

  return {
    information: {
      ...informationData?.[0],
      passengers: parseInt(informationData?.[0]?.passengers || 0, 10),
      vehicle: parseInt(informationData?.[0]?.vehicle || 0, 10)
    },
    daily: {},
    weekly: {},
    monthly: {},
    yearly: {},
    [reportType]: transformToPeriodMap(originData, "origin"),
  };
};

