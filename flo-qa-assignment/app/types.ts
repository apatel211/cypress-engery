export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type EnergyUsage = {
  records: EnergyUsageRecord[];
};

export type EnergyUsageRecord = EnergyUsageFormData & {
  id: string;
};

export type EnergyUsageFormData = {
  nmi?: string;
  timestamp?: string;
  consumption?: number;
  unit?: 'kWh';
};
