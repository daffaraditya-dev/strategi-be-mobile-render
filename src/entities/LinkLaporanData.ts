import { Column, Entity, Index } from "typeorm";

@Index("link_laporan_data_pkey", ["id"], { unique: true })
@Entity("link_laporan_data", { schema: "public" })
export class LinkLaporanData {
  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("character varying", {
    name: "nama_data",
    nullable: true,
    length: 255,
  })
  namaData: string | null;

  @Column("character varying", { name: "url", nullable: true, length: 255 })
  url: string | null;
}
