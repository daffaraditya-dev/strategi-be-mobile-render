import { AppDataSource } from "@/data-source";
import moment from "moment";

// Partisi bulanan harus ada sebelum insert, kalau tidak baris masuk ke partisi DEFAULT
// dan CREATE PARTITION untuk bulan itu akan gagal di kemudian hari.
// Fungsi ensure_partition_exists (database) juga membuat index agg_cov untuk partisi baru.
export async function ensurePartitionsForMonths(months: Iterable<string>) {
  for (const month of months) {
    await AppDataSource.query("SELECT ensure_partition_exists($1::date)", [month]);
  }
}

export async function ensurePartitions(startDate: string, endDate: string) {
  const months: string[] = [];
  const cursor = moment(startDate).startOf("month");
  const last = moment(endDate).startOf("month");
  while (cursor.isSameOrBefore(last)) {
    months.push(cursor.format("YYYY-MM-DD"));
    cursor.add(1, "month");
  }
  await ensurePartitionsForMonths(months);
}

// Bulan dari daftar tanggal yang benar-benar akan di-insert (abaikan nilai kosong/invalid)
export async function ensurePartitionsForDates(dates: Array<string | undefined | null>) {
  const months = new Set<string>();
  for (const date of dates) {
    const parsed = date ? moment(date) : null;
    if (parsed?.isValid()) months.add(parsed.startOf("month").format("YYYY-MM-DD"));
  }
  await ensurePartitionsForMonths(months);
}
