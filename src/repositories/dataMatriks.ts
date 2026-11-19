import { AppDataSource } from "@/data-source";
import { Moda } from "@/type/produksi.titik.type";
import { isArray, isEmpty } from "lodash";
import { Brackets } from "typeorm";

export type AggregationPeriod = "daily" | "weekly" | "monthly" | "yearly";

interface periodMatrikPayload {
  search?: string;
  province?: string;
  provinceId?: string;
  moda: Moda;
  startDate: string;
  endDate: string;
  idLokasi?: string | null;
  periodType?: AggregationPeriod;
  event?: number;
  isUseTotal?: boolean;
  tableName?: string;
}

interface PeriodMatriksByManyIdsPayload
  extends Omit<periodMatrikPayload, "idLokasi"> {
  idLokasi?: string[] | null;
  type?: string[];
  tableName?: string;
}

interface MatrikPayload {
  moda: string;
  endDate: string;
  startDate: string;
  search?: string;
  province?: string;
  provinceId?: string;
  sort?: "DESC" | "ASC";
  page?: string;
  pageSize?: string;
  ids?: string;
  type?: string[];
  event?: number;
  isUseTotal?: boolean;
  sortDepArrival?: boolean;
  sortedKey?: string;
  tableName?: string;
}

export const matriksData = async ({
  moda,
  endDate,
  startDate,
  search,
  province,
  sort = "DESC",
  page,
  pageSize,
  ids,
  type,
  event,
  isUseTotal,
  sortDepArrival = true,
  sortedKey,
  provinceId,
  tableName = "data_matriks_partitioned",
}: MatrikPayload) => {
  // comparison
  if (search) {
    page = "1";
  }

  const baseQueryBuilder = AppDataSource.createQueryBuilder()
    .from(tableName, "dm")
    .where("dm.moda = :moda", { moda: moda });

  if (event) {
    baseQueryBuilder.andWhere("dm.event = :event", { event: event });
  } else {
    baseQueryBuilder
      .andWhere("dm.event = :event", { event: 0 })
      .andWhere("dm.date >= :startDate", { startDate: startDate })
      .andWhere("dm.date <= :endDate", { endDate: endDate });
  }

  if (isArray(type) && !isEmpty(type) && type?.length > 0) {
    baseQueryBuilder.andWhere("dm.type IN (:...type)", {
      type: type.map((item) => item?.toLocaleUpperCase()),
    });
  } else {
    baseQueryBuilder.andWhere(
      new Brackets((qb) => {
        qb.where(
          "(dm.type NOT IN (:...type) OR dm.type IS NULL OR dm.type = '')",
          { type: ["INTL", "DOM"] }
        ).orWhere("dm.type IS NULL");
      })
    );
  }
  if (moda === "jalan") {
    baseQueryBuilder.andWhere("dm.type != :typeValue", { typeValue: "0" });
  }

  if (ids !== undefined && ids !== null && ids !== "null" && ids !== "") {
    baseQueryBuilder.andWhere("dm.id_lokasi = :idLokasi", { idLokasi: ids });
  }

  const queryBuilder = baseQueryBuilder
    .clone()
    .andWhere(search ? "dm.name ILIKE :search" : "TRUE", {
      search: `%${search}%`,
    })
    .andWhere(province ? "dm.province ILIKE :province" : "TRUE", {
      province: `%${province?.replace(/\+/g, " ").toLowerCase()}%`,
    })
    .andWhere(provinceId ? "dm.id_province = :province" : "TRUE", {
      province: provinceId,
    })
    .select("dm.id_lokasi", "idLokasi")
    .addSelect("dm.name", "nama");

  if (["toll", "arteri"].includes(moda)) {
    queryBuilder.addSelect("0", "departure").addSelect("0", "arrival");
    if (isUseTotal) {
      if (moda === "toll") {
        queryBuilder
          .addSelect(
            "COALESCE(SUM(((dm.response_api)::jsonb->>'jml_kendaraan')::INT), 0)::FLOAT",
            "vehicleDeparture"
          )
          .addSelect(
            "COALESCE(SUM(((dm.response_api)::jsonb->>'jml_ke_jkt')::INT), 0)::FLOAT",
            "vehicleArrival"
          );
      } else {
        queryBuilder
          .addSelect(
            "COALESCE(SUM(((dm.response_api)::jsonb->>'jml')::INT), 0)::FLOAT",
            "vehicleDeparture"
          )
          .addSelect(
            "COALESCE(SUM(((dm.response_api)::jsonb->>'jml_ke_jkt')::INT), 0)::FLOAT",
            "vehicleArrival"
          );
      }
    } else {
      queryBuilder
        .addSelect(
          "COALESCE(SUM(dm.vehicle_departure), 0)::FLOAT",
          "vehicleDeparture"
        )
        .addSelect(
          "COALESCE(SUM(dm.vehicle_arrival), 0)::FLOAT",
          "vehicleArrival"
        );
    }
  } else {
    queryBuilder
      .addSelect("COALESCE(SUM(dm.departure), 0)::FLOAT", "departure")
      .addSelect("COALESCE(SUM(dm.arrival), 0)::FLOAT", "arrival")
      .addSelect(
        "COALESCE(SUM(dm.vehicle_departure), 0)::FLOAT",
        "vehicleDeparture"
      )
      .addSelect(
        "COALESCE(SUM(dm.vehicle_arrival), 0)::FLOAT",
        "vehicleArrival"
      );
  }

  queryBuilder
    .addSelect("dm.province", "provinsi")
    .addSelect("dm.city", "kota")
    .addSelect("dm.type", "tipe")
    .addSelect("dm.latitude", "latitude")
    .addSelect("dm.longitude", "longitude")
    .addSelect("dm.coordinate", "koordinat")
    .groupBy("dm.id_lokasi")
    .addGroupBy("dm.province")
    .addGroupBy("dm.city")
    .addGroupBy("dm.type")
    .addGroupBy("dm.coordinate")
    .addGroupBy("dm.name")
    .addGroupBy("dm.latitude")
    .addGroupBy("dm.longitude");

  const getVehicleArrivalSum = (moda: string, sortedKey?: string) => {
    const sk = sortedKey
      ? sortedKey.replace(/([A-Z])/g, "_$1").toLowerCase()
      : undefined;
    if (["toll", "arteri"].includes(moda)) {
      if (sortDepArrival) {
        return "COALESCE(SUM(((dm.response_api)::jsonb->>'jml_ke_jkt')::INT), 0)::FLOAT + COALESCE(SUM(((dm.response_api)::jsonb->>'jml_dari_jkt')::INT), 0)::FLOAT";
      } else {
        if (sk) {
          return `COALESCE(SUM(dm.${sk}), 0)::FLOAT`;
        } else {
          return "COALESCE(SUM(((dm.response_api)::jsonb->>'jml_ke_jkt')::INT), 0)::FLOAT";
        }
      }
    } else {
      if (sk) {
        return `(COALESCE(SUM(dm.${sk}), 0)::FLOAT)::FLOAT`;
      } else {
        return "(COALESCE(SUM(dm.departure), 0)::FLOAT + COALESCE(SUM(dm.arrival), 0))::FLOAT";
      }
    }
  };

  queryBuilder.orderBy(
    getVehicleArrivalSum(moda, sortedKey),
    sort?.toUpperCase() === "DESC" ? "DESC" : "ASC"
  );

  const totalCountQuery = baseQueryBuilder
    .clone()
    .andWhere(search ? "dm.name ILIKE :search" : "TRUE", {
      search: `%${search}%`,
    })
    .andWhere(province ? "dm.province ILIKE :province" : "TRUE", {
      province: `%${province?.replace(/\+/g, " ").toLowerCase()}%`,
    })
    .andWhere(provinceId ? "dm.id_province = :province" : "TRUE", {
      province: provinceId,
    })
    .select("COUNT(DISTINCT dm.id_lokasi)", "totalCount");

  const totalResult = await totalCountQuery.getRawOne();
  const total = totalResult ? Number(totalResult.totalCount) : 0;

  let finalPage = 1;
  let finalPageSize = 10;

  if (page && pageSize) {
    const pageNum = parseInt(page, 10);
    const pageSizeNum = parseInt(pageSize, 10);

    if (
      !isNaN(pageNum) &&
      !isNaN(pageSizeNum) &&
      pageNum > 0 &&
      pageSizeNum > 0
    ) {
      finalPage = pageNum;
      finalPageSize = pageSizeNum;
      const skip = (finalPage - 1) * finalPageSize;
      queryBuilder.skip(skip).take(finalPageSize);
    }
  }

  const paginatedData = await queryBuilder.getRawMany();

  const totalPages = Math.ceil(total / finalPageSize);

  return {
    page: finalPage,
    pageSize: finalPageSize,
    total: total,
    totalPages,
    data: paginatedData,
  };
};

interface MatriksDataAggPayload {
  moda: string;
  startDate: string;
  endDate: string;
  event?: number | null;
  province?: string;
  provinceId?: string;
}

/**
 * Versi cepat matriksData untuk kasus tanpa pagination (semua lokasi, urut di sisi pemanggil).
 * Dua langkah supaya bisa Index Only Scan pada index (moda, type, event, date) INCLUDE (...):
 *  1) agregat angka per id_lokasi dari kolom sempit saja
 *  2) atribut lokasi (nama, provinsi, dst) diambil 1 baris terbaru per lokasi lewat LATERAL
 * Beda perilaku vs matriksData: atribut lokasi memakai baris terbaru, bukan di-GROUP BY,
 * dan filter province/provinceId diterapkan setelah agregasi.
 */
export const matriksDataAgg = async ({
  moda,
  startDate,
  endDate,
  event,
  province,
  provinceId,
}: MatriksDataAggPayload) => {
  const table = "data_matriks_partitioned";

  const params: any[] = [moda, event || 0];
  const addParam = (value: any) => {
    params.push(value);
    return `$${params.length}`;
  };

  // Hanya udara yang punya tipe DOM/INTL + ALL; equality supaya jadi index condition.
  const typeCond = (alias: string) => {
    const base =
      moda === "udara"
        ? `${alias}.type = 'ALL'`
        : `(${alias}.type NOT IN ('INTL','DOM') OR ${alias}.type IS NULL OR ${alias}.type = '')`;
    return moda === "jalan" ? `${base} AND ${alias}.type != '0'` : base;
  };

  let dateAgg = "";
  let dateLateral = "";
  if (!event) {
    const start = addParam(startDate);
    const end = addParam(endDate);
    dateAgg = `AND dm.date >= ${start}::date AND dm.date <= ${end}::date`;
    dateLateral = `AND d.date >= ${start}::date AND d.date <= ${end}::date`;
  }

  const sums = ["toll", "arteri"].includes(moda)
    ? `0 AS departure, 0 AS arrival,
       COALESCE(SUM(dm.vehicle_departure), 0)::FLOAT AS "vehicleDeparture",
       COALESCE(SUM(dm.vehicle_arrival), 0)::FLOAT AS "vehicleArrival"`
    : `COALESCE(SUM(dm.departure), 0)::FLOAT AS departure,
       COALESCE(SUM(dm.arrival), 0)::FLOAT AS arrival,
       COALESCE(SUM(dm.vehicle_departure), 0)::FLOAT AS "vehicleDeparture",
       COALESCE(SUM(dm.vehicle_arrival), 0)::FLOAT AS "vehicleArrival"`;

  const outerFilters: string[] = [];
  if (province) {
    outerFilters.push(
      `l.province ILIKE ${addParam(
        `%${province.replace(/\+/g, " ").toLowerCase()}%`
      )}`
    );
  }
  if (provinceId) {
    outerFilters.push(`l.id_province = ${addParam(provinceId)}`);
  }
  const outerWhere = outerFilters.length
    ? `WHERE ${outerFilters.join(" AND ")}`
    : "";

  const sql = `
    WITH agg AS (
      SELECT dm.id_lokasi, ${sums}
      FROM ${table} dm
      WHERE dm.moda = $1 AND dm.event = $2 ${dateAgg} AND ${typeCond("dm")}
      GROUP BY dm.id_lokasi
    )
    SELECT a.id_lokasi AS "idLokasi", l.name AS nama,
           a.departure, a.arrival, a."vehicleDeparture", a."vehicleArrival",
           l.province AS provinsi, l.city AS kota, l.type AS tipe,
           l.latitude, l.longitude, l.coordinate AS koordinat
    FROM agg a
    CROSS JOIN LATERAL (
      SELECT d.name, d.province, d.city, d.type, d.latitude, d.longitude,
             d.coordinate, d.id_province
      FROM ${table} d
      WHERE d.moda = $1 AND d.id_lokasi = a.id_lokasi AND d.event = $2
        ${dateLateral} AND ${typeCond("d")}
      ORDER BY d.date DESC
      LIMIT 1
    ) l
    ${outerWhere}
  `;

  return AppDataSource.query(sql, params) as Promise<any[]>;
};

export const periodMatriksByManyIds = ({
  moda,
  endDate,
  startDate,
  idLokasi = null,
  periodType,
  event,
  type,
  tableName = "data_matriks_partitioned",
}: PeriodMatriksByManyIdsPayload) => {
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
      throw new Error(`Invalid aggregation period type: ${periodType}`);
  }

  const baseQueryBuilder = AppDataSource.createQueryBuilder()
    .from(tableName, "dm")
    .select("COALESCE(SUM(dm.departure), 0)::FLOAT", "departure")
    .addSelect("dm.name", "nama")
    .addSelect("COALESCE(SUM(dm.arrival), 0)::FLOAT", "arrival")
    .addSelect(
      "COALESCE(SUM(dm.vehicle_departure), 0)::FLOAT",
      "vehicleDeparture"
    )
    .addSelect("COALESCE(SUM(dm.vehicle_arrival), 0)::FLOAT", "vehicleArrival")
    .addSelect("dm.id_lokasi", "idLokasi")
    .addSelect(`TO_CHAR(dm.date, '${periodFormat}')`, "period")
    .addSelect(
      event ? `dm.label` : `TO_CHAR(dm.date, '${periodFormat}')`,
      "label"
    )
    .addSelect("dm.province", "provinsi")
    .addSelect("dm.city", "kota")
    .addSelect("dm.type", "tipe")
    .addSelect("dm.coordinate", "koordinat")
    .where("dm.moda = :moda", { moda: moda })
    .andWhere(
      !isEmpty(idLokasi) && isArray(idLokasi)
        ? "dm.id_lokasi IN (:...idLokasi) "
        : "TRUE",
      { idLokasi: idLokasi }
    );

  if (isEmpty(type)) {
    baseQueryBuilder.andWhere(
      "(dm.type NOT IN (:...type) OR dm.type IS NULL OR dm.type = '')",
      { type: ["INTL", "DOM"] }
    );
  } else {
    baseQueryBuilder.andWhere("dm.type IN (:...type)", { type: type });
  }

  if (event) {
    baseQueryBuilder.andWhere("dm.event = :event", { event: event });
  } else {
    baseQueryBuilder
      .andWhere("dm.event = :event", { event: 0 })
      .andWhere("dm.date >= :startDate", { startDate: startDate })
      .andWhere("dm.date <= :endDate", { endDate: endDate });
  }

  if (event) {
    baseQueryBuilder
      .groupBy("period")
      .addGroupBy("label")
      .addGroupBy("dm.id_lokasi")
      .addGroupBy("dm.province")
      .addGroupBy("dm.city")
      .addGroupBy("dm.type")
      .addGroupBy("dm.name")
      .addGroupBy("dm.coordinate")
      .orderBy("period", "ASC");
  } else {
    baseQueryBuilder
      .groupBy(`TO_CHAR(dm.date, '${periodFormat}')`)
      .addGroupBy(`TO_CHAR(dm.date, '${periodFormat}')`)
      .addGroupBy("dm.id_lokasi")
      .addGroupBy("dm.province")
      .addGroupBy("dm.city")
      .addGroupBy("dm.type")
      .addGroupBy("dm.name")
      .addGroupBy("dm.coordinate")
      .orderBy("period", "ASC");
  }

  return baseQueryBuilder.getRawMany();
};

export const periodMatriksSum = ({
  moda,
  endDate,
  startDate,
  periodType,
  event,
  tableName = "data_matriks_partitioned",
}: PeriodMatriksByManyIdsPayload) => {
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
      throw new Error(`Invalid aggregation period type: ${periodType}`);
  }

  return AppDataSource.createQueryBuilder()
    .from(tableName, "dm")
    .select("COALESCE(SUM(dm.departure), 0)::FLOAT", "departure")
    .addSelect("COALESCE(SUM(dm.arrival), 0)::FLOAT", "arrival")
    .addSelect(
      "COALESCE(SUM(dm.vehicle_departure), 0)::FLOAT",
      "vehicleDeparture"
    )
    .addSelect("COALESCE(SUM(dm.vehicle_arrival), 0)::FLOAT", "vehicleArrival")
    .addSelect(`TO_CHAR(dm.date, '${periodFormat}')`, "period")
    .addSelect(`TO_CHAR(dm.date, '${periodFormat}')`, "label")
    .where("dm.moda = :moda", { moda: moda })
    .andWhere(
      "(dm.type NOT IN (:...type) OR dm.type IS NULL OR dm.type = '')",
      { type: ["INTL", "DOM"] },
    )
    .andWhere(event ? "dm.event = :event" : "dm.event = 0", { event: event ?? 0 })
    .andWhere("dm.date >= :startDate", { startDate: startDate })
    .andWhere("dm.date <= :endDate", { endDate: endDate })
    .groupBy("period")
    .orderBy("period", "ASC")
    .getRawMany();
};

export const periodMatriksSumByType = ({
  moda,
  endDate,
  startDate,
  periodType,
  event,
  tableName = "data_matriks_partitioned",
}: PeriodMatriksByManyIdsPayload) => {
  let periodFormat: string;
  let labelFormat: string;

  switch (periodType) {
    case "daily":
      periodFormat = "YYYY-MM-DD";
      labelFormat = "DD";
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
      throw new Error(`Invalid aggregation period type: ${periodType}`);
  }

  return AppDataSource.createQueryBuilder()
    .from(tableName, "dm")
    .select("COALESCE(SUM(dm.departure), 0)::FLOAT", "departure")
    .addSelect("COALESCE(SUM(dm.arrival), 0)::FLOAT", "arrival")
    .addSelect("COALESCE(SUM(dm.vehicle_departure), 0)::FLOAT", "vehicleDeparture")
    .addSelect("COALESCE(SUM(dm.vehicle_arrival), 0)::FLOAT", "vehicleArrival")
    .addSelect(`TO_CHAR(dm.date, '${periodFormat}')`, "period")
    .addSelect("dm.type", "type")
    .where("dm.moda = :moda", { moda: moda })
    .andWhere(event ? "dm.event = :event" : "dm.event = 0", { event: event ?? 0 })
    .andWhere("dm.date >= :startDate", { startDate: startDate })
    .andWhere("dm.date <= :endDate", { endDate: endDate })
    .groupBy("period")
    .addGroupBy("dm.type")
    .orderBy("period", "ASC")
    .getRawMany();
};

export const periodMatriksSumAsdp = ({
  moda,
  endDate,
  startDate,
  tableName = "data_matriks_partitioned",
}: periodMatrikPayload) => {
  return AppDataSource.createQueryBuilder()
    .from(tableName, "dm")
    .select(
      "COALESCE(SUM(((dm.response_api)::jsonb->>'motor')::int), 0)::FLOAT",
      "motor",
    )
    .addSelect(
      "COALESCE(SUM(((dm.response_api)::jsonb->>'roda4')::int), 0)::FLOAT",
      "roda4",
    )
    .addSelect(
      "COALESCE(SUM(((dm.response_api)::jsonb->>'bus')::int), 0)::FLOAT",
      "bus",
    )
    .addSelect(
      "COALESCE(SUM(((dm.response_api)::jsonb->>'truk')::int), 0)::FLOAT",
      "truk",
    )
    .where("dm.moda = :moda", { moda: moda })
    .andWhere("dm.event = 0")
    .andWhere("dm.date >= :startDate", { startDate: startDate })
    .andWhere("dm.date <= :endDate", { endDate: endDate })
    .getRawOne();
};

export const periodMatriksRegional = ({
  moda,
  idLokasi,
  endDate,
  startDate,
  periodType,
  province,
  event,
  isUseTotal,
  provinceId,
  tableName = "data_matriks_partitioned",
}: periodMatrikPayload) => {
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
      throw new Error(`Invalid aggregation period type: ${periodType}`);
  }

  const queryBuilder = AppDataSource.createQueryBuilder()
    .from(tableName, "dm")
    .select("COALESCE(SUM(dm.departure), 0)::FLOAT", "departure")
    .addSelect("COALESCE(SUM(dm.arrival), 0)::FLOAT", "arrival");

  if (isUseTotal) {
    if (moda === "toll") {
      queryBuilder
        .addSelect(
          "COALESCE(SUM(((dm.response_api)::jsonb->>'jml_kendaraan')::INT), 0)::FLOAT",
          "vehicleDeparture"
        )
        .addSelect(
          "COALESCE(SUM(((dm.response_api)::jsonb->>'jml_ke_jkt')::INT), 0)::FLOAT",
          "vehicleArrival"
        );
    } else {
      queryBuilder
        .addSelect(
          "COALESCE(SUM(((dm.response_api)::jsonb->>'jml')::INT), 0)::FLOAT",
          "vehicleDeparture"
        )
        .addSelect(
          "COALESCE(SUM(((dm.response_api)::jsonb->>'jml_ke_jkt')::INT), 0)::FLOAT",
          "vehicleArrival"
        );
    }
  } else {
    queryBuilder
      .addSelect(
        "COALESCE(SUM(dm.vehicle_departure), 0)::FLOAT",
        "vehicleDeparture"
      )
      .addSelect(
        "COALESCE(SUM(dm.vehicle_arrival), 0)::FLOAT",
        "vehicleArrival"
      );
  }

  if (event) {
    queryBuilder.addSelect(`dm.date`, "period");
    queryBuilder.addSelect(`dm.label`, "label");
  } else {
    queryBuilder.addSelect(`TO_CHAR(dm.date, '${periodFormat}')`, "period");
    queryBuilder.addSelect(`TO_CHAR(dm.date, '${periodFormat}')`, "label");
  }

  queryBuilder.where("dm.moda = :moda", { moda: moda });
  if (event) {
    queryBuilder.andWhere("dm.event = :event", { event: event });
  } else {
    queryBuilder
      .andWhere("dm.event = :event", { event: 0 })
      .andWhere("dm.date >= :startDate", { startDate: startDate })
      .andWhere("dm.date <= :endDate", { endDate: endDate });
  }

  if (
    province !== undefined &&
    province !== null &&
    province !== "null" &&
    province !== "undefined"
  ) {
    queryBuilder
      .andWhere(province ? "dm.province ILIKE :province" : "TRUE", {
        province: `%${province.replace(/\+/g, " ").toLowerCase()}%`,
      })
      .orderBy("period", "ASC");
  }

  if (
    provinceId !== undefined &&
    provinceId !== null &&
    provinceId !== "null" &&
    provinceId !== "undefined"
  ) {
    queryBuilder.andWhere(provinceId ? "dm.id_province = :province" : "TRUE", {
      province: provinceId,
    });
  }

  if (moda === "jalan") {
    queryBuilder.andWhere("dm.type != :typeValue", { typeValue: "0" });
  }
  if (moda === "udara") {
    queryBuilder.andWhere("dm.type != :typeValue", { typeValue: "ALL" });
  }
  if (
    idLokasi !== undefined &&
    idLokasi !== null &&
    idLokasi !== "null" &&
    idLokasi !== "undefined"
  ) {
    queryBuilder.andWhere("dm.id_lokasi = :idLokasi", { idLokasi: idLokasi });
  }

  // if (event) {
  //   queryBuilder.groupBy("label").addGroupBy("dm.date");
  // } else {
  //   queryBuilder.groupBy("period").addGroupBy("dm.date");
  // }

  if (event) {
    queryBuilder.groupBy("dm.date").addGroupBy("label");
  } else {
    switch (periodType) {
      case "daily":
        queryBuilder.groupBy("dm.date").addGroupBy("period");
        break;
      case "weekly":
      case "monthly":
      case "yearly":
        queryBuilder.groupBy("period");
        break;
    }
  }

  return queryBuilder.getRawMany();
};

export const periodMatriksLocation = ({
  moda,
  endDate,
  startDate,
  periodType,
  idLokasi,
  event,
  tableName = "data_matriks_partitioned",
}: periodMatrikPayload) => {
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
      throw new Error(`Invalid aggregation period type: ${periodType}`);
  }

  const queryBuilder = AppDataSource.createQueryBuilder()
    .from(tableName, "dm")
    .select("dm.id_lokasi", "idLokasi")
    .addSelect("COALESCE(SUM(dm.departure), 0)::FLOAT", "departure")
    .addSelect("COALESCE(SUM(dm.departure), 0)::FLOAT", "departure")
    .addSelect("COALESCE(SUM(dm.arrival), 0)::FLOAT", "arrival")
    .addSelect(
      "COALESCE(SUM(dm.vehicle_departure), 0)::FLOAT",
      "vehicleDeparture"
    )
    .addSelect("COALESCE(SUM(dm.vehicle_arrival), 0)::FLOAT", "vehicleArrival")
    .addSelect(`TO_CHAR(dm.date, '${periodFormat}')`, "period");
  if (event)
    queryBuilder.addSelect(
      event && periodType === "daily"
        ? `dm.label`
        : `TO_CHAR(dm.date, '${periodFormat}')`,
      "label"
    );

  queryBuilder.where("dm.moda = :moda", { moda: moda });

  // .andWhere("dm.date >= :startDate", { startDate: startDate })
  // .andWhere("dm.date <= :endDate", { endDate: endDate });

  if (event) {
    queryBuilder.andWhere("dm.event = :event", { event: event });
  } else {
    queryBuilder
      .andWhere("dm.event = :event", { event: 0 })
      .andWhere("dm.date >= :startDate", { startDate: startDate })
      .andWhere("dm.date <= :endDate", { endDate: endDate });
  }

  if (idLokasi !== undefined && idLokasi !== null && idLokasi !== undefined) {
    queryBuilder.andWhere("dm.id_lokasi = :idLokasi", { idLokasi: idLokasi });
  }

  queryBuilder.groupBy("dm.id_lokasi");

  if (event) queryBuilder.addGroupBy("label");

  return queryBuilder
    .addGroupBy("period")
    .addGroupBy("label")
    .orderBy("period", "ASC")
    .getRawMany();
};

export const periodMatriks = ({
  moda,
  endDate,
  startDate,
  idLokasi = null,
  periodType,
  tableName = "data_matriks_partitioned",
}: periodMatrikPayload) => {
  let periodFormat: string;
  switch (periodType) {
    case "daily":
      periodFormat = "YYYY-MM-DD";
      break;
    case "weekly":
      periodFormat = "YYYY-IW";
      break;
    case "monthly":
      periodFormat = "YYYY-MM";
      break;
    case "yearly":
      periodFormat = "YYYY";
      break;
    default:
      throw new Error(`Invalid aggregation period type: ${periodType}`);
  }

  return AppDataSource.createQueryBuilder()
    .from(tableName, "dm")
    .select("COALESCE(SUM(dm.departure), 0)::FLOAT", "departure")
    .addSelect("COALESCE(SUM(dm.arrival), 0)::FLOAT", "arrival")
    .addSelect(
      "COALESCE(SUM(dm.vehicle_departure), 0)::FLOAT",
      "vehicleDeparture"
    )
    .addSelect("COALESCE(SUM(dm.vehicle_arrival), 0)::FLOAT", "vehicleArrival")
    .addSelect("dm.id_lokasi", "idLokasi")
    .addSelect(`TO_CHAR(dm.date, '${periodFormat}')`, "period")
    .addSelect("dm.province", "provinsi")
    .addSelect("dm.city", "kota")
    .addSelect("dm.type", "tipe")
    .addSelect("dm.coordinate", "koordinat")
    .where("dm.moda = :moda", { moda: moda })
    .andWhere(
      "(dm.type NOT IN (:...type) OR dm.type IS NULL OR dm.type = '')",
      { type: ["INTL", "DOM"] },
    )
    .andWhere(idLokasi ? "dm.id_lokasi = :idLokasi" : "TRUE", {
      idLokasi: idLokasi,
    })
    .andWhere("dm.date >= :startDate", { startDate: startDate })
    .andWhere("dm.date <= :endDate", { endDate: endDate })
    .groupBy("period")
    .addGroupBy("dm.id_lokasi")
    .addGroupBy("dm.province")
    .addGroupBy("dm.city")
    .addGroupBy("dm.type")
    .addGroupBy("dm.coordinate")
    .orderBy("period", "ASC")
    .getRawMany();
};
