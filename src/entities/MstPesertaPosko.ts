import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Posko } from "./Posko";

@Entity("mst_peserta_posko")
export class MstPesertaPosko {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "peserta_posko",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  nama: string;

  @Column({ type: "boolean", default: false })
  status: boolean;

  @OneToMany(() => Posko, (posko) => posko.pesertaPosko)
  poskos: Posko[];
}
