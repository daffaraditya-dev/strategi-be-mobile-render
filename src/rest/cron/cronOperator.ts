import { MODA } from "@/constants/moda";
import { AppDataSource } from "@/data-source";
import { DataOperator } from "@/entities/DataOperator";
import { getDataEventModa } from "@/services/apiHubnet";
import { getAirlineOperators, getCrossingOperators, getSailingOperators, getTollOperators, getTrainOperators } from "@/services/backendApiHubnet";
import { AirlineOperatorData, CrossingOperatorData, SailingOperatorData, TollOperatorData, TrainOperatorData } from "@/services/type/backendApiHubnet";
import { Moda } from "@/type/produksi.titik.type";
import { isEmpty } from "lodash";
import moment from "moment";

export const cronOperator = async ({ moda, event, startDate, endDate }: { moda: Moda; event?: number; startDate?: string; endDate?: string; }) => {
  try {
    const today = new Date();
    const tanggalAwal1 = startDate || today.toISOString().split('T')[0]; // YYYY-MM-DD
    const tanggalAkhir1 = endDate || today.toISOString().split('T')[0];   // YYYY-MM-DD

    const totalStart = performance.now();
    const modaLower = moda.toLowerCase() as Moda;

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
      //       event:event && !isNaN(event) ? event : 0,
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
              event: event && !isNaN(event) ? event : 0,
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
              event: event && !isNaN(event) ? event : 0,
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
              event: event && !isNaN(event) ? event : 0,
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
              event: event && !isNaN(event) ? event : 0,
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
              event: event && !isNaN(event) ? event : 0,
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
        return null;
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

    const totalEnd = performance.now();
    const totalDurationSeconds = (totalEnd - totalStart) / 1000;

    // Ringkasan akhir
    console.log("========== RINGKASAN PROSES ==========");
    console.log(`✅ Total lokasi diproses: ${data.length}`);
    console.log(`⏱️ Total waktu proses: ${totalDurationSeconds.toFixed(2)} detik`);
    console.log("=======================================");


  } catch (error) {
    console.error('Error during scheduled task execution:', error);

  }
};

function getDynamicChunkSize(dataLength: number): number {
  if (dataLength <= 500) return 100;
  if (dataLength <= 5000) return 500;
  return 1000;
}