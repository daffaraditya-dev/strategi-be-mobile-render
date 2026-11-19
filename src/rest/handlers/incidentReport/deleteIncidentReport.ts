import { AppDataSource } from "@/data-source";
import { LaporanKejadian } from "@/entities/LaporanKejadian";
import { LaporanKejadianDetail } from "@/entities/LaporanKejadianDetail";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";

export const deleteIncidentReportHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const laporanRepository = AppDataSource.getRepository(LaporanKejadian);
    const laporanDetailRepository = AppDataSource.getRepository(
      LaporanKejadianDetail
    );

    const existingLaporan = await laporanRepository.findOne({ where: { id } });
    if (!existingLaporan) {
      const errorResponse = createErrorResponse(
        "Laporan kejadian not found",
        404
      );
      return res.status(errorResponse.statusCode).json(errorResponse);
    }

    await laporanRepository.delete(id);
    await laporanDetailRepository.delete(id);

    return res
      .status(200)
      .json({ message: "Laporan kejadian successfully deleted" });
  } catch (err) {
    console.error("Error deleting laporan:", err);
    const errorResponse = createErrorResponse(
      "Failed to delete laporan kejadian",
      500
    );
    return res.status(errorResponse.statusCode).json(errorResponse);
  }
};
