import express from "express";
import { verifyToken } from "../middlewares/jwtToken";
import { thirtySecondsHandler } from "../handlers/thirtySeconds/thirtySeconds";
import { cacheOnlyForGet } from "../middlewares/cache";

const router = express.Router();

router.get("", verifyToken, cacheOnlyForGet, thirtySecondsHandler);

export default router;
