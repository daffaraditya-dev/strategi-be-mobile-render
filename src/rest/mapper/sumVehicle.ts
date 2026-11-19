import { SaaranaTransportasi } from "@/constants/keyData";
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
  produksiPertitik: TransportSummary;
}

interface ProductionData {
  status?: boolean;
  data?: Record<string, any>;
}

function initializeSummaries(modes: string[]): TransportSummary {
  const summaries: TransportSummary = {};
  for (const mode of modes) {
    summaries[mode] = { total: 0, details: {} };
  }
  return summaries;
}

function processMode(
  modeData: Array<Record<string, string>>,
  modeConfig: any[]
): Summary {
  const summary: Summary = { total: 0, details: {} };

  for (const item of modeData) {
    for (const config of modeConfig) {
      const value = config.keyData.reduce(
        (sum: number, key: string) => sum + parseNumber(item[key]),
        0
      );

      summary.details[config.header] =
        (summary.details[config.header] || 0) + value;
      summary.total += value;
    }
  }

  return summary;
}

function processData(
  responseData: any[],
  modes: (keyof typeof SaaranaTransportasi)[],
  dataKey: "data_produksi" | "data_produksi_pertitik"
): TransportSummary {
  const summary = initializeSummaries(modes);

  for (const result of responseData) {
    const data = result[dataKey] as ProductionData;
    if (!data?.data) continue;

    for (const mode of modes) {
      const modeConfig = SaaranaTransportasi[mode];
      const modeData = data.data[mode];

      if (!modeConfig || !modeData) continue;

      const modeSummary = processMode(modeData, modeConfig);
      summary[mode] = {
        total: (summary[mode].total || 0) + modeSummary.total,
        details: {
          ...summary[mode].details,
          ...Object.entries(modeSummary.details).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: (summary[mode].details[key] || 0) + value,
            }),
            {}
          ),
        },
      };
    }
  }

  return summary;
}

function sumVehicleData(
  response: ResponseDataSiasatiStrategi,
  modes: (keyof typeof SaaranaTransportasi)[]
): VehicleSummary {
  if (!response.data?.result) {
    return {
      produksi: initializeSummaries(modes),
      produksiPertitik: initializeSummaries(modes),
    };
  }

  const responseData = Object.values(response.data.result);

  return {
    produksi: processData(responseData, modes, "data_produksi"),
    produksiPertitik: processData(
      responseData,
      modes,
      "data_produksi_pertitik"
    ),
  };
}

export { sumVehicleData };
