import { Request, Response } from "express";
import Joi from "joi";
import { compact, isEmpty } from "lodash";
import { matriksData, periodMatriksByManyIds } from "@/repositories/dataMatriks";

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
  reportType: Joi.string().valid("daily", "weekly", "monthly", "yearly").required(),
  useSample: Joi.string().valid("true", "false").optional(),
  namaProvinsi: Joi.string().allow(""),
  idProvinsi: Joi.string().allow(""),
  type: Joi.array().items(Joi.string().valid("ALL", "A", "B", "C", "INTL", "DOM")),
});

const getTransportationHubData = async (params: any, idSimpul?: string) => {
  const { idProvinsi, event, idLocation, moda, search, type, reportType, tanggalAwal1, tanggalAkhir1, page, pageSize, sort, namaProvinsi } = params;
  const modaLower = moda.toLowerCase();
  const eventNum = Number(event) === 0 || isNaN(event) ? null : event;
  const resolvedType = isEmpty(type) && modaLower === "udara" ? ["INTL", "DOM"] : type;

  const time: Record<string, number> = {};

  const startProcessDB = performance.now();
  const { data: matriks, ...paginateData } = await matriksData({
    ids: idSimpul || idLocation || undefined,
    type: resolvedType,
    endDate: tanggalAkhir1,
    search,
    provinceId: idProvinsi && String(idProvinsi),
    province: namaProvinsi,
    startDate: tanggalAwal1,
    moda: modaLower,
    sort,
    page,
    pageSize,
    event: eventNum,
  });

  const matriksPeriod = await periodMatriksByManyIds({
    type: resolvedType,
    idLokasi: compact(matriks.map(({ idLokasi }) => idLokasi)),
    endDate: tanggalAkhir1,
    startDate: tanggalAwal1,
    moda: modaLower,
    periodType: reportType,
    event: eventNum,
  });
  time["totalProcessDB"] = (performance.now() - startProcessDB) / 1000;

  const startProcess = performance.now();
  const result = matriks.map((item) => ({
    ...item,
    detail: matriksPeriod.filter(
      ({ idLokasi: id, type: t }) => id == item.idLokasi && t === item.type
    ),
  }));
  time["totalProcess"] = (performance.now() - startProcess) / 1000;

  return { time, ...paginateData, status: true, data: result };
};

export const transportationHubHandler = async (req: Request, res: Response) => {
  const { error, value } = transportationHubRequest.validate(req.body);
  if (error) {
    return res.status(400).json({ status: false, message: error.details[0].message });
  }

  try {
    const response = await getTransportationHubData(value);
    return res.json(response);
  } catch (err) {
    console.error(err, "error in transportationHubHandler");
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const transportationHubHandlerById = async (req: Request, res: Response) => {
  const { error, value } = transportationHubRequest.validate(req.body);
  if (error) {
    return res.status(400).json({ status: false, message: error.details[0].message });
  }

  try {
    const { idSimpul } = req.params;
    const response = await getTransportationHubData(value, idSimpul);
    return res.json(response);
  } catch (err) {
    console.error(err, "error in transportationHubHandlerById");
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};
