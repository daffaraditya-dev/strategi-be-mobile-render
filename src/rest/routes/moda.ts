import express from "express";
import { aggregateRoutineHandler } from "../handlers/moda/aggregateRoutine";
import { aggregateSeasonalHandler } from "../handlers/moda/aggregateSeasonal";
import { regionalRoutineHandler } from "../handlers/moda/regionalRoutine";
import { regionalSeasonalHandler } from "../handlers/moda/regionalSeasonal";
import { verifyToken } from "../middlewares/jwtToken";
import { odRoutineHandler } from "../handlers/moda/odRoutine";
import { odRoutineDetailHandler } from "../handlers/moda/odRoutineDetail";
import { odSeasonalHandler } from "../handlers/moda/odSeasonal";
import { odSeasonalDetailHandler } from "../handlers/moda/odSeasonalDetail";
import { operatorRoutineHandler } from "../handlers/moda/operatorRoutine";
import { operatorSeasonalHandler } from "../handlers/moda/operatorSeasonal";
import { operatorFleetsHandler } from "../handlers/moda/operatorFleets";
import { operatorOdHandler } from "../handlers/moda/operatorOd";
import { regionalDetailRoutineHandler } from "../handlers/moda/regionalDetailRoutine";
import { regionalDetailSeasonalHandler } from "../handlers/moda/regionalDetailSeasonal";

const router = express.Router();

router.get("/aggregate/:moda/routine", verifyToken, aggregateRoutineHandler);
router.get("/aggregate/:moda/seasonal", verifyToken, aggregateSeasonalHandler);
router.get("/regional/routine", verifyToken, regionalRoutineHandler);
router.get(
  "/regional/:idLocation/routine",
  verifyToken,
  regionalDetailRoutineHandler
);
router.get("/regional/seasonal", verifyToken, regionalSeasonalHandler);
router.get(
  "/regional/:idLocation/seasonal",
  verifyToken,
  regionalDetailSeasonalHandler
);
router.get("/od/:moda/routine", verifyToken, odRoutineHandler);
router.get("/od/:moda/routine/detail", verifyToken, odRoutineDetailHandler);
router.get("/od/:moda/seasonal", verifyToken, odSeasonalHandler);
router.get("/od/:moda/seasonal/detail", verifyToken, odSeasonalDetailHandler);
router.get("/operators/:moda/routine", verifyToken, operatorRoutineHandler);
router.get("/operators/:moda/seasonal", verifyToken, operatorSeasonalHandler);
router.get("/operators/:moda/fleets", verifyToken, operatorFleetsHandler);
router.get("/operators/:moda/od", verifyToken, operatorOdHandler);

export default router;
