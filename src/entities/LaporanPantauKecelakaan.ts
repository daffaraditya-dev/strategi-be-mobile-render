import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { LaporanPantau } from "./LaporanPantau";

@Entity("laporan_pantau_kecelakaan")
export class LaporanPantauKecelakaan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "id_laporan_pantau" })
  idLaporanPantau: number;

  @ManyToOne(() => LaporanPantau)
  @JoinColumn({ name: "id_laporan_pantau" })
  laporanPantau: LaporanPantau;

  @Column({ nullable: true })
  matra: string;

  @Column({ name: "tanggal_waktu_kejadian", type: "timestamp" })
  tanggalWaktuKejadian: Date;

  @Column({ name: "jenis_kecelakaan", nullable: true })
  jenisKecelakaan: string;

  @Column({ type: "text", nullable: true })
  uraian: string;

  @Column({ name: "korban_jiwa", type: "integer", default: 0 })
  korbanJiwa: number;

  @Column({ name: "luka_berat", type: "integer", default: 0 })
  lukaBerat: number;

  @Column({ name: "luka_ringan", type: "integer", default: 0 })
  lukaRingan: number;

  @Column({ type: "integer", default: 0 })
  hilang: number;

  @Column({ type: "integer", default: 0 })
  selamat: number;

  @Column({ name: "dampak_lingkungan_jenis", nullable: true })
  dampakLingkunganJenis: string;

  @Column({ name: "dampak_lingkungan_uraian", type: "text", nullable: true })
  dampakLingkunganUraian: string;

  @Column({ name: "dampak_lalu_lintas_jenis", nullable: true })
  dampakLaluLintasJenis: string;

  @Column({ name: "dampak_lalu_lintas_uraian", type: "text", nullable: true })
  dampakLaluLintasUraian: string;

  @Column({ name: "status_penanggulangan_jenis", nullable: true })
  statusPenanggulanganJenis: string;

  @Column({
    name: "status_penanggulangan_uraian",
    type: "text",
    nullable: true,
  })
  statusPenanggulanganUraian: string;

  @Column({ nullable: true })
  lokasi: string;

  @Column({ nullable: true })
  koordinat: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
