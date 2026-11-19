import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("data_matriks")
@Unique(["idLokasi", "moda", "date"])
export class MatrikPertitik {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid", { name: "id_lokasi" })
  idLokasi: string;

  @Column("date")
  date: string;

  @Column("int")
  departure: number;

  @Column("int")
  event: number;

  @Column("int")
  arrival: number;

  @Column("int", { name: "vehicle_departure" })
  vehicleDeparture: number;

  @Column("int", { name: "vehicle_arrival" })
  vehicleArrival: number;

  @Column("text", { name: "label" })
  label: string;

  @Column("text", { name: "id_province" })
  provinceId: string;

  @Column("text", { name: "response_api" })
  responseApi: string;

  @Column("text", { name: "moda" })
  moda: string;

  @Column("date")
  created_at: string;

  @Column("date")
  updated_at: string;

  @Column("text")
  type: string;

  @Column("text")
  name: string;

  @Column("text")
  city: string;

  @Column("text")
  province: string;

  @Column("text")
  longitude: string;

  @Column("text")
  latitude: string;

  @Column("text")
  coordinate: string;

}
