import { Moda, ProduksiPertitik } from "@/type/produksi.titik.type";
import { ProduksiTanggalEvent } from "@/type/produksi.type";
import { TitikPantau } from "@/type/titik.pantau.type";
import { faker } from "@faker-js/faker";
import moment from "moment";

interface ProduksiPertitikOutput {
  tanggal_event: ProduksiTanggalEvent[];
  produksi_pertitik: ProduksiPertitik;
  titik_pantau: TitikPantau;
}

export const sampleTitikPantau: TitikPantau = {
  jalan: [
    {
      id_lokasi: 1,
      kode_referensi: "JLN001",
      nama: "Jalan Sudirman",
      kota: "Jakarta",
      provinsi: "DKI Jakarta",
      longitude: "106.8219",
      latitude: "-6.2146",
      koordinat: "-6.2146,106.8219",
      kategori: "jalan",
      tipe: "A"
    },
    {
      id_lokasi: 2,
      kode_referensi: "JLN002",
      nama: "Jalan Gatot Subroto",
      kota: "Jakarta",
      provinsi: "DKI Jakarta",
      longitude: "106.8295",
      latitude: "-6.2347",
      koordinat: "-6.2347,106.8295",
      kategori: "jalan",
      tipe: "B"
    },
  ],
  asdp: [
    {
      id_lokasi: 1,
      kode_referensi: "ASDP001",
      nama: "Pelabuhan Bakauheni",
      kota: "Lampung Selatan",
      provinsi: "Lampung",
      longitude: "105.7360",
      latitude: "-5.8720",
      koordinat: "-5.8720,105.7360",
      kategori: "asdp",
    },
    {
      id_lokasi: 2,
      kode_referensi: "ASDP002",
      nama: "Pelabuhan Ketapang",
      kota: "Banyuwangi",
      provinsi: "Jawa Timur",
      longitude: "114.4039",
      latitude: "-8.1390",
      koordinat: "-8.1390,114.4039",
      kategori: "asdp",
    },
  ],
  laut: [
    {
      id_lokasi: 1,
      kode_referensi: "LAUT001",
      nama: "Pelabuhan Tanjung Perak",
      kota: "Surabaya",
      provinsi: "Jawa Timur",
      longitude: "112.7374",
      latitude: "-7.2064",
      koordinat: "-7.2064,112.7374",
      kategori: "laut",
    },
    {
      id_lokasi: 2,
      kode_referensi: "LAUT002",
      nama: "Pelabuhan Belawan",
      kota: "Medan",
      provinsi: "Sumatera Utara",
      longitude: "98.6833",
      latitude: "3.7999",
      koordinat: "3.7999,98.6833",
      kategori: "laut",
    },
  ],
  udara: [
    {
      id_lokasi: 1,
      kode_referensi: "UDARA001",
      nama: "Bandara Ngurah Rai",
      kota: "Denpasar",
      provinsi: "Bali",
      longitude: "115.1668",
      latitude: "-8.7482",
      koordinat: "-8.7482,115.1668",
      kategori: "udara",
    },
    {
      id_lokasi: 2,
      kode_referensi: "UDARA002",
      nama: "Bandara Kualanamu",
      kota: "Deli Serdang",
      provinsi: "Sumatera Utara",
      longitude: "98.8889",
      latitude: "3.5589",
      koordinat: "3.5589,98.8889",
      kategori: "udara",
    },
  ],
  ka: [
    {
      id_lokasi: 1,
      kode_referensi: "KA001",
      nama: "Stasiun Tugu",
      kota: "Yogyakarta",
      provinsi: "DI Yogyakarta",
      longitude: "110.3636",
      latitude: "-7.7899",
      koordinat: "-7.7899,110.3636",
      kategori: "ka",
    },
    {
      id_lokasi: 2,
      kode_referensi: "KA002",
      nama: "Stasiun Pasar Senen",
      kota: "Jakarta",
      provinsi: "DKI Jakarta",
      longitude: "106.8456",
      latitude: "-6.1738",
      koordinat: "-6.1738,106.8456",
      kategori: "ka",
    },
  ],
  kai: [
    {
      id_lokasi: 1,
      kode_referensi: "KAI001",
      nama: "Stasiun Bandung",
      kota: "Bandung",
      provinsi: "Jawa Barat",
      longitude: "107.5997",
      latitude: "-6.9147",
      koordinat: "-6.9147,107.5997",
      kategori: "kai",
    },
    {
      id_lokasi: 2,
      kode_referensi: "KAI002",
      nama: "Stasiun Jember",
      kota: "Jember",
      provinsi: "Jawa Timur",
      longitude: "113.7043",
      latitude: "-8.1725",
      koordinat: "-8.1725,113.7043",
      kategori: "kai",
    },
  ],
  toll: [
    {
      id_lokasi: 1,
      kode_referensi: "TOLL001",
      nama: "Gerbang Tol Cikampek",
      kota: "Karawang",
      provinsi: "Jawa Barat",
      longitude: "107.4553",
      latitude: "-6.4082",
      koordinat: "-6.4082,107.4553",
      kategori: "toll",
    },
    {
      id_lokasi: 2,
      kode_referensi: "TOLL002",
      nama: "Gerbang Tol Kalikangkung",
      kota: "Semarang",
      provinsi: "Jawa Tengah",
      longitude: "110.4145",
      latitude: "-6.9932",
      koordinat: "-6.9932,110.4145",
      kategori: "toll",
    },
  ],
  stasiun: [
    {
      id_lokasi: 1,
      kode_referensi: "STA001",
      nama: "Stasiun Bekasi",
      kota: "Bekasi",
      provinsi: "Jawa Barat",
      longitude: "106.9924",
      latitude: "-6.2298",
      koordinat: "-6.2298,106.9924",
      kategori: "stasiun",
    },
    {
      id_lokasi: 2,
      kode_referensi: "STA002",
      nama: "Stasiun Bogor",
      kota: "Bogor",
      provinsi: "Jawa Barat",
      longitude: "106.7932",
      latitude: "-6.5950",
      koordinat: "-6.5950,106.7932",
      kategori: "stasiun",
    },
  ],
  arteri: [
    {
      id_lokasi: 1,
      kode_referensi: "ART001",
      nama: "Jalan Ahmad Yani",
      kota: "Surabaya",
      provinsi: "Jawa Timur",
      longitude: "112.7342",
      latitude: "-7.3215",
      koordinat: "-7.3215,112.7342",
      kategori: "arteri",
    },
    {
      id_lokasi: 2,
      kode_referensi: "ART002",
      nama: "Jalan Slamet Riyadi",
      kota: "Solo",
      provinsi: "Jawa Tengah",
      longitude: "110.8285",
      latitude: "-7.5766",
      koordinat: "-7.5766,110.8285",
      kategori: "arteri",
    },
  ],
  toll_2: [
    {
      id_lokasi: 1,
      kode_referensi: "TOLL201",
      nama: "Gerbang Tol Sidoarjo",
      kota: "Sidoarjo",
      provinsi: "Jawa Timur",
      longitude: "112.7191",
      latitude: "-7.4487",
      koordinat: "-7.4487,112.7191",
      kategori: "toll_2",
    },
    {
      id_lokasi: 2,
      kode_referensi: "TOLL202",
      nama: "Gerbang Tol Balaraja",
      kota: "Tangerang",
      provinsi: "Banten",
      longitude: "106.3722",
      latitude: "-6.2102",
      koordinat: "-6.2102,106.3722",
      kategori: "toll_2",
    },
  ],
  terminalb: [
    {
      id_lokasi: 1,
      kode_referensi: "TERM001",
      nama: "Terminal Kampung Rambutan",
      nama_terminal: "Kampung Rambutan",
      kota: "Jakarta",
      provinsi: "DKI Jakarta",
      longitude: "106.8625",
      latitude: "-6.3163",
      koordinat: "-6.3163,106.8625",
      kategori: "terminalb",
    },
    {
      id_lokasi: 2,
      kode_referensi: "TERM002",
      nama: "Terminal Giwangan",
      nama_terminal: "Giwangan",
      kota: "Yogyakarta",
      provinsi: "DI Yogyakarta",
      longitude: "110.3933",
      latitude: "-7.8291",
      koordinat: "-7.8291,110.3933",
      kategori: "terminalb",
    },
  ],
};

export const tanggalEvent: ProduksiTanggalEvent[] = [
  { label: "H - 7", tanggal: "2024-04-01" },
  { label: "H - 6", tanggal: "2024-04-02" },
  // { label: "H - 4", tanggal: "2025-05-09" },
  // { label: "H - 3", tanggal: "2025-05-10" },
  // { label: "H - 2", tanggal: "2025-05-11" },
  // { label: "H - 1", tanggal: "2025-05-12" },
  // { label: "H 1", tanggal: "2025-05-13" },
  // { label: "H + 1", tanggal: "2025-05-14" },
  // { label: "H + 2", tanggal: "2025-05-15" },
  // { label: "H + 3", tanggal: "2025-05-16" },
  // { label: "H + 4", tanggal: "2025-05-17" },
  // { label: "H + 5", tanggal: "2025-05-18" },
  // { label: "H + 6", tanggal: "2025-05-19" },
  // { label: "H + 7", tanggal: "2025-05-20" },
  // { label: "H + 8", tanggal: "2025-05-21" },
  // { label: "H + 9", tanggal: "2025-05-22" }
];

export const produksiPertitik: ProduksiPertitik = {
  tanggal_event: [
    {
      label: "H-7",
      tanggal: "2024-04-01"
    },
    {
      label: "H-6",
      tanggal: "2024-04-02"
    }
  ],
  arteri: [
    {
      jml_dari_jkt: "32895",
      jml_dari_jkt_bus: "354",
      jml_dari_jkt_mobil: "2415",
      jml_dari_jkt_motor: "29758",
      jml_ke_jkt: "13697",
      jml_ke_jkt_bus: "485",
      jml_ke_jkt_mobil: "1905",
      jml_ke_jkt_motor: "11307",
      jml_dari_jkt_truk: "368",
      jml_ke_jkt_truk: "348",
      jml: "46592",
      tanggal: "2024-04-01",
      tgl: "2024-04-01",
      id_lokasi: 1,
      label: "CIKAMPEK"
    },
    {
      jml_dari_jkt: "32895",
      jml_dari_jkt_bus: "354",
      jml_dari_jkt_mobil: "2415",
      jml_dari_jkt_motor: "29758",
      jml_ke_jkt: "13697",
      jml_ke_jkt_bus: "485",
      jml_ke_jkt_mobil: "1905",
      jml_ke_jkt_motor: "11307",
      jml_dari_jkt_truk: "368",
      jml_ke_jkt_truk: "348",
      jml: "46592",
      tanggal: "2024-04-02",
      tgl: "2024-04-02",
      id_lokasi: 1,
      label: "CIKAMPEK"
    }
  ],
  asdp: [
    {
      bus: "100",
      motor: "200",
      pnp: "500",
      roda4: "300",
      roda4lebih: "150",
      tanggal: "2024-04-01",
      tgl: "2024-04-01",
      totalkendaraan: "750",
      trip: "30",
      truk: "200",
      id_lokasi: 1,
      label: "MERAK"
    },
    {
      bus: "100",
      motor: "200",
      pnp: "500",
      roda4: "300",
      roda4lebih: "150",
      tanggal: "2024-04-02",
      tgl: "2024-04-02",
      totalkendaraan: "750",
      trip: "30",
      truk: "200",
      id_lokasi: 1,
      label: "MERAK"
    }
  ],
  jalan: [
    {
      bus_brgkt: "100",
      bus_dtg: "90",
      jml_pnp_brgkt: "3000",
      jml_pnp_dtg: "2700",
      tanggal: "2024-04-01",
      tgl: "2024-04-01",
      id_lokasi: 1,
      nama_terminal: "PULO GEBANG",
      kota: "JAKARTA",
      provinsi: "DKI JAKARTA",
      jml_pnp_turun: "1500",
      jml_pnp_naik: "1400",
      travelnonsimpul_brgkt: "50",
      busnonsimpul_bus_brgkt: "40",
      travelnonsimpul_jml_pnp_brgkt: "200",
      busnonsimpul_jml_pnp_brgkt: "180",
      pnp_nonsimpul_brgkt: "380",
      sarana_nonsimpul_brgkt: "90",
      label: "PULO GEBANG"
    },
    {
      bus_brgkt: "100",
      bus_dtg: "90",
      jml_pnp_brgkt: "3000",
      jml_pnp_dtg: "2700",
      tanggal: "2024-04-02",
      tgl: "2024-04-02",
      id_lokasi: 1,
      nama_terminal: "PULO GEBANG",
      kota: "JAKARTA",
      provinsi: "DKI JAKARTA",
      jml_pnp_turun: "1500",
      jml_pnp_naik: "1400",
      travelnonsimpul_brgkt: "50",
      busnonsimpul_bus_brgkt: "40",
      travelnonsimpul_jml_pnp_brgkt: "200",
      busnonsimpul_jml_pnp_brgkt: "180",
      pnp_nonsimpul_brgkt: "380",
      sarana_nonsimpul_brgkt: "90",
      label: "PULO GEBANG"
    }
  ],
  laut: [
    {
      kapal_naik: "20",
      kapal_turun: "18",
      naik: "600",
      jml_pnp: "600",
      tanggal: "2024-04-01",
      tgl: "2024-04-01",
      turun: "580",
      id_lokasi: 1,
      label: "MERAK"
    },
    {
      kapal_naik: "20",
      kapal_turun: "18",
      naik: "600",
      jml_pnp: "600",
      tanggal: "2024-04-02",
      tgl: "2024-04-02",
      turun: "580",
      id_lokasi: 1,
      label: "MERAK"
    }
  ],
  stasiun: [
    {
      kereta_berangkat_antarkota: "10",
      kereta_berangkat_komuter: "20",
      kereta_berangkat_perkotaan: "5",
      kereta_datang_antarkota: "8",
      kereta_datang_komuter: "18",
      kereta_datang_perkotaan: "4",
      penumpang_berangkat: "3500",
      penumpang_berangkat_antarkota: "2000",
      penumpang_berangkat_komuter: "1000",
      penumpang_berangkat_perkotaan: "500",
      penumpang_datang: "3000",
      penumpang_datang_antarkota: "1700",
      penumpang_datang_komuter: "900",
      penumpang_datang_perkotaan: "400",
      tanggal: "2024-04-01",
      tgl: "2024-04-01",
      id_lokasi: 1,
      label: "GAMBIR"
    },
    {
      kereta_berangkat_antarkota: "10",
      kereta_berangkat_komuter: "20",
      kereta_berangkat_perkotaan: "5",
      kereta_datang_antarkota: "8",
      kereta_datang_komuter: "18",
      kereta_datang_perkotaan: "4",
      penumpang_berangkat: "3500",
      penumpang_berangkat_antarkota: "2000",
      penumpang_berangkat_komuter: "1000",
      penumpang_berangkat_perkotaan: "500",
      penumpang_datang: "3000",
      penumpang_datang_antarkota: "1700",
      penumpang_datang_komuter: "900",
      penumpang_datang_perkotaan: "400",
      tanggal: "2024-04-02",
      tgl: "2024-04-02",
      id_lokasi: 1,
      label: "GAMBIR"
    }
  ],
  toll: [
    {
      jml_dari_jkt: "15000",
      jml_dari_jkt_gol_1: "8000",
      jml_dari_jkt_gol_2: "3000",
      jml_dari_jkt_gol_3: "2000",
      jml_dari_jkt_gol_4: "1000",
      jml_dari_jkt_gol_5: "800",
      jml_dari_jkt_gol_6: "200",
      jml_ke_jkt: "10000",
      jml_ke_jkt_gol_1: "6000",
      jml_ke_jkt_gol_2: "2000",
      jml_ke_jkt_gol_3: "1000",
      jml_ke_jkt_gol_4: "500",
      jml_ke_jkt_gol_5: "400",
      jml_ke_jkt_gol_6: "100",
      jml_kendaraan: "25000",
      jml_non_jabodetabek: "10000",
      jml_jabodetabek: "15000",
      tanggal: "2024-04-01",
      tgl: "2024-04-01",
      id_lokasi: 1,
      label: "CIPALI"
    },
    {
      jml_dari_jkt: "15000",
      jml_dari_jkt_gol_1: "8000",
      jml_dari_jkt_gol_2: "3000",
      jml_dari_jkt_gol_3: "2000",
      jml_dari_jkt_gol_4: "1000",
      jml_dari_jkt_gol_5: "800",
      jml_dari_jkt_gol_6: "200",
      jml_ke_jkt: "10000",
      jml_ke_jkt_gol_1: "6000",
      jml_ke_jkt_gol_2: "2000",
      jml_ke_jkt_gol_3: "1000",
      jml_ke_jkt_gol_4: "500",
      jml_ke_jkt_gol_5: "400",
      jml_ke_jkt_gol_6: "100",
      jml_kendaraan: "25000",
      jml_non_jabodetabek: "10000",
      jml_jabodetabek: "15000",
      tanggal: "2024-04-02",
      tgl: "2024-04-02",
      id_lokasi: 1,
      label: "CIPALI"
    }
  ],
  udara: [
    {
      jml_pnp_brkt: "7000",
      jml_pnp_brkt_dom: "5000",
      jml_pnp_brkt_intl: "2000",
      jml_pnp_dtg: "6800",
      jml_pnp_dtg_dom: "4800",
      jml_pnp_dtg_intl: "2000",
      jml_pswt_brkt: "50",
      jml_pswt_brkt_dom: "35",
      jml_pswt_brkt_intl: "15",
      jml_pswt_dtg: "48",
      jml_pswt_dtg_dom: "33",
      jml_pswt_dtg_intl: "15",
      tanggal: "2024-04-01",
      tgl: "2024-04-01",
      id_lokasi: 1,
      label: "SOEKARNO-HATTA"
    },
    {
      jml_pnp_brkt: "7000",
      jml_pnp_brkt_dom: "5000",
      jml_pnp_brkt_intl: "2000",
      jml_pnp_dtg: "6800",
      jml_pnp_dtg_dom: "4800",
      jml_pnp_dtg_intl: "2000",
      jml_pswt_brkt: "50",
      jml_pswt_brkt_dom: "35",
      jml_pswt_brkt_intl: "15",
      jml_pswt_dtg: "48",
      jml_pswt_dtg_dom: "33",
      jml_pswt_dtg_intl: "15",
      tanggal: "2024-04-02",
      tgl: "2024-04-02",
      id_lokasi: 1,
      label: "SOEKARNO-HATTA"
    }
  ],
  terminalb: [],
  ka: [],
  kai: []
};

function generateRandomNumber(): string {
  return Math.floor(Math.random() * 1_000_000 + 1).toString();
}

function generateTanggalEvent(startDate: string, endDate: string): ProduksiTanggalEvent[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const events: ProduksiTanggalEvent[] = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const isoDate = d.toISOString().split("T")[0];
    events.push({
      label: `${isoDate}`,
      tanggal: isoDate,
    });
  }

  return events;
}

function generateDummyData<T>(count: number, generator: (tanggal: string) => T): T[] {
  return Array.from({ length: count }, (_, i) => generator(`${String(moment(new Date).year())}-${String(moment(new Date).month()).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`));
}

function generateTitikPantauData(
  kategori: string,
  items: any[],
  withTipe: boolean = false
) {
  return items.map((item, index) => {
    const latitude = faker.location.latitude().toString();
    const longitude = faker.location.longitude().toString();
    const base = {
      id_lokasi: Number(item.id_lokasi),
      kode_referensi: generateRandomNumber(),
      nama: faker.location.city(),
      kota: faker.location.city(),
      provinsi: faker.location.state(),
      longitude,
      latitude,
      koordinat: `${latitude},${longitude}`,
      kategori,
    };

    return withTipe
      ? { ...base, tipe: index % 2 === 0 ? "A" : "B" }
      : base;
  });
}
export function createProduksiPertitik(startDate: string, endDate: string, moda: Moda): ProduksiPertitikOutput {
  const tanggal_event = generateTanggalEvent(startDate, endDate);
  const totalDates = tanggal_event.length;

  const randomLokasiId = () => String(Math.floor(Math.random() * 100));
  const produksi_pertitik: ProduksiPertitik = {
    tanggal_event: [],
    ka: [],
    kai: [],
    arteri: moda === "arteri"
      ? generateDummyData(totalDates, (tanggal) => ({
        jml_dari_jkt: generateRandomNumber(),
        jml_dari_jkt_bus: generateRandomNumber(),
        jml_dari_jkt_mobil: generateRandomNumber(),
        jml_dari_jkt_motor: generateRandomNumber(),
        jml_ke_jkt: generateRandomNumber(),
        jml_ke_jkt_bus: generateRandomNumber(),
        jml_ke_jkt_mobil: generateRandomNumber(),
        jml_ke_jkt_motor: generateRandomNumber(),
        jml_dari_jkt_truk: generateRandomNumber(),
        jml_ke_jkt_truk: generateRandomNumber(),
        jml: generateRandomNumber(),
        tanggal,
        tgl: tanggal,
        id_lokasi: randomLokasiId(),
        label: faker.location.state(),
      }))
      : [],
    asdp: moda === "asdp" ? generateDummyData(totalDates, (tanggal) => ({
      bus: generateRandomNumber(),
      motor: generateRandomNumber(),
      pnp: generateRandomNumber(),
      roda4: generateRandomNumber(),
      roda4lebih: generateRandomNumber(),
      jml_pnp: generateRandomNumber(),
      tanggal,
      tgl: tanggal,
      totalkendaraan: generateRandomNumber(),
      trip: generateRandomNumber(),
      truk: generateRandomNumber(),
      id_lokasi: randomLokasiId(),
      label: faker.location.state(),
    })) : [],
    jalan: moda === "jalan" ? generateDummyData(totalDates, (tanggal) => ({
      bus_brgkt: generateRandomNumber(),
      bus_dtg: generateRandomNumber(),
      jml_pnp_brgkt: generateRandomNumber(),
      jml_pnp_dtg: generateRandomNumber(),
      tanggal,
      tgl: tanggal,
      id_lokasi: randomLokasiId(),
      busnonsimpul_bus_brgkt: generateRandomNumber(),
      travelnonsimpul_brgkt: generateRandomNumber(),
      busnonsimpul_jml_pnp_brgkt: generateRandomNumber(),
      travelnonsimpul_jml_pnp_brgkt: generateRandomNumber(),
      pnp_nonsimpul_brgkt: generateRandomNumber(),
      sarana_nonsimpul_brgkt: generateRandomNumber(),
      jml_pnp_turun: generateRandomNumber(),
      jml_pnp_naik: generateRandomNumber(),
      nama_terminal: faker.location.city(),
      kota: faker.location.city(),
      provinsi: faker.location.state(),
      label: faker.location.state(),

    })) : [],
    laut: moda === "laut" ? generateDummyData(totalDates, (tanggal) => ({
      kapal_naik: generateRandomNumber(),
      kapal_turun: generateRandomNumber(),
      naik: generateRandomNumber(),
      jml_pnp: generateRandomNumber(),
      turun: generateRandomNumber(),
      tanggal,
      tgl: tanggal,
      id_lokasi: randomLokasiId(),
    })) : [],
    stasiun: moda === "stasiun" ? generateDummyData(totalDates, (tanggal) => ({
      kereta_berangkat_antarkota: generateRandomNumber(),
      kereta_berangkat_komuter: generateRandomNumber(),
      kereta_berangkat_perkotaan: generateRandomNumber(),
      kereta_datang_antarkota: generateRandomNumber(),
      kereta_datang_komuter: generateRandomNumber(),
      kereta_datang_perkotaan: generateRandomNumber(),
      penumpang_berangkat: generateRandomNumber(),
      penumpang_berangkat_antarkota: generateRandomNumber(),
      penumpang_berangkat_komuter: generateRandomNumber(),
      penumpang_berangkat_perkotaan: generateRandomNumber(),
      penumpang_datang: generateRandomNumber(),
      penumpang_datang_antarkota: generateRandomNumber(),
      penumpang_datang_komuter: generateRandomNumber(),
      penumpang_datang_perkotaan: generateRandomNumber(),
      jml_pnp_brgkt: generateRandomNumber(),
      jml_pnp_dtg: generateRandomNumber(),
      tanggal,
      tgl: tanggal,
      id_lokasi: randomLokasiId(),
      label: faker.location.state(),
    })) : [],
    toll: moda === "toll" ? generateDummyData(totalDates, (tanggal) => ({
      tanggal,
      tgl: tanggal,
      id_lokasi: randomLokasiId(),
      label: faker.location.state(),
      jml_dari_jkt: generateRandomNumber(),
      jml_dari_jkt_gol_1: generateRandomNumber(),
      jml_dari_jkt_gol_2: generateRandomNumber(),
      jml_dari_jkt_gol_3: generateRandomNumber(),
      jml_dari_jkt_gol_4: generateRandomNumber(),
      jml_dari_jkt_gol_5: generateRandomNumber(),
      jml_dari_jkt_gol_6: generateRandomNumber(),
      jml_ke_jkt: generateRandomNumber(),
      jml_ke_jkt_gol_1: generateRandomNumber(),
      jml_ke_jkt_gol_2: generateRandomNumber(),
      jml_ke_jkt_gol_3: generateRandomNumber(),
      jml_ke_jkt_gol_4: generateRandomNumber(),
      jml_ke_jkt_gol_5: generateRandomNumber(),
      jml_ke_jkt_gol_6: generateRandomNumber(),
      jml_kendaraan: generateRandomNumber(),
      jml_non_jabodetabek: generateRandomNumber(),
      jml_jabodetabek: generateRandomNumber(),
      jml_dari_jkt_truk: generateRandomNumber(),
      jml_ke_jkt_truk: generateRandomNumber(),
      jml_dari_jkt_bus: generateRandomNumber(),
      jml_dari_jkt_mobil: generateRandomNumber(),
      jml_dari_jkt_motor: generateRandomNumber(),
      jml_ke_jkt_bus: generateRandomNumber(),
      jml_ke_jkt_mobil: generateRandomNumber(),
      jml_ke_jkt_motor: generateRandomNumber(),
    })) : [],
    udara: moda === "udara" ? generateDummyData(totalDates, (tanggal) => ({
      tanggal,
      tgl: tanggal,
      id_lokasi: randomLokasiId(),
      jml_pnp_brkt: generateRandomNumber(),
      jml_pnp_brkt_dom: generateRandomNumber(),
      jml_pnp_brkt_intl: generateRandomNumber(),
      jml_pnp_dtg: generateRandomNumber(),
      jml_pnp_dtg_dom: generateRandomNumber(),
      jml_pnp_dtg_intl: generateRandomNumber(),
      jml_pswt_brkt: generateRandomNumber(),
      jml_pswt_brkt_dom: generateRandomNumber(),
      jml_pswt_brkt_intl: generateRandomNumber(),
      jml_pswt_dtg: generateRandomNumber(),
      jml_pswt_dtg_dom: generateRandomNumber(),
      jml_pswt_dtg_intl: generateRandomNumber(),
      label: faker.location.state()
    })) : [],
    terminalb: moda === "terminalb" ? generateDummyData(totalDates, (tanggal) => ({
      bus_brgkt: generateRandomNumber(),
      bus_dtg: generateRandomNumber(),
      jml_pnp_brgkt: generateRandomNumber(),
      jml_pnp_dtg: generateRandomNumber(),
      tanggal,
      tgl: tanggal,
      id_lokasi: randomLokasiId(),
      busnonsimpul_bus_brgkt: generateRandomNumber(),
      travelnonsimpul_brgkt: generateRandomNumber(),
      busnonsimpul_jml_pnp_brgkt: generateRandomNumber(),
      travelnonsimpul_jml_pnp_brgkt: generateRandomNumber(),
      pnp_nonsimpul_brgkt: generateRandomNumber(),
      sarana_nonsimpul_brgkt: generateRandomNumber(),
      jml_pnp_turun: generateRandomNumber(),
      jml_pnp_naik: generateRandomNumber(),
      nama_terminal: faker.location.city(),
      kota: faker.location.city(),
      provinsi: faker.location.state(),
      label: faker.location.state(),
    })) : [],
  };

  // Ambil semua id_lokasi unik dari semua moda
  const titik_pantau_set: TitikPantau = {
    arteri: moda === "arteri" ? generateTitikPantauData("arteri", produksi_pertitik.arteri, true) : [],
    asdp: moda === "asdp" ? generateTitikPantauData("asdp", produksi_pertitik.asdp) : [],
    jalan: moda === "jalan" ? generateTitikPantauData("jalan", produksi_pertitik.jalan, true) : [],
    laut: moda === "laut" ? generateTitikPantauData("laut", produksi_pertitik.laut) : [],
    stasiun: moda === "stasiun" ? generateTitikPantauData("stasiun", produksi_pertitik.stasiun) : [],
    toll: moda === "toll" ? generateTitikPantauData("toll", produksi_pertitik.toll) : [],
    udara: moda === "udara" ? generateTitikPantauData("udara", produksi_pertitik.udara) : [],
    terminalb: moda === "terminalb" ? generateTitikPantauData("terminalb", produksi_pertitik.terminalb, true) : [],
    ka: [],
    kai: [],
    toll_2: [],
  };

  return {
    tanggal_event,
    produksi_pertitik: { ...produksi_pertitik, tanggal_event },
    titik_pantau: titik_pantau_set,
  };
}