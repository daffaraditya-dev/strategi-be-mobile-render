import express from "express";
import { verifyToken } from "../middlewares/jwtToken";
import { cacheOnlyForGet } from "../middlewares/cache";
import { coverageHandler } from "../handlers/coverage/coverage";

const router = express.Router();

router.get("", verifyToken, cacheOnlyForGet, coverageHandler);

export default router;
