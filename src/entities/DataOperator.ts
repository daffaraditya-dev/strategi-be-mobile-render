import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("data_operator")
export class DataOperator {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column("date")
  date: string;

  @Column("int", { name: "event_id" })
  event: number;

  @Column("text", { name: "moda" })
  moda: string;

  @Column("text", { name: "operator" })
  operator: string;

  @Column("text", { name: "pic_name" })
  pic_name: string;

  @Column("text", { name: "pic_phone" })
  pic_phone: string;

  @Column("text", { name: "location" })
  location: string;

  @Column("int")
  passengers: number;

  @Column("int")
  vehicle: number;

  @Column("text")
  otp: string;

  @Column("date", { name: "created_date" })
  created_at: string;
}
