export interface StationContact {
  name: string;
  role: string;
  phone: string;
  email?: string;
  authKey?: string;
}

export interface FuelGrade {
  id: 'petrol' | 'diesel';
  name: string;
  fullName: string;
  subTitle: string;
  rate: number;
  flowRate: string;
  status: string;
  isReady: boolean;
}

export interface CCTVFeed {
  id: string;
  camCode: string;
  title: string;
  bayName: string;
  cluster: string;
  status: 'REC' | 'LIVE' | 'STANDBY';
  isLocked: boolean;
  activeFueling?: string;
  flowRate?: string;
  currentVehicle?: string;
  queueStatus?: string;
  drivewaySpeed?: string;
}

export interface CCTVQueueItem {
  id: string;
  type: 'customer' | 'transporter';
  name: string;
  phone: string;
  vehicleNumber: string;
  targetBay: string;
  amountPaid: number;
  utrNumber: string;
  requestedAgo: string;
  managerStatus: 'PENDING' | 'CHECKING' | 'VERIFIED';
  ownerStatus: 'PENDING' | 'ARMED' | 'APPROVED' | 'ACTIVE';
  activeStreamDurationSeconds?: number;
}

export interface PaytmTransaction {
  id: string;
  amount: number;
  customerName: string;
  utrNumber: string;
  description: string;
  status: 'PENDING' | 'AUTO_MATCHED' | 'APPROVED' | 'DISPUTED' | 'EXPIRED';
  timestamp: string;
  tokenCode?: string;
}

export interface UndergroundTank {
  id: string;
  name: string;
  fuelType: string;
  currentLitres: number;
  capacityLitres: number;
  percentage: number;
  density: string;
  certNumber: string;
}

export interface TrafficTelemetry {
  totalVehicles: number;
  trendPercentage: number;
  trucks: number;
  cars: number;
  bikes: number;
  peakStatus: string;
}

export interface TransporterRecord {
  vehiclePlate: string;
  transporterName: string;
  driverName: string;
  phone: string;
  hasActiveMonthlyPass: boolean;
  passExpiryDate: string;
  pin: string;
  recentTrips: Array<{
    date: string;
    litres: number;
    fuelType: string;
    amount: number;
    bay: string;
    invoiceNo: string;
  }>;
}

export type ViewScreen = 
  | 'customer-booking'
  | 'live-cctv'
  | 'transporter-portal'
  | 'master-control'
  | 'desktop-dispatcher';

export type DeviceMode = 'responsive' | 'mobile-simulated' | 'desktop-wide';
