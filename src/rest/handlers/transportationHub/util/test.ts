import { Moda } from "@/type/produksi.titik.type";
import { groupBy, sumBy } from "lodash";
import moment from "moment";
import { ProduksiPertitikPartial } from "./sumData";

type GroupByType = "daily" | "weekly" | "monthly" | "yearly";

interface PassengerSummaryProps {
  moda: Moda;
  data: ProduksiPertitikPartial;
  groupByType: GroupByType;
}

export const testFunction = ({ moda, data, groupByType }: PassengerSummaryProps) => {
  const formatMap: Record<GroupByType, string> = {
    daily: "YYYY-MM-DD",
    weekly: "GGGG-[W]WW",
    monthly: "YYYY-MM",
    yearly: "YYYY"
  };

  const format = formatMap[groupByType];

  const groupByLokasi = groupBy(data?.[moda], 'id_lokasi');

  const result = Object.entries(groupByLokasi).map(([id_lokasi, items]: any[]) => {
    const groupedByTime = groupBy(items, (item: any) => moment(item.tanggal).format(format));

    const dataByPeriod = Object.entries(groupedByTime).map(([period, group]) => ({
      period,
      jml_pnp_dtg: sumBy(group, (i: any) => parseInt(i.jml_pnp_dtg) || 0),
      jml_pnp_brgkt: sumBy(group, (i: any) => parseInt(i.jml_pnp_brgkt) || 0),
      bus_dtg: sumBy(group, (i: any) => parseInt(i.bus_dtg) || 0),
      bus_brgkt: sumBy(group, (i: any) => parseInt(i.bus_brgkt) || 0)
    }));

    // const summed: SummedData = {
    //   id_lokasi: Number(id_lokasi),
    //   nama_terminal: items[0]?.nama_terminal,
    //   provinsi: items[0]?.provinsi,
    //   nama: items[0]?.nama,
    // };

    // if (moda === "jalan") summed["tipe"] = items[0]?.tipe;

    return {
      id_lokasi,
      nama_terminal: items[0]?.nama_terminal,
      provinsi: items[0]?.provinsi,
      nama: items[0]?.nama,
      data: dataByPeriod
    };
  });

  return result;
};
