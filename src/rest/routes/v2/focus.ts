import express from "express";
// import { verifyToken } from "../middlewares/jwtToken";
// import { cacheOnlyForGet } from "../middlewares/cache";
import { getFocusHandler } from "@/rest/handlers/v2/focus/focus";
import { verifyToken } from "@/rest/middlewares/jwtToken";
import { cacheOnlyForGet } from "@/rest/middlewares/cache";

const router = express.Router();

router.get("/", verifyToken, getFocusHandler);

export default router;
