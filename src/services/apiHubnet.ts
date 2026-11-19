import fs from "fs-extra";
import { request } from "@/utils/axios";
import {
  EventResponse,
  PantauProduksiRutinParams,
  PantauProduksiSeasonalParams,
  ProvinceResponse,
  ResponseDataSiasatiStrategi,
} from "./type/apiHubnet";
import { config } from "@/config";
import {
  getCacheFilePath,
  hasValidDataStrategi,
  isCacheValid,
  saveToCache,
} from "@/utils/cache";
import { Moda } from "@/type/produksi.titik.type";

export const getDataPantauProduksiSeasonal = async (
  body: PantauProduksiSeasonalParams
) => {
  const cacheFile = getCacheFilePath(body, "getDataPantauProduksiSeasonal");

  if (isCacheValid(cacheFile)) {
    return fs.readJson(cacheFile);
  }

  let attempts = 0;
  let result: ResponseDataSiasatiStrategi | null = null;

  while (attempts < 3) {
    attempts++;
    result = await request<ResponseDataSiasatiStrategi>({
      method: "post",
      url: `${config.hubnetApiUrl}/data-pantau-produksi-seasonal`,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (hasValidDataStrategi(result)) {
      saveToCache(cacheFile, result);
      return result;
    }

    if (attempts < 3) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return result;
};

export const getDataPantauProduksiRutin = async (
  body: PantauProduksiRutinParams
) => {
  const cacheFile = getCacheFilePath(body, "getDataPantauProduksiRutin");

  if (isCacheValid(cacheFile)) {
    return fs.readJson(cacheFile);
  }

  let attempts = 0;
  let result: ResponseDataSiasatiStrategi | null = null;

  while (attempts < 3) {
    attempts++;
    result = await request<ResponseDataSiasatiStrategi>({
      method: "post",
      url: `${config.hubnetApiUrl}/data-pantau-produksi-rutin`,
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (hasValidDataStrategi(result)) {
      saveToCache(cacheFile, result);
      return result;
    }

    if (attempts < 3) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return result;
};

export const getMasterProvinsi = async () => {
  const result = await request<ProvinceResponse>({
    method: "post",
    url: `${config.hubnetApiUrl}/master-provinsi`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return result;
};

export const getDataEvent = async (): Promise<EventResponse> => {
  const cacheFile = getCacheFilePath({}, "getDataEvent");

  if (isCacheValid(cacheFile)) {
    return fs.readJson(cacheFile);
  }

  const result = await request<EventResponse>({
    method: "post",
    url: `${config.hubnetApiUrl}/data-event`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (hasValidDataStrategi(result)) {
    saveToCache(cacheFile, result);
    return result;
  }

  return result;
};

export const getDataEventModa = async (moda: Moda): Promise<EventResponse> => {
  const cacheFile = getCacheFilePath({}, "getDataEventModa");

  if (isCacheValid(cacheFile)) {
    return fs.readJson(cacheFile);
  }

  const result = await request<EventResponse>({
    method: "post",
    url: `${config.hubnetApiUrl}/data-event/${moda}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (hasValidDataStrategi(result)) {
    saveToCache(cacheFile, result);
    return result;
  }

  return result;
};

