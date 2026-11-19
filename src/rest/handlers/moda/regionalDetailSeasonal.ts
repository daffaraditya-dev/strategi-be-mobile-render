import { Request, Response } from "express";
import Joi from "joi";
import { getDataPantauProduksiSeasonal } from "@/services/apiHubnet";
import { RANGE_DATE } from "@/constants/range";
import { mapDataByRanges } from "@/rest/mapper/mapDataByDateRange";
import { MODA } from "@/constants/moda";
import { RegionalDetailResponse } from "./type/common";
import { mobillityPointByDate } from "@/rest/mapper/mobillityPointByDate";
import { mapDataSeasonal } from "@/rest/mapper/common";

const regionalDetailSeasonalRequest = Joi.object({
  event: Joi.string().required(),
  type: Joi.string().optional(),
  moda: Joi.string().optional().default(MODA.JALAN),
});

export const regionalDetailSeasonalHandler = async (
  req: Request,
  res: Response
) => {
  const { idLocation } = req.params;
  const { error, value } = regionalDetailSeasonalRequest.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { event, type } = value;

    const dataAll = await getDataPantauProduksiSeasonal({
      event,
      moda: value.moda,
      endpoints: ["data-pantau", "data-produksi", "data-produksi-pertitik"],
    });
    const data = mapDataSeasonal(event, dataAll);

    const graphData = mobillityPointByDate(data, value.moda, true);
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
