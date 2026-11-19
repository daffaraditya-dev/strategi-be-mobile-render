import { Request, Response } from "express";
import Joi from "joi";
import { AggregationPeriod, matriksData, matriksDataAgg } from "@/repositories/dataMatriks";
import { periodMatriksSum, periodMatriksSumByType, periodMatriksSumAsdp } from "@/repositories/dataMatriks";
import { find, map, orderBy, reduce, sumBy } from "lodash";

const aggregateRequest = Joi.object({
  namaProvinsi: Joi.string().allow(""),
  idProvinsi: Joi.string().allow(""),
  tanggalAwal1: Joi.string(),
  tanggalAkhir1: Joi.string(),
  moda: Joi.string().required(),
  sort: Joi.string().valid("asc", "desc").optional(),
  reportType: Joi.string().valid("daily", "weekly", "monthly", "yearly")
    .required(),
  page: Joi.string(),
  pageSize: Joi.string(),
  event: Joi.string(),
});

export const aggregateHub = async (req: Request, res: Response) => {
  console.log("[aggregateV2] request received", req.query);
  const { error, value } = aggregateRequest.validate(req.query);

  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { tanggalAwal1, tanggalAkhir1, moda, sort, reportType, namaProvinsi, page, pageSize, event, idProvinsi } = value;

    let time: any = {
      message: [],
      totalProcess: 0
    };

    const startProcessDB = performance.now();
    const listSortedkeys = ["departure", "arrival"];
    const listVehicleSortedkeys = ["vehicleDeparture", "vehicleArrival"];

    const sortedKeys = ["toll", "arteri"].includes(moda) ? listVehicleSortedkeys : listSortedkeys;
    const eventFilter = Number(event) === 0 || isNaN(event) ? undefined : Number(event);
    const matriksParams = { endDate: tanggalAkhir1, startDate: tanggalAwal1, moda, sort, page, pageSize, province: namaProvinsi, provinceId: idProvinsi && String(idProvinsi), event: eventFilter, sortDepArrival: false };
    const tagSortedBy = (rows: any[], key: string) => rows.map(item => ({ ...item, sortedBy: key.replace("vehicle", "").toLowerCase() }));

    const timed = async <T>(label: string, fn: () => Promise<T>): Promise<T> => {
      const start = performance.now();
      console.log(`[aggregateV2] ${label}: start`);
      try {
        return await fn();
      } finally {
        const seconds = (performance.now() - start) / 1000;
        time[label] = seconds;
        console.log(`[aggregateV2] ${label}: ${seconds.toFixed(2)}s`);
      }
    };

    let combinedData: any[];
    if (page && pageSize) {
      // top-N berbeda per sortedKey, jadi harus query terpisah
      const results = await Promise.all(map(sortedKeys, key =>
        timed(`matriksData:${key}`, () => matriksData({ ...matriksParams, sortedKey: key })).then(res => tagSortedBy(res.data, key))
      ));
      combinedData = results.flat();
    } else {
      // tanpa pagination baris identik, cukup 1 query lalu urutkan di memori
      const rows = await timed("matriksDataAgg", () => matriksDataAgg({ moda, startDate: tanggalAwal1, endDate: tanggalAkhir1, event: matriksParams.event, province: namaProvinsi, provinceId: matriksParams.provinceId }));
      console.log(`[aggregateV2] matriksData rows: ${rows.length}`);
      const order = sort === "asc" ? "asc" : "desc";
      combinedData = sortedKeys.flatMap(key =>
        tagSortedBy(orderBy(rows, [(item: any) => Number(item[key]) || 0], [order]), key)
      );
    }

    // const { data: dataMatrik, ...paginateData } = await matriksData({ endDate: tanggalAkhir1, startDate: tanggalAwal1, moda, sort, page, pageSize, province: namaProvinsi, event: Number(event) === 0 || isNaN(event) ? null : event, sortDepArrival: false });
    const dataMatrikSum = await timed("periodMatriksSum", () => periodMatriksSum({ endDate: tanggalAkhir1, startDate: tanggalAwal1, moda, periodType: reportType, event: eventFilter }));
    const endProcessDB = performance.now();
    time["processDB"] = (endProcessDB - startProcessDB) / 1000;

    const startProcess = performance.now();
    const finalMatrikDeparture = combinedData.filter((item) => item.sortedBy === "departure").map((item) => {
      return {
        idLocation: item?.idLokasi,
        province: item?.provinsi,
        name: item?.nama,
        departure: item?.departure,
        arrival: item?.arrival,
        vehicleDeparture: item?.vehicleDeparture,
        vehicleArrival: item?.vehicleArrival,
        moda: item?.moda
      };
    });

    const finalMatrikArrival = combinedData.filter((item) => item.sortedBy === "arrival").map((item) => {
      return {
        idLocation: item?.idLokasi,
        province: item?.provinsi,
        name: item?.nama,
        departure: item?.departure,
        arrival: item?.arrival,
        vehicleDeparture: item?.vehicleDeparture,
        vehicleArrival: item?.vehicleArrival,
        moda: item?.moda
      };
    });

    const finalMatrikSum = { daily: {}, weekly: {}, monthly: {}, yearly: {} };
    const computeMatrikSum = reduce(dataMatrikSum, (acc: any, item: any) => {
      acc[eventFilter ? item?.label : item?.period] = {
        label: item.label,
        period: item.period,
        departure: item.departure,
        arrival: item.arrival,
        vehicleDeparture: item.vehicleDeparture,
        vehicleArrival: item.vehicleArrival,
      };
      return acc;
    }, {});

    finalMatrikSum["daily"] = reportType as AggregationPeriod == "daily" ? computeMatrikSum : {};
    finalMatrikSum["weekly"] = reportType as AggregationPeriod == "weekly" ? computeMatrikSum : {};
    finalMatrikSum["monthly"] = reportType as AggregationPeriod == "monthly" ? computeMatrikSum : {};
    finalMatrikSum["yearly"] = reportType as AggregationPeriod == "yearly" ? computeMatrikSum : {};
    const total = {
      departure: sumBy(combinedData.filter((item) => item.sortedBy === "departure"), "departure"),
      arrival: sumBy(combinedData.filter((item) => item.sortedBy === "arrival"), "arrival"),
      vehicleDeparture: sumBy(combinedData.filter((item) => item.sortedBy === "departure"), "vehicleDeparture"),
      vehicleArrival: sumBy(combinedData.filter((item) => item.sortedBy === "arrival"), "vehicleArrival")
    };
    const data: Record<string, any> = {
      time, chart: {
        departure: finalMatrikDeparture,
        arrival: finalMatrikArrival
      }, graph: finalMatrikSum, total
    };

    // udara
    if (moda === "udara") {
      const udara = await timed("periodMatriksSumByType", () => periodMatriksSumByType({ endDate: tanggalAkhir1, startDate: tanggalAwal1, moda, periodType: reportType, type: ["DOM", "INTL"], event: eventFilter }));
      const domestic = find(udara, ({ type }) => type === "DOM") || {};
      const international = find(udara, ({ type }) => type === "INTL") || {};
      data["chartFlight"] = {
        passengers: {
          domestic: domestic.departure || 0,
          outbound: international.departure || 0,
          inbound: international.arrival || 0,
        },
        aircraft: {
          domestic: domestic.vehicleDeparture || 0,
          outbound: international.vehicleDeparture || 0,
          inbound: international.vehicleArrival || 0,
        }
      };
    }

    if (moda === "laut") {
      const laut = await timed("periodMatriksSumByType", () => periodMatriksSumByType({ endDate: tanggalAkhir1, startDate: tanggalAwal1, moda, periodType: reportType, type: ["DOM", "INTL"], event: eventFilter }));
      const domestic = find(laut, ({ type }) => type === "DOM") || {};
      const international = find(laut, ({ type }) => type === "INTL") || {};
      data["chartSailing"] = {
        passengers: {
          domestic: domestic.departure || 0,
          outbound: international.departure || 0,
          inbound: international.arrival || 0,
        },
        ship: {
          domestic: domestic.vehicleDeparture || 0,
          outbound: international.vehicleDeparture || 0,
          inbound: international.vehicleArrival || 0,
        }
      };
    }

    if (moda === "asdp") {
      const asdp = await timed("periodMatriksSumAsdp", () => periodMatriksSumAsdp({ endDate: tanggalAkhir1, startDate: tanggalAwal1, moda }));
      data["chartCapacity"] = {
        motor: asdp?.motor || 0,
        roda4: asdp?.roda4 || 0,
        bus: asdp?.bus || 0,
        truk: asdp?.truk || 0,
      };
    }

    const endProcess = performance.now();
    time["computeProcess"] = (endProcess - startProcess) / 1000;
    time["totalProcess"] = time["processDB"] + time["computeProcess"];

    return res.status(200).json({ status: true, message: "Data retrived", data: data });

  } catch (error) {
    console.log(error, '-----error----');

    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};
