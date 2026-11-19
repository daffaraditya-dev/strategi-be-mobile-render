import { AppDataSource } from "@/data-source";
import { LaporanPantauKecelakaan } from "@/entities/LaporanPantauKecelakaan";
import { LaporanPantau } from "@/entities/LaporanPantau";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import Joi from "joi";

const upsertLaporanPantauKecelakaanSchema = Joi.object({
  id: Joi.number().integer().optional(),
  idLaporanPantau: Joi.number().integer().required(),
  matra: Joi.string().allow(null, ""),
  tanggalWaktuKejadian: Joi.date().required(),
  jenisKecelakaan: Joi.string().allow(null, ""),
  uraian: Joi.string().allow(null, ""),
  korbanJiwa: Joi.number().default(0),
  lukaBerat: Joi.number().default(0),
  lukaRingan: Joi.number().default(0),
  hilang: Joi.number().default(0),
  selamat: Joi.number().default(0),
  dampakLingkunganJenis: Joi.string().allow(null, ""),
  dampakLingkunganUraian: Joi.string().allow(null, ""),
  dampakLaluLintasJenis: Joi.string().allow(null, ""),
  dampakLaluLintasUraian: Joi.string().allow(null, ""),
  statusPenanggulanganJenis: Joi.string().allow(null, ""),
  statusPenanggulanganUraian: Joi.string().allow(null, ""),
  lokasi: Joi.string().allow(null, ""),
  koordinat: Joi.string().allow(null, ""),
});

export const createReportAccidentHandler = async (
  req: Request,
  res: Response
) => {
  try {
    // Validate request body
    const { idLaporanPantau } = req.params;
    const { error, value } = upsertLaporanPantauKecelakaanSchema.validate(
      req.body
    );
    if (error) {
      return res
        .status(400)
        .json(createErrorResponse(error.details.map((err) => err.message)));
    }

    // Check if the referenced LaporanPantau exists
    const laporanPantauRepository = AppDataSource.getRepository(LaporanPantau);
    const laporanPantau = await laporanPantauRepository.findOne({
      where: { id: Number(idLaporanPantau) },
    });

    if (!laporanPantau) {
      return res
        .status(404)
        .json(createErrorResponse("Laporan Pantau not found", 404));
    }

    // Update the isKecelakaan flag on LaporanPantau if not already set
    if (!laporanPantau.isKecelakaan) {
      laporanPantau.isKecelakaan = true;
      laporanPantau.koordinatKecelakaan = value.koordinat || null;
      laporanPantau.lokasiKecelakaan = value.lokasi || null;
      await laporanPantauRepository.save(laporanPantau);
    }

    const kecelakaanRepository = AppDataSource.getRepository(
      LaporanPantauKecelakaan
    );
    let kecelakaan: LaporanPantauKecelakaan;
    let isNewRecord = true;

    // Check if we're updating an existing record
    if (value.id) {
      const existingKecelakaan = await kecelakaanRepository.findOne({
        where: { id: value.id },
      });

      if (existingKecelakaan) {
        // Ensure the kecelakaan record belongs to the specified laporan
        if (existingKecelakaan.idLaporanPantau !== value.idLaporanPantau) {
          return res
            .status(400)
            .json(
              createErrorResponse(
                "Kecelakaan record doesn't belong to the specified Laporan Pantau",
                400
              )
            );
        }

        isNewRecord = false;
        kecelakaan = existingKecelakaan;

        // Update existing record with new values
        kecelakaanRepository.merge(kecelakaan, value);
      } else {
        // ID provided but not found - create new with specified ID
        kecelakaan = value;
      }
    } else {
      // Check if a kecelakaan record already exists for this laporan
      const existingKecelakaan = await kecelakaanRepository.findOne({
        where: { idLaporanPantau: value.idLaporanPantau },
      });

      if (existingKecelakaan) {
        // Update the existing record instead of creating a new one
        isNewRecord = false;
        kecelakaan = existingKecelakaan;
        kecelakaanRepository.merge(kecelakaan, value);
      } else {
        // No existing record - create new
        kecelakaan = value;
      }
    }

    // Save the record
    const savedKecelakaan = await kecelakaanRepository.save(kecelakaan);

    return res.status(isNewRecord ? 201 : 200).json({
      success: true,
      message: isNewRecord
        ? "Laporan Pantau Kecelakaan created successfully"
        : "Laporan Pantau Kecelakaan updated successfully",
      data: savedKecelakaan,
    });
  } catch (err) {
    console.error("Error upserting Laporan Pantau Kecelakaan:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to upsert Laporan Pantau Cuaca", 500));
  }
};
