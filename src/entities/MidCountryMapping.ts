import { Column, Entity, Index } from "typeorm";

@Index("mid_country_mapping_pkey", ["mid"], { unique: true })
@Entity("mid_country_mapping", { schema: "public" })
export class MidCountryMapping {
  @Column("character varying", { primary: true, name: "mid", length: 3 })
  mid: string;

  @Column("character varying", {
    name: "country_code",
    nullable: true,
    length: 2,
  })
  countryCode: string | null;

  @Column("character varying", {
    name: "country_name",
    nullable: true,
    length: 255,
  })
  countryName: string | null;

  @Column("character varying", {
    name: "flag_url",
    nullable: true,
    length: 255,
  })
  flagUrl: string | null;
}
