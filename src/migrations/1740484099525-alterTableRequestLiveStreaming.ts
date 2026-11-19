import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableRequestLiveStreaming1740484099525
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.request_livestreaming ADD tipe_media varchar(10) NULL;
        COMMENT ON COLUMN public.request_livestreaming.tipe_media IS 'value is "drone" or "seluler"';
        ALTER TABLE public.request_livestreaming ADD tipe_jalan varchar(100) NULL;
        ALTER TABLE public.request_livestreaming ADD matra varchar(100) NULL;
        ALTER TABLE public.request_livestreaming ADD kontributor varchar(100) NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
