import express from "express";
import upload from "../../middlewares/upload";
import { uploadFiles } from "@/rest/handlers/v2/storage/storageFile";
import { verifyToken } from "@/rest/middlewares/jwtToken";

const router = express.Router();

// darat
router.post("/uploads", upload.array("file"), uploadFiles);

export default router;
