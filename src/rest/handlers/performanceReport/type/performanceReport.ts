interface PerformanceReportData {
  pengelola: string;
  jumlahSimpul: number;
  jumlahPantau: number;
  simpulMelapor: number;
  laporanMasuk: number;
  targetLaporan: number;
  persentase: string;
}

export interface PerformanceReportResponse {
  status: boolean;
  data: PerformanceReportData[];
}
