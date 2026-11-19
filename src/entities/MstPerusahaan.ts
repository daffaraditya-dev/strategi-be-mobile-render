import { Column, Entity, Index } from "typeorm";

@Index("mst_perusahaan_pkey", ["id"], { unique: true })
@Index("mst_perusahaan_nama_perusahaan_idx", ["namaPerusahaan"], {})
@Entity("mst_perusahaan", { schema: "public" })
export class MstPerusahaan {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("character varying", {
    name: "nama_perusahaan",
    nullable: true,
    length: 200,
  })
  namaPerusahaan: string | null;

  @Column("character varying", { name: "jenis", length: 20 })
  jenis: string;

  @Column("character varying", {
    name: "nama_pimpinan",
    nullable: true,
    length: 255,
  })
  namaPimpinan: string | null;

  @Column("character varying", { name: "hp", nullable: true, length: 25 })
  hp: string | null;

  @Column("text", { name: "alamat", nullable: true })
  alamat: string | null;

  @Column("integer", { name: "id_propinsi", nullable: true })
  idPropinsi: number | null;

  @Column("integer", { name: "id_kabupaten", nullable: true })
  idKabupaten: number | null;

  @Column("character varying", { name: "telp", nullable: true, length: 20 })
  telp: string | null;

  @Column("character varying", { name: "fax", nullable: true, length: 20 })
  fax: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 50 })
  email: string | null;

  @Column("character varying", { name: "lat", nullable: true, length: 30 })
  lat: string | null;

  @Column("character varying", { name: "lan", nullable: true, length: 30 })
  lan: string | null;

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
}
