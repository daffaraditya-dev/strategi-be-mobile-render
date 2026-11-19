import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { LaporanKejadian } from "./LaporanKejadian";

@Entity("laporan_kejadian_detail")
export class LaporanKejadianDetail {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid", { name: "id_laporan_kejadian" })
  idLaporanKejadian: string;

  @Column("varchar", { length: 255, name: "pic_pelapor" })
  picPelapor: string | null;

  @Column("varchar", { length: 255, name: "katim_penyedia_data" })
  katimPenyediaData: string | null;

  @Column("varchar", { length: 255, name: "kabid_pusdatin" })
  kabidPusdatin: string | null;

  @Column("varchar", { length: 255, name: "ketua_umum" })
  ketuaUmum: string | null;

  @Column("varchar", { length: 255, name: "deskripsi_laporan" })
  deskripsiLaporan: string | null;

  @Column("varchar", { length: 10, name: "matra" })
  matra: string;

  @Column("varchar", { length: 50, name: "jenis_kecelakaan" })
  jenisKecelakaan: string;

  @Column("text", { array: true, nullable: true, name: "sarana_terlibat" })
  saranaTerlibat: string[] | null;

  @Column("float8", { nullable: true, name: "korban_meninggal_dunia" })
  korbanMeninggalDunia: number | null;

  @Column("float8", { nullable: true, name: "korban_luka_berat" })
  korbanLukaBerat: number | null;

  @Column("float8", { nullable: true, name: "korban_luka_sedang" })
  korbanLukaSedang: number | null;

  @Column("float8", { nullable: true, name: "korban_luka_ringan" })
  korbanLukaRingan: number | null;

  @Column("float8", { nullable: true, name: "korban_hilang" })
  korbanHilang: number | null;

  @Column("float8", { nullable: true, name: "korban_selamat" })
  korbanSelamat: number | null;

  @Column("varchar", {
    length: 255,
    nullable: true,
    name: "on_schene_commander",
  })
  onScheneCommander: string | null;

  @Column("text", { nullable: true, name: "kerusakan_fisik" })
  kerusakanFisik: string | null;

  @Column("text", { nullable: true, name: "dampak_lingkungan" })
  dampakLingkungan: string | null;

  @Column("text", { nullable: true, name: "dampak_lalu_lintas" })
  dampakLaluLintas: string | null;

  @Column("varchar", {
    length: 50,
    nullable: true,
    name: "status_penanggulangan",
  })
  statusPenanggulangan: string | null;

  @Column("text", { nullable: true, name: "laporan_final" })
  laporanFinal: string | null;

  @Column({ type: "boolean", default: false, name: "is_approved" })
  isApproved: boolean;

  @Column({ type: "uuid", nullable: true, name: "approved_by" })
  approvedBy: string | null;

  @Column({ type: "timestamptz", nullable: true, name: "approved_date" })
  approvedDate: Date | null;

  @Column("timestamptz", {
    default: () => "CURRENT_TIMESTAMP",
    nullable: true,
    name: "create_date",
  })
  createDate: Date | null;

  @Column("timestamptz", { nullable: true, name: "update_date" })
  updateDate: Date | null;

  @Column({ type: "text", nullable: true, name: "approved_notes" })
  approvedNotes: string | null;

  @Column({ type: "uuid", nullable: true, name: "rejected_by" })
  rejectedBy: string | null;

  @Column({ type: "timestamptz", nullable: true, name: "rejected_date" })
  rejectedDate: Date | null;

  @Column({ type: "text", nullable: true, name: "rejected_reason" })
  rejectedReason: string | null;

  @Column({
    type: "text",
    nullable: true,
    name: "rejected_additional_comments",
  })
  rejectedAdditionalComments: string | null;

  @OneToOne(() => LaporanKejadian)
  @JoinColumn({ name: "id_laporan_kejadian", referencedColumnName: "id" })
  laporanKejadian: LaporanKejadian;
}
