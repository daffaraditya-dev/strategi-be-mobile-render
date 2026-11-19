import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("laporan_pkey", ["id"], { unique: true })
@Entity("laporan", { schema: "public" })
export class Laporan {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "moda", length: 50 })
  moda: string;

  @Column("character varying", { name: "titik_kejadian", length: 255 })
  titikKejadian: string;

  @Column("character varying", {
    name: "nama_sarana",
    nullable: true,
    length: 255,
  })
  namaSarana: string | null;

  @Column("character varying", {
    name: "nama_pengemudi",
    nullable: true,
    length: 255,
  })
  namaPengemudi: string | null;

  @Column("character varying", {
    name: "jenis_sarana",
    nullable: true,
    length: 50,
  })
  jenisSarana: string | null;

  @Column("character varying", {
    name: "no_unik_sarana",
    nullable: true,
    length: 50,
  })
  noUnikSarana: string | null;

  @Column("character varying", { name: "jenis_laporan", length: 50 })
  jenisLaporan: string;

  @Column("character varying", { name: "nama_kejadian", length: 255 })
  namaKejadian: string;

  @Column("timestamp with time zone", {
    name: "waktu_kejadian",
    nullable: true,
  })
  waktuKejadian: Date | null;

  @Column("character varying", {
    name: "bendera_sarana",
    nullable: true,
    length: 50,
  })
  benderaSarana: string | null;

  @Column("character varying", {
    name: "nama_perusahaan",
    nullable: true,
    length: 255,
  })
  namaPerusahaan: string | null;

  @Column("character varying", {
    name: "titik_asal",
    nullable: true,
    length: 255,
  })
  titikAsal: string | null;

  @Column("character varying", {
    name: "titik_tujuan",
    nullable: true,
    length: 255,
  })
  titikTujuan: string | null;

  @Column("character varying", {
    name: "tanda_selar",
    nullable: true,
    length: 255,
  })
  tandaSelar: string | null;

  @Column("character varying", {
    name: "kronologi_kejadian",
    nullable: true,
    length: 500,
  })
  kronologiKejadian: string | null;

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

  @Column("boolean", { name: "is_open", nullable: true, default: () => "true" })
  isOpen: boolean | null;

  @Column("boolean", {
    name: "is_verified",
    nullable: true,
    default: () => "false",
  })
  isVerified: boolean | null;

  @Column("boolean", {
    name: "is_done",
    nullable: true,
    default: () => "false",
  })
  isDone: boolean | null;

  @Column("uuid", { name: "create_id" })
  createId: string;

  @Column("timestamp with time zone", {
    name: "create_date",
    nullable: true,
    default: () => "now()",
  })
  createDate: Date | null;

  @Column("uuid", { name: "update_id", nullable: true })
  updateId: string | null;

  @Column("timestamp with time zone", {
    name: "update_date",
    nullable: true,
    default: () => "now()",
  })
  updateDate: Date | null;

  @Column("text", { name: "dokumen_laporan", nullable: true, array: true })
  dokumenLaporan: string[] | null;

  @Column("text", { name: "dokumen_pendukung", nullable: true, array: true })
  dokumenPendukung: string[] | null;
}
