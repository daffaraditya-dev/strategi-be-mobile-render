import express from "express";
import { verifyToken } from "../middlewares/jwtToken";
import { cctvHandler } from "../handlers/cctv/cctv";
import { cacheOnlyForGet } from "../middlewares/cache";

const router = express.Router();

router.get("", verifyToken, cacheOnlyForGet, cctvHandler);

export default router;
