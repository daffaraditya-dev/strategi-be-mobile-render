import { AppDataSource } from "@/data-source";
import { LaporanKejadian } from "@/entities/LaporanKejadian";
import { LaporanKejadianDetail } from "@/entities/LaporanKejadianDetail"; // Import the related entity
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import Joi from "joi";
import {
  IncidentReportResponse,
  IncidentReportSingleResponse,
} from "./type/getIncidentReport";

const rejectIncidentReportRequest = Joi.object({
  rejectedBy: Joi.string().required(),
  reason: Joi.string().required(),
  additionalComments: Joi.string().optional(),
});

export const rejectIncidentReportHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error, value } = rejectIncidentReportRequest.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errorResponse = createErrorResponse(
        error.details.map((err) => err.message)
      );
      return res.status(errorResponse.statusCode).json(errorResponse);
    }

    const laporanRepository = AppDataSource.getRepository(LaporanKejadian);
    const laporanDetailRepository = AppDataSource.getRepository(
      LaporanKejadianDetail
    );

    // Check if laporan exists
    const existingLaporan = await laporanRepository.findOne({
      where: { id },
      relations: ["laporanKejadianDetail"],
    });
    if (!existingLaporan) {
      const errorResponse = createErrorResponse(
        "Laporan kejadian not found",
        404
      );
      return res.status(errorResponse.statusCode).json(errorResponse);
    }

    // Find the existing LaporanKejadianDetail to update
    const existingDetail = await laporanDetailRepository.findOne({
      where: { idLaporanKejadian: id },
    });

    if (existingDetail) {
      // Update the LaporanKejadianDetail
      const detailData = {
        ...existingDetail,
        isApproved: false,
        rejectedBy: value.rejectedBy,
        rejectedreason: value.reason,
        rejectedadditionalComments: value.additionalComments,
      };
      await laporanDetailRepository.update(existingDetail.id, detailData);
    }

    // Fetch and return the updated laporan with its details
    const updatedLaporan = await laporanRepository.findOne({
      where: { id },
      relations: ["laporanKejadianDetail"],
    });

    const response: IncidentReportSingleResponse = {
      success: true,
      data: updatedLaporan as IncidentReportResponse,
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error updating laporan:", err);
    const errorResponse = createErrorResponse(
      "Failed to update laporan kejadian",
      500
    );
    return res.status(errorResponse.statusCode).json(errorResponse);
  }
};
