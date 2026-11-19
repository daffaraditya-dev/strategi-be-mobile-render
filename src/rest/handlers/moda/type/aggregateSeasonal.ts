import {
  AggregateChartCapacitytData,
  AggregateChartData,
  AggregateChartFlightData,
  AggregateChartSailingData,
} from "./common";

export interface AggregateSeasonalResponse {
  status: boolean;
  message: string;
  data: {
    graph: {
      seasonal: AggregateSeasonalGraphData;
    };
    chart?: AggregateChartData[];
    chartFlight?: AggregateChartFlightData;
    chartCapacity?: AggregateChartCapacitytData;
    chartOd?: AggregateChartData[];
    chartSailing?: AggregateChartSailingData;
  };
}

export interface AggregateSeasonalGraphData {
  [key: string]: {
    arrival?: number;
    departure?: number;
    vehicleArrival?: number;
    vehicleDeparture?: number;
  };
}
[];
