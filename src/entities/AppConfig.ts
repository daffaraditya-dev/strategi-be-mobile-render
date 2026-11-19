import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export type ConfigValueType =
  | "string"
  | "number"
  | "boolean"
  | "json"
  | "array";

@Entity("app_settings")
@Index(["platform", "key"], { unique: true })
export class AppConfig {
  @Column("uuid", { primary: true, name: "id" })
  id!: string;

  @Column({ type: "varchar", length: 100 })
  platform!: string; // web | mobile

  @Column({ type: "varchar", length: 100 })
  key!: string;

  @Column({ type: "jsonb" })
  value!: unknown;

  @Column({ name: "value_type", type: "varchar", length: 20 })
  valueType!: ConfigValueType;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
