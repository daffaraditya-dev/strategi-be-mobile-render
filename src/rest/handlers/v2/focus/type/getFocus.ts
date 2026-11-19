import { CctvStream } from "@/services/type/backendApiHubnet";
import { AggregateItem } from "../../../moda/type/common";

export interface TransportationMetrics extends AggregateItem { }

export interface TransportationData {
  idLocation: string;
  location: string;
  province: string;
  city: string;
  moda: string;
  seasonal?: Record<string, TransportationMetrics>;
  daily?: Record<string, TransportationMetrics>;
  weekly?: Record<string, TransportationMetrics>;
  monthly?: Record<string, TransportationMetrics>;
  yearly?: Record<string, TransportationMetrics>;
}

interface Video {
  judul: string;
  link: string;
}

export interface Weather {
  location: string;
  province: string;
  image: string;
  temperature: number;
  description: string;
}

export interface Focus {
  id: number;
  idUser: string;
  judul: string;
  simpulTransportasi?: TransportationData[];
  cctv: CctvStream[];
  video30s: Video[];
  videoLiveStreaming: Video[];
  createDate: string;
  updateDate: string;
  weather: Weather[];
}

export interface FocusResponse {
  success: boolean;
  data: Focus;
}
