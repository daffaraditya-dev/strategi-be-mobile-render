import express from "express";
import { verifyToken } from "../middlewares/jwtToken";
import { cacheOnlyForGet, clearCacheMiddleware } from "../middlewares/cache";
import { getReportsHandler } from "../handlers/report/getReport";
import { createReportHandler } from "../handlers/report/createReport";
import upload from "../middlewares/upload";
import { createReportWeatherHandler } from "../handlers/report/createReportWeather";
import { createReportAccidentHandler } from "../handlers/report/createReportAccident";
import { getDetailReportHandler } from "../handlers/report/getDetailReport";
import { updateReportHandler } from "../handlers/report/updateReport";
import { deleteReportHandler } from "../handlers/report/deleteReport";
import { getReportAccidentHandler } from "../handlers/report/getReportAccident";
import { getReportWeatherHandler } from "../handlers/report/getReportWeather";
import { approveReportHandler } from "../handlers/report/approveReport";
import { rejectReportHandler } from "../handlers/report/rejectReport";
import { getApprovalReportsHandler } from "../handlers/report/getApprovalReport";

const router = express.Router();

router.get("", verifyToken, cacheOnlyForGet, getReportsHandler);
router.get(
  "/approval",
  verifyToken,
  cacheOnlyForGet,
  getApprovalReportsHandler
);
router.post(
  "",
  verifyToken,
  clearCacheMiddleware,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createReportHandler
);

router.post(
  "/:idLaporanPantau/kecelakaan",
  verifyToken,
  clearCacheMiddleware,
  createReportAccidentHandler
);
router.post(
  "/:idLaporanPantau/cuaca",
  verifyToken,
  clearCacheMiddleware,
  createReportWeatherHandler
);
router.post(
  "/:id/approve",
  verifyToken,
  clearCacheMiddleware,
  approveReportHandler
);
router.post(
  "/:id/reject",
  verifyToken,
  clearCacheMiddleware,
  rejectReportHandler
);

router.get("/:idLaporanPantau/kecelakaan", getReportAccidentHandler);
router.get("/:idLaporanPantau/cuaca", getReportWeatherHandler);

router.get("/:id", verifyToken, cacheOnlyForGet, getDetailReportHandler);
router.put(
  "/:id",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateReportHandler
);
router.delete("/:id", deleteReportHandler);

export default router;
