import { Event } from "./event.type";
import { Moda, ProduksiPertitik } from "./produksi.titik.type";
import { Endpoints, MudikGratisProps, Produksi } from "./produksi.type";
import { TitikPantau } from "./titik.pantau.type";


export type StoreDataProduksi = {
  listDataProduksi: Record<string, Produksi>;
  listDataMudikGratis: MudikGratisProps[];
  listDataProduksiPerTitik: Record<string, ProduksiPertitik>;
  listDataTitikPantau: Record<string, TitikPantau>;
  listPrevEvent: Event[];
  selectedEvent: Event | null;
  selectedProvinceId: number | string | null;
  key: string;
};

export type FetchDataPayload = {
  selectedEvent: Event;
  prevEvents: Event[];
  endpoints: Endpoints[];
  provinceId?: number | string;
  moda?: Moda | string;
  fetchId?: string;

};
