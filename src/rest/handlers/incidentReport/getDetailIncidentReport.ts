import { AppDataSource } from "@/data-source";
import { LaporanKejadian } from "@/entities/LaporanKejadian";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import {
  IncidentReportResponse,
  IncidentReportSingleResponse,
} from "./type/getIncidentReport";

export const getDetailIncidentReportHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const laporanRepository = AppDataSource.getRepository(LaporanKejadian);

    const laporan = await laporanRepository.findOne({
      where: { id },
      relations: ["laporanKejadianDetail"],
    });

    if (!laporan) {
      const errorResponse = createErrorResponse(
        "Laporan kejadian not found",
        404
      );
      return res.status(errorResponse.statusCode).json(errorResponse);
    }

    const response: IncidentReportSingleResponse = {
      success: true,
      data: laporan,
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching laporan by ID:", err);
    const errorResponse = createErrorResponse(
      "Failed to fetch laporan kejadian",
      500
    );
    return res.status(errorResponse.statusCode).json(errorResponse);
  }
};
