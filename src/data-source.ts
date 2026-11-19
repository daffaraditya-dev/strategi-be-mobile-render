import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Pool } from "pg";

import { MatrikPertitik } from "@/entities/MatrikPertitik";
import { MatrikPertitikPartitioned } from "@/entities/MatrikPertitikPartitioned";
import { AkunLivestreaming } from "@/entities/AkunLivestreaming";
import { Cache_2dtiles } from "@/entities/Cache_2dtiles";
import { CacheInaportnet } from "@/entities/CacheInaportnet";
import { DataInaportnetBarangProduksi } from "@/entities/DataInaportnetBarangProduksi";
import { DataInaportnetProduksi } from "@/entities/DataInaportnetProduksi";
import { DataSaranaAsdp } from "@/entities/DataSaranaAsdp";
import { DataSaranaBus } from "@/entities/DataSaranaBus";
import { DataSaranaLaut } from "@/entities/DataSaranaLaut";
import { FileUpload } from "@/entities/FileUpload";
import { HistoryLaporan } from "@/entities/HistoryLaporan";
import { IcaoAirport } from "@/entities/IcaoAirport";
import { Laporan } from "@/entities/Laporan";
import { LaporanKejadian } from "@/entities/LaporanKejadian";
import { LinkLaporanData } from "@/entities/LinkLaporanData";
import { LogRequestResponse } from "@/entities/LogRequestResponse";
import { MEventModaDate } from "@/entities/MEventModaDate";
import { MEventModaPantau } from "@/entities/MEventModaPantau";
import { MidCountryMapping } from "@/entities/MidCountryMapping";
import { MstKabupaten } from "@/entities/MstKabupaten";
import { MstKapal } from "@/entities/MstKapal";
import { MstKapalAsdp } from "@/entities/MstKapalAsdp";
import { MstPelabuhan } from "@/entities/MstPelabuhan";
import { MstPerusahaan } from "@/entities/MstPerusahaan";
import { MstProvinsi } from "@/entities/MstProvinsi";
import { MstTerminal } from "@/entities/MstTerminal";
import { MstTrayek } from "@/entities/MstTrayek";
import { MTipeKapal } from "@/entities/MTipeKapal";
import { RefreshTokenEntity } from "@/entities/RefreshTokenEntity";
import { RequestLivestreaming } from "@/entities/RequestLivestreaming";
import { LaporanKejadianDetail } from "@/entities/LaporanKejadianDetail";
import { Role } from "@/entities/Role";
import { TblLogging } from "@/entities/TblLogging";
import { TcpDatasources } from "@/entities/TcpDatasources";
import { User } from "@/entities/User";
import { config } from "./config";
import { Posko } from "./entities/Posko";
import { MstJenisPosko } from "./entities/MstJenisPosko";
import { MstPesertaPosko } from "./entities/MstPesertaPosko";
import { Fokus } from "./entities/Fokus";
import { ThirtySecondsVideo } from "./entities/ThirtySecondsVideo";
import { LaporanPantau } from "./entities/LaporanPantau";
import { LaporanPantauCuaca } from "./entities/LaporanPantauCuaca";
import { LaporanPantauKecelakaan } from "./entities/LaporanPantauKecelakaan";
import { MatrikProduksi } from "./entities/MatrikProduksi";
import { DataOD } from "./entities/DataOD";
import { DataOperator } from "./entities/DataOperator";
import { DataSync } from "./entities/DataSync";
import { DataSyncHubnet } from "./entities/DataSyncHubnet";
import { LaporanKejadianV2 } from "./entities/LaporanKejadianV2";
import { LaporanKejadianDetailV2 } from "./entities/LaporanKejadianDetailV2";
import { LaporanKejadianTindakLanjut } from "./entities/LaporanKejadianTindakLanjut";
import { DataFerizyAsdp } from "./entities/DataFerizy";
import { MstLiveStreaming } from "./entities/MstLiveStreaming";
import { LaporanPosko } from "./entities/LaporanPosko";
import { LaporanPoskoShift } from "./entities/LaporanPoskoShift";
import { AppConfig } from "./entities/AppConfig";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  synchronize: false,

  logging: false,
  entities: [
    MstKapal,
    MstKapalAsdp,
    MstPelabuhan,
    MstPerusahaan,
    MstProvinsi,
    MstTerminal,
    MstTrayek,
    AkunLivestreaming,
    Cache_2dtiles,
    CacheInaportnet,
    DataInaportnetBarangProduksi,
    DataInaportnetProduksi,
    DataSaranaAsdp,
    DataSaranaBus,
    DataSaranaLaut,
    FileUpload,
    Fokus,
    HistoryLaporan,
    IcaoAirport,
    Laporan,
    LaporanKejadian,
    LaporanKejadianV2,
    LaporanKejadianDetail,
    LaporanKejadianDetailV2,
    LaporanKejadianTindakLanjut,
    LaporanPantau,
    LaporanPantauCuaca,
    LaporanPantauKecelakaan,
    LinkLaporanData,
    LogRequestResponse,
    MEventModaDate,
    MEventModaPantau,
    MidCountryMapping,
    MstKabupaten,
    MTipeKapal,
    MstJenisPosko,
    MstPesertaPosko,
    Posko,
    RefreshTokenEntity,
    RequestLivestreaming,
    Role,
    TblLogging,
    TcpDatasources,
    ThirtySecondsVideo,
    User,
    MatrikPertitik,
    MatrikPertitikPartitioned,
    MatrikProduksi,
    DataOD,
    DataOperator,
    DataSync,
    DataSyncHubnet,
    DataFerizyAsdp,
    MstLiveStreaming,
    LaporanPosko,
    LaporanPoskoShift,
    AppConfig
  ],
  subscribers: [],
  migrations: ["migrations/*.ts"],
});

export const pgClient = new Pool({
  host: config.dbHost,
  port: config.dbPort,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  max: 10,
  idleTimeoutMillis: 30000, // idle timeout (ms)
  connectionTimeoutMillis: 2000, // timeout saat connect (ms)
});
