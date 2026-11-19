import express from "express";
// import { verifyToken } from "../middlewares/jwtToken";
// import { cacheOnlyForGet } from "../middlewares/cache";
import { cacheOnlyForGet, cacheOnlyForPost } from "../../middlewares/cache";
import { comparisonHub } from "@/rest/handlers/v2/comparison/comparison";

const router = express.Router();

router.get("/", cacheOnlyForGet, comparisonHub);

export default router;
