import { ResponseDataSiasatiStrategi } from "@/services/type/apiHubnet";
import { parseNumber } from "../../utils/number";
import { AggregateChartCapacitytData } from "../handlers/moda/type/common";

function initializeSummary(): AggregateChartCapacitytData {
  return {
    motor: 0,
    roda4: 0,
    bus: 0,
    truk: 0,
    roda4lebih: 0,
  };
}

function sumAsdpCapacity(
  response: ResponseDataSiasatiStrategi
): AggregateChartCapacitytData {
  const summary = initializeSummary();

  if (!response.data?.result) {
    return summary;
  }

  for (const result of Object.values(response.data.result)) {
    if (!result?.data_produksi?.data) {
      continue;
    }

    const data = result.data_produksi.data;
    const modeData = data.asdp as unknown as Array<Record<string, string>>;

    if (!modeData) continue;

    for (const item of modeData) {
      summary.motor += parseNumber(item.motor);
      summary.roda4 += parseNumber(item.roda4);
      summary.bus += parseNumber(item.bus);
      summary.truk += parseNumber(item.truk);
      summary.roda4lebih += parseNumber(item.roda4lebih);
    }
  }

  return summary;
}

export { sumAsdpCapacity };
