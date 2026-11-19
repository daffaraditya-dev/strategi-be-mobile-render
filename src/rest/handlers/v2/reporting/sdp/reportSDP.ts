import { Request, Response } from "express";
import {
  approveSaranAsdp,
  batchDeleteReportSdp,
  createReportAsdp,
  deleteReportSdp,
  getDataSaranaSdp,
  getDataSaranaSdpId,
  queryApprovalLautSchema,
  queryReportSdpSchema,
  reportSdpNihilSchema,
  reportSdpSchema,
  updateReportAsdp,
} from "./services/sdp.service";
import { isEmpty } from "lodash";
import { DataSaranaAsdp } from "@/entities/DataSaranaAsdp";
import { exportReportSdp } from "./services/export.sdp.service";

export const getReportSdpHandler = async (req: Request, res: Response) => {
  const { error, value } = queryReportSdpSchema.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId!;

    const result = await getDataSaranaSdp({ ...value }, id_user);

    return res.json({ status: true, ...result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const getReportSdpIdHandler = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await getDataSaranaSdpId(id);

    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const createReportSdpHandler = async (req: Request, res: Response) => {
  const { error, value } = reportSdpSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId;

    const dataSaranaSdpNihil = await getDataSaranaSdp(
      {
        startDate: value.tgl_data,
        endDate: value.tgl_data,
        pelabuhanId: value.id_pelabuhan,
        isNihil: "1",
        filterBySimpul: "0",
        filterByApproval: "0",
      },
      id_user!
    );

    const listData = dataSaranaSdpNihil.data || [];

    // batch delete
    await batchDeleteReportSdp(
      listData as unknown as DataSaranaAsdp[],
      id_user!
    );

    const result = await createReportAsdp({ ...value, created_user: id_user });

    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const updateReportSdpHandler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { error, value } = reportSdpSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId;

    const result = await updateReportAsdp(
      { ...value, created_user: id_user },
      id
    );

    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const deleteReportSdpHandler = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const id_user = req.auth?.userId;

    const result = await deleteReportSdp(id, id_user!);

    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const createNihilReportSdpHandler = async (
  req: Request,
  res: Response
) => {
  const { error, value } = reportSdpNihilSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId!;

    // check if is nihil not empty
    const dataSaranaSdpNihil = await getDataSaranaSdp(
      {
        startDate: value.tgl_data,
        endDate: value.tgl_data,
        pelabuhanId: value.id_pelabuhan,
        filterBySimpul: "0",
        filterByApproval: "0",
      },
      id_user
    );

    if (!isEmpty(dataSaranaSdpNihil.data)) {
      return res.json({
        status: false,
        data: {
          id: dataSaranaSdpNihil.data?.[0]?.id,
        },
        message:
          "Sudah ada data laut berangkat maupun tiba di tanggal tersebut",
        code: 429,
      });
    }

    const result = await createReportAsdp({
      tgl_berangkat: value.tgl_data,
      jam_berangkat: null,
      tgl_datang: value.tgl_data,
      jam_datang: null,
      id_pelabuhan: value.id_pelabuhan,
      id_trayek: 0,
      jml_pnp_dewasa: 0,
      jml_pnp_anak: 0,
      jml_total_pnp: 0,
      goli: 0,
      pnpgoli: 0,
      golii: 0,
      pnpgolii: 0,
      goliii: 0,
      pnpgoliii: 0,
      goliva: 0,
      pnpgoliva: 0,
      golivb: 0,
      pnpgolivb: 0,
      golva: 0,
      pnpgolva: 0,
      golvb: 0,
      pnpgolvb: 0,
      golvia: 0,
      pnpgolvia: 0,
      golvib: 0,
      pnpgolvib: 0,
      golvii: 0,
      pnpgolvii: 0,
      golviii: 0,
      pnpgolviii: 0,
      golix: 0,
      pnpgolix: 0,
      jml_kendaraan: 0,
      jml_pnp_kendaraan: 0,
      total_penumpang: 0,
      is_nihil: true,
      lembaga: 0,
      pasien: 0,
      keluarga: 0,
      orang_khusus: 0,
      id_kapal: 0,
      nama_kapal: "",
      nama_perusahaan: "",
      lintasan_awal: "",
      lintasan_akhir: "",
      ukuran_kapal: "",
      is_delete: false,
      created_user: id_user,
      keterangan_nihil: value.keterangan_nihil,
    });
    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const exportReportSdpHandler = async (req: Request, res: Response) => {
  const { error, value } = queryReportSdpSchema.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId!;

    const result = await exportReportSdp({ ...value }, id_user);

    const buffer = await result.xlsx.writeBuffer();

    const filename = "data produksi sdp.xlsx";

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

export const approvalSdpHandler = async (req: Request, res: Response) => {
  const id = req.params.id;

  const { error, value } = queryApprovalLautSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId!;

    const result = await approveSaranAsdp(
      { ...value, approved_by: id_user },
      id,
      id_user!
    );

    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
