import express from "express";
// import { verifyToken } from "../middlewares/jwtToken";
// import { cacheOnlyForGet } from "../middlewares/cache";
import { eventCheckHandler } from "@/rest/handlers/v2/generals/event";
import { cacheOnlyForGet } from "@/rest/middlewares/cache";

const router = express.Router();

router.get("/event-check", cacheOnlyForGet, eventCheckHandler);

export default router;
