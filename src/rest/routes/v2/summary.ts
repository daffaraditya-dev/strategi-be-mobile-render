import express from "express";
// import { verifyToken } from "../middlewares/jwtToken";
// import { cacheOnlyForGet } from "../middlewares/cache";
import { routineHandler } from "@/rest/handlers/v2/summary/summary";
import { cacheOnlyForGet } from "@/rest/middlewares/cache";

const router = express.Router();

router.get("/", cacheOnlyForGet, routineHandler);

export default router;
