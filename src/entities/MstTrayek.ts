import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { MstPelabuhan } from "./MstPelabuhan";
import { MstKapalAsdp } from "./MstKapalAsdp";

@Index("mst_trayek_pkey", ["id"], { unique: true })
@Index("mst_trayek_id_kapal_idx", ["idKapal"], {})
@Index("mst_trayek_id_pelabuhan_asal_idx", ["idPelabuhanAsal"], {})
@Index("mst_trayek_id_pelabuhan_tujuan_idx", ["idPelabuhanTujuan"], {})
@Entity("mst_trayek", { schema: "public" })
export class MstTrayek {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("integer", { name: "id_kapal" })
  idKapal: number;

  @Column("integer", { name: "id_pelabuhan_asal", nullable: true })
  idPelabuhanAsal: number | null;

  @Column("integer", { name: "id_pelabuhan_tujuan", nullable: true })
  idPelabuhanTujuan: number | null;

  @Column("integer", { name: "order", nullable: true })
  order: number | null;

  @Column("integer", { name: "created_user", nullable: true })
  createdUser: number | null;

  @Column("timestamp without time zone", {
    name: "created_date",
    nullable: true,
  })
  createdDate: Date | null;

  @Column("integer", { name: "updated_user", nullable: true })
  updatedUser: number | null;

  @Column("timestamp without time zone", {
    name: "updated_date",
    nullable: true,
  })
  updatedDate: Date | null;

  @OneToOne(() => MstPelabuhan)
  @JoinColumn({ name: "id_pelabuhan_asal" })
  pelabuhanAsal: MstPelabuhan;

  @OneToOne(() => MstPelabuhan)
  @JoinColumn({ name: "id_pelabuhan_tujuan" })
  pelabuhanTujuan: MstPelabuhan;

  @OneToOne(() => MstKapalAsdp, { nullable: true, eager: true })
  @JoinColumn({ name: "id_kapal" })
  kapal: MstKapalAsdp;
}
