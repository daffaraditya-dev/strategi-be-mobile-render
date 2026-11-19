import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableRefreshTokenEntity1740752282187
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.refresh_token_entity ADD is_mobile_app bool DEFAULT false NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
