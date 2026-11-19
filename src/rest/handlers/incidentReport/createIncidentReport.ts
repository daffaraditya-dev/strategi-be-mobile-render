import { AppDataSource } from "@/data-source";
import { LaporanKejadian } from "@/entities/LaporanKejadian";
import { LaporanKejadianDetail } from "@/entities/LaporanKejadianDetail";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";

const createIncidentReportRequest = Joi.object({
  nama: Joi.string().max(255),
  email: Joi.string().email().max(255),
  noHp: Joi.string().max(15),
  waktuKejadian: Joi.date().iso(),
  kronologiKejadian: Joi.string(),
  lokasi: Joi.string(),
  longitude: Joi.number(),
  latitude: Joi.number(),
  modaTransportasi: Joi.string().max(255),
  kategori: Joi.string().max(255),
  unitKerja: Joi.string().max(500),
  laporanKejadianDetail: Joi.object({
    matra: Joi.string().max(10).required(),
    picPelapor: Joi.string().max(255),
    katimPenyediaData: Joi.string().max(255),
    kabidPusdatin: Joi.string().max(255),
    ketuaUmum: Joi.string().max(255),
    deskripsiLaporan: Joi.string(),
    jenisKecelakaan: Joi.string().max(50).required(),
    saranaTerlibat: Joi.array().items(Joi.string()).optional(),
    korbanMeninggalDunia: Joi.number().optional(),
    korbanLukaBerat: Joi.number().optional(),
    korbanLukaSedang: Joi.number().optional(),
    korbanLukaRingan: Joi.number().optional(),
    korbanHilang: Joi.number().optional(),
    korbanSelamat: Joi.number().optional(),
    onScheneCommander: Joi.string().optional(),
    kerusakanFisik: Joi.string().optional(),
    dampakLingkungan: Joi.string().optional(),
    dampakLaluLintas: Joi.string().optional(),
    statusPenanggulangan: Joi.string().optional(),
    laporanFinal: Joi.string().optional(),
    isApproved: Joi.boolean().default(false),
    approvedBy: Joi.string().optional(),
    approvedDate: Joi.date().iso().optional(),
    notes: Joi.string().optional(),
    rejectedBy: Joi.string().optional(),
  }).required(),
});

export const createIncidentReportHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const files = req.files as Express.Multer.File[];
    let uploadedFilePaths: string[] = [];
    if (files) {
      uploadedFilePaths = files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
    }

    const { error, value } = createIncidentReportRequest.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errorResponse = createErrorResponse(
        error.details.map((err) => err.message)
      );
      return res.status(errorResponse.statusCode).json(errorResponse);
    }

    const laporanRepository = AppDataSource.getRepository(LaporanKejadian);
    const laporanDetailRepository = AppDataSource.getRepository(
      LaporanKejadianDetail
    );

    const newLaporan = laporanRepository.create({
      id: uuidv4(),
      ...value,
      dataPendukung: uploadedFilePaths,
      createDate: new Date(),
    });
    const savedLaporan = await laporanRepository.save(newLaporan);

    const newLaporanKejadianDetail = laporanDetailRepository.create({
      id: uuidv4(),
      id_laporan_kejadian: savedLaporan[0].id,
      ...value.laporanKejadianDetail,
      create_date: new Date(),
    });
    const savedLaporanKejadianDetail = await laporanDetailRepository.save(
      newLaporanKejadianDetail
    );

    return res.status(201).json({
      success: true,
      data: {
        laporanKejadian: savedLaporan,
        laporanKejadianDetail: savedLaporanKejadianDetail,
      },
    });
  } catch (err) {
    console.error("Error creating laporan:", err);
    const errorResponse = createErrorResponse(
      "Failed to create laporan kejadian",
      500
    );
    return res.status(errorResponse.statusCode).json(errorResponse);
  }
};
