import { AppDataSource } from "@/data-source";
import { MatrikPertitik } from "@/entities/MatrikPertitik";
import { MatrikPertitikPartitioned } from "@/entities/MatrikPertitikPartitioned";
import { ensurePartitionsForDates } from "@/utils/partition";
import { Request, Response } from "express";
import Joi from "joi";
import { mergeLocation } from "../transportationHub/util/mergeLocation";
import { sumByPeriod } from "../transportationHub/util/sumByPeriod";
import { keysModa } from "./constant/Keys";
import { Moda } from "@/type/produksi.titik.type";
import { getSiasatiDataPantau, getSiasatiProduksiPertitik } from "@/services/apiSiasati";
import moment from "moment";
import { getDataEventModa } from "@/services/apiHubnet";
import { decodeProduksiSeasonal, decoderMergeDataEvent } from "@/utils/produksiDecoder";
import pMap from "p-map";
import { ILike } from "typeorm";
import { MstProvinsi } from "@/entities/MstProvinsi";
// import { sumDataPertitik } from "./util/sumData";
// import { createProduksiPertitik } from "@/constants/sampleData";

const transportationHubRequest = Joi.object({
  tanggalAwal1: Joi.string(),
  tanggalAkhir1: Joi.string(),
  moda: Joi.string().required(),
  event: Joi.string().optional(),
  // tabel tujuan: data_matriks lama, data_matriks_partitioned, atau keduanya
  target: Joi.string().valid("legacy", "partitioned", "both").default("both"),
});

export const syncMatrikHandler = async (req: Request, res: Response) => {
  const { error, value } = transportationHubRequest.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { moda, tanggalAwal1, tanggalAkhir1, event, target } = value;
    const totalStart = performance.now();
    const modaLower = moda.toLowerCase();

    let siasatiProduksiPertitik: any = {};
    let siasatiDataPantau: any = {};
    let time: any = {
      message: [],
      totalProcess: 0
    };

    const selectedEvent = {
      event: 0,
      eventPantau: 0,
      tanggalAkhir1: tanggalAkhir1,
      tanggalAwal1: tanggalAwal1,
    };

    if (event) {
      const res = await getDataEventModa(modaLower);
      const tmpSelected = res?.data?.find((item) => item.id === Number(event));

      if (res?.data && tmpSelected) {
        selectedEvent.event = tmpSelected.id;
        selectedEvent.eventPantau = tmpSelected.id;
        selectedEvent.tanggalAwal1 = tmpSelected.tanggal_mulai;
        selectedEvent.tanggalAkhir1 = tmpSelected.tanggal_selesai;
      }
    }

    const startGetDataPertitik = performance.now();
    siasatiDataPantau = await getSiasatiDataPantau({
      end_date: selectedEvent.tanggalAkhir1,
      event_pantau: selectedEvent.eventPantau,
      event: selectedEvent.event,
      start_date: selectedEvent.tanggalAwal1,
      provinsi: "",
      moda: modaLower
    });
    siasatiProduksiPertitik = await getSiasatiProduksiPertitik({
      end_date: selectedEvent.tanggalAkhir1,
      event_pantau: selectedEvent.eventPantau,
      event: selectedEvent.event,
      start_date: selectedEvent.tanggalAwal1,
      provinsi: "",
      moda: modaLower
    });
    const endGetDataPertitik = performance.now();
    time["dataPertitik"] = (endGetDataPertitik - startGetDataPertitik) / 1000;

    const startCompute = performance.now();
    const data = mergeLocation({ provinceName: "", dataPantau: siasatiDataPantau, dataProduksiPertitik: siasatiProduksiPertitik });

    const sumResult = sumByPeriod({ data: data, moda: modaLower, groupByType: "daily", template: ["raw"], sort: "desc", isSeasonal: !isNaN(event), returnAllKey: true });
    const take10Data = sumResult.slice(0, sumResult.length);
    const endCompute = performance.now();
    time["compute"] = (endCompute - startCompute) / 1000;

    const startInsert = performance.now();
    // tabel tujuan sesuai `target` (default both: tabel lama + partitioned)
    const entities: any[] = [
      ...(target !== "partitioned" ? [MatrikPertitik] : []),
      ...(target !== "legacy" ? [MatrikPertitikPartitioned] : []),
    ];

    // partisi bulanan harus ada sebelum insert, kalau tidak baris masuk ke partisi DEFAULT
    if (target !== "legacy") {
      await ensurePartitionsForDates(
        (take10Data as any[]).flatMap((item) => (item?.detail || []).map((d: any) => d?.tanggal))
      );
    }

    let totalDataCount = 0;

    // delete

    for (const entity of entities) {
      const dataMatrik = AppDataSource.getRepository(entity);
      const table = dataMatrik.metadata.tableName;

      if (selectedEvent.event !== 0) {
        await dataMatrik
          .createQueryBuilder()
          .delete()
          .where(`${table}.moda = :moda`, { moda: modaLower })
          .andWhere(`${table}.event = :event`, { event: selectedEvent.event })
          .execute();
      } else {
        await dataMatrik
          .createQueryBuilder()
          .delete()
          .where(`${table}.moda = :moda`, { moda: modaLower })
          .andWhere(`${table}.event = :event`, { event: selectedEvent.event })
          .andWhere(`${table}.date between :startDate and :endDate`, { startDate: selectedEvent.tanggalAwal1, endDate: selectedEvent.tanggalAkhir1 })
          .execute();
      }
    }

    //       await pgClient.query(
    //   `DELETE FROM data_matriks 
    //    WHERE moda = $1 
    //    AND date BETWEEN $2 AND $3`,
    //   [modaLower, tanggalAwal1, tanggalAkhir1]
    // );
    const tanggalEvent = siasatiProduksiPertitik["tanggal_event"];

    const resultDataMatrik = await pMap(take10Data, async (item) => {
      const perfItemStart = Date.now();
      const modaLower = moda.toLowerCase();

      const whereClause: any = {};

      if (item?.provinsi !== undefined && item?.provinsi !== null && item?.provinsi !== "null" && item?.provinsi !== "undefined") {
        whereClause.namaProvinsi = ILike(`%${item?.provinsi.toLowerCase()}%`);
      }

      const repoProvinsi = AppDataSource.getRepository(MstProvinsi);
      const resultProvinsi = await repoProvinsi.findOne({
        where: whereClause,
      });


      const listData: MatrikPertitik[] = [];

      for (const item2 of item?.detail || []) {

        const locationId = item2?.id_lokasi || item?.id_lokasi;
        // additional info
        const tipe = item2?.tipe || item?.tipe;
        const name = item2?.nama_terminal || item?.nama_terminal || item?.nama || item?.name;
        const city = item2?.kota || item?.kota;
        const province = item2?.provinsi || item?.provinsi;
        const longitude = item2?.longitude || item?.longitude;
        const latitude = item2?.latitude || item?.latitude;
        const coordinate = item2?.koordinat || item?.koordinat;
        const label = tanggalEvent?.find((tglEvent: any) => tglEvent?.tanggal === item2.tanggal)?.label || "";
        const provinceId = resultProvinsi?.id;


        const recordDate = item2["tanggal"];

        const timestamp = moment().format("YYYY-MM-DD HH:mm:ssZ");

        const baseData: Partial<MatrikPertitik> = {
          event: !isNaN(event) ? event : 0,
          idLokasi: locationId,
          moda: modaLower,
          departure: item2[keysModa[modaLower as Moda].departure],
          arrival: item2[keysModa[modaLower as Moda].arrival],
          vehicleArrival: item2[keysModa[modaLower as Moda].vehicleArrival],
          vehicleDeparture: item2[keysModa[modaLower as Moda].vehicleDeparture],
          responseApi: JSON.stringify(item2),
          date: recordDate,
          updated_at: timestamp,
          created_at: timestamp,
          type: modaLower == "udara" ? "ALL" : tipe,
          name: name,
          city: city,
          province: province,
          longitude: longitude,
          latitude: latitude,
          coordinate: coordinate,
          label: label,
          provinceId: String(provinceId)
        };

        const baseDataDom: Partial<MatrikPertitik> = {
          event: !isNaN(event) ? event : 0,
          idLokasi: locationId,
          moda: modaLower,
          departure: item2[keysModa[modaLower as Moda].departure_dom],
          arrival: item2[keysModa[modaLower as Moda].arrival_dom],
          vehicleDeparture: item2[keysModa[modaLower as Moda].vehicle_departure_dom],
          vehicleArrival: item2[keysModa[modaLower as Moda].vehicle_arrival_dom],
          responseApi: JSON.stringify(item2),
          date: recordDate,
          updated_at: timestamp,
          created_at: timestamp,
          type: "DOM",
          name: name,
          city: city,
          province: province,
          longitude: longitude,
          latitude: latitude,
          coordinate: coordinate,
          label: label,
          provinceId: String(provinceId)
        };

        const baseDataIntl: Partial<MatrikPertitik> = {
          event: !isNaN(event) ? event : 0,
          idLokasi: locationId,
          moda: modaLower,
          departure: item2[keysModa[modaLower as Moda].departure_intl],
          arrival: item2[keysModa[modaLower as Moda].arrival_intl],
          vehicleDeparture: item2[keysModa[modaLower as Moda].vehicle_departure_intl],
          vehicleArrival: item2[keysModa[modaLower as Moda].vehicle_arrival_intl],
          responseApi: JSON.stringify(item2),
          date: recordDate,
          updated_at: timestamp,
          created_at: timestamp,
          type: "INTL",
          name: name,
          city: city,
          province: province,
          longitude: longitude,
          latitude: latitude,
          coordinate: coordinate,
          label: label,
          provinceId: String(provinceId)
        };

        // dom
        if (modaLower === "udara") {
          listData.push(baseDataDom as MatrikPertitik);
        }

        // intl
        if (modaLower === "udara") {
          listData.push(baseDataIntl as MatrikPertitik);
        }

        // base
        listData.push(baseData as MatrikPertitik);
      }

      if (listData.length > 0) {
        const chunkSize = getDynamicChunkSize(listData.length);
        for (let i = 0; i < listData.length; i += chunkSize) {
          const chunk = listData.slice(i, i + chunkSize);
          for (const entity of entities) {
            await AppDataSource
              .createQueryBuilder()
              .insert()
              .into(entity)
              .values(chunk)
              .execute();
          }
        }

        // const res = await dataMatrik
        //   .createQueryBuilder()
        //   .insert()
        //   .into(MatrikPertitik)
        //   .values(listData)
        //   .execute();

        // const res = await dataMatrik
        //   .createQueryBuilder()
        //   .insert()
        //   .into(MatrikPertitik)
        //   .values(listData).orUpdate(["departure", "arrival", "vehicle_arrival", "vehicle_departure", "created_at", "updated_at", "type", "name", "city", "province", "longitude", "latitude", "coordinate"], ["id"])
        //   .execute();



        const perfItemEnd = Date.now();
        const durationMs = perfItemEnd - perfItemStart;
        const durationSeconds = durationMs / 1000;
        const dataCount = listData.length;
        const timePerDataMs = durationMs / dataCount;
        const dataPerSecond = dataCount / durationSeconds;

        const itemStartAbs = moment(perfItemStart).toLocaleString();
        const itemEndAbs = moment(perfItemEnd).toLocaleString();

        const log = `ID Lokasi: ${item.id_lokasi} | Total: ${dataCount} data | Durasi: ${durationSeconds.toFixed(2)} detik | Kecepatan: ${dataPerSecond.toFixed(2)} data/detik | Waktu per data: ${timePerDataMs.toFixed(2)} ms | Rentang: ${itemStartAbs} - ${itemEndAbs}`;
        time.message.push(log);

        // Statistik waktu lambat/cepat per lokasi
        time["slow"] = time["slow"] // Changed "low" to "slow" for consistency
          ? time["slow"] <= durationSeconds
            ? durationSeconds
            : time["slow"]
          : durationSeconds;

        time["fast"] = time["fast"]
          ? time["fast"] >= durationSeconds
            ? durationSeconds
            : time["fast"]
          : durationSeconds;
        totalDataCount += dataCount;

        // return res;
      }
    }, { concurrency: 3 });
    // const savePromises = take10Data.map(async (item: any) => {

    // });


    const endInsert = performance.now();
    time["insertDB"] = (endInsert - startInsert) / 1000;


    const totalEnd = performance.now();
    const totalDurationSeconds = (totalEnd - totalStart) / 1000;
    const globalTimePerDataMs = (totalDurationSeconds * 1000) / totalDataCount;
    const globalSpeed = totalDataCount / totalDurationSeconds;

    // Ringkasan akhir
    console.log(`========== RINGKASAN PROSES ${modaLower} ==========`);
    console.log(`📊 Waktu get API: ${time["dataPertitik"]} s`);
    console.log(`✅ Total lokasi diproses: ${take10Data.length}`);
    console.log(`📦 Total data seluruh lokasi: ${totalDataCount}`);
    console.log(`⏱️ Total waktu proses: ${totalDurationSeconds.toFixed(2)} detik`);
    console.log(`🚀 Kecepatan rata-rata global: ${globalSpeed.toFixed(2)} data/detik`);
    console.log(`📊 Waktu per data global: ${globalTimePerDataMs.toFixed(2)} ms`);
    console.log("=======================================");


    return res.json({ status: true, data: { time, resultDataMatrik } });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};

function getDynamicChunkSize(dataLength: number): number {
  if (dataLength <= 500) return 100;
  if (dataLength <= 5000) return 500;
  return 1000;
}

// const insertMatrikPertitik = async (dataList: MatrikPertitik[]) => {
//   if (dataList.length === 0) return;

//   const columns = [
//     "event", "id_lokasi", "moda", "departure", "arrival", "vehicle_arrival", "vehicle_departure",
//     "response_api", "date", "updated_at", "created_at", "type",
//     "name", "city", "province", "longitude", "latitude", "coordinate"
//   ];

//   const values: any[] = [];
//   const placeholders: string[] = [];

//   dataList.forEach((data, index) => {
//     const valueOffset = index * columns.length;
//     const placeholderSet = columns.map((_, i) => `$${valueOffset + i + 1}`);
//     placeholders.push(`(${placeholderSet.join(", ")})`);
//     values.push(
//       data.event,
//       data.idLokasi,
//       data.moda,
//       data.departure,
//       data.arrival,
//       data.vehicleArrival,
//       data.vehicleDeparture,
//       data.responseApi,
//       data.date,
//       data.updated_at,
//       data.created_at,
//       data.type,
//       data.name,
//       data.city,
//       data.province,
//       data.longitude,
//       data.latitude,
//       data.coordinate
//     );
//   });

//   const sql = `
//     INSERT INTO data_matriks (${columns.join(", ")})
//     VALUES ${placeholders.join(", ")}
//   `;

//   await pgClient.query(sql, values);
// }