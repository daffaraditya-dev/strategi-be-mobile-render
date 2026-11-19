import express from "express";
import { getFocusHandler } from "../handlers/focus/getFocus";
import { createFocusHandler } from "../handlers/focus/createFocus";
import { verifyToken } from "../middlewares/jwtToken";

const router = express.Router();

router.get("", verifyToken, getFocusHandler);
router.post("", verifyToken, createFocusHandler);

export default router;
