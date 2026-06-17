export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface MeterDto {
  id: string;
  _type: string[];
  area: {
    id: string;
  };
  is_automatic: boolean | null;
  description: string | null;
  installation_date: string;
  initial_values: number[];
}

export interface AreaDto {
  id: string;
  number: number;
  str_number: string;
  str_number_full: string;
  house: {
    address: string;
    id: string;
  };
}

export type MeterKind =
  | 'ColdWaterAreaMeter'
  | 'HotWaterAreaMeter'
  | 'HeatAreaMeter'
  | 'ElectricityAreaMeter'
  | 'unknown';
