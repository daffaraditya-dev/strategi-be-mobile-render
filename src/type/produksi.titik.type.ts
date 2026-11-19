import { Moment } from 'moment';
import { Produksi } from './produksi.type';
import { Event } from "./event.type";

export type Moda = keyof Omit<ProduksiPertitik, 'tanggal_event'>;

export interface ProduksiPertitikState {
  moda: Moda;
  event?: Event;
  eventPantau?: Event;
  startDate: Moment;
  endDate: Moment;
  provinsi: string;
  produksiPertitik?: ProduksiPertitik;
  setModa(newModa: Moda): void;
  setEvent(newEvent: Event, newEventPantau?: Event): void;
  setDate(startDate: Moment, endDate: Moment): void;
  setProvinsi(newProvinsi: string): void;
  getProduksiPertitik(): void;
}

export interface ProduksiPertitik
  extends Omit<Produksi, 'metaDataTimeRequest'> {
  ka: unknown[];
  kai: unknown[];
}
