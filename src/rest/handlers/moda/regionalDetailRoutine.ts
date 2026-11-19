import { Request, Response } from "express";
import Joi from "joi";
import { getDataPantauProduksiRutin } from "@/services/apiHubnet";
import { RANGE_DATE } from "@/constants/range";
import { mapDataByRanges } from "@/rest/mapper/mapDataByDateRange";
import { MODA } from "@/constants/moda";
import { RegionalDetailResponse } from "./type/common";
import { mobillityPointByDate } from "@/rest/mapper/mobillityPointByDate";

const regionalDetailRoutineRequest = Joi.object({
  tanggalAwal1: Joi.string().required(),
  tanggalAkhir1: Joi.string().required(),
  type: Joi.string().optional(),
  moda: Joi.string().optional().default(MODA.JALAN),
});

export const regionalDetailRoutineHandler = async (
  req: Request,
  res: Response
) => {
  const { idLocation } = req.params;
  const { error, value } = regionalDetailRoutineRequest.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { tanggalAwal1, tanggalAkhir1, type } = value;

    const data = await getDataPantauProduksiRutin({
      tanggal_awal_1: tanggalAwal1,
      tanggal_akhir_1: tanggalAkhir1,
      moda: value.moda,
      endpoints: ["data-pantau", "data-produksi-pertitik"],
    });

    const graphData = mobillityPointByDate(data, value.moda);
    const graphDataFiltered = graphData.filter(
      (item) => item.idLokasi?.toString() === idLocation
    );

    const response: RegionalDetailResponse = {
      status: true,
      message: "Success",
      data: mapDataByRanges(graphDataFiltered, [
        RANGE_DATE.WEEKLY,
        RANGE_DATE.MONTHLY,
        RANGE_DATE.YEARLY,
      ]),
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
