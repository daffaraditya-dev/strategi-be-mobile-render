import { Moda } from "@/type/produksi.titik.type";
import { SumType } from "@/type/produksi.type";


// Konfigurasi key untuk data Penumpang
export const keysPenumpang: Record<Moda, SumType> = {
  asdp: { keyData: ['pnp'] },
  jalan: { keyData: ['jml_pnp_brgkt'] },
  laut: { keyData: ['naik'] },
  stasiun: { keyData: ['penumpang_berangkat_antarkota'] },
  udara: { keyData: ['jml_pnp_brkt'] },
  arteri: { keyData: ['naik'] },
  toll: { keyData: ['naik'] },
  terminalb: { keyData: ['jml_pnp_brgkt'] },
  ka: { keyData: ['naik'] },
  kai: { keyData: ['naik'] },
};

export const keyPenumpangModa: Record<Moda, { header: string; keyData: string[]; }[]> = {
  terminalb: [
    { header: "Keberangkatan Penumpang", keyData: ["jml_pnp_brgkt"] },
    { header: "Kedatangan Penumpang", keyData: ["jml_pnp_dtg"] },
    { header: "Penumpang Naik", keyData: ["jml_pnp_naik"] },
    { header: "Penumpang Turun", keyData: ["jml_pnp_turun"] },
  ],
  jalan: [
    { header: "Keberangkatan Penumpang", keyData: ["jml_pnp_brgkt"] },
    { header: "Kedatangan Penumpang", keyData: ["jml_pnp_dtg"] },
    { header: "Penumpang Naik", keyData: ["jml_pnp_naik"] },
    { header: "Penumpang Turun", keyData: ["jml_pnp_turun"] },
    { header: "Non Simpul", keyData: ["pnp_nonsimpul_brgkt"] },
  ],
  laut: [
    { header: "Jumlah Penumpang", keyData: ["jml_pnp"] },
    { header: "Jumlah Kapal", keyData: ["jml_kapal"] },
    { header: "Jumlah Barang", keyData: ["ton_muat", "ton_bongkar"] },
    { header: "Jumlah Penumpang Naik", keyData: ["naik"] },
    { header: "Jumlah Penumpang Turun", keyData: ["turun"] },
  ],
  asdp: [
    { header: "Jumlah Penumpang", keyData: ["pnp"] },
    { header: "Jumlah Kapal", keyData: ["jml_kapal"] },
    { header: "Jumlah Barang", keyData: ["ton_muat", "ton_bongkar"] },
    { header: "Jumlah Roda 2", keyData: ["roda_2_muat", "roda_2_bongkar"] },
    { header: "Jumlah Roda 4", keyData: ["roda_4_muat", "roda_4_bongkar"] },
    { header: "Jumlah Bus", keyData: ["bus_muat", "bus_bongkar"] },
    { header: "Jumlah Truk", keyData: ["truk_muat", "truk_bongkar"] },
  ],
  arteri: [
    { header: "Kendaraan Roda 2", keyData: ["roda_2"] },
    { header: "Kendaraan Roda 4", keyData: ["roda_4"] },
    { header: "Kendaraan Roda 6", keyData: ["roda_6"] },
    { header: "Kendaraan Bus", keyData: ["bus"] },
    { header: "Kendaraan Truk", keyData: ["truk"] },
    { header: "Kendaraan Alat Berat", keyData: ["alat_berat"] },
  ],
  ka: [
    { header: "Keberangkatan Penumpang", keyData: ["jml_pnp_brgkt"] },
    { header: "Kedatangan Penumpang", keyData: ["jml_pnp_dtg"] },
  ],
  kai: [
    { header: "Keberangkatan Penumpang", keyData: ["jml_pnp_brgkt"] },
    { header: "Kedatangan Penumpang", keyData: ["jml_pnp_dtg"] },
  ],
  stasiun: [
    { header: "Keberangkatan Penumpang", keyData: ["penumpang_berangkat_antarkota"] },
    { header: "Kedatangan Penumpang", keyData: ["penumpang_datang_antarkota"] },
  ],
  toll: [
    { header: "Kendaraan Keluar", keyData: ["kendaraan_keluar"] },
    { header: "Kendaraan Masuk", keyData: ["kendaraan_masuk"] },
  ],
  udara: [
    { header: "Jumlah Penumpang Berangkat", keyData: ["jml_pnp_brkt"] },
    { header: "Jumlah Penumpang Datang", keyData: ["jml_pnp_dtg"] },
    { header: "Jumlah Pesawat", keyData: ["jml_pesawat"] },
    { header: "Jumlah Barang", keyData: ["jml_barang"] },
    { header: "Jumlah Barang", keyData: ["jml_barang"] },
    { header: "Jumlah Penumpang Datang Dom", keyData: ["jml_pnp_dtg_dom"] },
    { header: "Jumlah Penumpang Berangkat Dom", keyData: ["jml_pnp_brkt_dom"] },
    { header: "Jumlah Penumpang Datang Intl", keyData: ["jml_pnp_dtg_intl"] },
    { header: "Jumlah Penumpang Berangkat Intl", keyData: ["jml_pnp_brkt_intl"] },
  ],
};