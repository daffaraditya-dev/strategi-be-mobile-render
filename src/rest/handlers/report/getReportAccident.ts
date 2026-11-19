import { AppDataSource } from "@/data-source";
import { LaporanPantauKecelakaan } from "@/entities/LaporanPantauKecelakaan";
import { LaporanPantau } from "@/entities/LaporanPantau";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";

export const getReportAccidentHandler = async (req: Request, res: Response) => {
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

    // Get the accident reports for this LaporanPantau
    const kecelakaanRepository = AppDataSource.getRepository(
      LaporanPantauKecelakaan
    );
    const kecelakaan = await kecelakaanRepository.find({
      where: { idLaporanPantau: id },
    });

    // Return the accident reports
    return res.status(200).json({
      success: true,
      data: kecelakaan,
      count: kecelakaan.length,
    });
  } catch (err) {
    console.error("Error fetching Laporan Pantau Kecelakaan:", err);
    return res
      .status(500)
      .json(
        createErrorResponse("Failed to fetch Laporan Pantau Kecelakaan", 500)
      );
  }
};
