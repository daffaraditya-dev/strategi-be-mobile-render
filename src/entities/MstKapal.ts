import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { MstPerusahaan } from "./MstPerusahaan";

@Index("mst_kapal_pkey", ["id"], { unique: true })
@Entity("mst_kapal", { schema: "public" })
export class MstKapal {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("integer", { name: "id_perusahaan", nullable: true })
  idPerusahaan: number | null;

  @Column("character varying", {
    name: "id_jenis_kapal",
    nullable: true,
    length: 10,
  })
  idJenisKapal: string | null;

  @Column("character varying", {
    name: "nama_kapal",
    nullable: true,
    length: 225,
  })
  namaKapal: string | null;

  @Column("integer", { name: "dwt", nullable: true })
  dwt: number | null;

  @Column("integer", { name: "gt", nullable: true })
  gt: number | null;

  @Column("integer", { name: "kapasitas", default: () => "0" })
  kapasitas: number;

  @Column("integer", { name: "kapasitas_akhir", default: () => "0" })
  kapasitasAkhir: number;

  @Column("integer", {
    name: "kapasitas_roda2",
    nullable: true,
    default: () => "0",
  })
  kapasitasRoda2: number | null;

  @Column("integer", {
    name: "kapasitas_roda4",
    nullable: true,
    default: () => "0",
  })
  kapasitasRoda4: number | null;

  @Column("integer", { name: "kendaraan", nullable: true, default: () => "0" })
  kendaraan: number | null;

  @Column("integer", { name: "dispen", nullable: true, default: () => "0" })
  dispen: number | null;

  @Column("character varying", {
    name: "geladak",
    nullable: true,
    length: 30,
    default: () => "'0'",
  })
  geladak: string | null;

  @Column("integer", {
    name: "created_user",
    nullable: true,
    default: () => "0",
  })
  createdUser: number | null;

  @Column("timestamp without time zone", {
    name: "created_date",
    nullable: true,
  })
  createdDate: Date | null;

  @Column("integer", { name: "updated_user", nullable: true })
  updatedUser: number | null;

  @Column("timestamp without time zone", {
    name: "updated_date",
    nullable: true,
  })
  updatedDate: Date | null;

  @Column("character varying", {
    name: "panjang",
    nullable: true,
    length: 30,
    default: () => "'0'",
  })
  panjang: string | null;

  @Column("character varying", {
    name: "lebar",
    nullable: true,
    length: 30,
    default: () => "'0'",
  })
  lebar: string | null;

  @Column("integer", {
    name: "tahun_kapal",
    nullable: true,
    default: () => "0",
  })
  tahunKapal: number | null;

  @Column("integer", { name: "grt", nullable: true, default: () => "0" })
  grt: number | null;

  @Column("integer", { name: "knot", nullable: true, default: () => "0" })
  knot: number | null;

  @Column("character varying", {
    name: "jenis_org",
    nullable: true,
    length: 50,
  })
  jenisOrg: string | null;

  @Column("character varying", {
    name: "nama_pemilik",
    nullable: true,
    length: 100,
  })
  namaPemilik: string | null;

  @Column("text", { name: "alamat_pemilik", nullable: true })
  alamatPemilik: string | null;

  @Column("character varying", {
    name: "no_register",
    nullable: true,
    length: 50,
  })
  noRegister: string | null;

  @Column("character varying", {
    name: "status",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  status: string | null;

  @Column("character varying", { name: "is_asdp", nullable: true, length: 1 })
  isAsdp: string | null;

  @Column("character varying", {
    name: "is_exception",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  isException: string | null;

  @OneToOne(() => MstPerusahaan)
  @JoinColumn({ name: "id_perusahaan" })
  perusahaan: MstPerusahaan;
}
