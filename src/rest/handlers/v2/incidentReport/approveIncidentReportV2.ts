import { Request, Response } from "express";
import Joi from "joi";
import { approveIncidentReportV2 } from "./services/approval.service";

export const approvalIncidentReportSchema = Joi.object({
  statusApproval: Joi.string()
    .valid("VERIF_2", "VERIF_3", "TINDAK_LANJUT", "CLOSED", "REJECT")
    .required(),
  approvalNote: Joi.string().allow("").optional(),
  tanggalVerifikasi: Joi.string().optional(),
  dataPendukung: Joi.array().items(Joi.string()).optional(),
});

export const putApproveIncidentReportV2Handler = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const { error, value } = approvalIncidentReportSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId;

    const result = await approveIncidentReportV2({ ...value }, id, id_user!);

    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in approveIncidentReportV2Handler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
