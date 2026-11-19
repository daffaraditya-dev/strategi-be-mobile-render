import { Column, Entity, Index } from "typeorm";

@Index("databasechangeloglock_pkey", ["id"], { unique: true })
@Entity("databasechangeloglock", { schema: "public" })
export class Databasechangeloglock {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("boolean", { name: "locked" })
  locked: boolean;

  @Column("timestamp without time zone", {
    name: "lockgranted",
    nullable: true,
  })
  lockgranted: Date | null;

  @Column("character varying", {
    name: "lockedby",
    nullable: true,
    length: 255,
  })
  lockedby: string | null;
}
