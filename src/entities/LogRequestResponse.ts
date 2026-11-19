import { Column, Entity, Index } from "typeorm";

@Index("log_request_response_pkey", ["id"], { unique: true })
@Index("log_request_response_log_timestamp_idx", ["logTimestamp"], {})
@Entity("log_request_response", { schema: "public" })
export class LogRequestResponse {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "url", nullable: true })
  url: string | null;

  @Column("character varying", { name: "method", nullable: true, length: 20 })
  method: string | null;

  @Column("character varying", { name: "source", nullable: true, length: 255 })
  source: string | null;

  @Column("text", { name: "request", nullable: true })
  request: string | null;

  @Column("text", { name: "response", nullable: true })
  response: string | null;

  @Column("character varying", {
    name: "username",
    nullable: true,
    length: 255,
  })
  username: string | null;

  @Column("text", { name: "bearer", nullable: true })
  bearer: string | null;

  @Column("timestamp with time zone", {
    name: "log_timestamp",
    nullable: true,
    default: () => "now()",
  })
  logTimestamp: Date | null;
}
