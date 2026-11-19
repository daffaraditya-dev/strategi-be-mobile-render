import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { LaporanKejadianDetail } from "./LaporanKejadianDetail";

@Index("laporan_kejadian_pkey", ["id"], { unique: true })
@Entity("laporan_kejadian", { schema: "public" })
export class LaporanKejadian {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "nama", nullable: true, length: 255 })
  nama: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("character varying", { name: "no_hp", nullable: true, length: 15 })
  noHp: string | null;

  @Column("timestamp with time zone", {
    name: "waktu_kejadian",
    nullable: true,
  })
  waktuKejadian: Date | null;

  @Column("text", { name: "kronologi_kejadian", nullable: true })
  kronologiKejadian: string | null;

  @Column("text", { name: "data_pendukung", nullable: true, array: true })
  dataPendukung: string[] | null;

  @Column("text", { name: "lokasi", nullable: true })
  lokasi: string | null;

  @Column("double precision", {
    name: "longitude",
    nullable: true,
    precision: 53,
  })
  longitude: number | null;

  @Column("double precision", {
    name: "latitude",
    nullable: true,
    precision: 53,
  })
  latitude: number | null;

  @Column("integer", { name: "status", nullable: true })
  status: number | null;

  @Column("uuid", { name: "id_verifier", nullable: true })
  idVerifier: string | null;

  @Column("text", { name: "keterangan", nullable: true })
  keterangan: string | null;

  @Column("character varying", {
    name: "moda_transportasi",
    nullable: true,
    length: 255,
  })
  modaTransportasi: string | null;

  @Column("character varying", {
    name: "kategori",
    nullable: true,
    length: 255,
  })
  kategori: string | null;

  @Column("text", { name: "update_lokasi", nullable: true })
  updateLokasi: string | null;

  @Column("double precision", {
    name: "update_longitude",
    nullable: true,
    precision: 53,
  })
  updateLongitude: number | null;

  @Column("double precision", {
    name: "update_latitude",
    nullable: true,
    precision: 53,
  })
  updateLatitude: number | null;

  @Column("character varying", {
    name: "unit_kerja",
    nullable: true,
    length: 500,
  })
  unitKerja: string | null;

  @Column("timestamp with time zone", { name: "verify_date", nullable: true })
  verifyDate: Date | null;

  @Column("uuid", { name: "id_tindaklanjut", nullable: true })
  idTindaklanjut: string | null;

  @Column("integer", { name: "status_kejadian", nullable: true })
  statusKejadian: number | null;

  @Column("text", { name: "tindak_lanjut", nullable: true })
  tindakLanjut: string | null;

  @Column("text", {
    name: "data_pendukung_tindaklanjut",
    nullable: true,
    array: true,
  })
  dataPendukungTindaklanjut: string[] | null;

  @Column("timestamp with time zone", {
    name: "waktu_tindaklanjut",
    nullable: true,
  })
  waktuTindaklanjut: Date | null;

  @Column("timestamp with time zone", {
    name: "create_date",
    nullable: true,
    default: () => "now()",
  })
  createDate: Date | null;

  @Column("timestamp with time zone", { name: "update_date", nullable: true })
  updateDate: Date | null;

  @Column("timestamp with time zone", {
    name: "update_waktu_kejadian",
    nullable: true,
  })
  updateWaktuKejadian: Date | null;

  @Column("text", { name: "update_kronologi_kejadian", nullable: true })
  updateKronologiKejadian: string | null;

  @Column("text", {
    name: "update_data_pendukung",
    nullable: true,
    array: true,
  })
  updateDataPendukung: string[] | null;

  @Column("character varying", {
    name: "next_update_moda_transportasi",
    nullable: true,
    length: 255,
  })
  nextUpdateModaTransportasi: string | null;

  @Column("character varying", {
    name: "next_update_kategori",
    nullable: true,
    length: 255,
  })
  nextUpdateKategori: string | null;

  @Column("text", { name: "next_update_lokasi", nullable: true })
  nextUpdateLokasi: string | null;

  @Column("double precision", {
    name: "next_update_longitude",
    nullable: true,
    precision: 53,
  })
  nextUpdateLongitude: number | null;

  @Column("double precision", {
    name: "next_update_latitude",
    nullable: true,
    precision: 53,
  })
  nextUpdateLatitude: number | null;

  @Column("timestamp with time zone", {
    name: "next_update_waktu_kejadian",
    nullable: true,
  })
  nextUpdateWaktuKejadian: Date | null;

  @Column("text", { name: "next_update_kronologi_kejadian", nullable: true })
  nextUpdateKronologiKejadian: string | null;

  @Column("text", { name: "next_update_keterangan", nullable: true })
  nextUpdateKeterangan: string | null;

  @OneToOne(() => LaporanKejadianDetail, (detail) => detail.laporanKejadian)
  @JoinColumn([{ name: "id", referencedColumnName: "idLaporanKejadian" }])
  laporanKejadianDetail: LaporanKejadianDetail;
}
