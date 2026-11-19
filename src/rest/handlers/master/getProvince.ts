import { AppDataSource } from "@/data-source";
import { MstProvinsi } from "@/entities/MstProvinsi";
import { Request, Response } from "express";
import Joi from "joi";
import { In } from "typeorm";

export const queryProvinsi = Joi.object({
  listProvinsiId: Joi.string().allow("").optional(),
});

export const getProvincesHandler = async (req: Request, res: Response) => {
  try {
    const { error, value } = queryProvinsi.validate(req.query);

    let listProvinsiArray = [];

    if (value?.listProvinsiId) {
      listProvinsiArray = value.listProvinsiId.split(',').filter(Boolean).map(Number);
    }


    const repository = AppDataSource.getRepository(MstProvinsi);
    const where = listProvinsiArray.length > 0
      ? { id: In(listProvinsiArray) }
      : {};
    const record = await repository.find({
      where
    });
    res.json({ status: true, data: record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
