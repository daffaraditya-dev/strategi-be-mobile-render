import { Request, Response } from "express";
import {
  incidenteportSchema,
  tindakLanjutSchema,
} from "./type/incidentReportType";
import {
  createIncidentReport,
  createTindakLanjut,
} from "./services/incidentReport.service";
import { AppDataSource } from "@/data-source";
import { User } from "@/entities/User";

export const createIncidentReportHandler = async (
  req: Request,
  res: Response,
) => {
  const { error, value } = incidenteportSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId;
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: id_user });

    const incidentReport = await createIncidentReport({
      ...value,
      id_pelapor: id_user,
      id_verifikator_1: id_user,
      nama_pelapor: user?.fullname,
      email: user?.email,
      no_tlp: user?.noTelp,
    });

    return res.json({ status: true, data: incidentReport });
  } catch (err) {
    console.log(err, "error creating incident report");

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const CreateTindakLanjutHandler = async (
  req: Request,
  res: Response,
) => {
  const { error, value } = tindakLanjutSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const id_user = req.auth?.userId;
    if (!id_user) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const userRepository = AppDataSource.getRepository(User);

    const tindakLanjut = await createTindakLanjut(
      {
        ...value,
      },
      id_user,
    );

    return res.json({ status: true, data: tindakLanjut });
  } catch (err: any) {
    console.log("error creating tindak lanjut: ", err.message);

    const clientErrors = [
      "laporan sudah ditolak",
      "laporan belum diverifikasi tahap 3",
      "laporan kejadian not found",
      "waktu tindak lanjut harus setelah waktu kejadian",
    ];

    if (clientErrors.includes(err.message)) {
      return res.status(400).json({
        status: false,
        message: err.message,
      });
    }

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
