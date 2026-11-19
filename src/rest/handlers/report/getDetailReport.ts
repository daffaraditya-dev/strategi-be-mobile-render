import { AppDataSource } from "@/data-source";
import { LaporanPantau } from "@/entities/LaporanPantau";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import Joi from "joi";

const getReportByIdSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export const getDetailReportHandler = async (req: Request, res: Response) => {
  try {
    // Validate the ID parameter
    const { error, value } = getReportByIdSchema.validate({
      id: parseInt(req.params.id),
    });
    if (error) {
      return res
        .status(400)
        .json(createErrorResponse(error.details.map((err) => err.message)));
    }

    // Get the report repository
    const repository = AppDataSource.getRepository(LaporanPantau);

    // Find the report with its related entities
    const report = await repository
      .createQueryBuilder("laporanPantau")
      .leftJoinAndSelect("laporanPantau.kecelakaanList", "kecelakaanList")
      .leftJoinAndSelect("laporanPantau.cuacaList", "cuacaList")
      .where("laporanPantau.id = :id", { id: value.id })
      .getOne();

    // Check if the report exists
    if (!report) {
      return res.status(404).json(createErrorResponse("Report not found", 404));
    }

    // Return the report
    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (err) {
    console.error("Error fetching report by ID:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to fetch report", 500));
  }
};
