import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("pk_role", ["id"], { unique: true })
@Entity("role", { schema: "public" })
export class Role {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("character varying", {
    name: "deskripsi",
    nullable: true,
    length: 255,
  })
  deskripsi: string | null;

  @Column("text", { name: "akses", nullable: true, array: true })
  akses: string[] | null;

  @Column("text", { name: "akses_mobile", nullable: true, array: true })
  aksesMobile: string[] | null;

  @Column("timestamp with time zone", {
    name: "create_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date | null;

  @Column("timestamp with time zone", {
    name: "update_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updateDate: Date | null;

  @Column("character varying", {
    name: "create_by",
    nullable: true,
    length: 255,
  })
  createBy: string | null;

  @Column("character varying", {
    name: "update_by",
    nullable: true,
    length: 255,
  })
  updateBy: string | null;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
