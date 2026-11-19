import { Column, Entity, Index } from "typeorm";

@Index("cache_2dtiles_pkey", ["cacheKey"], { unique: true })
@Entity("cache_2dtiles", { schema: "public" })
export class Cache_2dtiles {
  @Column("character varying", { primary: true, name: "cache_key", length: 50 })
  cacheKey: string;

  @Column("bytea", { name: "tiles", nullable: true })
  tiles: Buffer | null;

  @Column("timestamp with time zone", {
    name: "create_date",
    nullable: true,
    default: () => "now()",
  })
  createDate: Date | null;
}
