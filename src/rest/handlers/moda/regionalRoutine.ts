import { Request, Response } from "express";
import Joi from "joi";
import { getDataPantauProduksiRutin } from "@/services/apiHubnet";
import { mobillityByDate } from "@/rest/mapper/mobillityByDate";
import { RANGE_DATE } from "@/constants/range";
import { mapDataByRanges } from "@/rest/mapper/mapDataByDateRange";
import { MODA } from "@/constants/moda";
import { mapRegionNodeModa } from "@/rest/mapper/mapRegionNodeModa";
import { RegionalResponse } from "./type/common";
import { AppDataSource } from "@/data-source";
import { MstProvinsi } from "@/entities/MstProvinsi";

const regionalRoutineRequest = Joi.object({
  tanggalAwal1: Joi.string().required(),
  tanggalAkhir1: Joi.string().required(),
  provinsi: Joi.string().required(),
  type: Joi.string().optional(),
  moda: Joi.string().optional().default(MODA.JALAN),
});

export const regionalRoutineHandler = async (req: Request, res: Response) => {
  const { error, value } = regionalRoutineRequest.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { tanggalAwal1, tanggalAkhir1, provinsi, type } = value;

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

    const data = await getDataPantauProduksiRutin({
      tanggal_awal_1: tanggalAwal1,
      tanggal_akhir_1: tanggalAkhir1,
      provinsi: provinsi ?? "",
      moda: value.moda,
      endpoints: ["data-pantau", "data-produksi", "data-produksi-pertitik"],
    });

    const graphData = mobillityByDate(data, value.moda);

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
