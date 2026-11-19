import {
  ProduksiPertitik,
  ResponseDataSiasatiStrategi,
  TitikPantau,
  TitikPantauData,
} from "@/services/type/apiHubnet";
import {
  getArrivalKey,
  getDepartureKey,
  getVehicleArrivalKey,
  getVehicleDepartureKey,
  sumValue,
} from "./common";
import { RegionalListData } from "../handlers/moda/type/common";

interface itemData {
  id_lokasi: string | number;
}

export const mapRegionNodeModa = (
  response: ResponseDataSiasatiStrategi,
  moda: string,
  type: string,
  provinceName?: string
) => {
  if (!response.data?.result) {
    return [];
  }

  const modaData: RegionalListData[] = [];

  for (const result of Object.values(response.data.result)) {
    if (!result?.data_produksi?.data) {
      continue;
    }

    const data = result.data_produksi_pertitik?.data
      ? result.data_produksi_pertitik?.data[moda as keyof ProduksiPertitik]
      : [];

    const dataPantau = result.data_pantau?.data[moda as keyof TitikPantau];

    const departureKeys = getDepartureKey(moda);
    const arrivalKeys = getArrivalKey(moda);
    const vehicleDepartureKeys = getVehicleDepartureKey(moda);
    const vehicleArrivalKeys = getVehicleArrivalKey(moda);
    const dataMap = data
      ?.map((item) => {
        const idLocation = (item as itemData).id_lokasi;
        const matchedPantau: TitikPantauData | undefined = dataPantau?.find(
          (itemPantau) =>
            itemPantau.id_lokasi?.toString() === idLocation?.toString()
        );

        if (type && matchedPantau?.tipe !== type) return null;
        if (
          provinceName &&
          matchedPantau?.provinsi !== provinceName &&
          matchedPantau?.provinsi?.toLowerCase() !==
            provinceName?.toLowerCase().replace("d.i ", "")
        )
          return null;

        return {
          idLocation,
          name: matchedPantau?.nama || "",
          city: matchedPantau?.kota || "",
          type: matchedPantau?.tipe || "",
          departure: sumValue(item as Record<string, any>, departureKeys) || 0,
          arrival: sumValue(item as Record<string, any>, arrivalKeys) || 0,
          vehicleDeparture:
            sumValue(item as Record<string, any>, vehicleDepartureKeys) || 0,
          vehicleArrival:
            sumValue(item as Record<string, any>, vehicleArrivalKeys) || 0,
          longitude: matchedPantau?.longitude || "",
          latitude: matchedPantau?.latitude || "",
          coordinate: matchedPantau?.koordinat || "",
          timezone: matchedPantau?.timezone || "",
        };
      })
      .filter((item): item is RegionalListData => item !== null);

    if (dataMap && dataMap.length > 0) {
      modaData.push(...dataMap);
    }
  }
  return Object.values(
    modaData.reduce<Record<string, RegionalListData>>(
      (
        acc,
        {
          idLocation,
          name,
          city,
          type,
          departure,
          arrival,
          vehicleDeparture,
          vehicleArrival,
          longitude,
          latitude,
          coordinate,
          timezone,
        }
      ) => {
        acc[idLocation] = acc[idLocation] || {
          idLocation,
          name,
          city,
          type,
          longitude,
          latitude,
          coordinate,
          timezone,
          departure: 0,
          arrival: 0,
          vehicleDeparture: 0,
          vehicleArrival: 0,
        };
        acc[idLocation].departure += departure;
        acc[idLocation].arrival += arrival;
        acc[idLocation].vehicleDeparture += vehicleDeparture;
        acc[idLocation].vehicleArrival += vehicleArrival;
        return acc;
      },
      {}
    )
  );
};
