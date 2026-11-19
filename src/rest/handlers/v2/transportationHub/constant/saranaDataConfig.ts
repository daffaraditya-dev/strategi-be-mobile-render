import { Moda } from "@/type/produksi.titik.type";
import { SumType } from "@/type/produksi.type";


// Konfigurasi key untuk data Transportasi
export const keyTransportasi: Record<Moda, SumType> = {
  arteri: {
    keyData: ['jml_dari_jkt'], // Catatan: dari Pak Panuju, 27/12/2024
  },
  asdp: { keyData: ['trip'] },
  jalan: { keyData: ['bus_brgkt'] },
  ka: { keyData: ['naik'] },
  kai: { keyData: ['kereta_berangkat_antarkota'] },
  laut: { keyData: ['kapal_naik'] },
  stasiun: { keyData: ['kereta_berangkat_antarkota'] },
  terminalb: { keyData: ['bus_brgkt'] },
  toll: {
    keyData: ['jml_dari_jkt'], // Catatan: dari Pak Panuju, 27/12/2024
  },
  udara: { keyData: ['jml_pswt_brkt'] },
};

export const keyTransportasiModa: Record<Moda, { header: string; keyData: string[]; }[]> = {
  terminalb: [
    { header: 'Bus Berangkat', keyData: ['bus_brgkt'] },
    { header: 'Bus Datang', keyData: ['bus_dtg'] },
  ],
  jalan: [
    { header: 'Bus Berangkat', keyData: ['bus_brgkt'] },
    { header: 'Bus Datang', keyData: ['bus_dtg'] },
    { header: 'Non Simpul', keyData: ['sarana_nonsimpul_brgkt'] },
  ],
  laut: [
    { header: 'Kapal Berangkat', keyData: ['kapal_naik'] },
    { header: 'Kapal Datang', keyData: ['kapal_turun'] },
  ],
  asdp: [
    { header: 'Trip', keyData: ['trip'] },
  ],
  arteri: [
    { header: 'Kendaraan Keluar Jabodetabek', keyData: ['jml_dari_jkt'] },
    { header: 'Kendaraan Masuk Jabodetabek', keyData: ['jml_ke_jkt'] },
    { header: 'Kendaraan Jabodetabek', keyData: ['jml_jabodetabek'] },
    { header: 'Kendaraan Non Jabodetabek', keyData: ['jml_non_jabodetabek'] },
    { header: 'Bus Keluar Jabodetabek', keyData: ['jml_dari_jkt_bus'] },
    { header: 'Bus Masuk Jabodetabek', keyData: ['jml_ke_jkt_bus'] },
    { header: 'Motor Keluar Jabodetabek', keyData: ['jml_dari_jkt_motor'] },
    { header: 'Motor Masuk Jabodetabek', keyData: ['jml_ke_jkt_motor'] },
    { header: 'Mobil Keluar Jabodetabek', keyData: ['jml_dari_jkt_mobil'] },
    { header: 'Mobil Masuk Jabodetabek', keyData: ['jml_ke_jkt_mobil'] },
    { header: 'Truk Keluar Jabodetabek', keyData: ['jml_dari_jkt_truk'] },
    { header: 'Truk Masuk Jabodetabek', keyData: ['jml_ke_jkt_truk'] },
    { header: 'Total Kendaraan', keyData: ['jml'] },
  ],
  ka: [
    { header: 'Keberangkatan Penumpang', keyData: ['naik'] },
    { header: 'Kedatangan Penumpang', keyData: ['turun'] },
    { header: 'Penumpang Naik', keyData: ['kapal_naik'] },
    { header: 'Penumpang Turun', keyData: ['kapal_turun'] },
  ],
  kai: [
    { header: 'Kedatangan Penumpang', keyData: ['turun'] },
    { header: 'Keberangkatan Penumpang', keyData: ['naik'] },
    { header: 'Penumpang Naik', keyData: ['kapal_naik'] },
    { header: 'Penumpang Turun', keyData: ['kapal_turun'] },
  ],
  stasiun: [
    { header: 'Kereta Berangkat Antarkota', keyData: ['kereta_berangkat_antarkota'] },
    { header: 'Kereta Datang Antarkota', keyData: ['kereta_datang_antarkota'] },
  ],
  toll: [
    { header: 'Kendaraan Keluar Jakarta', keyData: ['jml_dari_jkt'] },
    { header: 'Kendaraan Masuk Jakarta', keyData: ['jml_ke_jkt'] },
    { header: 'Kendaraan Gol 1 Keluar Jakarta', keyData: ['jml_dari_jkt_gol_1'] },
    { header: 'Kendaraan Gol 1 Masuk Jakarta', keyData: ['jml_ke_jkt_gol_1'] },
    { header: 'Kendaraan Gol 2 Keluar Jakarta', keyData: ['jml_dari_jkt_gol_2'] },
    { header: 'Kendaraan Gol 2 Masuk Jakarta', keyData: ['jml_ke_jkt_gol_2'] },
    { header: 'Kendaraan Gol 3 Keluar Jakarta', keyData: ['jml_dari_jkt_gol_3'] },
    { header: 'Kendaraan Gol 3 Masuk Jakarta', keyData: ['jml_ke_jkt_gol_3'] },
    { header: 'Kendaraan Gol 4 Keluar Jakarta', keyData: ['jml_dari_jkt_gol_4'] },
    { header: 'Kendaraan Gol 4 Masuk Jakarta', keyData: ['jml_ke_jkt_gol_4'] },
    { header: 'Kendaraan Gol 5 Keluar Jakarta', keyData: ['jml_dari_jkt_gol_5'] },
    { header: 'Kendaraan Gol 5 Masuk Jakarta', keyData: ['jml_ke_jkt_gol_5'] },
    { header: 'Kendaraan Gol 6 Keluar Jakarta', keyData: ['jml_dari_jkt_gol_6'] },
    { header: 'Kendaraan Gol 6 Masuk Jakarta', keyData: ['jml_ke_jkt_gol_6'] },
    { header: 'Kendaraan Jabodetabek', keyData: ['jml_jabodetabek'] },
    { header: 'Kendaraan NonJabodetabek', keyData: ['jml_non_jabodetabek'] },
    { header: 'Total Kendaraan', keyData: ['jml_kendaraan'] },
  ],
  udara: [
    { header: 'Total Pesawat Berangkat', keyData: ['jml_pswt_brkt'] },
    { header: 'Total Pesawat Datang', keyData: ['jml_pswt_dtg'] },
    { header: 'Pesawat Datang Domestik', keyData: ['jml_pswt_dtg_dom'] },
    { header: 'Pesawat Berangkat Domestik', keyData: ['jml_pswt_brkt_dom'] },
    { header: 'Pesawat Datang International', keyData: ['jml_pswt_dtg_intl'] },
    { header: 'Pesawat Berangkat International', keyData: ['jml_pswt_brkt_intl'] },
  ],
};

