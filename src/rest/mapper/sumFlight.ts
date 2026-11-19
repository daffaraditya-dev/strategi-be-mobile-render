import { ResponseDataSiasatiStrategi } from "@/services/type/apiHubnet";
import { parseNumber } from "../../utils/number";

interface DetailedSummary {
  details: Record<string, number>;
  aircraft: {
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

interface FlightSummary {
  [mode: string]: DetailedSummary;
}

function initializeSummary(): FlightSummary {
  return {
    udara: {
      details: {},
      aircraft: {
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

function sumFlightData(response: ResponseDataSiasatiStrategi): FlightSummary {
  const summary = initializeSummary();

  if (!response.data?.result) {
    return summary;
  }

  for (const result of Object.values(response.data.result)) {
    if (!result?.data_produksi?.data) {
      continue;
    }

    const data = result.data_produksi.data;
    const modeData = data.udara as unknown as Array<Record<string, string>>;

    if (!modeData) continue;

    for (const item of modeData) {
      // Process aircraft movements
      summary.udara.aircraft.departure += parseNumber(item.jml_pswt_brkt_dom);
      summary.udara.aircraft.arrival += parseNumber(item.jml_pswt_dtg_dom);
      summary.udara.aircraft.intDeparture += parseNumber(
        item.jml_pswt_brkt_intl
      );
      summary.udara.aircraft.intArrival += parseNumber(item.jml_pswt_dtg_intl);
      summary.udara.aircraft.domestic +=
        parseNumber(item.jml_pswt_dtg_dom) +
        parseNumber(item.jml_pswt_brkt_dom);
      summary.udara.aircraft.international +=
        parseNumber(item.jml_pswt_dtg_intl) +
        parseNumber(item.jml_pswt_brkt_intl);

      // Process passenger movements
      summary.udara.passengers.departure += parseNumber(item.jml_pnp_brkt_dom);
      summary.udara.passengers.arrival += parseNumber(item.jml_pnp_dtg_dom);
      summary.udara.passengers.intDeparture += parseNumber(
        item.jml_pnp_brkt_intl
      );
      summary.udara.passengers.intArrival += parseNumber(item.jml_pnp_dtg_intl);
      summary.udara.passengers.domestic +=
        parseNumber(item.jml_pnp_dtg_dom) + parseNumber(item.jml_pnp_brkt_dom);
      summary.udara.passengers.international +=
        parseNumber(item.jml_pnp_dtg_intl) +
        parseNumber(item.jml_pnp_brkt_intl);

      // Store detailed breakdown
      for (const [header, value] of Object.entries(item)) {
        summary.udara.details[header] =
          (summary.udara.details[header] || 0) + parseNumber(value);
      }
    }

    // Calculate totals
    summary.udara.aircraft.total =
      summary.udara.aircraft.domestic + summary.udara.aircraft.international;
    summary.udara.passengers.total =
      summary.udara.passengers.domestic +
      summary.udara.passengers.international;
  }

  return summary;
}

export { sumFlightData };
