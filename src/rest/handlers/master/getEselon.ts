import { Request, Response } from "express";
import { findFilterCustomRole, listRole } from "./services/eselon.service";
import Joi from "joi";

export const bodySchemaRole = Joi.object({
  search_term: Joi.string().allow("").optional(),
});

export const getEselonHandler = async (req: Request, res: Response) => {
  try {
    const { error, value } = bodySchemaRole.validate(req.query);

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }
    console.log("===== name =====", value.search_term);

    const { data, total, status, message } = await findFilterCustomRole(
      value.search_term ?? ""
    );

    return res.json({
      status,
      message,
      data,
      pagination: {
        total,
      },
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
