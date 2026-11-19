import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("sync_date_data")
@Index(["dateHit", "moda"])
@Index(["statusMatriks"])
@Index(["statusOD"])
@Index(["statusOperator"])
export class DataSyncHubnet {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column("date", { name: "tanggal" })
  date: string;

  @Column("text", { name: "moda" })
  moda: string;

  @Column("date", { name: "tanggal_hit" })
  dateHit: string;

  @Column("date", { name: "created_at" })
  createdAt: string;

  @Column("boolean", { name: "status" })
  status: boolean;

  @Column("boolean", { name: "status_matriks" })
  statusMatriks: boolean;

  @Column("boolean", { name: "status_od" })
  statusOD: boolean;

  @Column("boolean", { name: "status_operator" })
  statusOperator: boolean;

  @Column("date", { name: "sync_at" })
  syncAt: string;

  @Column("date", { name: "completed_at" })
  completedAt: string;
}
