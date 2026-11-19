import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTablePosko1742446507822 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.posko ADD lokasi_posko TEXT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
