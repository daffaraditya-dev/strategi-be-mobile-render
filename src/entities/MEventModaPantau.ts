import { Column, Entity, Index } from "typeorm";

@Index("m_event_moda_pantau_pkey", ["id"], { unique: true })
@Entity("m_event_moda_pantau", { schema: "public" })
export class MEventModaPantau {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("integer", { name: "event_id" })
  eventId: number;

  @Column("integer", { name: "event_moda_id" })
  eventModaId: number;

  @Column("integer", { name: "id_moda" })
  idModa: number;

  @Column("integer", { name: "id_lokasi" })
  idLokasi: number;

  @Column("character varying", {
    name: "kode_referensi",
    nullable: true,
    length: 45,
  })
  kodeReferensi: string | null;

  @Column("timestamp without time zone", {
    name: "created_date",
    nullable: true,
  })
  createdDate: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_date",
    nullable: true,
  })
  updatedDate: Date | null;

  @Column("integer", { name: "is_delete", nullable: true, default: () => "0" })
  isDelete: number | null;
}
