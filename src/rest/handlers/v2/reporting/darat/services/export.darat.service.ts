import { TreeRepository } from "typeorm";
import { getDataSaranaBus } from "./darat.service";
import ExcelJS from "exceljs";

interface GetBusParams {
  terminalAsalId?: number | null;
  terminalTujuanId?: number | null;
  id_terminal?: string | null;
  provinsi?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  search?: string | null;
  page?: number;
  limit?: number;
  jenis?: string | null;
  filterBySimpul: string;
  filterByApproval: string;
  isNihil?: boolean;
}

export const exportReportDarat = async (
  params: GetBusParams,
  userId: string
) => {
  try {
    const data = await getDataSaranaBus(params, userId);

    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet("data produksi jalan");
    // sheet.getColumn("A").width = 3;
    // sheet.getColumn("B").width = 10;
    // sheet.getColumn("C").width = 5;
    // sheet.getColumn("D").width = 20;
    // sheet.getColumn("E").width = 15;
    // sheet.getColumn("F").width = 45;
    // sheet.getColumn("G").width = 20;
    // sheet.getColumn("H").width = 20;
    // sheet.getColumn("I").width = 30;
    // sheet.getColumn("J").width = 25;
    // sheet.getColumn("K").width = 30;
    // sheet.getColumn("L").width = 15;
    // sheet.getColumn("M").width = 15;
    // sheet.getColumn("N").width = 15;
    // sheet.getColumn("O").width = 15;

    sheet.mergeCells("A1:A2");
    sheet.getCell("A1").value = "No";

    sheet.mergeCells("B1:C1");
    sheet.getCell("B1").value = "Keberangkatan";
    sheet.getCell("B2").value = "Tanggal";
    sheet.getCell("C2").value = "Jam";

    sheet.mergeCells("D1:D2");
    sheet.getCell("D1").value = "Jenis";

    sheet.mergeCells("E1:E2");
    sheet.getCell("E1").value = "Nomor Polisi";

    sheet.mergeCells("F1:F2");
    sheet.getCell("F1").value = "Nama PO";

    sheet.mergeCells("G1:G2");
    sheet.getCell("G1").value = "Jenis Bus";

    sheet.mergeCells("H1:H2");
    sheet.getCell("H1").value = "Terminal Asal";

    sheet.mergeCells("I1:I2");
    sheet.getCell("I1").value = "Terminal Tujuan";

    sheet.mergeCells("J1:J2");
    sheet.getCell("J1").value = "Jumlah Penumpang Naik";

    sheet.mergeCells("K1:K2");
    sheet.getCell("K1").value = "Jumlah Penumpang Berangkat";

    sheet.mergeCells("L1:L2");
    sheet.getCell("L1").value = "Jumlah Lembaga";

    sheet.mergeCells("M1:M2");
    sheet.getCell("M1").value = "Jumlah Pasien";

    sheet.mergeCells("N1:N2");
    sheet.getCell("N1").value = "Jumlah Keluarga";

    sheet.mergeCells("O1:O2");
    sheet.getCell("O1").value = "Jumlah Orang Khusus";

    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1 || rowNumber === 2) {
        row.eachCell((cell) => {
          cell.alignment = { horizontal: "center", vertical: "middle" };
        });
      }
    });

    sheet.columns.forEach((column) => {
      if (!column || typeof column.eachCell !== "function") return;
      let maxLength = 0;

      column.eachCell({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value ?? "";
        const columnLength =
          typeof cellValue === "string"
            ? cellValue.length
            : String(cellValue).length;
        if (columnLength > maxLength) maxLength = columnLength;
      });

      if (maxLength > 0) column.width = maxLength + 2;
    });

    let rowNumber = 3;

    data.data.forEach((item, index) => {
      sheet.addRow([
        index + 1,
        item.tglData,
        item.jamData,
        item.jenis,
        item.noPol,
        item.namaPo,
        item.jenisBus,
        item.terminalAsal?.namaTerminal,
        item.terminalTujuan?.namaTerminal,
        item.jmlPenumpangNaik,
        item.jmlPenumpangTurun,
        item.lembaga,
        item.pasien,
        item.keluarga,
        item.orangKhusus,
      ]);

      rowNumber++;
    });

    return workbook;
  } catch (err) {
    console.error("error exporting report:", err);
    throw new Error("gagal mengunduh laporan darat");
  }
};
