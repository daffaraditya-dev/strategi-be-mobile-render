import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("thirty_seconds_video", { schema: "public" })
export class ThirtySecondsVideo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "id_cctv", type: "varchar", length: 255, nullable: true })
  idCctv?: string;

  @Column({ name: "nama_lokasi", type: "text", nullable: true })
  namaLokasi?: string;

  @Column({ name: "nama_cctv", type: "text", nullable: true })
  namaCctv?: string;

  @Column({ name: "stream_url", type: "text", nullable: true })
  streamUrl?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  status?: string;

  @CreateDateColumn({
    name: "create_date",
    type: "timestamptz",
    default: () => "NOW()",
  })
  createDate: Date;

  @UpdateDateColumn({
    name: "update_date",
    type: "timestamptz",
    nullable: true,
  })
  updateDate?: Date;
}
