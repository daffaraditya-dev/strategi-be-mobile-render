import { Column, Entity, Index } from "typeorm";

@Index("akun_livestreaming_pkey", ["id"], { unique: true })
@Entity("akun_livestreaming", { schema: "public" })
export class AkunLivestreaming {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("uuid", { name: "id_user", nullable: true })
  idUser: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("character varying", { name: "no_hp", nullable: true, length: 15 })
  noHp: string | null;

  @Column("text", { name: "url_youtube_channel", nullable: true })
  urlYoutubeChannel: string | null;

  @Column("integer", { name: "status", nullable: true })
  status: number | null;

  @Column("uuid", { name: "id_verifier", nullable: true })
  idVerifier: string | null;

  @Column("text", { name: "reason_reject", nullable: true })
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

  @Column("character varying", { name: "nama", nullable: true, length: 255 })
  nama: string | null;

  @Column("character varying", {
    name: "unit_kerja",
    nullable: true,
    length: 255,
  })
  unitKerja: string | null;

  @Column("character varying", {
    name: "channel_id",
    nullable: true,
    length: 50,
  })
  channelId: string | null;

  @Column("integer", { name: "already_hit_youtube", nullable: true })
  alreadyHitYoutube: number | null;
}
