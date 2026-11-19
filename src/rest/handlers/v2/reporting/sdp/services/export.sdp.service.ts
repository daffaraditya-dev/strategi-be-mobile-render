import { getDataSaranaSdp } from "./sdp.service";
import ExcelJS from "exceljs";

interface GetSdpParams {
  pelabuhanAsalId?: number | null;
  pelabuhanId?: number | null;
  provinsi?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  search?: string | null;
  page?: number;
  limit?: number;
  jenis?: string;
  filterBySimpul: string;
  isNihil?: string;
  filterByApproval: string;
}

export const exportReportSdp = async (params: GetSdpParams, userId: string) => {
  try {
    const data = await getDataSaranaSdp(params, userId);

    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet("data produksi SDP");
    // sheet.getColumn("A").width = 3;
    // sheet.getColumn("B").width = 20;
    // sheet.getColumn("C").width = 20;
    // sheet.getColumn("D").width = 20;
    // sheet.getColumn("E").width = 20;
    // sheet.getColumn("F").width = 40;
    // sheet.getColumn("G").width = 20;
    // sheet.getColumn("H").width = 30;
    // sheet.getColumn("I").width = 25;
    // sheet.getColumn("J").width = 25;
    // sheet.getColumn("K").width = 20;
    // sheet.getColumn("L").width = 15;
    // sheet.getColumn("M").width = 30;
    // sheet.getColumn("N").width = 30;
    // sheet.getColumn("O").width = 30;
    // sheet.getColumn("P").width = 30;
    // sheet.getColumn("V").width = 30;

    sheet.getCell("A1").value = "No";

    sheet.getCell("B1").value = "Tanggal Berangkat";
    sheet.getCell("C1").value = "Jam Berangkat";
    sheet.getCell("D1").value = "Tanggal Datang";
    sheet.getCell("E1").value = "Jam Datang";

    sheet.getCell("F1").value = "Nama Pelabuhan";

    sheet.getCell("G1").value = "Nama Kapal";

    sheet.getCell("H1").value = "Nama Perusahaan";

    sheet.getCell("I1").value = "Lintasan awal";

    sheet.getCell("J1").value = "Lintasan Akhir";

    sheet.getCell("K1").value = "Jenis Kapal";

    sheet.getCell("L1").value = "Ukuran Kapal";

    sheet.getCell("M1").value = "Jumlah Penumpang Dewasa";

    sheet.getCell("N1").value = "Jumlah Penumpang Anak";

    sheet.getCell("O1").value = "Jumlah Total Penumpang";

    sheet.getCell("P1").value = "Jumlah Golongan I";

    sheet.getCell("Q1").value = "Jumlah Penumpang Golongan I";

    sheet.getCell("R1").value = "Jumlah Golongan II";

    sheet.getCell("S1").value = "Jumlah PenumpangGolongan II";

    sheet.getCell("T1").value = "Jumlah Golongan III";

    sheet.getCell("U1").value = "Jumlah Penumpang Golongan III";

    sheet.getCell("V1").value = "Jumlah Golongan IV A";

    sheet.getCell("W1").value = "Jumlah Penumpang Golongan IV A";

    sheet.getCell("X1").value = "Jumlah Golongan IV B";

    sheet.getCell("Y1").value = "Jumlah Penumpang Golongan IV B";

    sheet.getCell("Z1").value = "Jumlah Golongan V A";

    sheet.getCell("AA1").value = "Jumlah Penumpang Golongan V A";

    sheet.getCell("AB1").value = "Jumlah Golongan V B";

    sheet.getCell("AC1").value = "Jumlah Penumpang Golongan V B";

    sheet.getCell("AD1").value = "Jumlah Golongan VI A";

    sheet.getCell("AE1").value = "Jumlah Penumpang Golongan VI A";

    sheet.getCell("AF1").value = "Jumlah Golongan VI B";

    sheet.getCell("AG1").value = "Jumlah Penumpang Golongan VI B";

    sheet.getCell("AH1").value = "Jumlah Golongan VII";

    sheet.getCell("AI1").value = "Jumlah Penumpang Golongan VII";

    sheet.getCell("AJ1").value = "Jumlah Golongan VIII";

    sheet.getCell("AK1").value = "Jumlah Penumpang Golongan VIII";

    sheet.getCell("AL1").value = "Jumlah Golongan IX";

    sheet.getCell("AM1").value = "Jumlah Penumpang Golongan IX";

    sheet.getCell("AN1").value = "Jumlah Total Kendaraan";

    sheet.getCell("AO1").value = "Jumlah Total Penumpang Kendaraan";

    sheet.getCell("AP1").value = "Total Penumpang Keseluruhan";

    sheet.getCell("AQ1").value = "Jumlah Lembaga";

    sheet.getCell("AR1").value = "Jumlah Pasien";

    sheet.getCell("AS1").value = "Jumlah Keluarga";

    sheet.getCell("AT1").value = "Jumlah Orang Khusus";

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

    let rowNumber = 2;

    data.data.forEach((item, index) => {
      sheet.addRow([
        index + 1,
        item.tglBerangkat,
        item.jamBerangkat,
        item.tglDatang,
        item.jamDatang,
        item.pelabuhan?.namaPelabuhan,
        item.trayek?.kapal?.namaKapal,
        item.trayek?.kapal?.perusahaan?.namaPerusahaan,
        item.trayek?.pelabuhanAsal.namaPelabuhan,
        item.trayek?.pelabuhanTujuan.namaPelabuhan,
        item.trayek?.kapal?.idJenisKapal,
        item.trayek?.kapal?.grt,
        item.jmlPnpDewasa,
        item.jmlPnpAnak,
        item.jmlTotalPnp,
        item.goli,
        item.pnpgoli,
        item.golii,
        item.pnpgolii,
        item.goliii,
        item.pnpgoliii,
        item.goliva,
        item.pnpgoliva,
        item.golivb,
        item.pnpgolivb,
        item.golva,
        item.pnpgolva,
        item.golvb,
        item.pnpgolvb,
        item.golvia,
        item.pnpgolvia,
        item.golvib,
        item.pnpgolvib,
        item.golvii,
        item.pnpgolvii,
        item.golviii,
        item.pnpgolviii,
        item.golix,
        item.pnpgolix,
        item.jmlKendaraan,
        item.jmlPnpKendaraan,
        item.totalPenumpang,
        item.lembaga,
        item.pasien,
        item.orangKhusus,
      ]);

      rowNumber++;
    });

    return workbook;
  } catch (err) {
    console.error("error exporting report:", err);
    throw new Error("gagal mengunduh laporan sdp");
  }
};
