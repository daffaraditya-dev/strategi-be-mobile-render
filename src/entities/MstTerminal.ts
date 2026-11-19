import { Column, Entity, Index } from "typeorm";

@Index("mst_terminal_pkey", ["id"], { unique: true })
@Entity("mst_terminal", { schema: "public" })
export class MstTerminal {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("integer", { name: "id_llaj", nullable: true })
  idLlaj: number | null;

  @Column("character varying", {
    name: "nama_terminal",
    nullable: true,
    length: 50,
  })
  namaTerminal: string | null;

  @Column("character varying", {
    name: "kode_prasarana",
    nullable: true,
    length: 5,
    default: () => "''",
  })
  kodePrasarana: string | null;

  @Column("character", { name: "tipe", nullable: true, length: 1 })
  tipe: string | null;

  @Column("numeric", { name: "luas", nullable: true, precision: 10, scale: 0 })
  luas: string | null;

  @Column("character varying", { name: "alamat", nullable: true, length: 254 })
  alamat: string | null;

  @Column("character varying", { name: "kodepos", nullable: true, length: 5 })
  kodepos: string | null;

  @Column("character varying", { name: "telp", nullable: true, length: 50 })
  telp: string | null;

  @Column("character varying", { name: "fax", nullable: true, length: 50 })
  fax: string | null;

  @Column("character varying", {
    name: "id_kabupaten",
    nullable: true,
    length: 4,
  })
  idKabupaten: string | null;

  @Column("integer", { name: "id_provinsi", nullable: true })
  idProvinsi: number | null;

  @Column("character varying", { name: "kx", nullable: true, length: 50 })
  kx: string | null;

  @Column("character varying", { name: "ky", nullable: true, length: 50 })
  ky: string | null;

  @Column("character varying", { name: "kxy", nullable: true, length: 50 })
  kxy: string | null;

  @Column("character varying", {
    name: "koordinat",
    nullable: true,
    length: 254,
  })
  koordinat: string | null;

  @Column("character varying", { name: "x_dec", nullable: true, length: 20 })
  xDec: string | null;

  @Column("character varying", { name: "y_dec", nullable: true, length: 20 })
  yDec: string | null;

  @Column("integer", { name: "kapasitas_pnp", default: () => "0" })
  kapasitasPnp: number;

  @Column("integer", {
    name: "status_report",
    nullable: true,
    default: () => "0",
  })
  statusReport: number | null;

  @Column("integer", { name: "created_user", nullable: true })
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

  @Column("character", { name: "tipe_old", nullable: true, length: 1 })
  tipeOld: string | null;
}
