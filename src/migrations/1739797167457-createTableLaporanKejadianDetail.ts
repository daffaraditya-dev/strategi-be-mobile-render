import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableLaporanKejadianDetail1739797167457
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE public.laporan_kejadian_detail (
        id uuid NOT NULL,
        id_laporan_kejadian uuid NOT NULL,
        pic_pelapor varchar(255) NULL,
        katim_penyedia_data varchar(255) NULL,
        kabid_pusdatin varchar(255) NULL,
        ketua_umum varchar(255) NULL,
        deskripsi_laporan text NULL,
        matra varchar(10) NOT NULL,
        jenis_kecelakaan varchar(50) NULL,
        sarana_terlibat _text NULL,
        korban_meninggal_dunia float8 NULL,
        korban_luka_berat float8 NULL,
        korban_luka_sedang float8 NULL,
        korban_luka_ringan float8 NULL,
        korban_hilang float8 NULL,
        korban_selamat float8 NULL,
        on_schene_commander varchar(255) NULL,
        kerusakan_fisik text NULL,
        dampak_lingkungan text NULL,
        dampak_lalu_lintas text NULL,
        status_penanggulangan varchar(50) NULL,
        laporan_final text NULL,
        is_approved boolean DEFAULT FALSE,
        approved_by uuid NULL,
        approved_date timestamptz NULL,
        approved_notes text NULL,
        rejected_by uuid NULL,
        rejected_date timestamptz NULL,
        rejected_reason text NULL,
        rejected_additional_comments text NULL,
        create_date timestamptz DEFAULT now() NULL,
        update_date timestamptz NULL,
        CONSTRAINT laporan_kejadian_detail_pkey PRIMARY KEY (id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE IF EXISTS public.laporan_kejadian_detail;`
    );
  }
}
