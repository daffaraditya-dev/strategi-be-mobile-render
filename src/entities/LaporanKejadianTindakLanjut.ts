import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { LaporanKejadianDetailV2 } from "./LaporanKejadianDetailV2";
import { LaporanKejadianV2 } from "./LaporanKejadianV2";

@Index("laporan_kejadian_tindaklanjut_pkey", ["id"], { unique: true })
@Entity("laporan_kejadian_tindaklanjut", { schema: "public" })
export class LaporanKejadianTindakLanjut {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;
  @Column("uuid", { name: "id_laporan_kejadian" })
  idLaporanKejadian: string;
  @Column("uuid", { primary: true, name: "id_user" })
  idUser: string;
  @Column("text", { name: "tindak_lanjut", nullable: true })
  tindakLanjut: string | null;
  @Column("text", {
    name: "data_pendukung_tindaklanjut",
    nullable: true,
    array: true,
  })
  dataPendukungTindakLanjut: string[] | null;

  @Column("timestamp with time zone", {
    name: "create_date",
    nullable: true,
    default: () => "now()",
  })
  createDate: Date | null;

  @Column("timestamp with time zone", {
    name: "waktu_tindak_lanjut",
    nullable: true,
    default: () => "now()",
  })
  waktuTindakLanjut: Date | null;

  @Column("uuid", { primary: true, name: "id_verifikator_2" })
  idVerifikator2: string;
  @Column("timestamp with time zone", {
    name: "tanggal_verifikasi_2",
    nullable: true,
  })
  tanggalVerifikasi2: Date | null;

  @Column("uuid", { primary: true, name: "id_verifikator_3" })
  idVerifikator3: string;
  @Column("timestamp with time zone", {
    name: "tanggal_verifikasi_3",
    nullable: true,
  })
  tanggalVerifikasi3: Date | null;

  @Column("integer", { name: "status_verifikasi", nullable: true })
  statusVerifikasi: number | null;

  @Column("integer", { name: "waktu_tindak_lanjut_zone", nullable: true })
  waktuTindakLanjutZone: number | null;

  @Column("uuid", { primary: true, name: "id_reject_tindaklanjut" })
  idRejectTindakLanjut: string;

  @Column("timestamp with time zone", {
    name: "tanggal_reject_tindaklanjut",
    nullable: true,
  })
  tanggalRejectTindakLanjut: Date | null;

  @OneToOne(() => LaporanKejadianV2)
  @JoinColumn({ name: "id_laporan_kejadian", referencedColumnName: "id" })
  laporanKejadian: LaporanKejadianV2;
}
