import { getDataMasterKapalLaut, querySchema } from "./services/laut.service";
import { Request, Response } from "express";

export const getMasterKapalLautHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { error, value } = querySchema.validate(req.query);
    let listIdKapalArray = [];

    if (value?.listIdKapal) {
      listIdKapalArray = value.listIdKapal.split(",").filter(Boolean);
    }
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }
    const id_user = req.auth?.userId!;
    const { data, ...pagination } = await getDataMasterKapalLaut({
      ...value,
      listIdKapal: listIdKapalArray,
    });

    return res.json({ status: true, data, pagination });
  } catch (err) {
    console.error("Error fetching terminal data:", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
