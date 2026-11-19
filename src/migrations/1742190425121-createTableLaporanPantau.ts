import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableLaporanPantau1742190425121
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "laporan_pantau" (
                "id" SERIAL PRIMARY KEY,
                "type" VARCHAR(255) NOT NULL,
                "matra" VARCHAR(255),
                "event" VARCHAR(255),
                "nama" VARCHAR(255),
                "personil" VARCHAR(255),
                "pengikut" TEXT,
                "tanggal" DATE,
                "provinsi" VARCHAR(255),
                "kabupaten" VARCHAR(255),
                "angkutan" VARCHAR(255),
                "unit_pelayanan" VARCHAR(255),
                "deskripsi" TEXT,
                "is_kejadian_menonjol" BOOLEAN DEFAULT false,
                "kejadian_menonjol" TEXT,
                "koordinat_kejadian_menonjol" VARCHAR(255),
                "is_kecelakaan" BOOLEAN DEFAULT false,
                "kecelakaan" TEXT,
                "koordinat_kecelakaan" VARCHAR(255),
                "lokasi_kecelakaan" TEXT,
                "pembuat" VARCHAR(255),
                "persetujuan" VARCHAR(255),
                "posko_terpadu" VARCHAR(255),
                "file" VARCHAR(255),
                "photo" VARCHAR(255),
                "caption_photo" VARCHAR(255),
                is_approved boolean DEFAULT FALSE,
                approved_by uuid NULL,
                approved_date timestamptz NULL,
                approved_notes text NULL,
                rejected_by uuid NULL,
                rejected_date timestamptz NULL,
                rejected_reason text NULL,
                rejected_additional_comments text NULL,
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Create indexes for common query patterns
            CREATE INDEX "idx_laporan_pantau_event" ON "laporan_pantau" ("event");
            CREATE INDEX "idx_laporan_pantau_posko_terpadu" ON "laporan_pantau" ("posko_terpadu");
            CREATE INDEX "idx_laporan_pantau_tanggal" ON "laporan_pantau" ("tanggal");
            CREATE INDEX "idx_laporan_pantau_is_kejadian_menonjol" ON "laporan_pantau" ("is_kejadian_menonjol");
            CREATE INDEX "idx_laporan_pantau_is_kecelakaan" ON "laporan_pantau" ("is_kecelakaan");
        `);

    await queryRunner.query(`
            CREATE TABLE "laporan_pantau_kecelakaan" (
                "id" SERIAL PRIMARY KEY,
                "id_laporan_pantau" INTEGER NOT NULL,
                "matra" VARCHAR(255),
                "tanggal_waktu_kejadian" TIMESTAMP,
                "jenis_kecelakaan" VARCHAR(255),
                "uraian" TEXT,
                "korban_jiwa" INTEGER DEFAULT 0,
                "luka_berat" INTEGER DEFAULT 0,
                "luka_ringan" INTEGER DEFAULT 0,
                "hilang" INTEGER DEFAULT 0,
                "selamat" INTEGER DEFAULT 0,
                "dampak_lingkungan_jenis" VARCHAR(255),
                "dampak_lingkungan_uraian" TEXT,
                "dampak_lalu_lintas_jenis" VARCHAR(255),
                "dampak_lalu_lintas_uraian" TEXT,
                "status_penanggulangan_jenis" VARCHAR(255),
                "status_penanggulangan_uraian" TEXT,
                "lokasi" VARCHAR(255),
                "koordinat" VARCHAR(255),
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE INDEX "idx_laporan_pantau_kecelakaan_id_laporan_pantau" ON "laporan_pantau_kecelakaan" ("id_laporan_pantau");
        `);

    await queryRunner.query(`
            CREATE TABLE "laporan_pantau_cuaca" (
                "id" SERIAL PRIMARY KEY,
                "id_laporan_pantau" INTEGER NOT NULL,
                "kondisi_cuaca" VARCHAR(255),
                "jarak_pandang" FLOAT,
                "arah_angin_dari" VARCHAR(255),
                "arah_angin_ke" VARCHAR(255),
                "kecepatan_angin" FLOAT,
                "tinggi_gelombang" FLOAT,
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE INDEX "idx_laporan_pantau_cuaca_id_laporan_pantau" ON "laporan_pantau_cuaca" ("id_laporan_pantau");
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP INDEX IF EXISTS "idx_laporan_pantau_event";
        DROP INDEX IF EXISTS "idx_laporan_pantau_posko_terpadu";
        DROP INDEX IF EXISTS "idx_laporan_pantau_tanggal";
        DROP INDEX IF EXISTS "idx_laporan_pantau_is_kejadian_menonjol";
        DROP INDEX IF EXISTS "idx_laporan_pantau_is_kecelakaan";
        DROP TABLE IF EXISTS "laporan_pantau";
    `);

    await queryRunner.query(`
        DROP INDEX IF EXISTS "idx_laporan_pantau_kecelakaan_id_laporan_pantau";
        DROP TABLE IF EXISTS "laporan_pantau_kecelakaan";
    `);

    await queryRunner.query(`
        DROP INDEX IF EXISTS "idx_laporan_pantau_cuaca_id_laporan_pantau";
        DROP TABLE IF EXISTS "laporan_pantau_cuaca";
    `);
  }
}
