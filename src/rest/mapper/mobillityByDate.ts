import { ResponseDataSiasatiStrategi } from "@/services/type/apiHubnet";
import { parseNumber } from "../../utils/number";
import { DataRangeItem } from "./mapDataByDateRange";
import { MODA } from "@/constants/moda";

function mobillityByDate(
  response: ResponseDataSiasatiStrategi,
  moda: string,
  isSeasonal: boolean = false
): DataRangeItem[] {
  if (!response.data?.result) {
    return [];
  }

  let resultData: DataRangeItem[] = [];

  for (const result of Object.values(response.data.result)) {
    if (!result?.data_produksi?.data) {
      continue;
    }

    let data = result.data_produksi.data;
    const modeData = data[moda as keyof typeof data];

    if (!modeData) continue;

    let eventDate = new Map();
    if (isSeasonal) {
      eventDate = new Map(
        data.tanggal_event.map((it) => [it.tanggal, it.label])
      );
    }

    for (const item of modeData) {
      let date = "";
      if ("tanggal" in item) {
        date = isSeasonal ? eventDate.get(item.tanggal) || "" : item.tanggal;
      }

      if (isSeasonal && "tanggal" in item) {
        const currentDate = new Date();
        if (new Date(item?.tanggal) > currentDate) continue;
      }

      switch (moda) {
        case MODA.JALAN:
          if (
            "tanggal" in item &&
            "jml_pnp_dtg" in item &&
            "jml_pnp_brgkt" in item &&
            "bus_dtg" in item &&
            "bus_brgkt" in item
          ) {
            resultData.push({
              date: date,
              arrival: parseNumber(item.jml_pnp_dtg),
              departure: parseNumber(item.jml_pnp_brgkt),
              vehicleArrival: parseNumber(item.bus_dtg),
              vehicleDeparture: parseNumber(item.bus_brgkt),
            });
          }
          break;
        case MODA.ASDP:
          if ("tanggal" in item && "pnp" in item && "trip" in item) {
            resultData.push({
              date: date,
              arrival: 0,
              departure: parseNumber(item.pnp),
              vehicleArrival: 0,
              vehicleDeparture: parseNumber(item.trip),
            });
          }
          break;
        case MODA.LAUT:
          if (
            "tanggal" in item &&
            "naik" in item &&
            "turun" in item &&
            "kapal_turun" in item &&
            "kapal_naik" in item
          ) {
            resultData.push({
              date: date,
              arrival: parseNumber(item.turun),
              departure: parseNumber(item.naik),
              vehicleArrival: parseNumber(item.kapal_turun),
              vehicleDeparture: parseNumber(item.kapal_naik),
            });
          }
          break;
        case MODA.UDARA:
          if (
            "tanggal" in item &&
            "jml_pnp_brkt" in item &&
            "jml_pnp_dtg" in item
          ) {
            resultData.push({
              date: date,
              arrival: parseNumber(item.jml_pnp_dtg),
              departure: parseNumber(item.jml_pnp_brkt),
              vehicleArrival: parseNumber(item.jml_pswt_dtg),
              vehicleDeparture: parseNumber(item.jml_pswt_brkt),
            });
          }
          break;
        case MODA.STASIUN:
          if (
            "tanggal" in item &&
            "penumpang_berangkat_antarkota" in item &&
            "penumpang_datang_antarkota" in item &&
            "kereta_datang_antarkota" in item &&
            "kereta_berangkat_antarkota" in item
          ) {
            resultData.push({
              date: date,
              arrival: parseNumber(item.penumpang_datang_antarkota),
              departure: parseNumber(item.penumpang_berangkat_antarkota),
              vehicleArrival: parseNumber(item.kereta_datang_antarkota),
              vehicleDeparture: parseNumber(item.kereta_berangkat_antarkota),
            });
          }
          break;
        case MODA.TOLL:
          if (
            "tanggal" in item &&
            "jml_ke_jkt" in item &&
            "jml_dari_jkt" in item
          ) {
            resultData.push({
              date: date,
              arrival: 0,
              departure: 0,
              vehicleArrival: parseNumber(item.jml_ke_jkt),
              vehicleDeparture: parseNumber(item.jml_dari_jkt),
            });
          }
          break;
        case MODA.ARTERI:
          if (
            "tanggal" in item &&
            "jml_ke_jkt" in item &&
            "jml_dari_jkt" in item
          ) {
            resultData.push({
              date: date,
              arrival: 0,
              departure: 0,
              vehicleArrival: parseNumber(item.jml_ke_jkt),
              vehicleDeparture: parseNumber(item.jml_dari_jkt),
            });
          }
          break;
        default:
          break;
      }
    }
  }

  return resultData;
}

export { mobillityByDate };
