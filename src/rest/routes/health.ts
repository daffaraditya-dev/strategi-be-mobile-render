import express from "express";
import { healthHandler } from "../handlers/health";

const router = express.Router();

router.get("", healthHandler);

export default router;
