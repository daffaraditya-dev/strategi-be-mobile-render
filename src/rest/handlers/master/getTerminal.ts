import { Request, Response } from "express";
import { getDataMasterPoTerminal, getDataMasterTerminal, queryTerminalSchema } from "./services/terminal.service";

export const getTerminalHandler = async (req: Request, res: Response) => {
  try {

    const { error, value } = queryTerminalSchema.validate(req.query);
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }
    const id_user = req.auth?.userId!;

    const { data, ...pagination } = await getDataMasterTerminal(value, id_user);

    return res.json({ status: true, data, pagination });

  } catch (err) {
    console.error("Error fetching terminal data:", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const getPoTerminalHandler = async (req: Request, res: Response) => {
  try {

    const { error, value } = queryTerminalSchema.validate(req.query);
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }
    const id_user = req.auth?.userId!;

    const { data, ...pagination } = await getDataMasterPoTerminal(value, id_user);

    return res.json({ status: true, data, pagination });

  } catch (err) {
    console.error("Error fetching terminal data:", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
