import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableLaporanPantau1742551522325
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.laporan_pantau ADD created_by VARCHAR(255) NULL;
            ALTER TABLE public.laporan_pantau ADD updated_by VARCHAR(255) NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
