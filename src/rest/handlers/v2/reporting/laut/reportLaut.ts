import { Request, Response } from "express";
import {
  batchDeleteReportLaut,
  createReportLaut,
  deleteReportLaut,
  getDataSaranaLaut,
  getDataSaranaLautId,
  queryReportLautSchema,
  reportLautNihilSchema,
  reportLautSchema,
  updateReportLaut,
} from "./services/laut.service";
import { isEmpty } from "lodash";
import { exportReportLaut } from "./services/export.laut.service";

export const getReportLautHandler = async (req: Request, res: Response) => {
  const { error, value } = queryReportLautSchema.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId!;

    const result = await getDataSaranaLaut({ ...value }, id_user);

    return res.json({ status: true, ...result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const getReportLautIdHandler = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await getDataSaranaLautId(id);

    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const createReportLautHandler = async (req: Request, res: Response) => {
  const { error, value } = reportLautSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId!;

    const dataSaranaLautNihil = await getDataSaranaLaut(
      {
        startDate: value.tgl_data,
        endDate: value.tgl_data,
        pelabuhanId: value.id_pelabuhan,
        isNihil: true,
        filterBySimpul: "1",
      },
      id_user
    );

    const listData = dataSaranaLautNihil.data || [];

    // batch delete
    await batchDeleteReportLaut(listData as any, id_user);

    const result = await createReportLaut({ ...value }, id_user);

    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const updateReportLautHandler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { error, value } = reportLautSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId!;

    const result = await updateReportLaut(id, value, id_user);

    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const deleteReportLautHandler = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const id_user = req.auth?.userId!;

    const result = await deleteReportLaut(id, id_user);

    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const createNihilReportLautHandler = async (
  req: Request,
  res: Response
) => {
  const { error, value } = reportLautNihilSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId!;

    // check if is nihil not empty
    const dataSaranaLautNihil = await getDataSaranaLaut(
      {
        startDate: value.tgl_data,
        endDate: value.tgl_data,
        pelabuhanId: value.id_pelabuhan,
        filterBySimpul: "1",
      },
      id_user
    );

    if (!isEmpty(dataSaranaLautNihil.data)) {
      return res.json({
        status: false,
        data: {
          id: dataSaranaLautNihil.data?.[0]?.id,
        },
        message:
          "Sudah ada data laut berangkat maupun tiba di tanggal tersebut",
        code: 429,
      });
    }

    // get data sarana and update if exist

    const result = await createReportLaut(
      {
        keterangan_nihil: value.keterangan_nihil,
        id_pelabuhan: value.id_pelabuhan,
        id_plbh_asal: null,
        id_plbh_tujuan: null,
        is_nihil: true,
        id_kapal: 0,
        nama_perusahaan: null,
        kapasitas: 0,
        dispensasi: 0,
        kapasitas_dispensasi: 0,
        pass_factor: 0,
        selisih: 0,
        gross_tonage: 0,
        tgl_datang: value.tgl_data,
        jam_datang: null,
        jml_pnp_turun: null,
        jml_pnp_lanjutan: null,
        tgl_berangkat: value.tgl_data,
        jam_berangkat: null,
        jml_pnp_berangkat: null,
        jml_diatas_kapal: 0,
        tenaga_kerja_turun: null,
        awak_kapal_turun: null,
        pelayaran_terbatas_turun: null,
        pelayaran_perintis_turun: null,
        pelayaran_antar_pulau_turun: null,
        keperluan_mendesak_turun: null,
        tenaga_kerja_naik: null,
        awak_kapal_naik: null,
        pelayaran_terbatas_naik: null,
        pelayaran_perintis_naik: null,
        pelayaran_antar_pulau_naik: null,
        keperluan_mendesak_naik: null,
        tenaga_kerja_lanjutan: null,
        awak_kapal_lanjutan: null,
        pelayaran_terbatas_lanjutan: null,
        pelayaran_perintis_lanjutan: null,
        pelayaran_antar_pulau_lanjutan: null,
        keperluan_mendesak_lanjutan: null,
        roda_dua_turun: null,
        roda_empat_turun: null,
        bus_turun: null,
        truk_turun: null,
        jml_barang_turun: null,
        satuan_barang_turun: null,
        roda_dua_naik: null,
        roda_empat_naik: null,
        bus_naik: null,
        truk_naik: null,
        jml_barang_naik: null,
        satuan_barang_naik: null,
        general_cargo_turun: null,
        curah_cair: null,
        curah_kering: null,
        container_turun: null,
        general_cargo_naik: null,
        curah_naik: null,
        curah_kering_naik: null,
        container_naik: null,
        pasien_turun: null,
        keluarga_turun: null,
        orang_khusus_turun: null,
        lembaga_turun: null,
        pasien_naik: null,
        keluarga_naik: null,
        orang_khusus_naik: null,
        lembaga_naik: null,
        is_berangkat: null,
      },
      ""
    );
    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const exportReportLautHandler = async (req: Request, res: Response) => {
  const { error, value } = queryReportLautSchema.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId!;

    const result = await exportReportLaut({ ...value }, id_user);

    const buffer = await result.xlsx.writeBuffer();

    const filename = "data produksi Laut.xlsx";

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(buffer);
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
