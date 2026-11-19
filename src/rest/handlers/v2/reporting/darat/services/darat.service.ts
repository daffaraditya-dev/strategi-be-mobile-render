import Joi from "joi";
import { AppDataSource } from "@/data-source";
import { DataSaranaBus } from "@/entities/DataSaranaBus";
import { User } from "@/entities/User";
import { compact, has, isEmpty, isNull, map } from "lodash";
import moment from "moment";
import { join } from "path";

export const reportDaratSchema = Joi.object({
  tgl_data: Joi.string().isoDate().required(),
  jam_data: Joi.string().required(),
  id_terminal_asal: Joi.number().required(),
  id_terminal_tujuan: Joi.number().required(),
  nama_po: Joi.string().required(),
  keterangan_nihil: Joi.string().allow("").optional(),
  no_pol: Joi.string().required(),
  jenis_bus: Joi.number().required(),
  mudik_gratis: Joi.number().valid(0, 1).required(),
  jml_penumpang_naik: Joi.number().required(),
  jml_penumpang_turun: Joi.number().required(),
  is_nihil: Joi.boolean().required(),
  is_delete: Joi.boolean().required(),
  jenis: Joi.number().required(),
  orang_khusus: Joi.number().required(),
  pasien: Joi.number().required(),
  keluarga: Joi.number().required(),
  lembaga: Joi.number().required(),
});

export const reportDaratNihilSchema = Joi.object({
  tgl_data: Joi.string().isoDate().required(),
  keterangan_nihil: Joi.string().allow("").optional(),
  id_terminal: Joi.number().required(),
  jenis: Joi.number().optional(),
});

export const queryReportDaratSchema = Joi.object({
  terminalAsalId: Joi.string().allow("").optional(),
  terminalTujuanId: Joi.string().allow("").optional(),
  provinsi: Joi.string().allow("").optional(),
  startDate: Joi.string().allow("").isoDate().optional(),
  endDate: Joi.string().allow("").isoDate().optional(),
  search: Joi.string().allow("").optional(),
  page: Joi.string().allow("").optional(),
  limit: Joi.string().allow("").optional(),
  jenis: Joi.number().required(),
  filterBySimpul: Joi.string().valid("0", "1").required(),
  filterByApproval: Joi.string().valid("0", "1").optional(),
});

export const queryApprovalDaratSchema = Joi.object({
  statusApproval: Joi.number().valid(1, 2).required(),
  approvalNote: Joi.string().allow("").optional(),
});

interface GetBusParams {
  terminalAsalId?: number | null;
  terminalTujuanId?: number | null;
  id_terminal?: string | null;
  provinsi?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  search?: string | null;
  page?: number;
  limit?: number;
  jenis?: string | null;
  filterBySimpul: string;
  filterByApproval: string;
  isNihil?: boolean;
}

enum approvalStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
}

export interface approvalParam {
  statusApproval: approvalStatus;
  approvalNote?: string;
}

export interface ReportDaratParams {
  id?: string;
  tgl_data: string;
  jam_data: string | null;
  id_terminal_asal: number;
  id_terminal_tujuan: number;
  nama_po: string;
  no_pol: string;
  jenis_bus: number;
  mudik_gratis: 0 | 1;
  created_user: string;
  keterangan_nihil: string;
  jml_penumpang_naik: number;
  jml_penumpang_turun: number;
  is_nihil: boolean;
  is_delete: boolean;
  orang_khusus: number;
  pasien: number;
  keluarga: number;
  lembaga: number;
  jenis: "1" | "2" | null;
}

export const getDataSaranaBus = async (
  params: GetBusParams,
  userId: string
) => {
  try {
    const repository = AppDataSource.getRepository(DataSaranaBus);
    const repositoryUser = AppDataSource.getRepository(User);

    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 10;
    const offset = (page - 1) * limit;
    const jenis = params.jenis != null ? String(params.jenis) : null;
    const terminalId = params?.id_terminal || null;

    const user = await repositoryUser.findOneBy({ id: userId });
    const simpulData = (user?.simpul ?? [])
      .map((item, i) =>
        item === "terminal" ? (user?.simpulId ?? [])[i] : null
      )
      .filter(Boolean);

    let query = repository
      .createQueryBuilder("bus")
      .leftJoinAndSelect("bus.terminalAsal", "terminalAsal")
      .leftJoinAndSelect("bus.terminalTujuan", "terminalTujuan")
      .where("bus.isDelete = :isDelete", { isDelete: 0 });

    if (has(params, "isNihil")) {
      query = query.andWhere("bus.isNihil = :isNihil", {
        isNihil: params.isNihil ? 1 : 0,
      });
    }

    if (jenis) {
      query = query.andWhere("(bus.jenis = :jenis or bus.jenis is null)", {
        jenis,
      });
    }

    if (params.filterBySimpul === "1") {
      if (jenis == "1") {
        query = query.andWhere("bus.idTerminalAsal IN (:...ids)", {
          ids: compact(simpulData),
        });
      } else if (jenis == "2") {
        query = query.andWhere("bus.idTerminalTujuan IN (:...ids)", {
          ids: compact(simpulData),
        });
      }
    }

    if (params.filterByApproval === "1") {
      query = query.andWhere("bus.approvalStatus = :approvalStatus", {
        approvalStatus: 0,
      });
    }


    if (terminalId) {
      query = query.andWhere("bus.idTerminalAsal = :terminalAsalId", {
        terminalAsalId: params.terminalAsalId,
      });
    }

    if (params.terminalAsalId) {
      query = query.andWhere("bus.idTerminalAsal = :terminalAsalId", {
        terminalAsalId: params.terminalAsalId,
      });
    }

    if (params.terminalTujuanId) {
      query = query.andWhere("bus.idTerminalTujuan = :terminalTujuanId", {
        terminalTujuanId: params.terminalTujuanId,
      });
    }

    if (params.provinsi) {
      query = query.andWhere(
        "(terminalAsal.idProvinsi = :provinsi OR terminalTujuan.idProvinsi = :provinsi)",
        { provinsi: params.provinsi }
      );
    }

    const TIMEZONE = "Asia/Jakarta";
    const startDateFormat = params.startDate
      ? moment
          .tz(params.startDate, TIMEZONE)
          .startOf("day")
          .format("YYYY-MM-DD")
      : null;
    const endDateFormat = params.endDate
      ? moment.tz(params.endDate, TIMEZONE).endOf("day").format("YYYY-MM-DD")
      : null;
    if (startDateFormat && endDateFormat) {
      query = query.andWhere("bus.tglData BETWEEN :startDate AND :endDate", {
        startDate: startDateFormat,
        endDate: endDateFormat,
      });
    } else if (startDateFormat) {
      query = query.andWhere("bus.tglData >= :startDate", {
        startDate: startDateFormat,
      });
    } else if (endDateFormat) {
      query = query.andWhere("bus.tglData <= :endDate", {
        endDate: endDateFormat,
      });
    }

    // search
    if (params.search) {
      query = query.andWhere(
        "(bus.namaPo ILIKE :search OR bus.noPol ILIKE :search)",
        { search: `%${params.search}%` }
      );
    }

    query.select([
      "bus",
      "terminalAsal",
      "terminalTujuan",
      // "terminalAsal.nama",
      // "terminalAsal.alamat",
      // "terminalAsal.provinsi",
      // "terminalTujuan.nama",
      // "terminalTujuan.alamat",
      // "terminalTujuan.provinsi",
    ]);

    const total = await query.getCount();

    const data = await query
      .orderBy("bus.createdDate", "DESC")
      .skip(offset)
      .take(limit)
      .getMany();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (err) {
    console.error("Database Operation Failed:", err);
    throw new Error("Gagal mengambil data sarana bus.");
  }
};

export const getDataSaranaBusId = async (id: string) => {
  const repository = AppDataSource.getRepository(DataSaranaBus);

  const result = await repository.findOneBy({ id });

  if (!result) {
    return {};
  }

  return {
    ...result,
    jenis:
      result?.jenis && !isNaN(Number(result?.jenis))
        ? Number(result.jenis)
        : null,
  };
};

export const createReportDarat = async (value: ReportDaratParams) => {
  const {
    tgl_data,
    jam_data,
    id_terminal_asal,
    id_terminal_tujuan,
    nama_po,
    no_pol,
    jenis_bus,
    jml_penumpang_naik,
    jml_penumpang_turun,
    mudik_gratis,
    is_nihil,
    keterangan_nihil,
    orang_khusus,
    pasien,
    keluarga,
    lembaga,
    jenis,
    created_user,
    is_delete,
  } = value;

  try {
    const reportData = {
      tglData: tgl_data,
      jamData: jam_data,
      idTerminalAsal: id_terminal_asal,
      idTerminalTujuan: id_terminal_tujuan,
      namaPo: nama_po,
      noPol: no_pol,
      jenisBus: jenis_bus,
      mudikGratis: mudik_gratis,
      createdUser: created_user,
      jmlPenumpangNaik: jml_penumpang_naik,
      jmlPenumpangTurun: jml_penumpang_turun,
      isNihil: is_nihil ? 1 : 0,
      orangKhusus: orang_khusus,
      pasien,
      keluarga,
      lembaga,
      keteranganNihil: keterangan_nihil,
      jenis,
      isDelete: is_delete ? 1 : 0,
      createdDate: new Date(),
      updatedUser: null,
      updatedDate: null,
    };

    const newReport = await AppDataSource.getRepository(DataSaranaBus).save({
      ...reportData,
      approvalStatus: reportData.isNihil ? 1 : 0,
    });

    return newReport;
  } catch (dbError) {
    throw new Error("Failed Insert Data");
  }
};

export const updateReportDarat = async (
  value: ReportDaratParams,
  id: string,
  updatedUser: string
) => {
  const repository = AppDataSource.getRepository(DataSaranaBus);

  const reportToUpdate = await repository.findOneBy({ id });

  if (!reportToUpdate) {
    throw new Error(`Data dengan ID ${id} tidak ditemukan.`);
  }

  const {
    tgl_data,
    jam_data,
    id_terminal_asal,
    id_terminal_tujuan,
    nama_po,
    no_pol,
    jenis_bus,
    jml_penumpang_naik,
    jml_penumpang_turun,
    mudik_gratis,
    is_nihil,
    keterangan_nihil,
    orang_khusus,
    pasien,
    keluarga,
    lembaga,
    jenis,
    created_user,
    is_delete,
  } = value;

  const reportData = {
    tglData: tgl_data,
    jamData: jam_data,
    idTerminalAsal: id_terminal_asal,
    idTerminalTujuan: id_terminal_tujuan,
    namaPo: nama_po,
    noPol: no_pol,
    jenisBus: jenis_bus,
    mudikGratis: mudik_gratis,
    jmlPenumpangNaik: jml_penumpang_naik,
    jmlPenumpangTurun: jml_penumpang_turun,
    isNihil: is_nihil ? 1 : 0,
    orangKhusus: orang_khusus,
    pasien,
    keluarga,
    lembaga,
    keteranganNihil: keterangan_nihil,
    jenis,
    isDelete: is_delete ? 1 : 0,
    updatedUser: updatedUser,
    updatedDate: new Date(),
  };

  const updatedEntity = Object.assign(
    { ...reportToUpdate, approvalStatus: reportData.isNihil ? 1 : 0 },
    reportData
  );

  const result = await repository.save(updatedEntity);

  return result;
};

export const deleteReportDarat = async (id: string, updatedUser: string) => {
  try {
    const repository = AppDataSource.getRepository(DataSaranaBus);
    const reportToUpdate = await repository.findOneBy({ id });

    if (!reportToUpdate) {
      throw new Error(`Data dengan ID ${id} tidak ditemukan.`);
    }

    const result = await repository.save({
      ...reportToUpdate,
      updatedUser,
      isDelete: 1,
    });
    return result;
  } catch (dbError) {
    console.error("Database Operation Failed:", dbError);
    throw new Error("Gagal memperbarui data.");
  }
};

export const batchDeleteReportDarat = async (
  listDataSaranaBus: DataSaranaBus[],
  updatedUser: string
) => {
  const updatePromises = listDataSaranaBus.map(async (data) => {
    try {
      if (data.id) {
        const result = await deleteReportDarat(data.id, updatedUser);
        return result;
      }

      return {};
    } catch (error) {
      return error;
    }
  });

  return await Promise.all(updatePromises);
};

export const approveSaranaBus = async (
  value: approvalParam,
  id: string,
  approvedBy: string
) => {
  const repository = AppDataSource.getRepository(DataSaranaBus);

  const reportToApprove = await repository.findOneBy({ id });

  if (!reportToApprove) {
    throw new Error(`Data dengan ID ${id} tidak ditemukan.`);
  }

  const { statusApproval, approvalNote } = value;

  if (statusApproval === approvalStatus.APPROVED && approvalNote) {
    throw new Error("approval note tidak bisa diisi ketika data di-approve");
  }

  if (
    statusApproval === approvalStatus.REJECTED &&
    (!approvalNote || approvalNote.trim() === "")
  ) {
    throw new Error("approval note wajib diisi ketika data ditolak.");
  }

  switch (value.statusApproval) {
    case approvalStatus.APPROVED:
      await repository.update(id, {
        approvalStatus: approvalStatus.APPROVED,
        approvalNote: null,
        approvedBy: approvedBy,
        approvedAt: new Date(),
      });
      break;

    case approvalStatus.REJECTED:
      await repository.update(id, {
        approvalStatus: approvalStatus.REJECTED,
        approvalNote: approvalNote,
      });
      break;

    default:
      throw new Error("status approval tidak dikenal");
  }
  return { message: "status approval berhasil diperbarui." };
};
