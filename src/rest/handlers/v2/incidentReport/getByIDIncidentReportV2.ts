import { AppDataSource } from '@/data-source';
import { Request, Response } from 'express';
import { createErrorResponse } from '@/utils/error';
import { formatDateWithZone, getStatusKejadianName, getStatusName } from '@/utils/StatusConvert';
import { In } from 'typeorm'; // Tambahkan impor In

import { LaporanKejadianV2 } from '@/entities/LaporanKejadianV2';
import { Role } from '@/entities/Role'; // Tambahkan impor Role
import { KejadianMenonjolSingleResponse } from './type/getIncidentReportV2';

export const getByIDIncidentReportHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const laporanRepository = AppDataSource.getRepository(LaporanKejadianV2);

    const laporanKejadian = await laporanRepository.findOne({
      where: { id },
      relations: ['laporanKejadianDetail'],
    });

    if (!laporanKejadian) {
      const errorResponse = createErrorResponse('Laporan kejadian not found', 404);
      return res.status(errorResponse.statusCode).json(errorResponse);
    }

    // Get role names untuk eselonTerkait
    const allEselonIds = laporanKejadian.eselonTerkait || [];
    const roleRepository = AppDataSource.getRepository(Role);
    const roles = allEselonIds.length > 0 ? await roleRepository.findBy({ id: In(allEselonIds) }) : [];
    const roleMap = new Map(roles.map((role) => [role.id.toString(), role.name]));
    const eselonTerkaitNames = laporanKejadian.eselonTerkait?.map((id) => roleMap.get(id) || id) || null;

    const timezoneOffset = laporanKejadian.waktuKejadianZone ?? 7;
    const formatAllDates = (date: Date | null): string | null => {
      if (!date) return null;
      return formatDateWithZone(date, timezoneOffset);
    };

    // Transformasi data
    const transformedLaporan = {
      id: laporanKejadian.id,
      nama: laporanKejadian.nama || null,
      email: laporanKejadian.email || null,
      lokasi: laporanKejadian.lokasi || null,
      longitude: laporanKejadian.longitude || null,
      latitude: laporanKejadian.latitude || null,
      status: laporanKejadian.status !== null ? getStatusName(laporanKejadian.status) : null,
      dampak: laporanKejadian.dampak || null,
      kategori: laporanKejadian.kategori || null,
      no_hp: laporanKejadian.noHp || null,
      waktu_kejadian: laporanKejadian.waktuKejadian ? formatDateWithZone(laporanKejadian.waktuKejadian, timezoneOffset) : null,
      kronologi_kejadian: laporanKejadian.kronologiKejadian || null,
      data_pendukung: laporanKejadian.updateDataPendukung == null ? laporanKejadian.dataPendukung || null : laporanKejadian.updateDataPendukung,
      eselon_terkait: eselonTerkaitNames || null,
      upt_terkait: laporanKejadian.uptTerkait || null,
      catatan_tindak_lanjut_awal: null,
      jenis_kejadian: laporanKejadian.jenisKejadian || null,
      id_pelapor: laporanKejadian.idPelapor || null,
      nama_pelapor: laporanKejadian.namaPelapor || null,
      id_verifikator_1: laporanKejadian.idVerifikator1 || null,
      tanggal_verifikasi_1: formatAllDates(laporanKejadian.tanggalVerifikasi1),
      id_verifikator_2: laporanKejadian.idVerifikator2 || null,
      tanggal_verifikasi_2: formatAllDates(laporanKejadian.tanggalVerifikasi2),
      catatan_verifikator_2: laporanKejadian.catatanVerifikator2 || null,
      id_verifikator_3: laporanKejadian.idVerifikator3 || null,
      tanggal_verifikasi_3: formatAllDates(laporanKejadian.tanggalVerifikasi3),
      catatan_verifikator_3: laporanKejadian.catatanVerifikator3 || null,
      tanggal_tutup_laporan: formatAllDates(laporanKejadian.tanggalTutupLaporan),
      catatan_tutup_laporan: laporanKejadian.catatanTutupLaporan || null,
      create_date: formatAllDates(laporanKejadian.createDate),
      tindak_lanjut: laporanKejadian.tindakLanjutAwal || null,
      status_kejadian: getStatusKejadianName(laporanKejadian.statusKejadian),
    };
    const response: KejadianMenonjolSingleResponse = {
      success: true,
      data: transformedLaporan,
    };
    
    return res.status(200).json(response);
  } catch (err) {
    console.error('Error fetching laporan by ID:', err);
    const errorResponse = createErrorResponse('Failed to fetch laporan kejadian', 500);
    return res.status(errorResponse.statusCode).json(errorResponse);
  }
};
