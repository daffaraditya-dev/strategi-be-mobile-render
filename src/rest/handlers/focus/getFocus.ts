import { AppDataSource } from "@/data-source";
import { Fokus } from "@/entities/Fokus";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import { getDataCctv, getWeatherLocation } from "@/services/backendApiHubnet";
import {
  FocusResponse,
  TransportationData,
  TransportationMetrics,
  Weather,
} from "./type/getFocus";
import {
  getDataPantauProduksiRutin,
  getDataPantauProduksiSeasonal,
} from "@/services/apiHubnet";
import Joi from "joi";
import { mapDataByRanges } from "@/rest/mapper/mapDataByDateRange";
import { RANGE_DATE } from "@/constants/range";
import {
  CctvStream,
  ResponseDataWeather,
  WeatherForecast,
} from "@/services/type/backendApiHubnet";
import { mobillityPointByDate } from "@/rest/mapper/mobillityPointByDate";
import { toCamelCase } from "@/utils/convert";
import { mapDataSeasonal } from "@/rest/mapper/common";
import { MstProvinsi } from "@/entities/MstProvinsi";

const getFocusRequest = Joi.object({
  tanggalAwal1: Joi.string(),
  tanggalAkhir1: Joi.string(),
  event: Joi.string(),
  isDefault: Joi.bool(),
});

export const getFocusHandler = async (req: Request, res: Response) => {
  const { error, value } = getFocusRequest.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { tanggalAwal1, tanggalAkhir1, event, isDefault } = value;

    const id_user = req.auth?.userId;

    if (!id_user) {
      return res.status(400).json(createErrorResponse("User ID is required"));
    }

    const repository = AppDataSource.getRepository(Fokus);
    const record = await repository.findOne({
      where: isDefault
        ? { is_default: true }
        : { id_user: id_user },
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
        if (tanggalAwal1 || tanggalAkhir1) {
          const data = await getDataPantauProduksiRutin({
            tanggal_awal_1: tanggalAwal1,
            tanggal_akhir_1: tanggalAkhir1,
            provinsi: "",
            moda: moda ?? "",
            endpoints: [
              "data-pantau",
              "data-produksi",
              "data-produksi-pertitik",
            ],
          });

          const graphData = mobillityPointByDate(data, moda ?? "");
          const graphDataFiltered = graphData.filter(
            (itemGraph) => itemGraph.idLokasi == item.simpul
          );
          if (graphDataFiltered.length == 0) {
            return;
          }
          const graphRange = mapDataByRanges(graphDataFiltered, [
            RANGE_DATE.WEEKLY,
            RANGE_DATE.MONTHLY,
            RANGE_DATE.YEARLY,
          ]);
          simpulTransportasi.push({
            idLocation: item.simpul,
            location: graphDataFiltered[0].locationName,
            province: graphDataFiltered[0].provinceName,
            city: graphDataFiltered[0].cityName,
            moda: item.moda,
            weekly: graphRange.weekly,
            monthly: graphRange.weekly,
            yearly: graphRange.weekly,
          });
        }

        // seasonal
        if (event) {
          const dataAll = await getDataPantauProduksiSeasonal({
            event,
            provinsi: "",
            moda: moda ?? "",
            endpoints: [
              "data-pantau",
              "data-produksi",
              "data-produksi-pertitik",
            ],
          });
          const data = mapDataSeasonal(event, dataAll);

          const graphData = mobillityPointByDate(data, moda ?? "");
          const graphDataFiltered = graphData.filter(
            (itemGraph) => itemGraph.idLokasi == item.simpul
          );
          if (graphDataFiltered.length == 0) {
            return;
          }
          const graphResult: Record<string, TransportationMetrics> = {};
          graphDataFiltered.forEach((item) => {
            graphResult[item.date] = {
              arrival: item.arrival,
              departure: item.departure,
              vehicleArrival: item.vehicleArrival,
              vehicleDeparture: item.vehicleDeparture,
            };
          });

          simpulTransportasi.push({
            idLocation: item.simpul,
            location: graphDataFiltered[0].locationName,
            province: graphDataFiltered[0].provinceName,
            city: graphDataFiltered[0].cityName,
            moda: item.moda,
            seasonal: graphResult,
          });
        }
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

        const weatherData = await getWeatherLocation({
          wilayah_administrasi: recordProv?.id.toString() ?? "",
        });
        const filteredWeather = getWeatherForecastClosestToNow(
          weatherData.data,
          value.city
        );
        weather.push({
          location: value.location,
          province: value.province,
          image: filteredWeather?.image ?? "",
          temperature: filteredWeather?.t ?? 0,
          description: filteredWeather?.weather_desc ?? "",
        });
      })
    );

    const response: FocusResponse = {
      success: true,
      data: {
        id: record?.id ?? 0,
        idUser: record?.id_user ?? "",
        judul: record?.judul ?? "",
        simpulTransportasi: simpulTransportasi,
        cctv: toCamelCase(cctv),
        video30s: record.video_30s,
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
