import express from "express";
import { verifyToken } from "../middlewares/jwtToken";
import { createIncidentReportHandler } from "../handlers/incidentReport/createIncidentReport";
import { updateIncidentReportHandler } from "../handlers/incidentReport/updateIncidentReport";
import { getIncidentReportHandler } from "../handlers/incidentReport/getIncidentReport";
import { getDetailIncidentReportHandler } from "../handlers/incidentReport/getDetailIncidentReport";
import { deleteIncidentReportHandler } from "../handlers/incidentReport/deleteIncidentReport";
import upload from "../middlewares/upload";
import { cacheOnlyForGet, clearCacheMiddleware } from "../middlewares/cache";
import { approveIncidentReportHandler } from "../handlers/incidentReport/approveIncidentReport";
import { rejectIncidentReportHandler } from "../handlers/incidentReport/rejectIncidentReport";

const router = express.Router();

router.put(
  "/:id",
  verifyToken,
  clearCacheMiddleware,
  upload.array("dataPendukung", 5),
  updateIncidentReportHandler
);
router.get("", verifyToken, cacheOnlyForGet, getIncidentReportHandler);
router.get(
  "/:id",
  verifyToken,
  cacheOnlyForGet,
  getDetailIncidentReportHandler
);
router.delete(
  "/:id",
  verifyToken,
  clearCacheMiddleware,
  deleteIncidentReportHandler
);
router.post(
  "/:id/approve",
  verifyToken,
  clearCacheMiddleware,
  approveIncidentReportHandler
);
router.post(
  "/:id/reject",
  verifyToken,
  clearCacheMiddleware,
  rejectIncidentReportHandler
);
router.post(
  "",
  verifyToken,
  clearCacheMiddleware,
  upload.array("dataPendukung", 5),
  createIncidentReportHandler
);

export default router;
