import { AppDataSource } from "@/data-source";
import { Request, Response } from "express";
import Joi from "joi";
import { mergeLocation } from "../transportationHub/util/mergeLocation";
import { sumByPeriod } from "../transportationHub/util/sumByPeriod";
import { keysModa } from "./constant/Keys";
import { Moda } from "@/type/produksi.titik.type";
import { getSiasatiDataPantau, getSiasatiProduksi, getSiasatiProduksiPertitik } from "@/services/apiSiasati";
import moment from "moment";
import { forEach, isEmpty, isNaN, isNumber, map } from "lodash";
import { MODA } from "@/constants/moda";
import { MatrikProduksi } from "@/entities/MatrikProduksi";
import { getDataEventModa } from "@/services/apiHubnet";

const syncPayload = Joi.object({
  tanggalAwal1: Joi.string(),
  tanggalAkhir1: Joi.string(),
  moda: Joi.string(),
  event: Joi.string().optional(),
});

export const syncProduksiHandler = async (req: Request, res: Response) => {
  const { error, value } = syncPayload.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { tanggalAwal1, tanggalAkhir1, moda, event } = value;
    const totalStart = performance.now();
    const modaLower = moda?.toLowerCase();

    let siasatiProduksi: any = {};
    let time: any = {
      message: [],
      totalProcess: 0
    };

    const startGetDataProduksi = performance.now();

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

    console.log(selectedEvent, "=====selectedEvent=====");

    siasatiProduksi = await getSiasatiProduksi({
      end_date: selectedEvent.tanggalAkhir1,
      event_pantau: selectedEvent.eventPantau,
      event: selectedEvent.event,
      start_date: selectedEvent.tanggalAwal1,
      provinsi: "",
      moda: modaLower
    });

    const endGetDataProduksi = performance.now();
    time["dataProduksi"] = (endGetDataProduksi - startGetDataProduksi) / 1000;

    const data = siasatiProduksi[modaLower];
    const tanggalEvent = siasatiProduksi["tanggal_event"];

    if (!isEmpty(data)) {
      const startInsert = performance.now();
      const dataMatrik = AppDataSource.getRepository(MatrikProduksi);

      await dataMatrik
        .createQueryBuilder()
        .delete()
        .where("data_recap.moda = :moda", { moda: modaLower })
        .andWhere("data_recap.event = :event", { event: selectedEvent.event })
        .andWhere("data_recap.date between :startDate and :endDate", { startDate: selectedEvent.tanggalAwal1, endDate: selectedEvent.tanggalAkhir1 })
        .execute();

      let totalDataCount = 0;
      const listData: MatrikProduksi[] = [];
      const perfItemStart = Date.now();
      await Promise.all(
        map(data, async (item: any) => {
          if (item === "laut") {
            console.log(data, "=====data=====");

          }

          // additional info
          const recordDate = item["tanggal"];
          const tipe = item?.tipe;

          const timestamp = moment().format("YYYY-MM-DD HH:mm:ssZ");
          const label = tanggalEvent?.find((tglEvent: any) => tglEvent?.tanggal === item.tanggal)?.label || "";

          const baseData: Partial<MatrikProduksi> = {
            moda: modaLower,
            departure: item[keysModa[modaLower as Moda].departure],
            arrival: item[keysModa[modaLower as Moda].arrival],
            vehicleArrival: item[keysModa[modaLower as Moda].vehicleArrival],
            vehicleDeparture: item[keysModa[modaLower as Moda].vehicleDeparture],
            responseApi: JSON.stringify(item),
            date: recordDate,
            updated_at: timestamp,
            created_at: timestamp,
            type: modaLower == "udara" || modaLower === "laut" ? "ALL" : tipe,
            event: selectedEvent.event,
            label: label || ''
          };

          const baseDataDom: Partial<MatrikProduksi> = {
            moda: modaLower,
            departure: item[keysModa[modaLower as Moda].departure_dom],
            arrival: item[keysModa[modaLower as Moda].arrival_dom],
            vehicleArrival: item[keysModa[modaLower as Moda].vehicle_departure_dom],
            vehicleDeparture: item[keysModa[modaLower as Moda].vehicle_arrival_dom],
            responseApi: JSON.stringify(item),
            date: recordDate,
            updated_at: timestamp,
            created_at: timestamp,
            type: "DOM",
            event: selectedEvent.event,
            label: label || ''

          };

          const baseDataIntl: Partial<MatrikProduksi> = {
            moda: modaLower,
            departure: item[keysModa[modaLower as Moda].departure_intl],
            arrival: item[keysModa[modaLower as Moda].arrival_intl],
            vehicleArrival: item[keysModa[modaLower as Moda].vehicle_arrival_intl],
            vehicleDeparture: item[keysModa[modaLower as Moda].vehicle_departure_intl],
            responseApi: JSON.stringify(item),
            date: recordDate,
            updated_at: timestamp,
            created_at: timestamp,
            type: "INTL",
            event: selectedEvent.event,
            label: label || ''

          };

          // dom
          if (modaLower === "udara" || modaLower === "laut") {
            listData.push(baseDataDom as MatrikProduksi);
          }

          // intl
          if (modaLower === "udara" || modaLower === "laut") {
            listData.push(baseDataIntl as MatrikProduksi);
          }

          // base
          listData.push(baseData as MatrikProduksi);
        }));

      if (listData?.length > 0) {
        await dataMatrik
          .createQueryBuilder()
          .insert()
          .into(MatrikProduksi)
          .values(listData)
          .execute();

        const perfItemEnd = Date.now();
        const durationMs = perfItemEnd - perfItemStart;
        const durationSeconds = durationMs / 1000;
        const dataCount = listData.length;
        const timePerDataMs = durationMs / dataCount;
        const dataPerSecond = dataCount / durationSeconds;

        const itemStartAbs = moment(perfItemStart).toLocaleString();
        const itemEndAbs = moment(perfItemEnd).toLocaleString();

        const log = `| Total: ${dataCount} data | Durasi: ${durationSeconds.toFixed(2)} detik | Kecepatan: ${dataPerSecond.toFixed(2)} data/detik | Waktu per data: ${timePerDataMs.toFixed(2)} ms | Rentang: ${itemStartAbs} - ${itemEndAbs}`;
        time.message.push(log);

        totalDataCount += dataCount;
      }

      const endInsert = performance.now();
      time["insertDB"] = (endInsert - startInsert) / 1000;

      const totalEnd = performance.now();
      const totalDurationSeconds = (totalEnd - totalStart) / 1000;
      const globalTimePerDataMs = (totalDurationSeconds * 1000) / totalDataCount;
      const globalSpeed = totalDataCount / totalDurationSeconds;

      // Ringkasan akhir
      console.log(`========== RINGKASAN PROSES ${modaLower} ==========`);
      console.log(`✅ Total lokasi diproses: ${data.length}`);
      console.log(`📦 Total data seluruh lokasi: ${totalDataCount}`);
      console.log(`⏱️ Total waktu proses: ${totalDurationSeconds.toFixed(2)} detik`);
      console.log(`🚀 Kecepatan rata-rata global: ${globalSpeed.toFixed(2)} data/detik`);
      console.log(`📊 Waktu per data global: ${globalTimePerDataMs.toFixed(2)} ms`);
      console.log("=======================================");
    }

    return res.json({ status: true, data: { time, siasatiProduksi } });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};
