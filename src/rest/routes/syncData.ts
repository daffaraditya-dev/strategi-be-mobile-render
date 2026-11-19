import express from "express";
import { syncMatrikHandler } from "../handlers/syncMatrik/syncMatrik";
import { syncProduksiHandler } from "../handlers/syncProduksi/syncProduksi";
import { syncODHandler } from "../handlers/syncOD/syncOD";
import { syncOperatorHandler } from "../handlers/syncOperator/syncOperator";
import { syncJobsHandler } from "../handlers/syncJobs/syncJobs";

const router = express.Router();

router.post("/matrik", syncMatrikHandler);
router.post("/produksi", syncProduksiHandler);
router.post("/od", syncODHandler);
router.post("/operator", syncOperatorHandler);
router.post("/job", syncJobsHandler);

export default router;
