import express from "express";
// import { verifyToken } from "../middlewares/jwtToken";
// import { cacheOnlyForGet } from "../middlewares/cache";
import { cacheOnlyForGet, cacheOnlyForPost } from "../../middlewares/cache";
import { regionalHub } from "@/rest/handlers/v2/regional/regional";

const router = express.Router();

router.get("/", cacheOnlyForGet, regionalHub);

export default router;
