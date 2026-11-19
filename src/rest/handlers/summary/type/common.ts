export interface SummaryDataGraph {
  name: string;
  count: number;
}

export interface SummaryDataVehicle {
  type: String;
  name: String;
  count: number;
  percent: number;
}

export interface SummaryDataNetwork {
  type: String;
  name: String;
  count: number;
  point: number;
}

export interface SummaryDataRecord {
  domestic: number;
  outbound: number;
  inbound: number;
}

export interface SummaryResponse {
  status: boolean;
  data: {
    graph: SummaryDataGraph[];
    vehicle: SummaryDataVehicle[];
    network: SummaryDataNetwork[];
    sailing?: {
      passengers: SummaryDataRecord;
      ship: SummaryDataRecord;
    };
    flight: {
      passengers: SummaryDataRecord;
      aircraft: SummaryDataRecord;
    };
  };
  filter: {
    event: number;
    provinsi: string;
    moda: string;
  };
}
