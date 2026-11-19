/* eslint-disable @typescript-eslint/no-explicit-any */
import { forEach, map, } from "lodash";
import { Moda } from "@/type/produksi.titik.type";

type ChartDataDecoderProps = {
  data: any[];
  chartConfig: any;
};

type chartResponse = {
  label: string;
} & Record<string, number | string>;

export const chartDataDecoderWithoutModa = ({ data, chartConfig, moda }: ChartDataDecoderProps & { moda: Moda; }) => {

  const entry = map(data, (item: any) => {
    const data: chartResponse = {
      label: item?.label || item?.period || '',
    };
    forEach(chartConfig[moda], (itemKey, key) => {
      data[key] = item[itemKey] || 0;
    });

    return data;
  });


  return entry;
};

// export const chartDataDecoderWithoutModa = ({ data, prevEvents, }: ChartDataDecoderProps) => {

//   const ignoredKeys: (keyof Produksi)[] = ["metaDataTimeRequest", "tanggal_event", "terminalb"];

//   const labels = uniq(
//     flatMap(values(data), (season) =>
//       Object.keys(season)
//         .filter((k) => !ignoredKeys.includes(k as keyof Produksi))
//         .flatMap((k) =>
//           (season[k as keyof Produksi] as Array<{ label: string;[key: string]: any; }>)?.map((j) => j.label) ?? []
//         )
//     )
//   );

//   return labels?.map((label) => {
//     const entry: Record<string, any> = { label };

//     forEach(data, (seasonData, seasonKey) => {
//       const eventId = seasonKey.split("::")?.[1];
//       const { nama } = prevEvents.find((event) => event.id === Number(eventId)) as Event;

//       let total = 0;

//       for (const modaKey in seasonData) {
//         if (ignoredKeys.includes(modaKey as keyof Produksi)) continue;

//         const modaData = seasonData[modaKey as keyof Produksi] as Array<{ label: string;[key: string]: any; }>;
//         const keysToSum = keyTransportasi[modaKey as Moda]?.keyData || [];

//         const result = modaData?.find((j) => j.label === label);
//         if (result) {
//           for (const sumKey of keysToSum) {
//             total += Number(result[sumKey] || 0);
//           }
//         }
//       }

//       entry[nama] = total;
//     });

//     return entry;
//   });
// };

// export const chartDataDecoder = ({ data, key, moda, prevEvents }: ChartDataDecoderProps & { moda?: Moda; }) => {
//   if (moda) {
//     return chartDataDecoderWithModa({ data, key, moda, prevEvents });
//   }
//   return chartDataDecoderWithoutModa({ data, key, prevEvents });
// };
