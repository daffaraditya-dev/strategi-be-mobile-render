import express from "express";
import { seasonalHandler } from "../handlers/summary/seasonal";
import { routineHandler } from "../handlers/summary/routine";
import { verifyToken } from "../middlewares/jwtToken";

const router = express.Router();

router.get("/seasonal", verifyToken, seasonalHandler);
router.get("/routine", verifyToken, routineHandler);

export default router;
