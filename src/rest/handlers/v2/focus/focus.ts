import { AppDataSource } from "@/data-source";
import { Fokus } from "@/entities/Fokus";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import { getDataCctv } from "@/services/backendApiHubnet";
import { FocusResponse, TransportationData, Weather } from "./type/getFocus";
import Joi from "joi";
import {
  CctvStream,
  ResponseDataWeather,
  WeatherForecast,
} from "@/services/type/backendApiHubnet";
import { toCamelCase } from "@/utils/convert";
import { MstProvinsi } from "@/entities/MstProvinsi";
import { matriksData, periodMatriksLocation } from "@/repositories/dataMatriks";
import { Moda } from "@/type/produksi.titik.type";
import { indexOf, orderBy, reduce } from "lodash";

const getFocusRequest = Joi.object({
  tanggalAwal1: Joi.string(),
  tanggalAkhir1: Joi.string(),
  isDefault: Joi.bool(),
  event: Joi.string(),
  reportType: Joi.string().valid("daily", "weekly", "monthly", "yearly"),
});

export const getFocusHandler = async (req: Request, res: Response) => {
  const { error, value } = getFocusRequest.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { tanggalAwal1, tanggalAkhir1, isDefault, event, reportType } = value;

    const id_user = req.auth?.userId;

    if (!id_user) {
      return res.status(400).json(createErrorResponse("User ID is required"));
    }

    const repository = AppDataSource.getRepository(Fokus);
    const record = await repository.findOne({
      where: isDefault ? { is_default: true } : { id_user: id_user },
    });
    if (!record) {
      const errorResponse = createErrorResponse("Focus data not found", 404);
      return res.status(errorResponse.statusCode).json(errorResponse);
    }

    const cctvData = await getDataCctv();

    const simpulTransportasi: TransportationData[] = [];
    const cctv: CctvStream[] = [];
    const weather: Weather[] = [];

    await Promise.all(
      record.simpul_transportasi.map(async (item) => {
        const moda = item.moda.toLowerCase();

        // routine
        // if (tanggalAwal1 || tanggalAkhir1) {
        let time: any = {
          message: [],
          totalProcess: 0,
        };

        const startProcessDB = performance.now();
        const { data: dataMatrik, ...paginateData } = await matriksData({
          ids: item.simpul,
          endDate: tanggalAkhir1,
          startDate: tanggalAwal1,
          moda: moda as Moda,
          sort: "DESC",
          event: Number(event) === 0 || isNaN(event) ? null : event,
        });

        const dataMatrikLocationDaily = await periodMatriksLocation({
          endDate: tanggalAkhir1,
          startDate: tanggalAwal1,
          moda: moda as Moda,
          periodType: "daily",
          idLokasi: item.simpul,
          event: Number(event) === 0 || isNaN(event) ? null : event,
        });

        const startProcess = performance.now();

        let computeMatrikSumWeekly = {};
        let computeMatrikSumMonthly = {};
        let computeMatrikSumYearly = {};

        const computeMatrikSumDaily =
          reportType === "daily"
            ? reduce(
                dataMatrikLocationDaily,
                (acc: any, item) => {
                  acc[
                    event && (Number(event) !== 0 || !isNaN(event))
                      ? item?.label
                      : item?.period
                  ] = {
                    label: item.period,
                    departure: item.departure,
                    arrival: item.arrival,
                    vehicleDeparture: item.vehicleDeparture,
                    vehicleArrival: item.vehicleArrival,
                  };
                  return acc;
                },
                {}
              )
            : {};

        if (Number(event) === 0 || isNaN(event)) {
          const dataMatrikLocationWeekly =
            reportType === "weekly" &&
            (await periodMatriksLocation({
              endDate: tanggalAkhir1,
              startDate: tanggalAwal1,
              moda: moda as Moda,
              periodType: "weekly",
              idLokasi: item.simpul,
              event: Number(event) === 0 || isNaN(event) ? null : event,
            }));
          const dataMatrikLocationMonthly =
            reportType === "monthly" &&
            (await periodMatriksLocation({
              endDate: tanggalAkhir1,
              startDate: tanggalAwal1,
              moda: moda as Moda,
              periodType: "monthly",
              idLokasi: item.simpul,
              event: Number(event) === 0 || isNaN(event) ? null : event,
            }));
          const dataMatrikLocationYearly =
            reportType === "yearly" &&
            (await periodMatriksLocation({
              endDate: tanggalAkhir1,
              startDate: tanggalAwal1,
              moda: moda as Moda,
              periodType: "yearly",
              idLokasi: item.simpul,
              event: Number(event) === 0 || isNaN(event) ? null : event,
            }));

          computeMatrikSumWeekly = reduce(
            dataMatrikLocationWeekly || [],
            (acc: any, item) => {
              acc[
                event && (Number(event) !== 0 || !isNaN(event))
                  ? item?.label
                  : item?.period
              ] = {
                label: item.period,
                departure: item.departure,
                arrival: item.arrival,
                vehicleDeparture: item.vehicleDeparture,
                vehicleArrival: item.vehicleArrival,
              };
              return acc;
            },
            {}
          );
          computeMatrikSumMonthly = reduce(
            dataMatrikLocationMonthly || [],
            (acc: any, item) => {
              acc[
                event && (Number(event) !== 0 || !isNaN(event))
                  ? item?.label
                  : item?.period
              ] = {
                label: item.period,
                departure: item.departure,
                arrival: item.arrival,
                vehicleDeparture: item.vehicleDeparture,
                vehicleArrival: item.vehicleArrival,
              };
              return acc;
            },
            {}
          );
          computeMatrikSumYearly = reduce(
            dataMatrikLocationYearly || [],
            (acc: any, item) => {
              acc[
                event && (Number(event) !== 0 || !isNaN(event))
                  ? item?.label
                  : item?.period
              ] = {
                label: item.period,
                departure: item.departure,
                arrival: item.arrival,
                vehicleDeparture: item.vehicleDeparture,
                vehicleArrival: item.vehicleArrival,
              };
              return acc;
            },
            {}
          );
        }
        const endProcessDB = performance.now();
        time["processDB"] = (startProcessDB - endProcessDB) / 1000;

        simpulTransportasi.push({
          idLocation: item.simpul,
          location: dataMatrik?.[0]?.nama,
          province: dataMatrik?.[0]?.provinsi,
          city: dataMatrik?.[0]?.kota,
          moda: item.moda,
          daily: computeMatrikSumDaily,
          weekly: computeMatrikSumWeekly,
          monthly: computeMatrikSumMonthly,
          yearly: computeMatrikSumYearly,
        });

        const endProcess = performance.now();
        time["computeProcess"] = (startProcess - endProcess) / 1000;
      })
    );

    record.cctv.forEach((item) => {
      //cctv
      const cctvFilter = cctvData.data.find(
        (cctv) =>
          cctv.id === item.simpul &&
          cctv.matra === item.matra.toLowerCase() &&
          cctv.nama_lokasi === item.titikCctv
      );
      if (cctvFilter) {
        cctv.push(cctvFilter);
      }
    });

    const repositoryProv = AppDataSource.getRepository(MstProvinsi);
    await Promise.all(
      simpulTransportasi.map(async (value: TransportationData) => {
        const recordProv = await repositoryProv.findOne({
          where: {
            namaProvinsi: value.province,
          },
        });

        // const weatherData = await getWeatherLocation({
        //   wilayah_administrasi: recordProv?.id.toString() ?? "",
        // });
        // const filteredWeather = getWeatherForecastClosestToNow(
        //   weatherData.data,
        //   value.city
        // );
        // weather.push({
        //   location: value.location,
        //   province: value.province,
        //   image: filteredWeather?.image ?? "",
        //   temperature: filteredWeather?.t ?? 0,
        //   description: filteredWeather?.weather_desc ?? "",
        // });
      })
    );

    const sortItem = [
      "",
      "jalan",
      "penyeberangan",
      "laut",
      "udara",
      "stasiun",
      "toll",
      "arteri",
    ];

    const sortedVideo30s = orderBy(
      record.video_30s ?? [],
      [(v) => new Date(v.publishedAt ?? 0).getTime()],
      ["desc"]
    );

    const response: FocusResponse = {
      success: true,
      data: {
        id: record?.id ?? 0,
        idUser: record?.id_user ?? "",
        judul: record?.judul ?? "",
        simpulTransportasi: orderBy(
          simpulTransportasi,
          ({ moda }) => indexOf(sortItem, moda),
          ["asc"]
        ),
        cctv: toCamelCase(cctv),
        video30s: sortedVideo30s,
        videoLiveStreaming: record.video_live_streaming,
        createDate: record?.create_date.toString() ?? "",
        updateDate: record?.update_date?.toString() ?? "",
        weather,
      },
    };
    return res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching focus records:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to fetch focus records", 500));
  }
};

const getWeatherForecastClosestToNow = (
  weatherData: ResponseDataWeather[],
  cityName: string
): WeatherForecast | null => {
  // Check if we have valid data
  if (!weatherData || weatherData.length === 0) {
    return null;
  }

  const now = new Date();
  let closestForecast: WeatherForecast | null = null;
  let closestTimeDiff = Infinity;

  let filteredData = weatherData;
  if (cityName) {
    filteredData = filteredData.filter(
      (item) =>
        item.lokasi.kotkab &&
        item.lokasi.kotkab
          .toLowerCase()
          .replace("adm. ", "")
          .replace("administrasi ", "") === cityName.toLowerCase()
    );
  }

  // Loop through all locations and their forecasts
  filteredData?.forEach((locationData) => {
    if (!locationData.cuaca || locationData.cuaca.length === 0) {
      return;
    }

    // Flatten the nested forecast arrays
    const allForecasts = locationData.cuaca.flat();

    allForecasts.forEach((forecast) => {
      // Convert forecast UTC time to Date object
      const forecastTime = new Date(forecast.utc_datetime);

      // Calculate time difference in milliseconds
      const timeDiff = Math.abs(forecastTime.getTime() - now.getTime());

      // Update closest forecast if this one is closer
      if (timeDiff < closestTimeDiff) {
        closestTimeDiff = timeDiff;
        closestForecast = forecast;
      }
    });
  });

  return closestForecast;
};
