import { AppDataSource } from "@/data-source";
import { Request, Response } from "express";
import Joi from "joi";
import { ILike } from "typeorm";
import { createErrorResponse } from "@/utils/error";
import { Posko } from "@/entities/Posko";
import { getDataEvent } from "@/services/apiHubnet";
import { toCamelCase } from "@/utils/convert";
import { isValidJSON } from "@/utils/validJson";

const getPoskoRequest = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
  idJenisPosko: Joi.number().integer(),
  namaPosko: Joi.string(),
  idEvent: Joi.string().uuid(),
  masaPantauAwal: Joi.date().allow(null),
  masaPantauAkhir: Joi.date().allow(null),
  titikPantau: Joi.string(),
});

export const getPoskoHandler = async (req: Request, res: Response) => {
  try {
    const repository = AppDataSource.getRepository(Posko);
    const eventData = await getDataEvent();

    const { error, value } = getPoskoRequest.validate(req.query);
    if (error) {
      return res
        .status(400)
        .json(createErrorResponse(error.details.map((err) => err.message)));
    }

    const {
      page,
      limit,
      idJenisPosko,
      namaPosko,
      idEvent,
      masaPantauAwal,
      masaPantauAkhir,
      titikPantau,
    } = value;
    const skip = (page - 1) * limit;

    let whereClause: any = {};
    if (idJenisPosko) whereClause.idJenisPosko = idJenisPosko;
    if (namaPosko) whereClause.namaPosko = ILike(`%${namaPosko}%`);
    if (idEvent) whereClause.idEvent = idEvent;
    if (masaPantauAwal) whereClause.masaPantau = new Date(masaPantauAwal);
    if (masaPantauAkhir) whereClause.masaPantau = new Date(masaPantauAkhir);
    if (titikPantau) whereClause.titikPantau = ILike(`%${titikPantau}%`);

    const totalCount = await repository.count({ where: whereClause });
    const data = await repository.find({
      where: whereClause,
      skip,
      take: limit,
      relations: ["jenisPosko", "pesertaPosko"],
      order: { createDate: "DESC" },
    });

    const resultData = data.map((item) => ({
      ...item,
      lampiran: isValidJSON(item.lampiran) ? JSON.parse(item.lampiran) : [],
      event: toCamelCase(
        eventData.data.find((event) => event.id === item.idEvent)
      ),
    }));

    return res.status(200).json({
      success: true,
      data: resultData,
      count: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to fetch data", 500));
  }
};
