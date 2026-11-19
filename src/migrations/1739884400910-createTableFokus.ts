import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableFokus1739884400910 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE public.fokus (
            id SERIAL NOT NULL,
            id_user uuid NOT NULL,
            judul TEXT NULL,
            simpul_transportasi JSONB NULL,
            cctv JSONB NULL,
            video_30s JSONB NULL,
            video_live_streaming JSONB NULL,
            is_default bool DEFAULT false NULL,
            create_date timestamptz DEFAULT now() NULL,
            update_date timestamptz NULL,
            CONSTRAINT fokus_pkey PRIMARY KEY (id)    
        );
        comment on column public.fokus.simpul_transportasi is '{matra: string, simpul: string}';
        comment on column public.fokus.cctv is '{matra: string, simpul: string, titik_cctv: string}';
        comment on column public.fokus.video_30s is '{judul: string, link: string}';
        comment on column public.fokus.video_live_streaming is '{judul: string, link: string}';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS public.fokus;`);
  }
}
