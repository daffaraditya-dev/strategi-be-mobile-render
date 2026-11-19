import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { MstPerusahaan } from "./MstPerusahaan";

@Index("mst_kapal_asdp_pkey", ["idKapal"], { unique: true })
@Entity("mst_kapal_asdp", { schema: "public" })
export class MstKapalAsdp {
  @Column("integer", { primary: true, name: "id_kapal" })
  idKapal: number;

  @Column("integer", { name: "id_jenis_kapal", nullable: true })
  idJenisKapal: number | null;

  @Column("integer", { name: "id_lintasan", nullable: true })
  idLintasan: number | null;

  @Column("integer", { name: "id_perusahaan", nullable: true })
  idPerusahaan: number | null;

  @Column("character", { name: "idpp1", nullable: true, length: 5 })
  idpp1: string | null;

  @Column("character", { name: "idpp2", nullable: true, length: 5 })
  idpp2: string | null;

  @Column("character varying", {
    name: "nama_kapal",
    nullable: true,
    length: 100,
  })
  namaKapal: string | null;

  @Column("integer", { name: "thn_kapal", nullable: true })
  thnKapal: number | null;

  @Column("integer", { name: "grt", nullable: true })
  grt: number | null;

  @Column("integer", { name: "knot", nullable: true })
  knot: number | null;

  @Column("integer", { name: "kapasitas_pnp", nullable: true })
  kapasitasPnp: number | null;

  @Column("integer", { name: "kapasitas_roda4", nullable: true })
  kapasitasRoda4: number | null;

  @Column("integer", { name: "kapasitas_roda2", nullable: true })
  kapasitasRoda2: number | null;

  @Column("integer", { name: "status_kapal", nullable: true })
  statusKapal: number | null;

  @Column("integer", { name: "status", nullable: true, default: () => "1" })
  status: number | null;

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

  @OneToOne(() => MstPerusahaan)
  @JoinColumn({ name: "id_perusahaan" })
  perusahaan: MstPerusahaan;
}
