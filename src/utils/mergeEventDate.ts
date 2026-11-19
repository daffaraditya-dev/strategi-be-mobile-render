/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProduksiTanggalEvent } from "@/type/produksi.type";
import _ from 'lodash';
import { find } from "lodash";

export const mergeTanggalEventToData = (
  data: Record<string, any>,
  tanggalEvents: ProduksiTanggalEvent[],
  startDate?: string,
  endDate?: string
) => {
  const normalizeData = startDate && endDate ? normalizeDataProcess(data as unknown as any[], startDate, endDate) : data;

  const result = normalizeData.map((e: any) => {
    const matchingTanggalEvent = find(tanggalEvents, {
      tanggal: e?.tanggal,
    });
    if (matchingTanggalEvent) {
      return {
        ...e,
        label: matchingTanggalEvent.label,
        tanggal_event: matchingTanggalEvent.tanggal,
      };
    } else {
      return { ...e, label: e.tgl };
    }
  });
  return result;
};


export const generateDate = (startDateStr: string, endDateStr: string, hDateStr?: string) => {
  const result = [];
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const hDate = new Date(hDateStr || "");

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {

    let label = '';

    if (hDateStr) {
      const diff = Math.floor((date.getTime() - hDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diff < 0) {
        label = `H - ${Math.abs(diff)}`;
      } else if (diff === 0) {
        label = `H 1`;
      } else {
        label = `H + ${diff}`;
      }
    } else {
      // const day = date.getDate();
      // const month = date.getMonth() + 1;
      // const year = date.getFullYear();
      // label = `${day}/${month}/${year}`;
      label = "";
    }

    result.push({
      label,
      tanggal: date.toISOString().slice(0, 10),
    });
  }

  return result;
};


interface DataItem {
  tanggal: string;
  id_lokasi: string;
  [key: string]: any;
}

export const normalizeDataProcess = (
  data: DataItem[],
  startDateStr: string,
  endDateStr: string
): DataItem[] => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const allDates: string[] = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    allDates.push(d.toISOString().slice(0, 10));
  }

  const grouped = _.groupBy(data, 'id_lokasi');
  const result: DataItem[] = [];

  for (const [id_lokasi, records] of Object.entries(grouped)) {
    const dateMap = _.keyBy(records, 'tanggal');

    const dynamicKeys = _(records)
      .flatMap(Object.keys)
      .uniq()
      .without('tgl', 'tanggal', 'id_lokasi');

    allDates.forEach((tanggal) => {
      if (dateMap[tanggal]) {
        result.push(dateMap[tanggal]);
      } else {
        const dateObj = new Date(tanggal);
        const tgl = dateObj.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
        });

        const dynamicData = Object.fromEntries(dynamicKeys.map((key) => [key, '0']).value());

        result.push({
          tanggal,
          id_lokasi,
        });
      }
    });
  }

  return _.sortBy(result, ['id_lokasi', 'tanggal']);
};

