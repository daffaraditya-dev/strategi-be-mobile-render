import { getCacheFilePath, hasValidDataStrategi, isCacheValid, saveToCache } from "@/utils/cache";
import fs from "fs-extra";
import { config } from "@/config";
import { ProduksiPertitik } from "@/type/produksi.titik.type";
import { request } from "@/utils/axios";
import { TitikPantau } from "@/type/titik.pantau.type";
import { Produksi } from "@/type/produksi.type";

interface ResposeDataSiasatiProduksiPertitik {
  status: boolean;
  data: ProduksiPertitik;
  message: string;
}
interface ResposeDataSiasatiProduksi {
  status: boolean;
  data: Produksi;
  message: string;
}

interface ResposeDataPantau {
  status: boolean;
  data: TitikPantau;
  message: string;
}

export interface Payload {
  event_pantau: number;
  event: number;
  start_date: string;
  end_date: string;
  provinsi: string;
  moda: string;
}


export const getSiasatiProduksiPertitik = async (
  body: Payload
) => {
  const cacheFile = getCacheFilePath(body, "siasatiProduksiPertitik");

  if (isCacheValid(cacheFile)) {
    return fs.readJson(cacheFile);
  }

  let attempts = 0;
  let result: ResposeDataSiasatiProduksiPertitik | null = null;

  while (attempts < 3) {
    attempts++;
    result = await request<ResposeDataSiasatiProduksiPertitik>({
      method: "post",
      url: `${config.hubnetBackendApiUrl}/siasati/data-produksi-pertitik`,
      headers: { "Content-Type": "application/json" },
      body,
      auth: {
        username: "strategihub",
        password: "skdio349asewkpse",
      },

    });

    if (hasValidDataStrategi(result)) {
      saveToCache(cacheFile, result);
      return result.data;
    }

    if (attempts < 3) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return result?.data;
};

export const getSiasatiDataPantau = async (
  body: Payload
) => {
  const cacheFile = getCacheFilePath(body, "siasatiDataPantau");

  if (isCacheValid(cacheFile)) {
    return fs.readJson(cacheFile);
  }

  let attempts = 0;
  let result: ResposeDataPantau | null = null;

  while (attempts < 3) {
    attempts++;
    result = await request<ResposeDataPantau>({
      method: "post",
      url: `${config.hubnetBackendApiUrl}/siasati/data-pantau`,
      headers: { "Content-Type": "application/json" },
      body,
      auth: {
        username: "strategihub",
        password: "skdio349asewkpse",
      },

    });

    if (hasValidDataStrategi(result)) {
      saveToCache(cacheFile, result);
      return result.data;
    }

    if (attempts < 3) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return result?.data;
};

export const getSiasatiProduksi = async (
  body: Payload
) => {
  const cacheFile = getCacheFilePath(body, "siasatiProduksi");

  if (isCacheValid(cacheFile)) {
    return fs.readJson(cacheFile);
  }

  let attempts = 0;
  let result: ResposeDataSiasatiProduksi | null = null;

  while (attempts < 3) {
    attempts++;
    result = await request<ResposeDataSiasatiProduksi>({
      method: "post",
      url: `${config.hubnetBackendApiUrl}/siasati/data-produksi-moda`,
      headers: { "Content-Type": "application/json" },
      body,
      auth: {
        username: "strategihub",
        password: "skdio349asewkpse",
      },

    });

    if (hasValidDataStrategi(result)) {
      saveToCache(cacheFile, result);
      return result.data;
    }

    if (attempts < 3) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return result?.data;
};
