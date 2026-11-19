import { ResponseDataSiasatiStrategi } from "@/services/type/apiHubnet";
import { parseNumber } from "../../utils/number";

interface DetailedSummary {
  details: Record<string, number>;
  ship: {
    total: number;
    domestic: number;
    international: number;
    arrival: number;
    departure: number;
    intArrival: number;
    intDeparture: number;
  };
  passengers: {
    total: number;
    domestic: number;
    international: number;
    arrival: number;
    departure: number;
    intArrival: number;
    intDeparture: number;
  };
}

interface SailingSummary {
  [mode: string]: DetailedSummary;
}

function initializeSummary(): SailingSummary {
  return {
    laut: {
      details: {},
      ship: {
        total: 0,
        domestic: 0,
        international: 0,
        arrival: 0,
        departure: 0,
        intArrival: 0,
        intDeparture: 0,
      },
      passengers: {
        total: 0,
        domestic: 0,
        international: 0,
        arrival: 0,
        departure: 0,
        intArrival: 0,
        intDeparture: 0,
      },
    },
  };
}

function sumSailingData(response: ResponseDataSiasatiStrategi): SailingSummary {
  const summary = initializeSummary();

  if (!response.data?.result) {
    return summary;
  }

  for (const result of Object.values(response.data.result)) {
    if (!result?.data_produksi?.data) {
      continue;
    }

    const data = result.data_produksi.data;
    const modeData = data.laut as unknown as Array<Record<string, string>>;

    if (!modeData) continue;

    for (const item of modeData) {
      // Process ship movements
      summary.laut.ship.departure += parseNumber(item.kapal_naik_dom);
      summary.laut.ship.arrival += parseNumber(item.kapal_turun_dom);
      summary.laut.ship.intDeparture += parseNumber(item.kapal_naik_int);
      summary.laut.ship.intArrival += parseNumber(item.kapal_turun_int);
      summary.laut.ship.domestic +=
        parseNumber(item.kapal_turun_dom) + parseNumber(item.kapal_naik_dom);
      summary.laut.ship.international +=
        parseNumber(item.kapal_turun_int) + parseNumber(item.kapal_naik_int);

      // Process passenger movements
      summary.laut.passengers.departure += parseNumber(item.naik_dom);
      summary.laut.passengers.arrival += parseNumber(item.turun_dom);
      summary.laut.passengers.intDeparture += parseNumber(item.naik_int);
      summary.laut.passengers.intArrival += parseNumber(item.turun_int);
      summary.laut.passengers.domestic +=
        parseNumber(item.turun_dom) + parseNumber(item.naik_dom);
      summary.laut.passengers.international +=
        parseNumber(item.turun_int) + parseNumber(item.naik_int);

      // Store detailed breakdown
      for (const [header, value] of Object.entries(item)) {
        summary.laut.details[header] =
          (summary.laut.details[header] || 0) + parseNumber(value);
      }
    }

    // Calculate totals
    summary.laut.ship.total =
      summary.laut.ship.domestic + summary.laut.ship.international;
    summary.laut.passengers.total =
      summary.laut.passengers.domestic + summary.laut.passengers.international;
  }

  return summary;
}

export { sumSailingData };
