import { AppDataSource } from "@/data-source";
import { LaporanPantauCuaca } from "@/entities/LaporanPantauCuaca";
import { LaporanPantau } from "@/entities/LaporanPantau";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import Joi from "joi";

const upsertLaporanPantauCuacaSchema = Joi.object({
  id: Joi.number().integer().optional(),
  idLaporanPantau: Joi.number().integer().required(),
  kondisiCuaca: Joi.string().allow(null, ""),
  jarakPandang: Joi.number().allow(null),
  arahAnginDari: Joi.string().allow(null, ""),
  arahAnginKe: Joi.string().allow(null, ""),
  kecepatanAngin: Joi.number().allow(null),
  tinggiGelombang: Joi.number().allow(null),
});

export const createReportWeatherHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { idLaporanPantau } = req.params;
    // Validate request body
    const { error, value } = upsertLaporanPantauCuacaSchema.validate(req.body);
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

    const cuacaRepository = AppDataSource.getRepository(LaporanPantauCuaca);
    let cuaca: LaporanPantauCuaca;
    let isNewRecord = true;

    // Check if we're updating an existing record
    if (value.id) {
      const existingCuaca = await cuacaRepository.findOne({
        where: { id: value.id },
      });

      if (existingCuaca) {
        // Ensure the cuaca record belongs to the specified laporan
        if (existingCuaca.idLaporanPantau !== value.idLaporanPantau) {
          return res
            .status(400)
            .json(
              createErrorResponse(
                "Cuaca record doesn't belong to the specified Laporan Pantau",
                400
              )
            );
        }

        isNewRecord = false;
        cuaca = existingCuaca;

        // Update existing record with new values
        cuacaRepository.merge(cuaca, value);
      } else {
        // ID provided but not found - create new with specified ID
        cuaca = value;
      }
    } else {
      // Check if a cuaca record already exists for this laporan
      const existingCuaca = await cuacaRepository.findOne({
        where: { idLaporanPantau: value.idLaporanPantau },
      });

      if (existingCuaca) {
        // Update the existing record instead of creating a new one
        isNewRecord = false;
        cuaca = existingCuaca;
        cuacaRepository.merge(cuaca, value);
      } else {
        // No existing record - create new
        cuaca = value;
      }
    }

    // Save the record
    const savedCuaca = await cuacaRepository.save(cuaca);

    return res.status(isNewRecord ? 201 : 200).json({
      success: true,
      message: isNewRecord
        ? "Laporan Pantau Cuaca created successfully"
        : "Laporan Pantau Cuaca updated successfully",
      data: savedCuaca,
    });
  } catch (err) {
    console.error("Error upserting Laporan Pantau Cuaca:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to upsert Laporan Pantau Cuaca", 500));
  }
};
