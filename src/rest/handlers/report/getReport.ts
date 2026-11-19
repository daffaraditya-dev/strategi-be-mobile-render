import { AppDataSource } from "@/data-source";
import { LaporanPantau } from "@/entities/LaporanPantau";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import Joi from "joi";

const getReportRequest = Joi.object({
  type: Joi.string().optional(),
  search: Joi.string().optional(),
  poskoTerpadu: Joi.string().optional(),
  event: Joi.string().optional(),
  dateFrom: Joi.string().optional(),
  dateTo: Joi.string().optional(),
  isApproved: Joi.boolean().optional(),
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).default(10),
});

export const getReportsHandler = async (req: Request, res: Response) => {
  try {
    const { error, value } = getReportRequest.validate(req.query);
    if (error) {
      return res
        .status(400)
        .json(createErrorResponse(error.details.map((err) => err.message)));
    }

    const {
      page,
      limit,
      type,
      poskoTerpadu,
      event,
      dateFrom,
      dateTo,
      isApproved,
      search,
    } = value;
    const skip = (page - 1) * limit;

    const repository = AppDataSource.getRepository(LaporanPantau);
    let queryBuilder = repository
      .createQueryBuilder("laporanPantau")
      .leftJoinAndSelect("laporanPantau.kecelakaanList", "kecelakaanList")
      .leftJoinAndSelect("laporanPantau.cuacaList", "cuacaList")
      .where(
        "(laporanPantau.isApproved = :isApproved OR laporanPantau.createdBy = :createdBy)",
        {
          isApproved: true,
          createdBy: req.auth?.userId,
        }
      );

    // Apply filters if provided
    if (type) {
      queryBuilder = queryBuilder.andWhere("laporanPantau.type = :type", {
        type,
      });
    }

    if (search) {
      queryBuilder = queryBuilder.andWhere("laporanPantau.nama ILIKE :search", {
        search: `%${search}%`,
      });
    }

    if (poskoTerpadu) {
      queryBuilder = queryBuilder.andWhere(
        "laporanPantau.poskoTerpadu = :poskoTerpadu",
        {
          poskoTerpadu,
        }
      );
    }

    if (event) {
      queryBuilder = queryBuilder.andWhere("laporanPantau.event = :event", {
        event,
      });
    }

    if (dateFrom) {
      queryBuilder = queryBuilder.andWhere(
        "laporanPantau.tanggalReport >= :dateFrom",
        { dateFrom }
      );
    }

    if (dateTo) {
      queryBuilder = queryBuilder.andWhere(
        "laporanPantau.tanggalReport <= :dateTo",
        {
          dateTo,
        }
      );
    }

    if (isApproved !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        "laporanPantau.isApproved = :isApproved",
        { isApproved }
      );
    }

    // Get total count for pagination info
    const totalCount = await queryBuilder.getCount();

    // Apply pagination
    queryBuilder = queryBuilder.skip(skip).take(limit);

    const reports = await queryBuilder.getMany();

    return res.status(200).json({
      success: true,
      data: reports,
      count: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (err) {
    console.error("Error fetching reports:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to fetch reports", 500));
  }
};
