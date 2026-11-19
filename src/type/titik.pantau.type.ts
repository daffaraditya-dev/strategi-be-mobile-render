import { Moment } from 'moment';
import { Moda } from './produksi.titik.type';

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

export interface TitikPantauState {
  titikPantau?: TitikPantau;
  titikPantauPantauan?: TitikPantau;
  getTitikPantau(
    eventId: string,
    startDate?: Moment,
    endDate?: Moment
  ): Promise<TitikPantau>;
  getTitikPantauPantauan(
    eventId: string,
    startDate?: Moment,
    endDate?: Moment
  ): Promise<TitikPantau>;
  getTitikPantauByIdLokasi: (moda: Moda, id: number | string) => void;
}
