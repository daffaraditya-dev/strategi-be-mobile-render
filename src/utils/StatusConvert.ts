export enum StatusLaporan {
  OPEN = 0,
  ON_PROGRESS = 1,
  REJECT = 2,
  CLOSED = 3,
  VERIF_1 = 4,
  VERIF_2 = 5,
  VERIF_3 = 6,
  TINDAK_LANJUT = 7,
}

// Fungsi untuk mendapatkan nama status dari angka
export const getStatusName = (statusNumber: number): string => {
  return StatusLaporan[statusNumber];
};

// Fungsi untuk mendapatkan angka dari nama status
export const getStatusValue = (statusName: string): number => {
  return StatusLaporan[statusName as keyof typeof StatusLaporan];
};

// Fungsi untuk memformat tanggal ke format "DD-MM-YYYY HH:mm ZONE"
export function formatDateWithZone(date: Date, timezoneOffset: number): string {
  // Konversi waktu ke UTC terlebih dahulu, lalu tambahkan offset zona waktu yang diinginkan
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  const targetTime = new Date(utcTime + timezoneOffset * 3600000);

  const day = String(targetTime.getDate()).padStart(2, "0");
  const month = String(targetTime.getMonth() + 1).padStart(2, "0");
  const year = targetTime.getFullYear();
  const hours = String(targetTime.getHours()).padStart(2, "0");
  const minutes = String(targetTime.getMinutes()).padStart(2, "0");

  // Tentukan zona waktu berdasarkan offset
  let zone = "WIB"; // Default WIB
  if (timezoneOffset === 8) zone = "WITA";
  if (timezoneOffset === 9) zone = "WIT";

  return `${day}-${month}-${year} ${hours}:${minutes} ${zone}`;
}

export const getStatusKejadianName = (
  statusKejadian: number | null
): string | null => {
  if (statusKejadian === null) return null;
  switch (statusKejadian) {
    case 0:
      return "NOT_VALID";
    case 1:
      return "VALID";
    default:
      return statusKejadian.toString();
  }
};

export const getStatusVerifikasiToName = (
  statusVerifikasi: number | null
): string | null => {
  if (statusVerifikasi === null) return null;
  switch (statusVerifikasi) {
    case 0:
      return "PENDING_VERIFIKASI_2";
    case 1:
      return "PENDING_VERIFIKASI_3";
    case 2:
      return "VERIFIED";
    case 3:
      return "REJECTED";
    case 4:
      return "CLOSED";
    default:
      return "PENDING_VERIFIKASI_2";
  }
};
