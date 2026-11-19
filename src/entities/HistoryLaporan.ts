import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("history_laporan_pkey", ["id"], { unique: true })
@Entity("history_laporan", { schema: "public" })
export class HistoryLaporan {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @PrimaryGeneratedColumn({ type: "bigint", name: "laporan_id" })
  laporanId: string;

  @Column("timestamp with time zone", {
    name: "date",
    nullable: true,
    default: () => "now()",
  })
  date: Date | null;

  @Column("character varying", {
    name: "laporan_status",
    nullable: true,
    length: 255,
  })
  laporanStatus: string | null;
}
