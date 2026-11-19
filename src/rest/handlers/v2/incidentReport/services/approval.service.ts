import { AppDataSource } from '@/data-source';
import { FileUpload } from '@/entities/FileUpload';
import { LaporanKejadianTindakLanjut } from '@/entities/LaporanKejadianTindakLanjut';
import { LaporanKejadianV2 } from '@/entities/LaporanKejadianV2';
import { sendFCMToTopic } from './fcm.service';
import { User } from '@/entities/User';

export interface approvalTindakLanjutParam {
  statusApproval: string;
  tanggalVerifikasi?: string;
}

export const approveTindakLanjut = async (value: approvalTindakLanjutParam, id: string, approvedBy: string) => {
  const repository = AppDataSource.getRepository(LaporanKejadianTindakLanjut);

  const reportToApprove = await repository.findOneBy({ id });

  const userOpt = await repository.findOneBy({ id: id });

  const user = AppDataSource.getRepository(User);

  const userInfo = await user.findOne({
    where: { id: userOpt?.idUser ?? '' },
    relations: ['role'],
  });

  const getWaktuTindakLanjut = await repository.findOne({
    where: { id: id },
    select: { waktuTindakLanjut: true },
  });

  if (!getWaktuTindakLanjut || !getWaktuTindakLanjut.waktuTindakLanjut) {
    throw new Error('waktu tindak lanjut tidak valid atau kosong');
  }

  const { tanggalVerifikasi } = value;

  const tindakLanjutDate = new Date(getWaktuTindakLanjut.waktuTindakLanjut);

  const tanggalVerifikasiValue = new Date(tanggalVerifikasi ?? new Date());

  if (tanggalVerifikasiValue < tindakLanjutDate) {
    throw new Error('Tanggal verifikasi tidak boleh lebih kecil dari tanggal tindak lanjut');
  }

  if (!reportToApprove) {
    throw new Error(`Data dengan ID ${id} tidak ditemukan.`);
  }

  switch (value.statusApproval) {
    case 'PENDING_VERIFIKASI_3':
      await repository.update(
        { id },
        {
          statusVerifikasi: 1,
          idVerifikator2: approvedBy,
          tanggalVerifikasi2: tanggalVerifikasiValue,
        },
      );
      await sendFCMToTopic({
        topic: 'KETUA-HARIAN',
        title: 'Laporan Kejadian Tindak Lanjut Masuk',
        body: `Laporan kejadian. ${reportToApprove.tindakLanjut} perlu verifikasi Ketua Harian.`,
      });
      break;

    case 'VERIFIED':
      await repository.update(
        { id },
        {
          statusVerifikasi: 2,
          idVerifikator3: approvedBy,
          tanggalVerifikasi3: tanggalVerifikasiValue,
        },
      );
      await sendFCMToTopic({
        topic: userInfo?.role?.name ?? '',
        title: 'Laporan Kejadian Tindak Lanjut Masuk',
        body: `Laporan kejadian ${reportToApprove.tindakLanjut} di-approve Ketua Harian.`,
      });
      break;

    case 'REJECTED':
      await repository.update(
        { id },
        {
          statusVerifikasi: 3,
          idRejectTindakLanjut: approvedBy,
          tanggalRejectTindakLanjut: tanggalVerifikasiValue,
        },
      );
      await sendFCMToTopic({
        topic: userInfo?.role?.name ?? '',
        title: 'Laporan Kejadian Tindak Lanjut Masuk',
        body: `Laporan kejadian ${reportToApprove.tindakLanjut} ditolak.`,
      });
      break;

    default:
      throw new Error('status approval tidak dikenal');
  }
  return { message: 'status laporan kejadian berhasil diperbarui.' };
};

export interface approvalIncidentReportParam {
  statusApproval: string;
  approvalNote?: string;
  tanggalVerifikasi?: string;
  dataPendukung?: string[];
}

async function getFilesByIds(ids: string[]) {
  if (!ids.length) return [];
  const repo = AppDataSource.getRepository(FileUpload);
  return await repo.createQueryBuilder('f').where('f.id IN (:...ids)', { ids }).getMany();
}

export const approveIncidentReportV2 = async (value: approvalIncidentReportParam, id: string, approvedBy: string) => {
  const repository = AppDataSource.getRepository(LaporanKejadianV2);

  const userOpt = await repository.findOneBy({ id: id });

  const file = AppDataSource.getRepository(FileUpload);

  const user = AppDataSource.getRepository(User);

  const userInfo = await user.findOne({
    where: { id: userOpt?.idVerifikator1 ?? '' },
    relations: ['role'],
  });

  const { simpulId, simpul, ...data } = userInfo as any;

  const reportToApprove = await repository.findOneBy({ id });

  if (!reportToApprove) {
    throw new Error(`Data dengan ID ${id} tidak ditemukan.`);
  }

  const { approvalNote, tanggalVerifikasi, dataPendukung } = value;

  const dataFile = await getFilesByIds(dataPendukung || []);

  const listOfFile = dataFile
    ?.map((f) => {
      if (!f?.path) return null;
      return f.path.substring(f.path.lastIndexOf('/') + 1);
    })
    .filter((item): item is string => item !== null);

  const existingData = reportToApprove?.updateDataPendukung ?? [];

  const mergedDataPendukung = [...existingData, ...(listOfFile || [])];

  const getWaktuKejadian = await repository.findOne({
    where: { id: id },
    select: { waktuKejadian: true },
  });

  if (!getWaktuKejadian || !getWaktuKejadian.waktuKejadian) {
    throw new Error('waktu kejadian tidak valid atau kosong');
  }

  const laporanKejadianDate = new Date(getWaktuKejadian.waktuKejadian);

  const tanggalVerifikasiValue = new Date(tanggalVerifikasi ?? new Date());

  if (tanggalVerifikasiValue < laporanKejadianDate) {
    throw new Error('Tanggal verifikasi tidak boleh lebih kecil dari tanggal kejadian');
  }

  switch (value.statusApproval) {
    case 'VERIF_3':
      await repository.update(id, {
        status: 6,
        idVerifikator2: approvedBy,
        tanggalVerifikasi2: tanggalVerifikasiValue,
        catatanVerifikator2: approvalNote,
      });
      await sendFCMToTopic({
        topic: 'KETUA-HARIAN',
        title: 'Laporan Kejadian Masuk',
        body: `Laporan kejadian ${reportToApprove.nama} perlu verifikasi Ketua Harian.`,
      });
      break;

    case 'TINDAK_LANJUT':
      await repository.update(id, {
        status: 7,
        idVerifikator3: approvedBy,
        tanggalVerifikasi3: tanggalVerifikasiValue,
        catatanVerifikator3: approvalNote,
      });
      await sendFCMToTopic({
        topic: userInfo?.role?.name ?? '',
        title: 'Laporan Kejadian Masuk',
        body: `Laporan kejadian ${reportToApprove.nama} di-approve Ketua Harian.`,
      });
      break;

    case 'CLOSED':
      await repository.update(id, {
        status: 3,
        statusKejadian: 1,
        tanggalTutupLaporan: tanggalVerifikasiValue,
        catatanTutupLaporan: approvalNote,
        updateDataPendukung: mergedDataPendukung,
      });
      if (dataPendukung && dataPendukung.length > 0) {
        await file.delete(dataPendukung);
      }
      break;

    case 'REJECT':
      await repository.update(id, {
        status: 2,
        keterangan: approvalNote,
      });
      await sendFCMToTopic({
        topic: userInfo?.role?.name ?? '',
        title: 'Laporan Kejadian Masuk',
        body: `Laporan kejadian ${reportToApprove.nama} ditolak.`,
      });
      break;

    default:
      throw new Error('status approval tidak dikenal');
  }
  return { message: 'status laporan kejadian berhasil diperbarui.' };
};
