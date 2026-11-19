import { ResponseMovementDomesticInternational } from "@/services/type/backendApiHubnet";

type NormalizedKategori = "domestik" | "inbound" | "outbound";
type NormalizedJenis = "penumpang" | "kapal" | "pesawat";
type Moda = string;

type Result = {
  [moda in Moda]: {
    [jenis in NormalizedJenis]?: {
      [kategori in NormalizedKategori]?: number;
    };
  };
};

export const mapInboundOutboundDomestic = (
  data: ResponseMovementDomesticInternational
) => {
  const normalizeKategori = (kategori: string): NormalizedKategori => {
    const lower = kategori.toLowerCase();
    if (lower.includes("inbound")) return "inbound";
    if (lower.includes("outbound")) return "outbound";
    return "domestik";
  };

  const normalizeJenis = (jenis: string): NormalizedJenis => {
    if (jenis.includes("Penumpang")) return "penumpang";
    if (jenis.includes("Kapal")) return "kapal";
    if (jenis.includes("Pesawat")) return "pesawat";
    throw new Error(`Unknown jenis: ${jenis}`);
  };

  const result: Result = {};

  for (const item of data.data) {
    const moda = item.moda.toLowerCase();
    const jenis = normalizeJenis(item.jenis);
    const kategori = normalizeKategori(item.kategori);
    const value = Number(item.value);

    if (!result[moda]) {
      result[moda] = {};
    }
    if (!result[moda][jenis]) {
      result[moda][jenis] = {};
    }
    if (!result[moda][jenis]![kategori]) {
      result[moda][jenis]![kategori] = 0;
    }
    result[moda][jenis]![kategori]! += value;
  }

  return result;
};
