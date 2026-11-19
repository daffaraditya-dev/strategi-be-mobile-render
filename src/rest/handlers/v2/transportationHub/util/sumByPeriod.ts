import { Moda } from "@/type/produksi.titik.type";
import { forEach, groupBy, has, isString, orderBy, sumBy } from "lodash";
import moment from "moment";
import { ProduksiPertitikPartial } from "./sumData";
import { keyPenumpangModa } from "../constant/penumpangDataConfig";
import { keyTransportasiModa } from "../constant/saranaDataConfig";
import { chartDataDecoderWithoutModa } from "./chartDataDecoder";
import { sortedKey } from "../constant/sortedKey";
import { keysModa } from "@/rest/handlers/syncMatrik/constant/Keys";

type GroupByType = "daily" | "weekly" | "monthly" | "yearly";

interface PassengerSummaryProps {
  moda: Moda;
  data: ProduksiPertitikPartial;
  groupByType: GroupByType;
  template?: string[];
  isSeasonal?: boolean;
  sort?: "asc" | "desc";
}

type SummedData = {
  idLokasi: number | string;
} & Record<string, number | string>;

export const sumByPeriod = ({ moda, data, groupByType, template, sort = "desc", isSeasonal }: PassengerSummaryProps) => {
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

      // console.log(items, '-----groupedByTime-----');

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

      const summed: SummedData = {
        idLokasi: isString(id_lokasi) ? id_lokasi : Number(id_lokasi),
        nama_terminal: items[0]?.nama_terminal,
        provinsi: items[0]?.provinsi,
        nama: items[0]?.nama,
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

      return summed;
    });


    const result: Record<string, any> = {
      idLokasi: id_lokasi,
      nama_terminal: items[0]?.nama_terminal,
      provinsi: items[0]?.provinsi,
      nama: items[0]?.nama,
    };
    if (moda === "jalan") result["tipe"] = items[0]?.tipe;

    forEach(keysModa[moda], (item, key) => {
      result[key] = sumBy(dataByPeriod, (itemData: Record<string, any>) => parseInt(itemData[item] || '0',));
    });


    let tmpChart: any[] = [];

    // console.log(dataByPeriod, '-----dataByPeriod-----');


    if (template?.includes("chart")) {
      const chart = chartDataDecoderWithoutModa({
        data: dataByPeriod,
        moda: moda,
        chartConfig: keysModa
      });

      tmpChart = chart;
    }
    const finalData = { ...result, detail: (template?.includes("raw") && tmpChart ? tmpChart : []), };


    if (!template?.includes("raw")) {
      delete (finalData as any).detail;
    }

    return finalData;
  });


  return orderBy(result, (item: any) => {
    return item["departure"] + (item["arrival"] || 0);
  }, sort);
};
