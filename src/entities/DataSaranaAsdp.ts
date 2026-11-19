import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MstPelabuhan } from "./MstPelabuhan";
import { MstTrayek } from "./MstTrayek";
import { DataFerizyAsdp } from "./DataFerizy";

@Index("data_sarana_asdp_pkey", ["id"], { unique: true })
@Index("data_sarana_asdp_tgl_berangkat_idx", ["tglBerangkat"], {})
@Index("data_sarana_asdp_tgl_datang_idx", ["tglDatang"], {})
@Entity("data_sarana_asdp", { schema: "public" })
export class DataSaranaAsdp {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("timestamp without time zone", {
    name: "tgl_berangkat",
    nullable: true,
  })
  tglBerangkat: Date | null;

  @Column("time without time zone", { name: "jam_berangkat", nullable: true })
  jamBerangkat: string | null;

  @Column("timestamp without time zone", { name: "tgl_datang", nullable: true })
  tglDatang: Date | null;

  @Column("time without time zone", { name: "jam_datang", nullable: true })
  jamDatang: string | null;

  @Column("integer", { name: "id_pelabuhan", nullable: true })
  idPelabuhan: number | null;

  @Column("integer", { name: "id_trayek", nullable: true })
  idTrayek: number | null;

  @Column("integer", {
    name: "jml_pnp_dewasa",
    nullable: true,
    default: () => "0",
  })
  jmlPnpDewasa: number | null;

  @Column("integer", {
    name: "jml_pnp_anak",
    nullable: true,
    default: () => "0",
  })
  jmlPnpAnak: number | null;

  @Column("integer", {
    name: "jml_total_pnp",
    nullable: true,
    default: () => "0",
  })
  jmlTotalPnp: number | null;

  @Column("integer", { name: "GOLI", nullable: true, default: () => "0" })
  goli: number | null;

  @Column("integer", { name: "PNPGOLI", nullable: true, default: () => "0" })
  pnpgoli: number | null;

  @Column("integer", { name: "GOLII", nullable: true, default: () => "0" })
  golii: number | null;

  @Column("integer", { name: "PNPGOLII", nullable: true, default: () => "0" })
  pnpgolii: number | null;

  @Column("integer", { name: "GOLIII", nullable: true, default: () => "0" })
  goliii: number | null;

  @Column("integer", { name: "PNPGOLIII", nullable: true, default: () => "0" })
  pnpgoliii: number | null;

  @Column("integer", { name: "GOLIVA", nullable: true, default: () => "0" })
  goliva: number | null;

  @Column("integer", { name: "PNPGOLIVA", nullable: true, default: () => "0" })
  pnpgoliva: number | null;

  @Column("integer", { name: "GOLIVB", nullable: true, default: () => "0" })
  golivb: number | null;

  @Column("integer", { name: "PNPGOLIVB", nullable: true, default: () => "0" })
  pnpgolivb: number | null;

  @Column("integer", { name: "GOLVA", nullable: true, default: () => "0" })
  golva: number | null;

  @Column("integer", { name: "PNPGOLVA", nullable: true, default: () => "0" })
  pnpgolva: number | null;

  @Column("integer", { name: "GOLVB", nullable: true, default: () => "0" })
  golvb: number | null;

  @Column("integer", { name: "PNPGOLVB", nullable: true, default: () => "0" })
  pnpgolvb: number | null;

  @Column("integer", { name: "GOLVIA", nullable: true, default: () => "0" })
  golvia: number | null;

  @Column("integer", { name: "PNPGOLVIA", nullable: true, default: () => "0" })
  pnpgolvia: number | null;

  @Column("integer", { name: "GOLVIB", nullable: true, default: () => "0" })
  golvib: number | null;

  @Column("integer", { name: "PNPGOLVIB", nullable: true, default: () => "0" })
  pnpgolvib: number | null;

  @Column("integer", { name: "GOLVII", nullable: true, default: () => "0" })
  golvii: number | null;

  @Column("integer", { name: "PNPGOLVII", nullable: true, default: () => "0" })
  pnpgolvii: number | null;

  @Column("integer", { name: "GOLVIII", nullable: true, default: () => "0" })
  golviii: number | null;

  @Column("integer", { name: "PNPGOLVIII", nullable: true, default: () => "0" })
  pnpgolviii: number | null;

  @Column("integer", { name: "GOLIX", nullable: true, default: () => "0" })
  golix: number | null;

  @Column("integer", { name: "PNPGOLIX", nullable: true, default: () => "0" })
  pnpgolix: number | null;

  @Column("integer", {
    name: "jml_kendaraan",
    nullable: true,
    default: () => "0",
  })
  jmlKendaraan: number | null;

  @Column("integer", {
    name: "jml_pnp_kendaraan",
    nullable: true,
    default: () => "0",
  })
  jmlPnpKendaraan: number | null;

  @Column("integer", {
    name: "total_penumpang",
    nullable: true,
    default: () => "0",
  })
  totalPenumpang: number | null;

  @Column("smallint", {
    name: "is_nihil",
    nullable: true,
    default: () => "'0'",
  })
  isNihil: number | null;

  @Column("smallint", {
    name: "approval_status",
    nullable: true,
    default: () => "'0'",
  })
  approvalStatus: number | null;

  @Column("text", {
    name: "approval_note",
    nullable: true,
  })
  approvalNote: string | null;

  @Column("character varying", {
    name: "approved_by",
    nullable: true,
  })
  approvedBy: string | null;

  @Column("timestamp without time zone", {
    name: "approved_at",
    nullable: true,
  })
  approvedAt: Date | null;

  @Column("character varying", {
    name: "keterangan_nihil",
    nullable: true,
    length: 500,
  })
  keteranganNihil: string | null;

  @Column("character varying", { name: "created_user", length: 50 })
  createdUser: string;

  @Column("timestamp without time zone", {
    name: "created_date",
    nullable: true,
  })
  createdDate: Date | null;

  @Column("character varying", {
    name: "updated_user",
    nullable: true,
    length: 50,
  })
  updatedUser: string | null;

  @Column("timestamp without time zone", {
    name: "updated_date",
    nullable: true,
  })
  updatedDate: Date | null;

  @Column("integer", { name: "lembaga", nullable: true })
  lembaga: number | null;

  @Column("integer", { name: "pasien", nullable: true, default: () => "0" })
  pasien: number | null;

  @Column("integer", { name: "keluarga", nullable: true, default: () => "0" })
  keluarga: number | null;

  @Column("integer", {
    name: "orang_khusus",
    nullable: true,
    default: () => "0",
  })
  orangKhusus: number | null;

  @Column("smallint", {
    name: "is_delete",
    nullable: true,
    default: () => "'0'",
  })
  isDelete: number | null;

  @Column("character varying", {
    name: "sumber",
    nullable: true,
    length: 50,
    default: () => "'strategi'",
  })
  sumber: string | null;

  @OneToOne(() => MstPelabuhan)
  @JoinColumn({ name: "id_pelabuhan" })
  pelabuhan: MstPelabuhan;

  @OneToOne(() => MstTrayek)
  @JoinColumn({ name: "id_trayek" })
  trayek: MstTrayek;

  // @OneToOne(() => DataFerizyAsdp)
  // @JoinColumn([
  //   { name: "tgl_berangkat", referencedColumnName: "tglBerangkat" },
  //   { name: "jam_berangkat", referencedColumnName: "jamBerangkat" },
  //   { name: "id_pelabuhan", referencedColumnName: "id_pelabuhan" },
  // ])
  // ferizy: DataFerizyAsdp | null;
}
