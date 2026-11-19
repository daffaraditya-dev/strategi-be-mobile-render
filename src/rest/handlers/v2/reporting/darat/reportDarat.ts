import { Request, Response } from "express";
import {
  approveSaranaBus,
  batchDeleteReportDarat,
  createReportDarat,
  deleteReportDarat,
  getDataSaranaBus,
  getDataSaranaBusId,
  queryApprovalDaratSchema,
  queryReportDaratSchema,
  reportDaratNihilSchema,
  reportDaratSchema,
  updateReportDarat,
} from "./services/darat.service";
import { getDataMasterTerminal } from "@/rest/handlers/master/services/terminal.service";
import { isEmpty } from "lodash";
import { exportReportDarat } from "./services/export.darat.service";

export const getReportDaratHandler = async (req: Request, res: Response) => {
  const { error, value } = queryReportDaratSchema.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId!;

    const result = await getDataSaranaBus({ ...value }, id_user);

    return res.json({ status: true, ...result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const getReportDaratIdHandler = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await getDataSaranaBusId(id);

    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const createReportDaratHandler = async (req: Request, res: Response) => {
  const { error, value } = reportDaratSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId;

    // check if is nihil not empty
    const dataSaranaBusNihil = await getDataSaranaBus(
      {
        startDate: value.tgl_data,
        endDate: value.tgl_data,
        filterBySimpul: "1",
        filterByApproval: "0",
        terminalAsalId: value.jenis == "1" ? value.id_terminal : null,
        terminalTujuanId: value.jenis == "2" ? value.id_terminal : null,
        isNihil: true,
        jenis: null,
      },
      id_user!
    );

    const listData = dataSaranaBusNihil.data || [];

    await batchDeleteReportDarat(listData, id_user!);

    const result = await createReportDarat({ ...value, created_user: id_user });

    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const updateReportDaratHandler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { error, value } = reportDaratSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId;

    const result = await updateReportDarat(
      { ...value, created_user: id_user },
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

export const deleteReportDaratHandler = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const id_user = req.auth?.userId;

    const result = await deleteReportDarat(id, id_user!);

    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const createNihilReportDaratHandler = async (
  req: Request,
  res: Response
) => {
  const { error, value } = reportDaratNihilSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId!;

    // check if is nihil not empty
    const dataSaranaBusList = await getDataSaranaBus(
      {
        startDate: value.tgl_data,
        endDate: value.tgl_data,
        filterBySimpul: "0",
        filterByApproval: "0",
      },
      id_user
    );

    if (!isEmpty(dataSaranaBusList.data)) {
      return res.json({
        status: false,
        data: {
          id: dataSaranaBusList.data?.[0]?.id,
        },
        message: "Sudah ada data bus berangkat maupun tiba di tanggal tersebut",
        // code: 429
      });
    }

    const result = await createReportDarat({
      id_terminal_asal: value.id_terminal,
      id_terminal_tujuan: value.id_terminal,
      keterangan_nihil: value.keterangan_nihil,
      created_user: id_user,
      tgl_data: value.tgl_data,
      is_nihil: true,
      jam_data: null,
      nama_po: "",
      no_pol: "",
      jenis_bus: 3,
      mudik_gratis: 0,
      jml_penumpang_naik: 0,
      jml_penumpang_turun: 0,
      is_delete: false,
      orang_khusus: 0,
      pasien: 0,
      keluarga: 0,
      lembaga: 0,
      jenis: null,
    });
    return res.json({ status: true, data: result });
  } catch (err) {
    console.log(err, "error in transportationHubSeasonalHandler");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const exportReportDaratHandler = async (req: Request, res: Response) => {
  const { error, value } = queryReportDaratSchema.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId!;

    const result = await exportReportDarat({ ...value }, id_user);

    const buffer = await result.xlsx.writeBuffer();

    const filename = "data produksi jalan.xlsx";

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

export const approvalDaratHandler = async (req: Request, res: Response) => {
  const id = req.params.id;

  const { error, value } = queryApprovalDaratSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId!;

    const result = await approveSaranaBus(
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
