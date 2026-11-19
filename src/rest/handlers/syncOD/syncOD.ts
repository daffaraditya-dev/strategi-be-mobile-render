import { Request, Response } from "express";
import Joi from "joi";
import { MODA } from "@/constants/moda";
import { getDataEventModa } from "@/services/apiHubnet";
import { DataOD } from "@/entities/DataOD";
import moment from "moment";
import { getTopDestinationAirTransportation, getTopDestinationASDPTransportation, getTopDestinationLandTransportation, getTopDestinationSeaTransportation, getTopDestinationTrainTransportation } from "@/services/backendApiHubnet";
import { isEmpty } from "lodash";
import { AppDataSource } from "@/data-source";

const syncPayload = Joi.object({
  tanggalAwal1: Joi.string(),
  tanggalAkhir1: Joi.string(),
  moda: Joi.string(),
  event: Joi.string().optional(),
}).custom((value, helpers) => {
  const awal = moment(value.tanggalAwal1, 'YYYY-MM-DD', true);
  const akhir = moment(value.tanggalAkhir1, 'YYYY-MM-DD', true);

  if (!awal.isValid() || !akhir.isValid()) {
    return helpers.error('any.invalid', { message: 'Format tanggal tidak valid' });
  }

  if (!awal.isSame(akhir)) {
    return helpers.error('any.invalid', { message: 'Tanggal awal dan akhir harus sama' });
  }

  return value;
});

export const syncODHandler = async (req: Request, res: Response) => {
  const { error, value } = syncPayload.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { tanggalAwal1, tanggalAkhir1, moda, event } = value;
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

    const timestamp = moment().format("YYYY-MM-DD HH:mm:ssZ");
    const dataOD = AppDataSource.getRepository(DataOD);


    const data: Partial<DataOD>[] = [];

    await dataOD
      .createQueryBuilder()
      .delete()
      .where("data_od.moda = :moda", { moda: modaLower })
      .andWhere("data_od.event_id = :event", { event: selectedEvent.event })
      .andWhere("data_od.date between :startDate and :endDate", { startDate: selectedEvent.tanggalAwal1, endDate: selectedEvent.tanggalAkhir1 })
      .execute();

    switch (modaLower) {
      case MODA.JALAN:
        const { data: dataJalan } = await getTopDestinationLandTransportation({
          tanggal_akhir: selectedEvent.tanggalAkhir1,
          tanggal_awal: selectedEvent.tanggalAwal1,
          jenis: "",
          keyword: "",
          per_page: 9999999
        });

        if (!isEmpty(dataJalan)) {
          dataJalan?.forEach(element => {
            data.push({
              event: !isNaN(event) ? event : 0,
              moda: modaLower,
              destinationId: element.destination,
              destinationName: element?.destination_name || "",
              destinationType: !element.jenis ? "" : element.jenis === "domestik" ? "DOM" : "INTL",
              destinationCity: "",
              originId: element?.origin || "",
              originName: element?.origin_name,
              originType: !element.jenis ? "" : element.jenis === "domestik" ? "DOM" : "INTL",
              originCity: "",
              passengers: isNaN(Number(element?.penumpang)) ? 0 : Number(element.penumpang),
              vehicle: isNaN(Number(element?.sarana)) ? 0 : Number(element.sarana),
              date: selectedEvent.tanggalAwal1,
              created_at: timestamp,
            });
          });
        }
        break;
      case MODA.ASDP:
        const { data: dataASDP } = await getTopDestinationASDPTransportation({
          tanggal_akhir: selectedEvent.tanggalAkhir1,
          tanggal_awal: selectedEvent.tanggalAwal1,
          keyword: "",
          per_page: 9999999
        });

        if (!isEmpty(dataASDP)) {
          dataASDP?.forEach(element => {
            data.push({
              event: !isNaN(event) ? event : 0,
              moda: modaLower,
              destinationId: String(element?.destination) || "",
              destinationName: element?.destination_name,
              destinationType: !element?.jenis ? "" : element.jenis === "domestik" ? "DOM" : "INTL",
              destinationCity: "",
              originId: String(element?.origin) || "",
              originName: element?.origin_name || "-",
              originType: !element.jenis ? "" : !element.jenis ? "" : element.jenis === "domestik" ? "DOM" : "INTL",
              originCity: "",
              passengers: isNaN(Number(element?.penumpang)) ? 0 : Number(element.penumpang),
              vehicle: isNaN(Number(element?.sarana)) ? 0 : Number(element.sarana),
              date: selectedEvent.tanggalAwal1,
              created_at: timestamp,
            });
          });
        }
        break;
      case MODA.LAUT:
        const { data: dataLaut } = await getTopDestinationSeaTransportation({
          tanggal_akhir: selectedEvent.tanggalAkhir1,
          tanggal_awal: selectedEvent.tanggalAwal1,
          keyword: "",
          jenis: "",
          per_page: 9999999

        });

        if (!isEmpty(dataLaut)) {
          dataLaut?.forEach(element => {
            data.push({
              event: !isNaN(event) ? event : 0,
              moda: modaLower,
              destinationId: String(element.id_destination),
              destinationName: element?.destination_name || "",
              destinationCity: "",
              destinationType: !element.jenis ? "" : element.jenis === "domestik" ? "DOM" : "INTL",
              originId: String(element.id_origin),
              originName: element?.origin_name || "",
              originCity: "",
              originType: !element.jenis ? "" : element.jenis === "domestik" ? "DOM" : "INTL",
              passengers: isNaN(Number(element?.penumpang)) ? 0 : Number(element.penumpang),
              vehicle: isNaN(Number(element?.sarana)) ? 0 : Number(element.sarana),
              date: selectedEvent.tanggalAwal1,
              created_at: timestamp,
            });
          });
        }
        break;
      case MODA.UDARA:
        const { data: dataUdara } = await getTopDestinationAirTransportation({
          tanggal_akhir: selectedEvent.tanggalAkhir1,
          tanggal_awal: selectedEvent.tanggalAwal1,
          keyword: "",
          jenis: "",
          per_page: 9999999

        });

        if (!isEmpty(dataUdara)) {
          dataUdara?.forEach(element => {
            data.push({
              event: !isNaN(event) ? event : 0,
              moda: modaLower,
              destinationId: String(element.destination),
              destinationName: element?.destination_name || "",
              destinationType: !element.jenis ? "" : element.jenis === "domestik" ? "DOM" : "INTL",
              originCity: "",
              originId: String(element.origin),
              originName: element?.origin_name || "",
              destinationCity: "",
              originType: !element.jenis ? "" : element.jenis === "domestik" ? "DOM" : "INTL",
              passengers: isNaN(Number(element?.penumpang)) ? 0 : Number(element.penumpang),
              vehicle: isNaN(Number(element?.sarana)) ? 0 : Number(element.sarana),
              date: selectedEvent.tanggalAwal1,
              created_at: timestamp,
            });
          });
        }
        break;
      case MODA.STASIUN:
        const { data: dataStasiun } = await getTopDestinationTrainTransportation({
          tanggal_akhir: selectedEvent.tanggalAkhir1,
          tanggal_awal: selectedEvent.tanggalAwal1,
          keyword: "",
          per_page: 9999999
        });

        if (!isEmpty(dataStasiun)) {
          dataStasiun?.forEach(element => {
            data.push({
              event: !isNaN(event) ? event : 0,
              moda: modaLower,
              destinationId: String(element?.destination || ""),
              destinationName: element.destination_name,
              destinationType: "",
              destinationCity: "",
              originId: String(element?.origin || ""),
              originName: element?.origin_name,
              originType: "",
              originCity: "",
              passengers: isNaN(Number(element?.penumpang)) ? 0 : Number(element.penumpang),
              vehicle: isNaN(Number(element?.sarana)) ? 0 : Number(element.sarana),
              date: selectedEvent.tanggalAwal1,
              created_at: timestamp,
            });
          });
        }
        break;
      default:
        return res.json({ status: true, data: {} });
    }

    if (data.length > 0) {
      const chunkSize = getDynamicChunkSize(data.length);
      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        await dataOD
          .createQueryBuilder()
          .insert()
          .into(DataOD)
          .values(chunk)
          .execute();
      }



    }

    return res.json({ status: true, data: { moda: moda, data } });

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