import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { LaporanKejadianDetailV2 } from "./LaporanKejadianDetailV2";

@Index("laporan_kejadian_pkey", ["id"], { unique: true })
@Entity("laporan_kejadian", { schema: "public" })
export class LaporanKejadianV2 {
  @PrimaryColumn("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
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

  @Column("uuid", { name: "id_operator", nullable: true })
  idOperator: string | null;

  @Column("integer", { name: "status_kejadian", nullable: true })
  statusKejadian: number | null;

  @Column("text", { name: "tindak_lanjut_awal", nullable: true })
  tindakLanjutAwal: string | null;

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

  @Column("text", { name: "dampak", nullable: true })
  dampak: string | null;

  @Column("uuid", { name: "id_pelapor", nullable: true })
  idPelapor: string | null;

  @Column("character varying", {
    name: "nama_pelapor",
    nullable: true,
    length: 255,
  })
  namaPelapor: string | null;

  @Column("text", {
    name: "upt_terkait",
    nullable: true,
    array: true,
  })
  uptTerkait: string[] | null;

  @Column("text", {
    name: "eselon_terkait",
    nullable: true,
    array: true,
  })
  eselonTerkait: string[] | null;

  @Column("uuid", { name: "id_verifikator_1", nullable: true })
  idVerifikator1: string | null;

  @Column("timestamp with time zone", {
    name: "tanggal_verifikasi_1",
    nullable: true,
  })
  tanggalVerifikasi1: Date | null;

  @Column("uuid", { name: "id_verifikator_2", nullable: true })
  idVerifikator2: string | null;

  @Column("timestamp with time zone", {
    name: "tanggal_verifikasi_2",
    nullable: true,
  })
  tanggalVerifikasi2: Date | null;

  @Column("text", { name: "catatan_verifikator_2", nullable: true })
  catatanVerifikator2: string | null;

  @Column("uuid", { name: "id_verifikator_3", nullable: true })
  idVerifikator3: string | null;

  @Column("timestamp with time zone", {
    name: "tanggal_verifikasi_3",
    nullable: true,
  })
  tanggalVerifikasi3: Date | null;

  @Column("text", { name: "catatan_verifikator_3", nullable: true })
  catatanVerifikator3: string | null;

  @Column("text", { name: "jenis_kejadian", nullable: true })
  jenisKejadian: string | null;

  @Column("timestamp with time zone", {
    name: "tanggal_tutup_laporan",
    nullable: true,
  })
  tanggalTutupLaporan: Date | null;

  @Column("text", { name: "catatan_tutup_laporan", nullable: true })
  catatanTutupLaporan: string | null;

  @Column("integer", { name: "waktu_kejadian_zone", nullable: true })
  waktuKejadianZone: number | null;

  @OneToOne(() => LaporanKejadianDetailV2, (detail) => detail.laporanKejadian)
  @JoinColumn([{ name: "id", referencedColumnName: "idLaporanKejadian" }])
  laporanKejadianDetail: LaporanKejadianDetailV2;
}
