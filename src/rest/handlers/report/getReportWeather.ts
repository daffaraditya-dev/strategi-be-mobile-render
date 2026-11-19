import { AppDataSource } from "@/data-source";
import { LaporanPantauCuaca } from "@/entities/LaporanPantauCuaca";
import { LaporanPantau } from "@/entities/LaporanPantau";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";

export const getReportWeatherHandler = async (req: Request, res: Response) => {
  try {
    // Get the LaporanPantau ID from the request parameters
    const { idLaporanPantau } = req.params;

    // Validate the ID
    const id = parseInt(idLaporanPantau);
    if (isNaN(id)) {
      return res
        .status(400)
        .json(createErrorResponse("Invalid ID format", 400));
    }

    // Check if the referenced LaporanPantau exists
    const laporanPantauRepository = AppDataSource.getRepository(LaporanPantau);
    const laporanPantau = await laporanPantauRepository.findOne({
      where: { id },
    });

    if (!laporanPantau) {
      return res
        .status(404)
        .json(createErrorResponse("Laporan Pantau not found", 404));
    }

    // Get the weather report for this LaporanPantau
    const cuacaRepository = AppDataSource.getRepository(LaporanPantauCuaca);
    const cuaca = await cuacaRepository.findOne({
      where: { idLaporanPantau: id },
    });

    // If no weather report exists, return an appropriate message
    if (!cuaca) {
      return res.status(404).json({
        success: false,
        message: "No weather report found for this Laporan Pantau",
      });
    }

    // Return the weather report
    return res.status(200).json({
      success: true,
      data: cuaca,
    });
  } catch (err) {
    console.error("Error fetching Laporan Pantau Cuaca:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to fetch Laporan Pantau Cuaca", 500));
  }
};
