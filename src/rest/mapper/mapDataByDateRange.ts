import { RANGE_DATE } from "@/constants/range";
import { DataRangePointItem } from "./mobillityPointByDate";
import { AggregateItem } from "../handlers/moda/type/common";

export type DataRangeItem = {
  date: string; // Date in YYYY-MM-DD format
  arrival: number;
  departure: number;
  vehicleArrival: number;
  vehicleDeparture: number;
};

export type RangeType = (typeof RANGE_DATE)[keyof typeof RANGE_DATE]; // "weekly" | "monthly" | "yearly"

export const mapDataByRanges = (
  data: DataRangeItem[] | DataRangePointItem[],
  rangeTypes: RangeType[]
) => {
  const result: {
    [key in RangeType]: {
      [key: string]: AggregateItem;
    };
  } = {
    [RANGE_DATE.WEEKLY]: {},
    [RANGE_DATE.MONTHLY]: {},
    [RANGE_DATE.YEARLY]: {},
  };

  rangeTypes.forEach((rangeType) => {
    const aggregatedData: {
      [key: string]: AggregateItem;
    } = {};

    data.forEach((item) => {
      const date = new Date(item.date);
      let key: string;

      switch (rangeType) {
        case RANGE_DATE.WEEKLY:
          // Daily data for weekly range
          key = item.date; // Use the full date for daily data in the weekly range
          break;
        case RANGE_DATE.MONTHLY:
          // Weekly data for monthly range
          key = `${date.getFullYear()}-W${getWeekNumber(date)}`; // Year-WXX format for weekly
          break;
        case RANGE_DATE.YEARLY:
          // Monthly data for yearly range
          key = `${date.getFullYear()}-${date.getMonth() + 1}`; // Year-Month format for monthly
          break;
        default:
          throw new Error("Invalid range type");
      }

      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          arrival: 0,
          departure: 0,
          vehicleArrival: 0,
          vehicleDeparture: 0,
        };
      }

      aggregatedData[key].arrival = (aggregatedData[key].arrival ?? 0) + item.arrival;
      aggregatedData[key].departure = (aggregatedData[key].departure ?? 0) + item.departure;
      aggregatedData[key].vehicleArrival = (aggregatedData[key].vehicleArrival ?? 0) + item.vehicleArrival;
      aggregatedData[key].vehicleDeparture = (aggregatedData[key].vehicleDeparture ?? 0) + item.vehicleDeparture;
      
    });

    // Assign the aggregated data directly to the result
    result[rangeType] = aggregatedData;
  });
  return result;
};

const getWeekNumber = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (1000 * 3600 * 24)
  );
  const weekNumber = Math.floor((days + startOfYear.getDay() - 1) / 7) + 1; // Week number, starting at 1
  return weekNumber;
};
