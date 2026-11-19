import { AppDataSource } from "@/data-source";
import { LaporanPantau } from "@/entities/LaporanPantau";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import Joi from "joi";

const createLaporanPantauSchema = Joi.object({
  type: Joi.string().required(),
  matra: Joi.string().allow(null, ""),
  event: Joi.string().allow(null, ""),
  nama: Joi.string().allow(null, ""),
  personil: Joi.string().allow(null, ""),
  pengikut: Joi.string().allow(null, ""),
  tanggal: Joi.date().allow(null),
  provinsi: Joi.string().allow(null, ""),
  kabupaten: Joi.string().allow(null, ""),
  angkutan: Joi.string().allow(null, ""),
  unitPelayanan: Joi.string().allow(null, ""),
  deskripsi: Joi.string().allow(null, ""),
  isKejadianMenonjol: Joi.boolean().default(false),
  kejadianMenonjol: Joi.string().allow(null, ""),
  koordinatKejadianMenonjol: Joi.string().allow(null, ""),
  isKecelakaan: Joi.boolean().default(false),
  kecelakaan: Joi.string().allow(null, ""),
  koordinatKecelakaan: Joi.string().allow(null, ""),
  lokasiKecelakaan: Joi.string().allow(null, ""),
  pembuat: Joi.string().allow(null, ""),
  persetujuan: Joi.string().allow(null, ""),
  poskoTerpadu: Joi.string().allow(null, ""),
  captionPhoto: Joi.string().allow(null, ""),
});

export const createReportHandler = async (req: Request, res: Response) => {
  try {
    // Handle file uploads
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    let photoPath = "";
    let filePath = "";

    if (files) {
      if (files.photo && files.photo.length > 0) {
        photoPath = `${req.protocol}://${req.get("host")}/uploads/${
          files.photo[0].filename
        }`;
      }

      if (files.file && files.file.length > 0) {
        filePath = `${req.protocol}://${req.get("host")}/uploads/${
          files.file[0].filename
        }`;
      }
    }

    // Validate request body
    const { error, value } = createLaporanPantauSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(createErrorResponse(error.details.map((err) => err.message)));
    }

    // Create LaporanPantau
    const laporanPantauRepository = AppDataSource.getRepository(LaporanPantau);
    const laporanPantauData = {
      ...value,
      photo: photoPath || null,
      file: filePath || null,
      createdBy: req.auth?.userId,
    };

    const laporanPantau = laporanPantauRepository.create(laporanPantauData);
    const savedLaporanPantau = await laporanPantauRepository.save(
      laporanPantau
    );

    return res.status(201).json({
      success: true,
      message: "Laporan Pantau created successfully",
      data: savedLaporanPantau,
    });
  } catch (err) {
    console.error("Error creating Laporan Pantau:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to create Laporan Pantau", 500));
  }
};
