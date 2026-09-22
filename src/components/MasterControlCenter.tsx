import React, { useState } from 'react';
import { CCTVFeed, CCTVQueueItem, PaytmTransaction } from '../types';
import { STATION_METADATA } from '../data/stationData';
import { ASSETS } from '../assets';
import { 
  ShieldAlert, 
  UserCheck, 
  Radio, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Zap, 
  DollarSign, 
  Search, 
  QrCode, 
  Terminal, 
  PhoneCall, 
  Key, 
  PowerOff,
  Video,
  Lock,
  Unlock,
  RefreshCw
} from 'lucide-react';

interface MasterControlCenterProps {
  cctvFeeds: CCTVFeed[];
  queueItems: CCTVQueueItem[];
  onUpdateQueueItem: (id: string, updates: Partial<CCTVQueueItem>) => void;
  paytmTransactions: PaytmTransaction[];
  onApproveTransaction: (id: string) => void;
  petrolRate: number;
  dieselRate: number;
  onUpdateRates: (petrol: number, diesel: number) => void;
  isEmergencyLocked: boolean;
  onToggleEmergencyLock: () => void;
  onOpenIntercom: (bay: string) => void;
}

export const MasterControlCenter: React.FC<MasterControlCenterProps> = ({
  cctvFeeds,
  queueItems,
  onUpdateQueueItem,
  paytmTransactions,
  onApproveTransaction,
  petrolRate,
  dieselRate,
  onUpdateRates,
  isEmergencyLocked,
  onToggleEmergencyLock,
  onOpenIntercom,
}) => {
  const [tempPetrol, setTempPetrol] = useState(petrolRate);
  const [tempDiesel, setTempDiesel] = useState(dieselRate);
  const [ownerKeyInput, setOwnerKeyInput] = useState('');
  const [showKillModal, setShowKillModal] = useState(false);
  const [utrSearch, setUtrSearch] = useState('');
  const [rateToast, setRateToast] = useState<string | null>(null);

  const handleApplyRates = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateRates(tempPetrol, tempDiesel);
    setRateToast(`Rates updated with Owner Sovereign Key (RO #${STATION_METADATA.outletNumber}): Petrol ₹${tempPetrol.toFixed(2)} | Diesel ₹${tempDiesel.toFixed(2)}`);
    setTimeout(() => setRateToast(null), 4000);
  };

  const handleManagerApprove = (id: string) => {
    onUpdateQueueItem(id, { managerStatus: 'VERIFIED' });
  };

  const handleOwnerUnlock = (id: string) => {
    onUpdateQueueItem(id, { ownerStatus: 'APPROVED', activeStreamDurationSeconds: 900 });
  };

  const filteredTransactions = paytmTransactions.filter(tx => 
    !utrSearch || tx.utrNumber.includes(utrSearch) || tx.customerName.toLowerCase().includes(utrSearch.toLowerCase())
  );

  return (
    <div className="space-y-4 max-w-6xl mx-auto animate-fadeIn">
      {/* Top Station Sovereign & Forecourt Manager Identity Cards (Image 6.png) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Sovereign Yash Dehariya */}
        <div className="bg-gradient-to-r from-[#201815] to-[#181413] border border-[#ff6b00]/40 rounded-xl p-4 shadow-lg flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#ff6b00]/20 border border-[#ff6b00]/50 flex items-center justify-center text-[#ff6b00] flex-shrink-0">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#ff6b00] uppercase font-bold tracking-wider block">
                {STATION_METADATA.sovereignOwner.role}
              </span>
              <h3 className="font-condensed text-xl font-bold text-white uppercase">
                {STATION_METADATA.sovereignOwner.name}
              </h3>
              <p className="text-xs text-neutral-300 font-mono mt-0.5">
                {STATION_METADATA.sovereignOwner.email}
              </p>
              <p className="text-xs text-neutral-400 font-mono">
                {STATION_METADATA.sovereignOwner.phone}
              </p>
            </div>
          </div>
          <span className="px-2 py-1 bg-black/50 border border-neutral-700 text-neutral-400 font-mono text-[10px] rounded">
            {STATION_METADATA.sovereignOwner.authKey}
          </span>
        </div>

        {/* Forecourt Manager Rahul Dehariya */}
        <div className="bg-gradient-to-r from-[#17221b] to-[#131a15] border border-[#34d399]/40 rounded-xl p-4 shadow-lg flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#34d399]/20 border border-[#34d399]/50 flex items-center justify-center text-[#34d399] flex-shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#34d399] uppercase font-bold tracking-wider block">
                {STATION_METADATA.manager.role}
              </span>
              <h3 className="font-condensed text-xl font-bold text-white uppercase">
                {STATION_METADATA.manager.name}
              </h3>
              <p className="text-xs text-neutral-300 font-mono mt-0.5">
                {STATION_METADATA.manager.phone}
              </p>
              <p className="text-xs text-[#34d399] font-medium">
                {STATION_METADATA.manager.delegation}
              </p>
            </div>
          </div>
          <span className="px-2 py-1 bg-[#34d399]/20 text-[#34d399] font-mono text-[10px] font-bold rounded flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-ping"></span>
            VERIFIED ACTIVE
          </span>
        </div>
      </div>

      {/* Mini Forecourt Bay Feeds (3 Monitors with Audio Trigger) */}
      <div className="bg-[#181818] border border-neutral-800 rounded-xl p-4 space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-[#ff6b00]" />
            <h3 className="font-condensed text-base font-bold text-white tracking-wide uppercase">
              Live Forecourt Bay Feeds (Surveillance Matrix)
            </h3>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            {STATION_METADATA.nodeId}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {cctvFeeds.map((feed) => (
            <div key={feed.id} className="bg-[#121212] border border-neutral-800 rounded-lg overflow-hidden">
              <div className="px-2.5 py-1 bg-[#201f1f] border-b border-neutral-800 flex items-center justify-between text-[11px] font-mono">
                <span className="text-red-400 font-bold">{feed.camCode}</span>
                <span className="text-neutral-400 truncate">{feed.title}</span>
              </div>
              <div className="relative h-28 bg-black overflow-hidden flex items-center justify-center">
                <img 
                  src={ASSETS.cctvForecourt} 
                  alt={feed.title} 
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-1 left-2 text-[10px] font-mono text-white bg-black/60 px-1 rounded">
                  {feed.cluster}
                </div>
              </div>
              <div className="p-2 flex items-center justify-between text-xs">
                <span className="text-neutral-400 text-[11px]">{feed.activeFueling}</span>
                <button
                  onClick={() => onOpenIntercom(feed.title)}
                  className="px-2 py-0.5 rounded bg-[#252525] hover:bg-[#333333] text-neutral-200 text-[11px] border border-neutral-700 flex items-center gap-1"
                >
                  <Radio className="w-3 h-3 text-[#ff6b00]" />
                  <span>Intercom</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Step CCTV Access Queue (Directly from Image 6.png) */}
      <div className="bg-[#1c1b1b] border border-neutral-800 rounded-xl p-4 space-y-3 shadow-md">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-condensed text-lg font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              2-STEP CCTV ACCESS QUEUE
            </h3>
            <p className="text-xs text-neutral-400">Step 1: Physical Bay Clearance (Rahul) ➔ Step 2: Sovereign Stream Key Release (Yash)</p>
          </div>
          <span className="text-xs font-mono bg-neutral-800 text-neutral-300 px-2 py-1 rounded">
            {queueItems.length} Requests Pending
          </span>
        </div>

        <div className="space-y-3">
          {queueItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#141414] border border-neutral-800 rounded-xl p-3.5 space-y-3"
            >
              {/* Request Header */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                    item.type === 'transporter'
                      ? 'bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {item.type}
                  </span>
                  <span className="font-condensed text-base font-bold text-white uppercase">
                    {item.name}
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    ({item.phone})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs bg-black/60 px-2 py-0.5 rounded text-neutral-300">
                    {item.vehicleNumber}
                  </span>
                  <span className="text-xs font-mono text-[#ff6b00] font-bold">
                    ₹{item.amountPaid} Paid
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    {item.requestedAgo}
                  </span>
                </div>
              </div>

              {/* Bay & UTR details */}
              <div className="flex items-center justify-between bg-black/30 p-2 rounded-lg text-xs font-mono flex-wrap gap-2">
                <div className="text-neutral-300">
                  Target: <span className="text-white font-bold">{item.targetBay}</span>
                </div>
                <div className="text-neutral-400">
                  UTR: <span className="text-neutral-200">{item.utrNumber}</span>
                </div>
              </div>

              {/* 2-Step Status Badges & Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {/* Step 1: Manager Rahul */}
                <div className="p-2.5 bg-[#1a1a1a] border border-neutral-800 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Step 1: Bay Physical Clearance</span>
                    <span className="text-xs text-neutral-300">Forecourt Manager Rahul</span>
                  </div>
                  {item.managerStatus === 'VERIFIED' ? (
                    <span className="px-2 py-1 bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/40 text-xs font-bold rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      VERIFIED
                    </span>
                  ) : (
                    <button
                      onClick={() => handleManagerApprove(item.id)}
                      className="px-2.5 py-1 bg-[#34d399] hover:bg-[#2fc28c] text-black font-condensed font-bold text-xs uppercase rounded transition-colors"
                    >
                      CONFIRM CHECK
                    </button>
                  )}
                </div>

                {/* Step 2: Sovereign Yash */}
                <div className="p-2.5 bg-[#1a1a1a] border border-neutral-800 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Step 2: Stream Token Key Release</span>
                    <span className="text-xs text-neutral-300">Sovereign Yash Dehariya</span>
                  </div>
                  {item.ownerStatus === 'APPROVED' ? (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/40 text-xs font-bold rounded flex items-center gap-1">
                      <Unlock className="w-3.5 h-3.5" />
                      STREAM ACTIVE (15M)
                    </span>
                  ) : (
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => onOpenIntercom(item.targetBay)}
                        className="px-2 py-1 bg-[#2a2a2a] hover:bg-[#353535] text-neutral-300 text-xs rounded border border-neutral-700"
                        title="Call Driver via Bay Pole Intercom"
                      >
                        Intercom
                      </button>
                      <button
                        onClick={() => handleOwnerUnlock(item.id)}
                        className="px-2.5 py-1 bg-[#ff6b00] hover:bg-[#ff7b1a] text-white font-condensed font-bold text-xs uppercase rounded transition-colors shadow"
                      >
                        Owner Unlock
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sovereign Master Controller: Live Rates & Emergency Power Trip (Image 6.png) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rate Controller Card */}
        <div className="bg-[#1c1b1b] border border-neutral-800 rounded-xl p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-condensed text-lg font-bold text-white tracking-wide uppercase flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-[#ff6b00]" />
              Sovereign Fuel Rate Controller
            </h3>
            <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded">
              RO #24391
            </span>
          </div>

          <form onSubmit={handleApplyRates} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {/* Petrol MS */}
              <div className="bg-[#121212] border border-neutral-700 p-3 rounded-lg">
                <span className="text-[11px] text-[#34d399] font-bold block uppercase">Petrol (MS BS-VI)</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-neutral-400 font-mono">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    value={tempPetrol}
                    onChange={(e) => setTempPetrol(parseFloat(e.target.value) || 0)}
                    className="w-full bg-transparent font-condensed text-2xl font-bold text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Diesel HSD */}
              <div className="bg-[#121212] border border-neutral-700 p-3 rounded-lg">
                <span className="text-[11px] text-amber-400 font-bold block uppercase">Diesel (HSD Turbo)</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-neutral-400 font-mono">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    value={tempDiesel}
                    onChange={(e) => setTempDiesel(parseFloat(e.target.value) || 0)}
                    className="w-full bg-transparent font-condensed text-2xl font-bold text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              id="apply-sovereign-rates-btn"
              type="submit"
              className="w-full py-2.5 bg-[#ff6b00] hover:bg-[#ff7b1a] text-white font-condensed font-bold text-sm tracking-wider uppercase rounded-lg shadow flex items-center justify-center gap-1.5 transition-all"
            >
              <Key className="w-4 h-4" />
              <span>APPLY RATES WITH OWNER SOVEREIGN KEY</span>
            </button>
          </form>

          {rateToast && (
            <div className="p-2 bg-[#12241a] border border-[#34d399] text-[#34d399] text-xs rounded-lg animate-fadeIn font-mono">
              {rateToast}
            </div>
          )}
        </div>

        {/* Emergency Forecourt Lockdown: KILL POWER (Image 6.png) */}
        <div className={`rounded-xl p-4 shadow-md space-y-3 border transition-colors ${
          isEmergencyLocked 
            ? 'bg-red-950/50 border-red-500' 
            : 'bg-[#1c1b1b] border-neutral-800'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className="font-condensed text-lg font-bold text-red-400 tracking-wide uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
              EMERGENCY FORECOURT LOCKDOWN
            </h3>
            <span className="text-[10px] font-mono text-red-400 bg-red-500/20 px-1.5 py-0.5 rounded font-bold">
              PESO SAFETY CRITICAL
            </span>
          </div>

          <p className="text-xs text-neutral-300">
            Tripping power cuts high-voltage solenoid valves on all 8 dispenser bays instantly. Used in fuel spills, lightning storms, or corridor emergencies.
          </p>

          <div className="p-3 bg-[#121212] rounded-lg border border-neutral-800 flex items-center justify-between text-xs font-mono">
            <span>DISPENSER CIRCUIT BREAKER:</span>
            <span className={`font-bold ${isEmergencyLocked ? 'text-red-500 animate-pulse' : 'text-emerald-400'}`}>
              {isEmergencyLocked ? 'DISENGAGED (POWER OFF)' : 'ENGAGED (POWER ACTIVE)'}
            </span>
          </div>

          <button
            id="emergency-kill-power-btn"
            onClick={onToggleEmergencyLock}
            className={`w-full py-3 font-condensed text-base font-extrabold tracking-wider uppercase rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all ${
              isEmergencyLocked
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            <PowerOff className="w-5 h-5" />
            <span>{isEmergencyLocked ? 'RESTORE FORECOURT POWER & RESET RELAY' : 'KILL POWER • TRIP ALL 8 BAYS'}</span>
          </button>
        </div>
      </div>

      {/* UPI Live Reconciliation Desk (Linked: paytm.s1pmcch@pty) (Image 6.png) */}
      <div className="bg-[#1c1b1b] border border-neutral-800 rounded-xl p-4 space-y-3 shadow-md">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#ff6b00]" />
            <div>
              <h3 className="font-condensed text-lg font-bold text-white tracking-wide uppercase">
                UPI LIVE RECONCILIATION DESK
              </h3>
              <span className="text-[11px] font-mono text-neutral-400">
                Linked: <strong className="text-neutral-200">{STATION_METADATA.upiId}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-1 bg-emerald-500/15 text-emerald-400 rounded border border-emerald-500/30">
              Desk QR Online
            </span>
            <span className="text-neutral-400">Today: 84 Tokens • 19 Fleet Passes</span>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Filter by 12-Digit UTR or Customer Name..."
            value={utrSearch}
            onChange={(e) => setUtrSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#121212] border border-neutral-700 rounded-lg text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff6b00]"
          />
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[10px]">
                <th className="py-2 px-2">Timestamp</th>
                <th className="py-2 px-2">Customer / Description</th>
                <th className="py-2 px-2">12-Digit UTR</th>
                <th className="py-2 px-2 text-right">Amount</th>
                <th className="py-2 px-2 text-center">Status</th>
                <th className="py-2 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="py-2.5 px-2 text-neutral-400 whitespace-nowrap">{tx.timestamp}</td>
                  <td className="py-2.5 px-2">
                    <span className="text-white font-bold block">{tx.customerName}</span>
                    <span className="text-neutral-400 text-[10px]">{tx.description}</span>
                  </td>
                  <td className="py-2.5 px-2 text-neutral-300">{tx.utrNumber}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-[#ff6b00]">₹{tx.amount.toFixed(2)}</td>
                  <td className="py-2.5 px-2 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tx.status === 'APPROVED' || tx.status === 'AUTO_MATCHED'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : tx.status === 'PENDING'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-neutral-700 text-neutral-400'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-right">
                    {tx.status === 'PENDING' ? (
                      <button
                        onClick={() => onApproveTransaction(tx.id)}
                        className="px-2.5 py-1 bg-[#34d399] hover:bg-[#2fc28c] text-black font-condensed font-bold text-xs uppercase rounded transition-colors"
                      >
                        Approve & Credit
                      </button>
                    ) : (
                      <span className="text-neutral-500 text-[11px]">Reconciled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Forecourt Telemetry & WSS Heartbeat Console */}
      <div className="bg-[#121212] border border-neutral-800 rounded-xl p-3 font-mono text-xs text-neutral-400 space-y-1">
        <div className="flex items-center justify-between text-neutral-300 border-b border-neutral-800 pb-1 text-[11px]">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Forecourt Telemetry (WSS //lakhnadon-nh34-hub-01:8080/stream)</span>
          </span>
          <span className="text-emerald-400">● 100% HEALTHY</span>
        </div>
        <p className="text-[11px] text-neutral-400">
          [03:41:00] NODE HEARTBEAT: lakhnadon-nh34-hub-01 • 8/8 DISPENSERS POLLING • AUTOMATION V8.4 ACTIVE
        </p>
        <p className="text-[11px] text-neutral-400">
          [03:41:04] TANK 01 (MS) DENSITY: 828.4 kg/m³ • TANK 02 (HSD) DENSITY: 834.1 kg/m³ • PESO AUDIT PASS
        </p>
      </div>
    </div>
  );
};
