import express from "express";
import { loginHandler } from "../handlers/auth/login";
import { meHandler } from "../handlers/auth/me";
import { verifyToken } from "../middlewares/jwtToken";
import { tokenExchange } from "../handlers/auth/tokenExchange";
import { refreshTokenHandler } from "../handlers/auth/refreshToken";

const router = express.Router();

router.post("/login", loginHandler);
router.get("/me", verifyToken, meHandler);
router.post("/token-exchange", tokenExchange);
router.post("/refresh-token", refreshTokenHandler);

export default router;
