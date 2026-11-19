import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MstPelabuhan } from "./MstPelabuhan";
import { MstKapal } from "./MstKapal";

@Index("data_sarana_laut_pkey", ["id"], { unique: true })
@Index("data_sarana_laut_tgl_berangkat_idx", ["tglBerangkat"], {})
@Index("data_sarana_laut_tgl_datang_idx", ["tglDatang"], {})
@Entity("data_sarana_laut", { schema: "public" })
export class DataSaranaLaut {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("integer", { name: "id_pelabuhan", nullable: true })
  idPelabuhan: number | null;

  @Column("integer", { name: "id_kapal", nullable: true })
  idKapal: number | null;

  @Column("integer", { name: "kapasitas", nullable: true })
  kapasitas: number | null;

  @Column("integer", { name: "dispensasi", nullable: true })
  dispensasi: number | null;

  @Column("integer", {
    name: "kapasitas_dispensasi",
    nullable: true,
    default: () => "0",
  })
  kapasitasDispensasi: number | null;

  @Column("numeric", {
    name: "pass_factor",
    nullable: true,
    precision: 5,
    scale: 2,
    default: () => "0.00",
  })
  passFactor: string | null;

  @Column("integer", { name: "selisih", nullable: true, default: () => "0" })
  selisih: number | null;

  @Column("integer", { name: "gross_tonage", nullable: true })
  grossTonage: number | null;

  @Column("integer", { name: "id_plbh_asal", nullable: true })
  idPlbhAsal: number | null;

  @Column("timestamp without time zone", { name: "tgl_datang", nullable: true })
  tglDatang: Date | null;

  @Column("time without time zone", { name: "jam_datang", nullable: true })
  jamDatang: string | null;

  @Column("integer", {
    name: "jml_pnp_turun",
    nullable: true,
    default: () => "0",
  })
  jmlPnpTurun: number | null;

  @Column("integer", {
    name: "jml_pnp_lanjutan",
    nullable: true,
    default: () => "0",
  })
  jmlPnpLanjutan: number | null;

  @Column("integer", { name: "id_plbh_tujuan", nullable: true })
  idPlbhTujuan: number | null;

  @Column("timestamp without time zone", {
    name: "tgl_berangkat",
    nullable: true,
  })
  tglBerangkat: Date | null;

  @Column("time without time zone", { name: "jam_berangkat", nullable: true })
  jamBerangkat: string | null;

  @Column("integer", {
    name: "jml_pnp_berangkat",
    nullable: true,
    default: () => "0",
  })
  jmlPnpBerangkat: number | null;

  @Column("integer", {
    name: "jml_diatas_kapal",
    nullable: true,
    default: () => "0",
  })
  jmlDiatasKapal: number | null;

  @Column("integer", {
    name: "tenaga_kerja_turun",
    nullable: true,
    default: () => "0",
  })
  tenagaKerjaTurun: number | null;

  @Column("integer", {
    name: "awak_kapal_turun",
    nullable: true,
    default: () => "0",
  })
  awakKapalTurun: number | null;

  @Column("integer", {
    name: "pelayaran_terbatas_turun",
    nullable: true,
    default: () => "0",
  })
  pelayaranTerbatasTurun: number | null;

  @Column("integer", {
    name: "pelayaran_perintis_turun",
    nullable: true,
    default: () => "0",
  })
  pelayaranPerintisTurun: number | null;

  @Column("integer", {
    name: "pelayaran_antar_pulau_turun",
    nullable: true,
    default: () => "0",
  })
  pelayaranAntarPulauTurun: number | null;

  @Column("integer", {
    name: "keperluan_mendesak_turun",
    nullable: true,
    default: () => "0",
  })
  keperluanMendesakTurun: number | null;

  @Column("integer", {
    name: "tenaga_kerja_naik",
    nullable: true,
    default: () => "0",
  })
  tenagaKerjaNaik: number | null;

  @Column("integer", {
    name: "awak_kapal_naik",
    nullable: true,
    default: () => "0",
  })
  awakKapalNaik: number | null;

  @Column("integer", {
    name: "pelayaran_terbatas_naik",
    nullable: true,
    default: () => "0",
  })
  pelayaranTerbatasNaik: number | null;

  @Column("integer", {
    name: "pelayaran_perintis_naik",
    nullable: true,
    default: () => "0",
  })
  pelayaranPerintisNaik: number | null;

  @Column("integer", {
    name: "pelayaran_antar_pulau_naik",
    nullable: true,
    default: () => "0",
  })
  pelayaranAntarPulauNaik: number | null;

  @Column("integer", {
    name: "keperluan_mendesak_naik",
    nullable: true,
    default: () => "0",
  })
  keperluanMendesakNaik: number | null;

  @Column("integer", {
    name: "tenaga_kerja_lanjutan",
    nullable: true,
    default: () => "0",
  })
  tenagaKerjaLanjutan: number | null;

  @Column("integer", {
    name: "awak_kapal_lanjutan",
    nullable: true,
    default: () => "0",
  })
  awakKapalLanjutan: number | null;

  @Column("integer", {
    name: "pelayaran_terbatas_lanjutan",
    nullable: true,
    default: () => "0",
  })
  pelayaranTerbatasLanjutan: number | null;

  @Column("integer", {
    name: "pelayaran_perintis_lanjutan",
    nullable: true,
    default: () => "0",
  })
  pelayaranPerintisLanjutan: number | null;

  @Column("integer", {
    name: "pelayaran_antar_pulau_lanjutan",
    nullable: true,
    default: () => "0",
  })
  pelayaranAntarPulauLanjutan: number | null;

  @Column("integer", {
    name: "keperluan_mendesak_lanjutan",
    nullable: true,
    default: () => "0",
  })
  keperluanMendesakLanjutan: number | null;

  @Column("integer", {
    name: "roda_dua_turun",
    nullable: true,
    default: () => "0",
  })
  rodaDuaTurun: number | null;

  @Column("integer", {
    name: "roda_empat_turun",
    nullable: true,
    default: () => "0",
  })
  rodaEmpatTurun: number | null;

  @Column("integer", { name: "bus_turun", nullable: true, default: () => "0" })
  busTurun: number | null;

  @Column("integer", { name: "truk_turun", nullable: true, default: () => "0" })
  trukTurun: number | null;

  @Column("integer", {
    name: "jml_barang_turun",
    nullable: true,
    default: () => "0",
  })
  jmlBarangTurun: number | null;

  @Column("character varying", {
    name: "satuan_barang_turun",
    nullable: true,
    length: 50,
  })
  satuanBarangTurun: string | null;

  @Column("integer", {
    name: "roda_dua_naik",
    nullable: true,
    default: () => "0",
  })
  rodaDuaNaik: number | null;

  @Column("integer", {
    name: "roda_empat_naik",
    nullable: true,
    default: () => "0",
  })
  rodaEmpatNaik: number | null;

  @Column("integer", { name: "bus_naik", nullable: true, default: () => "0" })
  busNaik: number | null;

  @Column("integer", { name: "truk_naik", nullable: true, default: () => "0" })
  trukNaik: number | null;

  @Column("integer", {
    name: "jml_barang_naik",
    nullable: true,
    default: () => "0",
  })
  jmlBarangNaik: number | null;

  @Column("character varying", {
    name: "satuan_barang_naik",
    nullable: true,
    length: 50,
  })
  satuanBarangNaik: string | null;

  @Column("integer", {
    name: "general_cargo_turun",
    nullable: true,
    default: () => "0",
  })
  generalCargoTurun: number | null;

  @Column("integer", { name: "curah_cair", nullable: true, default: () => "0" })
  curahCair: number | null;

  @Column("integer", {
    name: "curah_kering",
    nullable: true,
    default: () => "0",
  })
  curahKering: number | null;

  @Column("integer", {
    name: "container_turun",
    nullable: true,
    default: () => "0",
  })
  containerTurun: number | null;

  @Column("integer", {
    name: "general_cargo_naik",
    nullable: true,
    default: () => "0",
  })
  generalCargoNaik: number | null;

  @Column("integer", { name: "curah_naik", nullable: true, default: () => "0" })
  curahNaik: number | null;

  @Column("integer", {
    name: "curah_kering_naik",
    nullable: true,
    default: () => "0",
  })
  curahKeringNaik: number | null;

  @Column("integer", {
    name: "container_naik",
    nullable: true,
    default: () => "0",
  })
  containerNaik: number | null;

  @Column("integer", {
    name: "pasien_turun",
    nullable: true,
    default: () => "0",
  })
  pasienTurun: number | null;

  @Column("integer", {
    name: "keluarga_turun",
    nullable: true,
    default: () => "0",
  })
  keluargaTurun: number | null;

  @Column("integer", {
    name: "orang_khusus_turun",
    nullable: true,
    default: () => "0",
  })
  orangKhususTurun: number | null;

  @Column("integer", {
    name: "lembaga_turun",
    nullable: true,
    default: () => "0",
  })
  lembagaTurun: number | null;

  @Column("integer", {
    name: "pasien_naik",
    nullable: true,
    default: () => "0",
  })
  pasienNaik: number | null;

  @Column("integer", {
    name: "keluarga_naik",
    nullable: true,
    default: () => "0",
  })
  keluargaNaik: number | null;

  @Column("integer", {
    name: "orang_khusus_naik",
    nullable: true,
    default: () => "0",
  })
  orangKhususNaik: number | null;

  @Column("integer", {
    name: "lembaga_naik",
    nullable: true,
    default: () => "0",
  })
  lembagaNaik: number | null;

  @Column("smallint", {
    name: "is_berangkat",
    nullable: true,
    default: () => "'0'",
  })
  isBerangkat: number | null;

  @Column("smallint", {
    name: "is_nihil",
    nullable: true,
    default: () => "'0'",
  })
  isNihil: number | null;

  @Column("character varying", {
    name: "keterangan_nihil",
    nullable: true,
    length: 500,
  })
  keteranganNihil: string | null;

  @Column("character varying", {
    name: "created_id_turun",
    nullable: true,
    length: 50,
  })
  createdIdTurun: string | null;

  @Column("timestamp without time zone", {
    name: "created_date_turun",
    nullable: true,
  })
  createdDateTurun: Date | null;

  @Column("character varying", {
    name: "update_id",
    nullable: true,
    length: 50,
  })
  updateId: string | null;

  @Column("timestamp without time zone", {
    name: "update_date",
    nullable: true,
  })
  updateDate: Date | null;

  @Column("character varying", {
    name: "created_id_naik",
    nullable: true,
    length: 50,
  })
  createdIdNaik: string | null;

  @Column("timestamp without time zone", {
    name: "created_date_naik",
    nullable: true,
  })
  createdDateNaik: Date | null;

  @Column("smallint", {
    name: "is_delete",
    nullable: true,
    default: () => "'0'",
  })
  isDelete: number | null;

  @Column("character varying", {
    name: "sumber",
    nullable: true,
    length: 50,
    default: () => "'STRATEGI'",
  })
  sumber: string | null;

  @OneToOne(() => MstPelabuhan, { nullable: true })
  @JoinColumn({ name: "id_pelabuhan" })
  pelabuhan: MstPelabuhan;

  @OneToOne(() => MstPelabuhan, { nullable: true })
  @JoinColumn({ name: "id_plbh_asal" })
  pelabuhanAsal: MstPelabuhan;

  @OneToOne(() => MstPelabuhan, { nullable: true })
  @JoinColumn({ name: "id_plbh_tujuan" })
  pelabuhanTujuan: MstPelabuhan;

  @OneToOne(() => MstKapal, { nullable: true, eager: true })
  @JoinColumn({ name: "id_kapal" })
  kapal: MstKapal;
}
