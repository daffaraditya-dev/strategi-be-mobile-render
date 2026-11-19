export interface CctvStream {
  id: string;
  nama_lokasi: string;
  nama_cctv: string;
  stream_url: string;
  status: "online" | "offline";
  nama_pengelola: string;
  protocol: string;
  latitude: string;
  longitude: string;
  source: string;
  tag_kategori: string;
  matra: string;
  nama_kabupaten_kota?: string;
  nama_provinsi?: string;
}

export interface ResponseDataCctv {
  status: boolean;
  data: CctvStream[];
}

export interface SailingDomesticInternationalParams {
  tanggal_awal: string;
  tanggal_akhir: string;
}

export interface TopDestinationASDPTransportationParams {
  tanggal_awal: string;
  tanggal_akhir: string;
  keyword: string;
  per_page?: number;

}

export interface SailingDomesticInternationalTransportData {
  moda: string;
  kategori: string;
  sum: number;
}

interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

export interface ResponseDataSailingDomesticInternational {
  status: boolean;
  data: SailingDomesticInternationalTransportData[];
  message: string;
  pagination: Pagination;
}

export interface TopDestinationTrainTransportationParams {
  tanggal_awal: string;
  tanggal_akhir: string;
  keyword: string;
  per_page?: number;

}

export interface TopDestinationTrainTransportationData {
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  penumpang: string;
  sarana: number;
}

export interface ResponseDataTopDestinationTrainTransportation {
  status: boolean;
  data: TopDestinationTrainTransportationData[];
  message: string;
  pagination: Pagination;
}

export interface TopDestinationASDPTransportationData {
  origin: number;
  origin_name: string;
  destination: number;
  destination_name: string;
  penumpang: string;
  sarana: number;
  jenis: string;
}

export interface ResponseDataTopDestinationASDPTransportation {
  status: boolean;
  data: TopDestinationASDPTransportationData[];
  message: string;
  pagination: Pagination;
}

export interface TopDestinationSeaTransportationParams {
  tanggal_awal: string;
  tanggal_akhir: string;
  jenis: string;
  keyword: string;
  per_page?: number;

}

export interface TopDestinationSeaTransportationData {
  id_origin: string;
  origin_name: string;
  id_destination: string;
  destination_name: string;
  penumpang: string;
  sarana: string;
  jenis: string;
}

export interface ResponseDataTopDestinationSeaTransportation {
  status: boolean;
  data: TopDestinationSeaTransportationData[];
  message: string;
  pagination: Pagination;
}

export interface TopDestinationTransportationParams {
  tanggal_awal: string;
  tanggal_akhir: string;
  jenis: string;
  keyword: string;
  per_page?: number;
}

export interface ResponseDataTopDestinationTransportation {
  status: boolean;
  data: TopDestinationTransportationData[];
  message: string;
  pagination: Pagination;
}

export interface TopDestinationAirTransportationParams {
  tanggal_awal: string;
  tanggal_akhir: string;
  jenis: string;
  keyword: string;
  per_page?: number;

}

export interface TopDestinationAirTransportationData {
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  penumpang: string;
  sarana: number;
  jenis: string;
}
export interface TopDestinationTransportationData {
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  penumpang: string;
  sarana: number;
  jenis: string;
}

export interface ResponseDataTopDestinationAirTransportation {
  status: boolean;
  data: TopDestinationAirTransportationData[];
  message: string;
  pagination: Pagination;
}

export interface PerformanceReportParams {
  tanggal_awal: string;
  tanggal_akhir: string;
}

export interface PerformanceReportData {
  pengelola: string;
  jumlah_simpul: number;
  jumlah_pantau: number;
  simpul_melapor: number;
  laporan_masuk: number;
  target_laporan: number;
  persentase: string;
}

export interface ResponseDataPerformanceReport {
  status: boolean;
  data: PerformanceReportData[];
  message: string;
  pagination: Pagination;
}

export interface OperatorRoutineParams {
  tanggal_awal: string;
  tanggal_akhir: string;
  keyword: string;
  per_page?: number;
}

export interface TrainOperatorData {
  operator: string;
  nama_pic: string;
  no_hp_pic: string;
  lokasi: string;
  penumpang: string;
  sarana: number;
  otp: string;
}

export interface ResponseDataTrainOperator {
  status: boolean;
  data: TrainOperatorData[];
  message: string;
  pagination: Pagination;
}

export interface TollOperatorData {
  operator: string;
  nama_pic: string;
  no_hp_pic: string;
  lokasi: string;
  jml_gerbang_tol: number;
  jml_kendaraan: string;
  otp: string;
}

export interface ResponseDataTollOperator {
  status: boolean;
  data: TollOperatorData[];
  message: string;
  pagination: Pagination;
}

export interface AirlineOperatorData {
  icaoOperator: string;
  airlines_nm: string;
  nama_pic: string;
  no_hp_pic: string;
  lokasi: string;
  penumpang: number | string;
  sarana: number;
  otp: string;
}

export interface ResponseDataAirlineOperator {
  status: boolean;
  data: AirlineOperatorData[];
  message: string;
  pagination: Pagination;
}

export interface SailingOperatorData {
  operator: string;
  nama_pic: string;
  no_hp_pic: string;
  lokasi: string;
  penumpang: string;
  sarana: number;
  otp: string;
}

export interface ResponseDataSailingOperator {
  status: boolean;
  data: SailingOperatorData[];
  message: string;
  pagination: Pagination;
}

export interface CrossingOperatorData {
  operator: string;
  nama_pic: string;
  no_hp_pic: string;
  lokasi: string;
  penumpang: string;
  sarana: number;
  otp: string;
}

export interface ResponseDataCrossingOperator {
  status: boolean;
  data: CrossingOperatorData[];
  message: string;
  pagination: Pagination;
}

export interface MovementDomesticInternationalParams {
  tanggal_awal: string;
  tanggal_akhir: string;
}

export interface MovementDomesticInternationalData {
  moda: string;
  tanggal: string;
  jenis: string;
  kategori: string;
  value: string;
}

export interface ResponseMovementDomesticInternational {
  status: boolean;
  data: MovementDomesticInternationalData[];
  message: string;
}

export interface DataPantauLocation {
  id_lokasi: number;
  kode_referensi: string | null;
  nama: string;
  tipe?: string;
  kota: string;
  provinsi: string;
  longitude: string;
  latitude: string;
  koordinat: string | null;
}

export interface ResponseDataPantau {
  status: boolean;
  data: {
    jalan: DataPantauLocation[];
    asdp: DataPantauLocation[];
    laut: DataPantauLocation[];
    udara: DataPantauLocation[];
    ka: DataPantauLocation[];
    kai: DataPantauLocation[];
    toll: DataPantauLocation[];
    stasiun: DataPantauLocation[];
    arteri: DataPantauLocation[];
    toll_2: DataPantauLocation[];
  };
  message: string;
}

export interface WeatherLocationParams {
  wilayah_administrasi: string;
}

export interface ResponseWeatherAPI {
  status: boolean;
  data: ResponseDataWeather[];
  message: string;
  data_lokasi: WeatherLocation;
}

export interface ResponseDataWeather {
  lokasi: WeatherLocation;
  cuaca: WeatherForecast[][];
}

interface WeatherLocation {
  adm1: string | null;
  adm2: string | null;
  adm3?: string | null;
  adm4?: string | null;
  provinsi: string;
  kotkab: string | null;
  kecamatan?: string | null;
  desa?: string | null;
  lon: number;
  lat: number;
  timezone: string;
  type?: string;
}

export interface WeatherForecast {
  datetime: string;
  t: number; // temperature in Celsius
  tcc: number; // total cloud cover (percentage)
  tp: number; // precipitation (mm)
  weather: number; // weather code
  weather_desc: string; // weather description in Indonesian
  weather_desc_en: string; // weather description in English
  wd_deg: number; // wind direction in degrees
  wd: string; // wind direction abbreviation (N, NE, E, etc.)
  wd_to: string; // wind direction "to" (opposite direction)
  ws: number; // wind speed (likely in m/s)
  hu: number; // humidity (percentage)
  vs: number; // visibility (meters)
  vs_text: string; // visibility text description
  time_index: string; // time index format
  analysis_date: string; // analysis timestamp
  image: string; // URL to weather icon
  utc_datetime: string; // datetime in UTC
  local_datetime: string; // datetime in local timezone
}
