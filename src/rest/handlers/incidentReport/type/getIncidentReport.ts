export interface IncidentReportResponse {
  id: string;
  nama: string | null;
  email: string | null;
  noHp: string | null;
  waktuKejadian: Date | null;
  kronologiKejadian: string | null;
  dataPendukung: string[] | null;
  lokasi: string | null;
  longitude: number | null;
  latitude: number | null;
  status: number | null;
  idVerifier: string | null;
  keterangan: string | null;
  modaTransportasi: string | null;
  kategori: string | null;
  updateLokasi: string | null;
  updateLongitude: number | null;
  updateLatitude: number | null;
  unitKerja: string | null;
  verifyDate: Date | null;
  idTindaklanjut: string | null;
  statusKejadian: number | null;
  tindakLanjut: string | null;
  dataPendukungTindaklanjut: string[] | null;
  waktuTindaklanjut: Date | null;
  createDate: Date | null;
  updateDate: Date | null;
  updateWaktuKejadian: Date | null;
  updateKronologiKejadian: string | null;
  updateDataPendukung: string[] | null;
  nextUpdateModaTransportasi: string | null;
  nextUpdateKategori: string | null;
  nextUpdateLokasi: string | null;
  nextUpdateLongitude: number | null;
  nextUpdateLatitude: number | null;
  nextUpdateWaktuKejadian: Date | null;
  nextUpdateKronologiKejadian: string | null;
  nextUpdateKeterangan: string | null;
}

export interface IncidentReportListResponse {
  success: boolean;
  data: IncidentReportResponse[];
  count: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IncidentReportSingleResponse {
  success: boolean;
  data: IncidentReportResponse;
}
