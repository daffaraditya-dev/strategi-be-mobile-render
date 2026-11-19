import { Moda } from "@/type/produksi.titik.type";
import { forEach, groupBy, has, isString, map, orderBy, sumBy } from "lodash";
import moment from "moment";
import { ProduksiPertitikPartial } from "./sumData";
import { keyPenumpangModa } from "../constant/penumpangDataConfig";
import { keyTransportasiModa } from "../constant/saranaDataConfig";
import { chartDataDecoderWithoutModa } from "./chartDataDecoder";
import { sortedKey } from "../constant/sortedKey";

type GroupByType = "daily" | "weekly" | "monthly" | "yearly";

interface PassengerSummaryProps {
  moda: Moda;
  data: ProduksiPertitikPartial;
  groupByType: GroupByType;
  template?: string[];
  isSeasonal?: boolean;
  sort?: "asc" | "desc";
  returnAllKey?: boolean;
}

type SummedData = {
  id_lokasi: number | string;
} & Record<string, number | string>;

export const sumByPeriod = ({ moda, data, groupByType, template, sort = "desc", isSeasonal, returnAllKey }: PassengerSummaryProps) => {
  moment.locale("id");
  const formatMap: Record<GroupByType, string> = {
    daily: "YYYY-MM-DD",
    weekly: "GGGG-[W]WW",
    monthly: "YYYY-MM",
    yearly: "YYYY"
  };

  const format = formatMap[groupByType];

  const groupByLokasi = groupBy(data?.[moda], 'id_lokasi');


  const result = Object.entries(groupByLokasi).map(([id_lokasi, items]: any[]) => {
    let groupedByTime: Record<string, any[]> = {};

    if (groupByType === "weekly") {
      // const sorted = [...items].sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime());

      // for (let i = 0; i < sorted.length; i += 7) {
      //   const chunk = sorted.slice(i, i + 7);
      //   const weekIndex = Math.floor(i / 7) + 1;
      //   const key = `W${weekIndex}`;
      //   groupedByTime[key] = chunk;
      // }

      const sorted = [...items].sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime());

      const year = new Date(sorted[0].tanggal).getFullYear();

      const startOfYear = new Date(`${year}-01-01`);
      startOfYear.setHours(0, 0, 0, 0);

      const day = startOfYear.getDay();
      startOfYear.setDate(startOfYear.getDate() - day);

      for (const item of sorted) {
        const currentDate = new Date(item.tanggal);
        currentDate.setHours(0, 0, 0, 0);

        const diffDays = Math.floor((currentDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
        const weekIndex = Math.floor(diffDays / 7) + 1;

        const key = `W${weekIndex}|${year}`;
        if (!groupedByTime[key]) groupedByTime[key] = [];
        groupedByTime[key].push(item);
      }
    } else {


      groupedByTime = groupBy(items, (item: any) => {
        const period = moment(item.tanggal).format(format);
        const year = new Date(item.tanggal).getFullYear();
        const label = item.label ?? "";
        return groupByType === "daily" && isSeasonal ? `${label}|${year}` : `${period}|${year}`;
      });

    }


    const dataByPeriod = Object.entries(groupedByTime).map(([key, group]) => {
      const [period] = key.split("|");
      let formattedPeriod = groupByType === "daily" && !isSeasonal ? moment(period).format("DD") : groupByType === "monthly" ? moment(period).format("MMM") : period;

      // if (groupByType === "weekly") {
      //   const sampleDate = group[0]?.tanggal;
      //   const momentDate = moment(sampleDate);
      //   // const weekNumber = momentDate.isoWeek();
      //   // const year = momentDate.isoWeekYear();
      //   const monthName = momentDate.format("MMMM");
      //   const year = momentDate.format("YYYY");

      //   const sampleDateMonth = moment(group[0]?.tanggal);
      //   const startOfMonth = sampleDateMonth.clone().startOf("month");
      //   const weekOfMonth = Math.ceil((sampleDateMonth.date() + startOfMonth.day()) / 7);

      //   formattedPeriod = `Week ${weekOfMonth}, ${monthName} ${year}`;
      // }
      const summed: SummedData = {
        id_lokasi: isString(id_lokasi) ? id_lokasi : Number(id_lokasi),
        nama_terminal: items[0]?.nama_terminal,
        provinsi: items[0]?.provinsi,
        nama: items[0]?.nama,
        kota: items[0]?.kota,
        longitude: items[0]?.longitude,
        latitude: items[0]?.latitude,
        koordinat: items[0]?.koordinat,
        period: formattedPeriod,
      };

      if (moda === "jalan") summed["tipe"] = items[0]?.tipe;
      if (groupByType === "daily") summed["label"] = formattedPeriod;

      if (groupByType === "daily") summed["tanggal"] = group?.[0]?.tanggal;



      forEach(keyPenumpangModa[moda], (item) => {
        summed[item?.keyData?.[0]] = sumBy(group, (itemData: Record<string, any>) => parseInt(itemData[item?.keyData?.[0]] || 0,));
      });
      forEach(keyTransportasiModa[moda], (item) => {
        summed[item?.keyData?.[0]] = sumBy(group, (itemData: Record<string, any>) => parseInt(itemData[item?.keyData?.[0]] || 0,));

      });
      if (returnAllKey && groupByType === "daily") {
        forEach(group, (item) => {
          map(item, (val, key) => {
            summed[key] = val;
          });
        });
      }

      // return ({
      //   period,
      //   jml_pnp_dtg: sumBy(group, (i: any) => parseInt(i.jml_pnp_dtg) || 0),
      //   jml_pnp_brgkt: sumBy(group, (i: any) => parseInt(i.jml_pnp_brgkt) || 0),
      //   bus_dtg: sumBy(group, (i: any) => parseInt(i.bus_dtg) || 0),
      //   bus_brgkt: sumBy(group, (i: any) => parseInt(i.bus_brgkt) || 0)
      // });

      return summed;
    });


    const result: Record<string, any> = {
      id_lokasi,
      nama_terminal: items[0]?.nama_terminal,
      provinsi: items[0]?.provinsi,
      nama: items[0]?.nama,
    };
    if (moda === "jalan") result["tipe"] = items[0]?.tipe;

    forEach(keyPenumpangModa[moda], (item) => {
      result[item?.keyData?.[0] as string] = sumBy(dataByPeriod, (itemData: Record<string, any>) => parseInt(itemData[item?.keyData?.[0]] || '0',));
    });
    forEach(keyTransportasiModa[moda], (item) => {
      result[item?.keyData?.[0]] = sumBy(dataByPeriod, (itemData: Record<string, any>) => parseInt(itemData[item?.keyData?.[0]] || '0',));

    });

    let tmpChartSarana: any[] = [];
    let tmpChartPenumpang: any[] = [];

    if (template?.includes("chart")) {
      const chartSarana = chartDataDecoderWithoutModa({
        data: dataByPeriod,
        moda: moda,
        chartConfig: keyTransportasiModa
      });
      const chartPenumpang = chartDataDecoderWithoutModa({
        data: dataByPeriod,
        moda: moda,
        chartConfig: keyPenumpangModa
      });

      tmpChartSarana = chartSarana;
      tmpChartPenumpang = chartPenumpang;
    }
    const finalData = { ...result, detail: (template?.includes("raw") && dataByPeriod ? dataByPeriod : []), chartSarana: (template?.includes("chart") && tmpChartSarana ? tmpChartSarana : []), chartPenumpang: (template?.includes("chart") && tmpChartPenumpang ? tmpChartPenumpang : []) };


    if (!template?.includes("chart")) {
      if (has(finalData, "chartPenumpang")) delete (finalData as any).chartPenumpang;
      if (has(finalData, "chartSarana")) delete (finalData as any).chartSarana;
    }

    if (!template?.includes("raw")) {
      delete (finalData as any).detail;
    }

    return finalData;
  });

  return orderBy(result, (item: any) => item[sortedKey[moda].keyData[0]] + (item[sortedKey[moda].keyData[1]] || 0), sort);
};
