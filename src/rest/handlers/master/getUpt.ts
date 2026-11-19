import { Request, Response } from "express";
import Joi from "joi";
import { getStrukturOrganisasiSik } from "./services/upt.service";
import { eselonMapping } from "@/utils/eselonMapping";

export const querySchemaEselon = Joi.object({
  page: Joi.number().optional().default(1),
  perPage: Joi.number().optional().default(1000),
  name: Joi.string().allow("").optional(),
});

export const getUptHandler = async (req: Request, res: Response) => {
  try {
    const { error, value } = querySchemaEselon.validate(req.query);

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }

    const eselonTypeName = eselonMapping(value.name);

    const { data, total, code, status } = await getStrukturOrganisasiSik({
      page: value.page,
      perPage: value.perPage,
      name: eselonTypeName || "",
    });

    return res.json({
      status,
      data,
      pagination: {
        total,
        page: value.page,
        perPage: value.perPage,
      },
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
