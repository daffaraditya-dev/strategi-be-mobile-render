import { Router } from "express";
import {
  getLaporanPoskoListHandler,
  getLaporanPoskoDetailHandler,
  createLaporanPoskoHandler,
  updateLaporanPoskoHandler,
  deleteLaporanPoskoHandler,
} from "../../handlers/v2/posko/posko";
import { verifyToken } from "@/rest/middlewares/jwtToken";
import { cacheOnlyForGet } from "@/rest/middlewares/cache";

const router = Router();

router.get("/", verifyToken, getLaporanPoskoListHandler);
router.get("/:id", verifyToken, getLaporanPoskoDetailHandler);
router.post("/", verifyToken, cacheOnlyForGet, createLaporanPoskoHandler);
router.put("/:id", verifyToken, cacheOnlyForGet, updateLaporanPoskoHandler);
router.delete("/:id", verifyToken, cacheOnlyForGet, deleteLaporanPoskoHandler);

export default router;
