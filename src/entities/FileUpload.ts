import { Column, Entity, Index } from "typeorm";

@Index("index_created_date", ["createdDate"], {})
@Index("file_upload_pkey", ["id"], { unique: true })
@Entity("file_upload", { schema: "public" })
export class FileUpload {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "path", nullable: true, length: 1000 })
  path: string | null;

  @Column("timestamp with time zone", {
    name: "created_date",
    nullable: true,
    default: () => "now()",
  })
  createdDate: Date | null;
}
