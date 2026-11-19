import fs from "fs-extra";
import path from "path";
import crypto from "crypto";
import { config } from "@/config";

const CACHE_DIR = path.join(__dirname, config.cacheDir);
const CACHE_TTL = config.cacheTtl;

fs.ensureDirSync(CACHE_DIR);

export const getCacheFilePath = (body: object, key: string) => {
  const cacheKey = `${key}_${JSON.stringify(body)}`;
  const hash = crypto.createHash("md5").update(cacheKey).digest("hex");
  return path.join(CACHE_DIR, `${hash}.json`);
};

export const isCacheValid = (filePath: string) => {
  if (!fs.existsSync(filePath)) return false;

  const fileAge = (Date.now() - fs.statSync(filePath).mtimeMs) / 1000;
  if (fileAge >= CACHE_TTL) {
    fs.unlinkSync(filePath);
    return false;
  }
  return true;
};

export const saveToCache = (filePath: string, data: any) =>
  fs
    .writeJson(filePath, data)
    .catch((err) => console.error("Cache save failed:", err));

export const hasValidDataStrategi = (results: any) =>
  Object.values(results?.data?.result || {}).some(
    (result: any) =>
      result?.data_pantau?.data ||
      result?.data_produksi?.data ||
      result?.data_produksi_pertitik?.data
  );

export const hasValidData = (results: any) => results.data.length > 0;
