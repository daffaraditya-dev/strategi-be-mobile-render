import { getDataMasterKapalAsdp, querySchema } from "./services/asdp.service";
import { Request, Response } from "express";

export const getMasterKapalAsdpHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { error, value } = querySchema.validate(req.query);
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }
    const id_user = req.auth?.userId!;
    const { data, ...pagination } = await getDataMasterKapalAsdp(
      value,
    );

    return res.json({ status: true, data, pagination });
  } catch (err) {
    console.error("Error fetching terminal data:", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
