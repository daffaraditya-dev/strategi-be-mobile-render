import { has, isArray, transform } from 'lodash';
import { mergeTanggalEventToData } from './mergeEventDate';
import { Produksi, ProduksiDataResponseApi, ProduksiTanggalEvent } from '@/type/produksi.type';
import { ProduksiPertitik } from '@/type/produksi.titik.type';

export const decodeProduksiSeasonal = ({ prev_event: prevEvents = [], event: selectedEvent = {
  id: 0,
  nama: 'DEFAULT EVENT',
  tipe: 'ANGLEB',
  tanggal_mulai: '2024-04-03',
  tanggal_selesai: '2024-04-18',
  prev_event: '[]',
  sub_nama: '',
  h_1: "",
  note_narasi: '',
  split_periode: "",
  flag: 0
}, result }: ProduksiDataResponseApi) => {
  const tmpDataPantau: any = {};
  const tmpDataPertitik: any = {};
  const tmpDataProduksi: any = {};
  const keys: string[] = [];
  const tmpPrevEvent = [...prevEvents, selectedEvent];


  tmpPrevEvent.map((event, index) => {
    const key = selectedEvent?.id ? `${selectedEvent?.id}::${event?.id}` : index + 1;

    if (has(result, key)) {
      if (has(result[key], 'data_pantau')) {
        tmpDataPantau[key] = result[key].data_pantau?.data;
      }
      if (has(result[key], 'data_produksi')) {
        const resData = result[key].data_produksi?.data as any;
        const res = transform(
          resData,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: any, value: any, key: string) => {
            if (
              key !== 'tanggal_event' &&
              isArray(value)
            ) {
              acc[key] = mergeTanggalEventToData(
                value,
                resData['tanggal_event']
              );
            } else {
              acc[key] = value;
            }
          },
          {}
        ) as Produksi;
        tmpDataProduksi[key] = res;
      }
      if (has(result[key], 'data_produksi_pertitik')) {
        // tmpDataPertitik[key] =
        //   result[key].data_produksi_pertitik?.data;


        const resData = result[key].data_produksi_pertitik?.data as any;
        const res = transform(
          resData,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: any, value: any, key: string) => {
            if (
              key !== 'tanggal_event' &&
              isArray(value)
            ) {
              acc[key] = mergeTanggalEventToData(
                value,
                resData['tanggal_event'],
                event.tanggal_mulai,
                event.tanggal_selesai
              );
            } else {
              acc[key] = value;
            }
          },
          {}
        ) as Produksi;
        tmpDataPertitik[key] = res;

      };

      keys.push(String(key));
    }
  });

  return {
    dataPantau: tmpDataPantau,
    dataPertitik: tmpDataPertitik,
    dataProduksi: tmpDataProduksi,
    keyData: keys
  };

};


export const decoderMergeDataEvent = (data: any, tanggalEvent: ProduksiTanggalEvent[], tanggal_mulai: string, tanggal_selesai: string) => {
  const result = transform(
    data,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc: any, value: any, key: string) => {
      if (
        key !== 'tanggal_event' &&
        isArray(value)
      ) {
        acc[key] = mergeTanggalEventToData(
          value,
          tanggalEvent,
          tanggal_mulai,
          tanggal_selesai
        );
      } else {
        acc[key] = value;
      }
    },
    {}
  ) as ProduksiPertitik;


  return result;
};