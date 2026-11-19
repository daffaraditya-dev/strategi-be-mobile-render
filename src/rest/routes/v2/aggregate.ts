import express from "express";
// import { verifyToken } from "../middlewares/jwtToken";
import { cacheOnlyForGet } from "../../middlewares/cache";
// import { cacheOnlyForPost } from "../../middlewares/cache";
import { aggregateHub } from "@/rest/handlers/v2/aggregate/aggregate";

const router = express.Router();

router.get("/", cacheOnlyForGet, aggregateHub);

export default router;
