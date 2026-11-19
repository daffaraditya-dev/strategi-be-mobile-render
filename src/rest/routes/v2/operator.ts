import express from "express";
import { getFocusHandler } from "@/rest/handlers/v2/focus/focus";
import { verifyToken } from "@/rest/middlewares/jwtToken";
import { operatorHandler } from "@/rest/handlers/v2/operator/operator";
import { cacheOnlyForGet } from "@/rest/middlewares/cache";

const router = express.Router();

router.get("/:moda", cacheOnlyForGet, operatorHandler);

export default router;
