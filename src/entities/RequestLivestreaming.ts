import { Column, Entity, Index } from "typeorm";

@Index("request_livestreaming_pkey", ["id"], { unique: true })
@Entity("request_livestreaming", { schema: "public" })
export class RequestLivestreaming {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("uuid", { name: "id_user", nullable: true })
  idUser: string | null;

  @Column("text", { name: "lokasi_streaming", nullable: true })
  lokasiStreaming: string | null;

  @Column("double precision", {
    name: "longitude",
    nullable: true,
    precision: 53,
  })
  longitude: number | null;

  @Column("double precision", {
    name: "latitude",
    nullable: true,
    precision: 53,
  })
  latitude: number | null;

  @Column("timestamp with time zone", {
    name: "jadwal_streaming",
    nullable: true,
  })
  jadwalStreaming: Date | null;

  @Column("character varying", { name: "judul", nullable: true, length: 255 })
  judul: string | null;

  @Column("character varying", {
    name: "kategori",
    nullable: true,
    length: 255,
  })
  kategori: string | null;

  @Column("text", { name: "deskripsi", nullable: true })
  deskripsi: string | null;

  @Column("text", { name: "url_youtube_streaming", nullable: true })
  urlYoutubeStreaming: string | null;

  @Column("integer", { name: "status", nullable: true })
  status: number | null;

  @Column("uuid", { name: "id_verifier", nullable: true })
  idVerifier: string | null;

  @Column("character varying", {
    name: "reason_reject",
    nullable: true,
    length: 500,
  })
  reasonReject: string | null;

  @Column("timestamp with time zone", {
    name: "create_date",
    nullable: true,
    default: () => "now()",
  })
  createDate: Date | null;

  @Column("timestamp with time zone", { name: "update_date", nullable: true })
  updateDate: Date | null;

  @Column("uuid", { name: "create_id", nullable: true })
  createId: string | null;

  @Column("uuid", { name: "update_id", nullable: true })
  updateId: string | null;

  @Column("character varying", { name: "video_id", nullable: true, length: 50 })
  videoId: string | null;

  @Column("text", { name: "url_thumbnail", nullable: true })
  urlThumbnail: string | null;

  @Column("timestamp with time zone", { name: "published_at", nullable: true })
  publishedAt: Date | null;

  @Column("uuid", { name: "id_akun", nullable: true })
  idAkun: string | null;

  @Column("integer", { name: "is_active", nullable: true })
  isActive: number | null;

  @Column("integer", { name: "status_live", nullable: true })
  statusLive: number | null;

  @Column("text", { name: "tipe_media", nullable: true })
  tipeMedia: string | null;

  @Column("text", { name: "tipe_jalan", nullable: true })
  tipeJalan: string | null;

  @Column("text", { name: "matra", nullable: true })
  matra: string | null;

  @Column("text", { name: "kontributor", nullable: true })
  kontributor: string | null;
}
