import express from "express";
import { getFocusHandler } from "@/rest/handlers/v2/focus/focus";
import { verifyToken } from "@/rest/middlewares/jwtToken";
import { odSummaryHandler } from "@/rest/handlers/v2/od/summary";
import { odDetailHandler } from "@/rest/handlers/v2/od/detail";
import { cacheOnlyForGet } from "@/rest/middlewares/cache";

const router = express.Router();

router.get("/", cacheOnlyForGet, odSummaryHandler);
router.get("/detail", cacheOnlyForGet, odDetailHandler);

export default router;
