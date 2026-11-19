import ExcelJS from "exceljs";
import { getDataSaranaLaut } from "./laut.service";

interface GetLautParams {
  pelabuhanId?: number | null;
  pelabuhanAsalId?: number | null;
  pelabuhanTujuanId?: number | null;
  provinsi?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  kapalId?: string | null;
  dateType?: "tanggal-datang" | "tanggal-berangkat" | "tanggal-input";
  search?: string | null;
  page?: number;
  limit?: number;
  filterBySimpul: string;
  isNihil?: boolean;
  jenis?: string;
}

export const exportReportLaut = async (
  params: GetLautParams,
  userId: string
) => {
  try {
    const data = await getDataSaranaLaut(params, userId);

    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet("data produksi laut");

    sheet.mergeCells("A1:A2");
    sheet.getCell("A1").value = "No";

    sheet.mergeCells("B1:B2");
    sheet.getCell("B1").value = "Tanggal Input";

    sheet.mergeCells("C1:C2");
    sheet.getCell("C1").value = "pelabuhan";

    sheet.mergeCells("D1:D2");
    sheet.getCell("D1").value = "Kapal";

    sheet.mergeCells("E1:E2");
    sheet.getCell("E1").value = "No. PKK";

    sheet.mergeCells("F1:F2");
    sheet.getCell("F1").value = "No. SPB";

    sheet.mergeCells("G1:G2");
    sheet.getCell("G1").value = "Jenis Kapal";

    sheet.mergeCells("H1:H2");
    sheet.getCell("H1").value = "Gross Tonnage";

    sheet.mergeCells("I1:I2");
    sheet.getCell("I1").value = "Kapasitas";

    sheet.mergeCells("J1:J2");
    sheet.getCell("J1").value = "Pelabuhan Asal";

    sheet.mergeCells("K1:L1");
    sheet.getCell("K1").value = "Tiba";
    sheet.getCell("K2").value = "Tanggal";
    sheet.getCell("L2").value = "Jam";

    sheet.mergeCells("M1:N1");
    sheet.getCell("M1").value = "Berangkat";
    sheet.getCell("M2").value = "Tanggal";
    sheet.getCell("N2").value = "Jam";

    sheet.mergeCells("O1:O2");
    sheet.getCell("O1").value = "Pelabuhan tujuan";

    sheet.mergeCells("P1:T1");
    sheet.getCell("P1").value = "Kendaraan Tiba";
    sheet.getCell("P2").value = "Roda Dua";
    sheet.getCell("Q2").value = "Roda Empat";
    sheet.getCell("R2").value = "Bus";
    sheet.getCell("S2").value = "Truk";
    sheet.getCell("T2").value = "Barang";

    sheet.mergeCells("U1:Y1");
    sheet.getCell("U1").value = "Kendaraan Berangkat";
    sheet.getCell("U2").value = "Roda Dua";
    sheet.getCell("V2").value = "Roda Empat";
    sheet.getCell("W2").value = "Bus";
    sheet.getCell("X2").value = "Truk";
    sheet.getCell("Y2").value = "Barang";

    sheet.mergeCells("Z1:AB1");
    sheet.getCell("Z1").value = "Penumpang";
    sheet.getCell("Z2").value = "Turun";
    sheet.getCell("AA2").value = "Naik";
    sheet.getCell("AB2").value = "Lanjut";

    sheet.mergeCells("AC1:AC2");
    sheet.getCell("AC1").value = "Pass Factor";

    sheet.mergeCells("AD1:AG1");
    sheet.getCell("AD1").value = "barang Bongkar (Ton)";
    sheet.getCell("AD2").value = "Cargo";
    sheet.getCell("AE2").value = "Curah Kering";
    sheet.getCell("AF2").value = "Curah Cair";
    sheet.getCell("AG2").value = "Container";

    sheet.mergeCells("AH1:AK1");
    sheet.getCell("AH1").value = "barang Muat (Ton)";
    sheet.getCell("AH2").value = "Cargo";
    sheet.getCell("AI2").value = "Curah Kering";
    sheet.getCell("AJ2").value = "Curah Cair";
    sheet.getCell("AK2").value = "Container";

    sheet.mergeCells("AL1:AL2");
    sheet.getCell("AL1").value = "Sumber Data";

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

    data.data.forEach((item: any, index: number) => {
      sheet.addRow([
        index + 1,
        item.tglDatang,
        item.pelabuhan?.namaPelabuhan,
        item.kapal?.namaKapal,
        item.kapal?.idJenisKapal,
        item.grossTonage,
        item.kapasitas,
        item.pelabuhanAsal?.namaPelabuhan,
        item.tglDatang,
        item.jamDatang,
        item.tglBerangkat,
        item.jamBerangkat,
        item.pelabuhanTujuan?.namaPelabuhan,
        item.rodaDuaTurun,
        item.rodaEmpatTurun,
        item.busTurun,
        item.trukTurun,
        item.jmlBarangTurun,
        item.rodaDuaNaik,
        item.rodaEmpatNaik,
        item.busNaik,
        item.trukNaik,
        item.jmlBarangNaik,
        item.jmlPnpTurun,
        item.jmlPnpBerangkat,
        item.jmlPnpLanjutan,
        item.passFactor,
        item.generalCargoTurun,
        item.curahKering,
        item.curahCair,
        item.containerTurun,
        item.generalCargoNaik,
        item.curahKeringNaik,
        item.curahNaik,
        item.containerNaik,
        item.sumber,
      ]);
      rowNumber++;
    });

    return workbook;
  } catch (err) {
    console.error("error exporting report:", err);
    throw new Error("gagal mengunduh laporan laut");
  }
};
