import {
  getDataMasterKapalAsdp,
  querySchemaKapalAsdp,
} from "./services/asdp.service";
import { Request, Response } from "express";

export const getMasterKapalAsdpHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { error, value } = querySchemaKapalAsdp.validate(req.query);

    let lintasanArray = [];
    let listIdKapalArray = [];

    if (value?.listLintasan) {
      lintasanArray = value.listLintasan.split(',').filter(Boolean);
    }
    if (value?.listIdKapal) {
      listIdKapalArray = value.listIdKapal.split(',').filter(Boolean);
    }
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }
    const id_user = req.auth?.userId!;
    const { data, ...pagination } = await getDataMasterKapalAsdp(
      { ...value, listLintasan: lintasanArray, listIdKapal: listIdKapalArray },
    );

    return res.json({ status: true, data, pagination });
  } catch (err) {
    console.error("Error fetching terminal data:", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
