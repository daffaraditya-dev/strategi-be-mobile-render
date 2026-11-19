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

@Entity("laporan_pantau_cuaca")
export class LaporanPantauCuaca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "id_laporan_pantau" })
  idLaporanPantau: number;

  @ManyToOne(() => LaporanPantau)
  @JoinColumn({ name: "id_laporan_pantau" })
  laporanPantau: LaporanPantau;

  @Column({ name: "kondisi_cuaca", nullable: true })
  kondisiCuaca: string;

  @Column({ name: "jarak_pandang", type: "float", nullable: true })
  jarakPandang: number;

  @Column({ name: "arah_angin_dari", nullable: true })
  arahAnginDari: string;

  @Column({ name: "arah_angin_ke", nullable: true })
  arahAnginKe: string;

  @Column({ name: "kecepatan_angin", type: "float", nullable: true })
  kecepatanAngin: number;

  @Column({ name: "tinggi_gelombang", type: "float", nullable: true })
  tinggiGelombang: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
