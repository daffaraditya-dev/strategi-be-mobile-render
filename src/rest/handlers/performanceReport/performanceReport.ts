import { MODA } from "@/constants/moda";
import { getPerformanceReport } from "@/services/backendApiHubnet";
import { Request, Response } from "express";
import Joi from "joi";
import { PerformanceReportResponse } from "./type/performanceReport";
import { capitalizeWords } from "@/utils/text";
import { PerformanceReportData } from "@/services/type/backendApiHubnet";

const performanceReportRequest = Joi.object({
  tahun: Joi.string().optional().default(new Date().getFullYear()),
  moda: Joi.string().optional().default(MODA.JALAN),
});

export const performanceReportHandler = async (req: Request, res: Response) => {
  const { error, value } = performanceReportRequest.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { tahun, moda } = value;

    const result = await getPerformanceReport(
      {
        tanggal_awal: `${tahun}-01-01`,
        tanggal_akhir: `${tahun}-12-31`,
      },
      moda
    );

    const response: PerformanceReportResponse = {
      status: true,
      data: result.data.map((item: PerformanceReportData) => {
        const pengelolaResult = mapPengelola(moda, item.pengelola);
        return {
          pengelola: pengelolaResult,
          jumlahSimpul: item.jumlah_simpul || 0,
          jumlahPantau: item.jumlah_pantau || 0,
          simpulMelapor: item.simpul_melapor || 0,
          laporanMasuk: item.laporan_masuk || 0,
          targetLaporan: item.target_laporan || 0,
          persentase: `${
            item.persentase ? parseFloat(item.persentase).toFixed(2) : 0
          }%`,
        };
      }),
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
const mapPengelola = (moda: string, name: string): string => {
  switch (moda) {
    case MODA.UDARA:
      return `Bandara ${name.toUpperCase()}`;
    case MODA.STASIUN:
      return capitalizeWords(name == "antarkota" ? "antar kota" : name);
    case MODA.LAUT:
      return `Pelabuhan ${name.toUpperCase()}`;
    case MODA.ASDP:
      return ((): string => {
        switch (name) {
          case "asdp":
            return "PT ASDP";
          case "bup_lain":
            return "BUP Lain";
          default:
            return name.toUpperCase();
        }
      })();
    default:
      // defaullt MODA.JALAN
      return `Terminal ${capitalizeWords(name)}`;
  }
};
