import { Request, Response } from "express";
import Joi from "joi";
import { MODA } from "@/constants/moda";
import { getDataEventModa } from "@/services/apiHubnet";
import moment from "moment";
import { getAirlineOperators, getCrossingOperators, getSailingOperators, getTollOperators, getTopDestinationAirTransportation, getTopDestinationASDPTransportation, getTopDestinationLandTransportation, getTopDestinationSeaTransportation, getTopDestinationTrainTransportation, getTrainOperators } from "@/services/backendApiHubnet";
import { isEmpty } from "lodash";
import { AppDataSource } from "@/data-source";
import { DataOperator } from "@/entities/DataOperator";
import { AirlineOperatorData, CrossingOperatorData, SailingOperatorData, TollOperatorData, TrainOperatorData } from "@/services/type/backendApiHubnet";

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

export const syncOperatorHandler = async (req: Request, res: Response) => {
  const { error, value } = syncPayload.validate(req.body);

  if (error) {
    console.log(error.details, "-----error.details-----");
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
    const dataOperator = AppDataSource.getRepository(DataOperator);


    const data: Partial<DataOperator>[] = [];

    await dataOperator
      .createQueryBuilder()
      .delete()
      .where("data_operator.moda = :moda", { moda: modaLower })
      .andWhere("data_operator.event_id = :event", { event: selectedEvent.event })
      .andWhere("data_operator.date between :startDate and :endDate", { startDate: selectedEvent.tanggalAwal1, endDate: selectedEvent.tanggalAkhir1 })
      .execute();

    switch (modaLower) {
      case MODA.JALAN:
      // const { data: dataJalan } = await getTopDestinationLandTransportation({
      //   tanggal_akhir: selectedEvent.tanggalAkhir1,
      //   tanggal_awal: selectedEvent.tanggalAwal1,
      //   jenis: "",
      //   keyword: "",
      //   per_page: 9999999
      // });

      // if (!isEmpty(dataJalan)) {
      //   dataJalan?.forEach(element => {
      //     data.push({
      //       event: !isNaN(event) ? event : 0,
      //       moda: modaLower,
      //       passengers: isNaN(Number(element?.penumpang)) ? 0 : Number(element.penumpang),
      //       vehicle: isNaN(Number(element?.sarana)) ? 0 : Number(element.sarana),
      //       date: selectedEvent.tanggalAwal1,
      //       created_at: timestamp,
      //     });
      //   });
      // }
      // break;
      case MODA.ASDP:
        const { data: dataASDP } = await getCrossingOperators({
          tanggal_akhir: selectedEvent.tanggalAkhir1,
          tanggal_awal: selectedEvent.tanggalAwal1,
          keyword: "",
          per_page: 9999999
        });

        if (!isEmpty(dataASDP)) {
          dataASDP?.forEach((element: CrossingOperatorData) => {
            data.push({
              location: element.lokasi,
              operator: element.operator,
              pic_name: element.nama_pic,
              pic_phone: element.no_hp_pic,
              otp: element.otp,
              event: !isNaN(event) ? event : 0,
              moda: modaLower,
              passengers: isNaN(Number(element?.penumpang)) ? 0 : Number(element.penumpang),
              vehicle: isNaN(Number(element?.sarana)) ? 0 : Number(element.sarana),
              date: selectedEvent.tanggalAwal1,
              created_at: timestamp,
            });
          });
        }
        break;
      case MODA.LAUT:
        const { data: dataLaut } = await getSailingOperators({
          tanggal_akhir: selectedEvent.tanggalAkhir1,
          tanggal_awal: selectedEvent.tanggalAwal1,
          keyword: "",
          per_page: 9999999

        });

        if (!isEmpty(dataLaut)) {
          dataLaut?.forEach((element: SailingOperatorData) => {
            data.push({
              location: element.lokasi,
              operator: element.operator,
              pic_name: element.nama_pic,
              pic_phone: element.no_hp_pic,
              otp: element.otp,
              event: !isNaN(event) ? event : 0,
              moda: modaLower,
              passengers: isNaN(Number(element?.penumpang)) ? 0 : Number(element.penumpang),
              vehicle: isNaN(Number(element?.sarana)) ? 0 : Number(element.sarana),
              date: selectedEvent.tanggalAwal1,
              created_at: timestamp,
            });
          });
        }
        break;
      case MODA.UDARA:
        const { data: dataUdara } = await getAirlineOperators({
          tanggal_akhir: selectedEvent.tanggalAkhir1,
          tanggal_awal: selectedEvent.tanggalAwal1,
          keyword: "",
          per_page: 9999999

        });
        console.log(dataUdara, "------dataUdara-----");


        if (!isEmpty(dataUdara)) {
          dataUdara?.forEach((element: AirlineOperatorData) => {
            data.push({
              location: element.lokasi,
              operator: element.airlines_nm,
              pic_name: element.nama_pic,
              pic_phone: element.no_hp_pic,
              otp: element.otp,
              event: !isNaN(event) ? event : 0,
              moda: modaLower,
              passengers: isNaN(Number(element?.penumpang)) ? 0 : Number(element.penumpang),
              vehicle: isNaN(Number(element?.sarana)) ? 0 : Number(element.sarana),
              date: selectedEvent.tanggalAwal1,
              created_at: timestamp,
            });
          });
        }
        break;
      case MODA.STASIUN:
        const { data: dataStasiun } = await getTrainOperators({
          tanggal_akhir: selectedEvent.tanggalAkhir1,
          tanggal_awal: selectedEvent.tanggalAwal1,
          keyword: "",
          per_page: 9999999
        });

        if (!isEmpty(dataStasiun)) {
          dataStasiun?.forEach((element: TrainOperatorData) => {
            data.push({
              location: element.lokasi,
              operator: element.operator,
              pic_name: element.nama_pic,
              pic_phone: element.no_hp_pic,
              otp: element.otp,
              event: !isNaN(event) ? event : 0,
              moda: modaLower,
              passengers: isNaN(Number(element?.penumpang)) ? 0 : Number(element.penumpang),
              vehicle: isNaN(Number(element?.sarana)) ? 0 : Number(element.sarana),
              date: selectedEvent.tanggalAwal1,
              created_at: timestamp,
            });
          });
        }
        break;
      case MODA.TOLL:
        const { data: dataToll } = await getTollOperators({
          tanggal_akhir: selectedEvent.tanggalAkhir1,
          tanggal_awal: selectedEvent.tanggalAwal1,
          keyword: "",
          per_page: 9999999
        });

        if (!isEmpty(dataToll)) {
          dataToll?.forEach((element: TollOperatorData) => {
            data.push({
              location: element.lokasi,
              operator: element.operator,
              pic_name: element.nama_pic,
              pic_phone: element.no_hp_pic,
              otp: element.otp,
              event: !isNaN(event) ? event : 0,
              moda: modaLower,
              passengers: 0,
              vehicle: isNaN(Number(element?.jml_kendaraan)) ? 0 : Number(element.jml_kendaraan),
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
        await dataOperator
          .createQueryBuilder()
          .insert()
          .into(DataOperator)
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