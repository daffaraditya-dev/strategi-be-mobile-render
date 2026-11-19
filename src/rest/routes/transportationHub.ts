import express from "express";
// import { verifyToken } from "../middlewares/jwtToken";
// import { cacheOnlyForGet } from "../middlewares/cache";
import { transportationHubSeasonalHandler } from "../handlers/transportationHub/transportationHub";
import { cacheOnlyForPost } from "../middlewares/cache";

const router = express.Router();

router.post("/", cacheOnlyForPost, transportationHubSeasonalHandler);

export default router;
