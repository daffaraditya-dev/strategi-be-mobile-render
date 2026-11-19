import Joi from "joi";
import { AppDataSource } from "@/data-source";
import { DataSaranaLaut } from "@/entities/DataSaranaLaut"; // Asumsikan nama entitas Anda seperti ini
import { compact, has } from "lodash";
import { MstKapal } from "@/entities/MstKapal";
import { User } from "@/entities/User";
import moment from "moment";
import { DataInaportnetProduksi } from "@/entities/DataInaportnetProduksi";
import { MstPelabuhan } from "@/entities/MstPelabuhan";
import { In } from "typeorm";

export interface ReportLautParams {
  id_pelabuhan: number;
  id_kapal: number;
  id_plbh_asal: number | null;
  nama_perusahaan: string | null;
  kapasitas: number;
  dispensasi: number;
  kapasitas_dispensasi: number;
  pass_factor: number;
  selisih: number;
  gross_tonage: number;
  tgl_datang: string | null; // format: YYYY-MM-DD
  jam_datang: string | null; // format: HH:mm
  jml_pnp_turun: number | null;
  jml_pnp_lanjutan: number | null;
  id_plbh_tujuan: number | null;
  tgl_berangkat: string | null;
  jam_berangkat: string | null;
  jml_pnp_berangkat: number | null;
  jml_diatas_kapal: number;

  tenaga_kerja_turun: number | null;
  awak_kapal_turun: number | null;
  pelayaran_terbatas_turun: number | null;
  pelayaran_perintis_turun: number | null;
  pelayaran_antar_pulau_turun: number | null;
  keperluan_mendesak_turun: number | null;

  tenaga_kerja_naik: number | null;
  awak_kapal_naik: number | null;
  pelayaran_terbatas_naik: number | null;
  pelayaran_perintis_naik: number | null;
  pelayaran_antar_pulau_naik: number | null;
  keperluan_mendesak_naik: number | null;

  tenaga_kerja_lanjutan: number | null;
  awak_kapal_lanjutan: number | null;
  pelayaran_terbatas_lanjutan: number | null;
  pelayaran_perintis_lanjutan: number | null;
  pelayaran_antar_pulau_lanjutan: number | null;
  keperluan_mendesak_lanjutan: number | null;

  roda_dua_turun: number | null;
  roda_empat_turun: number | null;
  bus_turun: number | null;
  truk_turun: number | null;
  jml_barang_turun: number | null;
  satuan_barang_turun: string | null;

  roda_dua_naik: number | null;
  roda_empat_naik: number | null;
  bus_naik: number | null;
  truk_naik: number | null;
  jml_barang_naik: number | null;
  satuan_barang_naik: string | null;

  general_cargo_turun: number | null;
  curah_cair: number | null;
  curah_kering: number | null;
  container_turun: number | null;

  general_cargo_naik: number | null;
  curah_naik: number | null;
  curah_kering_naik: number | null;
  container_naik: number | null;

  pasien_turun: number | null;
  keluarga_turun: number | null;
  orang_khusus_turun: number | null;
  lembaga_turun: number | null;

  pasien_naik: number | null;
  keluarga_naik: number | null;
  orang_khusus_naik: number | null;
  lembaga_naik: number | null;

  is_berangkat: boolean | null;
  is_nihil: boolean;
  keterangan_nihil: string | null;
}

export const reportLautSchema = Joi.object({
  id_pelabuhan: Joi.number().required(),
  id_kapal: Joi.number().required(),
  nama_perusahaan: Joi.string().required(),
  kapasitas: Joi.number().required(),
  dispensasi: Joi.number().required(),
  kapasitas_dispensasi: Joi.number().required(),
  pass_factor: Joi.number().required(),
  selisih: Joi.number().required(),
  gross_tonage: Joi.number().required(),
  id_plbh_asal: Joi.number().required(),
  tgl_datang: Joi.string().isoDate().required(),
  jam_datang: Joi.string().required(),
  jml_pnp_turun: Joi.number().required(),
  jml_pnp_lanjutan: Joi.number().required(),
  id_plbh_tujuan: Joi.number().allow(null),
  tgl_berangkat: Joi.string().isoDate().allow(null),
  jam_berangkat: Joi.string().allow(null),
  jml_pnp_berangkat: Joi.number().allow(null),
  jml_diatas_kapal: Joi.number().required(),

  tenaga_kerja_turun: Joi.number().required(),
  awak_kapal_turun: Joi.number().required(),
  pelayaran_terbatas_turun: Joi.number().required(),
  pelayaran_perintis_turun: Joi.number().required(),
  pelayaran_antar_pulau_turun: Joi.number().required(),
  keperluan_mendesak_turun: Joi.number().required(),

  tenaga_kerja_naik: Joi.number().allow(null),
  awak_kapal_naik: Joi.number().allow(null),
  pelayaran_terbatas_naik: Joi.number().allow(null),
  pelayaran_perintis_naik: Joi.number().allow(null),
  pelayaran_antar_pulau_naik: Joi.number().allow(null),
  keperluan_mendesak_naik: Joi.number().allow(null),

  tenaga_kerja_lanjutan: Joi.number().required(),
  awak_kapal_lanjutan: Joi.number().required(),
  pelayaran_terbatas_lanjutan: Joi.number().required(),
  pelayaran_perintis_lanjutan: Joi.number().required(),
  pelayaran_antar_pulau_lanjutan: Joi.number().required(),
  keperluan_mendesak_lanjutan: Joi.number().required(),

  roda_dua_turun: Joi.number().required(),
  roda_empat_turun: Joi.number().required(),
  bus_turun: Joi.number().required(),
  truk_turun: Joi.number().required(),
  jml_barang_turun: Joi.number().required(),
  satuan_barang_turun: Joi.string().allow(null),

  roda_dua_naik: Joi.number().allow(null),
  roda_empat_naik: Joi.number().allow(null),
  bus_naik: Joi.number().allow(null),
  truk_naik: Joi.number().allow(null),
  jml_barang_naik: Joi.number().allow(null),
  satuan_barang_naik: Joi.string().allow(null),

  general_cargo_turun: Joi.number().required(),
  curah_cair: Joi.number().required(),
  curah_kering: Joi.number().required(),
  container_turun: Joi.number().required(),

  general_cargo_naik: Joi.number().allow(null),
  curah_naik: Joi.number().allow(null),
  curah_kering_naik: Joi.number().allow(null),
  container_naik: Joi.number().allow(null),

  pasien_turun: Joi.number().required(),
  keluarga_turun: Joi.number().required(),
  orang_khusus_turun: Joi.number().required(),
  lembaga_turun: Joi.number().required(),

  pasien_naik: Joi.number().allow(null),
  keluarga_naik: Joi.number().allow(null),
  orang_khusus_naik: Joi.number().allow(null),
  lembaga_naik: Joi.number().allow(null),

  is_berangkat: Joi.number().valid(0, 1).required(),
  is_nihil: Joi.number().valid(0, 1).required(),
  keterangan_nihil: Joi.string().allow(null, "").optional(),
});

interface GetLautParams {
  pelabuhanId?: number | null;
  pelabuhanAsalId?: number | null;
  pelabuhanTujuanId?: number | null;
  provinsi?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  kapalId?: string | null;
  dateType?: "tanggal-datang" | "tanggal-berangkat" | "tanggal-input";
  search?: string | null;
  page?: number;
  limit?: number;
  filterBySimpul: string;
  isNihil?: boolean;
  jenis?: string;
}

export const queryReportLautSchema = Joi.object({
  pelabuhanId: Joi.string().allow("").optional(),
  pelabuhanAsalId: Joi.string().allow("").optional(),
  pelabuhanTujuanId: Joi.string().allow("").optional(),
  provinsi: Joi.string().allow("").optional(),
  startDate: Joi.string().allow("").isoDate().optional(),
  endDate: Joi.string().allow("").isoDate().optional(),
  search: Joi.string().allow("").optional(),
  page: Joi.string().allow("").optional(),
  limit: Joi.string().allow("").optional(),
  kapalId: Joi.string().allow("").optional(),
  filterBySimpul: Joi.string().valid("0", "1").required(),
  jenis: Joi.number().optional(),

  dateType: Joi.string()
    .valid("tanggal-datang", "tanggal-berangkat", "tanggal-input")
    .optional(),
});

export const reportLautNihilSchema = Joi.object({
  tgl_data: Joi.string().isoDate().required(),
  keterangan_nihil: Joi.string().allow("").optional(),
  id_pelabuhan: Joi.number().required(),
});

export const getDataSaranaLautOld = async (
  params: GetLautParams,
  userId: string
) => {
  try {
    const repository = AppDataSource.getRepository(DataSaranaLaut);
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
    const jenis = params?.jenis ? parseInt(params.jenis, 10) : null;
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

    let dateColumn = "laut.tgl_berangkat";

    switch (params.dateType) {
      case "tanggal-datang":
        dateColumn = "laut.tgl_datang";
        break;
      case "tanggal-input":
        dateColumn = "laut.created_date_naik";
        break;
      case "tanggal-berangkat":
      default:
        dateColumn = "laut.tgl_berangkat";
        break;
    }

    let query = repository
      .createQueryBuilder("laut")
      .leftJoin("laut.pelabuhan", "pelabuhan")
      .leftJoin("laut.pelabuhanAsal", "pelabuhanAsal")
      .leftJoin("laut.pelabuhanTujuan", "pelabuhanTujuan")
      .leftJoin("laut.kapal", "kapal")
      .leftJoin("kapal.perusahaan", "perusahaan")
      .addSelect([
        "pelabuhan.id",
        "pelabuhan.namaPelabuhan",
        "pelabuhan.idProvinsi",
        "pelabuhan.idKabupaten",

        "pelabuhanAsal.id",
        "pelabuhanAsal.namaPelabuhan",
        "pelabuhanAsal.idProvinsi",
        "pelabuhanAsal.idKabupaten",

        "pelabuhanTujuan.id",
        "pelabuhanTujuan.namaPelabuhan",
        "pelabuhanTujuan.idProvinsi",
        "pelabuhanTujuan.idKabupaten",

        "kapal.id",
        "kapal.idPerusahaan",
        "kapal.idJenisKapal",
        "kapal.namaKapal",
        "kapal.grt",

        "perusahaan.id",
        "perusahaan.namaPerusahaan",
      ])
      .andWhere("(:idProvinsi::int IS NULL OR pelabuhan.id = :idProvinsi)", {
        idProvinsi,
      })
      .andWhere("(:isNihil::int IS NULL OR laut.isNihil = :isNihil)", {
        isNihil,
      })
      .andWhere("(laut.isDelete = :isDelete)", { isDelete: 0 });

    if (has(params, "isNihil")) {
      query = query.andWhere("laut.isNihil = :isNihil", {
        isNihil: params.isNihil ? 1 : 0,
      });
    }
    if (params.pelabuhanAsalId) {
      query = query.andWhere("laut.id_plbh_asal = :pelabuhanAsalId", {
        pelabuhanAsalId: params.pelabuhanAsalId,
      });
    }
    if (params.pelabuhanTujuanId) {
      query = query.andWhere("laut.id_plbh_tujuan = :pelabuhanTujuanId", {
        pelabuhanTujuanId: params.pelabuhanTujuanId,
      });
    }
    if (params.pelabuhanId) {
      query = query.andWhere("laut.idPelabuhan = :pelabuhanId", {
        pelabuhanId: params.pelabuhanId,
      });
    }

    if (params.provinsi) {
      query = query.andWhere("pelabuhanAsal.provinsi = :provinsi", {
        provinsi: params.provinsi,
      });
    }

    if (params.kapalId) {
      query = query.andWhere("kapal.id = :kapalId", {
        kapalId: params.kapalId,
      });
    }

    const addOneDay = (dateString: string): string => {
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1);

      return date.toISOString().split("T")[0];
    };

    if (startDate && endDate) {
      const nextDay = addOneDay(endDate);
      query = query.andWhere(`${dateColumn} BETWEEN :startDate AND :endDate`, {
        startDate: startDate,
        endDate: nextDay,
      });
    } else if (startDate) {
      query = query.andWhere(`${dateColumn} >= :startDate`, {
        startDate: startDate,
      });
    } else if (endDate) {
      const nextDay = addOneDay(endDate);
      query = query.andWhere(`${dateColumn} <= :endDate`, {
        endDate: nextDay,
      });
    }

    if (filterBySimpulUser && listIdPelabuhan.length > 0) {
      if (jenis === 1) {
        query.andWhere(
          `(laut.idPlbhAsal IN (:...listIdPelabuhan))
           AND (:idPelabuhan::int IS NULL OR laut.idPlbhAsal = :idPelabuhan)`,
          { listIdPelabuhan, idPelabuhan }
        );
      } else if (jenis === 2) {
        query.andWhere(
          `(laut.idPlbhTujuan IN (:...listIdPelabuhan))
           AND (:idPelabuhan::int IS NULL OR laut.idPlbhTujuan = :idPelabuhan)`,
          { listIdPelabuhan, idPelabuhan }
        );
      } else {
        query.andWhere(
          `(
            pelabuhan.id IN (:...listIdPelabuhan)
            OR laut.idPlbhAsal IN (:...listIdPelabuhan)
            OR laut.idPlbhTujuan IN (:...listIdPelabuhan)
            OR (laut.isNihil = 1 AND pelabuhan.id IN (:...listIdPelabuhan))
          )`,
          { listIdPelabuhan }
        );
      }
    }

    if (params.search) {
      query = query.andWhere(
        `(kapal.name ILIKE :search OR pelabuhan.name ILIKE :search OR pelabuhanAsal.name ILIKE :search OR pelabuhanTujuan.name ILIKE :search)`,
        { search: `%${params.search}%` }
      );
    }

    const totalQuery = query.clone();

    const total = await totalQuery.select("laut.id").getCount();

    const data = await query
      .orderBy("laut.createdDateNaik", "DESC")
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
    throw new Error("Gagal mengambil data sarana laut.");
  }
};

export const getDataSaranaLautNihil = async (
  params: GetLautParams,
  userId: string
) => {
  try {
    const repository = AppDataSource.getRepository(DataSaranaLaut);
    const repositoryUser = AppDataSource.getRepository(User);

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

    const startDate = params.startDate
      ? moment(params.startDate).startOf("day").format("YYYY-MM-DD")
      : null;

    const endDate = params.endDate
      ? moment(params.endDate).endOf("day").format("YYYY-MM-DD")
      : null;

    const addOneDay = (dateString: string): string => {
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1);
      return date.toISOString().split("T")[0];
    };

    let query = repository
      .createQueryBuilder("laut")
      .leftJoin("laut.pelabuhan", "pelabuhan")
      .leftJoin("laut.pelabuhanAsal", "pelabuhanAsal")
      .leftJoin("laut.pelabuhanTujuan", "pelabuhanTujuan")
      .leftJoin("laut.kapal", "kapal")
      .leftJoin("kapal.perusahaan", "perusahaan")
      .addSelect([
        "pelabuhan.id",
        "pelabuhan.namaPelabuhan",

        "pelabuhanAsal.id",
        "pelabuhanAsal.namaPelabuhan",

        "pelabuhanTujuan.id",
        "pelabuhanTujuan.namaPelabuhan",

        "kapal.id",
        "kapal.namaKapal",

        "perusahaan.id",
        "perusahaan.namaPerusahaan",
      ])
      .where("laut.isDelete = :isDelete", { isDelete: 0 })
      .andWhere("laut.isNihil = :isNihil", { isNihil: 1 });

    if (idPelabuhan) {
      query = query.andWhere("laut.idPelabuhan = :pelabuhanId", {
        pelabuhanId: idPelabuhan,
      });
    }

    if (startDate && endDate) {
      const nextDay = addOneDay(endDate);

      query = query.andWhere(
        `(
          (laut.tgl_berangkat BETWEEN :startDate AND :endDate)
          OR
          (laut.tgl_datang BETWEEN :startDate AND :endDate)
        )`,
        { startDate, endDate: nextDay }
      );
    }

    if (filterBySimpulUser && listIdPelabuhan.length > 0) {
      query = query.andWhere(
        `(
          pelabuhan.id IN (:...listIdPelabuhan)
          OR laut.idPlbhAsal IN (:...listIdPelabuhan)
          OR laut.idPlbhTujuan IN (:...listIdPelabuhan)
        )`,
        { listIdPelabuhan }
      );
    }

    const data = await query.orderBy("laut.createdDateNaik", "DESC").getMany();
    const total = data.length;

    return {
      status: true,
      message: "Data sarana laut nihil berhasil diambil",
      data,
      total,
    };
  } catch (err) {
    console.error("Gagal fetching data nihil:", err);
    throw new Error("Gagal mengambil data sarana laut nihil.");
  }
};

export const getDataSaranaLaut = async (
  params: GetLautParams,
  userId: string
) => {
  try {
    const manager = AppDataSource.manager;
    const userRepo = AppDataSource.getRepository(User);

    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 10;
    const offset = (page - 1) * limit;

    const user = await userRepo.findOneBy({ id: userId });
    const simpulData = (user?.simpul ?? [])
      .map((s, i) => (s === "pelabuhan-asdp" ? user?.simpulId?.[i] : null))
      .filter(Boolean);

    const listIdPelabuhan = compact(simpulData).map(Number);
    const filterBySimpulUser = params.filterBySimpul === "1";

    const idPelabuhan = params.pelabuhanId ? Number(params.pelabuhanId) : null;

    const jenis = params.jenis ? Number(params.jenis) : null;

    const startDate = params.startDate
      ? moment(params.startDate).startOf("day").format("YYYY-MM-DD")
      : null;
    const endDate = params.endDate
      ? moment(params.endDate).endOf("day").format("YYYY-MM-DD")
      : null;

    const sumber = ""; // INAPORTNET || "STRATEGI"

    let dateColumn = `laut_all."tglBerangkat"`;
    if (params.dateType === "tanggal-datang")
      dateColumn = `laut_all."tglDatang"`;
    if (params.dateType === "tanggal-input")
      `laut_all."createdDateTurun"` !== null
        ? (dateColumn = `laut_all."createdDateTurun"`)
        : (dateColumn = `laut_all."createdDateNaik"`);

    const sql = `
      SELECT * FROM (

      ---------------------------------------------------------------------------
      --  STRATEGI
      ---------------------------------------------------------------------------
      SELECT
        s.id::text AS ID,

        s.id AS "idStrategi",
        NULL::text AS "nomorPkk",
        NULL::text AS "nomorSpb",

        s.id_pelabuhan AS "idPelabuhan",

        s.id_kapal AS "idKapal",

        s.kapasitas,
        s.dispensasi,
        s.kapasitas_dispensasi AS "kapasitasDispensasi",
        s.pass_factor AS "passFactor",
        s.selisih,
        s.gross_tonage AS "grossTonage",

        s.id_plbh_asal AS "idPlbhAsal",

        s.tgl_datang AS "tglDatang",
        s.jam_datang AS "jamDatang",
        s.jml_pnp_turun AS "jmlPnpTurun",
        s.jml_pnp_lanjutan AS "jmlPnpLanjutan",

        s.id_plbh_tujuan AS "idPlbhTujuan",

        s.tgl_berangkat AS "tglBerangkat",
        s.jam_berangkat AS "jamBerangkat",
        s.jml_pnp_berangkat AS "jmlPnpBerangkat",
        s.jml_diatas_kapal AS "jmlDiatasKapal",

        s.tenaga_kerja_turun AS "tenagaKerjaTurun",
        s.awak_kapal_turun AS "awakKapalTurun",
        s.pelayaran_terbatas_turun AS "pelayaranTerbatasTurun",
        s.pelayaran_perintis_turun AS "pelayaranPerintisTurun",
        s.pelayaran_antar_pulau_turun AS "pelayaranAntarPulauTurun",
        s.keperluan_mendesak_turun AS "keperluanMendesakTurun",

        s.tenaga_kerja_naik AS "tenagaKerjaNaik",
        s.awak_kapal_naik AS "awakKapalNaik",
        s.pelayaran_terbatas_naik AS "pelayaranTerbatasNaik",
        s.pelayaran_perintis_naik AS "pelayaranPerintisNaik",
        s.pelayaran_antar_pulau_naik AS "pelayaranAntarPulauNaik",
        s.keperluan_mendesak_naik AS "keperluanMendesakNaik",

        s.tenaga_kerja_lanjutan AS "tenagaKerjaLanjutan",
        s.awak_kapal_lanjutan AS "awakKapalLanjutan",
        s.pelayaran_terbatas_lanjutan AS "pelayaranTerbatasLanjutan",
        s.pelayaran_perintis_lanjutan AS "pelayaranPerintisLanjutan",
        s.pelayaran_antar_pulau_lanjutan AS "pelayaranAntarPulauLanjutan",
        s.keperluan_mendesak_lanjutan AS "keperluanMendesakLanjutan",

        s.roda_dua_turun AS "rodaDuaTurun",
        s.roda_empat_turun AS "rodaEmpatTurun",
        s.bus_turun AS "busTurun",
        s.truk_turun AS "trukTurun",
        s.jml_barang_turun AS "jmlBarangTurun",
        s.satuan_barang_turun AS "satuanBarangTurun",

        s.roda_dua_naik AS "rodaDuaNaik",
        s.roda_empat_naik AS "rodaEmpatNaik",
        s.bus_naik AS "busNaik",
        s.truk_naik AS "trukNaik",
        s.jml_barang_naik AS "jmlBarangNaik",
        s.satuan_barang_naik AS "satuanBarangNaik",


        COALESCE(NULLIF(s.general_cargo_turun::text, '')::int, 0) AS "generalCargoTurun",
        COALESCE(NULLIF(s.curah_cair::text, '')::int, 0) AS "curahCair",
        COALESCE(NULLIF(s.curah_kering::text, '')::int, 0) AS "curahKering",
        COALESCE(NULLIF(s.container_turun::text, '')::int, 0) AS "containerTurun",

        COALESCE(NULLIF(s.general_cargo_naik::text, '')::int, 0) AS "generalCargoNaik",
        COALESCE(NULLIF(s.curah_naik::text, '')::int, 0) AS "curahNaik",
        COALESCE(NULLIF(s.curah_kering_naik::text, '')::int, 0) AS "curahKeringNaik",
        COALESCE(NULLIF(s.container_naik::text, '')::int, 0) AS "containerNaik",

        s.pasien_turun AS "pasienTurun",
        s.keluarga_turun AS "keluargaTurun",
        s.orang_khusus_turun AS "orangKhususTurun",
        s.lembaga_turun AS "lembagaTurun",

        s.pasien_naik AS "pasienNaik",
        s.keluarga_naik AS "keluargaNaik",
        s.orang_khusus_naik AS "orangKhususNaik",
        s.lembaga_naik AS "lembagaNaik",

        s.is_berangkat AS "isBerangkat",
        s.is_nihil AS "isNihil",
        s.keterangan_nihil AS "keteranganNihil",
        s.is_delete AS "isDelete",

        DATE(s.created_date_turun) AS "createdDateTurun",
        CAST(s.created_date_turun AS time) AS "createdTimeTurun",
        DATE(s.created_date_naik) AS "createdDateNaik",
        CAST(s.created_date_naik AS time) AS "createdTimeNaik",

        'STRATEGI' AS sumber,

        COALESCE(
          jsonb_build_object(
            'id', k.id,
            'idPerusahaan', k.id_perusahaan,
            'idJenisKapal', k.id_jenis_kapal,
            'namaKapal', k.nama_kapal,
            'grt', k.grt,
            'perusahaan', jsonb_build_object(
                'id', p.id,
                'namaPerusahaan', p.nama_perusahaan
            )
          ),
          jsonb_build_object(
            'id', NULL,
            'namaKapal', k.nama_kapal,
            'grt', NULL,
            'idPerusahaan', NULL
          )
        ) AS "kapal",

        jsonb_build_object(
          'id', pel_asal.id,
          'namaPelabuhan', pel_asal.nama_pelabuhan,
          'idProvinsi', pel_asal.id_provinsi,
          'idKabupaten', pel_asal.id_kabupaten
        ) AS "pelabuhanAsal",

        jsonb_build_object(
          'id', pel_tuju.id,
          'namaPelabuhan', pel_tuju.nama_pelabuhan,
          'idProvinsi', pel_tuju.id_provinsi,
          'idKabupaten', pel_tuju.id_kabupaten
        ) AS "pelabuhanTujuan",

        jsonb_build_object(
          'id', s.id_pelabuhan,
          'namaPelabuhan', pel.nama_pelabuhan,
          'idProvinsi', pel.id_provinsi,
          'idKabupaten', pel.id_kabupaten
        ) AS "pelabuhan"

      FROM data_sarana_laut s
      LEFT JOIN mst_pelabuhan pel ON pel.id = s.id_pelabuhan
      LEFT JOIN mst_pelabuhan pel_asal ON pel_asal.id = s.id_plbh_asal
      LEFT JOIN mst_pelabuhan pel_tuju ON pel_tuju.id = s.id_plbh_tujuan
      LEFT JOIN mst_kapal k ON k.id = s.id_kapal
      LEFT JOIN mst_perusahaan p ON p.id = k.id_perusahaan


      UNION ALL

      ---------------------------------------------------------------------------
      --  INAPORTNET
      ---------------------------------------------------------------------------
      SELECT
      (ipn.nomor_pkk)::text AS ID,

      NULL::bigint AS "idStrategi",
      ipn.nomor_pkk AS "nomorPkk",
      ipn.nomor_spb AS "nomorSpb",

      pel.id AS "idPelabuhan",

      k.id AS "idKapal",

      ipn.kapasitas,
      NULL::int AS "dispensasi",
      NULL::int AS "kapasitasDispensasi",
      NULL::numeric AS "passFactor",
      NULL::int AS "selisih",
      ipn.gt::int AS "grossTonage",

      pela.id AS "idPlbhAsal",

      DATE(ipn.eta) AS "tglDatang",
      CAST(ipn.eta AS time) AS "jamDatang",

      ipn.penumpang_turun_dewasa::int AS "jmlPnpTurun",
      ipn.penumpang_lanjutan_dewasa::int AS "jmlPnpLanjutan",

      pelt.id AS "idPlbhTujuan",

      DATE(ipn.etd) AS tglBerangkat,
      CAST(ipn.etd AS time) AS "jamBerangkat",

      ipn.penumpang_naik_dewasa::int AS "jmlPnpBerangkat",
      NULL::int AS "jmlDiatasKapal",

      NULL::int AS "tenagaKerjaTurun",
      NULL::int AS "awakKapalTurun",
      NULL::int AS "pelayaranTerbatasTurun",
      NULL::int AS "pelayaranPerintisTurun",
      NULL::int AS "pelayaranAntarPulauTurun",
      NULL::int AS "keperluanMendesakTurun",

      NULL::int AS "tenagaKerjaNaik",
      NULL::int AS "awakKapalNaik",
      NULL::int AS "pelayaranTerbatasNaik",
      NULL::int AS "pelayaranPerintisNaik",
      NULL::int AS "pelayaranAntarPulauNaik",
      NULL::int AS "keperluanMendesakNaik",

      NULL::int AS "tenagaKerjaLanjutan",
      NULL::int AS "awakKapalLanjutan",
      NULL::int AS "pelayaranTerbatasLanjutan",
      NULL::int AS "pelayaranPerintisLanjutan",
      NULL::int AS "pelayaranAntarPulauLanjutan",
      NULL::int AS "keperluanMendesakLanjutan",

      ipn.kendaraan_turun_roda_2::int AS "rodaDuaTurun",
      ipn.kendaraan_turun_roda_4::int AS "rodaEmpatTurun",
      ipn.kendaraan_turun_bus::int AS "busTurun",
      ipn.kendaraan_turun_truk::int AS "trukTurun",
      cargo_turun.total_barang_turun::int AS "jmlBarangTurun",
      NULL::text AS "satuanBarangTurun",

      ipn.kendaraan_naik_roda_2::int AS "rodaDuaNaik",
      ipn.kendaraan_naik_roda_4::int AS "rodaEmpatNaik",
      ipn.kendaraan_naik_bus::int AS "busNaik",
      ipn.kendaraan_naik_truk::int AS "trukNaik",
      cargo_naik.total_barang_naik::int AS "jmlBarangNaik",
      NULL::text AS "satuanBarangNaik",

      COALESCE(NULLIF(cargo_turun.general_cargo_turun::text, '')::int, 0) AS "generalCargoTurun",
      COALESCE(NULLIF(curah_turun.curah_cair::text, '')::int, 0) AS "curahCair",
      COALESCE(NULLIF(curah_turun.curah_kering::text, '')::int, 0) AS "curahKering",
      COALESCE(NULLIF(cont_turun.container_turun::text, '')::int, 0) AS "containerTurun",

      COALESCE(NULLIF(cargo_naik.general_cargo_naik::text, '')::int, 0) AS "generalCargoNaik",
      COALESCE(NULLIF(curah_naik.curah_naik::text, '')::int, 0) AS "curahNaik",
      COALESCE(NULLIF(curah_naik.curah_kering_naik::text, '')::int, 0) AS "curahKeringNaik",
      COALESCE(NULLIF(cont_naik.container_naik::text, '')::int, 0) AS "containerNaik",

      ipn.penumpang_turun_bayi::int AS "pasienTurun",
      ipn.penumpang_turun_anak::int AS "keluargaTurun",
      NULL::int AS "orangKhususTurun",
      NULL::int AS "lembagaTurun",

      ipn.penumpang_naik_bayi::int AS "pasienNaik",
      ipn.penumpang_naik_anak::int AS "keluargaNaik",
      NULL::int AS "orangKhususNaik",
      NULL::int AS "lembagaNaik",

      1 AS "isBerangkat",
      0 AS "isNihil",
      NULL::text AS "keteranganNihil",
      0 AS "isDelete",

      DATE(ipn.created_date) AS "createdDateTurun",
      CAST(ipn.created_date AS time) AS "createdTimeTurun",
      DATE(ipn.created_date) AS "createdDateNaik",
      CAST(ipn.created_date AS time) AS "createdTimeNaik",

      'INAPORTNET' AS sumber,

     COALESCE(
        jsonb_build_object(
          'id', k.id,
          'idPerusahaan', k.id_perusahaan,
          'idJenisKapal', k.id_jenis_kapal,
          'namaKapal', ipn.nama_kapal,
          'grt', NULL,
          'perusahaan', jsonb_build_object(
              'id', p.id,
              'namaPerusahaan', ipn.nama_perusahaan
          )
        ),
        jsonb_build_object(
          'id', NULL,
          'namaKapal', ipn.nama_kapal,
          'grt', NULL,
          'idPerusahaan', NULL
        )
      ) AS "kapal",

      jsonb_build_object(
        'id', pela.id,
        'namaPelabuhan', pela.nama_pelabuhan,
        'idProvinsi', pela.id_provinsi,
        'idKabupaten', pela.id_kabupaten
      ) AS "pelabuhanAsal",

      jsonb_build_object(
        'id', pelt.id,
        'namaPelabuhan', pelt.nama_pelabuhan,
        'idProvinsi', pelt.id_provinsi,
        'idKabupaten', pelt.id_kabupaten
      ) AS "pelabuhanTujuan",

      jsonb_build_object(
        'id', pel.id,
        'namaPelabuhan', pel.nama_pelabuhan,
        'idProvinsi', pel.id_provinsi,
        'idKabupaten', pel.id_kabupaten
      ) AS "pelabuhan"

      FROM data_inaportnet_produksi ipn
      LEFT JOIN mst_kapal k
        ON LOWER(REPLACE(k.nama_kapal,' ',''))
        = LOWER(REPLACE(ipn.nama_kapal,' ',''))
      LEFT JOIN mst_pelabuhan pel ON pel.kode_referensi_pelabuhan_ipn = ipn.pelabuhan_singgah
      LEFT JOIN mst_pelabuhan pela ON pela.kode_referensi_pelabuhan_ipn = ipn.pelabuhan_asal
      LEFT JOIN mst_pelabuhan pelt ON pelt.kode_referensi_pelabuhan_ipn = ipn.pelabuhan_tujuan
      LEFT JOIN mst_perusahaan p ON p.id = k.id_perusahaan

      LEFT JOIN (
        SELECT nomor_pkk,
          SUM(jumlah_ton::int) AS total_barang_turun,
          SUM(CASE WHEN is_bongkar_muat='b' THEN jumlah_ton::int ELSE 0 END) AS general_cargo_turun
        FROM data_inaportnet_barang_produksi GROUP BY nomor_pkk
      ) cargo_turun ON cargo_turun.nomor_pkk = ipn.nomor_pkk

      LEFT JOIN (
        SELECT nomor_pkk,
          SUM(CASE WHEN jenis_kemasan='04' AND is_bongkar_muat='b' THEN jumlah_ton::int ELSE 0 END) AS curah_cair,
          SUM(CASE WHEN jenis_kemasan='03' AND is_bongkar_muat='b' THEN jumlah_ton::int ELSE 0 END) AS curah_kering
        FROM data_inaportnet_barang_produksi GROUP BY nomor_pkk
      ) curah_turun ON curah_turun.nomor_pkk = ipn.nomor_pkk

      LEFT JOIN (
        SELECT nomor_pkk,
          SUM(CASE WHEN jenis_kemasan IN ('06','08') AND is_bongkar_muat='b' THEN jumlah_ton::int ELSE 0 END) AS container_turun
        FROM data_inaportnet_barang_produksi GROUP BY nomor_pkk
      ) cont_turun ON cont_turun.nomor_pkk = ipn.nomor_pkk

      LEFT JOIN (
        SELECT nomor_pkk,
          SUM(jumlah_ton::int) AS total_barang_naik,
          SUM(CASE WHEN is_bongkar_muat='m' THEN jumlah_ton::int ELSE 0 END) AS general_cargo_naik
        FROM data_inaportnet_barang_produksi GROUP BY nomor_pkk
      ) cargo_naik ON cargo_naik.nomor_pkk = ipn.nomor_pkk

      LEFT JOIN (
        SELECT nomor_pkk,
          SUM(CASE WHEN jenis_kemasan='04' AND is_bongkar_muat='m' THEN jumlah_ton::int ELSE 0 END) AS curah_naik,
          SUM(CASE WHEN jenis_kemasan='03' AND is_bongkar_muat='m' THEN jumlah_ton::int ELSE 0 END) AS curah_kering_naik
        FROM data_inaportnet_barang_produksi GROUP BY nomor_pkk
      ) curah_naik ON curah_naik.nomor_pkk = ipn.nomor_pkk

      LEFT JOIN (
        SELECT nomor_pkk,
          SUM(CASE WHEN jenis_kemasan IN ('06','08') AND is_bongkar_muat='m' THEN jumlah_ton::int ELSE 0 END) AS container_naik
        FROM data_inaportnet_barang_produksi GROUP BY nomor_pkk
      ) cont_naik ON cont_naik.nomor_pkk = ipn.nomor_pkk

    ) AS laut_all
    `;

    const whereClauses: string[] = [];
    const paramsArr: any[] = [];
    let idx = 1;

    whereClauses.push(`laut_all."isDelete" = $${idx++}`);
    paramsArr.push(0);

    if (idPelabuhan) {
      whereClauses.push(`laut_all."idPelabuhan" = $${idx++}`);
      paramsArr.push(idPelabuhan);
    }

    if (sumber) {
      whereClauses.push(`laut_all."sumber" = $${idx++}`);
      paramsArr.push(sumber);
    }

    if (params.kapalId) {
      whereClauses.push(`laut_all."idKapal" = $${idx++}`);
      paramsArr.push(Number(params.kapalId));
    }

    if (params.dateType === "tanggal-input") {
      whereClauses.push(`laut_all."isNihil" = $${idx++}`);
      paramsArr.push(0);
    }

    if (startDate && endDate) {
      whereClauses.push(`${dateColumn} BETWEEN $${idx++} AND $${idx++}`);
      paramsArr.push(
        startDate,
        moment(endDate).add(1, "day").format("YYYY-MM-DD")
      );
    }

    if (filterBySimpulUser && listIdPelabuhan.length > 0) {
      whereClauses.push(
        `laut_all."idPelabuhan" IN (${listIdPelabuhan.join(",")})`
      );
    }

    const whereSQL = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    const countSql = `
      SELECT COUNT(*)::int AS total
      FROM (${sql}) AS laut_all
      ${whereSQL}
    `;
    const total = Number(
      (await manager.query(countSql, paramsArr))[0]?.total ?? 0
    );

    const dataSql = `
      SELECT *
      FROM (${sql}) AS laut_all
      ${whereSQL}
      ORDER BY laut_all."tglDatang" DESC NULLS LAST
      LIMIT ${limit} OFFSET ${offset}
    `;

    const rows = await manager.query(dataSql, paramsArr);

    // const pelIds = [...new Set(rows.map((r: any) => r.id_pelabuhan).filter(Boolean))];
    // const kapalIds = [...new Set(rows.map((r: any) => r.id_kapal).filter(Boolean))];

    // const pelList = await pelRepo.findBy({ id: In(pelIds) });
    // const kapalList = await kapalRepo.findBy({ id: In(kapalIds) });

    // const pelDict = Object.fromEntries(pelList.map(p => [p.id, p]));
    // const kapalDict = Object.fromEntries(kapalList.map(k => [k.id, k]));

    // const final = rows.map((r: any) => ({
    //   ...r,
    //   // pelabuhan: pelDict[r.id_pelabuhan] ?? null,
    //   // pelabuhanAsal: null,
    //   // pelabuhanTujuan: null,
    //   // kapal: kapalDict[r.id_kapal] ?? null,
    // }));

    const final = rows.map((r: any) => {
      let tglDatang = r.tglDatang;
      let tglBerangkat = r.tglBerangkat;
      let createdDateNaik = r.createdDateNaik;
      let createdDateTurun = r.createdDateTurun;

      if (tglDatang) {
        tglDatang = moment(tglDatang).add(7, "hours").format("YYYY-MM-DD");
      }

      if (tglBerangkat) {
        tglBerangkat = moment(tglBerangkat)
          .add(7, "hours")
          .format("YYYY-MM-DD");
      }

      if (createdDateNaik) {
        createdDateNaik = moment(createdDateNaik)
          .add(7, "hours")
          .format("YYYY-MM-DD");
      }

      if (createdDateTurun) {
        createdDateTurun = moment(createdDateTurun)
          .add(7, "hours")
          .format("YYYY-MM-DD");
      }

      return {
        ...r,
        tglDatang: tglDatang,
        tglBerangkat: tglBerangkat,
        createdDateNaik: createdDateNaik,
        createdDateTurun: createdDateTurun,
      };
    });

    return {
      data: final,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (err) {
    console.error("Database Operation Failed:", err);
    throw new Error("Gagal mengambil data sarana laut.");
  }
};

export const getDataSaranaLautId = async (id: string) => {
  try {
    const manager = AppDataSource.manager;

    const baseSql = `
      SELECT * FROM (

      ---------------------------------------------------------------------------
      --  STRATEGI
      ---------------------------------------------------------------------------
      SELECT
        s.id::text AS ID,

        s.id AS "idStrategi",
        NULL::text AS "nomorPkk",
        NULL::text AS "nomorSpb",

        s.id_pelabuhan AS "idPelabuhan",

        s.id_kapal AS "idKapal",

        s.kapasitas,
        s.dispensasi,
        s.kapasitas_dispensasi AS "kapasitasDispensasi",
        s.pass_factor AS "passFactor",
        s.selisih,
        s.gross_tonage AS "grossTonage",

        s.id_plbh_asal AS "idPlbhAsal",

        s.tgl_datang AS "tglDatang",
        s.jam_datang AS "jamDatang",
        s.jml_pnp_turun AS "jmlPnpTurun",
        s.jml_pnp_lanjutan AS "jmlPnpLanjutan",

        s.id_plbh_tujuan AS "idPlbhTujuan",

        s.tgl_berangkat AS "tglBerangkat",
        s.jam_berangkat AS "jamBerangkat",
        s.jml_pnp_berangkat AS "jmlPnpBerangkat",
        s.jml_diatas_kapal AS "jmlDiatasKapal",

        s.tenaga_kerja_turun AS "tenagaKerjaTurun",
        s.awak_kapal_turun AS "awakKapalTurun",
        s.pelayaran_terbatas_turun AS "pelayaranTerbatasTurun",
        s.pelayaran_perintis_turun AS "pelayaranPerintisTurun",
        s.pelayaran_antar_pulau_turun AS "pelayaranAntarPulauTurun",
        s.keperluan_mendesak_turun AS "keperluanMendesakTurun",

        s.tenaga_kerja_naik AS "tenagaKerjaNaik",
        s.awak_kapal_naik AS "awakKapalNaik",
        s.pelayaran_terbatas_naik AS "pelayaranTerbatasNaik",
        s.pelayaran_perintis_naik AS "pelayaranPerintisNaik",
        s.pelayaran_antar_pulau_naik AS "pelayaranAntarPulauNaik",
        s.keperluan_mendesak_naik AS "keperluanMendesakNaik",

        s.tenaga_kerja_lanjutan AS "tenagaKerjaLanjutan",
        s.awak_kapal_lanjutan AS "awakKapalLanjutan",
        s.pelayaran_terbatas_lanjutan AS "pelayaranTerbatasLanjutan",
        s.pelayaran_perintis_lanjutan AS "pelayaranPerintisLanjutan",
        s.pelayaran_antar_pulau_lanjutan AS "pelayaranAntarPulauLanjutan",
        s.keperluan_mendesak_lanjutan AS "keperluanMendesakLanjutan",

        s.roda_dua_turun AS "rodaDuaTurun",
        s.roda_empat_turun AS "rodaEmpatTurun",
        s.bus_turun AS "busTurun",
        s.truk_turun AS "trukTurun",
        s.jml_barang_turun AS "jmlBarangTurun",
        s.satuan_barang_turun AS "satuanBarangTurun",

        s.roda_dua_naik AS "rodaDuaNaik",
        s.roda_empat_naik AS "rodaEmpatNaik",
        s.bus_naik AS "busNaik",
        s.truk_naik AS "trukNaik",
        s.jml_barang_naik AS "jmlBarangNaik",
        s.satuan_barang_naik AS "satuanBarangNaik",


        COALESCE(NULLIF(s.general_cargo_turun::text, '')::int, 0) AS "generalCargoTurun",
        COALESCE(NULLIF(s.curah_cair::text, '')::int, 0) AS "curahCair",
        COALESCE(NULLIF(s.curah_kering::text, '')::int, 0) AS "curahKering",
        COALESCE(NULLIF(s.container_turun::text, '')::int, 0) AS "containerTurun",

        COALESCE(NULLIF(s.general_cargo_naik::text, '')::int, 0) AS "generalCargoNaik",
        COALESCE(NULLIF(s.curah_naik::text, '')::int, 0) AS "curahNaik",
        COALESCE(NULLIF(s.curah_kering_naik::text, '')::int, 0) AS "curahKeringNaik",
        COALESCE(NULLIF(s.container_naik::text, '')::int, 0) AS "containerNaik",

        s.pasien_turun AS "pasienTurun",
        s.keluarga_turun AS "keluargaTurun",
        s.orang_khusus_turun AS "orangKhususTurun",
        s.lembaga_turun AS "lembagaTurun",

        s.pasien_naik AS "pasienNaik",
        s.keluarga_naik AS "keluargaNaik",
        s.orang_khusus_naik AS "orangKhususNaik",
        s.lembaga_naik AS "lembagaNaik",

        s.is_berangkat AS "isBerangkat",
        s.is_nihil AS "isNihil",
        s.keterangan_nihil AS "keteranganNihil",
        s.is_delete AS "isDelete",

        DATE(s.created_date_turun) AS "createdDateTurun",
        CAST(s.created_date_turun AS time) AS "createdTimeTurun",
        DATE(s.created_date_naik) AS "createdDateNaik",
        CAST(s.created_date_naik AS time) AS "createdTimeNaik",

        'STRATEGI' AS sumber,

        COALESCE(
          jsonb_build_object(
            'id', k.id,
            'idPerusahaan', k.id_perusahaan,
            'idJenisKapal', k.id_jenis_kapal,
            'namaKapal', k.nama_kapal,
            'grt', k.grt,
            'perusahaan', jsonb_build_object(
                'id', p.id,
                'namaPerusahaan', p.nama_perusahaan
            )
          ),
          jsonb_build_object(
            'id', NULL,
            'namaKapal', k.nama_kapal,
            'grt', NULL,
            'idPerusahaan', NULL
          )
        ) AS "kapal",

        jsonb_build_object(
          'id', pel_asal.id,
          'namaPelabuhan', pel_asal.nama_pelabuhan,
          'idProvinsi', pel_asal.id_provinsi,
          'idKabupaten', pel_asal.id_kabupaten
        ) AS "pelabuhanAsal",

        jsonb_build_object(
          'id', pel_tuju.id,
          'namaPelabuhan', pel_tuju.nama_pelabuhan,
          'idProvinsi', pel_tuju.id_provinsi,
          'idKabupaten', pel_tuju.id_kabupaten
        ) AS "pelabuhanTujuan",

        jsonb_build_object(
          'id', s.id_pelabuhan,
          'namaPelabuhan', pel.nama_pelabuhan,
          'idProvinsi', pel.id_provinsi,
          'idKabupaten', pel.id_kabupaten
        ) AS "pelabuhan"

      FROM data_sarana_laut s
      LEFT JOIN mst_pelabuhan pel ON pel.id = s.id_pelabuhan
      LEFT JOIN mst_pelabuhan pel_asal ON pel_asal.id = s.id_plbh_asal
      LEFT JOIN mst_pelabuhan pel_tuju ON pel_tuju.id = s.id_plbh_tujuan
      LEFT JOIN mst_kapal k ON k.id = s.id_kapal
      LEFT JOIN mst_perusahaan p ON p.id = k.id_perusahaan


      UNION ALL

      ---------------------------------------------------------------------------
      --  INAPORTNET
      ---------------------------------------------------------------------------
      SELECT
      (ipn.nomor_pkk)::text AS ID,

      NULL::bigint AS "idStrategi",
      ipn.nomor_pkk AS "nomorPkk",
      ipn.nomor_spb AS "nomorSpb",

      pel.id AS "idPelabuhan",

      k.id AS "idKapal",

      ipn.kapasitas,
      NULL::int AS "dispensasi",
      NULL::int AS "kapasitasDispensasi",
      NULL::numeric AS "passFactor",
      NULL::int AS "selisih",
      ipn.gt::int AS "grossTonage",

      pela.id AS "idPlbhAsal",

      DATE(ipn.eta) AS "tglDatang",
      CAST(ipn.eta AS time) AS "jamDatang",

      ipn.penumpang_turun_dewasa::int AS "jmlPnpTurun",
      ipn.penumpang_lanjutan_dewasa::int AS "jmlPnpLanjutan",

      pelt.id AS "idPlbhTujuan",

      DATE(ipn.etd) AS tglBerangkat,
      CAST(ipn.etd AS time) AS "jamBerangkat",

      ipn.penumpang_naik_dewasa::int AS "jmlPnpBerangkat",
      NULL::int AS "jmlDiatasKapal",

      NULL::int AS "tenagaKerjaTurun",
      NULL::int AS "awakKapalTurun",
      NULL::int AS "pelayaranTerbatasTurun",
      NULL::int AS "pelayaranPerintisTurun",
      NULL::int AS "pelayaranAntarPulauTurun",
      NULL::int AS "keperluanMendesakTurun",

      NULL::int AS "tenagaKerjaNaik",
      NULL::int AS "awakKapalNaik",
      NULL::int AS "pelayaranTerbatasNaik",
      NULL::int AS "pelayaranPerintisNaik",
      NULL::int AS "pelayaranAntarPulauNaik",
      NULL::int AS "keperluanMendesakNaik",

      NULL::int AS "tenagaKerjaLanjutan",
      NULL::int AS "awakKapalLanjutan",
      NULL::int AS "pelayaranTerbatasLanjutan",
      NULL::int AS "pelayaranPerintisLanjutan",
      NULL::int AS "pelayaranAntarPulauLanjutan",
      NULL::int AS "keperluanMendesakLanjutan",

      ipn.kendaraan_turun_roda_2::int AS "rodaDuaTurun",
      ipn.kendaraan_turun_roda_4::int AS "rodaEmpatTurun",
      ipn.kendaraan_turun_bus::int AS "busTurun",
      ipn.kendaraan_turun_truk::int AS "trukTurun",
      cargo_turun.total_barang_turun::int AS "jmlBarangTurun",
      NULL::text AS "satuanBarangTurun",

      ipn.kendaraan_naik_roda_2::int AS "rodaDuaNaik",
      ipn.kendaraan_naik_roda_4::int AS "rodaEmpatNaik",
      ipn.kendaraan_naik_bus::int AS "busNaik",
      ipn.kendaraan_naik_truk::int AS "trukNaik",
      cargo_naik.total_barang_naik::int AS "jmlBarangNaik",
      NULL::text AS "satuanBarangNaik",

      COALESCE(NULLIF(cargo_turun.general_cargo_turun::text, '')::int, 0) AS "generalCargoTurun",
      COALESCE(NULLIF(curah_turun.curah_cair::text, '')::int, 0) AS "curahCair",
      COALESCE(NULLIF(curah_turun.curah_kering::text, '')::int, 0) AS "curahKering",
      COALESCE(NULLIF(cont_turun.container_turun::text, '')::int, 0) AS "containerTurun",

      COALESCE(NULLIF(cargo_naik.general_cargo_naik::text, '')::int, 0) AS "generalCargoNaik",
      COALESCE(NULLIF(curah_naik.curah_naik::text, '')::int, 0) AS "curahNaik",
      COALESCE(NULLIF(curah_naik.curah_kering_naik::text, '')::int, 0) AS "curahKeringNaik",
      COALESCE(NULLIF(cont_naik.container_naik::text, '')::int, 0) AS "containerNaik",

      ipn.penumpang_turun_bayi::int AS "pasienTurun",
      ipn.penumpang_turun_anak::int AS "keluargaTurun",
      NULL::int AS "orangKhususTurun",
      NULL::int AS "lembagaTurun",

      ipn.penumpang_naik_bayi::int AS "pasienNaik",
      ipn.penumpang_naik_anak::int AS "keluargaNaik",
      NULL::int AS "orangKhususNaik",
      NULL::int AS "lembagaNaik",

      1 AS "isBerangkat",
      0 AS "isNihil",
      NULL::text AS "keteranganNihil",
      0 AS "isDelete",

      DATE(ipn.created_date) AS "createdDateTurun",
      CAST(ipn.created_date AS time) AS "createdTimeTurun",
      DATE(ipn.created_date) AS "createdDateNaik",
      CAST(ipn.created_date AS time) AS "createdTimeNaik",

      'INAPORTNET' AS sumber,

     COALESCE(
        jsonb_build_object(
          'id', k.id,
          'idPerusahaan', k.id_perusahaan,
          'idJenisKapal', k.id_jenis_kapal,
          'namaKapal', ipn.nama_kapal,
          'grt', NULL,
          'perusahaan', jsonb_build_object(
              'id', p.id,
              'namaPerusahaan', ipn.nama_perusahaan
          )
        ),
        jsonb_build_object(
          'id', NULL,
          'namaKapal', ipn.nama_kapal,
          'grt', NULL,
          'idPerusahaan', NULL
        )
      ) AS "kapal",

      jsonb_build_object(
        'id', pela.id,
        'namaPelabuhan', pela.nama_pelabuhan,
        'idProvinsi', pela.id_provinsi,
        'idKabupaten', pela.id_kabupaten
      ) AS "pelabuhanAsal",

      jsonb_build_object(
        'id', pelt.id,
        'namaPelabuhan', pelt.nama_pelabuhan,
        'idProvinsi', pelt.id_provinsi,
        'idKabupaten', pelt.id_kabupaten
      ) AS "pelabuhanTujuan",

      jsonb_build_object(
        'id', pel.id,
        'namaPelabuhan', pel.nama_pelabuhan,
        'idProvinsi', pel.id_provinsi,
        'idKabupaten', pel.id_kabupaten
      ) AS "pelabuhan"

      FROM data_inaportnet_produksi ipn
      LEFT JOIN mst_kapal k
        ON LOWER(REPLACE(k.nama_kapal,' ',''))
        = LOWER(REPLACE(ipn.nama_kapal,' ',''))
      LEFT JOIN mst_pelabuhan pel ON pel.kode_referensi_pelabuhan_ipn = ipn.pelabuhan_singgah
      LEFT JOIN mst_pelabuhan pela ON pela.kode_referensi_pelabuhan_ipn = ipn.pelabuhan_asal
      LEFT JOIN mst_pelabuhan pelt ON pelt.kode_referensi_pelabuhan_ipn = ipn.pelabuhan_tujuan
      LEFT JOIN mst_perusahaan p ON p.id = k.id_perusahaan

      LEFT JOIN (
        SELECT nomor_pkk,
          SUM(jumlah_ton::int) AS total_barang_turun,
          SUM(CASE WHEN is_bongkar_muat='b' THEN jumlah_ton::int ELSE 0 END) AS general_cargo_turun
        FROM data_inaportnet_barang_produksi GROUP BY nomor_pkk
      ) cargo_turun ON cargo_turun.nomor_pkk = ipn.nomor_pkk

      LEFT JOIN (
        SELECT nomor_pkk,
          SUM(CASE WHEN jenis_kemasan='04' AND is_bongkar_muat='b' THEN jumlah_ton::int ELSE 0 END) AS curah_cair,
          SUM(CASE WHEN jenis_kemasan='03' AND is_bongkar_muat='b' THEN jumlah_ton::int ELSE 0 END) AS curah_kering
        FROM data_inaportnet_barang_produksi GROUP BY nomor_pkk
      ) curah_turun ON curah_turun.nomor_pkk = ipn.nomor_pkk

      LEFT JOIN (
        SELECT nomor_pkk,
          SUM(CASE WHEN jenis_kemasan IN ('06','08') AND is_bongkar_muat='b' THEN jumlah_ton::int ELSE 0 END) AS container_turun
        FROM data_inaportnet_barang_produksi GROUP BY nomor_pkk
      ) cont_turun ON cont_turun.nomor_pkk = ipn.nomor_pkk

      LEFT JOIN (
        SELECT nomor_pkk,
          SUM(jumlah_ton::int) AS total_barang_naik,
          SUM(CASE WHEN is_bongkar_muat='m' THEN jumlah_ton::int ELSE 0 END) AS general_cargo_naik
        FROM data_inaportnet_barang_produksi GROUP BY nomor_pkk
      ) cargo_naik ON cargo_naik.nomor_pkk = ipn.nomor_pkk

      LEFT JOIN (
        SELECT nomor_pkk,
          SUM(CASE WHEN jenis_kemasan='04' AND is_bongkar_muat='m' THEN jumlah_ton::int ELSE 0 END) AS curah_naik,
          SUM(CASE WHEN jenis_kemasan='03' AND is_bongkar_muat='m' THEN jumlah_ton::int ELSE 0 END) AS curah_kering_naik
        FROM data_inaportnet_barang_produksi GROUP BY nomor_pkk
      ) curah_naik ON curah_naik.nomor_pkk = ipn.nomor_pkk

      LEFT JOIN (
        SELECT nomor_pkk,
          SUM(CASE WHEN jenis_kemasan IN ('06','08') AND is_bongkar_muat='m' THEN jumlah_ton::int ELSE 0 END) AS container_naik
        FROM data_inaportnet_barang_produksi GROUP BY nomor_pkk
      ) cont_naik ON cont_naik.nomor_pkk = ipn.nomor_pkk

    ) AS laut_all
    `;

    const sql = `
      SELECT *
      FROM (${baseSql}) AS laut_all
      WHERE laut_all."id" = $1
      LIMIT 1
    `;

    const rows = await manager.query(sql, [id]);

    return rows?.[0] ?? null;
  } catch (err) {
    console.error("Failed get by ID:", err);
    throw new Error("Gagal mengambil data sarana laut.");
  }
};

export const createReportLaut = async (
  value: ReportLautParams,
  userId: string
) => {
  try {
    const reportData = {
      idPelabuhan: value.id_pelabuhan,
      idKapal: value.id_kapal,
      idPlbhAsal: value.id_plbh_asal,
      namaPerusahaan: value.nama_perusahaan ?? null,
      kapasitas: value.kapasitas ?? 0,
      dispensasi: value.dispensasi ?? 0,
      kapasitasDispensasi: value.kapasitas_dispensasi ?? 0,
      passFactor: String(value.pass_factor) ?? "0",
      selisih: value.selisih ?? 0,
      grossTonage: value.gross_tonage ?? 0,
      tglDatang: value?.tgl_datang ?? null,
      jamDatang: value?.jam_datang ?? null,
      jmlPnpTurun: value.jml_pnp_turun ?? 0,
      jmlPnpLanjutan: value.jml_pnp_lanjutan ?? 0,
      idPlbhTujuan: value.id_plbh_tujuan ?? 0,
      tglBerangkat: value?.tgl_berangkat ?? null,
      jamBerangkat: value?.jam_berangkat ?? null,
      jmlPnpBerangkat: value.jml_pnp_berangkat ?? 0,
      jmlDiatasKapal: value.jml_diatas_kapal ?? 0,

      tenagaKerjaTurun: value.tenaga_kerja_turun ?? 0,
      awakKapalTurun: value.awak_kapal_turun ?? 0,
      pelayaranTerbatasTurun: value.pelayaran_terbatas_turun ?? 0,
      pelayaranPerintisTurun: value.pelayaran_perintis_turun ?? 0,
      pelayaranAntarPulauTurun: value.pelayaran_antar_pulau_turun ?? 0,
      keperluanMendesakTurun: value.keperluan_mendesak_turun ?? 0,

      tenagaKerjaNaik: value.tenaga_kerja_naik ?? 0,
      awakKapalNaik: value.awak_kapal_naik ?? 0,
      pelayaranTerbatasNaik: value.pelayaran_terbatas_naik ?? 0,
      pelayaranPerintisNaik: value.pelayaran_perintis_naik ?? 0,
      pelayaranAntarPulauNaik: value.pelayaran_antar_pulau_naik ?? 0,
      keperluanMendesakNaik: value.keperluan_mendesak_naik ?? 0,

      tenagaKerjaLanjutan: value.tenaga_kerja_lanjutan ?? 0,
      awakKapalLanjutan: value.awak_kapal_lanjutan ?? 0,
      pelayaranTerbatasLanjutan: value.pelayaran_terbatas_lanjutan ?? 0,
      pelayaranPerintisLanjutan: value.pelayaran_perintis_lanjutan ?? 0,
      pelayaranAntarPulauLanjutan: value.pelayaran_antar_pulau_lanjutan ?? 0,
      keperluanMendesakLanjutan: value.keperluan_mendesak_lanjutan ?? 0,

      rodaDuaTurun: value.roda_dua_turun ?? 0,
      rodaEmpatTurun: value.roda_empat_turun ?? 0,
      busTurun: value.bus_turun ?? 0,
      trukTurun: value.truk_turun ?? 0,
      jmlBarangTurun: value.jml_barang_turun ?? 0,
      satuanBarangTurun: value.satuan_barang_turun ?? "",

      rodaDuaNaik: value.roda_dua_naik ?? 0,
      rodaEmpatNaik: value.roda_empat_naik ?? 0,
      busNaik: value.bus_naik ?? 0,
      trukNaik: value.truk_naik ?? 0,
      jmlBarangNaik: value.jml_barang_naik ?? 0,
      satuanBarangNaik: value.satuan_barang_naik ?? "",

      generalCargoTurun: value.general_cargo_turun ?? 0,
      curahCair: value.curah_cair ?? 0,
      curahKering: value.curah_kering ?? 0,
      containerTurun: value.container_turun ?? 0,

      generalCargoNaik: value.general_cargo_naik ?? 0,
      curahNaik: value.curah_naik ?? 0,
      curahKeringNaik: value.curah_kering_naik ?? 0,
      containerNaik: value.container_naik ?? 0,

      pasienTurun: value.pasien_turun ?? 0,
      keluargaTurun: value.keluarga_turun ?? 0,
      orangKhususTurun: value.orang_khusus_turun ?? 0,
      lembagaTurun: value.lembaga_turun ?? 0,

      pasienNaik: value.pasien_naik ?? 0,
      keluargaNaik: value.keluarga_naik ?? 0,
      orangKhususNaik: value.orang_khusus_naik ?? 0,
      lembagaNaik: value.lembaga_naik ?? 0,

      isBerangkat: value.is_berangkat ? 1 : 0,
      isNihil: value.is_nihil ? 1 : 0,
      keteranganNihil: value.keterangan_nihil ?? "",
    };

    const newReport = await AppDataSource.getRepository(DataSaranaLaut).save({
      ...reportData,
      createdDateTurun: new Date(),
      createdIdTurun: userId,
    });
    return newReport;
  } catch (dbError) {
    console.error("Database Operation Failed:", dbError);
    throw new Error("Gagal menyimpan data ke database.");
  }
};

export const updateReportLaut = async (
  id: string,
  value: Partial<ReportLautParams>,
  userId: string
) => {
  try {
    const repository = AppDataSource.getRepository(DataSaranaLaut);
    const reportToUpdate = await repository.findOneBy({ id });

    if (!reportToUpdate) {
      throw new Error(`Data dengan ID ${id} tidak ditemukan.`);
    }

    const reportData = {
      idPelabuhan: value.id_pelabuhan,
      idKapal: value.id_kapal,
      idPlbhAsal: value.id_plbh_asal,
      namaPerusahaan: value.nama_perusahaan ?? "",
      kapasitas: value.kapasitas ?? 0,
      dispensasi: value.dispensasi ?? 0,
      kapasitasDispensasi: value.kapasitas_dispensasi ?? 0,
      passFactor: String(value.pass_factor) ?? "0",
      selisih: value.selisih ?? 0,
      grossTonage: value.gross_tonage ?? 0,
      tglDatang: value.tgl_datang ?? "",
      jamDatang: value.jam_datang ?? "",
      jmlPnpTurun: value.jml_pnp_turun ?? 0,
      jmlPnpLanjutan: value.jml_pnp_lanjutan ?? 0,
      idPlbhTujuan: value.id_plbh_tujuan ?? 0,
      tglBerangkat: value?.tgl_berangkat ? new Date(value.tgl_berangkat) : null,
      jamBerangkat: value?.jam_berangkat ?? null,
      jmlPnpBerangkat: value?.jml_pnp_berangkat ?? 0,
      jmlDiatasKapal: value.jml_diatas_kapal ?? 0,

      tenagaKerjaTurun: value.tenaga_kerja_turun ?? 0,
      awakKapalTurun: value.awak_kapal_turun ?? 0,
      pelayaranTerbatasTurun: value.pelayaran_terbatas_turun ?? 0,
      pelayaranPerintisTurun: value.pelayaran_perintis_turun ?? 0,
      pelayaranAntarPulauTurun: value.pelayaran_antar_pulau_turun ?? 0,
      keperluanMendesakTurun: value.keperluan_mendesak_turun ?? 0,

      tenagaKerjaNaik: value.tenaga_kerja_naik ?? 0,
      awakKapalNaik: value.awak_kapal_naik ?? 0,
      pelayaranTerbatasNaik: value.pelayaran_terbatas_naik ?? 0,
      pelayaranPerintisNaik: value.pelayaran_perintis_naik ?? 0,
      pelayaranAntarPulauNaik: value.pelayaran_antar_pulau_naik ?? 0,
      keperluanMendesakNaik: value.keperluan_mendesak_naik ?? 0,

      tenagaKerjaLanjutan: value.tenaga_kerja_lanjutan ?? 0,
      awakKapalLanjutan: value.awak_kapal_lanjutan ?? 0,
      pelayaranTerbatasLanjutan: value.pelayaran_terbatas_lanjutan ?? 0,
      pelayaranPerintisLanjutan: value.pelayaran_perintis_lanjutan ?? 0,
      pelayaranAntarPulauLanjutan: value.pelayaran_antar_pulau_lanjutan ?? 0,
      keperluanMendesakLanjutan: value.keperluan_mendesak_lanjutan ?? 0,

      rodaDuaTurun: value.roda_dua_turun ?? 0,
      rodaEmpatTurun: value.roda_empat_turun ?? 0,
      busTurun: value.bus_turun ?? 0,
      trukTurun: value.truk_turun ?? 0,
      jmlBarangTurun: value.jml_barang_turun ?? 0,
      satuanBarangTurun: value.satuan_barang_turun ?? "",

      rodaDuaNaik: value.roda_dua_naik ?? 0,
      rodaEmpatNaik: value.roda_empat_naik ?? 0,
      busNaik: value.bus_naik ?? 0,
      trukNaik: value.truk_naik ?? 0,
      jmlBarangNaik: value.jml_barang_naik ?? 0,
      satuanBarangNaik: value.satuan_barang_naik ?? "",

      generalCargoTurun: value.general_cargo_turun ?? 0,
      curahCair: value.curah_cair ?? 0,
      curahKering: value.curah_kering ?? 0,
      containerTurun: value.container_turun ?? 0,

      generalCargoNaik: value.general_cargo_naik ?? 0,
      curahNaik: value.curah_naik ?? 0,
      curahKeringNaik: value.curah_kering_naik ?? 0,
      containerNaik: value.container_naik ?? 0,

      pasienTurun: value.pasien_turun ?? 0,
      keluargaTurun: value.keluarga_turun ?? 0,
      orangKhususTurun: value.orang_khusus_turun ?? 0,
      lembagaTurun: value.lembaga_turun ?? 0,

      pasienNaik: value.pasien_naik ?? 0,
      keluargaNaik: value.keluarga_naik ?? 0,
      orangKhususNaik: value.orang_khusus_naik ?? 0,
      lembagaNaik: value.lembaga_naik ?? 0,

      isBerangkat: value.is_berangkat ? 1 : 0,
      isNihil: value.is_nihil ? 1 : 0,
      keteranganNihil: value.keterangan_nihil ?? "",
    };

    const updatedEntity = Object.assign(
      {
        ...reportToUpdate,
        createdDateNaik: new Date(),
        createdIdNaik: userId,
      },
      reportData
    );

    const result = await repository.save(updatedEntity);
    return result;
  } catch (dbError) {
    console.error("Database Operation Failed:", dbError);
    throw new Error("Gagal memperbarui data kedatangan.");
  }
};

export const deleteReportLaut = async (id: string, updatedUser: string) => {
  try {
    const repository = AppDataSource.getRepository(DataSaranaLaut);
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

export const batchDeleteReportLaut = async (
  listDataSaranaBus: DataSaranaLaut[],
  updatedUser: string
) => {
  const updatePromises = listDataSaranaBus.map(async (data) => {
    try {
      if (data.id) {
        const result = await deleteReportLaut(data.id, updatedUser);
        return result;
      }

      return {};
    } catch (error) {
      return error;
    }
  });

  return await Promise.all(updatePromises);
};

export const updateNaikReportLaut = async (
  id: string,
  value: Partial<ReportLautParams>
) => {
  try {
    const repository = AppDataSource.getRepository(DataSaranaLaut);
    const reportToUpdate = await repository.findOneBy({ id });

    if (!reportToUpdate) {
      throw new Error(`Data dengan ID ${id} tidak ditemukan.`);
    }

    const reportData = {
      idPelabuhan: value.id_pelabuhan,
      idKapal: value.id_kapal,
      idPlbhAsal: value.id_plbh_asal,
      namaPerusahaan: value.nama_perusahaan ?? "",
      kapasitas: value.kapasitas ?? 0,
      dispensasi: value.dispensasi ?? 0,
      kapasitasDispensasi: value.kapasitas_dispensasi ?? 0,
      passFactor: String(value.pass_factor) ?? "0",
      selisih: value.selisih ?? 0,
      grossTonage: value.gross_tonage ?? 0,
      tglDatang: value.tgl_datang ?? "",
      jamDatang: value.jam_datang ?? "",
      jmlPnpTurun: value.jml_pnp_turun ?? 0,
      jmlPnpLanjutan: value.jml_pnp_lanjutan ?? 0,
      idPlbhTujuan: value.id_plbh_tujuan ?? 0,
      tglBerangkat: value.tgl_berangkat ?? "",
      jamBerangkat: value.jam_berangkat ?? "",
      jmlPnpBerangkat: value.jml_pnp_berangkat ?? 0,
      jmlDiatasKapal: value.jml_diatas_kapal ?? 0,

      tenagaKerjaTurun: value.tenaga_kerja_turun ?? 0,
      awakKapalTurun: value.awak_kapal_turun ?? 0,
      pelayaranTerbatasTurun: value.pelayaran_terbatas_turun ?? 0,
      pelayaranPerintisTurun: value.pelayaran_perintis_turun ?? 0,
      pelayaranAntarPulauTurun: value.pelayaran_antar_pulau_turun ?? 0,
      keperluanMendesakTurun: value.keperluan_mendesak_turun ?? 0,

      tenagaKerjaNaik: value.tenaga_kerja_naik ?? 0,
      awakKapalNaik: value.awak_kapal_naik ?? 0,
      pelayaranTerbatasNaik: value.pelayaran_terbatas_naik ?? 0,
      pelayaranPerintisNaik: value.pelayaran_perintis_naik ?? 0,
      pelayaranAntarPulauNaik: value.pelayaran_antar_pulau_naik ?? 0,
      keperluanMendesakNaik: value.keperluan_mendesak_naik ?? 0,

      tenagaKerjaLanjutan: value.tenaga_kerja_lanjutan ?? 0,
      awakKapalLanjutan: value.awak_kapal_lanjutan ?? 0,
      pelayaranTerbatasLanjutan: value.pelayaran_terbatas_lanjutan ?? 0,
      pelayaranPerintisLanjutan: value.pelayaran_perintis_lanjutan ?? 0,
      pelayaranAntarPulauLanjutan: value.pelayaran_antar_pulau_lanjutan ?? 0,
      keperluanMendesakLanjutan: value.keperluan_mendesak_lanjutan ?? 0,

      rodaDuaTurun: value.roda_dua_turun ?? 0,
      rodaEmpatTurun: value.roda_empat_turun ?? 0,
      busTurun: value.bus_turun ?? 0,
      trukTurun: value.truk_turun ?? 0,
      jmlBarangTurun: value.jml_barang_turun ?? 0,
      satuanBarangTurun: value.satuan_barang_turun ?? "",

      rodaDuaNaik: value.roda_dua_naik ?? 0,
      rodaEmpatNaik: value.roda_empat_naik ?? 0,
      busNaik: value.bus_naik ?? 0,
      trukNaik: value.truk_naik ?? 0,
      jmlBarangNaik: value.jml_barang_naik ?? 0,
      satuanBarangNaik: value.satuan_barang_naik ?? "",

      generalCargoTurun: value.general_cargo_turun ?? 0,
      curahCair: value.curah_cair ?? 0,
      curahKering: value.curah_kering ?? 0,
      containerTurun: value.container_turun ?? 0,

      generalCargoNaik: value.general_cargo_naik ?? 0,
      curahNaik: value.curah_naik ?? 0,
      curahKeringNaik: value.curah_kering_naik ?? 0,
      containerNaik: value.container_naik ?? 0,

      pasienTurun: value.pasien_turun ?? 0,
      keluargaTurun: value.keluarga_turun ?? 0,
      orangKhususTurun: value.orang_khusus_turun ?? 0,
      lembagaTurun: value.lembaga_turun ?? 0,

      pasienNaik: value.pasien_naik ?? 0,
      keluargaNaik: value.keluarga_naik ?? 0,
      orangKhususNaik: value.orang_khusus_naik ?? 0,
      lembagaNaik: value.lembaga_naik ?? 0,

      isBerangkat: value.is_berangkat ? 1 : 0,
      isNihil: value.is_nihil ? 1 : 0,
      keteranganNihil: value.keterangan_nihil ?? "",
    };

    const updatedEntity = Object.assign(reportToUpdate, reportData);
    const result = await repository.save(updatedEntity);
    return result;
  } catch (dbError) {
    console.error("Database Operation Failed:", dbError);
    throw new Error("Gagal memperbarui data keberangkatan.");
  }
};
