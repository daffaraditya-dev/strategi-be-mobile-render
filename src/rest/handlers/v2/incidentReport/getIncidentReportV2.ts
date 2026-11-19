import { AppDataSource } from "@/data-source";
import { Request, Response } from "express";
import { createErrorResponse } from "@/utils/error";
import Joi from "joi";
import {
  Between,
  LessThanOrEqual,
  MoreThanOrEqual,
  In,
  ILike,
  Raw,
} from "typeorm";
import { LaporanKejadianV2 } from "@/entities/LaporanKejadianV2";
import {
  KejadianMenonjolDataList,
  KejadianMenonjolListResponse,
} from "./type/getIncidentReportV2";
import {
  formatDateWithZone,
  getStatusName,
  getStatusValue,
  getStatusVerifikasiToName,
} from "@/utils/StatusConvert";
import { LaporanKejadianTindakLanjut } from "@/entities/LaporanKejadianTindakLanjut";
import { Role } from "@/entities/Role";

// Skema validasi untuk payload POST
const getIncidentReportV2Request = Joi.object({
  startDate: Joi.string(),
  endDate: Joi.string(),
  page: Joi.number().min(1),
  perPage: Joi.number().min(1),
  status: Joi.array()
    .items(
      Joi.string().valid(
        "OPEN",
        "ON_PROGRESS",
        "REJECT",
        "CLOSED",
        "VERIF_1",
        "VERIF_2",
        "VERIF_3",
        "TINDAK_LANJUT"
      )
    )
    .optional(),
  moda: Joi.string().valid(
    "jalan",
    "penyebrangan",
    "laut",
    "udara",
    "perkeretaapian"
  ),
  search: Joi.string().optional().allow(""),
});

export const getIncidentReportV2Handler = async (
  req: Request,
  res: Response
) => {
  try {
    const laporanRepository = AppDataSource.getRepository(LaporanKejadianV2);
    const tindakLanjutRepository = AppDataSource.getRepository(
      LaporanKejadianTindakLanjut
    );

    // Validasi payload
    const { error, value: payload } = getIncidentReportV2Request.validate(
      req.body
    );

    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }

    const page = payload.page;
    const pageSize = payload.perPage;
    const skip = (page - 1) * pageSize;

    // Filter dasar
    let whereClause: any = {};

    const dateField = "waktuKejadian";
    if (payload.startDate && payload.endDate) {
      const startDate = new Date(payload.startDate);
      const endDate = new Date(payload.endDate);
      endDate.setHours(23, 59, 59, 999);

      whereClause[dateField] = Between(startDate, endDate);
    } else if (payload.startDate) {
      whereClause[dateField] = MoreThanOrEqual(new Date(payload.startDate));
    } else if (payload.endDate) {
      const endDate = new Date(payload.endDate);
      endDate.setHours(23, 59, 59, 999);
      whereClause[dateField] = LessThanOrEqual(endDate);
    }

    if (payload.status && payload.status.length > 0) {
      const statusValues = payload.status.map((statusName: string) =>
        getStatusValue(statusName)
      );
      whereClause.status = In(statusValues);
    }

    if (payload.moda) {
      const modaToEselonNameMap: Record<string, string[]> = {
        jalan: ["ESELON1-DARAT"],
        penyebrangan: ["ESELON1-DARAT"],
        laut: ["ESELON1-LAUT"],
        udara: ["ESELON1-UDARA"],
        perkeretaapian: ["ESELON1-PERKERETAAPIAN"],
      };

      const eselonNames = modaToEselonNameMap[payload.moda.toLowerCase()];

      if (eselonNames && eselonNames.length > 0) {
        const roleRepository = AppDataSource.getRepository(Role);
        const roles = await roleRepository.find({
          where: { name: In(eselonNames) },
          select: ["id"],
        });

        const eselonIds = roles.map((r) => r.id.toString());

        const loopId = eselonIds
          .map((e) => {
            return `'${e}'`;
          })
          .join(",");
        if (eselonIds.length > 0) {
          whereClause = {
            ...whereClause,
            eselonTerkait: Raw(
              (alias) => `${alias} && ARRAY[${loopId}]::text[]`
            ),
          };
        }
      }
    }

    if (payload.search) {
      whereClause = [
        { ...whereClause, nama: ILike(`%${payload.search}%`) },
        { ...whereClause, namaPelapor: ILike(`%${payload.search}%`) },
        { ...whereClause, lokasi: ILike(`%${payload.search}%`) },
      ];
    }

    const [laporan, totalCount] = await laporanRepository.findAndCount({
      where: whereClause,
      take: pageSize,
      skip,
      order: { waktuKejadian: "desc" },
      relations: ["laporanKejadianDetail"],
    });

    const laporanIds = laporan.map((l) => l.id);
    const tindakLanjutList = await tindakLanjutRepository.find({
      where: { idLaporanKejadian: In(laporanIds) },
      select: ["idLaporanKejadian", "statusVerifikasi"],
    });
    const tindakLanjutMap: Record<string, string[]> = {};
    const allowedStatuses = [
      "PENDING_VERIFIKASI_2",
      "PENDING_VERIFIKASI_3",
      "VERIFIED",
    ];
    tindakLanjutList.forEach((tl) => {
      const statusName = getStatusVerifikasiToName(tl.statusVerifikasi);
      if (statusName && allowedStatuses.includes(statusName)) {
        if (!tindakLanjutMap[tl.idLaporanKejadian]) {
          tindakLanjutMap[tl.idLaporanKejadian] = [];
        }
        tindakLanjutMap[tl.idLaporanKejadian]!.push(statusName);
      }
    });

    const roleRepository = AppDataSource.getRepository(Role);
    const allEselonIds = laporan.flatMap((l) => l.eselonTerkait || []);
    const uniqueEselonIds = Array.from(new Set(allEselonIds));
    const roles =
      uniqueEselonIds.length > 0
        ? await roleRepository.findBy({ id: In(uniqueEselonIds) })
        : [];
    const roleMap = new Map(roles.map((r) => [r.id.toString(), r.name]));

    const transformedLaporan: KejadianMenonjolDataList[] = laporan.map(
      (item) => {
        let waktuKejadianFormatted: string | null = null;
        let tanggalDibuatFormatted: string | null = null;

        if (item.createDate) {
          const timezoneOffset = item.waktuKejadianZone ?? 7;
          tanggalDibuatFormatted = formatDateWithZone(
            item.createDate,
            timezoneOffset
          );
        }
        if (item.waktuKejadian) {
          const timezoneOffset = item.waktuKejadianZone ?? 7;
          waktuKejadianFormatted = formatDateWithZone(
            item.waktuKejadian,
            timezoneOffset
          );
        }
        const eselonTerkaitNames =
          item.eselonTerkait?.map((id) => roleMap.get(id) || id) || null;
        const tindaklanjutFiltered = tindakLanjutMap[item.id];
        return {
          id: item.id,
          nama: item.nama,
          status: item.status !== null ? getStatusName(item.status) : null,
          upt_terkait: item.uptTerkait,
          nama_pelapor: item.namaPelapor || null,
          lokasi: item.lokasi,
          waktu_kejadian: waktuKejadianFormatted,
          create_date: tanggalDibuatFormatted,
          jenis_kejadian: item.jenisKejadian,
          laporan_tindaklanjut_list:
            tindaklanjutFiltered && tindaklanjutFiltered.length > 0
              ? tindaklanjutFiltered
              : null,
          eselon_terkait: eselonTerkaitNames,
          ...(item.status === getStatusValue("REJECT") && {
            reason_reject: item.keterangan,
          }),
        } as KejadianMenonjolDataList;
      }
    );

    const totalPages = Math.ceil(totalCount / pageSize);

    const response: KejadianMenonjolListResponse = {
      success: true,
      data: transformedLaporan,
      count: totalCount,
      page,
      pageSize,
      totalPages,
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching laporan:", err);
    return res.status(500).json(createErrorResponse("Internal server error"));
  }
};
