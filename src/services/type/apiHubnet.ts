export type endpoints =
  | "data-pantau"
  | "data-produksi"
  | "data-produksi-pertitik";

export interface PantauProduksiSeasonalParams {
  event: number;
  provinsi?: string;
  moda: string;
  endpoints: endpoints[];
}

export interface PantauProduksiRutinParams {
  tanggal_awal_1: string;
  tanggal_akhir_1: string;
  tanggal_awal_2?: string;
  tanggal_akhir_2?: string;
  provinsi?: string;
  moda: string;
  endpoints: endpoints[];
}

export interface EventDetail {
  id: number;
  nama: string;
  tipe: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  prev_event: string;
  h_1: string;
  h_2: string;
  sub_nama: string;
  note_narasi: string;
  split_periode: string;
  flag: number;
}

export interface ResponseDataSiasatiStrategi {
  status: boolean;
  data: {
    event: EventDetail;
    prev_event: EventDetail[];
    result: {
      [key: string]: ResultData;
    };
  };
}

interface ResultData {
  request: {
    event_pantau: string;
    event: string;
    start_date: string;
    end_date: string;
  };
  data_pantau: {
    data: TitikPantau;
    status: boolean;
  };
  data_produksi?: {
    data: Produksi;
    status: boolean;
  };
  data_produksi_pertitik?: {
    data: ProduksiPertitik;
    status: boolean;
  };
}

export interface TitikPantauData {
  id_lokasi: number;
  kode_referensi: string;
  nama: string;
  nama_terminal?: string;
  kota: string;
  provinsi: string;
  longitude: string;
  latitude: string;
  koordinat: string;
  kategori: string;
  eventId?: number;
  tipe?: string;
  timezone?: string;
}

export interface TitikPantau {
  jalan: TitikPantauData[];
  asdp: TitikPantauData[];
  laut: TitikPantauData[];
  udara: TitikPantauData[];
  ka: TitikPantauData[];
  kai: TitikPantauData[];
  toll: TitikPantauData[];
  stasiun: TitikPantauData[];
  arteri: TitikPantauData[];
  toll_2: TitikPantauData[];
  terminalb: TitikPantauData[];
}

export interface Produksi {
  metaDataTimeRequest: ProduksiMetaDataTimeRequest[];
  tanggal_event: ProduksiTanggalEvent[];
  arteri: ProduksiArteri[];
  asdp: ProduksiAsdp[];
  jalan: ProduksiJalan[];
  laut: ProduksiLaut[];
  stasiun: ProduksiStasiun[];
  toll: ProduksiToll[];
  udara: ProduksiUdara[];
  terminalb: ProduksiJalan[];
}

export interface ProduksiArteri {
  jml_dari_jkt: string;
  jml_dari_jkt_bus: string;
  jml_dari_jkt_mobil: string;
  jml_dari_jkt_motor: string;
  jml_ke_jkt: string;
  jml_ke_jkt_bus: string;
  jml_ke_jkt_mobil: string;
  jml_ke_jkt_motor: string;
  tanggal: string;
  tgl: string;
  id_lokasi: string | number;
  jml_kendaraan?: string;
}

export interface ProduksiAsdp {
  bus: string;
  motor: string;
  pnp: string;
  roda4: string;
  roda4lebih: string;
  tanggal: string;
  tgl: string;
  totalkendaraan: string;
  trip: string;
  truk: string;
  id_lokasi: string | number;
}

export interface ProduksiJalan {
  bus_brgkt: string;
  bus_dtg: string;
  jml_pnp_brgkt: string;
  jml_pnp_dtg: string;
  tanggal: string;
  tgl: string;
  id_lokasi: string | number;
  nama_terminal?: string;
  kota?: string;
  provinsi?: string;
}

export interface ProduksiLaut {
  kapal_naik: string;
  kapal_turun: string;
  naik: string;
  tanggal: string;
  tgl: string;
  turun: string;
  id_lokasi: string | number;
}
export interface ProduksiMetaDataTimeRequest {
  arteri: number;
  asdp: number;
  jalan: number;
  kai: number;
  laut: number;
  toll: number;
  udara: number;
}
export interface ProduksiStasiun {
  kereta_berangkat_antarkota: string;
  kereta_berangkat_komuter: string;
  kereta_berangkat_perkotaan: string;
  kereta_datang_antarkota: string;
  kereta_datang_komuter: string;
  kereta_datang_perkotaan: string;
  penumpang_berangkat: string;
  penumpang_berangkat_antarkota: string;
  penumpang_berangkat_komuter: string;
  penumpang_berangkat_perkotaan: string;
  penumpang_datang: string;
  penumpang_datang_antarkota: string;
  penumpang_datang_komuter: string;
  penumpang_datang_perkotaan: string;
  tanggal: string;
  tgl: string;
  id_lokasi: string | number;
}
export interface ProduksiTanggalEvent {
  label: string;
  tanggal: string;
}
export interface ProduksiToll {
  jml_dari_jkt: string;
  jml_dari_jkt_gol_1: string;
  jml_dari_jkt_gol_2: string;
  jml_dari_jkt_gol_3: string;
  jml_dari_jkt_gol_4: string;
  jml_dari_jkt_gol_5: string;
  jml_dari_jkt_gol_6: string;
  jml_ke_jkt: string;
  jml_ke_jkt_gol_1: string;
  jml_ke_jkt_gol_2: string;
  jml_ke_jkt_gol_3: string;
  jml_ke_jkt_gol_4: string;
  jml_ke_jkt_gol_5: string;
  jml_ke_jkt_gol_6: string;
  jml_kendaraan: string;
  tanggal: string;
  tgl: string;
  id_lokasi: string | number;
}
export interface ProduksiUdara {
  jml_pnp_brkt: string;
  jml_pnp_brkt_dom: string;
  jml_pnp_brkt_intl: string;
  jml_pnp_dtg: string;
  jml_pnp_dtg_dom: string;
  jml_pnp_dtg_intl: string;
  jml_pswt_brkt: string;
  jml_pswt_brkt_dom: string;
  jml_pswt_brkt_intl: string;
  jml_pswt_dtg: string;
  jml_pswt_dtg_dom: string;
  jml_pswt_dtg_intl: string;
  tanggal: string;
  tgl: string;
  id_lokasi: string | number;
}

export interface ProduksiPertitik
  extends Omit<Produksi, "metaDataTimeRequest"> {
  ka: unknown[];
  kai: unknown[];
}

export interface Province {
  id: string;
  nama_provinsi: string;
}

export interface ProvinceResponse {
  status: boolean;
  data: Province[];
}

export interface EventData {
  id: number;
  nama: string;
  tipe: string;
  tanggal_mulai: string; // Format: YYYY-MM-DD
  tanggal_selesai: string; // Format: YYYY-MM-DD
  prev_event: string; // JSON string representing an array of numbers
  h_1: string; // Format: YYYY-MM-DD
  sub_nama: string;
  note_narasi: string; // HTML content as a string
  split_periode: string; // JSON string representing an array of date ranges
  flag: number;
}

export interface EventResponse {
  status: boolean;
  data: EventData[];
}
