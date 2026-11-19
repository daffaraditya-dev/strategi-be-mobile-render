import { Request, Response } from "express";
import Joi from "joi";
import { getODDetail, getODSummary, getTanggalEvent } from "./services/summary.service";
import { getDataEventModa } from "@/services/apiHubnet";
import { getSiasatiDataPantau } from "@/services/apiSiasati";
import { find, has, mapValues, reduce } from "lodash";
import moment from "moment";
// import { sumDataPertitik } from "./util/sumData";
// import { createProduksiPertitik } from "@/constants/sampleData";

const odDetailHandlerParam = Joi.object({
  tanggalAwal1: Joi.string(),
  tanggalAkhir1: Joi.string(),
  idOrigin: Joi.string(),
  idDestination: Joi.string(),
  event: Joi.number(),
  moda: Joi.string().required(),
  reportType: Joi.string().valid("daily", "weekly", "monthly", "yearly")
    .required(),
  type: Joi.array().items(Joi.string()).single()
});

export const odDetailHandler = async (req: Request, res: Response) => {
  const { error, value } = odDetailHandlerParam.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { moda, search, tanggalAwal1, tanggalAkhir1, event, idDestination, reportType, idOrigin, type } = value;
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
        selectedEvent.event = tmpSelected.id;
        selectedEvent.eventPantau = tmpSelected.id;
        selectedEvent.tanggalAwal1 = tmpSelected.tanggal_mulai;
        selectedEvent.tanggalAkhir1 = tmpSelected.tanggal_selesai;
      }
    }

    const tanggalEvent = await getTanggalEvent({
      tanggalAkhir1: selectedEvent.tanggalAkhir1,
      tanggalAwal1: selectedEvent.tanggalAwal1,
      event: selectedEvent.eventPantau,
      moda: modaLower,
    });

    const data = await getODDetail({ type, event: 0, moda: modaLower, tanggalAkhir1: selectedEvent.tanggalAkhir1, tanggalAwal1: selectedEvent.tanggalAwal1, reportType, idOrigin, idDestination });

    console.log(event, '-----event----', data["daily"]);

    if (has(data, "daily") && event !== 0 && event) {

      const date = reduce(
        data["daily"],
        (result: Record<string, typeof value>, value, key) => {
          const itemDate = find(tanggalEvent, item => moment(item.date).isSame(moment(key), 'day'));

          if (itemDate?.label) {
            result[String(itemDate.label)] = value;
          }
          return result;
        },
        {} as Record<string, typeof data["daily"][keyof typeof data["daily"]]>
      );

      return res.json({ status: true, data: { ...data, daily: date } });
    }

    return res.json({ status: true, data });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};
