import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableThirtySecondsVideo1740410408176
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE public.thirty_seconds_video (
            id SERIAL NOT NULL,
            id_cctv VARCHAR(255) NULL,
            nama_lokasi TEXT NULL,
            nama_cctv TEXT NULL,
            stream_url TEXT NULL,
            status VARCHAR(255) NULL,
            create_date timestamptz DEFAULT now() NULL,
            update_date timestamptz NULL,
            CONSTRAINT thirty_seconds_video_pkey PRIMARY KEY (id)    
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE IF EXISTS public.thirty_seconds_video;`
    );
  }
}
