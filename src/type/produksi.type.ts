import { Moment } from 'moment';
import { Event } from './event.type';
import { Moda, ProduksiPertitik } from './produksi.titik.type';
import { TitikPantau } from './titik.pantau.type';

// use as model props state
export interface ProduksiProps {
  event_pantau: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  event: string;
  provinsi?: string;
}

export interface ProduksiPertitikProps extends ProduksiProps {
  moda: Moda;
}

export interface ProduksiParamProps {
  event?: Event;
  eventPantau?: Event;
  startDate: Moment;
  endDate: Moment;
  provinsi: string;
}
// use as store state
export interface ProduksiState extends ProduksiParamProps {
  produksi?: Produksi;
  setEvent(newEvent: Event, newEventPantau?: Event): void;
  setDate(startDate: Moment, endDate: Moment): void;
  setProvinsi(newProvinsi: string): void;
  getProduksi(): Promise<Produksi>;
  getProduksiWithParam(props: ProduksiParamProps): Promise<Produksi>;
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

export interface MudikGratisProps {
  kuota_pnp: number;
  realisasi_pnp: number;
  okupansi_pnp: number;
  jumlah_sarana: number;
  tipe_keberangkatan: number;
  kelompok: string;
  penyelenggara: string;
  matra: string;
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
  jml_dari_jkt_truk: string;
  jml_ke_jkt_truk: string;
  jml: string;
  tanggal: string;
  tgl: string;
  id_lokasi: string | number;
  label?: string;

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
  label?: string;

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
  jml_pnp_turun?: string;
  jml_pnp_naik?: string;
  // travel_nonsimpul_brgkt?: string;
  // bus_nonsimpul_brgkt?: string;
  // jml_bus_nonsimpul_pnp_brgkt?: string;
  // jml_travel_nonsimpul_pnp_brgkt?: string;
  travelnonsimpul_brgkt?: string;
  busnonsimpul_bus_brgkt?: string;
  travelnonsimpul_jml_pnp_brgkt?: string;
  busnonsimpul_jml_pnp_brgkt?: string;
  pnp_nonsimpul_brgkt?: string;
  sarana_nonsimpul_brgkt?: string;
  label?: string;

}

export interface ProduksiLaut {
  kapal_naik: string;
  kapal_turun: string;
  naik: string;
  jml_pnp?: string;
  tanggal: string;
  tgl: string;
  turun: string;
  id_lokasi: string | number;
  label?: string;

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
  label?: string;

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
  jml_non_jabodetabek: string;
  jml_jabodetabek: string;
  tanggal: string;
  tgl: string;
  id_lokasi: string | number;
  label?: string;
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
  label?: string;

}

interface EventDetail {
  id: number;
  nama: string;
  tipe: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  prev_event: string;
  h_1: string;
  sub_nama: string;
  note_narasi: string;
  split_periode: string;
  flag: number;
}


export interface ProduksiData {

  listDataProduksi: Record<string, Produksi>;
  listDataProduksiPerTitik: Record<string, ProduksiPertitik>;
  listDataTitikPantau: Record<string, TitikPantau>;

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


export interface ProduksiResponseApi extends ProduksiDataResponseApi {
  status: boolean;
}
export interface ProduksiDataResponseApi {
  event: EventDetail;
  prev_event: EventDetail[];
  result: {
    [key: string]: ResultData;
  };

}

export type Endpoints =
  | 'data-pantau'
  | 'data-produksi'
  | 'data-produksi-pertitik';


type ProduksiKeys =
  | keyof ProduksiArteri
  | keyof ProduksiAsdp
  | keyof ProduksiJalan
  | keyof ProduksiLaut
  | keyof ProduksiStasiun
  | keyof ProduksiToll
  | keyof ProduksiUdara;
export interface SumType {
  keyData: ProduksiKeys[];
}
