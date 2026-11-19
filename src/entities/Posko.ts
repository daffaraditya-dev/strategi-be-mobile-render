import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { MstJenisPosko } from "./MstJenisPosko";
import { MstPesertaPosko } from "./MstPesertaPosko";

@Entity("posko")
export class Posko {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "id_jenis_posko", type: "integer", nullable: true })
  idJenisPosko: number;

  @Column({ name: "id_event", type: "integer", nullable: true })
  idEvent: number;

  @Column({ name: "nama_posko", type: "varchar", length: 255 })
  namaPosko: string;

  @Column({ name: "alamat_posko", type: "text", nullable: true })
  alamatPosko: string;

  @Column({
    name: "unit_kerja_koordinator",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  unitKerjaKoordinator: string;

  @Column({ name: "id_peserta_posko", type: "integer", nullable: true })
  idPesertaPosko: number;

  @Column({ name: "koordinator_posko", type: "text", nullable: true })
  koordinatorPosko: string;

  @Column({ name: "lokasi_posko", type: "text", nullable: true })
  lokasiPosko: string;

  @Column({ name: "koordinat_posko", type: "point", nullable: true })
  koordinatPosko: string;

  @Column({ name: "ketua_posko", type: "varchar", length: 255, nullable: true })
  ketuaPosko: string;

  @Column({
    name: "no_telp_ketua_posko",
    type: "varchar",
    length: 20,
    nullable: true,
  })
  noTelpKetuaPosko: string;

  @Column({ name: "pic_posko", type: "varchar", length: 255, nullable: true })
  picPosko: string;

  @Column({
    name: "no_telp_posko",
    type: "varchar",
    length: 20,
    nullable: true,
  })
  noTelpPosko: string;

  @Column({ name: "masa_pantau_awal", type: "date", nullable: true })
  masaPantauAwal: Date;

  @Column({ name: "masa_pantau_akhir", type: "date", nullable: true })
  masaPantauAkhir: Date;

  @Column({ name: "titik_pantau", type: "text", nullable: true })
  titikPantau: string;

  @Column({ name: "fokus_pantau", type: "text", array: true, nullable: true })
  fokusPantau: string[];

  @Column({ name: "lampiran", type: "text", nullable: true })
  lampiran: string;

  @Column({
    name: "create_date",
    type: "timestamptz",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @Column({ name: "update_date", type: "timestamptz", nullable: true })
  updateDate: Date;

  @ManyToOne(() => MstJenisPosko, (jenisPosko) => jenisPosko.poskos)
  @JoinColumn({ name: "id_jenis_posko" })
  jenisPosko: MstJenisPosko;

  @ManyToOne(() => MstPesertaPosko, (pesertaPosko) => pesertaPosko.poskos)
  @JoinColumn({ name: "id_peserta_posko" })
  pesertaPosko: MstPesertaPosko;
}
