import { Request, Response } from "express";
import Joi from "joi";
import {
  createLaporanPosko,
  getLaporanPoskoList,
  getLaporanPoskoDetail,
  updateLaporanPosko,
  deleteLaporanPosko,
} from "./services/posko.service";
import { isValidJSON } from "@/utils/validJson";

// List + Query schema
const listQuerySchema = Joi.object({
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
  search: Joi.string().allow("").optional(),
  tanggalAwal: Joi.string().optional(),
  tanggalAkhir: Joi.string().optional(),
  eventId: Joi.number().optional(),
  shiftId: Joi.number().optional(),
  instansi: Joi.string().optional(),
});

// Detail schema
const detailQuerySchema = Joi.object({
  id: Joi.string().required(),
});

// Create schema
const createBodySchema = Joi.object({
  judulLaporan: Joi.string().allow("").optional(),
  tanggalLaporan: Joi.string().optional(),
  deskripsi: Joi.string().allow("").optional(),
  uploadedFiles: Joi.array().items(Joi.string()).optional(), // <-- FIX
  eventId: Joi.number().optional(),
  laporanPoskoShiftId: Joi.number().optional(),
  posko: Joi.string().allow("").optional(),
  totalKecelakaan: Joi.number().optional(),
  totalMeninggal: Joi.number().optional(),
  totalLukaBerat: Joi.number().optional(),
  totalLukaRingan: Joi.number().optional(),
  totalKerugian: Joi.number().optional(),
});

// Update schema
const updateBodySchema = Joi.object({
  judulLaporan: Joi.string().allow("").optional(),
  tanggalLaporan: Joi.string().optional(),
  deskripsi: Joi.string().allow("").optional(),
  uploadedFiles: Joi.array().items(Joi.string()).optional(), // <-- FIX
  eventId: Joi.number().optional(),
  laporanPoskoShiftId: Joi.number().optional(),
  posko: Joi.string().allow("").optional(),
  totalKecelakaan: Joi.number().optional(),
  totalMeninggal: Joi.number().optional(),
  totalLukaBerat: Joi.number().optional(),
  totalLukaRingan: Joi.number().optional(),
  totalKerugian: Joi.number().optional(),
});

// Delete schema
const deleteQuerySchema = Joi.object({
  id: Joi.string().required(),
});

export const getLaporanPoskoListHandler = async (
  req: Request,
  res: Response,
) => {
  const { error, value } = listQuerySchema.validate(req.query);
  if (error)
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });

  try {
    const data = await getLaporanPoskoList(value);
    return res.json({ status: true, ...data });
  } catch (err) {
    console.log(err, "error in getLaporanPoskoListHandler");
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const getLaporanPoskoDetailHandler = async (
  req: Request,
  res: Response,
) => {
  const { error, value } = detailQuerySchema.validate(req.params);
  if (error)
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });

  try {
    const data = await getLaporanPoskoDetail(value.id);
    return res.json({ status: true, data });
  } catch (err) {
    console.log(err, "error in getLaporanPoskoDetailHandler");
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const createLaporanPoskoHandler = async (
  req: Request,
  res: Response,
) => {
  const { error, value } = createBodySchema.validate(req.body);
  const id_user = req.auth?.userId;

  if (error)
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });

  try {
    const data = await createLaporanPosko({
      ...value,
      uploadedFiles: value.uploadedFiles ?? [],
      createdBy: id_user,
    });
    return res.json({ status: true, data });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("Laporan untuk shift")) {
        return res.status(400).json({
          status: false,
          message: err.message,
        });
      }
    }
    console.log(err, "error in createLaporanPoskoHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const updateLaporanPoskoHandler = async (
  req: Request,
  res: Response,
) => {
  const { error, value } = updateBodySchema.validate(req.body);
  const { id } = req.params;
  const id_user = req.auth?.userId;

  if (!id)
    return res.status(400).json({ status: false, message: "Missing id param" });
  if (error)
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });

  try {
    const data = await updateLaporanPosko(id, {
      ...value,
      uploadedFiles: value.uploadedFiles ?? [],
      updatedBy: id_user,
    });
    return res.json({ status: true, data });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("Laporan untuk shift")) {
        return res.status(400).json({
          status: false,
          message: err.message,
        });
      }
    }
    console.log(err, "error in updateLaporanPoskoHandler");
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const deleteLaporanPoskoHandler = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const id_user = req.auth?.userId;

  try {
    const data = await deleteLaporanPosko(id, id_user ?? "");
    return res.json({ status: true, data });
  } catch (err) {
    console.log(err, "error in deleteLaporanPoskoHandler");
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
