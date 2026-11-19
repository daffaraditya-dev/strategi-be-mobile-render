import { Request, Response } from "express";
import Joi from "joi";
import { getDataEventModa } from "@/services/apiHubnet";
import moment from "moment";
import { AppDataSource } from "@/data-source";
import { DataSync } from "@/entities/DataSync";

const syncPayload = Joi.object({
  startDate: Joi.string(),
  endDate: Joi.string(),
  moda: Joi.string(),
  event: Joi.string().optional(),
  syncType: Joi.string().valid("produksi", "matrik", "od", "operator")
    .required(),
}).custom((value, helpers) => {
  const start = moment(value.startDate, 'YYYY-MM-DD', true);
  const end = moment(value.endDate, 'YYYY-MM-DD', true);

  if (!start.isValid() || !end.isValid()) {
    return helpers.error('any.invalid', { message: 'Format tanggal tidak valid' });
  }

  if (!start.isSame(end) && (value.syncType === "od" || value.syncType === "operator")) {
    return helpers.error('any.invalid', { message: 'Tanggal awal dan end harus sama' });
  }

  return value;
});

export const syncJobsHandler = async (req: Request, res: Response) => {
  const { error, value } = syncPayload.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].context?.message || error.details[0].message });
  }

  try {
    const { startDate, endDate, moda, event, syncType } = value;
    const modaLower = moda.toLowerCase();
    const syncTypeCapitalize = syncType.toUpperCase();

    const selectedEvent = {
      event: 0,
      eventPantau: 0,
      tanggalAkhir1: startDate,
      tanggalAwal1: endDate,
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

    const timestamp = moment().format("YYYY-MM-DD HH:mm:ssZ");
    const dataSync = AppDataSource.getRepository(DataSync);

    const baseData: Partial<DataSync> = {
      moda: modaLower,
      startDate: selectedEvent.tanggalAwal1,
      endDate: selectedEvent.tanggalAkhir1,
      event: selectedEvent.event,
      status: "PENDING",
      type: syncTypeCapitalize,
      created_at: timestamp
    };

    await dataSync
      .createQueryBuilder()
      .insert()
      .into(DataSync)
      .values(baseData)
      .execute();


    return res.json({ status: true, data: baseData });

  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};

function getDynamicChunkSize(dataLength: number): number {
  if (dataLength <= 500) return 100;
  if (dataLength <= 5000) return 500;
  return 1000;
}