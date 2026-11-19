import { AppDataSource } from "@/data-source";
import { Moda } from "@/type/produksi.titik.type";
import { getSiasatiProduksi } from "@/services/apiSiasati";
import moment from "moment";
import { isEmpty } from "lodash";
import { MatrikProduksi } from "@/entities/MatrikProduksi";
import { keysModa } from "../handlers/syncProduksi/constant/Keys";
import { getDataEventModa } from "@/services/apiHubnet";
import pMap from "p-map";

export const cronProduksi = async ({ moda, isEvent, event, endDate, startDate }: { moda: Moda; isEvent?: boolean, event?: number; startDate?: string; endDate?: string; }) => {
  console.log(`Running scheduled task produksi: ${moda}`);
  try {
    const today = new Date();
    const tanggalAwal1 = startDate || today.toISOString().split('T')[0]; // YYYY-MM-DD
    const tanggalAkhir1 = endDate || today.toISOString().split('T')[0];   // YYYY-MM-DD

    const totalStart = performance.now();
    const modaLower = moda.toLowerCase() as Moda;

    let siasatiProduksi: any = {};
    let time: any = {
      message: [],
      totalProcess: 0
    };

    const startGetDataProduksi = performance.now();
    const listEvents: any[] = [];

    const defaultEvent = {
      event: 0,
      eventPantau: 0,
      tanggalAkhir1: tanggalAkhir1,
      tanggalAwal1: tanggalAwal1,
      moda: modaLower
    };

    if (!isEvent) {
      listEvents.push(defaultEvent);
    } else {
      const res = await getDataEventModa(modaLower);
      const now = moment();

      const activeEvents = res?.data?.filter((item) => {
        const start = moment(item.tanggal_mulai);
        const end = moment(item.tanggal_selesai);

        return (
          now.isSameOrAfter(start, "day") &&
          now.isSameOrBefore(end, "day")
        );
      });


      if (activeEvents?.length) {
        activeEvents.forEach((item) => {
          console.log(item, "=====item=====");
          listEvents.push({
            tanggalAwal1: item.tanggal_mulai,
            tanggalAkhir1: item.tanggal_selesai,
            event: item.id,
            eventPantau: item.id,
            moda: modaLower
          });
        });
      }
    }
    await pMap(listEvents, async (selectedEvent) => {
      siasatiProduksi = await getSiasatiProduksi({
        end_date: selectedEvent.tanggalAkhir1,
        start_date: selectedEvent.tanggalAwal1,
        event_pantau: selectedEvent.eventPantau,
        event: selectedEvent.event,
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

        const result = await dataMatrik
          .createQueryBuilder()
          .delete()
          .where("moda = :moda", { moda: selectedEvent.moda })
          .andWhere("event = :event", { event: selectedEvent.event })
          .andWhere("date BETWEEN :startDate AND :endDate", {
            startDate: selectedEvent.tanggalAwal1,
            endDate: selectedEvent.tanggalAkhir1,
          })
          .execute();

        console.log("DELETE TARGET", {
          moda: selectedEvent.moda,
          event: selectedEvent.event,
          start: selectedEvent.tanggalAwal1,
          end: selectedEvent.tanggalAkhir1,
          result
        });


        let totalDataCount = 0;
        const listData: MatrikProduksi[] = [];
        const perfItemStart = Date.now();
        const timestamp = moment().format("YYYY-MM-DD HH:mm:ssZ");

        // Pure data transformation — no async ops, no pMap needed
        data.forEach((item: any) => {
          const recordDate = item?.["tanggal"];
          const tipe = item?.tipe;
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
            vehicleArrival: item[keysModa[modaLower as Moda].vehicle_arrival_dom],
            vehicleDeparture: item[keysModa[modaLower as Moda].vehicle_departure_dom],
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

          if (modaLower === "udara" || modaLower === "laut") {
            listData.push(baseDataDom as MatrikProduksi);
            listData.push(baseDataIntl as MatrikProduksi);
          }
          listData.push(baseData as MatrikProduksi);
        });

        console.log("inserting", listEvents, selectedEvent.event, "new data", selectedEvent.event, modaLower, listData.length);
        if (listData?.length > 0) {
          const res = await dataMatrik
            .createQueryBuilder()
            .insert()
            .into(MatrikProduksi)
            .values(listData).execute();


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
        console.log("========== RINGKASAN PROSES PRODUKSI ==========");
        console.log(`✅ Total lokasi diproses: ${data.length}`);
        console.log(`📦 Total data seluruh lokasi: ${totalDataCount}`);
        console.log(`⏱️ Total waktu proses: ${totalDurationSeconds.toFixed(2)} detik`);
        console.log(`🚀 Kecepatan rata-rata global: ${globalSpeed.toFixed(2)} data/detik`);
        console.log(`📊 Waktu per data global: ${globalTimePerDataMs.toFixed(2)} ms`);
        console.log("=======================================");
      }
    }, { concurrency: 1 });



  } catch (error) {
    console.error('Error during scheduled task execution:', error);
  }
};