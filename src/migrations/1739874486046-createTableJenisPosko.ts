import { MstJenisPosko } from "@/entities/MstJenisPosko";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableJenisPosko1739874486046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE public.mst_jenis_posko (
            id SERIAL NOT NULL,
            jenis_posko varchar(255) NULL,
            status boolean DEFAULT FALSE NOT NULL,
            CONSTRAINT mst_jenis_posko_pkey PRIMARY KEY (id)
        );`);

    await queryRunner.manager.save(
      queryRunner.manager.create(MstJenisPosko, [
        {
          jenisPosko: "Mobilitas Penumpang",
          status: true,
        },
        {
          jenisPosko: "Mobilitas Barang",
          status: true,
        },
        {
          jenisPosko: "Mobilitas Sarana Angkutan",
          status: true,
        },
        {
          jenisPosko: "Kelancaran Transportasi pada Jaringan",
          status: true,
        },
        {
          jenisPosko: "Kecelakaan Transportasi",
          status: true,
        },
        {
          jenisPosko: "Kejadian Menonjol",
          status: true,
        },
        {
          jenisPosko: "Cuaca dan Peringatan Dini",
          status: true,
        },
        {
          jenisPosko: "Bencana",
          status: true,
        },
        {
          jenisPosko: "Ramp Check",
          status: true,
        },
      ])
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS public.mst_jenis_posko;`);
  }
}
