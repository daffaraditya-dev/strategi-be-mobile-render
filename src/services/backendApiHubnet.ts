import fs from "fs-extra";
import { config } from "@/config";
import { request } from "@/utils/axios";
import {
  ResponseDataCctv,
  ResponseDataSailingDomesticInternational,
  ResponseDataTopDestinationASDPTransportation,
  ResponseDataTopDestinationSeaTransportation,
  SailingDomesticInternationalParams,
  ResponseDataTopDestinationTrainTransportation,
  TopDestinationTrainTransportationParams,
  TopDestinationASDPTransportationParams,
  TopDestinationSeaTransportationParams,
  ResponseDataTopDestinationAirTransportation,
  TopDestinationAirTransportationParams,
  OperatorRoutineParams,
  ResponseDataTrainOperator,
  ResponseDataPerformanceReport,
  PerformanceReportParams,
  ResponseDataTollOperator,
  ResponseDataAirlineOperator,
  MovementDomesticInternationalParams,
  ResponseMovementDomesticInternational,
  ResponseDataPantau,
  ResponseDataSailingOperator,
  ResponseDataCrossingOperator,
  ResponseWeatherAPI,
  ResponseDataWeather,
  WeatherLocationParams,
  ResponseDataTopDestinationTransportation,
  TopDestinationTransportationParams,
} from "./type/backendApiHubnet";
import { MODA } from "@/constants/moda";
import {
  getCacheFilePath,
  hasValidData,
  isCacheValid,
  saveToCache,
} from "@/utils/cache";

export const getDataCctv = async () => {
  const result = await request<ResponseDataCctv>({
    method: "post",
    url: `${config.hubnetBackendApiUrl}/cctv/get-list`,
    headers: {
      Authorization: `Basic ${config.hubnetBackendApiKey}`,
    },
  });

  return result;
};

export const getDataSailingDomesticInternational = async (
  body: SailingDomesticInternationalParams
) => {
  const result = await request<ResponseDataSailingDomesticInternational>({
    method: "post",
    url: `${config.hubnetBackendApiUrl}/datalake/pelayaran-domestik-internasional`,
    headers: {
      Authorization: `Basic ${config.hubnetBackendApiKey}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  return result;
};

// ASDP is penyebrangan
export const getTopDestinationASDPTransportation = async (
  body: TopDestinationASDPTransportationParams
) => {
  const result = await request<ResponseDataTopDestinationASDPTransportation>({
    method: "post",
    url: `${config.hubnetBackendApiUrl}/datalake/top-destination-angkutan-penyeberangan`,
    headers: {
      Authorization: `Basic ${config.hubnetBackendApiKey}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  return result;
};

export const getTopDestinationTrainTransportation = async (
  body: TopDestinationTrainTransportationParams
) => {
  const result = await request<ResponseDataTopDestinationTrainTransportation>({
    method: "post",
    url: `${config.hubnetBackendApiUrl}/datalake/top-destination-angkutan-perkeretaapian`,
    headers: {
      Authorization: `Basic ${config.hubnetBackendApiKey}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  return result;
};

export const getTopDestinationSeaTransportation = async (
  body: TopDestinationSeaTransportationParams
) => {
  const result = await request<ResponseDataTopDestinationSeaTransportation>({
    method: "post",
    url: `${config.hubnetBackendApiUrl}/datalake/top-destination-angkutan-laut`,
    headers: {
      Authorization: `Basic ${config.hubnetBackendApiKey}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  return result;
};

export const getTopDestinationLandTransportation = async (
  body: TopDestinationTransportationParams

) => {
  const result = await request<ResponseDataTopDestinationTransportation>({
    method: "post",
    url: `${config.hubnetBackendApiUrl}/datalake/top-destination-angkutan-jalan`,
    headers: {
      Authorization: `Basic ${config.hubnetBackendApiKey}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  return result;
};

export const getTopDestinationAirTransportation = async (
  body: TopDestinationAirTransportationParams
) => {
  const result = await request<ResponseDataTopDestinationAirTransportation>({
    method: "post",
    url: `${config.hubnetBackendApiUrl}/datalake/top-destination-angkutan-udara`,
    headers: {
      Authorization: `Basic ${config.hubnetBackendApiKey}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  return result;
};

export const getPerformanceReport = async (
  body: PerformanceReportParams,
  moda: string
) => {
  let utlPath;
  switch (moda) {
    case MODA.UDARA:
      utlPath = "kinerja-operator-bandara";
      break;
    case MODA.STASIUN:
      utlPath = "kinerja-ka";
      break;
    case MODA.LAUT:
      utlPath = "kinerja-laut-pelabuhan";
      break;
    case MODA.ASDP:
      utlPath = "kinerja-penyeberangan";
      break;
    default:
      // default MODA.JALAN
      utlPath = "kinerja-angkutan-jalan-terminal";
      break;
  }

  const cacheFile = getCacheFilePath(body, "getPerformanceReport" + moda);

  if (isCacheValid(cacheFile)) {
    return fs.readJson(cacheFile);
  }

  const result = await request<ResponseDataPerformanceReport>({
    method: "post",
    url: `${config.hubnetBackendApiUrl}/datalake/${utlPath}`,
    headers: {
      Authorization: `Basic ${config.hubnetBackendApiKey}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (hasValidData(result)) {
    saveToCache(cacheFile, result);
  }

  return result;
};

export const getTrainOperators = async (body: OperatorRoutineParams) => {
  const cacheFile = getCacheFilePath(body, "getTrainOperators");

  if (isCacheValid(cacheFile)) {
    return fs.readJson(cacheFile);
  }

  const result = await request<ResponseDataTrainOperator>({
    method: "post",
    url: `${config.hubnetBackendApiUrl}/datalake/operator-perkeretaapian`,
    headers: {
      Authorization: `Basic ${config.hubnetBackendApiKey}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (hasValidData(result)) {
    saveToCache(cacheFile, result);
  }

  return result;
};

export const getTollOperators = async (body: OperatorRoutineParams) => {
  const cacheFile = getCacheFilePath(body, "getTollOperators");

  if (isCacheValid(cacheFile)) {
    return fs.readJson(cacheFile);
  }

  const result = await request<ResponseDataTollOperator>({
    method: "post",
    url: `${config.hubnetBackendApiUrl}/datalake/operator-jalan-tol`,
    headers: {
      Authorization: `Basic ${config.hubnetBackendApiKey}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (hasValidData(result)) {
    saveToCache(cacheFile, result);
  }

  return result;
};

export const getAirlineOperators = async (body: OperatorRoutineParams) => {
  const cacheFile = getCacheFilePath(body, "getAirlineOperators");

  if (isCacheValid(cacheFile)) {
    return fs.readJson(cacheFile);
  }

  const result = await request<ResponseDataAirlineOperator>({
    method: "post",
    url: `${config.hubnetBackendApiUrl}/datalake/operator-maskapai-penerbangan`,
    headers: {
      Authorization: `Basic ${config.hubnetBackendApiKey}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (hasValidData(result)) {
    saveToCache(cacheFile, result);
  }

  return result;
};

export const getSailingOperators = async (body: OperatorRoutineParams) => {
  const cacheFile = getCacheFilePath(body, "getSailingOperators");

  if (isCacheValid(cacheFile)) {
    return fs.readJson(cacheFile);
  }

  const result = await request<ResponseDataSailingOperator>({
    method: "post",
    url: `${config.hubnetBackendApiUrl}/datalake/operator-laut`,
    headers: {
      Authorization: `Basic ${config.hubnetBackendApiKey}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (hasValidData(result)) {
    saveToCache(cacheFile, result);
  }

  return result;
};

export const getCrossingOperators = async (body: OperatorRoutineParams) => {
  const cacheFile = getCacheFilePath(body, "getCrossingOperators");

  if (isCacheValid(cacheFile)) {
    return fs.readJson(cacheFile);
  }

  const result = await request<ResponseDataCrossingOperator>({
    method: "post",
    url: `${config.hubnetBackendApiUrl}/datalake/operator-penyeberangan`,
    headers: {
      Authorization: `Basic ${config.hubnetBackendApiKey}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (hasValidData(result)) {
    saveToCache(cacheFile, result);
  }

  return result;
};

export const getMovementDomesticInternational = async (
  query: MovementDomesticInternationalParams
) => {
  const cacheFile = getCacheFilePath(query, "getMovementDomesticInternational");

  if (isCacheValid(cacheFile)) {
    return fs.readJson(cacheFile);
  }

  const result = await request<ResponseMovementDomesticInternational>({
    method: "post",
    url: `${config.hubnetBackendApiUrl}/siasati/pergerakan-domestik-internasional?tanggal_awal=${query.tanggal_awal}&tanggal_akhir=${query.tanggal_akhir}`,
    headers: {
      Authorization: `Basic ${config.hubnetBackendApiKey}`,
      "Content-Type": "application/json",
    },
  });

  if (hasValidData(result)) {
    saveToCache(cacheFile, result);
  }

  return result;
};

export const getDataPantau = async () => {
  const cacheFile = getCacheFilePath({}, "getDataPantau");

  if (isCacheValid(cacheFile)) {
    return fs.readJson(cacheFile);
  }

  const result = await request<ResponseDataPantau>({
    method: "post",
    url: `${config.hubnetBackendApiUrl}/siasati/data-pantau`,
    headers: {
      Authorization: `Basic ${config.hubnetBackendApiKey}`,
      "Content-Type": "application/json",
    },
  });

  if (hasValidData(result)) {
    saveToCache(cacheFile, result);
  }

  return result;
};

export const getWeatherLocation = async (body: WeatherLocationParams) => {
  const cacheFile = getCacheFilePath(body, "getWeatherLocation");

  if (isCacheValid(cacheFile)) {
    return fs.readJson(cacheFile);
  }

  const result = await request<ResponseDataWeather>({
    method: "post",
    url: `${config.hubnetBackendApiUrl}/bmkg/prakiraan-cuaca-wilayah`,
    headers: {
      Authorization: `Basic ${config.hubnetBackendApiKey}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (hasValidData(result)) {
    saveToCache(cacheFile, result);
  }

  return result;
};
