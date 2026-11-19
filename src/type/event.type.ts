import { Moda } from "./produksi.titik.type";

export interface EventState {
  events: Event[];
  eventModa: Event[];
  eventLaut: Event[];
  // force : get newest data
  getEvent(flag?: string, force?: boolean, filter?: string): Promise<Event[]>;
  getEventModa(moda?: Moda, force?: boolean, filter?: string): Promise<Event[]>;
  getEventLaut(moda?: Moda, force?: boolean): Promise<Event[]>;
}

export interface Event {
  h_1: string;
  h_2: null;
  id: number;
  nama: string;
  note_narasi: string;
  prev_event: string;
  split_periode: string;
  sub_nama: string;
  flag: number | null;
  tanggal_mulai: string;
  tanggal_selesai: string;
  tipe: string;
}
