import express from "express";
// import { verifyToken } from "../middlewares/jwtToken";
// import { cacheOnlyForGet } from "../middlewares/cache";
import { transportationHubHandler, transportationHubHandlerById } from "../../handlers/v2/transportationHub/transportationHub";
import { cacheOnlyForPost } from "../../middlewares/cache";

const router = express.Router();

router.post("/", cacheOnlyForPost, transportationHubHandler);
router.post("/:idSimpul", cacheOnlyForPost, transportationHubHandlerById);

export default router;
