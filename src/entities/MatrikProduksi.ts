import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("data_recap")
@Unique(["type", "moda", "date"])

export class MatrikProduksi {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("date")
  date: string;

  @Column("int")
  event: number;

  @Column("int")
  departure: number;

  @Column("int")
  arrival: number;

  @Column("int", { name: "vehicle_departure" })
  vehicleDeparture: number;

  @Column("int", { name: "vehicle_arrival" })
  vehicleArrival: number;

  @Column("text", { name: "response_api" })
  responseApi: string;

  @Column("text", { name: "moda" })
  moda: string;

  @Column("text", { name: "label" })
  label: string;

  @Column("date")
  created_at: string;

  @Column("date")
  updated_at: string;

  @Column("text")
  type: string;

}
