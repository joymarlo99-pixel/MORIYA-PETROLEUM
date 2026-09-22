import React, { useState } from 'react';
import { ASSETS } from '../assets';
import { STATION_METADATA } from '../data/stationData';
import { 
  Fuel, 
  QrCode, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Truck, 
  Coffee, 
  Shield, 
  Video, 
  Sparkles, 
  Zap, 
  ArrowRight,
  User,
  Clock,
  ThumbsUp
} from 'lucide-react';

interface CustomerFuelBookingProps {
  petrolRate: number;
  dieselRate: number;
  onOpenQrModal: (title: string, amount: number, purpose: string, token: string) => void;
  onNavigateToCctv: () => void;
  onNavigateToTransporter: () => void;
  onOpenIntercom: (bay: string) => void;
}

export const CustomerFuelBooking: React.FC<CustomerFuelBookingProps> = ({
  petrolRate,
  dieselRate,
  onOpenQrModal,
  onNavigateToCctv,
  onNavigateToTransporter,
  onOpenIntercom,
}) => {
  const [selectedFuel, setSelectedFuel] = useState<'petrol' | 'diesel'>('petrol');
  const [selectedVolume, setSelectedVolume] = useState<number | 'full'>(10);
  const [customLiters, setCustomLiters] = useState<number>(10);
  const [isFastLane, setIsFastLane] = useState(true);
  const [generatedPass, setGeneratedPass] = useState<{
    token: string;
    bay: string;
    fuelName: string;
    litres: number;
    totalAmount: number;
  } | null>(null);

  const activeRate = selectedFuel === 'petrol' ? petrolRate : dieselRate;
  const effectiveLitres = selectedVolume === 'full' ? 45 : (typeof selectedVolume === 'number' ? selectedVolume : customLiters);
  const estimatedTotal = effectiveLitres * activeRate;
  const rewardPoints = Math.round(effectiveLitres * 11.5);

  const handleSelectVolume = (vol: number | 'full') => {
    setSelectedVolume(vol);
    if (typeof vol === 'number') {
      setCustomLiters(vol);
    } else {
      setCustomLiters(45);
    }
  };

  const handleConfirmBay = () => {
    const token = `#MP-LKH-${Math.floor(1000 + Math.random() * 9000)}`;
    const bayNumber = selectedFuel === 'diesel' ? 'Bay #01 (High-Flow)' : 'Bay #04 (Auto Free)';
    setGeneratedPass({
      token,
      bay: bayNumber,
      fuelName: selectedFuel === 'petrol' ? 'BS-VI Motor Spirit (XP95)' : 'High Speed Diesel (HSD)',
      litres: effectiveLitres,
      totalAmount: estimatedTotal,
    });
  };

  const handlePayNow = () => {
    const token = generatedPass ? generatedPass.token : `#MP-LKH-${Math.floor(1000 + Math.random() * 9000)}`;
    onOpenQrModal(
      `Fast-Lane Pre-Fuel Token: ${token}`,
      estimatedTotal,
      `${effectiveLitres}L ${selectedFuel === 'petrol' ? 'Petrol' : 'Diesel'} at ${generatedPass ? generatedPass.bay : 'Bay #04'}`,
      token
    );
  };

  return (
    <div className="space-y-5 animate-fadeIn max-w-4xl mx-auto">
      {/* Station Subheader Card (Image 8 & 12) */}
      <div className="bg-[#1c1b1b] border border-neutral-800 rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#ff6b00]/30 bg-black flex-shrink-0">
              <img 
                src={ASSETS.logo} 
                alt="Station Logo" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="font-condensed text-lg font-bold text-white tracking-wide uppercase">
                  {STATION_METADATA.name}
                </h2>
                <span className="text-[10px] bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/30 font-semibold px-1.5 py-0.5 rounded">
                  ● 24/7 OPEN
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                SH-40 Lakhnadon MP 480886
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="cust-desk-help-btn"
              onClick={() => onOpenIntercom('Customer Desk Help')}
              className="px-2.5 py-1 rounded bg-[#2a2a2a] hover:bg-[#353535] text-xs text-neutral-200 border border-neutral-700 flex items-center gap-1 transition-colors"
            >
              <span>Desk Help</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#ffb693]/20 border border-[#ffb693]/40 flex items-center justify-center text-[#ffb693]">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Badges & Highway Rating Row */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-800/80 flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-[#34d399]/15 text-[#34d399] px-2 py-0.5 rounded font-semibold text-[11px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]"></span>
              OPEN 24/7
            </span>
            <span className="bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded font-semibold text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              IOCL Verified
            </span>
          </div>

          <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{STATION_METADATA.rating}</span>
            <span className="text-neutral-400 font-normal">({STATION_METADATA.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Two Big Primary Action Cards (Image 8 & 12) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div 
          onClick={() => {
            const el = document.getElementById('dispenser-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-gradient-to-br from-[#ff6b00] to-[#e05e00] rounded-xl p-4 text-white shadow-lg cursor-pointer hover:brightness-105 transition-all flex items-center justify-between group"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Fuel className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              <h3 className="font-condensed text-xl font-bold tracking-wide uppercase">
                BOOK FUEL
              </h3>
            </div>
            <p className="text-xs text-orange-100 font-medium">
              ZERO QUEUE DISPENSE & TOKEN
            </p>
          </div>
          <span className="bg-white/20 p-2 rounded-lg text-white group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-5 h-5" />
          </span>
        </div>

        <div 
          onClick={() => onOpenQrModal(
            'Scan & Pay Forecourt Desk',
            estimatedTotal,
            'UPI / IOCL Xtra Instant Pay',
            '#MP-PAY-INSTANT'
          )}
          className="bg-[#201f1f] border border-neutral-700 hover:border-[#ff6b00]/50 rounded-xl p-4 text-white shadow-md cursor-pointer hover:bg-[#252424] transition-all flex items-center justify-between group"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <QrCode className="w-6 h-6 text-[#ff6b00] group-hover:scale-110 transition-transform" />
              <h3 className="font-condensed text-xl font-bold tracking-wide uppercase">
                SCAN & PAY
              </h3>
            </div>
            <p className="text-xs text-neutral-400 font-medium">
              UPI / IOCL XTRA REWARDS
            </p>
          </div>
          <span className="bg-neutral-800 p-2 rounded-lg text-neutral-300 group-hover:text-white transition-colors">
            <ArrowRight className="w-5 h-5" />
          </span>
        </div>
      </div>

      {/* TODAY'S LIVE TARIFFS (Image 8) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-condensed text-lg font-bold text-white tracking-wide uppercase flex items-center gap-1.5">
            <span className="text-[#ff6b00]">₹</span> TODAY'S LIVE TARIFFS
          </h3>
          <span className="text-[11px] text-neutral-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-neutral-500" />
            Updated 06:00 AM IST
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Petrol Tariff Card */}
          <div 
            onClick={() => setSelectedFuel('petrol')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              selectedFuel === 'petrol'
                ? 'bg-[#18231c] border-[#34d399] shadow-md ring-1 ring-[#34d399]/40'
                : 'bg-[#1c1b1b] border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="font-condensed text-xl font-bold text-[#34d399] uppercase tracking-wide block">
                  PETROL
                </span>
                <span className="text-[11px] text-neutral-400 block">
                  BS-VI MOTOR SPIRIT
                </span>
              </div>
              <span className="w-8 h-8 rounded-full bg-[#34d399]/15 flex items-center justify-center text-[#34d399]">
                💧
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="font-condensed text-3xl font-extrabold text-white">
                ₹{petrolRate.toFixed(2)}
              </span>
              <span className="text-xs text-neutral-400">/ Litre</span>
            </div>
            <p className="text-[11px] text-[#34d399] flex items-center gap-1 font-medium">
              <span>➔ Stable price today</span>
            </p>
          </div>

          {/* Diesel Tariff Card */}
          <div 
            onClick={() => setSelectedFuel('diesel')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              selectedFuel === 'diesel'
                ? 'bg-[#292215] border-amber-400 shadow-md ring-1 ring-amber-400/40'
                : 'bg-[#1c1b1b] border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="font-condensed text-xl font-bold text-amber-400 uppercase tracking-wide block">
                  DIESEL
                </span>
                <span className="text-[11px] text-neutral-400 block">
                  HIGH SPEED DIESEL
                </span>
              </div>
              <span className="w-8 h-8 rounded-full bg-amber-400/15 flex items-center justify-center text-amber-400">
                🛢️
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="font-condensed text-3xl font-extrabold text-white">
                ₹{dieselRate.toFixed(2)}
              </span>
              <span className="text-xs text-neutral-400">/ Litre</span>
            </div>
            <p className="text-[11px] text-amber-400 flex items-center gap-1 font-medium">
              <Truck className="w-3 h-3" />
              <span>Fleet discount active</span>
            </p>
          </div>
        </div>
      </div>

      {/* TAP DISPENSER NOZZLE (Image 8 & 15) */}
      <div id="dispenser-section" className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-4 space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#ff6b00] rounded-full"></span>
            <h3 className="font-condensed text-lg font-bold text-white tracking-wide uppercase">
              TAP DISPENSER NOZZLE
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
            Bay #1 to #6
          </span>
        </div>

        {/* Nozzle Selectors with 3D Image Renders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* XP95 Petrol Card */}
          <div
            id="select-petrol-nozzle-card"
            onClick={() => setSelectedFuel('petrol')}
            className={`relative rounded-xl overflow-hidden border p-3 cursor-pointer transition-all ${
              selectedFuel === 'petrol'
                ? 'bg-gradient-to-b from-[#1c2e22] to-[#121a15] border-[#34d399] ring-2 ring-[#34d399]/30 shadow-lg'
                : 'bg-[#141414] border-neutral-800 hover:border-neutral-700 opacity-80'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-[#34d399]/20 text-[#34d399] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]"></span>
                Ready
              </span>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                selectedFuel === 'petrol'
                  ? 'bg-[#34d399] border-[#34d399] text-black'
                  : 'border-neutral-600'
              }`}>
                {selectedFuel === 'petrol' && <CheckCircle2 className="w-3.5 h-3.5 fill-black text-white" />}
              </span>
            </div>

            <div className="h-44 w-full flex items-center justify-center p-1 my-1">
              <img 
                src={ASSETS.petrolNozzle} 
                alt="XP95 Petrol Dispenser Nozzle with Green Fuel Drop" 
                className="max-h-full max-w-full object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="pt-2 border-t border-neutral-800/80">
              <div className="flex items-center justify-between">
                <span className="font-condensed text-lg font-bold text-white uppercase tracking-wide">
                  XP95 Petrol
                </span>
                <span className="text-xs font-mono font-bold text-[#34d399]">
                  ₹{petrolRate.toFixed(2)} / L
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 block mt-0.5">
                Clean High-Combustion Formula (38 L/min)
              </span>
            </div>
          </div>

          {/* HSD Diesel Card */}
          <div
            id="select-diesel-nozzle-card"
            onClick={() => setSelectedFuel('diesel')}
            className={`relative rounded-xl overflow-hidden border p-3 cursor-pointer transition-all ${
              selectedFuel === 'diesel'
                ? 'bg-gradient-to-b from-[#2e2617] to-[#1a1711] border-amber-400 ring-2 ring-amber-400/30 shadow-lg'
                : 'bg-[#141414] border-neutral-800 hover:border-neutral-700 opacity-80'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-400/20 text-amber-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Ready
              </span>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                selectedFuel === 'diesel'
                  ? 'bg-amber-400 border-amber-400 text-black'
                  : 'border-neutral-600'
              }`}>
                {selectedFuel === 'diesel' && <CheckCircle2 className="w-3.5 h-3.5 fill-black text-white" />}
              </span>
            </div>

            <div className="h-44 w-full flex items-center justify-center p-1 my-1">
              <img 
                src={ASSETS.dieselNozzle} 
                alt="HSD Diesel Dispenser Nozzle with Amber Droplet" 
                className="max-h-full max-w-full object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="pt-2 border-t border-neutral-800/80">
              <div className="flex items-center justify-between">
                <span className="font-condensed text-lg font-bold text-white uppercase tracking-wide">
                  HSD Diesel
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  ₹{dieselRate.toFixed(2)} / L
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 block mt-0.5">
                Turbo-Spec Heavy Logistics (65 L/min)
              </span>
            </div>
          </div>
        </div>

        {/* Offline Notice Banner (from Image 8) */}
        <div className="bg-[#141414] border border-neutral-800 p-2.5 rounded-lg flex items-center gap-2 text-xs text-neutral-400">
          <AlertCircle className="w-4 h-4 text-neutral-500 flex-shrink-0" />
          <span>Speed 97 & Premium CNG are currently offline for pipeline maintenance.</span>
        </div>

        {/* Quick Fill Presets & Volume Customizer */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Quick Fill Volume Presets
            </label>
            {/* Fast Lane vs Schedule toggle (Image 15) */}
            <div className="flex items-center gap-1 bg-[#141414] p-0.5 rounded-lg border border-neutral-800 text-[11px]">
              <button
                id="toggle-fast-lane-btn"
                onClick={() => setIsFastLane(true)}
                className={`px-2 py-0.5 rounded font-semibold flex items-center gap-1 transition-all ${
                  isFastLane ? 'bg-[#ff6b00] text-white' : 'text-neutral-400'
                }`}
              >
                <Zap className="w-3 h-3" />
                <span>Fast Lane</span>
              </button>
              <button
                id="toggle-schedule-btn"
                onClick={() => setIsFastLane(false)}
                className={`px-2 py-0.5 rounded font-semibold flex items-center gap-1 transition-all ${
                  !isFastLane ? 'bg-neutral-700 text-white' : 'text-neutral-400'
                }`}
              >
                <Clock className="w-3 h-3" />
                <span>Schedule</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 15].map((vol) => (
              <button
                key={vol}
                id={`volume-preset-${vol}l-btn`}
                onClick={() => handleSelectVolume(vol)}
                className={`py-2.5 rounded-lg font-condensed text-base font-bold transition-all ${
                  selectedVolume === vol
                    ? 'bg-[#ff6b00] text-white shadow-md'
                    : 'bg-[#141414] text-neutral-300 border border-neutral-800 hover:bg-[#222222]'
                }`}
              >
                {vol}L
              </button>
            ))}
            <button
              id="volume-preset-full-tank-btn"
              onClick={() => handleSelectVolume('full')}
              className={`py-2.5 rounded-lg font-condensed text-base font-bold transition-all ${
                selectedVolume === 'full'
                  ? 'bg-[#ff6b00] text-white shadow-md'
                  : 'bg-[#141414] text-neutral-300 border border-neutral-800 hover:bg-[#222222]'
              }`}
            >
              FULL TANK
            </button>
          </div>
        </div>

        {/* Estimated Total & Confirm Bay Row (Image 8) */}
        <div className="bg-[#141414] border border-neutral-800 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-neutral-400 uppercase font-semibold block">
              Estimated Total
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-condensed text-3xl sm:text-4xl font-extrabold text-white text-[#ff6b00]">
                ₹{estimatedTotal.toFixed(2)}
              </span>
              <span className="text-xs text-neutral-400">
                ({effectiveLitres}L {selectedFuel === 'petrol' ? 'XP95' : 'HSD'})
              </span>
            </div>
            <span className="text-[11px] text-[#34d399] font-medium block mt-0.5">
              ★ +{rewardPoints} IOCL XtraReward points on completion
            </span>
          </div>

          <button
            id="confirm-bay-btn"
            onClick={handleConfirmBay}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#ff6b00] hover:bg-[#ff7b1a] text-white font-condensed text-lg font-bold tracking-wider uppercase rounded-lg shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5 fill-white" />
            <span>CONFIRM BAY & GET TOKEN</span>
          </button>
        </div>

        {/* Generated Bay Pass Confirmation Box (if confirmed) */}
        {generatedPass && (
          <div className="bg-[#1d271f] border-2 border-[#34d399] p-4 rounded-xl text-white space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-condensed text-lg font-bold text-[#34d399] uppercase">
                <CheckCircle2 className="w-5 h-5 text-[#34d399]" />
                FAST FUEL PASS DISPATCHED
              </span>
              <span className="font-mono text-xs bg-black/40 px-2 py-1 rounded text-white font-bold">
                {generatedPass.token}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-black/30 p-2.5 rounded-lg font-mono">
              <div>
                <span className="text-neutral-400 block text-[10px]">ALLOCATED BAY</span>
                <span className="text-white font-bold">{generatedPass.bay}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">FUEL GRADE</span>
                <span className="text-white font-bold">{generatedPass.fuelName}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">VOLUME</span>
                <span className="text-white font-bold">{generatedPass.litres} Litres</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">NET AMOUNT</span>
                <span className="text-[#ff6b00] font-bold">₹{generatedPass.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                id="pay-now-fast-pass-btn"
                onClick={handlePayNow}
                className="flex-1 py-2.5 bg-[#ff6b00] hover:bg-[#ff7b1a] text-white font-condensed font-bold tracking-wider uppercase rounded-lg text-sm flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                <span>PAY NOW VIA PAYTM QR</span>
              </button>
              <button
                id="intercom-to-allocated-bay-btn"
                onClick={() => onOpenIntercom(generatedPass.bay)}
                className="px-4 py-2.5 bg-[#252525] hover:bg-[#303030] text-neutral-200 text-xs font-semibold rounded-lg border border-neutral-700 flex items-center justify-center gap-1.5"
              >
                <span>Call Bay Attendant</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* COMPLIMENTARY HIGHWAY AMENITIES (Image 8 & 12) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-condensed text-xl font-bold text-white tracking-wide uppercase">
              COMPLIMENTARY HIGHWAY AMENITIES
            </h3>
            <p className="text-xs text-neutral-400">Available 24/7 for all travelers, logistics drivers & highway patrons</p>
          </div>
          <span className="text-xs font-condensed font-bold text-[#34d399] bg-[#34d399]/15 border border-[#34d399]/30 px-2 py-1 rounded">
            100% FREE
          </span>
        </div>

        {/* Hero Amenity Cards with 3D Image Renders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Automated Air PSI Card (Image 8 & 17) */}
          <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden p-3 hover:border-neutral-700 transition-all flex flex-col justify-between">
            <div className="h-44 w-full bg-[#121212] rounded-lg overflow-hidden flex items-center justify-center p-2 mb-3">
              <img 
                src={ASSETS.tireAir} 
                alt="Automated Air PSI Station 3D Render" 
                className="h-full w-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-condensed text-lg font-bold text-white uppercase">
                  Automated Air PSI
                </span>
                <span className="text-[10px] font-mono text-[#34d399] bg-[#34d399]/15 px-1.5 py-0.5 rounded font-bold">
                  Digital PSI
                </span>
              </div>
              <p className="text-xs text-neutral-400 mb-2">
                High-precision automatic nitrogen & air dispenser handling passenger cars up to 14-wheeler trucks.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#34d399] font-medium pt-2 border-t border-neutral-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Station Attendant Ready • Entry Bay East</span>
              </div>
            </div>
          </div>

          {/* Pure RO Water Card (Image 8 & 19) */}
          <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden p-3 hover:border-neutral-700 transition-all flex flex-col justify-between">
            <div className="h-44 w-full bg-[#121212] rounded-lg overflow-hidden flex items-center justify-center p-2 mb-3">
              <img 
                src={ASSETS.roWater} 
                alt="Pure Mineral RO Water Dispenser 3D Render" 
                className="h-full w-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-condensed text-lg font-bold text-white uppercase">
                  Pure RO Water
                </span>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-500/15 px-1.5 py-0.5 rounded font-bold">
                  Chilled RO
                </span>
              </div>
              <p className="text-xs text-neutral-400 mb-2">
                Hygienic chilled mineral RO filtration point for drivers, tourists, and bulk camper refilling.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium pt-2 border-t border-neutral-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>TDS Tested &lt; 85 • Manager Front Desk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Amenity Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div 
            onClick={onNavigateToTransporter}
            className="p-3 bg-[#181818] border border-neutral-800 rounded-xl flex items-center gap-3 cursor-pointer hover:border-neutral-700 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-[#ff6b00]/15 border border-[#ff6b00]/30 flex items-center justify-center text-[#ff6b00]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-condensed text-base font-bold text-white uppercase block">
                High-Flow Diesel Corridor
              </span>
              <span className="text-xs text-neutral-400">
                Separate heavy truck canopy (65 L/min)
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#181818] border border-neutral-800 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <span className="font-condensed text-base font-bold text-white uppercase block">
                24x7 Dhaba & Mini-Mart
              </span>
              <span className="text-xs text-neutral-400">
                Tea, fresh snacks & Servo lubricants
              </span>
            </div>
          </div>
        </div>

        {/* Highway Safe Zone (Image 8) */}
        <div className="bg-gradient-to-r from-[#17202b] to-[#12171e] border border-neutral-700 rounded-xl p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-condensed text-base font-bold text-white uppercase block">
                Highway Safe Zone
              </span>
              <p className="text-xs text-neutral-300">
                High-mast LED yard lights, 32 CCTV lenses & clean rest areas
              </p>
            </div>
          </div>

          <button
            id="view-cctv-safe-zone-btn"
            onClick={onNavigateToCctv}
            className="px-3 py-2 bg-[#ff6b00] hover:bg-[#ff7b1a] text-white font-condensed font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors flex-shrink-0"
          >
            <Video className="w-3.5 h-3.5" />
            <span>CCTV LIVE</span>
          </button>
        </div>
      </div>

      {/* Driver Rating & Review (Image 12) */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-condensed text-lg font-bold text-white uppercase">
            Highway Driver Rating
          </span>
          <span className="flex items-center gap-1 text-[#34d399] font-bold text-xs bg-[#34d399]/15 border border-[#34d399]/30 px-2 py-0.5 rounded">
            <Star className="w-3 h-3 fill-[#34d399]" />
            4.9 / 5.0
          </span>
        </div>

        <div className="p-3 bg-[#141414] border border-neutral-800 rounded-lg flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#34d399]/20 text-[#34d399] font-bold flex items-center justify-center font-mono text-xs flex-shrink-0">
            RK
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Rakesh Kumar</span>
              <div className="flex text-amber-400 text-xs">★★★★★</div>
            </div>
            <span className="text-[11px] text-neutral-400 block font-medium">Fleet Owner • Indore to Jabalpur Corridor</span>
            <p className="text-xs text-neutral-300 italic">
              "Best overnight halt on SH-40. Proper high-flow nozzles that fill 350L in under 6 minutes, safe illuminated parking, and chilled RO water."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
