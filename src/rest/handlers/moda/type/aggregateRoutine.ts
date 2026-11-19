import {
  AggregateChartCapacitytData,
  AggregateChartData,
  AggregateChartFlightData,
  AggregateChartSailingData,
  AggregateGraphData,
} from "./common";

export interface AggregateRoutineResponse {
  status: boolean;
  message: string;
  data: {
    graph: AggregateGraphData;
    chart?: AggregateChartData[];
    chartFlight?: AggregateChartFlightData;
    chartCapacity?: AggregateChartCapacitytData;
    chartOd?: AggregateChartData[];
    chartSailing?: AggregateChartSailingData;
  };
}
