import { Column, Entity, Index } from "typeorm";

@Index("m_tipe_kapal_pkey", ["id"], { unique: true })
@Index("m_tipe_kapal_kode_tipe_kapal_idx", ["kodeTipeKapal"], {})
@Entity("m_tipe_kapal", { schema: "public" })
export class MTipeKapal {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("character varying", {
    name: "kode_tipe_kapal",
    nullable: true,
    length: 255,
  })
  kodeTipeKapal: string | null;

  @Column("character varying", {
    name: "tipe_kapal",
    nullable: true,
    length: 255,
  })
  tipeKapal: string | null;

  @Column("character varying", { name: "id_map", nullable: true, length: 255 })
  idMap: string | null;

  @Column("character varying", {
    name: "enum_tipe",
    nullable: true,
    length: 255,
  })
  enumTipe: string | null;
}
