import {
  ProduksiPertitik,
  ResponseDataSiasatiStrategi,
  TitikPantau,
} from "@/services/type/apiHubnet";
import { AggregateChartData } from "../handlers/moda/type/common";
import {
  getArrivalKey,
  getDepartureKey,
  getVehicleArrivalKey,
  getVehicleDepartureKey,
  sumValue,
} from "./common";
import { MODA } from "@/constants/moda";

export const mapHighestNodeModa = (
  response: ResponseDataSiasatiStrategi,
  moda: string,
  provinceName: string,
  inter: boolean = false
) => {
  if (!response.data?.result) {
    return [];
  }

  const modaData: AggregateChartData[] = [];

  for (const result of Object.values(response.data.result)) {
    const data =
      result.data_produksi_pertitik?.data[moda as keyof ProduksiPertitik];

    const dataPantau = result.data_pantau?.data[moda as keyof TitikPantau];

    const departureKeys = getDepartureKey(moda, inter);
    const arrivalKeys = getArrivalKey(moda, inter);
    const vehicleDepartureKeys = getVehicleDepartureKey(moda, inter);
    const vehicleArrivalKeys = getVehicleArrivalKey(moda, inter);
    const dataMap = data?.map((item: unknown) => ({
      idLocation: (item as { id_lokasi: number }).id_lokasi,
      date: (item as { tanggal: string }).tanggal,
      province:
        dataPantau?.filter(
          (itemPantau) =>
            itemPantau.id_lokasi?.toString() ==
            (item as { id_lokasi: number }).id_lokasi?.toString()
        )[0]?.provinsi || "",
      name:
        dataPantau?.filter(
          (itemPantau) =>
            itemPantau.id_lokasi?.toString() ==
            (item as { id_lokasi: number }).id_lokasi?.toString()
        )[0]?.nama || "",
      departure: sumValue(item as Record<string, any>, departureKeys) || 0,
      arrival: sumValue(item as Record<string, any>, arrivalKeys) || 0,
      vehicleDeparture:
        sumValue(item as Record<string, any>, vehicleDepartureKeys) || 0,
      vehicleArrival:
        sumValue(item as Record<string, any>, vehicleArrivalKeys) || 0,
    }));

    if (dataMap && dataMap.length > 0) {
      modaData.push(...dataMap);
    }
  }

  let filteredData = modaData.filter((item) => item.province != "");
  if (provinceName) {
    filteredData = modaData.filter((item) => item.province == provinceName);
  }

  const groupedData = filteredData.reduce<Record<number, AggregateChartData>>(
    (acc, item) => {
      // Check if the name already exists in the accumulator
      if (!acc[item.idLocation]) {
        acc[item.idLocation] = {
          date: item.date,
          idLocation: item.idLocation,
          province: item.province,
          name: item.name,
          departure: 0,
          arrival: 0,
          vehicleDeparture: 0,
          vehicleArrival: 0,
        };
      }

      // Sum each column
      acc[item.idLocation].departure += item.departure;
      acc[item.idLocation].arrival += item.arrival;
      acc[item.idLocation].vehicleDeparture += item.vehicleDeparture;
      acc[item.idLocation].vehicleArrival += item.vehicleArrival;

      return acc;
    },
    {}
  );

  let sortedDataA = Object.values(groupedData)
    .sort((a, b) => b.departure - a.departure)
    .slice(0, 10);
  let sortedDataB = Object.values(groupedData)
    .sort((a, b) => b.arrival - a.arrival)
    .slice(0, 10);
  if (moda == MODA.ARTERI || moda == MODA.TOLL || moda == MODA.TOLL_2) {
    sortedDataA = Object.values(groupedData)
      .sort((a, b) => b.vehicleDeparture - a.vehicleDeparture)
      .slice(0, 10);
    sortedDataB = Object.values(groupedData)
      .sort((a, b) => b.vehicleArrival - a.vehicleArrival)
      .slice(0, 10);
  }
  const merged = [...sortedDataA, ...sortedDataB];

  const seen = new Set();
  const result = merged.filter((item) => {
    if (!seen.has(item.idLocation)) {
      seen.add(item.idLocation);
      return true;
    }
    return false;
  });

  return result;
};
