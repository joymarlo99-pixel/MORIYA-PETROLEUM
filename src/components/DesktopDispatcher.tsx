import React, { useState } from 'react';
import { UndergroundTank, TrafficTelemetry } from '../types';
import { STATION_METADATA } from '../data/stationData';
import { PaytmQrStand } from './PaytmQrStand';
import { ASSETS } from '../assets';
import { 
  Fuel, 
  QrCode, 
  Copy, 
  Check, 
  Radio, 
  ShieldCheck, 
  Zap, 
  Truck, 
  Droplet, 
  Wind, 
  Activity, 
  AlertCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface DesktopDispatcherProps {
  petrolRate: number;
  dieselRate: number;
  tanks: UndergroundTank[];
  traffic: TrafficTelemetry;
  onOpenQrModal: (title: string, amount: number, purpose: string, token: string) => void;
  onOpenIntercom: (bay: string) => void;
}

export const DesktopDispatcher: React.FC<DesktopDispatcherProps> = ({
  petrolRate,
  dieselRate,
  tanks,
  traffic,
  onOpenQrModal,
  onOpenIntercom,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<'petrol' | 'diesel'>('petrol');
  const [presetVolume, setPresetVolume] = useState<number>(10);
  const [vehiclePlateInput, setVehiclePlateInput] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [enteredUtr, setEnteredUtr] = useState('');
  const [isVerifyingUtr, setIsVerifyingUtr] = useState(false);
  const [utrSuccessMsg, setUtrSuccessMsg] = useState<string | null>(null);

  const activeRate = selectedProduct === 'petrol' ? petrolRate : dieselRate;
  const currentTotal = presetVolume * activeRate;
  const tokenCode = '#MP-LKH-9482';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(STATION_METADATA.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleVerifyUtr = () => {
    setIsVerifyingUtr(true);
    setTimeout(() => {
      setIsVerifyingUtr(false);
      setUtrSuccessMsg(`UTR ${enteredUtr || '409822319081'} Verified • Bay #04 unlocked for ${presetVolume}L!`);
      setTimeout(() => setUtrSuccessMsg(null), 5000);
    }, 1000);
  };

  const handlePayNow = () => {
    onOpenQrModal(
      `Forecourt Dispatcher: ${tokenCode}`,
      currentTotal,
      `${presetVolume}L ${selectedProduct === 'petrol' ? 'Petrol MS' : 'Diesel HSD'} • Bay #04`,
      tokenCode
    );
  };

  return (
    <div className="space-y-5 max-w-6xl mx-auto animate-fadeIn">
      {/* Top Banner Strip (Image 10.png) */}
      <div className="bg-[#1c1b1b] border border-neutral-800 rounded-xl p-4 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/40 font-mono text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#34d399] animate-ping"></span>
                {STATION_METADATA.operationalStatus}
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                Dispenser Grid: 8 Bays Active • 100% Online
              </span>
              <span className="text-neutral-600 hidden sm:inline">|</span>
              <span className="text-xs text-neutral-400 font-mono">
                Supply: IOCL Jabalpur Terminal 24/7
              </span>
            </div>

            <h2 className="font-condensed text-2xl sm:text-3xl font-bold text-white tracking-wide uppercase mt-1">
              {STATION_METADATA.name} — INDIAN OIL RETAIL OUTLET #{STATION_METADATA.outletNumber}
            </h2>
            <p className="text-xs text-neutral-400">
              State Highway 40, Lakhnadon, Seoni, MP 480886 • Junction NH-34 / SH-40
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#121212] p-3 rounded-xl border border-neutral-800 flex-shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Forecourt Manager On-Duty</span>
              <span className="text-sm font-bold text-white block">{STATION_METADATA.manager.name}</span>
              <span className="text-xs text-[#34d399] font-mono">{STATION_METADATA.manager.phone}</span>
            </div>
            <button
              onClick={() => onOpenIntercom('Manager Desk')}
              className="p-2.5 bg-[#252525] hover:bg-[#303030] text-neutral-200 rounded-lg border border-neutral-700 transition-colors"
              title="Intercom to Manager Desk"
            >
              <Radio className="w-4 h-4 text-[#ff6b00]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Dual-Column Terminal & Payment Desk (Image 10.png) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Visual Dispenser Terminal (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Fuel className="w-5 h-5 text-[#ff6b00]" />
                <h3 className="font-condensed text-xl font-bold text-white tracking-wide uppercase">
                  VISUAL DISPENSER TERMINAL
                </h3>
              </div>
              <span className="text-xs font-mono text-[#34d399] bg-[#34d399]/15 px-2 py-0.5 rounded font-bold">
                Auto Dispatch Ready
              </span>
            </div>

            {/* Fuel Product Selector with Flow Rates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Petrol Card */}
              <div
                onClick={() => setSelectedProduct('petrol')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedProduct === 'petrol'
                    ? 'bg-[#18261e] border-[#34d399] ring-2 ring-[#34d399]/30 shadow-md'
                    : 'bg-[#121212] border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-condensed text-lg font-bold text-[#34d399] uppercase">
                    Petrol (MS)
                  </span>
                  <span className="text-xs font-mono text-neutral-400">38 L/min</span>
                </div>
                <div className="my-2">
                  <span className="font-condensed text-3xl font-extrabold text-white">
                    ₹{petrolRate.toFixed(2)}
                  </span>
                  <span className="text-xs text-neutral-400"> / Litre</span>
                </div>
                <span className="text-[11px] text-neutral-400 block">
                  BS-VI Motor Spirit • Multi-Valve Nozzle
                </span>
              </div>

              {/* Diesel Card */}
              <div
                onClick={() => setSelectedProduct('diesel')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedProduct === 'diesel'
                    ? 'bg-[#2a2417] border-amber-400 ring-2 ring-amber-400/30 shadow-md'
                    : 'bg-[#121212] border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-condensed text-lg font-bold text-amber-400 uppercase">
                    Diesel (HSD)
                  </span>
                  <span className="text-xs font-mono text-[#ff6b00] font-bold">65 L/min High-Flow</span>
                </div>
                <div className="my-2">
                  <span className="font-condensed text-3xl font-extrabold text-white">
                    ₹{dieselRate.toFixed(2)}
                  </span>
                  <span className="text-xs text-neutral-400"> / Litre</span>
                </div>
                <span className="text-[11px] text-neutral-400 block">
                  Turbo Heavy Logistics • Corridor Canopy
                </span>
              </div>
            </div>

            {/* Quick Volume Presets */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                Dispenser Volume Presets
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 20, 45].map((vol) => (
                  <button
                    key={vol}
                    onClick={() => setPresetVolume(vol)}
                    className={`py-3 rounded-lg font-condensed text-base font-bold transition-all ${
                      presetVolume === vol
                        ? 'bg-[#ff6b00] text-white shadow-md'
                        : 'bg-[#121212] text-neutral-300 border border-neutral-800 hover:bg-[#202020]'
                    }`}
                  >
                    {vol === 45 ? 'Full Tank (45L)' : `${vol} Litres`}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Vehicle Plate (Optional) */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                Target Vehicle Registration Plate (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. MP-20-HA-8841"
                value={vehiclePlateInput}
                onChange={(e) => setVehiclePlateInput(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 bg-[#121212] border border-neutral-700 rounded-lg text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff6b00] uppercase"
              />
            </div>

            {/* Summary & Pass Generator */}
            <div className="bg-[#121212] border border-neutral-800 p-4 rounded-xl flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-[11px] text-neutral-400 uppercase block font-semibold">Total Payable</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-condensed text-3xl font-extrabold text-[#ff6b00]">
                    ₹{currentTotal.toFixed(2)}
                  </span>
                  <span className="text-xs text-neutral-400">
                    ({presetVolume}L {selectedProduct === 'petrol' ? 'Petrol' : 'Diesel'})
                  </span>
                </div>
              </div>

              <button
                onClick={handlePayNow}
                className="px-6 py-3 bg-[#ff6b00] hover:bg-[#ff7b1a] text-white font-condensed text-base font-bold uppercase tracking-wider rounded-lg shadow flex items-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>GENERATE FAST FUEL PASS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Digital Pump Pay (5 cols) (Image 10.png) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#ff6b00]" />
                <h3 className="font-condensed text-xl font-bold text-white tracking-wide uppercase">
                  DIGITAL PUMP PAY
                </h3>
              </div>
              <span className="font-mono text-xs text-neutral-400">
                TOKEN {tokenCode}
              </span>
            </div>

            {/* High-Resolution Scannable Authentic Paytm QR Stand */}
            <div className="py-1">
              <PaytmQrStand amount={currentTotal} purpose={`${presetVolume}L Fuel`} size={170} showActions={false} />
            </div>

            {/* UPI ID with 1-click Copy */}
            <div className="flex items-center justify-between bg-[#121212] border border-neutral-800 px-3 py-2 rounded-lg text-xs font-mono">
              <div className="truncate mr-2">
                <span className="text-neutral-500">UPI: </span>
                <span className="text-white font-bold">{STATION_METADATA.upiId}</span>
              </div>
              <button
                onClick={handleCopyUpi}
                className="px-2 py-1 bg-[#252525] hover:bg-[#333333] text-[11px] text-[#ff6b00] font-sans font-semibold rounded flex items-center gap-1 transition-colors flex-shrink-0"
              >
                {copiedUpi ? <Check className="w-3 h-3 text-[#34d399]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* UTR Verification Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                Enter 12-Digit Bank UTR for Instant Unlock
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. 409822319081"
                  value={enteredUtr}
                  onChange={(e) => setEnteredUtr(e.target.value)}
                  className="w-full px-3 py-2 bg-[#121212] border border-neutral-700 rounded-lg text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff6b00]"
                />
                <button
                  disabled={isVerifyingUtr}
                  onClick={handleVerifyUtr}
                  className="px-4 py-2 bg-[#34d399] hover:bg-[#2fc28c] text-neutral-950 font-condensed font-bold text-xs uppercase rounded-lg disabled:opacity-50 transition-colors"
                >
                  {isVerifyingUtr ? 'Verifying...' : 'VERIFY'}
                </button>
              </div>
            </div>

            {utrSuccessMsg && (
              <div className="p-2.5 bg-[#14261b] border border-[#34d399] text-[#34d399] text-xs font-mono rounded-lg flex items-center gap-1.5 animate-fadeIn">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>{utrSuccessMsg}</span>
              </div>
            )}

            {/* Station Desk Intercom shortcut */}
            <button
              onClick={() => onOpenIntercom('Bay #04')}
              className="w-full py-2.5 bg-[#252525] hover:bg-[#303030] text-neutral-300 rounded-lg border border-neutral-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Radio className="w-3.5 h-3.5 text-[#ff6b00]" />
              <span>Station Desk Intercom (Bay 04 Audio)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Underground Storage Tank Telemetry Gauges (Image 10.png) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-[#34d399]" />
            <h3 className="font-condensed text-xl font-bold text-white tracking-wide uppercase">
              UNDERGROUND TANK LEVEL TELEMETRY
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            Automated ATGs • PESO Licensed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tanks.map((tank) => (
            <div key={tank.id} className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-4 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-condensed text-lg font-bold text-white uppercase">
                    {tank.name} ({tank.fuelType})
                  </h4>
                  <span className="text-xs text-neutral-400 font-mono">
                    Density: {tank.density}
                  </span>
                </div>
                <span className="font-condensed text-2xl font-extrabold text-white">
                  {tank.percentage.toFixed(1)}%
                </span>
              </div>

              {/* Tank Fill Bar */}
              <div className="relative h-4 bg-[#121212] rounded-full overflow-hidden border border-neutral-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    tank.fuelType.includes('Petrol')
                      ? 'bg-gradient-to-r from-emerald-600 to-[#34d399]'
                      : 'bg-gradient-to-r from-amber-600 to-amber-400'
                  }`}
                  style={{ width: `${tank.percentage}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
                <span>Current: <strong>{tank.currentLitres.toLocaleString('en-IN')} L</strong></span>
                <span className="text-neutral-500">Max: {tank.capacityLitres.toLocaleString('en-IN')} L</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Highway Traffic Telemetry (Image 10.png) */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-4 shadow-md space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#ff6b00]" />
            <h3 className="font-condensed text-lg font-bold text-white tracking-wide uppercase">
              Today's Highway Traffic Telemetry
            </h3>
          </div>
          <span className="text-xs font-mono text-[#34d399] bg-[#34d399]/15 px-2 py-0.5 rounded flex items-center gap-1 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            +{traffic.trendPercentage}% vs Corridor 30-Day Avg
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-[#121212] border border-neutral-800 p-3 rounded-xl">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Total Vehicles Dispensed</span>
            <span className="font-condensed text-2xl font-extrabold text-white mt-1 block">
              {traffic.totalVehicles}
            </span>
          </div>
          <div className="bg-[#121212] border border-neutral-800 p-3 rounded-xl">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Heavy Logistics Trucks</span>
            <span className="font-condensed text-2xl font-extrabold text-amber-400 mt-1 block">
              {traffic.trucks}
            </span>
          </div>
          <div className="bg-[#121212] border border-neutral-800 p-3 rounded-xl">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Passenger Cars</span>
            <span className="font-condensed text-2xl font-extrabold text-blue-400 mt-1 block">
              {traffic.cars}
            </span>
          </div>
          <div className="bg-[#121212] border border-neutral-800 p-3 rounded-xl">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Two-Wheelers & Local</span>
            <span className="font-condensed text-2xl font-extrabold text-[#34d399] mt-1 block">
              {traffic.bikes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
