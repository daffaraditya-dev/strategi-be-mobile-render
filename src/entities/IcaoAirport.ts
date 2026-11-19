import { Column, Entity, Index } from "typeorm";

@Index("icao_airport_pkey", ["icaoCode"], { unique: true })
@Entity("icao_airport", { schema: "public" })
export class IcaoAirport {
  @Column("character varying", { primary: true, name: "icao_code", length: 4 })
  icaoCode: string;

  @Column("character varying", { name: "iata_code", nullable: true, length: 3 })
  iataCode: string | null;

  @Column("character varying", {
    name: "airport_name",
    nullable: true,
    length: 255,
  })
  airportName: string | null;

  @Column("character varying", {
    name: "airport_type",
    nullable: true,
    length: 255,
  })
  airportType: string | null;

  @Column("character varying", { name: "city", nullable: true, length: 255 })
  city: string | null;

  @Column("character varying", { name: "country", nullable: true, length: 255 })
  country: string | null;
}
