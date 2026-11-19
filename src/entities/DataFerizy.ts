import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

@Index("data_ferizy_asdp_pkey", ["id"], { unique: true })
@Index("data_ferizy_asdp_tgl_berangkat_idx", ["tglBerangkat"], {})
@Entity("data_ferizy_asdp", { schema: "public" })
export class DataFerizyAsdp {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("timestamp without time zone", {
    name: "tgl_berangkat",
    nullable: true,
  })
  tglBerangkat: Date | null;

  @Column("time without time zone", {
    name: "jam_berangkat",
    nullable: true,
  })
  jamBerangkat: string | null;

  @Column("bigint", { name: "id_pelabuhan", nullable: true })
  idPelabuhan: number | null;

  @Column("varchar", { name: "nama_kapal", nullable: true, length: 255 })
  namaKapal: string | null;

  @Column("integer", { name: "jml_pnp_anak", nullable: true })
  jmlPnpAnak: number | null;

  @Column("integer", { name: "jml_pnp_dewasa", nullable: true })
  jmlPnpDewasa: number | null;

  @Column("integer", { name: "jml_pnp_kendaraan", nullable: true })
  jmlPnpKendaraan: number | null;

  @Column("varchar", { name: "lintasan_awal", nullable: true, length: 255 })
  lintasanAwal: string | null;

  @Column("varchar", { name: "lintasan_akhir", nullable: true, length: 255 })
  lintasanAkhir: string | null;

  @Column("varchar", { name: "sumber", nullable: true, length: 64 })
  sumber: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
  })
  updatedAt: Date | null;
}
