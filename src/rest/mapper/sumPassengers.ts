import { BerandaKey } from "@/constants/keyData";
import { parseNumber } from "../../utils/number";

interface PassengerData {
  data_produksi?: {
    status?: boolean;
    data?: {
      [key: string]: any;
    };
  };
}

interface SummaryResult {
  total: number;
  details: Record<string, number>;
}

interface Summary {
  [mode: string]: SummaryResult;
}

function sumPassengerData(response: any, modes: string[]): Summary {
  // Initialize summary object for each mode
  const summary: Summary = {};
  modes.forEach((mode) => {
    summary[mode] = { total: 0, details: {} };
  });

  // Return empty summary if no data
  if (!response?.data?.result) {
    return summary;
  }

  // Process each result in the response
  for (const result of Object.values(response.data.result)) {
    const prodData = (result as PassengerData).data_produksi;

    // Skip invalid data
    if (!prodData?.data) {
      continue;
    }

    // Process each requested mode
    for (const mode of modes) {
      const modeConfig = BerandaKey[mode as keyof typeof BerandaKey];
      const modeData = prodData.data[mode];

      if (!modeConfig || !modeData) {
        continue;
      }

      // Calculate totals for each configuration
      for (const item of modeData) {
        for (const config of modeConfig) {
          const value = config.keyData.reduce((sum, key) => {
            return sum + parseNumber(item[key]);
          }, 0);

          // Update mode details and total
          summary[mode].details[config.header] =
            (summary[mode].details[config.header] || 0) + value;
          summary[mode].total += value;
        }
      }
    }
  }

  return summary;
}
export { sumPassengerData };
