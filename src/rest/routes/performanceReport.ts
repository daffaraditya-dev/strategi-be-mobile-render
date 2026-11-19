import express from "express";
import { verifyToken } from "../middlewares/jwtToken";
import { cacheOnlyForGet } from "../middlewares/cache";
import { performanceReportHandler } from "../handlers/performanceReport/performanceReport";

const router = express.Router();

router.get("", verifyToken, cacheOnlyForGet, performanceReportHandler);

export default router;
