import { AppDataSource } from "@/data-source";
import { LaporanPantau } from "@/entities/LaporanPantau";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import Joi from "joi";

const approveReportRequest = Joi.object({
  notes: Joi.string().optional(),
});

export const approveReportHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error, value } = approveReportRequest.validate(req.body, {
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
    const existing = await laporanPantauRepository.findOne({
      where: { id: parseInt(id) },
    });

    const approvedDate = new Date();
    if (existing) {
      // Update the LaporanPantau
      const detailData = {
        ...existing,
        isApproved: true,
        approvedBy: req.auth?.userId,
        approvedDate: approvedDate,
        approvedNotes: value.notes,
      };
      await laporanPantauRepository.update(existing.id, detailData);
    }

    const response = {
      success: true,
      data: {
        id: existing?.id.toString(),
        isApproved: true,
        approvedBy: req.auth?.userId,
        approvedDate: approvedDate,
        notes: value.notes,
      },
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error updating laporan:", err);
    const errorResponse = createErrorResponse(
      "Failed to update laporan pantau",
      500
    );
    return res.status(errorResponse.statusCode).json(errorResponse);
  }
};
