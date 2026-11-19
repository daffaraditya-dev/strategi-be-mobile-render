import { SailingDomesticInternationalTransportData } from "@/services/type/backendApiHubnet";
import { SummaryDataRecord } from "../handlers/summary/type/common";

export const mapSailingDomesticInternational = (
  data: SailingDomesticInternationalTransportData[]
): SummaryDataRecord => {
  return data.reduce<SummaryDataRecord>(
    (acc, item) => {
      switch (item.kategori) {
        case "Domestik":
          acc.domestic = Number(item.sum);
          break;
        case "Int - Inbound":
          acc.inbound = Number(item.sum);
          break;
        case "Int - Outbound":
          acc.outbound = Number(item.sum);
          break;
      }
      return acc;
    },
    { domestic: 0, inbound: 0, outbound: 0 }
  );
};
