import Joi from "joi";
import { AppDataSource } from "@/data-source";
import { DataSaranaAsdp } from "@/entities/DataSaranaAsdp";
import { User } from "@/entities/User";
import { compact, has } from "lodash";
import moment from "moment-timezone";
import { DataFerizyAsdp } from "@/entities/DataFerizy";

export const reportSdpSchema = Joi.object({
  tgl_berangkat: Joi.string().isoDate().required(),
  jam_berangkat: Joi.string().required(),
  tgl_datang: Joi.string().allow(null).isoDate().optional(),
  jam_datang: Joi.string().allow(null).optional(),
  id_pelabuhan: Joi.number().required(),
  id_trayek: Joi.number().required(),

  jml_pnp_dewasa: Joi.number().required(),
  jml_pnp_anak: Joi.number().required(),
  jml_total_pnp: Joi.number().required(),

  goli: Joi.number().required(),
  pnpgoli: Joi.number().required(),
  golii: Joi.number().required(),
  pnpgolii: Joi.number().required(),
  goliii: Joi.number().required(),
  pnpgoliii: Joi.number().required(),
  goliva: Joi.number().required(),
  pnpgoliva: Joi.number().required(),
  golivb: Joi.number().required(),
  pnpgolivb: Joi.number().required(),
  golva: Joi.number().required(),
  pnpgolva: Joi.number().required(),
  golvb: Joi.number().required(),
  pnpgolvb: Joi.number().required(),
  golvia: Joi.number().required(),
  pnpgolvia: Joi.number().required(),
  golvib: Joi.number().required(),
  pnpgolvib: Joi.number().required(),
  golvii: Joi.number().required(),
  pnpgolvii: Joi.number().required(),
  golviii: Joi.number().required(),
  pnpgolviii: Joi.number().required(),
  golix: Joi.number().required(),
  pnpgolix: Joi.number().required(),

  jml_kendaraan: Joi.number().required(),
  jml_pnp_kendaraan: Joi.number().required(),
  total_penumpang: Joi.number().required(),

  is_nihil: Joi.boolean().required(),
  keterangan_nihil: Joi.string().allow("").optional(),

  created_user: Joi.string().allow("").optional(),
  created_date: Joi.string().allow("").optional(),

  lembaga: Joi.number().required(),
  pasien: Joi.number().required(),
  keluarga: Joi.number().required(),
  orang_khusus: Joi.number().required(),

  nama_pelabuhan: Joi.string().allow("").optional(),
  id_kapal: Joi.number().required(),
  nama_kapal: Joi.string().required(),
  nama_perusahaan: Joi.string().required(),
  lintasan_awal: Joi.string().required(),
  lintasan_akhir: Joi.string().required(),
  jenis_kapal: Joi.string().allow("").optional(),
  ukuran_kapal: Joi.string().required(),

  is_delete: Joi.boolean().required(),
});

export interface ReportSdpParams {
  tgl_berangkat: string;
  tgl_datang: string | null;
  jam_berangkat: string | null;
  jam_datang: string | null;
  id_pelabuhan: number;
  id_trayek: number;

  jml_pnp_dewasa: number;
  jml_pnp_anak: number;
  jml_total_pnp: number;

  goli: number;
  pnpgoli: number;
  golii: number;
  pnpgolii: number;
  goliii: number;
  pnpgoliii: number;
  goliva: number;
  pnpgoliva: number;
  golivb: number;
  pnpgolivb: number;
  golva: number;
  pnpgolva: number;
  golvb: number;
  pnpgolvb: number;
  golvia: number;
  pnpgolvia: number;
  golvib: number;
  pnpgolvib: number;
  golvii: number;
  pnpgolvii: number;
  golviii: number;
  pnpgolviii: number;
  golix: number;
  pnpgolix: number;

  jml_kendaraan: number;
  jml_pnp_kendaraan: number;
  total_penumpang: number;

  is_nihil: boolean;
  keterangan_nihil?: string;

  created_user?: string;
  created_date?: string;

  lembaga: number;
  pasien: number;
  keluarga: number;
  orang_khusus: number;

  nama_pelabuhan?: string;
  id_kapal: number;
  nama_kapal: string;
  nama_perusahaan: string;
  lintasan_awal: string;
  lintasan_akhir: string;
  jenis_kapal?: string;
  ukuran_kapal: string;

  is_delete: boolean;
  approvalStatus?: number;
}

export const queryReportSdpSchema = Joi.object({
  pelabuhanAsalId: Joi.string().allow("").optional(),
  pelabuhanId: Joi.string().allow("").optional(),
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

interface GetSdpParams {
  pelabuhanAsalId?: number | null;
  pelabuhanId?: number | null;
  provinsi?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  search?: string | null;
  page?: number;
  limit?: number;
  jenis?: string;
  filterBySimpul: string;
  filterByApproval: string;
  isNihil?: string;
}

export const reportSdpNihilSchema = Joi.object({
  tgl_data: Joi.string().isoDate().required(),
  keterangan_nihil: Joi.string().allow("").optional(),
  id_pelabuhan: Joi.number().required(),
});

export const queryApprovalLautSchema = Joi.object({
  statusApproval: Joi.number().valid(1, 2).required(),
  approvalNote: Joi.string().allow("").optional(),
});

enum approvalStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
}

export interface approvalParam {
  statusApproval: approvalStatus;
  approvalNote?: string;
}

export const getDataSaranaSdp = async (
  params: GetSdpParams,
  userId: string
) => {
  try {
    const repository = AppDataSource.getRepository(DataSaranaAsdp);
    const repositoryUser = AppDataSource.getRepository(User);

    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 10;
    const offset = (page - 1) * limit;

    const user = await repositoryUser.findOneBy({ id: userId });
    const simpulData = (user?.simpul ?? [])
      .map((item, i) =>
        item === "pelabuhan-asdp" ? (user?.simpulId ?? [])[i] : null
      )
      .filter(Boolean);

    const listIdPelabuhan = compact(simpulData);
    const idPelabuhan = params.pelabuhanId
      ? parseInt(String(params.pelabuhanId), 10)
      : null;
    const filterBySimpulUser = params.filterBySimpul === "1";
    const jenis = params.jenis ? parseInt(params.jenis, 10) : null;
    const idProvinsi = params.provinsi ? parseInt(params.provinsi, 10) : null;
    const isNihil = !has(params, "isNihil")
      ? null
      : params.isNihil !== undefined && params.isNihil !== null
      ? parseInt(String(params.isNihil), 10)
      : 0;

    const startDate = params.startDate
      ? moment(params.startDate).startOf("day").format("YYYY-MM-DD")
      : null;
    const endDate = params.endDate
      ? moment(params.endDate).endOf("day").format("YYYY-MM-DD")
      : null;

    const filterByApprovalUser = params.filterByApproval === "1";

    const query = repository
      .createQueryBuilder("dsa")
      .leftJoinAndSelect("dsa.pelabuhan", "pa")
      .leftJoinAndSelect("pa.provinsi", "p")
      .leftJoinAndSelect("dsa.trayek", "t")
      .leftJoinAndSelect("t.pelabuhanAsal", "pelabuhanAsal")
      .leftJoinAndSelect("t.pelabuhanTujuan", "pelabuhanTujuan")
      .leftJoinAndSelect("t.kapal", "kapal")
      .leftJoinAndSelect("kapal.perusahaan", "perusahaan")
      .leftJoinAndMapOne(
        "dsa.ferizy",
        DataFerizyAsdp,
        "f",
        `
          dsa.id_trayek IS NULL
          AND f.tgl_berangkat = dsa.tgl_berangkat
          AND f.jam_berangkat = dsa.jam_berangkat
          AND f.id_pelabuhan = dsa.id_pelabuhan
        `
      )
      .leftJoin(
        "view_siasati_mst_pelabuhan",
        "tpa",
        `
          (pa.id = t.id_pelabuhan_tujuan AND tpa.id = t.id_pelabuhan_tujuan)
          OR (pa.id <> t.id_pelabuhan_tujuan AND tpa.id = t.id_pelabuhan_asal)
        `
      )
      .leftJoin(
        "view_siasati_mst_pelabuhan",
        "tpt",
        `
            (pa.id = t.id_pelabuhan_tujuan AND tpt.id = t.id_pelabuhan_asal)
            OR (pa.id <> t.id_pelabuhan_tujuan AND tpt.id = t.id_pelabuhan_tujuan)
          `
      )
      .where("(:isDelete::int IS NULL OR dsa.isDelete = :isDelete)", {
        isDelete: 0,
      })
      .andWhere("(:idProvinsi::int IS NULL OR p.id = :idProvinsi)", {
        idProvinsi,
      })
      .andWhere(
        "(:startDate::date IS NULL OR dsa.tglBerangkat >= :startDate)",
        { startDate }
      )
      .andWhere("(:endDate::date IS NULL OR dsa.tglBerangkat <= :endDate)", {
        endDate,
      })
      .andWhere(
        `
          (:idPelabuhan::int IS NULL
            OR pa.id = :idPelabuhan
            OR tpa.id = :idPelabuhan
            OR tpt.id = :idPelabuhan
          )
      `,
        { idPelabuhan }
      )
      .andWhere("(:isNihil::int IS NULL OR dsa.isNihil = :isNihil)", {
        isNihil,
      });

    if (filterByApprovalUser) {
      query.andWhere("dsa.approvalStatus = :approvalStatus", {
       approvalStatus: 0,
      });
    }

    if (filterBySimpulUser) {
      query.andWhere(
        `
      (
        :filterBySimpulUser = false
        OR (
          :filterBySimpulUser = true AND (
            (
              :jenis::int IS NULL AND (
                pa.id IN (:...listIdPelabuhan)
                OR tpa.id IN (:...listIdPelabuhan)
                OR tpt.id IN (:...listIdPelabuhan)
              )
            )
            OR (
              :jenis::int = 1 AND
              (:idPelabuhan::int IS NULL OR tpa.id = :idPelabuhan)
              AND tpa.id IN (:...listIdPelabuhan)
            )
            OR (
              :jenis::int = 2 AND
              (:idPelabuhan::int IS NULL OR tpt.id = :idPelabuhan)
              AND tpt.id IN (:...listIdPelabuhan)
            )
            OR (
              dsa.isNihil = 1 AND pa.id IN (:...listIdPelabuhan)
            )
          )
        )
      )
    `,
        { filterBySimpulUser, jenis, idPelabuhan, listIdPelabuhan }
      );
    }

    query.addSelect(
      `CASE 
        WHEN ${query.alias}.updated_date IS NOT NULL 
        THEN ${query.alias}.updated_date 
        ELSE ${query.alias}.created_date 
      END`,
      "sort_date"
    );

    query.orderBy("sort_date", "DESC");

    // query.orderBy("COALESCE(dsa.updated_date, dsa.created_date)", "DESC");

    const [data, total] = await query
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    const TIMEZONE = "Asia/Jakarta";
    const dataWithRelations = data.map((item) => ({
      id: item.id,
      tglBerangkat: item.tglBerangkat,
      jamBerangkat: item.jamBerangkat,
      tglDatang: item.tglDatang,
      jamDatang: item.jamDatang,
      idPelabuhan: item.idPelabuhan,
      idTrayek: item.idTrayek,
      jmlPnpDewasa: item.jmlPnpDewasa,
      jmlPnpAnak: item.jmlPnpAnak,
      jmlTotalPnp: item.jmlTotalPnp,
      goli: item.goli,
      pnpgoli: item.pnpgoli,
      golii: item.golii,
      pnpgolii: item.pnpgolii,
      goliii: item.goliii,
      pnpgoliii: item.pnpgoliii,
      goliva: item.goliva,
      pnpgoliva: item.pnpgoliva,
      golivb: item.golivb,
      pnpgolivb: item.pnpgolivb,
      golva: item.golva,
      pnpgolva: item.pnpgolva,
      golvb: item.golvb,
      pnpgolvb: item.pnpgolvb,
      golvia: item.golvia,
      pnpgolvia: item.pnpgolvia,
      golvib: item.golvib,
      pnpgolvib: item.pnpgolvib,
      golvii: item.golvii,
      pnpgolvii: item.pnpgolvii,
      golviii: item.golviii,
      pnpgolviii: item.pnpgolviii,
      golix: item.golix,
      pnpgolix: item.pnpgolix,
      jmlKendaraan: item.jmlKendaraan,
      jmlPnpKendaraan: item.jmlPnpKendaraan,
      totalPenumpang: item.totalPenumpang,
      isNihil: item.isNihil,
      keteranganNihil: item.keteranganNihil,
      createdUser: item.createdUser,
      createdDate: item.createdDate,
      updatedUser: item.updatedUser,
      updatedDate: item.updatedDate,
      lembaga: item.lembaga,
      pasien: item.pasien,
      keluarga: item.keluarga,
      orangKhusus: item.orangKhusus,
      isDelete: item.isDelete,
      sumber: item.sumber,
      approvalStatus: item.approvalStatus,
      pelabuhan: item.pelabuhan
        ? {
            id: item.pelabuhan.id,
            isAsdp: item.pelabuhan.isAsdp,
            namaPelabuhan: item.pelabuhan.namaPelabuhan,
            idProvinsi: item.pelabuhan.idProvinsi,
            idKabupaten: item.pelabuhan.idKabupaten,
            provinsi: item.pelabuhan.provinsi || null,
          }
        : null,
      ferizy: (item as any).ferizy
        ? {
            id: (item as any).ferizy.id,
            idPelabuhan: (item as any).ferizy.idPelabuhan,
            jamBerangkat: (item as any).ferizy.jamBerangkat,
            jmlPnpAnak: (item as any).ferizy.jmlPnpAnak,
            jmlPnpDewasa: (item as any).ferizy.jmlPnpDewasa,
            jmlPnpKendaraan: (item as any).ferizy.jmlPnpKendaraan,
            lintasanAkhir: (item as any).ferizy.lintasanAkhir,
            lintasanAwal: (item as any).ferizy.lintasanAwal,
            namaKapal: (item as any).ferizy.namaKapal,
            sumber: (item as any).ferizy.sumber,
            tglBerangkat: (item as any).ferizy.tglBerangkat,
          }
        : null,
      trayek: item.trayek
        ? {
            id: item.trayek.id,
            idKapal: item.trayek.idKapal,
            idPelabuhanAsal: item.trayek.idPelabuhanAsal,
            idPelabuhanTujuan: item.trayek.idPelabuhanTujuan,
            pelabuhanAsal: item.trayek.pelabuhanAsal || null,
            pelabuhanTujuan: item.trayek.pelabuhanTujuan || null,
            kapal: item.trayek.kapal
              ? {
                  idKapal: item.trayek.kapal.idKapal,
                  idJenisKapal: item.trayek.kapal.idJenisKapal,
                  idPerusahaan: item.trayek.kapal.idPerusahaan,
                  namaKapal: item.trayek.kapal.namaKapal,
                  grt: item.trayek.kapal.grt,
                  perusahaan: item.trayek.kapal.perusahaan || null,
                }
              : null,
          }
        : null,
      tglBerangkatLocal: item.tglBerangkat
        ? moment.tz(item.tglBerangkat, TIMEZONE).format("YYYY-MM-DD HH:mm:ss")
        : null,
      tglDatangLocal: item.tglDatang
        ? moment.tz(item.tglDatang, TIMEZONE).format("YYYY-MM-DD HH:mm:ss")
        : null,
    }));

    return {
      data: dataWithRelations,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (err) {
    console.error("Database Operation Failed:", err);
    throw new Error("Gagal mengambil data sarana SDP.");
  }
};

export const getDataSaranaSdpId = async (id: string) => {
  const repository = AppDataSource.getRepository(DataSaranaAsdp);

  const result = await repository
    .createQueryBuilder("dsa")
    .leftJoin("dsa.pelabuhan", "pa")
    .leftJoin("dsa.trayek", "t")
    .leftJoin("t.pelabuhanAsal", "pelabuhanAsal")
    .leftJoin("t.pelabuhanTujuan", "pelabuhanTujuan")
    .leftJoin("t.kapal", "kapal")
    .leftJoin("kapal.perusahaan", "perusahaan")
    .leftJoinAndSelect("pa.provinsi", "p")
    .addSelect([
      "pa.id",
      "pa.isAsdp",
      "pa.namaPelabuhan",
      "pa.idProvinsi",
      "pa.idKabupaten",
      "dsa.approvalStatus",

      "t.id",
      "t.idKapal",
      "t.idPelabuhanAsal",
      "t.idPelabuhanTujuan",

      "pelabuhanAsal.id",
      "pelabuhanAsal.isAsdp",
      "pelabuhanAsal.namaPelabuhan",
      "pelabuhanAsal.idProvinsi",
      "pelabuhanAsal.idKabupaten",

      "pelabuhanTujuan.id",
      "pelabuhanTujuan.isAsdp",
      "pelabuhanTujuan.namaPelabuhan",
      "pelabuhanTujuan.idProvinsi",
      "pelabuhanTujuan.idKabupaten",

      "kapal.idKapal",
      "kapal.idPerusahaan",
      "perusahaan.id",
      "perusahaan.namaPerusahaan",
      "kapal.idJenisKapal",
      "kapal.namaKapal",
      "kapal.grt",
    ])
    .where("dsa.id = :id", { id })
    .getOne();

  if (!result) {
    return {};
  }

  return result;
};

export const createReportAsdp = async (value: ReportSdpParams) => {
  try {
    const reportData = {
      tglBerangkat: value.tgl_berangkat,
      tglDatang: value.tgl_datang,
      jamBerangkat: value.jam_berangkat,
      jamDatang: value.jam_datang,
      idPelabuhan: value.id_pelabuhan,
      idTrayek: value.id_trayek,

      jmlPnpDewasa: value.jml_pnp_dewasa,
      jmlPnpAnak: value.jml_pnp_anak,
      jmlTotalPnp: value.jml_total_pnp,

      goli: value.goli,
      pnpgoli: value.pnpgoli,
      golii: value.golii,
      pnpgolii: value.pnpgolii,
      goliii: value.goliii,
      pnpgoliii: value.pnpgoliii,
      goliva: value.goliva,
      pnpgoliva: value.pnpgoliva,
      golivb: value.golivb,
      pnpgolivb: value.pnpgolivb,
      golva: value.golva,
      pnpgolva: value.pnpgolva,
      golvb: value.golvb,
      pnpgolvb: value.pnpgolvb,
      golvia: value.golvia,
      pnpgolvia: value.pnpgolvia,
      golvib: value.golvib,
      pnpgolvib: value.pnpgolvib,
      golvii: value.golvii,
      pnpgolvii: value.pnpgolvii,
      golviii: value.golviii,
      pnpgolviii: value.pnpgolviii,
      golix: value.golix,
      pnpgolix: value.pnpgolix,

      jmlKendaraan: value.jml_kendaraan,
      jmlPnpKendaraan: value.jml_pnp_kendaraan,
      totalPenumpang: value.total_penumpang,

      isNihil: value.is_nihil ? 1 : 0,
      keteranganNihil: value.keterangan_nihil,

      createdUser: value.created_user,
      createdDate: new Date(),

      lembaga: value.lembaga,
      pasien: value.pasien,
      keluarga: value.keluarga,
      orangKhusus: value.orang_khusus,

      namaPelabuhan: value.nama_pelabuhan,
      idKapal: value.id_kapal,
      namaKapal: value.nama_kapal,
      namaPerusahaan: value.nama_perusahaan,
      lintasanAwal: value.lintasan_awal,
      lintasanAkhir: value.lintasan_akhir,
      jenisKapal: value.jenis_kapal,
      ukuranKapal: value.ukuran_kapal,
      isDelete: value.is_delete ? 1 : 0,
    };

    const newReport = await AppDataSource.getRepository(DataSaranaAsdp).save({
      ...reportData,
      approvalStatus: reportData.isNihil ? 1 : 0,
    });

    return newReport;
  } catch (dbError) {
    console.log(dbError);

    throw new Error("Failed Insert Data");
  }
};

export const updateReportAsdp = async (value: ReportSdpParams, id: string) => {
  const repository = AppDataSource.getRepository(DataSaranaAsdp);

  const reportToUpdate = await repository.findOneBy({ id });

  if (!reportToUpdate) {
    throw new Error(`Data dengan ID ${id} tidak ditemukan.`);
  }

  const reportData = {
    tglBerangkat: value.tgl_berangkat,
    tglDatang: value.tgl_datang,
    jamBerangkat: value.jam_berangkat,
    jamDatang: value.jam_datang,
    idPelabuhan: value.id_pelabuhan,
    idTrayek: value.id_trayek,

    jmlPnpDewasa: value.jml_pnp_dewasa,
    jmlPnpAnak: value.jml_pnp_anak,
    jmlTotalPnp: value.jml_total_pnp,

    goli: value.goli,
    pnpgoli: value.pnpgoli,
    golii: value.golii,
    pnpgolii: value.pnpgolii,
    goliii: value.goliii,
    pnpgoliii: value.pnpgoliii,
    goliva: value.goliva,
    pnpgoliva: value.pnpgoliva,
    golivb: value.golivb,
    pnpgolivb: value.pnpgolivb,
    golva: value.golva,
    pnpgolva: value.pnpgolva,
    golvb: value.golvb,
    pnpgolvb: value.pnpgolvb,
    golvia: value.golvia,
    pnpgolvia: value.pnpgolvia,
    golvib: value.golvib,
    pnpgolvib: value.pnpgolvib,
    golvii: value.golvii,
    pnpgolvii: value.pnpgolvii,
    golviii: value.golviii,
    pnpgolviii: value.pnpgolviii,
    golix: value.golix,
    pnpgolix: value.pnpgolix,

    jmlKendaraan: value.jml_kendaraan,
    jmlPnpKendaraan: value.jml_pnp_kendaraan,
    totalPenumpang: value.total_penumpang,

    isNihil: value.is_nihil ? 1 : 0,
    keteranganNihil: value.keterangan_nihil,

    updatedUser: value.created_user,
    updatedDate: new Date(),

    lembaga: value.lembaga,
    pasien: value.pasien,
    keluarga: value.keluarga,
    orangKhusus: value.orang_khusus,

    namaPelabuhan: value.nama_pelabuhan,
    idKapal: value.id_kapal,
    namaKapal: value.nama_kapal,
    namaPerusahaan: value.nama_perusahaan,
    lintasanAwal: value.lintasan_awal,
    lintasanAkhir: value.lintasan_akhir,
    jenisKapal: value.jenis_kapal,
    ukuranKapal: value.ukuran_kapal,

    isDelete: value.is_delete ? 1 : 0,
  };

  const updatedEntity = Object.assign(
    { ...reportToUpdate, approvalStatus: reportData.isNihil ? 1 : 0 },
    reportData
  );

  const result = await repository.save(updatedEntity);

  return result;
};

export const deleteReportSdp = async (id: string, updatedUser: string) => {
  try {
    const repository = AppDataSource.getRepository(DataSaranaAsdp);
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

export const batchDeleteReportSdp = async (
  listDataSaranaBus: DataSaranaAsdp[],
  updatedUser: string
) => {
  const updatePromises = listDataSaranaBus.map(async (data) => {
    try {
      if (data.id) {
        const result = await deleteReportSdp(data.id, updatedUser);
        return result;
      }

      return {};
    } catch (error) {
      return error;
    }
  });

  return await Promise.all(updatePromises);
};

export const approveSaranAsdp = async (
  value: approvalParam,
  id: string,
  approvedBy: string
) => {
  const repository = AppDataSource.getRepository(DataSaranaAsdp);

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
