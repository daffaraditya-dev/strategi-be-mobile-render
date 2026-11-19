import express from "express";
import { verifyToken } from "../middlewares/jwtToken";
import { getPoskoHandler } from "../handlers/posko/getPosko";
import { createPoskoHandler } from "../handlers/posko/createPosko";
import { updatePoskoHandler } from "../handlers/posko/updatePosko";
import { getDetailPoskoHandler } from "../handlers/posko/getDetailPosko";
import { deletePoskoHandler } from "../handlers/posko/deletePosko";
import { getPoskoTypeHandler } from "../handlers/posko/getPoskoType";
import { getPoskoParticipantHandler } from "../handlers/posko/getPoskoParticipant";
import upload from "../middlewares/upload";
import { cacheOnlyForGet, clearCacheMiddleware } from "../middlewares/cache";

const router = express.Router();

router.get("", verifyToken, cacheOnlyForGet, getPoskoHandler);
router.post(
  "",
  // verifyToken,
  clearCacheMiddleware,
  upload.array("lampiran"),
  createPoskoHandler
);
router.get("/type", verifyToken, cacheOnlyForGet, getPoskoTypeHandler);
router.get(
  "/participant",
  verifyToken,
  cacheOnlyForGet,
  getPoskoParticipantHandler
);
router.get("/:id", verifyToken, cacheOnlyForGet, getDetailPoskoHandler);
router.put(
  "/:id",
  // verifyToken,
  clearCacheMiddleware,
  upload.array("lampiran"),
  updatePoskoHandler
);
router.delete("/:id", verifyToken, clearCacheMiddleware, deletePoskoHandler);

export default router;
