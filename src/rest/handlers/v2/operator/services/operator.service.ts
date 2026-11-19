import { AppDataSource } from "@/data-source";
import { DataOperator } from "@/entities/DataOperator";
import { Brackets } from "typeorm";

export const getOperator = async (params: {
  tanggalAwal1: string;
  tanggalAkhir1: string;
  moda: string;
  event: number;
  page?: number;
  limit?: number;
  search?: string;
  reportType: "daily" | "weekly" | "monthly" | "yearly";

}) => {
  const { tanggalAwal1, tanggalAkhir1, moda, event, page = 1, limit = 10, search, reportType } = params;

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

  const qb = AppDataSource.getRepository(DataOperator)
    .createQueryBuilder("data_operator")
    .select([
      'data_operator.operator AS "operator"',
      'data_operator.pic_name AS "picName"',
      'data_operator.pic_phone AS "picPhone"',
      'data_operator.location AS "location"',
      'data_operator.otp AS "otp"',
      `TO_CHAR(data_operator.date, '${periodFormat}') AS "period"`,
      'SUM(data_operator.passengers) AS "passenger"',
      'SUM(data_operator.vehicle) AS "vehicle"',
    ]).where("data_operator.date BETWEEN :start AND :end", {
      start: tanggalAwal1,
      end: tanggalAkhir1,
    })
    .andWhere("data_operator.moda = :moda", { moda })
    .andWhere("data_operator.event_id = :event", { event: event || 0 });


  if (search && search.trim() !== "") {
    const searchLower = `%${search.toLowerCase().trim()}%`;
    console.log(search, '-----search-----', searchLower);

    qb.andWhere(
      new Brackets((qb) => {
        qb.where("LOWER(TRIM(data_operator.operator)) LIKE :search", { search: searchLower })
          .orWhere("LOWER(TRIM(data_operator.pic_name)) LIKE :search", { search: searchLower })
          .orWhere("LOWER(TRIM(data_operator.pic_phone)) LIKE :search", { search: searchLower })
          .orWhere("LOWER(TRIM(data_operator.otp)) LIKE :search", { search: searchLower })
          .orWhere("LOWER(TRIM(data_operator.location)) LIKE :search", { search: searchLower });
      })
    );
  }

  qb.groupBy(`TO_CHAR(data_operator.date, '${periodFormat}')`)
    .addGroupBy("data_operator.operator")
    .addGroupBy("data_operator.pic_name")
    .addGroupBy("data_operator.pic_phone")
    .addGroupBy("data_operator.location")
    .addGroupBy("data_operator.otp");

  qb.orderBy('"passenger"', "DESC");

  qb.skip((page - 1) * limit).take(limit);

  const result = await qb.getRawMany();

  return result.map((row) => ({
    ...row,
    passenger: parseInt(row.passenger, 10),
    vehicle: parseInt(row.vehicle, 10),
  }));
};