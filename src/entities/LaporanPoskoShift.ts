import { Column, Entity, Index } from "typeorm";

@Index("laporan_posko_shift_pkey", ["id"], { unique: true })
@Entity("laporan_posko_shift", { schema: "public" })
export class LaporanPoskoShift {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("time", { name: "start_time", nullable: true })
  startTime: string | null;

  @Column("time", { name: "end_time", nullable: true })
  endTime: string | null;
}
