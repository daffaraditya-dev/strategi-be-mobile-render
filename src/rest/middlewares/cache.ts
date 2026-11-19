import { NextFunction, Request, Response } from "express";
import apicache from "apicache";
import { config } from "@/config";

//configure apicache
export const cache = apicache.options({
  enabled: config.nodeEnv === "development" ? false : true,
  headers: {
    "cache-control": "no-cache",
  },
  statusCodes: {
    exclude: [], // list status codes to specifically exclude (e.g. [404, 403] cache all responses unless they had a 404 or 403 status)
    include: [200, 201], // list status codes to require (e.g. [200] caches ONLY responses with a success/200 code)
  },
  appendKey: (req, res) => {
    const authKey = req.headers["authorization"] || "";
    const queryKey = Object.keys(req.query)
      .sort()
      .map((key) => `${key}=${req.query[key]}`)
      .join("&");
    return `${authKey}-${queryKey}`;
  },
}).middleware;

const cachePost = apicache.options({
  enabled: config.nodeEnv === "development" ? false : true,
  headers: {
    "cache-control": "no-cache",
  },
  statusCodes: {
    exclude: [],
    include: [200, 201],
  },
  appendKey: (req, res) => {
    const authKey = req.headers["authorization"] || "";

    // Handle query string
    const queryKey = Object.keys(req.query)
      .sort()
      .map((key) => `${key}=${req.query[key]}`)
      .join("&");

    const bodyKey = JSON.stringify(req.body ?? {});

    return `${authKey}-${queryKey}-${bodyKey}`;
  },
}).middleware;


export const cacheOnlyForGet = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "GET") {
    return cache(config.cacheDuration)(req, res, next);
  }
  next();
};

export const cacheOnlyForPost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "POST") {
    return cachePost(config.cacheDuration)(req, res, next);
  }
  next();
};

export const clearCacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  apicache.clear();
  next();
};


export const clearCache = (keyCache: string) => {
  const index = apicache.getIndex();

  Object.keys(index).forEach(key => {
    if (key.includes(keyCache)) {
      apicache.clear(key);
    }
  });
};