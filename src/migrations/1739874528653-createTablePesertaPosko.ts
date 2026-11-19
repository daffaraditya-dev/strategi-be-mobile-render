import { MstPesertaPosko } from "@/entities/MstPesertaPosko";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePesertaPosko1739874528653
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE public.mst_peserta_posko (
            id SERIAL NOT NULL,
            peserta_posko varchar(255) NULL,
            status boolean DEFAULT FALSE NOT NULL,
            CONSTRAINT mst_peserta_posko_pkey PRIMARY KEY (id)
        );`);

    await queryRunner.manager.save(
      queryRunner.manager.create(MstPesertaPosko, [
        {
          pesertaPosko: "UPT Kementerian Perhubungan",
          status: true,
        },
        {
          pesertaPosko: "Pemerintah Daerah",
          status: true,
        },
        {
          pesertaPosko: "Kepolisian",
          status: true,
        },
        {
          pesertaPosko: "TNI",
          status: true,
        },
        {
          pesertaPosko: "BASARNAS",
          status: true,
        },
        {
          pesertaPosko: "BMKG",
          status: true,
        },
        {
          pesertaPosko: "Jasa Raharja",
          status: true,
        },
        {
          pesertaPosko: "Operator Transportasi",
          status: true,
        },
        {
          pesertaPosko: "Kementerian / Lembaga Lainnya",
          status: true,
        },
        {
          pesertaPosko: "Asosiasi Radio Amatir",
          status: true,
        },
        {
          pesertaPosko: "Asosiasi Lainnya",
          status: true,
        },
        {
          pesertaPosko: "Posko Lainnya",
          status: true,
        },
        {
          pesertaPosko: "Operator Lainnya",
          status: true,
        },
        {
          pesertaPosko: "Badan Usaha Lainnya",
          status: true,
        },
      ])
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS public.mst_jenis_posko;`);
  }
}
