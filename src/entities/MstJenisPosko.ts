import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Posko } from "./Posko";

@Entity("mst_jenis_posko")
export class MstJenisPosko {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "jenis_posko", type: "varchar", length: 255, nullable: true })
  nama: string;

  @Column({ type: "boolean", default: false })
  status: boolean;

  @OneToMany(() => Posko, (posko) => posko.jenisPosko)
  poskos: Posko[];
}
