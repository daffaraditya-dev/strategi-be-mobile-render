import { Request, Response } from "express";
import Joi from "joi";
import { approveTindakLanjut } from "./services/approval.service";

export const approvalTindakLanjutSchema = Joi.object({
  statusApproval: Joi.string()
    .valid(
      "PENDING_VERIFIKASI_2",
      "PENDING_VERIFIKASI_3",
      "VERIFIED",
      "REJECTED",
    )
    .required(),
    tanggalVerifikasi: Joi.string().optional(),
});

export const putApproveTindakLanjutHandler = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const { error, value } = approvalTindakLanjutSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId;

    const result = await approveTindakLanjut({ ...value }, id, id_user!);

    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in approveTindakLanjutHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
