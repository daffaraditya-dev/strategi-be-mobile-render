import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

// Tabel partitioned (RANGE per bulan di kolom date), PK composite (id, date).
// Tidak ada unique (id_lokasi, moda, date) karena data asli duplikat.
// Setelah swap di DB (data_matriks_partitioned -> data_matriks), ganti nama ke "data_matriks".
@Entity("data_matriks_partitioned")
export class MatrikPertitikPartitioned {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "id_lokasi" })
  idLokasi: string;

  @PrimaryColumn("date")
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
