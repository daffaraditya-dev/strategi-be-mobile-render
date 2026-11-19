export interface KejadianMenonjolResponse {
  id: string;
  nama: string | null;
  email: string | null;
  lokasi: string | null;
  longitude: number | null;
  latitude: number | null;
  status: string | null;
  dampak: string | null;
  kategori: string | null;
  no_hp: string | null;
  waktu_kejadian: string | null; // Diubah dari Date | null menjadi string | null
  kronologi_kejadian: string | null;
  data_pendukung: string[] | null;
  eselon_terkait: string[] | null;
  upt_terkait: string[] | null;
  catatan_tindak_lanjut_awal: null;
  jenis_kejadian: string | null;
  id_pelapor: string | null;
  nama_pelapor: string | null;
  id_verifikator_1: string | null;
  tanggal_verifikasi_1: string | null;
  id_verifikator_2: string | null;
  tanggal_verifikasi_2: string | null;
  catatan_verifikator_2: string | null;
  id_verifikator_3: string | null;
  tanggal_verifikasi_3: string | null;
  catatan_verifikator_3: string | null;
  tanggal_tutup_laporan: string | null;
  catatan_tutup_laporan: string | null;
  create_date: string | null;
  tindak_lanjut: string | null;
  status_kejadian: string | null;
}

export interface KejadianMenonjolDataList {
  id: string;
  nama: string | null;
  status: string | null;
  nama_pelapor: string | null;
  upt_terkait: string[] | null;
  lokasi: string | null;
  eselon_terkait: string[] | null;
  waktu_kejadian: string | null;
  jenis_kejadian: string | null;
  laporan_tindaklanjut_list: string[] | null;
  create_date: string | null;
  reason_reject: string | null;
}

export interface KejadianMenonjolTindakLanjutData {
  id: string;
  id_laporan_kejadian: string;
  id_user: string;
  nama_user: string | null;
  tindak_lanjut: string | null;
  create_date: string | null;
  waktu_tindak_lanjut: string | null;
  id_verifikator_2: string;
  nama_verifikator_2: string | null;
  tanggal_verifikasi_2: string | null;
  id_verifikator_3: string;
  nama_verifikator_3: string | null;
  tanggal_verifikasi_3: string | null;
  status_verifikasi: number | null;
  status_enum: string | null;
  id_reject_tindaklanjut: string;
  nama_reject_tindaklanjut: string | null;
  tanggal_reject_tindaklanjut: string | null;
}

export interface KejadianMenonjolTindakLanjutResponse {
  success: boolean;
  data: KejadianMenonjolTindakLanjutData[];
}

export interface KejadianMenonjolListResponse {
  success: boolean;
  data: KejadianMenonjolDataList[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface KejadianMenonjolSingleResponse {
  success: boolean;
  data: KejadianMenonjolResponse;
}
