import { Request, Response } from "express";
import Joi from "joi";
import {
  getDataPantauProduksiRutin,
  getDataPantauProduksiSeasonal,
} from "@/services/apiHubnet";
import { mobillityByDate } from "@/rest/mapper/mobillityByDate";
import { RANGE_DATE } from "@/constants/range";
import { mapDataByRanges } from "@/rest/mapper/mapDataByDateRange";
import { MODA } from "@/constants/moda";
import { mapRegionNodeModa } from "@/rest/mapper/mapRegionNodeModa";
import { RegionalResponse } from "./type/common";
import { AppDataSource } from "@/data-source";
import { MstProvinsi } from "@/entities/MstProvinsi";
import { mapDataSeasonal } from "@/rest/mapper/common";

const regionalSeasonalRequest = Joi.object({
  event: Joi.string().required(),
  provinsi: Joi.string().required(),
  type: Joi.string().optional(),
  moda: Joi.string().optional().default(MODA.JALAN),
});

export const regionalSeasonalHandler = async (req: Request, res: Response) => {
  const { error, value } = regionalSeasonalRequest.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { event, provinsi, type } = value;

    const dataAll = await getDataPantauProduksiSeasonal({
      event,
      provinsi: provinsi ?? "",
      moda: value.moda,
      endpoints: ["data-pantau", "data-produksi", "data-produksi-pertitik"],
    });
    const data = mapDataSeasonal(event, dataAll);

    let provinceName = "";
    if (provinsi) {
      const provinceRepository = AppDataSource.getRepository(MstProvinsi);
      provinceName =
        (await provinceRepository
          .findOne({
            where: {
              kodeBps: provinsi,
            },
          })
          .then((data) => data?.namaProvinsi)) ?? "";
    }

    const graphData = mobillityByDate(data, value.moda, true);

    const response: RegionalResponse = {
      status: true,
      message: "Success",
      data: {
        graph: mapDataByRanges(graphData, [
          RANGE_DATE.WEEKLY,
          RANGE_DATE.MONTHLY,
          RANGE_DATE.YEARLY,
        ]),
        list: mapRegionNodeModa(data, value.moda, type, provinceName),
      },
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
