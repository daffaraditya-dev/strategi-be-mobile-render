import { Column, Entity, Index } from "typeorm";

@Index("cache_inaportnet_pkey", ["imo"], { unique: true })
@Entity("cache_inaportnet", { schema: "public" })
export class CacheInaportnet {
  @Column("character varying", { primary: true, name: "imo", length: 50 })
  imo: string;

  @Column("text", { name: "response", nullable: true })
  response: string | null;

  @Column("timestamp with time zone", {
    name: "create_date",
    nullable: true,
    default: () => "now()",
  })
  createDate: Date | null;
}
