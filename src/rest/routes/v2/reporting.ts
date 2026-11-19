import express from "express";
import {
  createNihilReportDaratHandler,
  createReportDaratHandler,
  deleteReportDaratHandler,
  //   exportReportDaratHandler,
  getReportDaratHandler,
  getReportDaratIdHandler,
  updateReportDaratHandler,
} from "@/rest/handlers/v2/reporting/darat/reportDarat";
import {
  exportReportDaratHandler,
  approvalDaratHandler,
} from "../../handlers/v2/reporting/darat/reportDarat";
import {
  createNihilReportLautHandler,
  createReportLautHandler,
  deleteReportLautHandler,
  getReportLautHandler,
  getReportLautIdHandler,
  updateReportLautHandler,
} from "@/rest/handlers/v2/reporting/laut/reportLaut";
import { exportReportLautHandler } from "../../handlers/v2/reporting/laut/reportLaut";
import { verifyToken } from "@/rest/middlewares/jwtToken";
import {
  createNihilReportSdpHandler,
  createReportSdpHandler,
  deleteReportSdpHandler,
  getReportSdpHandler,
  getReportSdpIdHandler,
  updateReportSdpHandler,
} from "@/rest/handlers/v2/reporting/sdp/reportSDP";
import {
  exportReportSdpHandler,
  approvalSdpHandler,
} from "../../handlers/v2/reporting/sdp/reportSDP";

const router = express.Router();

// darat
router.get("/darat/export", verifyToken, exportReportDaratHandler);
router.get("/darat", verifyToken, getReportDaratHandler);
router.get("/darat/:id", verifyToken, getReportDaratIdHandler);
router.post("/darat", verifyToken, createReportDaratHandler);
router.put("/darat/:id", verifyToken, updateReportDaratHandler);
router.delete("/darat/:id", verifyToken, deleteReportDaratHandler);
router.post("/darat/nihil", verifyToken, createNihilReportDaratHandler);
router.put("/darat/approve/:id", verifyToken, approvalDaratHandler);

// sdp
router.get("/sdp/export", verifyToken, exportReportSdpHandler);
router.get("/sdp", verifyToken, getReportSdpHandler);
router.get("/sdp/:id", verifyToken, getReportSdpIdHandler);
router.post("/sdp", verifyToken, createReportSdpHandler);
router.put("/sdp/:id", verifyToken, updateReportSdpHandler);
router.delete("/sdp/:id", verifyToken, deleteReportSdpHandler);
router.post("/sdp/nihil", verifyToken, createNihilReportSdpHandler);
router.put("/sdp/approve/:id", verifyToken, approvalSdpHandler);

// laut
router.get("/laut/export", verifyToken, exportReportLautHandler);
router.get("/laut", verifyToken, getReportLautHandler);
router.get("/laut/:id", verifyToken, getReportLautIdHandler);
router.post("/laut", verifyToken, createReportLautHandler);
router.put("/laut/:id", verifyToken, updateReportLautHandler);
router.delete("/laut/:id", verifyToken, deleteReportLautHandler);
router.post("/laut/nihil", verifyToken, createNihilReportLautHandler);
// router.post("/laut/keberangkatan", verifyToken, createReportDaratHandler);
// router.put("/laut/keberangkatan/:id", verifyToken, updateReportLautHandler);
// router.put("/laut/kedatangan/:id", verifyToken, createReportDaratHandler);
// router.put("/laut/kedatangan/:id", verifyToken, updateReportLautHandler);

export default router;
