import express from "express";
import { verifyToken } from "../middlewares/jwtToken";
import { comparisonHandler } from "../handlers/comparison/comparison";
import { cacheOnlyForGet } from "../middlewares/cache";

const router = express.Router();

router.get("", verifyToken, cacheOnlyForGet, comparisonHandler);

export default router;
