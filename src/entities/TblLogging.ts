import { Column, Entity, Index } from "typeorm";

@Index("tbl_logging_pkey", ["code"], { unique: true })
@Entity("tbl_logging", { schema: "public" })
export class TblLogging {
  @Column("character varying", { primary: true, name: "code", length: 255 })
  code: string;

  @Column("timestamp without time zone", {
    name: "latest_update",
    nullable: true,
  })
  latestUpdate: Date | null;
}
