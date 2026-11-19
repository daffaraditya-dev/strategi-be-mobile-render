import { AppDataSource } from "@/data-source";
import { LaporanPantau } from "@/entities/LaporanPantau";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import Joi from "joi";

const updateReportSchema = Joi.object({
  type: Joi.string().optional(),
  matra: Joi.string().allow(null, "").optional(),
  event: Joi.string().allow(null, "").optional(),
  nama: Joi.string().allow(null, "").optional(),
  personil: Joi.string().allow(null, "").optional(),
  pengikut: Joi.string().allow(null, "").optional(),
  tanggal: Joi.date().allow(null).optional(),
  provinsi: Joi.string().allow(null, "").optional(),
  kabupaten: Joi.string().allow(null, "").optional(),
  angkutan: Joi.string().allow(null, "").optional(),
  unitPelayanan: Joi.string().allow(null, "").optional(),
  deskripsi: Joi.string().allow(null, "").optional(),
  isKejadianMenonjol: Joi.boolean().optional(),
  kejadianMenonjol: Joi.string().allow(null, "").optional(),
  koordinatKejadianMenonjol: Joi.string().allow(null, "").optional(),
  isKecelakaan: Joi.boolean().optional(),
  koordinatKecelakaan: Joi.string().allow(null, "").optional(),
  lokasiKecelakaan: Joi.string().allow(null, "").optional(),
  pembuat: Joi.string().allow(null, "").optional(),
  persetujuan: Joi.string().allow(null, "").optional(),
  poskoTerpadu: Joi.string().allow(null, "").optional(),
  captionPhoto: Joi.string().allow(null, "").optional(),
}).min(1); // Require at least one field to be updated

export const updateReportHandler = async (req: Request, res: Response) => {
  try {
    // Validate the ID parameter
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json(createErrorResponse("Invalid ID format", 400));
    }

    // Validate request body
    const { error, value } = updateReportSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(createErrorResponse(error.details.map((err) => err.message)));
    }

    // Handle file uploads
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (files) {
      if (files.photo && files.photo.length > 0) {
        value.photo = `${req.protocol}://${req.get("host")}/uploads/${
          files.photo[0].filename
        }`;
      }

      if (files.file && files.file.length > 0) {
        value.file = `${req.protocol}://${req.get("host")}/uploads/${
          files.file[0].filename
        }`;
      }
    }

    // Get the report repository
    const repository = AppDataSource.getRepository(LaporanPantau);

    // Find the report
    const report = await repository.findOne({ where: { id } });

    // Check if the report exists
    if (!report) {
      return res.status(404).json(createErrorResponse("Report not found", 404));
    }

    // Update the report
    value.updatedBy = req.auth?.userId;
    repository.merge(report, value);
    const updatedReport = await repository.save(report);

    // Return the updated report
    return res.status(200).json({
      success: true,
      message: "Report updated successfully",
      data: updatedReport,
    });
  } catch (err) {
    console.error("Error updating report:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to update report", 500));
  }
};
