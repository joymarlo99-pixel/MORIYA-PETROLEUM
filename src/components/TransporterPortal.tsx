import React, { useState } from 'react';
import { TransporterRecord } from '../types';
import { STATION_METADATA, INITIAL_TRANSPORTERS } from '../data/stationData';
import { ASSETS } from '../assets';
import { 
  Truck, 
  ShieldCheck, 
  KeyRound, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  PhoneCall, 
  QrCode, 
  Download, 
  Clock, 
  Calendar,
  AlertCircle
} from 'lucide-react';

interface TransporterPortalProps {
  onOpenQrModal: (title: string, amount: number, purpose: string, token: string) => void;
  onNavigateToManager: () => void;
  onNavigateToOwner: () => void;
  onOpenIntercom: (bay: string) => void;
}

export const TransporterPortal: React.FC<TransporterPortalProps> = ({
  onOpenQrModal,
  onNavigateToManager,
  onNavigateToOwner,
  onOpenIntercom,
}) => {
  const [vehicleInput, setVehicleInput] = useState('MP-20-HB-1234');
  const [pinInput, setPinInput] = useState('');
  const [otpSentMessage, setOtpSentMessage] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<TransporterRecord | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleGetOtp = () => {
    const cleanPlate = vehicleInput.trim().toUpperCase();
    const record = INITIAL_TRANSPORTERS[cleanPlate];
    if (record) {
      setPinInput(record.pin);
      setOtpSentMessage(`Direct OTP sent to driver ${record.driverName} (${record.phone}): ${record.pin}`);
    } else {
      const generated = Math.floor(100000 + Math.random() * 900000).toString();
      setPinInput(generated);
      setOtpSentMessage(`Corridor OTP generated: ${generated}`);
    }
  };

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsVerifying(true);
    setLoginError(null);

    setTimeout(() => {
      setIsVerifying(false);
      const cleanPlate = vehicleInput.trim().toUpperCase();
      const record = INITIAL_TRANSPORTERS[cleanPlate];
      
      if (record) {
        setActiveSession(record);
      } else {
        // Create generic registered driver record
        const newRecord: TransporterRecord = {
          vehiclePlate: cleanPlate || 'MP-20-HB-1234',
          transporterName: 'Highway Logistics Partner',
          driverName: 'Verified Transporter Driver',
          phone: '+91 98261 00000',
          hasActiveMonthlyPass: true,
          passExpiryDate: '30-Oct-2026',
          pin: pinInput || '123456',
          recentTrips: [
            { date: '21-Sep-2026 22:30', litres: 340, fuelType: 'HSD Diesel', amount: 34102, bay: 'Bay 01', invoiceNo: 'INV-MP-8942' },
            { date: '16-Sep-2026 03:15', litres: 280, fuelType: 'HSD Diesel', amount: 28084, bay: 'Bay 01', invoiceNo: 'INV-MP-8710' }
          ]
        };
        setActiveSession(newRecord);
      }
    }, 800);
  };

  const handleSubscribePass = () => {
    onOpenQrModal(
      '1-Month Highway Fleet Network Pass',
      25.00,
      '30-Day Priority High-Flow Bay & GST Slip Portal Access',
      '#FLT-PASS-25'
    );
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto animate-fadeIn">
      {/* Brand Header & Role Switcher (Image 1.jpeg) */}
      <div className="bg-[#1c1b1b] border border-neutral-800 rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#ff6b00]/40 bg-black p-0.5 flex-shrink-0">
              <img 
                src={ASSETS.logo} 
                alt="Moriya Petroleum Emblem" 
                className="w-full h-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="font-condensed text-xl font-bold text-white tracking-wide uppercase">
                {STATION_METADATA.name}
              </h2>
              <p className="text-xs text-neutral-400">
                Indian Oil Retail Outlet #{STATION_METADATA.outletNumber} • PESO Licensed Corridor Station
              </p>
              <p className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#ff6b00]" />
                <span>{STATION_METADATA.location}</span>
              </p>
            </div>
          </div>
        </div>

        {/* 3 Role Switcher Tabs from Image 1 */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-neutral-800">
          <button
            id="role-tab-transporters-btn"
            className="py-2 px-3 rounded-lg bg-[#34d399] text-black font-condensed font-bold text-sm tracking-wide uppercase shadow-md flex items-center justify-center gap-1.5"
          >
            <Truck className="w-4 h-4" />
            <span>Transporters</span>
          </button>
          <button
            id="role-tab-manager-btn"
            onClick={onNavigateToManager}
            className="py-2 px-3 rounded-lg bg-[#252525] hover:bg-[#303030] text-neutral-300 font-condensed font-bold text-sm tracking-wide uppercase transition-colors"
          >
            <span>Forecourt Manager</span>
          </button>
          <button
            id="role-tab-owner-btn"
            onClick={onNavigateToOwner}
            className="py-2 px-3 rounded-lg bg-[#252525] hover:bg-[#303030] text-neutral-300 font-condensed font-bold text-sm tracking-wide uppercase transition-colors"
          >
            <span>Sole Owner</span>
          </button>
        </div>
      </div>

      {/* FLEET NETWORK ₹25 / 1-Month Driver Pass Card (Image 1.jpeg) */}
      <div className="bg-gradient-to-br from-[#1a251e] to-[#141b16] border border-[#34d399]/40 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/40 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#34d399] uppercase font-bold tracking-wider block">
                FLEET NETWORK
              </span>
              <h3 className="font-condensed text-2xl font-extrabold text-white tracking-wide">
                ₹25 <span className="text-sm font-sans font-normal text-neutral-300">/ 1-Month Driver Pass</span>
              </h3>
            </div>
          </div>

          <span className="px-2.5 py-1 bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/40 rounded text-xs font-bold font-mono">
            INSTANT ACTIVATION
          </span>
        </div>

        <p className="text-xs text-neutral-300 mb-3 font-medium">
          "Highway Logistics & High-Flow Fuel Access" — Priority nozzle allocation, automated GST slips, and CCTV guarded rest-bay credentials.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-neutral-800">
          <div className="flex items-center gap-2 text-xs text-neutral-300">
            <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
            <span>Dedicated North Canopy Corridors • 90L/min High-Flow Pumps</span>
          </div>

          <button
            id="subscribe-fleet-pass-btn"
            onClick={handleSubscribePass}
            className="w-full sm:w-auto px-4 py-2 bg-[#ff6b00] hover:bg-[#ff7b1a] text-white font-condensed font-bold text-xs uppercase tracking-wider rounded-lg shadow flex items-center justify-center gap-1.5 transition-all"
          >
            <QrCode className="w-4 h-4" />
            <span>PAYTM QR PASS (₹25)</span>
          </button>
        </div>
      </div>

      {/* LOGISTICS VERIFICATION GATEWAY (Image 1.jpeg) */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-4 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-[#34d399]" />
            <h3 className="font-condensed text-lg font-bold text-white tracking-wide uppercase">
              LOGISTICS VERIFICATION GATEWAY
            </h3>
          </div>
          <button
            id="direct-driver-ledger-link-btn"
            onClick={handleVerify}
            className="text-xs text-[#34d399] hover:underline flex items-center gap-1 font-medium"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Direct Driver Ledger</span>
          </button>
        </div>

        <form onSubmit={handleVerify} className="space-y-3">
          {/* Input 1: Transporter Mobile or Vehicle Plate */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
              Transporter Mobile or Vehicle Plate
            </label>
            <input
              id="transporter-vehicle-input"
              type="text"
              placeholder="e.g. MP-20-HB-1234 or +91 98261 44520"
              value={vehicleInput}
              onChange={(e) => setVehicleInput(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#121212] border border-neutral-700 rounded-lg text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[#34d399] transition-colors uppercase"
            />
          </div>

          {/* Input 2: 6-Digit SMS PIN / Driver ID */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
              6-Digit SMS PIN / Driver ID
            </label>
            <div className="flex gap-2">
              <input
                id="transporter-pin-input"
                type="password"
                maxLength={6}
                placeholder="••••••"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-neutral-700 rounded-lg text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[#34d399] transition-colors"
              />
              <button
                id="get-direct-otp-btn"
                type="button"
                onClick={handleGetOtp}
                className="px-3.5 py-2.5 bg-[#252525] hover:bg-[#323232] text-neutral-200 text-xs font-semibold rounded-lg border border-neutral-700 whitespace-nowrap transition-colors"
              >
                Get Direct OTP
              </button>
            </div>
          </div>

          {otpSentMessage && (
            <div className="p-2 bg-[#122218] border border-[#34d399]/40 text-[#34d399] text-xs rounded-lg flex items-center gap-1.5 animate-fadeIn font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{otpSentMessage}</span>
            </div>
          )}

          {/* Three Feature Badges (Image 1.jpeg) */}
          <div className="grid grid-cols-3 gap-2 py-1">
            <div className="bg-[#121212] border border-neutral-800 p-2 rounded-lg text-center">
              <span className="text-[11px] font-mono text-neutral-300 font-bold block">
                Fast-Flow 90L/m
              </span>
              <span className="text-[9px] text-neutral-500 uppercase">Dual Nozzle</span>
            </div>
            <div className="bg-[#121212] border border-neutral-800 p-2 rounded-lg text-center">
              <span className="text-[11px] font-mono text-neutral-300 font-bold block">
                Automated E-Ledger
              </span>
              <span className="text-[9px] text-neutral-500 uppercase">GST Invoices</span>
            </div>
            <div className="bg-[#121212] border border-neutral-800 p-2 rounded-lg text-center">
              <span className="text-[11px] font-mono text-neutral-300 font-bold block">
                24h CCTV Guard Bay
              </span>
              <span className="text-[9px] text-neutral-500 uppercase">Protected Rest</span>
            </div>
          </div>

          {/* Big Green Action Button (Image 1.jpeg) */}
          <button
            id="verify-enter-transporter-bay-btn"
            type="submit"
            disabled={isVerifying}
            className="w-full py-3.5 bg-[#34d399] hover:bg-[#2fc28c] text-neutral-950 font-condensed text-base font-extrabold tracking-wider uppercase rounded-lg shadow-lg hover:shadow-emerald-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5 text-neutral-950" />
            <span>{isVerifying ? 'VERIFYING CREDENTIALS...' : 'VERIFY & ENTER TRANSPORTER BAY'}</span>
          </button>
        </form>

        {/* Active Transporter Session & Trip Ledger (If Verified) */}
        {activeSession && (
          <div className="mt-4 p-4 bg-[#141b16] border-2 border-[#34d399] rounded-xl space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="font-mono text-xs bg-[#34d399] text-black font-extrabold px-2 py-0.5 rounded">
                  {activeSession.vehiclePlate}
                </span>
                <h4 className="font-condensed text-lg font-bold text-white uppercase mt-1">
                  {activeSession.transporterName}
                </h4>
                <span className="text-xs text-neutral-400">Driver: {activeSession.driverName} • {activeSession.phone}</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-neutral-400 uppercase block">1-Month Pass Valid Until</span>
                <span className="text-xs font-mono font-bold text-[#34d399]">{activeSession.passExpiryDate}</span>
              </div>
            </div>

            {/* Trip Ledger Table */}
            <div>
              <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block mb-2">
                Recent Fuel Transactions & GST Vouchers
              </span>
              <div className="space-y-1.5">
                {activeSession.recentTrips.map((trip, i) => (
                  <div key={i} className="bg-black/40 border border-neutral-800 p-2.5 rounded-lg flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-neutral-400 block text-[10px]">{trip.date} • {trip.bay}</span>
                      <span className="text-white font-bold">{trip.litres} Litres {trip.fuelType}</span>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <span className="text-amber-400 font-bold">₹{trip.amount.toLocaleString('en-IN')}</span>
                      <button
                        onClick={() => alert(`Downloading official GST invoice ${trip.invoiceNo} (IOCL #24391)`)}
                        className="p-1.5 bg-[#252525] hover:bg-[#333333] text-neutral-300 rounded"
                        title="Download GST Invoice"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => onOpenIntercom('Bay 1 High-Flow')}
                className="flex-1 py-2 bg-[#252525] hover:bg-[#303030] text-white text-xs font-semibold rounded-lg border border-neutral-700 flex items-center justify-center gap-1"
              >
                <span>Call High-Flow Bay 1 Attendant</span>
              </button>
              <button
                onClick={() => setActiveSession(null)}
                className="px-3 py-2 bg-neutral-800 text-neutral-400 text-xs rounded-lg hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info (Image 1.jpeg) */}
      <div className="p-4 bg-[#141414] border border-neutral-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-400">
        <div>
          <span>Manager: </span>
          <span className="text-white font-semibold">{STATION_METADATA.manager.name} ({STATION_METADATA.manager.phone})</span>
          <span className="mx-2">•</span>
          <span>Owner: </span>
          <span className="text-white font-semibold">{STATION_METADATA.sovereignOwner.name} ({STATION_METADATA.sovereignOwner.phone})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#34d399] font-mono">PESO VERIFIED</span>
          <span>•</span>
          <span className="font-mono">RO# {STATION_METADATA.outletNumber}</span>
        </div>
      </div>
    </div>
  );
};
