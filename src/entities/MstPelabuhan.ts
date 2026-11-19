import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { MstProvinsi } from "./MstProvinsi";

@Index("mst_pelabuhan_pkey", ["id"], { unique: true })
@Entity("mst_pelabuhan", { schema: "public" })
export class MstPelabuhan {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("character varying", { name: "is_asdp", nullable: true, length: 1 })
  isAsdp: string | null;

  @Column("character varying", {
    name: "kode_pelabuhan",
    nullable: true,
    length: 255,
  })
  kodePelabuhan: string | null;

  @Column("character varying", { name: "nama_pelabuhan", length: 255 })
  namaPelabuhan: string;

  @Column("character varying", {
    name: "kode_referensi_pelabuhan",
    nullable: true,
    length: 45,
  })
  kodeReferensiPelabuhan: string | null;

  @Column("character varying", {
    name: "kode_referensi_pelabuhan_ipn",
    nullable: true,
    length: 45,
  })
  kodeReferensiPelabuhanIpn: string | null;

  @Column("integer", { name: "is_ipn", nullable: true })
  isIpn: number | null;

  @Column("character varying", { name: "operator", nullable: true, length: 50 })
  operator: string | null;

  @Column("character varying", {
    name: "id_parent",
    nullable: true,
    length: 255,
  })
  idParent: string | null;

  @Column("integer", { name: "klasifikasi", nullable: true })
  klasifikasi: number | null;

  @Column("character varying", {
    name: "klasifikasi_asdp",
    nullable: true,
    length: 1,
  })
  klasifikasiAsdp: string | null;

  @Column("integer", { name: "kelas", nullable: true })
  kelas: number | null;

  @Column("integer", { name: "kapasitas", nullable: true })
  kapasitas: number | null;

  @Column("character varying", { name: "alamat", nullable: true, length: 255 })
  alamat: string | null;

  @Column("character varying", { name: "jenis", nullable: true, length: 255 })
  jenis: string | null;

  @Column("integer", { name: "id_provinsi", nullable: true })
  idProvinsi: number | null;

  @Column("integer", { name: "id_kabupaten", nullable: true })
  idKabupaten: number | null;

  @Column("character varying", { name: "kontak", nullable: true, length: 100 })
  kontak: string | null;

  @Column("character varying", { name: "hp", nullable: true, length: 20 })
  hp: string | null;

  @Column("character varying", { name: "telp", nullable: true, length: 20 })
  telp: string | null;

  @Column("character varying", { name: "fax", nullable: true, length: 20 })
  fax: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("character varying", { name: "lat", nullable: true, length: 100 })
  lat: string | null;

  @Column("character varying", { name: "lan", nullable: true, length: 100 })
  lan: string | null;

  @Column("character varying", {
    name: "nama_plbh_old",
    nullable: true,
    length: 100,
  })
  namaPlbhOld: string | null;

  // @Column("character varying", {
  //   name: "provinsi",
  //   nullable: true,
  //   length: 150,
  // })
  // provinsi: string | null;

  @Column("character varying", {
    name: "status_report",
    nullable: true,
    length: 1,
  })
  statusReport: string | null;

  @Column("integer", {
    name: "is_integrasi_asdp",
    nullable: true,
    default: () => "0",
  })
  isIntegrasiAsdp: number | null;

  @Column("integer", { name: "kapasitas_pnp", nullable: true })
  kapasitasPnp: number | null;

  @Column("character varying", { name: "kxy", nullable: true, length: 100 })
  kxy: string | null;

  @Column("character varying", {
    name: "timezone",
    nullable: true,
    length: 100,
  })
  timezone: string | null;

  @Column("character varying", {
    name: "is_exception",
    nullable: true,
    length: 5,
    default: () => "'0'",
  })
  isException: string | null;

  @Column("integer", { name: "created_user", nullable: true })
  createdUser: number | null;

  @Column("timestamp without time zone", {
    name: "created_date",
    nullable: true,
  })
  createdDate: Date | null;

  @Column("character varying", {
    name: "updated_user",
    nullable: true,
    length: 255,
  })
  updatedUser: string | null;

  @Column("timestamp without time zone", {
    name: "updated_date",
    nullable: true,
  })
  updatedDate: Date | null;

  @Column("uuid", { name: "deleted_by" })
  deletedBy: string;

  @Column("timestamp without time zone", {
    name: "deleted_date",
    nullable: true,
  })
  deletedDate: Date | null;

  @OneToOne(() => MstProvinsi)
  @JoinColumn({ name: "id_provinsi" })
  provinsi: MstProvinsi;
}
