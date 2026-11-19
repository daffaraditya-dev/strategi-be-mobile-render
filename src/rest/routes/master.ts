import express from "express";
import { verifyToken } from "../middlewares/jwtToken";
import { cacheOnlyForGet } from "../middlewares/cache";
import { getProvincesHandler } from "../handlers/master/getProvince";
import { getRegencyHandler } from "../handlers/master/getRegency";
import { getUserApprovalHandler } from "../handlers/master/getUserApproval";
import { getDataMasterTerminal } from "../handlers/master/services/terminal.service";
import {
  getPoTerminalHandler,
  getTerminalHandler,
} from "../handlers/master/getTerminal";
import { getTrayekHandler } from "../handlers/master/getTrayek";
import { getMasterPelabuhanHandler } from "../handlers/master/getPelabuhan";
import { getMasterKapalLautHandler } from "../handlers/master/getKapalLaut";
import { getMasterKapalAsdpHandler } from "../handlers/master/getKapalASDP";
import {
  get30SecHandler,
  getLiveStreamingHandler,
} from "../handlers/v2/livestreaming&30sec/getLiveStreamingand30Sec";
import { getEselonHandler } from "../handlers/master/getEselon";
import { getUptHandler } from "../handlers/master/getUpt";
import { getShiftListHandler } from "../handlers/master/getShifts";

const router = express.Router();

router.get("/terminal", verifyToken, cacheOnlyForGet, getTerminalHandler);
router.get("/trayek", verifyToken, cacheOnlyForGet, getTrayekHandler);
router.get(
  "/pelabuhan",
  verifyToken,
  cacheOnlyForGet,
  getMasterPelabuhanHandler
);
router.get(
  "/kapal-laut",
  verifyToken,
  cacheOnlyForGet,
  getMasterKapalLautHandler
);
router.get(
  "/upt",
  verifyToken,
  cacheOnlyForGet,
  getUptHandler
);
router.get(
  "/eselon",
  verifyToken,
  cacheOnlyForGet,
  getEselonHandler
);
router.get(
  "/kapal-asdp",
  verifyToken,
  cacheOnlyForGet,
  getMasterKapalAsdpHandler
);
router.get("/po-terminal", verifyToken, cacheOnlyForGet, getPoTerminalHandler);
router.get("/provinsi", verifyToken, cacheOnlyForGet, getProvincesHandler);
router.get("/kabupaten", verifyToken, cacheOnlyForGet, getRegencyHandler);
router.get(
  "/user-approval",
  verifyToken,
  cacheOnlyForGet,
  getUserApprovalHandler
);
router.get(
  "/live-streaming",
  verifyToken,
  cacheOnlyForGet,
  getLiveStreamingHandler
);
router.get("/30second", verifyToken, cacheOnlyForGet, get30SecHandler);
router.get("/posko-shift", verifyToken, cacheOnlyForGet, getShiftListHandler);
export default router;
