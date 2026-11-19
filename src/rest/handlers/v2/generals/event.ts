import { Request, Response } from "express";
import Joi from "joi";
import { getDataEvent, getDataEventModa } from "@/services/apiHubnet";
import moment from "moment";
import { Moda } from "@/type/produksi.titik.type";
import { isEmpty } from "lodash";
// import { sumDataPertitik } from "./util/sumData";
// import { createProduksiPertitik } from "@/constants/sampleData";

const eventParam = Joi.object({
  moda: Joi.string().optional(),
  date: Joi.string().optional(),
});

export const eventCheckHandler = async (req: Request, res: Response) => {
  const { error, value } = eventParam.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { moda, date } = value;
    const modaLower = (moda?.toLowerCase() as Moda) || "";
    const dateParam = date ? moment(date) : moment();

    const dataEventModa = modaLower && (await getDataEventModa(modaLower));
    const dataEvent = await getDataEvent();
    // const today = moment();

    const tmpSelected = (moda ? dataEventModa : dataEvent)?.data?.find((item) =>
      dateParam.isBetween(
        moment(item.tanggal_mulai, "YYYY-MM-DD"),
        moment(item.tanggal_selesai, "YYYY-MM-DD"),
        "day",
        "[]"
      )
    );

    return res.json({
      status: true,
      date: dateParam,
      isEvent: !isEmpty(tmpSelected),
      data: tmpSelected || {},
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error", err });
  }
};
