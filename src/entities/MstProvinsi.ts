import { Column, Entity, Index } from "typeorm";

@Index("mst_provinsi_pkey", ["id"], { unique: true })
@Entity("mst_provinsi", { schema: "public" })
export class MstProvinsi {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("character varying", {
    name: "nama_provinsi",
    nullable: true,
    length: 25,
  })
  namaProvinsi: string | null;

  @Column("character varying", {
    name: "is_pantau",
    nullable: true,
    length: 1,
    default: () => "'0'",
  })
  isPantau: string | null;

  @Column("character varying", { name: "kode_bps", nullable: true, length: 5 })
  kodeBps: string | null;

  @Column("character varying", {
    name: "kode_mendagri",
    nullable: true,
    length: 5,
  })
  kodeMendagri: string | null;
}
