import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("data_sync")
export class DataSync {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column("date", { name: "start_date" })
  startDate: string;

  @Column("date", { name: "end_date" })
  endDate: string;

  @Column("int", { name: "event_id" })
  event: number;

  @Column("text", { name: "moda" })
  moda: string;

  @Column("text", { name: "type" })
  type: string;

  @Column("text", { name: "status" })
  status: string;

  @Column("date", { name: "running_date" })
  runningDate: string;

  @Column("date", { name: "completed_date" })
  completedDate: string;

  @Column("date", { name: "created_date" })
  created_at: string;
}
