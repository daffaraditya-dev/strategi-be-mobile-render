import { AggregateItem } from "../../moda/type/common";

export interface TransportationMetrics extends AggregateItem {}

export interface ComparisonData {
  moda: string;
  idLocation: number;
  location: string;
  arrivalSummary: number;
  vehicleArrivalSummary: number;
  departureSummary: number;
  vehicleDepartureSummary: number;
  seasonal?: Record<string, TransportationMetrics>;
  weekly?: Record<string, TransportationMetrics>;
  monthly?: Record<string, TransportationMetrics>;
  yearly?: Record<string, TransportationMetrics>;
}

export interface ComparisonResponse {
  success: boolean;
  data: ComparisonData[];
}
