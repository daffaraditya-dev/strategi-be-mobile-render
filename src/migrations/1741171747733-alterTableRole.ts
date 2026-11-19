import { Role } from "@/entities/Role";
import { MigrationInterface, QueryRunner } from "typeorm";

const seedMenu = [
  "30_Seconds",
  "Arteri_Kecelakaan",
  "Arteri_Agregat",
  "Beranda_News",
  "Beranda_Mobilitas_Penumpang",
  "Beranda_Mobilitas_Sarana",
  "Beranda_Mobilitas_Jaringan",
  "Beranda_Penerbangan_Domestik_International",
  "Beranda_Pelayaran_Domestik_International",
  "CCTV",
  "Fokus",
  "Input_Fokus",
  "Laporan_Create_Posko_Terpadu",
  "Laporan_Create_Piket_Instruksi_Menteri",
  "Laporan_Create_Posko_Lapangan",
  "Laporan_Create_Posko_Mingguan",
  "Jalan_Agregat",
  "Jalan_Wilayah",
  "Jalan_Kecelakaan",
  "Jalan_Kejadian_Menonjol",
  "Jalan_Operator_List_Detail",
  "Jalan_Operator",
  "Jalan_OD",
  "Kinerja_Pelaporan_Laut",
  "Kinerja_Pelaporan_Udara",
  "Kinerja_Pelaporan_Perkeretaapian",
  "Kinerja_Pelaporan_Penyebrangan",
  "Kinerja_Pelaporan_Jalan",
  "Komparasi_Get",
  "Komparasi_Add",
  "Laporan_List",
  "Laporan_Detail_Mingguan",
  "Laporan_Detail_Posko_Lapangan",
  "Laporan_Edit",
  "Laporan_Approval_List",
  "Laporan_Approve_Laporan",
  "Laut_Kecelakaan",
  "Laut_Agregat",
  "Laut_Operator",
  "Laut_OD",
  "Liputan",
  "Login",
  "Pengaturan",
  "Pengaturan_Posko_List",
  "Pengaturan_Posko_Detail",
  "Pengaturan_Posko_Create",
  "Penyebrangan_Agregat",
  "Penyebrangan_Kecelakaan",
  "Penyebrangan_Operator",
  "Penyebrangan_OD",
  "Perkeretaapian_Agregat",
  "Perkeretaapian_Kecelakaan",
  "Perkeretaapian_Operator",
  "Perkeretaapian_OD",
  "Tol_Kecelakaan",
  "Tol_Agregat",
  "Tol_Operator",
  "Udara_Agregat",
  "Udara_Kecelakaan",
  "Udara_Operator",
  "Udara_OD",
];

export class AlterTableRole1741171747733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public."role" ADD akses_mobile _text NULL;
        `);

    const role = await queryRunner.manager.findOne(Role, {
      where: { name: "Superadmin" },
    });
    if (!role) {
      console.error("Role not found");
      return;
    }

    Object.assign(role, { aksesMobile: seedMenu });
    await queryRunner.manager.save(role);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
