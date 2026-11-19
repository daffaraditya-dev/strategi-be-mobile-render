import { AppDataSource } from "@/data-source";
import { LaporanKejadian } from "@/entities/LaporanKejadian";
import { LaporanKejadianDetail } from "@/entities/LaporanKejadianDetail"; // Import the related entity
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import Joi from "joi";
import {
  IncidentReportResponse,
  IncidentReportSingleResponse,
} from "./type/getIncidentReport";

const updateIncidentReportRequest = Joi.object({
  nama: Joi.string().max(255),
  email: Joi.string().email().max(255),
  noHp: Joi.string().max(15),
  waktuKejadian: Joi.string(),
  kronologiKejadian: Joi.string(),
  lokasi: Joi.string(),
  longitude: Joi.number(),
  latitude: Joi.number(),
  status: Joi.number(),
  idVerifier: Joi.string().uuid(),
  keterangan: Joi.string(),
  modaTransportasi: Joi.string().max(255),
  kategori: Joi.string().max(255),
  updateLokasi: Joi.string(),
  updateLongitude: Joi.number(),
  updateLatitude: Joi.number(),
  unitKerja: Joi.string().max(500),
  verifyDate: Joi.string(),
  idTindaklanjut: Joi.string().uuid(),
  statusKejadian: Joi.number(),
  tindakLanjut: Joi.string(),
  dataPendukungTindaklanjut: Joi.array().items(Joi.string()),
  waktuTindaklanjut: Joi.string(),
  updateWaktuKejadian: Joi.string(),
  updateKronologiKejadian: Joi.string(),
  updateDataPendukung: Joi.array().items(Joi.string()),
  nextUpdateModaTransportasi: Joi.string().max(255),
  nextUpdateKategori: Joi.string().max(255),
  nextUpdateLokasi: Joi.string(),
  nextUpdateLongitude: Joi.number(),
  nextUpdateLatitude: Joi.number(),
  nextUpdateWaktuKejadian: Joi.string(),
  nextUpdateKronologiKejadian: Joi.string(),
  nextUpdateKeterangan: Joi.string(),
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
    approvedDate: Joi.string().optional(),
    notes: Joi.string().optional(),
    rejectedBy: Joi.string().optional(),
  }).required(),
});

export const updateIncidentReportHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const files = req.files as Express.Multer.File[];
    let uploadedFilePaths: string[] = [];
    if (files) {
      uploadedFilePaths = files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
    }
    const { error, value } = updateIncidentReportRequest.validate(req.body, {
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

    const existingLaporan = await laporanRepository.findOne({
      where: { id },
      relations: ["laporanKejadianDetail"],
    });
    if (!existingLaporan) {
      const errorResponse = createErrorResponse(
        "Laporan kejadian not found",
        404
      );
      return res.status(errorResponse.statusCode).json(errorResponse);
    }

    const updateData: any = {
      ...value,
      updateDate: new Date(),
    };
    delete updateData.laporanKejadianDetail;

    if (value.nextUpdateModaTransportasi) {
      updateData.modaTransportasi = value.nextUpdateModaTransportasi;
    }
    if (value.nextUpdateKategori) {
      updateData.kategori = value.nextUpdateKategori;
    }
    if (value.nextUpdateLokasi) {
      updateData.lokasi = value.nextUpdateLokasi;
    }
    if (value.nextUpdateLongitude !== undefined) {
      updateData.longitude = value.nextUpdateLongitude;
    }
    if (value.nextUpdateLatitude !== undefined) {
      updateData.latitude = value.nextUpdateLatitude;
    }
    if (value.nextUpdateWaktuKejadian) {
      updateData.waktuKejadian = value.nextUpdateWaktuKejadian;
    }
    if (value.nextUpdateKronologiKejadian) {
      updateData.kronologiKejadian = value.nextUpdateKronologiKejadian;
    }
    if (value.nextUpdateKeterangan) {
      updateData.keterangan = value.nextUpdateKeterangan;
    }
    if (uploadedFilePaths.length > 0) {
      updateData.dataPendukung = uploadedFilePaths;
    }

    await laporanRepository.update(id, updateData);

    if (value.laporanKejadianDetail && value.laporanKejadianDetail.length > 0) {
      const existingDetail = await laporanDetailRepository.findOne({
        where: { idLaporanKejadian: id },
      });

      if (existingDetail) {
        await laporanDetailRepository.update(
          existingDetail.id,
          value.laporanKejadianDetail
        );
      }
    }

    const updatedLaporan = await laporanRepository.findOne({
      where: { id },
      relations: ["laporanKejadianDetail"],
    });

    const response: IncidentReportSingleResponse = {
      success: true,
      data: updatedLaporan as IncidentReportResponse,
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error updating laporan:", err);
    const errorResponse = createErrorResponse(
      "Failed to update laporan kejadian",
      500
    );
    return res.status(errorResponse.statusCode).json(errorResponse);
  }
};
