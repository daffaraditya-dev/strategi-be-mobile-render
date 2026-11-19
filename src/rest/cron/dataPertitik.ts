import { getSiasatiDataPantau, getSiasatiProduksiPertitik } from '@/services/apiSiasati';
import { Moda } from '@/type/produksi.titik.type';
import { mergeLocation } from '../handlers/transportationHub/util/mergeLocation';
import { sumByPeriod } from '../handlers/transportationHub/util/sumByPeriod';
import { AppDataSource } from '@/data-source';
import { MatrikPertitik } from '@/entities/MatrikPertitik';
import { MatrikPertitikPartitioned } from '@/entities/MatrikPertitikPartitioned';
import { ensurePartitions } from '@/utils/partition';
import moment from 'moment';
import { keysModa } from '../handlers/syncMatrik/constant/Keys';
import pMap from 'p-map';
import { getDataEventModa } from '@/services/apiHubnet';
import { findProvince, getProvinceCache } from '@/utils/provinceCache';

export type PertitikTarget = "legacy" | "partitioned";

export const cronPertitik = async ({ moda, isEvent, startDate, endDate, target = "legacy" }: { moda: Moda; isEvent?: boolean, event?: number; startDate?: string; endDate?: string; target?: PertitikTarget; }) => {
  console.log(`Running scheduled task: ${moda} (${target})`);
  try {
    const today = new Date();
    const tanggalAwal1 = startDate || today.toISOString().split('T')[0]; // YYYY-MM-DD
    const tanggalAkhir1 = endDate || today.toISOString().split('T')[0];   // YYYY-MM-DD

    const totalStart = performance.now();
    const modaLower = moda.toLowerCase() as Moda;

    let siasatiProduksiPertitik: any = {};
    let siasatiDataPantau: any = {};
    let time: any = {
      message: [],
      totalProcess: 0
    };

    const listEvents: any[] = [];

    const defaultEvent = {
      end_date: tanggalAkhir1,
      event_pantau: 0,
      event: 0,
      start_date: tanggalAwal1,
      provinsi: "",
      moda: modaLower
    };

    // Load all provinces once — avoids N+1 DB queries inside the loop
    const provinces = await getProvinceCache();

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
          listEvents.push({
            start_date: moment(item.tanggal_mulai).format("YYYY-MM-DD"),
            end_date: moment(item.tanggal_selesai).format("YYYY-MM-DD"),
            event: item.id,
            event_pantau: item.id,
            provinsi: "",
            moda: modaLower
          });
        });
      }
    }

    await pMap(listEvents, async (selectedEvent) => {
      const startGetDataPertitik = performance.now();
      siasatiDataPantau = await getSiasatiDataPantau(selectedEvent);
      siasatiProduksiPertitik = await getSiasatiProduksiPertitik(selectedEvent);
      const endGetDataPertitik = performance.now();
      time["dataPertitik"] = (endGetDataPertitik - startGetDataPertitik) / 1000;

      // const { dataPantau, dataPertitik, keyData } = decodeProduksiSeasonal({ event: { ...dataAll?.data?.event, tanggal_mulai: tanggalAwal1, tanggal_selesai: tanggalAkhir1 }, prev_event: dataAll?.data?.prev_event, result: dataAll?.data?.result });

      const startCompute = performance.now();
      const data = mergeLocation({ provinceName: "", dataPantau: siasatiDataPantau, dataProduksiPertitik: siasatiProduksiPertitik });

      const sumResult = sumByPeriod({ data: data, moda: modaLower, groupByType: "daily", template: ["raw"], sort: "desc", isSeasonal: false });
      const take10Data = sumResult.slice(0, sumResult.length);
      const endCompute = performance.now();
      time["compute"] = (endCompute - startCompute) / 1000;

      const startInsert = performance.now();
      const isPartitioned = target === "partitioned";
      const MatrikEntity = isPartitioned ? MatrikPertitikPartitioned : MatrikPertitik;
      const dataMatrik = AppDataSource.getRepository(MatrikEntity);
      const table = dataMatrik.metadata.tableName;

      // selectedEvent hanya punya start_date/end_date. Dulu delete memakai tanggalAwal1/tanggalAkhir1
      // (undefined) sehingga tidak ada baris terhapus dan tiap putaran menambah snapshot duplikat.
      const deleteStart = selectedEvent.start_date;
      const deleteEnd = selectedEvent.end_date;

      if (isPartitioned) {
        await ensurePartitions(selectedEvent.start_date, selectedEvent.end_date);
      }

      let totalDataCount = 0;
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
          .andWhere(`${table}.date between :startDate and :endDate`, { startDate: deleteStart, endDate: deleteEnd })
          .execute();
      }
      const tanggalEvent = siasatiProduksiPertitik["tanggal_event"];

      // await pgClient.query(
      //   `DELETE FROM data_matriks 
      //    WHERE moda = $1 
      //    AND date BETWEEN $2 AND $3`,
      //   [modaLower, tanggalAwal1, tanggalAkhir1]
      // );

      await pMap(take10Data, async (item) => {
        const perfItemStart = Date.now();

        const resultProvinsi = findProvince(provinces, item?.provinsi);


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
            event: selectedEvent.event,
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
            provinceId: String(provinceId),
            label: label,
          };

          const baseDataDom: Partial<MatrikPertitik> = {
            event: selectedEvent.event,
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
            provinceId: String(provinceId),
            label: label,
          };

          const baseDataIntl: Partial<MatrikPertitik> = {
            event: selectedEvent.event,
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
            provinceId: String(provinceId),
            label: label,
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

        console.log("inserting", listEvents, selectedEvent.event, "new data", selectedEvent.event, listData.length);

        if (listData.length > 0) {
          const chunkSize = getDynamicChunkSize(listData.length);
          for (let i = 0; i < listData.length; i += chunkSize) {
            const chunk = listData.slice(i, i + chunkSize);
            await dataMatrik
              .createQueryBuilder()
              .insert()
              .into(MatrikEntity)
              .values(chunk)
              .execute();
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
      }, { concurrency: 1 });
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



    }, { concurrency: 1 });

  } catch (error) {
    console.error('Error during scheduled task execution:', error);
  }
};

function getDynamicChunkSize(dataLength: number): number {
  if (dataLength <= 500) return 100;
  if (dataLength <= 5000) return 500;
  return 1000;
}
