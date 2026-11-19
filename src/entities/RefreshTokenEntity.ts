import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("pk_refreshtokenentity", ["id"], { unique: true })
@Entity("refresh_token_entity", { schema: "public" })
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", {
    name: "username",
    nullable: true,
    length: 255,
  })
  username: string | null;

  @Column("character varying", {
    name: "refresh_token",
    nullable: true,
    length: 255,
  })
  refreshToken: string | null;

  @Column("boolean", { name: "revoked" })
  revoked: boolean;

  @Column("timestamp without time zone", { name: "date_created" })
  dateCreated: Date;

  @Column("boolean", { name: "is_mobile_app", default: () => "false" })
  isMobileApp: boolean;
}
