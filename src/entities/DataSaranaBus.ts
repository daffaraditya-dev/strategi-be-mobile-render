import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MstTerminal } from "./MstTerminal";

@Index("data_sarana_bus_pkey", ["id"], { unique: true })
@Index("data_sarana_bus_nama_po_idx", ["namaPo"], {})
@Index("data_sarana_bus_tgl_data_idx", ["tglData"], {})
@Entity("data_sarana_bus", { schema: "public" })
export class DataSaranaBus {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("date", { name: "tgl_data" })
  tglData: string;

  @Column("time without time zone", { name: "jam_data", nullable: true })
  jamData: string | null;

  @Column("smallint", { name: "jenis", nullable: true })
  jenis: string | null;

  @Column("character varying", { name: "no_pol", nullable: true, length: 255 })
  noPol: string | null;

  @Column("character varying", { name: "nama_po", nullable: true, length: 255 })
  namaPo: string | null;

  @Column("smallint", { name: "jenis_bus", nullable: true })
  jenisBus: number | null;

  @Column("character varying", { name: "created_user", length: 255 })
  createdUser: string;

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

  @Column("integer", { name: "id_terminal_asal", nullable: true })
  idTerminalAsal: number | null;

  @Column("integer", { name: "id_terminal_tujuan", nullable: true })
  idTerminalTujuan: number | null;

  @Column("integer", { name: "lembaga", nullable: true, default: () => "0" })
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

  @Column("smallint", {
    name: "is_nihil",
    nullable: true,
    default: () => "'0'",
  })
  isNihil: number | null;

  @Column("character varying", {
    name: "keterangan_nihil",
    nullable: true,
    length: 500,
  })
  keteranganNihil: string | null;

  @Column("integer", {
    name: "jml_penumpang_naik",
    nullable: true,
    default: () => "0",
  })
  jmlPenumpangNaik: number | null;
  @Column("integer", {
    name: "mudik_gratis",
    nullable: true,
    default: () => "0",
  })
  mudikGratis: number | null;

  @Column("integer", {
    name: "jml_penumpang_turun",
    nullable: true,
    default: () => "0",
  })
  jmlPenumpangTurun: number | null;

  @OneToOne(() => MstTerminal)
  @JoinColumn({ name: "id_terminal_asal" })
  terminalAsal: MstTerminal;

  @OneToOne(() => MstTerminal)
  @JoinColumn({ name: "id_terminal_tujuan" })
  terminalTujuan: MstTerminal;
}
