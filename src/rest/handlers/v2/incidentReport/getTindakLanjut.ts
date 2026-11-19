import { AppDataSource } from "@/data-source";
import { Request, Response } from "express";
import { createErrorResponse } from "@/utils/error";
import {
  formatDateWithZone,
  getStatusVerifikasiToName,
} from "@/utils/StatusConvert";

import { KejadianMenonjolTindakLanjutResponse } from "./type/getIncidentReportV2";
import { LaporanKejadianTindakLanjut } from "@/entities/LaporanKejadianTindakLanjut";
import { User } from "@/entities/User";
import { In } from "typeorm";

export const getTindakLanjut = async (req: Request, res: Response) => {
  try {
    const { idLaporanKejadian } = req.params;
    const laporanRepository = AppDataSource.getRepository(
      LaporanKejadianTindakLanjut
    );

    // Get all follow-up records
    const laporanKejadianTindakLanjut = await laporanRepository.find({
      where: { idLaporanKejadian },
      order: { createDate: "desc" },
    });

    if (!laporanKejadianTindakLanjut.length) {
      const errorResponse = createErrorResponse(
        "Laporan kejadian not found",
        404
      );
      return res.status(errorResponse.statusCode).json(errorResponse);
    }

    // Collect all unique user IDs
    const userIds = new Set<string>();
    laporanKejadianTindakLanjut.forEach((laporan) => {
      userIds.add(laporan.idUser);
      if (laporan.idVerifikator2) userIds.add(laporan.idVerifikator2);
      if (laporan.idVerifikator3) userIds.add(laporan.idVerifikator3);
      if (laporan.idRejectTindakLanjut)
        userIds.add(laporan.idRejectTindakLanjut);
    });
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({
      where: { id: In([...userIds]) },
      relations: ["role"],
    });
    const userMap = new Map(users.map((u) => [u.id, u]));

    // Transform data with user names
    const transformedLaporan = laporanKejadianTindakLanjut.map((laporan) => {
      const timezoneOffset = laporan.waktuTindakLanjutZone ?? 7;

      return {
        id: laporan.id,
        id_laporan_kejadian: laporan.idLaporanKejadian,
        id_user: laporan.idUser,
        nama_user: userMap.get(laporan.idUser)?.fullname || null,
        tindak_lanjut: laporan.tindakLanjut,
        data_pendukung_tindaklanjut: laporan.dataPendukungTindakLanjut
          ? laporan.dataPendukungTindakLanjut
          : [],
        create_date: laporan.createDate
          ? formatDateWithZone(laporan.createDate, timezoneOffset)
          : null,
        waktu_tindak_lanjut: laporan.waktuTindakLanjut
          ? formatDateWithZone(laporan.waktuTindakLanjut, timezoneOffset)
          : null,
        id_verifikator_2: laporan.idVerifikator2,
        nama_verifikator_2: laporan.idVerifikator2
          ? userMap.get(laporan.idVerifikator2)?.fullname || null
          : null,
        tanggal_verifikasi_2: laporan.tanggalVerifikasi2
          ? formatDateWithZone(laporan.tanggalVerifikasi2, timezoneOffset)
          : null,
        id_verifikator_3: laporan.idVerifikator3,
        nama_verifikator_3: laporan.idVerifikator3
          ? userMap.get(laporan.idVerifikator3)?.fullname || null
          : null,
        tanggal_verifikasi_3: laporan.tanggalVerifikasi3
          ? formatDateWithZone(laporan.tanggalVerifikasi3, timezoneOffset)
          : null,
        status_verifikasi: laporan.statusVerifikasi,
        status_enum: getStatusVerifikasiToName(laporan.statusVerifikasi),
        id_reject_tindaklanjut: laporan.idRejectTindakLanjut,
        nama_reject_tindaklanjut: laporan.idRejectTindakLanjut
          ? userMap.get(laporan.idRejectTindakLanjut)?.role?.name || null
          : null,
        tanggal_reject_tindaklanjut: laporan.tanggalRejectTindakLanjut
          ? formatDateWithZone(
              laporan.tanggalRejectTindakLanjut,
              timezoneOffset
            )
          : null,
      };
    });

    const response: KejadianMenonjolTindakLanjutResponse = {
      success: true,
      data: transformedLaporan,
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching laporan by ID:", err);
    const errorResponse = createErrorResponse(
      "Failed to fetch laporan kejadian",
      500
    );
    return res.status(errorResponse.statusCode).json(errorResponse);
  }
};
