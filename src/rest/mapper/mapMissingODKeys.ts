import { AggregateItem } from "../handlers/moda/type/common";

export function mapMissingODKeys(
  origin: Record<string, AggregateItem>,
  destination: Record<string, AggregateItem>
): { origin: Record<string, AggregateItem>, destination: Record<string, AggregateItem> } {
  const allKeys = new Set([...Object.keys(origin), ...Object.keys(destination)]);

  const emptyData: AggregateItem = {
    arrival: 0,
    departure: 0,
    vehicleArrival: 0,
    vehicleDeparture: 0,
  };

  const fillMissingKeys = (data: Record<string, AggregateItem>): Record<string, AggregateItem> => {
    const result: Record<string, AggregateItem> = {};
    for (const key of allKeys) {
      result[key] = data[key] ?? { ...emptyData };
    }
    return result;
  };

  return {
    origin: fillMissingKeys(origin),
    destination: fillMissingKeys(destination),
  };
};