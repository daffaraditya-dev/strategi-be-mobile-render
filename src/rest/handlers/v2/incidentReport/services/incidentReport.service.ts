import {
  IncidentReportParams,
  tindakLanjutParams,
} from "../type/incidentReportType";
import { AppDataSource } from "@/data-source";
import { FileUpload } from "@/entities/FileUpload";
import { LaporanKejadianV2 } from "@/entities/LaporanKejadianV2";
import { randomUUID } from "crypto";
import { sendFCMToTopic } from "./fcm.service";
import { LaporanKejadianTindakLanjut } from "@/entities/LaporanKejadianTindakLanjut";

async function getFilesByIds(ids: string[]) {
  if (!ids.length) return [];
  const repo = AppDataSource.getRepository(FileUpload);
  return await repo
    .createQueryBuilder("f")
    .where("f.id IN (:...ids)", { ids })
    .getMany();
}

export const createIncidentReport = async (value: IncidentReportParams) => {
  const file = AppDataSource.getRepository(FileUpload);

  const {
    nama_laporan,
    nama_pelapor,
    email,
    no_tlp,
    kronologi_kejadian,
    dampak,
    jenis_kejadian,
    waktu_kejadian,
    waktu_kejadian_zone,
    data_pendukung,
    lokasi,
    longitude,
    latitude,
    upt_terkait,
    eselon_terkait,
    id_verifikator_1,
    catatan_tindak_lanjut_awal,
  } = value;

  const dataFile = await getFilesByIds(data_pendukung || []);

  const listOfFile = dataFile
    ?.map((f) => {
      if (!f?.path) return null;
      return f.path.substring(f.path.lastIndexOf("/") + 1);
    })
    .filter((item): item is string => item !== null);

  try {
    const incidentReport = {
      nama: nama_laporan,
      kategori: "kejadian Menonjol",
      idPelapor: id_verifikator_1,
      namaPelapor: nama_pelapor,
      email: email,
      noHp: no_tlp,
      kronologiKejadian: kronologi_kejadian,
      dampak: dampak,
      jenisKejadian: jenis_kejadian,
      waktuKejadian: waktu_kejadian,
      waktuKejadianZone: waktu_kejadian_zone,
      dataPendukung: listOfFile,
      lokasi: lokasi,
      longitude: longitude,
      latitude: latitude,
      uptTerkait: upt_terkait,
      eselonTerkait: eselon_terkait,
      idVerifikator1: id_verifikator_1,
      status: 5,
      tindakLanjutAwal: catatan_tindak_lanjut_awal,
      // statusKejadian: 0,
    };

    const report = await AppDataSource.getRepository(LaporanKejadianV2).save({
      id: randomUUID(),
      ...incidentReport,
    });

    const tindakLanjut1 = {
      tindakLanjut: catatan_tindak_lanjut_awal,
      idLaporanKejadian: report.id,
      waktuTindakLanjut: waktu_kejadian,
      statusVerifikasi: 4,
      tanggalVerifikasi2: new Date(),
      tanggalVerifikasi3: new Date(),
    };

    if (catatan_tindak_lanjut_awal != null) {
      await AppDataSource.getRepository(LaporanKejadianTindakLanjut).save({
        id: randomUUID(),
        idUser: id_verifikator_1,
        idVerifikator2: id_verifikator_1,
        idVerifikator3: id_verifikator_1,
        ...tindakLanjut1,
      });
    }

    if (data_pendukung && data_pendukung.length > 0) {
      await file.delete(data_pendukung);
    }

    await sendFCMToTopic({
      topic: "SUPERVISOR",
      title: "Laporan Kejadian Masuk",
      body: `Laporan kejadian ${report.nama} perlu verifikasi supervisor.`,
    });

    return report;
  } catch (dbError) {
    console.error("DB ERROR:", dbError);
    throw dbError;
  }
};

export const createTindakLanjut = async (
  value: tindakLanjutParams,
  idUser: string,
) => {
  const file = AppDataSource.getRepository(FileUpload);

  const reportRepository = AppDataSource.getRepository(LaporanKejadianV2);

  const {
    id_laporan_kejadian,
    tindak_lanjut,
    waktu_tindak_lanjut,
    data_pendukung_tindak_lanjut,
  } = value;

  const dataFile = await getFilesByIds(data_pendukung_tindak_lanjut || []);

  const listOfFile = dataFile
    ?.map((f) => {
      if (!f?.path) return null;
      return f.path.substring(f.path.lastIndexOf("/") + 1);
    })
    .filter((item): item is string => item !== null);

  const getReport = await reportRepository.findOneBy({
    id: id_laporan_kejadian,
  });

  if (!getReport) {
    throw new Error("laporan kejadian not found");
  }

  const getLaporanStatus = await reportRepository.findOne({
    where: { id: id_laporan_kejadian },
    select: {
      status: true,
    },
  });

  const getWaktuKejadian = await reportRepository.findOne({
    where: { id: id_laporan_kejadian },
    select: { waktuKejadian: true },
  });

  if (!getWaktuKejadian || !getWaktuKejadian.waktuKejadian) {
    throw new Error("waktu kejadian tidak valid atau kosong");
  }

  const kejadianDate = new Date(getWaktuKejadian.waktuKejadian);
  const tindakLanjutDate = new Date(waktu_tindak_lanjut);

  if (getLaporanStatus?.status == 2) {
    throw new Error("laporan sudah ditolak");
  }
  if (getLaporanStatus?.status != 7) {
    throw new Error("laporan belum diverifikasi tahap 3");
  }

  if (tindakLanjutDate < kejadianDate) {
    throw new Error("waktu tindak lanjut harus setelah waktu kejadian");
  }
  try {
    const insertTindakLanjut = {
      idLaporanKejadian: id_laporan_kejadian,
      idUser: idUser,
      tindakLanjut: tindak_lanjut,
      waktuTindakLanjut: waktu_tindak_lanjut,
      dataPendukungTindakLanjut: listOfFile,
      statusVerifikasi: 0,
    };

    const report = await AppDataSource.getRepository(
      LaporanKejadianTindakLanjut,
    ).save({
      id: randomUUID(),
      ...insertTindakLanjut,
    });

    if (
      data_pendukung_tindak_lanjut &&
      data_pendukung_tindak_lanjut.length > 0
    ) {
      await file.delete(data_pendukung_tindak_lanjut);
    }

    await sendFCMToTopic({
      topic: "SUPERVISOR",
      title: "Laporan Kejadian Masuk",
      body: `Laporan kejadian ${report.tindakLanjut} perlu verifikasi supervisor.`,
    });

    return report;
  } catch (dbError) {
    console.error("DB ERROR:", dbError);
    throw dbError;
  }
};
