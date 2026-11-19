import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

interface SimpulTransportasi {
  matra: string;
  moda: string;
  simpul: string;
}

interface CCTV {
  matra: string;
  simpul: string;
  titikCctv: string;
}

interface Video {
  judul: string;
  link: string;
}

interface Video30s {
  judul: string;
  link: string;
  publishedAt?: string;
  uptId?: string;
  channel?: string;
  uptName?: string;
  deskripsi?: string;
  namaMatra?: string;
  liveStreamId?: string;
  streamingSchedule?: string | null;
}

@Entity("fokus")
export class Fokus {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("uuid")
  id_user: string;

  @Column("text", { nullable: true })
  judul: string;

  @Column("jsonb", { nullable: true })
  simpul_transportasi: SimpulTransportasi[];

  @Column("jsonb", { nullable: true })
  cctv: CCTV[];

  @Column("jsonb", { nullable: true })
  video_30s: Video30s[];

  @Column("jsonb", { nullable: true })
  video_live_streaming: Video[];

  @Column("boolean", { nullable: true, default: false, name: "is_default" })
  is_default: boolean;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  create_date: Date;

  @UpdateDateColumn({ type: "timestamptz", nullable: true })
  update_date: Date;
}
