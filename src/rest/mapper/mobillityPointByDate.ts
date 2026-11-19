import {
  ProduksiArteri,
  ProduksiAsdp,
  ProduksiJalan,
  ProduksiLaut,
  ProduksiStasiun,
  ProduksiToll,
  ProduksiUdara,
  ResponseDataSiasatiStrategi,
  TitikPantau,
} from "@/services/type/apiHubnet";
import { parseNumber } from "../../utils/number";
import { MODA } from "@/constants/moda";
import { findDataPantau } from "./common";

export type DataRangePointItem = {
  locationName: string;
  idLokasi: string | number;
  provinceName: string;
  cityName: string;
  kodeLokasi: string;
  date: string; // Date in YYYY-MM-DD format
  arrival: number;
  departure: number;
  vehicleArrival: number;
  vehicleDeparture: number;
};

function mobillityPointByDate(
  response: ResponseDataSiasatiStrategi,
  moda: string,
  isSeasonal: boolean = false
): DataRangePointItem[] {
  if (!response.data?.result) {
    return [];
  }

  let resultData: DataRangePointItem[] = [];
  for (const result of Object.values(response.data.result)) {
    if (!result?.data_produksi_pertitik?.data) {
      continue;
    }

    const data = result.data_produksi_pertitik.data;
    const modeData = data[moda as keyof typeof data];
    const dataPantau = result.data_pantau?.data[moda as keyof TitikPantau];

    if (!modeData) continue;

    let eventDate = new Map();
    if (isSeasonal) {
      eventDate = new Map(
        data.tanggal_event.map((it) => [it.tanggal, it.label])
      );
    }

    for (const itemData of modeData as Record<string, any>[]) {
      if (!("tanggal" in itemData)) continue;

      const date = isSeasonal
        ? eventDate.get(itemData.tanggal) || ""
        : itemData.tanggal;

      if (isSeasonal) {
        const currentDate = new Date();
        if (new Date(itemData.tanggal) > currentDate) continue;
      }

      switch (moda) {
        case MODA.JALAN:
          {
            const item = itemData as ProduksiJalan;
            const dataPantauFiltered = findDataPantau(
              dataPantau,
              item.id_lokasi
            );
            if (
              "jml_pnp_dtg" in item &&
              "jml_pnp_brgkt" in item &&
              "bus_dtg" in item &&
              "bus_brgkt" in item
            ) {
              resultData.push({
                locationName: dataPantauFiltered?.nama ?? "",
                idLokasi: item.id_lokasi,
                kodeLokasi: dataPantauFiltered?.kode_referensi ?? "",
                provinceName: dataPantauFiltered?.provinsi ?? "",
                cityName: dataPantauFiltered?.kota ?? "",
                date: date,
                arrival: parseNumber(item.jml_pnp_dtg),
                departure: parseNumber(item.jml_pnp_brgkt),
                vehicleArrival: parseNumber(item.bus_dtg),
                vehicleDeparture: parseNumber(item.bus_brgkt),
              });
            }
          }
          break;
        case MODA.ASDP:
          {
            const item = itemData as ProduksiAsdp;
            const dataPantauFiltered = findDataPantau(
              dataPantau,
              item.id_lokasi
            );
            if ("pnp" in item && "trip" in item) {
              resultData.push({
                locationName: dataPantauFiltered?.nama ?? "",
                idLokasi: item.id_lokasi,
                kodeLokasi: dataPantauFiltered?.kode_referensi ?? "",
                provinceName: dataPantauFiltered?.provinsi ?? "",
                cityName: dataPantauFiltered?.kota ?? "",
                date: date,
                arrival: 0,
                departure: parseNumber(item.pnp),
                vehicleArrival: 0,
                vehicleDeparture: parseNumber(item.trip),
              });
            }
          }
          break;
        case MODA.LAUT:
          {
            const item = itemData as ProduksiLaut;
            const dataPantauFiltered = findDataPantau(
              dataPantau,
              item.id_lokasi
            );
            if (
              "naik" in item &&
              "turun" in item &&
              "kapal_turun" in item &&
              "kapal_naik" in item
            ) {
              resultData.push({
                locationName: dataPantauFiltered?.nama ?? "",
                idLokasi: item.id_lokasi,
                kodeLokasi: dataPantauFiltered?.kode_referensi ?? "",
                provinceName: dataPantauFiltered?.provinsi ?? "",
                cityName: dataPantauFiltered?.kota ?? "",
                date: date,
                arrival: parseNumber(item.turun),
                departure: parseNumber(item.naik),
                vehicleArrival: parseNumber(item.kapal_turun),
                vehicleDeparture: parseNumber(item.kapal_naik),
              });
            }
          }
          break;
        case MODA.UDARA:
          {
            const item = itemData as ProduksiUdara;
            const dataPantauFiltered = findDataPantau(
              dataPantau,
              item.id_lokasi
            );
            if ("jml_pnp_brkt" in item && "jml_pnp_dtg" in item) {
              resultData.push({
                locationName: dataPantauFiltered?.nama ?? "",
                idLokasi: item.id_lokasi,
                kodeLokasi: dataPantauFiltered?.kode_referensi ?? "",
                provinceName: dataPantauFiltered?.provinsi ?? "",
                cityName: dataPantauFiltered?.kota ?? "",
                date: date,
                arrival: parseNumber(item.jml_pnp_dtg),
                departure: parseNumber(item.jml_pnp_brkt),
                vehicleArrival: parseNumber(item.jml_pswt_dtg),
                vehicleDeparture: parseNumber(item.jml_pswt_brkt),
              });
            }
          }
          break;
        case MODA.STASIUN:
          {
            const item = itemData as ProduksiStasiun;
            const dataPantauFiltered = findDataPantau(
              dataPantau,
              item.id_lokasi
            );
            if (
              "penumpang_berangkat_antarkota" in item &&
              "penumpang_datang_antarkota" in item &&
              "kereta_datang_antarkota" in item &&
              "kereta_berangkat_antarkota" in item
            ) {
              resultData.push({
                locationName: dataPantauFiltered?.nama ?? "",
                idLokasi: item.id_lokasi,
                kodeLokasi: dataPantauFiltered?.kode_referensi ?? "",
                provinceName: dataPantauFiltered?.provinsi ?? "",
                cityName: dataPantauFiltered?.kota ?? "",
                date: date,
                arrival: parseNumber(item.penumpang_datang_antarkota),
                departure: parseNumber(item.penumpang_berangkat_antarkota),
                vehicleArrival: parseNumber(item.kereta_datang_antarkota),
                vehicleDeparture: parseNumber(item.kereta_berangkat_antarkota),
              });
            }
          }
          break;
        case MODA.TOLL:
          {
            const item = itemData as ProduksiToll;
            const dataPantauFiltered = findDataPantau(
              dataPantau,
              item.id_lokasi
            );
            if ("jml_kendaraan" in item && "jml_kendaraan" in item) {
              resultData.push({
                locationName: dataPantauFiltered?.nama ?? "",
                idLokasi: item.id_lokasi,
                kodeLokasi: dataPantauFiltered?.kode_referensi ?? "",
                provinceName: dataPantauFiltered?.provinsi ?? "",
                cityName: dataPantauFiltered?.kota ?? "",
                date: date,
                arrival: 0,
                departure: 0,
                vehicleArrival: parseNumber(item.jml_kendaraan),
                vehicleDeparture: parseNumber(item.jml_kendaraan),
              });
            }
          }
          break;
        case MODA.ARTERI:
          {
            const item = itemData as ProduksiArteri;
            const dataPantauFiltered = findDataPantau(
              dataPantau,
              item.id_lokasi
            );
            if ("jml_kendaraan" in item && "jml_kendaraan" in item) {
              resultData.push({
                locationName: dataPantauFiltered?.nama ?? "",
                idLokasi: item.id_lokasi,
                kodeLokasi: dataPantauFiltered?.kode_referensi ?? "",
                provinceName: dataPantauFiltered?.provinsi ?? "",
                cityName: dataPantauFiltered?.kota ?? "",
                date: date,
                arrival: 0,
                departure: 0,
                vehicleArrival: parseNumber(item.jml_kendaraan),
                vehicleDeparture: parseNumber(item.jml_kendaraan),
              });
            }
          }
          break;
        default:
          break;
      }
    }
  }

  return resultData;
}

export { mobillityPointByDate };
