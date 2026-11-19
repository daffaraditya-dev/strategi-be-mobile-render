import { AppDataSource } from "@/data-source";
import { LaporanKejadian } from "@/entities/LaporanKejadian";
import { Request, Response } from "express";
import {
  IncidentReportListResponse,
  IncidentReportResponse,
} from "./type/getIncidentReport";
import { createErrorResponse } from "@/utils/error";
import Joi from "joi";
import { Between, ILike, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

const getIncidentReportRequest = Joi.object({
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso().min(Joi.ref("startDate")),
  dateField: Joi.string()
    .valid(
      "waktuKejadian",
      "createDate",
      "updateDate",
      "verifyDate",
      "waktuTindaklanjut"
    )
    .default("waktuKejadian"),
});

export const getIncidentReportHandler = async (req: Request, res: Response) => {
  try {
    const laporanRepository = AppDataSource.getRepository(LaporanKejadian);

    // Handle pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Handle basic filtering
    const { status, moda, category } = req.query;
    let whereClause: any = {};

    if (status !== undefined) {
      whereClause.status = status;
    }

    if (moda !== undefined) {
      whereClause.modaTransportasi = ILike(`%${moda}%`);
    }

    if (category !== undefined) {
      whereClause.kategori = ILike(`%${category}%`);
    }

    // Handle date filtering
    const dateFilter = {
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,
      dateField: (req.query.dateField as string) || "waktuKejadian",
    };

    // Validate date filter parameters
    const { error, value } = getIncidentReportRequest.validate(dateFilter);
    if (error) {
      const errorResponse = createErrorResponse(
        error.details.map((err) => err.message)
      );
      return res.status(errorResponse.statusCode).json(errorResponse);
    }

    // Apply date filtering if both start and end dates are provided
    if (value.startDate && value.endDate) {
      whereClause[value.dateField] = Between(
        new Date(value.startDate),
        new Date(value.endDate)
      );
    } else if (value.startDate) {
      whereClause[value.dateField] = MoreThanOrEqual(new Date(value.startDate));
    } else if (value.endDate) {
      whereClause[value.dateField] = LessThanOrEqual(new Date(value.endDate));
    }

    // Get total count for pagination
    const totalCount = await laporanRepository.count({
      where: whereClause,
      relations: ["laporanKejadianDetail"],
    });

    const laporan = await laporanRepository.find({
      where: whereClause,
      skip,
      take: limit,
      order: { createDate: "DESC" },
      relations: ["laporanKejadianDetail"],
    });

    const response: IncidentReportListResponse = {
      success: true,
      data: laporan as IncidentReportResponse[],
      count: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching laporan:", err);
    const errorResponse = createErrorResponse(
      "Failed to fetch laporan kejadian",
      500
    );
    return res.status(errorResponse.statusCode).json(errorResponse);
  }
};
