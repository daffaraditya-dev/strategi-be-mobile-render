import { Column, Entity, Index } from "typeorm";

@Index("pk_tcpdatasources", ["id"], { unique: true })
@Entity("tcp_datasources", { schema: "public" })
export class TcpDatasources {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("character varying", { name: "host", length: 255 })
  host: string;

  @Column("integer", { name: "port" })
  port: number;

  @Column("boolean", { name: "active", nullable: true })
  active: boolean | null;
}
