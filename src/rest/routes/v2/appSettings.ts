// routes/app-config.route.ts
import { Router } from "express";
import {
  createAppConfigController,
  updateAppConfigController,
  deleteAppConfigController,
  listAppConfigsByPlatformController,
  getAppConfigByIdController,
  getAppConfigValueController,
} from "@/rest/handlers/v2/appSettings/handlers/app.handler";
import { verifyToken } from "@/rest/middlewares/jwtToken";
;

const router = Router();

router.post("/", verifyToken, createAppConfigController);
router.put("/:id", verifyToken, updateAppConfigController);
router.get("/value", getAppConfigValueController);
router.get("/:id", getAppConfigByIdController);
router.get("/", listAppConfigsByPlatformController);
router.delete("/:id", verifyToken, deleteAppConfigController);

export default router;
