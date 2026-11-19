import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePosko1739874537089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE public.posko (
        id SERIAL NOT NULL,
        id_jenis_posko INT4,
        id_event uuid,
        nama_posko VARCHAR(255) NOT NULL,
        alamat_posko TEXT NULL,
        unit_kerja_koordinator VARCHAR(255) NULL,
        id_peserta_posko INT4,
        koordinat_posko POINT NULL,
        ketua_posko VARCHAR(255) NULL,
        no_telp_ketua_posko VARCHAR(20) NULL,
        pic_posko VARCHAR(255) NULL,
        no_telp_posko VARCHAR(20) NULL,
        masa_pantau_awal DATE NULL,
        masa_pantau_akhir DATE NULL,
        titik_pantau TEXT NULL,
        fokus_pantau _TEXT NULL,
        lampiran TEXT NULL,
        create_date timestamptz DEFAULT now() NULL,
        update_date timestamptz NULL,
        CONSTRAINT posko_pkey PRIMARY KEY (id)    
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS public.posko;`);
  }
}
