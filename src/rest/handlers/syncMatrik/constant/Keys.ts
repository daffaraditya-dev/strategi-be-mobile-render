import { Moda } from "@/type/produksi.titik.type";

export const keysModa: Record<Moda, Record<string, string>> = {
  terminalb: {
    departure: "jml_pnp_brgkt",
    arrival: "jml_pnp_dtg",
    vehicleDeparture: "bus_brgkt",
    vehicleArrival: "bus_dtg",
  },
  jalan: {
    departure: "jml_pnp_brgkt",
    arrival: "jml_pnp_dtg",
    vehicleDeparture: "bus_brgkt",
    vehicleArrival: "bus_dtg",
  },
  laut: {
    departure: "naik",
    arrival: "turun",
    vehicleDeparture: "kapal_naik",
    vehicleArrival: "kapal_turun",
  },
  asdp: {
    departure: "pnp",
    arrival: "pnp",
    vehicleDeparture: "trip",
    vehicleArrival: "trip",
  },
  arteri: {
    departure: "",
    arrival: "",
    vehicleDeparture: "jml_dari_jkt",
    vehicleArrival: "jml_ke_jkt",
  },
  toll: {
    departure: "",
    arrival: "",
    vehicleDeparture: "jml_dari_jkt",
    vehicleArrival: "jml_ke_jkt",
  },
  ka: {
    departure: "jml_pnp_brgkt",
    arrival: "jml_pnp_dtg",
    vehicleDeparture: "jml_pnp_brgkt",
    vehicleArrival: "jml_pnp_dtg",
  },
  kai: {
    departure: "jml_pnp_brgkt",
    arrival: "jml_pnp_dtg",
    vehicleDeparture: "jml_pnp_brgkt",
    vehicleArrival: "jml_pnp_dtg",
  },
  stasiun: {
    departure: "penumpang_berangkat_antarkota",
    arrival: "penumpang_datang_antarkota",
    vehicleDeparture: "kereta_berangkat_antarkota",
    vehicleArrival: "kereta_datang_antarkota",
  },
  udara: {
    departure: "jml_pnp_brkt",
    arrival: "jml_pnp_dtg",
    vehicleDeparture: "jml_pswt_brkt",
    vehicleArrival: "jml_pswt_dtg",
    departure_intl: "jml_pnp_brkt_intl",
    arrival_intl: "jml_pnp_dtg_intl",
    vehicle_departure_intl: "jml_pswt_brkt_intl",
    vehicle_arrival_intl: "jml_pswt_dtg_intl",
    departure_dom: "jml_pnp_brkt_dom",
    arrival_dom: "jml_pnp_dtg_dom",
    vehicle_departure_dom: "jml_pswt_brkt_dom",
    vehicle_arrival_dom: "jml_pswt_dtg_dom",
  },
};