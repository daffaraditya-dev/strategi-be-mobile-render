import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("data_od")
export class DataOD {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column("date")
  date: string;

  @Column("text", { name: "origin_id" })
  originId: string;

  @Column("text", { name: "origin_name" })
  originName: string;

  @Column("text", { name: "origin_type" })
  originType: string;

  @Column("text", { name: "origin_city" })
  originCity: string;

  @Column("text", { name: "destination_id" })
  destinationId: string;

  @Column("text", { name: "destination_name" })
  destinationName: string;

  @Column("text", { name: "destination_type" })
  destinationType: string;

  @Column("text", { name: "destination_city" })
  destinationCity: string;

  @Column("int", { name: "event_id" })
  event: number;

  @Column("int")
  passengers: number;

  @Column("int")
  vehicle: number;

  @Column("text", { name: "moda" })
  moda: string;

  @Column("date", { name: "created_date" })
  created_at: string;
}
