import { getDataPantauProduksiRutin, getDataPantauProduksiSeasonal } from "@/services/apiHubnet";
import { decodeProduksiSeasonal } from "@/utils/produksiDecoder";
import { Request, Response } from "express";
import Joi from "joi";
import { mergeLocation } from "./util/mergeLocation";
// import { sumDataPertitik } from "./util/sumData";
import { sumByPeriod } from "./util/sumByPeriod";
import { matchSorter, rankings } from "match-sorter";
import { paginate } from "@/utils/paginate";
import { mergeTanggalEventToData } from "@/utils/mergeEventDate";
import { Moda, ProduksiPertitik } from "@/type/produksi.titik.type";
import { isArray, transform } from "lodash";
import { createProduksiPertitik } from "@/constants/sampleData";
import moment from "moment";
import { AppDataSource } from "@/data-source";
import { MstProvinsi } from "@/entities/MstProvinsi";
import { getSiasatiDataPantau, getSiasatiProduksiPertitik } from "@/services/apiSiasati";
// import { createProduksiPertitik } from "@/constants/sampleData";

const transportationHubRequest = Joi.object({
  template: Joi.array()
    .items(Joi.string().valid("raw", "chart"))
    .required(),
  search: Joi.string().allow(""),
  idLocation: Joi.string().allow(""),
  tanggalAwal1: Joi.string(),
  tanggalAkhir1: Joi.string(),
  event: Joi.number(),
  moda: Joi.string().required(),
  page: Joi.string(),
  pageSize: Joi.string(),
  sort: Joi.string().valid("asc", "desc").optional(),
  reportType: Joi.string().valid("daily", "weekly", "monthly", "yearly")
    .required(),
  useSample: Joi.string().valid("true", "false").optional(),
  namaProvinsi: Joi.string(),
});

export const transportationHubSeasonalHandler = async (req: Request, res: Response) => {
  const { error, value } = transportationHubRequest.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { template, event, idLocation, moda, search, reportType, tanggalAwal1, tanggalAkhir1, page, pageSize, sort, useSample = 'false', namaProvinsi } = value;
    const modaLower = moda.toLowerCase();

    if (useSample === 'true') {

      const today = moment();
      const startDate = tanggalAwal1 || moment(today).subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
      const endDate = tanggalAkhir1 || moment(today).subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
      const { produksi_pertitik, tanggal_event, titik_pantau } = createProduksiPertitik(startDate, endDate, modaLower);

      const mergeTitikPantau = transform(
        produksi_pertitik,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc: any, value: any, key: string) => {
          if (
            key !== 'tanggal_event' &&
            isArray(value)
          ) {
            acc[key] = mergeTanggalEventToData(
              value,
              tanggal_event
            );
          } else {
            acc[key] = value;
          }
        },
        {}
      ) as ProduksiPertitik;


      const data = mergeLocation({ dataPantau: titik_pantau, dataProduksiPertitik: mergeTitikPantau, provinceName: "" });

      const sumResult: any[] = sumByPeriod({ data: data, moda: modaLower, groupByType: reportType, template: template, sort });

      // filtered
      const filtered = search
        ? matchSorter(sumResult, search, { keys: ['nama'], threshold: rankings.CONTAINS })
        : sumResult;
      const filteredLokasi = idLocation
        ? matchSorter(filtered, idLocation, { keys: ['id_lokasi'], threshold: rankings.EQUAL })
        : filtered;

      const paginateData = paginate(filteredLokasi, page, pageSize);

      return res.json({ status: true, ...paginateData });

    }

    const whereClause: any = {};

    if (idLocation !== undefined && idLocation !== null && idLocation !== "null" && idLocation !== undefined) {
      whereClause.kodeBps = idLocation;
    }

    if (namaProvinsi !== undefined && namaProvinsi !== null && namaProvinsi !== "null" && namaProvinsi !== undefined) {
      whereClause.namaProvinsi = namaProvinsi;
    }


    const repoProvinsi = AppDataSource.getRepository(MstProvinsi);
    const resultProvinsi = await repoProvinsi.findOne({
      where: whereClause,
    });


    // let dataAll: { data?: any; } = {};
    let siasatiProduksiPertitik: any = {};
    let siasatiDataPantau: any = {};
    //hubnetSiasatiApiUrl
    if (tanggalAwal1 || tanggalAkhir1) {
      // dataAll = await getDataPantauProduksiRutin({
      //   tanggal_awal_1: tanggalAwal1,
      //   tanggal_akhir_1: tanggalAkhir1,
      //   provinsi: idLocation !== "null" && idLocation !== undefined ? idLocation : "",
      //   moda: modaLower,
      //   endpoints: ["data-pantau", "data-produksi-pertitik"],
      // });
      siasatiDataPantau = await getSiasatiDataPantau({
        end_date: tanggalAkhir1,
        event_pantau: event,
        event: event,
        start_date: tanggalAwal1,
        provinsi: idLocation,
        moda: modaLower
      });

      siasatiProduksiPertitik = await getSiasatiProduksiPertitik({
        end_date: tanggalAkhir1,
        event_pantau: 0,
        event: 0,
        start_date: tanggalAwal1,
        provinsi: idLocation,
        moda: modaLower
      });
    } else {
      // dataAll = await getDataPantauProduksiSeasonal({
      //   event,
      //   provinsi: idLocation !== "null" && idLocation !== undefined ? idLocation : "",
      //   moda: modaLower,
      //   endpoints: ["data-pantau", "data-produksi-pertitik"],
      // });

      siasatiDataPantau = await getSiasatiDataPantau({
        end_date: tanggalAkhir1,
        event_pantau: event,
        event: event,
        start_date: tanggalAwal1,
        provinsi: idLocation,
        moda: modaLower
      });
      siasatiProduksiPertitik = await getSiasatiProduksiPertitik({
        end_date: tanggalAkhir1,
        event_pantau: event,
        event: event,
        start_date: tanggalAwal1,
        provinsi: idLocation,
        moda: modaLower
      });
    }


    // const { dataPantau, dataPertitik, keyData } = decodeProduksiSeasonal({ event: event ? dataAll?.data?.event : { ...dataAll?.data?.event, tanggal_mulai: tanggalAwal1, tanggal_selesai: tanggalAkhir1 }, prev_event: dataAll?.data?.prev_event, result: dataAll?.data?.result });

    const data = mergeLocation({ provinceName: resultProvinsi?.namaProvinsi || "", dataPantau: siasatiDataPantau, dataProduksiPertitik: siasatiProduksiPertitik });
    //  tanggalAwal1 || tanggalAkhir1 ? siasatiProduksiPertitik : dataPertitik?.[event ? `${event}::${event}` : keyData.length]
    // const resultSum = sumDataPertitik({ data: data, moda: modaLower });

    const sumResult = sumByPeriod({ data: data, moda: modaLower, groupByType: reportType, template: template, sort, isSeasonal: event ? true : false });

    // filtered
    const filtered = search
      ? matchSorter(sumResult, search, { keys: ['nama'], threshold: rankings.CONTAINS, })
      : sumResult;

    const paginateData = paginate(filtered, page, pageSize);
    return res.json({ status: true, ...paginateData, provinsi: resultProvinsi?.namaProvinsi });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};
