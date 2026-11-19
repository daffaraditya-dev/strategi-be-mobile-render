import { Moda, ProduksiPertitik } from "@/type/produksi.titik.type";
import { TitikPantau } from "@/type/titik.pantau.type";
import { filter, mapValues } from "lodash";

export const mergeLocation = ({ dataProduksiPertitik, dataPantau, provinceName }: { dataProduksiPertitik: ProduksiPertitik; dataPantau: TitikPantau; provinceName: string; }) => {

  const result = mapValues(dataProduksiPertitik, (value: any, key: Moda) => {
    const ignoredKeys: (keyof ProduksiPertitik)[] = ["tanggal_event", "terminalb"];

    if (ignoredKeys.includes(key as keyof ProduksiPertitik)) {
      return value;
    }

    const result = value.map((e: any) => {
      const matchingTitikPantau = dataPantau?.[key].filter((item) => provinceName && provinceName !== "Seluruh Provinsi" ? item.provinsi === provinceName : true).find((item) => String(item.id_lokasi) === String(e?.id_lokasi));
      if (matchingTitikPantau) {
        return {
          ...e,
          ...matchingTitikPantau,
          label: dataProduksiPertitik?.["tanggal_event"].find((tglEvent) => tglEvent.tanggal === e.tanggal)?.label || ""
        };
      }
    });

    const resultFiltered = filter(result, (v) =>
      v !== null &&
      v !== undefined &&
      typeof v !== 'boolean'
    );

    return resultFiltered;
  });
  return result as unknown as ProduksiPertitik;
};
