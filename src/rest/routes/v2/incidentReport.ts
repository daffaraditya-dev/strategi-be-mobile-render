import express from "express";
// import { verifyToken } from "../middlewares/jwtToken";
// import { cacheOnlyForGet } from "../middlewares/cache";
// import { cacheOnlyForPost } from "../../middlewares/cache";
import { getIncidentReportV2Handler } from "@/rest/handlers/v2/incidentReport/getIncidentReportV2";
import { cacheOnlyForGet, cacheOnlyForPost } from "@/rest/middlewares/cache";
import { getByIDIncidentReportHandler } from "@/rest/handlers/v2/incidentReport/getByIDIncidentReportV2";
import { getTindakLanjut } from "@/rest/handlers/v2/incidentReport/getTindakLanjut";
import { putApproveIncidentReportV2Handler } from "../../handlers/v2/incidentReport/approveIncidentReportV2";
import { verifyToken } from "@/rest/middlewares/jwtToken";
import { cache } from "joi";
import { putApproveTindakLanjutHandler } from "../../handlers/v2/incidentReport/approveTindakLanjut";
import {
  createIncidentReportHandler,
  CreateTindakLanjutHandler,
} from "../../handlers/v2/incidentReport/incidentReportV2";
import { createTindakLanjut } from "@/rest/handlers/v2/incidentReport/services/incidentReport.service";

const router = express.Router();

router.post(
  "/",
  // cacheOnlyForPost,
  getIncidentReportV2Handler,
);
router.get(
  "/:id",
  // cacheOnlyForGet,
  getByIDIncidentReportHandler,
);
router.put(
  "/approve/:id",
  verifyToken,
  // cacheOnlyForGet,
  putApproveIncidentReportV2Handler,
);
router.get(
  "/tindak-lanjut/:idLaporanKejadian",
  // cacheOnlyForGet,
  getTindakLanjut,
);
router.put(
  "/approve-tindak-lanjut/:id",
  verifyToken,
  // cacheOnlyForGet,
  putApproveTindakLanjutHandler,
);
router.post("/create/", verifyToken, createIncidentReportHandler);
router.post("/tindak-lanjut/create", verifyToken, CreateTindakLanjutHandler);

export default router;
