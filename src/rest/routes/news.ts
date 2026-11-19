import express from "express";
import { rssHandler } from "../handlers/news/rss";
import { cacheOnlyForGet } from "../middlewares/cache";

const router = express.Router();

router.get("/rss", cacheOnlyForGet, rssHandler);

export default router;
