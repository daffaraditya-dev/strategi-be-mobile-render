import { Request, Response } from "express";
import Joi from "joi";
import { getODSummary } from "./services/summary.service";
import { getDataEventModa } from "@/services/apiHubnet";
// import { sumDataPertitik } from "./util/sumData";
// import { createProduksiPertitik } from "@/constants/sampleData";

const odSummaryHandlerParam = Joi.object({
  search: Joi.string().allow(""),
  tanggalAwal1: Joi.string(),
  tanggalAkhir1: Joi.string(),
  event: Joi.number(),
  moda: Joi.string().required(),
  page: Joi.string(),
  pageSize: Joi.string(),
  sort: Joi.string().valid("asc", "desc").optional(),
  type: Joi.array().items(Joi.string()).single()
});

export const odSummaryHandler = async (req: Request, res: Response) => {
  const { error, value } = odSummaryHandlerParam.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { moda, search, tanggalAwal1, tanggalAkhir1, event, page, pageSize, sort, type } = value;
    const modaLower = moda.toLowerCase();

    const selectedEvent = {
      event: 0,
      eventPantau: 0,
      tanggalAkhir1: tanggalAkhir1,
      tanggalAwal1: tanggalAwal1,
    };

    if (event) {
      const res = await getDataEventModa(modaLower);
      const tmpSelected = res?.data?.find((item) => item.id === Number(event));

      if (res?.data && tmpSelected) {
        // selectedEvent.event = tmpSelected.id;
        // selectedEvent.eventPantau = tmpSelected.id;
        selectedEvent.tanggalAwal1 = tmpSelected.tanggal_mulai;
        selectedEvent.tanggalAkhir1 = tmpSelected.tanggal_selesai;
      }
    }

    const data = await getODSummary({ event: selectedEvent.event, moda: modaLower, tanggalAkhir1: selectedEvent.tanggalAkhir1, tanggalAwal1: selectedEvent.tanggalAwal1, type, limit: pageSize, page, search });

    return res.json({ status: true, data });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};
