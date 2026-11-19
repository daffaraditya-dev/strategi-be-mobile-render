import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { LaporanPoskoShift } from "./LaporanPoskoShift";
import { User } from "./User";

@Index("laporan_posko_pkey", ["id"], { unique: true })
@Entity("laporan_posko", { schema: "public" })
export class LaporanPosko {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", {
    name: "judul_laporan",
    nullable: true,
    length: 255,
  })
  judulLaporan: string | null;

  @Column("date", { name: "tanggal_laporan", nullable: true })
  tanggalLaporan: string | null;

  @Column("text", { name: "deskripsi", nullable: true })
  deskripsi: string | null;

  @Column("uuid", { name: "user_id", nullable: true })
  userId: string | null;

  @Column("text", { name: "uploaded_files", array: true, nullable: true })
  uploadedFiles: string[] | null;

  @Column("integer", { name: "event_id", nullable: true })
  eventId: number | null;

  @Column("integer", { name: "laporan_posko_shift_id", nullable: true })
  laporanPoskoShiftId: number | null;

  @Column("integer", { name: "total_kecelakaan", nullable: true })
  totalKecelakaan: number | null;

  @Column("integer", { name: "total_meninggal", nullable: true })
  totalMeninggal: number | null;

  @Column("integer", { name: "total_luka_berat", nullable: true })
  totalLukaBerat: number | null;

  @Column("integer", { name: "total_luka_ringan", nullable: true })
  totalLukaRingan: number | null;

  @Column("numeric", { name: "total_kerugian", nullable: true })
  totalKerugian: number | null;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("character varying", { name: "posko", nullable: true, length: 255 })
  posko: string | null;

  @Column("character varying", {
    name: "updated_by",
    nullable: true,
    length: 255,
  })
  updatedBy: string | null;

  @Column("timestamp", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @Column("character varying", {
    name: "deleted_by",
    nullable: true,
    length: 255,
  })
  deletedBy: string | null;

  @ManyToOne(() => LaporanPoskoShift)
  @JoinColumn({ name: "laporan_posko_shift_id" })
  shift: LaporanPoskoShift;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
}
