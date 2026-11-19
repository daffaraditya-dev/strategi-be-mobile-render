import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { buildMemoryStorage, setupCache } from "axios-cache-interceptor";
import logger from "./logger";

// Create a cached Axios instance
const cachedAxios = setupCache(axios, {
  storage: buildMemoryStorage(
    /* cloneData default=*/ false,
    300000, // 5 minutes default
    /* maxEntries default=*/ false
  ),
});

// Enum for HTTP methods
export interface Payload {
  method: "get" | "post" | "put" | "delete";
  url: string;
  headers?: Record<string, string>;
  body?: any;
  cache?: boolean; // Optional flag to enable/disable caching
  auth?: any;
}

export async function request<T>(payload: Payload): Promise<T> {
  const { method, url, headers, body, cache = true, auth } = payload;
  const axiosConfig: AxiosRequestConfig = {
    method,
    url,
    headers,
    data: body,
    // timeout: 180000, // 180 seconds
    timeout: 360000, // 180 seconds
    auth,
  };

  try {
    const response: AxiosResponse = await (cache
      ? cachedAxios(axiosConfig)
      : axios(axiosConfig));

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    logger.error("Error:", error);
    throw error;
  }
}
