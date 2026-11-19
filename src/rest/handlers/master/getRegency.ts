import { AppDataSource } from "@/data-source";
import { MstKabupaten } from "@/entities/MstKabupaten";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import Joi from "joi";

const getRegencyRequest = Joi.object({
  idProvinsi: Joi.number(),
});

export const getRegencyHandler = async (req: Request, res: Response) => {
  const { error, value } = getRegencyRequest.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json(createErrorResponse(error.details.map((err) => err.message)));
  }

  try {
    const repository = AppDataSource.getRepository(MstKabupaten);
    let whereClause: any = {};
    if (value.idProvinsi) {
      whereClause.idProvinsi = value.idProvinsi;
    }

    const record = await repository.find({
      where: whereClause,
    });
    res.json({ status: true, data: record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
