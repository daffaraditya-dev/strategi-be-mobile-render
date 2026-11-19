import { AppDataSource } from "@/data-source";
import { LaporanKejadian } from "@/entities/LaporanKejadian";
import { LaporanPantau } from "@/entities/LaporanPantau"; // Import the related entity
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import Joi from "joi";

const rejectReportRequest = Joi.object({
  reason: Joi.string().optional(),
  additionalComments: Joi.string().optional(),
});

export const rejectReportHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error, value } = rejectReportRequest.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errorResponse = createErrorResponse(
        error.details.map((err) => err.message)
      );
      return res.status(errorResponse.statusCode).json(errorResponse);
    }

    const laporanPantauRepository = AppDataSource.getRepository(LaporanPantau);

    // Find the existing LaporanPantau to update
    const existingDetail = await laporanPantauRepository.findOne({
      where: { id: parseInt(id) },
    });

    const rejectedDate = new Date();
    if (existingDetail) {
      // Update the LaporanPantau
      const detailData = {
        ...existingDetail,
        isApproved: false,
        rejectedBy: req.auth?.userId,
        rejectedDate: rejectedDate,
        rejectedReason: value.reason,
        rejectedAdditionalComments: value.additionalComments,
      };
      await laporanPantauRepository.update(existingDetail.id, detailData);
    }

    const response = {
      success: true,
      data: {
        id: existingDetail?.id.toString(),
        isApproved: false,
        rejectedBy: req.auth?.userId,
        reason: value.reason,
        rejectedDate: rejectedDate,
        additionalComments: value.additionalComments,
      },
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
