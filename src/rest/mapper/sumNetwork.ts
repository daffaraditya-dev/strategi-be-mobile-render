import {
  SaaranaTransportasi,
  SaaranaTransportasiNetwork,
} from "@/constants/keyData";
import { ResponseDataSiasatiStrategi } from "@/services/type/apiHubnet";
import { parseNumber } from "../../utils/number";

interface Summary {
  total: number;
  details: Record<string, number>;
}

interface TransportSummary {
  [mode: string]: Summary;
}

interface VehicleSummary {
  produksi: TransportSummary;
  pantau: TransportSummary;
}

interface DataResult {
  data_produksi?: {
    status?: boolean;
    data?: Record<string, any>;
  };
  data_pantau?: {
    status?: boolean;
    data?: Record<string, any>;
  };
}

function processProductionData(
  data: any,
  mode: string,
  config: any[]
): Summary {
  const summary: Summary = { total: 0, details: {} };

  if (!data?.[mode]) return summary;

  const modeData = data[mode] as Array<Record<string, string>>;

  for (const item of modeData) {
    for (const cfg of config) {
      const value = cfg.keyData.reduce(
        (sum: number, key: string) => sum + parseNumber(item[key]),
        0
      );

      summary.details[cfg.header] = (summary.details[cfg.header] || 0) + value;
      summary.total += value;
    }
  }

  return summary;
}

function initializeSummaries(modes: string[]): TransportSummary {
  const summaries: TransportSummary = {};
  for (const mode of modes) {
    summaries[mode] = { total: 0, details: {} };
  }
  return summaries;
}

function sumNetworkData(
  response: ResponseDataSiasatiStrategi,
  modes: string[]
): VehicleSummary {
  // Initialize summaries
  const summary: VehicleSummary = {
    produksi: initializeSummaries(modes),
    pantau: initializeSummaries(modes),
  };

  // Return empty summary if no data
  if (!response.data?.result) {
    return summary;
  }

  // Process production data
  for (const result of Object.values(response.data.result)) {
    const prodData = (result as DataResult).data_produksi;
    if (prodData?.data) {
      for (const mode of modes) {
        if (mode in SaaranaTransportasi) {
          const config =
            SaaranaTransportasi[mode as keyof typeof SaaranaTransportasi];
          if (config) {
            summary.produksi[mode] = processProductionData(
              prodData.data,
              mode,
              config
            );
          }
        }
      }
    }
  }

  // Process monitoring data
  for (const result of Object.values(response.data.result)) {
    const pantauData = (result as DataResult).data_pantau;
    if (pantauData?.data) {
      for (const mode of modes) {
        if (mode in SaaranaTransportasiNetwork) {
          const modeData = pantauData.data[mode] as Array<any>;
          if (modeData) {
            summary.pantau[mode].total = modeData.length;
          }
        }
      }
    }
  }

  return summary;
}

export { sumNetworkData };
