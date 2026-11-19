import { Column, Entity } from "typeorm";

@Entity("databasechangelog", { schema: "public" })
export class Databasechangelog {
  @Column("character varying", { name: "id", length: 255 })
  id: string;

  @Column("character varying", { name: "author", length: 255 })
  author: string;

  @Column("character varying", { name: "filename", length: 255 })
  filename: string;

  @Column("timestamp without time zone", { name: "dateexecuted" })
  dateexecuted: Date;

  @Column("integer", { name: "orderexecuted" })
  orderexecuted: number;

  @Column("character varying", { name: "exectype", length: 10 })
  exectype: string;

  @Column("character varying", { name: "md5sum", nullable: true, length: 35 })
  md5sum: string | null;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column("character varying", {
    name: "comments",
    nullable: true,
    length: 255,
  })
  comments: string | null;

  @Column("character varying", { name: "tag", nullable: true, length: 255 })
  tag: string | null;

  @Column("character varying", {
    name: "liquibase",
    nullable: true,
    length: 20,
  })
  liquibase: string | null;

  @Column("character varying", {
    name: "contexts",
    nullable: true,
    length: 255,
  })
  contexts: string | null;

  @Column("character varying", { name: "labels", nullable: true, length: 255 })
  labels: string | null;

  @Column("character varying", {
    name: "deployment_id",
    nullable: true,
    length: 10,
  })
  deploymentId: string | null;
}
