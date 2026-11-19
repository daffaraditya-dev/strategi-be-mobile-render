import { Column, Entity, Index, ManyToOne, JoinColumn } from "typeorm";
import { DataInaportnetProduksi } from "./DataInaportnetProduksi";

@Index(
  "data_inaportnet_barang_produksi_pkey",
  ["isBongkarMuat", "jenisKemasan", "namaBarang", "nomorPkk"],
  { unique: true }
)
@Entity("data_inaportnet_barang_produksi", { schema: "public" })
export class DataInaportnetBarangProduksi {
  @Column("character varying", { primary: true, name: "nomor_pkk", length: 50 })
  nomorPkk: string;

  @Column("character", { primary: true, name: "is_bongkar_muat", length: 1 })
  isBongkarMuat: string;

  @Column("character varying", { primary: true, name: "jenis_kemasan", length: 10 })
  jenisKemasan: string;

  @Column("character varying", { primary: true, name: "nama_barang", length: 100 })
  namaBarang: string;

  @Column("character varying", { name: "nomor_spb", nullable: true, length: 50 })
  nomorSpb: string | null;

  @Column("timestamp without time zone", { name: "eta", nullable: true })
  eta: Date | null;

  @Column("timestamp without time zone", { name: "etd", nullable: true })
  etd: Date | null;

  @Column("character varying", { name: "tpk", nullable: true, length: 50 })
  tpk: string | null;

  @Column("character varying", { name: "nama_kapal", nullable: true, length: 50 })
  namaKapal: string | null;

  @Column("character varying", { name: "namaPerusahaan", nullable: true, length: 100 })
  namaPerusahaan: string | null;

  @Column("character varying", { name: "npwpPerusahaan", nullable: true, length: 50 })
  npwpPerusahaan: string | null;

  @Column("character varying", { name: "jenis_kapal", nullable: true, length: 20 })
  jenisKapal: string | null;

  @Column("integer", { name: "gt", nullable: true })
  gt: number | null;

  @Column("numeric", { name: "loa", nullable: true, precision: 10, scale: 2 })
  loa: string | null;

  @Column("numeric", { name: "draft", nullable: true, precision: 5, scale: 2 })
  draft: string | null;

  @Column("character varying", { name: "pelabuhan_asal", nullable: true, length: 50 })
  pelabuhanAsal: string | null;

  @Column("character varying", { name: "pelabuhan_tujuan", nullable: true, length: 50 })
  pelabuhanTujuan: string | null;

  @Column("character varying", { name: "pelabuhan_singgah", nullable: true, length: 50 })
  pelabuhanSinggah: string | null;

  @Column("character varying", { name: "nomor_layanan", nullable: true, length: 50 })
  nomorLayanan: string | null;

  @Column("integer", { name: "jumlah_unit", nullable: true })
  jumlahUnit: number | null;

  @Column("numeric", { name: "jumlah_ton", nullable: true, precision: 10, scale: 2 })
  jumlahTon: string | null;

  @Column("numeric", { name: "jumlah_m3", nullable: true, precision: 10, scale: 2 })
  jumlahM3: string | null;

  @Column("integer", { name: "is_container", nullable: true })
  isContainer: number | null;

  @Column("character varying", { name: "jenis_minerba", nullable: true, length: 50 })
  jenisMinerba: string | null;

  @Column("timestamp without time zone", { name: "created_date", nullable: true })
  createdDate: Date | null;

  @Column("integer", { name: "kapasitas", nullable: true })
  kapasitas: number | null;

  //
  // RELATION : MANY BARANG_PRODUKSI → ONE PRODUKSI
  //
  @ManyToOne(
    () => DataInaportnetProduksi,
    produksi => produksi.barangProduksi,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "nomor_pkk" })
  produksi: DataInaportnetProduksi;
}
