export type AggregateItem = {
  arrival?: number;
  departure?: number;
  vehicleArrival?: number;
  vehicleDeparture?: number;
};

export interface AggregateGraphData {
  weekly: Record<string, AggregateItem>;
  monthly: Record<string, AggregateItem>;
  yearly: Record<string, AggregateItem>;
  seasonal?: Record<string, AggregateItem>;
}

export interface AggregateChartData {
  idLocation: number;
  date: string;
  province: string;
  name: string;
  departure: number;
  arrival: number;
  vehicleDeparture: number;
  vehicleArrival: number;
}

export interface AggregateChartFlightData {
  passengers: {
    domestic: number;
    outbound: number;
    inbound: number;
  };
  aircraft: {
    domestic: number;
    outbound: number;
    inbound: number;
  };
}

export interface AggregateChartSailingData {
  passengers: {
    domestic: number;
    outbound: number;
    inbound: number;
  };
  ship: {
    domestic: number;
    outbound: number;
    inbound: number;
  };
}

export interface RegionalResponse {
  status: boolean;
  message: string;
  data: {
    graph: AggregateGraphData;
    list: RegionalListData[];
  };
}

export interface RegionalDetailResponse {
  status: boolean;
  message: string;
  data: AggregateGraphData;
}

export interface RegionalListData {
  idLocation: number;
  name: string;
  city: string;
  type: string;
  departure: number;
  arrival: number;
  vehicleDeparture: number;
  vehicleArrival: number;
  longitude: string;
  latitude: string;
  coordinate: string;
  timezone: string;
}

export interface AggregateChartCapacitytData {
  motor: number;
  roda4: number;
  bus: number;
  truk: number;
  roda4lebih: number;
}

interface OdChartData {
  idOrigin: string;
  origin: string;
  idDestination: string;
  destination: string;
  departure: string;
  arrival: string;
  vehicleDeparture: string;
  vehicleArrival: string;
}

export interface OdResponse {
  status: boolean;
  message: string;
  data: OdChartData[];
}

export interface OdDetailResponse {
  status: boolean;
  message: string;
  data: {
    origin?: AggregateGraphData;
    destination?: AggregateGraphData;
  };
}

export interface OdDetailMappedResponse {
  [key: string]: any;
  origin?: AggregateGraphData;
  destination?: AggregateGraphData;
}

export interface OperatorData {
  id: string;
  name: string;
  logo: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  contactLocation: string;
  addressLongLat: string;
  fleetSize: number;
  passengerCount: number;
  otpRate: number;
  documents: {
    id: number;
    name: string;
    type: string;
    fileUrl: string;
  }[];
}

export interface OperatorResponse {
  data: OperatorData[];
}

export interface OperatorFleetData {
  id: string;
  name: string;
  location: string;
  plateNumber: string;
  brand: string;
  wheelCount: number;
  maxPassengerCount: number;
  documents: {
    id: number;
    name: string;
    type: string;
    fileUrl: string;
  }[];
}

export interface OperatorOdData {
  id: string;
  name: string;
  origin: string;
  destination: string;
}

export const mapColumnSort = (column: string) => {
  switch (column) {
    case "name":
      return "DataSaranaBus.namaPo";
    case "plateNumber":
      return "DataSaranaBus.noPol";
    default:
      return "DataSaranaBus.namaPo";
  }
};
