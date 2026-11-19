import { AppDataSource } from "@/data-source";
import { LaporanPantau } from "@/entities/LaporanPantau";
import { LaporanPantauCuaca } from "@/entities/LaporanPantauCuaca";
import { LaporanPantauKecelakaan } from "@/entities/LaporanPantauKecelakaan";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";

export const deleteReportHandler = async (req: Request, res: Response) => {
  try {
    // Validate the ID parameter
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json(createErrorResponse("Invalid ID format", 400));
    }

    // Start a transaction to ensure data consistency
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Get the repositories
      const laporanPantauRepository =
        queryRunner.manager.getRepository(LaporanPantau);
      const cuacaRepository =
        queryRunner.manager.getRepository(LaporanPantauCuaca);
      const kecelakaanRepository = queryRunner.manager.getRepository(
        LaporanPantauKecelakaan
      );

      // Find the report
      const report = await laporanPantauRepository.findOne({ where: { id } });

      // Check if the report exists
      if (!report) {
        await queryRunner.rollbackTransaction();
        return res
          .status(404)
          .json(createErrorResponse("Report not found", 404));
      }

      // Delete related cuaca records
      await cuacaRepository.delete({ idLaporanPantau: id });

      // Delete related kecelakaan records
      await kecelakaanRepository.delete({ idLaporanPantau: id });

      // Delete the report
      await laporanPantauRepository.delete(id);

      // Commit the transaction
      await queryRunner.commitTransaction();

      // Return success response
      return res.status(200).json({
        success: true,
        message: "Report and related records deleted successfully",
      });
    } catch (err) {
      // Rollback the transaction in case of error
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  } catch (err) {
    console.error("Error deleting report:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to delete report", 500));
  }
};
