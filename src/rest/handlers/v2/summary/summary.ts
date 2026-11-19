import { Request, Response } from "express";
import Joi from "joi";
import { SummaryResponse } from "./type/common";
import { MODA } from "@/constants/moda";
import { recapData, summaryData } from "@/repositories/dataRecap";

const routineRequest = Joi.object({
  tanggalAwal1: Joi.string(),
  tanggalAkhir1: Joi.string(),
  event: Joi.string(),
});

export const routineHandler = async (req: Request, res: Response) => {
  const { error, value } = routineRequest.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { tanggalAwal1, tanggalAkhir1, event } = value;
    const today = new Date().toISOString().split("T")[0];
    const startDate = tanggalAwal1 || today;
    const endDate = tanggalAkhir1 || today;

    const dataMatrikSum = await summaryData({
      endDate,
      startDate,
      sort: "DESC",
      event: Number(event) === 0 || isNaN(event) ? null : event,
    });

    const response: SummaryResponse = {
      data: dataMatrikSum.data,
      status: true,
      filter: {
        ...value,
        tanggalAwal1: startDate,
        tanggalAkhir1: endDate,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};