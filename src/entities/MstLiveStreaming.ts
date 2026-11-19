import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AkunLivestreaming } from "./AkunLivestreaming";

@Index("mst_live_streaming_pkey", ["id"], { unique: true })
@Entity("mst_live_streaming", { schema: "public" })
export class MstLiveStreaming {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("timestamp", { name: "tanggal", nullable: true })
  tanggal: Date | null;

  @Column("time", { name: "jam", nullable: true })
  jam: string | null;

  @Column("character varying", { name: "upt", nullable: true, length: 128 })
  upt: string | null;

  @Column("character varying", { name: "link_live", nullable: true, length: 255 })
  linkLive: string | null;

  @Column("text", { name: "lokasi", nullable: true })
  lokasi: string | null;

  @Column("text", { name: "eselon_terkait", nullable: true })
  eselonTerkait: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("text", { name: "file_upload", nullable: true })
  fileUpload: string | null;

  @Column("character varying", { name: "person_in_charge", nullable: true, length: 255 })
  personInCharge: string | null;

  @Column("uuid", { name: "created_by", nullable: true })
  createdBy: string;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("uuid", { name: "updated_by", nullable: true })
  updatedBy: string;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("uuid", { name: "deleted_by", nullable: true })
  deletedBy: string;

  @Column("timestamp", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @Column("integer", { name: "category", nullable: true })
  category: number | null;

  // Tambahan kolom dari yt

  @Column("uuid", { name: "id_akun_livestreaming", nullable: true })
  idAkunLivestreaming: string | null;

  @Column("character varying", { name: "video_id", nullable: true, length: 255 })
  videoId: string | null;

  @Column("text", { name: "video_title", nullable: true })
  videoTitle: string | null;

  @Column("text", { name: "video_description", nullable: true })
  videoDescription: string | null;

  @Column("character varying", { name: "video_channel_id", nullable: true, length: 255 })
  videoChannelId: string | null;

  @Column("timestamp", { name: "video_published_at", nullable: true })
  videoPublishedAt: Date | null;

  @Column("integer", { name: "video_status_live", nullable: true })
  videoStatusLive: number | null;

  @Column("timestamp", { name: "video_streaming_schedule", nullable: true })
  videoStreamingSchedule: Date | null;

  @ManyToOne(() => AkunLivestreaming)
  @JoinColumn({ name: "id_akun_livestreaming" })
  akun: AkunLivestreaming;
}
