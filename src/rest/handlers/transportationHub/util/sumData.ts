import { Moda, ProduksiPertitik } from "@/type/produksi.titik.type";
import { forEach, groupBy, map, sumBy } from "lodash";
import { keyPenumpangModa } from "../constant/penumpangDataConfig";
import { keyTransportasiModa } from "../constant/saranaDataConfig";


type SummedData = {
  id_lokasi: number;
} & Record<string, number>;

export interface ProduksiPertitikPartial extends Partial<ProduksiPertitik> {
  ka?: unknown[];
  kai?: unknown[];
}

export const sumDataPertitik = ({
  moda,
  data
}: {
  moda: Moda;
  data: ProduksiPertitikPartial;
}): SummedData[] => {

  const grouped = groupBy(data?.[moda], 'id_lokasi');

  const result = map(grouped, (items: any, id_lokasi): SummedData => {
    const summed: SummedData = {
      id_lokasi: Number(id_lokasi),
      nama_terminal: items[0]?.nama_terminal,
      provinsi: items[0]?.provinsi,
      nama: items[0]?.nama,
    };

    if (moda === "jalan") summed["tipe"] = items[0]?.tipe;


    forEach(keyPenumpangModa[moda], (item) => {
      summed[item?.keyData?.[0]] = sumBy(items, (itemData: Record<string, any>) => parseInt(itemData[item?.keyData?.[0]] || '0', 10));
    });
    forEach(keyTransportasiModa[moda], (item) => {
      summed[item?.keyData?.[0]] = sumBy(items, (itemData: Record<string, any>) => parseInt(itemData[item?.keyData?.[0]] || '0', 10));

    });

    return summed;
  });

  return result;
};
