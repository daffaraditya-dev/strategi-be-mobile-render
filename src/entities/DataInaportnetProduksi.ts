import { Column, Entity, Index, OneToMany } from "typeorm";
import { DataInaportnetBarangProduksi } from "./DataInaportnetBarangProduksi";

@Index("data_inaportnet_produksi_created_date_idx", ["createdDate"], {})
@Index("data_inaportnet_produksi_eta_idx", ["eta"], {})
@Index("data_inaportnet_produksi_etd_idx", ["etd"], {})
@Index("data_inaportnet_produksi_jenis_kapal_idx", ["jenisKapal"], {})
@Index("data_inaportnet_produksi_pkey", ["nomorPkk"], { unique: true })
@Index("data_inaportnet_produksi_pelabuhan_asal_idx", ["pelabuhanAsal"], {})
@Index("data_inaportnet_produksi_pelabuhan_singgah_idx", ["pelabuhanSinggah"], {})
@Index("data_inaportnet_produksi_pelabuhan_tujuan_idx", ["pelabuhanTujuan"], {})
@Entity("data_inaportnet_produksi", { schema: "public" })
export class DataInaportnetProduksi {
  @Column("character varying", { primary: true, name: "nomor_pkk", length: 50 })
  nomorPkk: string;

  @Column("character varying", { name: "nomor_spb", nullable: true, length: 50 })
  nomorSpb: string | null;

  @Column("timestamp without time zone", { name: "eta", nullable: true })
  eta: Date | null;

  @Column("timestamp without time zone", { name: "etd", nullable: true })
  etd: Date | null;

  @Column("character varying", { name: "tpk", nullable: true, length: 50 })
  tpk: string | null;

  @Column("character varying", { name: "nama_perusahaan", nullable: true, length: 255 })
  namaPerusahaan: string | null;

  @Column("character varying", { name: "npwp_perusahaan", nullable: true, length: 100 })
  npwpPerusahaan: string | null;

  @Column("character varying", { name: "nama_kapal", nullable: true, length: 200 })
  namaKapal: string | null;

  @Column("character varying", { name: "jenis_kapal", nullable: true, length: 20 })
  jenisKapal: string | null;

  @Column("numeric", { name: "gt", nullable: true, precision: 18, scale: 2 })
  gt: string | null;

  @Column("integer", { name: "kapasitas", nullable: true })
  kapasitas: number | null;

  @Column("numeric", { name: "loa", nullable: true, precision: 18, scale: 2 })
  loa: string | null;

  @Column("numeric", { name: "draft", nullable: true, precision: 18, scale: 2 })
  draft: string | null;

  @Column("character varying", { name: "pelabuhan_asal", nullable: true, length: 10 })
  pelabuhanAsal: string | null;

  @Column("character varying", { name: "pelabuhan_tujuan", nullable: true, length: 10 })
  pelabuhanTujuan: string | null;

  @Column("character varying", { name: "pelabuhan_singgah", nullable: true, length: 10 })
  pelabuhanSinggah: string | null;

  @Column("numeric", { name: "penumpang_naik_dewasa", nullable: true, precision: 18, scale: 2 })
  penumpangNaikDewasa: string | null;

  @Column("numeric", { name: "penumpang_naik_anak", nullable: true, precision: 18, scale: 2 })
  penumpangNaikAnak: string | null;

  @Column("numeric", { name: "penumpang_naik_bayi", nullable: true, precision: 18, scale: 2 })
  penumpangNaikBayi: string | null;

  @Column("numeric", { name: "penumpang_turun_dewasa", nullable: true, precision: 18, scale: 2 })
  penumpangTurunDewasa: string | null;

  @Column("numeric", { name: "penumpang_turun_anak", nullable: true, precision: 18, scale: 2 })
  penumpangTurunAnak: string | null;

  @Column("numeric", { name: "penumpang_turun_bayi", nullable: true, precision: 18, scale: 2 })
  penumpangTurunBayi: string | null;

  @Column("numeric", { name: "penumpang_lanjutan_dewasa", nullable: true, precision: 18, scale: 2 })
  penumpangLanjutanDewasa: string | null;

  @Column("numeric", { name: "penumpang_lanjutan_anak", nullable: true, precision: 18, scale: 2 })
  penumpangLanjutanAnak: string | null;

  @Column("numeric", { name: "penumpang_lanjutan_bayi", nullable: true, precision: 18, scale: 2 })
  penumpangLanjutanBayi: string | null;

  @Column("numeric", { name: "kendaraan_naik_roda_2", nullable: true, precision: 18, scale: 2 })
  kendaraanNaikRoda_2: string | null;

  @Column("numeric", { name: "kendaraan_naik_roda_4", nullable: true, precision: 18, scale: 2 })
  kendaraanNaikRoda_4: string | null;

  @Column("numeric", { name: "kendaraan_naik_bus", nullable: true, precision: 18, scale: 2 })
  kendaraanNaikBus: string | null;

  @Column("numeric", { name: "kendaraan_naik_truk", nullable: true, precision: 18, scale: 2 })
  kendaraanNaikTruk: string | null;

  @Column("numeric", { name: "kendaraan_turun_roda_2", nullable: true, precision: 18, scale: 2 })
  kendaraanTurunRoda_2: string | null;

  @Column("numeric", { name: "kendaraan_turun_roda_4", nullable: true, precision: 18, scale: 2 })
  kendaraanTurunRoda_4: string | null;

  @Column("numeric", { name: "kendaraan_turun_bus", nullable: true, precision: 18, scale: 2 })
  kendaraanTurunBus: string | null;

  @Column("numeric", { name: "kendaraan_turun_truk", nullable: true, precision: 18, scale: 2 })
  kendaraanTurunTruk: string | null;

  @Column("timestamp without time zone", { name: "created_date", nullable: true })
  createdDate: Date | null;

  @OneToMany(
    () => DataInaportnetBarangProduksi,
    barang => barang.produksi
  )
  barangProduksi: DataInaportnetBarangProduksi[];
}
