import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { LaporanPantauKecelakaan } from "./LaporanPantauKecelakaan";
import { LaporanPantauCuaca } from "./LaporanPantauCuaca";

@Entity("laporan_pantau")
export class LaporanPantau {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "type" })
  type: string;

  @Column({ name: "matra", nullable: true })
  matra: string;

  @Column({ name: "event", nullable: true })
  event: string;

  @Column({ name: "nama", nullable: true })
  nama: string;

  @Column({ name: "personil", nullable: true })
  personil: string;

  @Column({ name: "pengikut", type: "text", nullable: true })
  pengikut: string;

  @Column({ name: "tanggal", type: "date", nullable: true })
  tanggal: Date;

  @Column({ name: "provinsi", nullable: true })
  provinsi: string;

  @Column({ name: "kabupaten", nullable: true })
  kabupaten: string;

  @Column({ name: "angkutan", nullable: true })
  angkutan: string;

  @Column({ name: "unit_pelayanan", nullable: true })
  unitPelayanan: string;

  @Column({ name: "deskripsi", type: "text", nullable: true })
  deskripsi: string;

  @Column({ name: "is_kejadian_menonjol", default: false })
  isKejadianMenonjol: boolean;

  @Column({ name: "kejadian_menonjol", type: "text", nullable: true })
  kejadianMenonjol: string;

  @Column({ name: "koordinat_kejadian_menonjol", nullable: true })
  koordinatKejadianMenonjol: string;

  @Column({ name: "is_kecelakaan", default: false })
  isKecelakaan: boolean;

  @Column({ name: "kecelakaan", type: "text", nullable: true })
  kecelakaan: string;

  @Column({ name: "koordinat_kecelakaan", nullable: true })
  koordinatKecelakaan: string;

  @Column({ name: "lokasi_kecelakaan", type: "text", nullable: true })
  lokasiKecelakaan: string;

  @Column({ name: "pembuat", nullable: true })
  pembuat: string;

  @Column({ nullable: true })
  persetujuan: string;

  @Column({ name: "posko_terpadu", nullable: true })
  poskoTerpadu: string;

  @Column({ nullable: true })
  file: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ name: "caption_photo", nullable: true })
  captionPhoto: string;

  @Column({ type: "boolean", default: false, name: "is_approved" })
  isApproved: boolean;

  @Column({ type: "uuid", nullable: true, name: "approved_by" })
  approvedBy: string | null;

  @Column({ type: "timestamptz", nullable: true, name: "approved_date" })
  approvedDate: Date | null;

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

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column({ name: "created_by", nullable: true })
  createdBy: string;

  @Column({ name: "updated_by", nullable: true })
  updatedBy: string;

  @OneToMany(
    () => LaporanPantauKecelakaan,
    (kecelakaan) => kecelakaan.laporanPantau
  )
  kecelakaanList: LaporanPantauKecelakaan[];

  @OneToMany(() => LaporanPantauCuaca, (cuaca) => cuaca.laporanPantau)
  cuacaList: LaporanPantauCuaca[];
}
