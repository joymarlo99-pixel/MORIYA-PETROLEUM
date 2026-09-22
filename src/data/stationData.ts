import { CCTVFeed, CCTVQueueItem, PaytmTransaction, UndergroundTank, TrafficTelemetry, TransporterRecord } from '../types';

export const STATION_METADATA = {
  name: 'MORIYA PETROLEUM',
  alternateName: 'MORYA PETROLEUM',
  company: 'Indian Oil Corporation Limited (IOCL)',
  outletNumber: '24391',
  location: 'State Highway 40, Lakhnadon, Seoni, MP 480886',
  junctionText: 'NH-34 / SH-40 Junction, Lakhnadon, MP',
  license: 'PESO Licensed Corridor Station',
  pesoCert: 'PESO-2025/LKH',
  helpdesk: '1800-2333-555',
  upiId: 'paytm.s1pmcch@pty',
  nodeId: 'lakhnadon-nh34-hub-01',
  automationVersion: 'Automation V8.4 Active',
  rating: 4.9,
  reviewsCount: '1,480+ highway reviews',
  operationalStatus: '24/7 OPERATIONAL • 8 BAYS ACTIVE',
  sovereignOwner: {
    name: 'Yash Dehariya',
    role: 'STATION SOVEREIGN',
    email: 'yashdehariya99@gmail.com',
    phone: '+91 97522 58189',
    authKey: 'MP-OWNER-KEY-****-9942',
  },
  manager: {
    name: 'Rahul Dehariya',
    role: 'FORECOURT MANAGER',
    phone: '+91 62648 01050',
    delegation: 'Delegated Verification',
  },
};

export const INITIAL_RATES = {
  petrol: 115.23,
  diesel: 100.30,
};

export const INITIAL_CCTV_FEEDS: CCTVFeed[] = [
  {
    id: 'cam-01',
    camCode: 'CAM-01 • REC',
    title: 'Bay 1: Heavy Trucks & Buses',
    bayName: 'North Dispenser Cluster • 4 Active Nozzles',
    cluster: 'High-Flow Diesel (HSD) 42 L/m',
    status: 'REC',
    isLocked: true,
    activeFueling: 'High-Flow Diesel (HSD)',
    flowRate: '42 L/m',
    currentVehicle: 'Trk MP-20-HA-8841',
  },
  {
    id: 'cam-02',
    camCode: 'CAM-02 • REC',
    title: 'Bay 2: Cars & Bikes',
    bayName: 'Fast Queue (1 Min)',
    cluster: 'Motor Spirit (XP95 / MS)',
    status: 'REC',
    isLocked: false,
    activeFueling: 'Idle',
    queueStatus: 'Nozzle 03 Holstered',
  },
  {
    id: 'cam-03',
    camCode: 'CAM-03 • REC',
    title: 'Bay 3: ATM Forecourt',
    bayName: 'Air & Nitrogen Zone',
    cluster: 'Driveway Speed < 10 km/h',
    status: 'REC',
    isLocked: false,
    activeFueling: 'Forecourt / Air / ATM',
    queueStatus: '1 In Queue',
    drivewaySpeed: '< 10 km/h',
  },
];

export const INITIAL_CCTV_QUEUE: CCTVQueueItem[] = [
  {
    id: 'queue-1',
    type: 'customer',
    name: 'Suresh Verma',
    phone: '+91 94251 77210',
    vehicleNumber: 'MP-28-C-1904',
    targetBay: 'Bay 1 High-Flow',
    amountPaid: 5,
    utrNumber: '409822319081',
    requestedAgo: '2m ago',
    managerStatus: 'VERIFIED',
    ownerStatus: 'PENDING',
    activeStreamDurationSeconds: 0,
  },
  {
    id: 'queue-2',
    type: 'transporter',
    name: 'Balaji Logistics (Driver Ratan)',
    phone: '+91 78790 12450',
    vehicleNumber: 'MH-40-BL-9912',
    targetBay: 'Bay 1 High-Flow',
    amountPaid: 25,
    utrNumber: '409822318442',
    requestedAgo: '6m ago',
    managerStatus: 'CHECKING',
    ownerStatus: 'ARMED',
    activeStreamDurationSeconds: 0,
  },
];

export const INITIAL_PAYTM_TRANSACTIONS: PaytmTransaction[] = [
  {
    id: 'tx-1',
    amount: 5,
    customerName: 'Suresh Verma',
    utrNumber: '409822319081',
    description: 'Camera Token #TK-9021 • Bay 1 Diesel',
    status: 'PENDING',
    timestamp: 'Just now',
    tokenCode: '#TK-9021',
  },
  {
    id: 'tx-2',
    amount: 25,
    customerName: 'Balaji Logistics Fleet',
    utrNumber: '409822318442',
    description: 'Monthly Transporter Pass Renew',
    status: 'AUTO_MATCHED',
    timestamp: '4m ago',
    tokenCode: '#FLT-8891',
  },
  {
    id: 'tx-3',
    amount: 5,
    customerName: 'Harish Gond',
    utrNumber: '409822316119',
    description: 'Camera Token #TK-9020 • Bay 2 Petrol',
    status: 'EXPIRED',
    timestamp: '22m ago',
    tokenCode: '#TK-9020',
  },
];

export const INITIAL_TANKS: UndergroundTank[] = [
  {
    id: 'tank-01',
    name: 'Underground Tank 01',
    fuelType: 'MS Petrol',
    currentLitres: 14200,
    capacityLitres: 20000,
    percentage: 71.0,
    density: '828.4 kg/m³ @ 15°C',
    certNumber: 'PESO-2025/LKH',
  },
  {
    id: 'tank-02',
    name: 'Underground Tank 02',
    fuelType: 'HSD Diesel',
    currentLitres: 28500,
    capacityLitres: 40000,
    percentage: 71.2,
    density: '834.1 kg/m³ @ 15°C',
    certNumber: 'PESO-2025/LKH',
  },
];

export const INITIAL_TRAFFIC: TrafficTelemetry = {
  totalVehicles: 642,
  trendPercentage: 18,
  trucks: 214,
  cars: 198,
  bikes: 230,
  peakStatus: 'SH-40 Lakhnadon Corridor Peak Time',
};

export const INITIAL_TRANSPORTERS: Record<string, TransporterRecord> = {
  'MP-20-HB-1234': {
    vehiclePlate: 'MP-20-HB-1234',
    transporterName: 'Maa Narmada Roadways',
    driverName: 'Vikram Patel',
    phone: '+91 98261 44520',
    hasActiveMonthlyPass: true,
    passExpiryDate: '28-Oct-2026',
    pin: '445201',
    recentTrips: [
      { date: '21-Sep-2026 23:45', litres: 280, fuelType: 'HSD Diesel', amount: 28084, bay: 'Bay 01', invoiceNo: 'INV-MP-8831' },
      { date: '18-Sep-2026 04:10', litres: 310, fuelType: 'HSD Diesel', amount: 31093, bay: 'Bay 02', invoiceNo: 'INV-MP-8712' },
      { date: '12-Sep-2026 19:20', litres: 250, fuelType: 'HSD Diesel', amount: 25075, bay: 'Bay 01', invoiceNo: 'INV-MP-8540' },
    ],
  },
  'MH-40-BL-9912': {
    vehiclePlate: 'MH-40-BL-9912',
    transporterName: 'Balaji Logistics Corp',
    driverName: 'Ratan Singh',
    phone: '+91 78790 12450',
    hasActiveMonthlyPass: true,
    passExpiryDate: '15-Nov-2026',
    pin: '787901',
    recentTrips: [
      { date: '22-Sep-2026 02:15', litres: 420, fuelType: 'HSD Diesel', amount: 42126, bay: 'Bay 01', invoiceNo: 'INV-MP-8910' },
      { date: '15-Sep-2026 05:40', litres: 380, fuelType: 'HSD Diesel', amount: 38114, bay: 'Bay 01', invoiceNo: 'INV-MP-8622' },
    ],
  },
};
