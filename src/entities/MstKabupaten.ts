import { Column, Entity, Index } from "typeorm";

@Index("mst_kabupaten_pkey", ["id"], { unique: true })
@Entity("mst_kabupaten", { schema: "public" })
export class MstKabupaten {
  @Column("character varying", { primary: true, name: "id", length: 4 })
  id: string;

  @Column("character varying", { name: "nama_kabupaten", length: 50 })
  namaKabupaten: string;

  @Column("integer", { name: "id_provinsi" })
  idProvinsi: number;

  @Column("integer", { name: "jml_kec", nullable: true })
  jmlKec: number | null;

  @Column("integer", { name: "jml_desa", nullable: true })
  jmlDesa: number | null;

  @Column("character varying", {
    name: "sumber_data",
    nullable: true,
    length: 254,
  })
  sumberData: string | null;

  @Column("integer", { name: "status_data", nullable: true })
  statusData: number | null;

  @Column("character varying", {
    name: "ket_data",
    nullable: true,
    length: 254,
  })
  ketData: string | null;

  @Column("numeric", {
    name: "shape_leng",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  shapeLeng: string | null;

  @Column("numeric", {
    name: "shape_area",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  shapeArea: string | null;

  @Column("character varying", { name: "kode_bps", nullable: true, length: 5 })
  kodeBps: string | null;

  @Column("character varying", {
    name: "kode_mendagri",
    nullable: true,
    length: 5,
  })
  kodeMendagri: string | null;

  @Column("integer", { name: "created_by", nullable: true })
  createdBy: number | null;

  @Column("timestamp without time zone", {
    name: "created_date",
    nullable: true,
  })
  createdDate: Date | null;

  @Column("integer", { name: "updated_by", nullable: true })
  updatedBy: number | null;

  @Column("timestamp without time zone", {
    name: "updated_date",
    nullable: true,
  })
  updatedDate: Date | null;
}
