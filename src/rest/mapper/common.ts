import { MODA } from "@/constants/moda";
import {
  ResponseDataSiasatiStrategi,
  TitikPantauData,
} from "@/services/type/apiHubnet";

export const sumValue = (item: Record<string, any>, keys: string[]) => {
  return keys.reduce((acc, key) => {
    return acc + Number(item[key] || 0);
  }, 0);
};

export const getDepartureKey = (moda: string, inter: boolean = false) => {
  switch (moda) {
    case MODA.JALAN:
      return ["jml_pnp_brgkt"];
    case MODA.ASDP:
      return ["pnp"];
    case MODA.LAUT:
      return ["naik"];
    case MODA.UDARA:
      if (inter) {
        return ["jml_pnp_brkt_intl"];
      }
      return ["jml_pnp_brkt"];
    case MODA.STASIUN:
      return ["penumpang_berangkat_antarkota"];
    case MODA.TOLL:
      return [""];
    case MODA.ARTERI:
      return [""];
    default:
      return ["jml_pnp_brgkt"];
  }
};

export const getArrivalKey = (moda: string, inter: boolean = false) => {
  switch (moda) {
    case MODA.JALAN:
      return ["jml_pnp_dtg"];
    case MODA.ASDP:
      return ["pnp"];
    case MODA.LAUT:
      return ["turun"];
    case MODA.UDARA:
      if (inter) {
        return ["jml_pnp_dtg_intl"];
      }
      return ["jml_pnp_dtg"];
    case MODA.STASIUN:
      return ["penumpang_datang_antarkota"];
    case MODA.TOLL:
      return [""];
    case MODA.ARTERI:
      return [""];
    default:
      return ["jml_pnp_dtg"];
  }
};

export const getVehicleDepartureKey = (
  moda: string,
  inter: boolean = false
) => {
  switch (moda) {
    case MODA.JALAN:
      return ["bus_brgkt"];
    case MODA.ASDP:
      return ["trip"];
    case MODA.LAUT:
      return ["kapal_naik"];
    case MODA.UDARA:
      if (inter) {
        return ["jml_pswt_brkt_intl"];
      }
      return ["jml_pswt_brkt"];
    case MODA.STASIUN:
      return ["kereta_berangkat_antarkota"];
    case MODA.TOLL:
      return ["jml_kendaraan"];
    case MODA.ARTERI:
      return ["jml_dari_jkt"];
    default:
      return ["jml_pnp_brgkt"];
  }
};

export const getVehicleArrivalKey = (moda: string, inter: boolean = false) => {
  switch (moda) {
    case MODA.JALAN:
      return ["bus_dtg"];
    case MODA.ASDP:
      return ["trip"];
    case MODA.LAUT:
      return ["kapal_turun"];
    case MODA.UDARA:
      if (inter) {
        return ["jml_pswt_dtg_intl"];
      }
      return ["jml_pswt_dtg"];
    case MODA.STASIUN:
      return ["kereta_datang_antarkota"];
    case MODA.TOLL:
      return ["jml_kendaraan"];
    case MODA.ARTERI:
      return ["jml_ke_jkt"];
    default:
      return ["jml_pnp_dtg"];
  }
};

export const findDataPantau = (
  dataPantau: TitikPantauData[],
  idLocation: string | number
): TitikPantauData | undefined => {
  return dataPantau?.find(
    (itemPantau) => itemPantau.id_lokasi?.toString() == idLocation?.toString()
  );
};

export const mapDataSeasonal = (
  event: number,
  response: ResponseDataSiasatiStrategi
) => {
  response.data.result = response.data.result || {};

  if (response.data.result[`${event}::${event}`]) {
    response.data.result = {
      [`${event}::${event}`]: response.data.result[`${event}::${event}`],
    };
  } else {
    response.data.result = {};
  }

  return response;
};
