import React from 'react';
import { ViewScreen, DeviceMode } from '../types';
import { STATION_METADATA } from '../data/stationData';
import { ASSETS } from '../assets';
import { 
  Fuel, 
  Video, 
  Truck, 
  ShieldAlert, 
  LayoutDashboard, 
  Smartphone, 
  Monitor, 
  Sun, 
  Moon, 
  MapPin, 
  CheckCircle2, 
  PhoneCall, 
  Radio
} from 'lucide-react';

interface HeaderProps {
  currentScreen: ViewScreen;
  onSelectScreen: (screen: ViewScreen) => void;
  deviceMode: DeviceMode;
  onToggleDeviceMode: (mode: DeviceMode) => void;
  isDayMode: boolean;
  onToggleDayMode: () => void;
  petrolRate: number;
  dieselRate: number;
  isEmergencyLocked: boolean;
  onOpenIntercom: (bay: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onSelectScreen,
  deviceMode,
  onToggleDeviceMode,
  isDayMode,
  onToggleDayMode,
  petrolRate,
  dieselRate,
  isEmergencyLocked,
  onOpenIntercom,
}) => {
  return (
    <header className="border-b border-[#2a2a2a] bg-[#0e0e0e] sticky top-0 z-40">
      {/* Topmost Operational Status Strip (from Image 1 & 6) */}
      <div className="bg-[#181818] border-b border-[#252525] px-3 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Status & Station Identification */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 font-condensed tracking-wider font-semibold text-[#34d399] uppercase text-[13px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]"></span>
              </span>
              {STATION_METADATA.operationalStatus}
            </span>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <span className="text-neutral-300 font-medium">
              IOCL Outlet #{STATION_METADATA.outletNumber} • SH-40 Lakhnadon
            </span>
            {isEmergencyLocked && (
              <span className="bg-red-500/20 text-red-400 border border-red-500/40 px-2 py-0.5 rounded text-[11px] font-bold animate-pulse">
                EMERGENCY POWER TRIPPED
              </span>
            )}
          </div>

          {/* Quick Rates & Controls */}
          <div className="flex items-center gap-3 ml-auto flex-wrap">
            <div className="flex items-center gap-2 font-mono text-[12px]">
              <span className="text-emerald-400 font-semibold">
                MS: ₹{petrolRate.toFixed(2)}
              </span>
              <span className="text-neutral-600">|</span>
              <span className="text-amber-400 font-semibold">
                HSD: ₹{dieselRate.toFixed(2)}
              </span>
            </div>

            {/* Day / Night Mode Toggle (from Image 1) */}
            <button
              id="header-day-mode-btn"
              onClick={onToggleDayMode}
              className="flex items-center gap-1 px-2 py-1 rounded bg-[#252525] hover:bg-[#333333] text-neutral-300 text-[11px] transition-colors"
              title="Toggle Day / Night Ambience"
            >
              {isDayMode ? <Moon className="w-3.5 h-3.5 text-amber-300" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isDayMode ? 'Night Mode' : 'Day Mode'}</span>
            </button>

            {/* Intercom quick hotline */}
            <button
              id="header-intercom-btn"
              onClick={() => onOpenIntercom('Bay 01 Desk')}
              className="hidden md:flex items-center gap-1 px-2 py-1 rounded bg-[#201f1f] hover:bg-[#2a2a2a] text-neutral-300 text-[11px] border border-neutral-700"
            >
              <Radio className="w-3 h-3 text-[#ff6b00]" />
              <span>Desk Intercom</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Logo & Station Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onSelectScreen('customer-booking')}
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-[#ff6b00]/40 bg-[#1c1b1b] p-0.5 shadow-md flex-shrink-0">
              <img 
                src={ASSETS.logo} 
                alt="Moriya Petroleum Logo" 
                className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-condensed text-xl sm:text-2xl font-bold tracking-wide text-white uppercase flex items-center gap-2 leading-none">
                  {STATION_METADATA.name}
                  <span className="text-[11px] tracking-normal font-sans font-semibold bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/30 px-1.5 py-0.5 rounded">
                    24/7 OPEN
                  </span>
                </h1>
              </div>
              <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#ff6b00]" />
                <span className="truncate max-w-[260px] sm:max-w-none">
                  {STATION_METADATA.location}
                </span>
                <span className="text-[#ff6b00] hidden sm:inline ml-1 font-medium hover:underline">
                  • Open in Maps ↗
                </span>
              </p>
            </div>
          </div>

          {/* Device Frame Viewport Selector (Allows switching between full responsive, simulated mobile screen, and wide desktop) */}
          <div className="flex items-center gap-1 bg-[#1a1a1a] p-1 rounded-lg border border-neutral-800">
            <span className="text-[10px] uppercase font-bold text-neutral-400 px-1.5 hidden xl:inline">
              Layout Frame:
            </span>
            <button
              id="device-mode-responsive-btn"
              onClick={() => onToggleDeviceMode('responsive')}
              className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-all ${
                deviceMode === 'responsive'
                  ? 'bg-[#ff6b00] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Responsive Adaptive View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Auto Fluid</span>
            </button>
            <button
              id="device-mode-mobile-btn"
              onClick={() => onToggleDeviceMode('mobile-simulated')}
              className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-all ${
                deviceMode === 'mobile-simulated'
                  ? 'bg-[#ff6b00] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Preview in Mobile Phone Frame (as in screenshots)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Phone</span>
            </button>
            <button
              id="device-mode-desktop-btn"
              onClick={() => onToggleDeviceMode('desktop-wide')}
              className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-all ${
                deviceMode === 'desktop-wide'
                  ? 'bg-[#ff6b00] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Full Desktop Command Center"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop Wide</span>
            </button>
          </div>
        </div>

        {/* Primary Screen Selector Navigation Bar (Matches the uploaded tabs) */}
        <nav className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 no-scrollbar border-t border-neutral-800/80 pt-2.5">
          <button
            id="nav-customer-booking-btn"
            onClick={() => onSelectScreen('customer-booking')}
            className={`px-3 py-1.5 rounded text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap flex items-center gap-1.5 transition-all ${
              currentScreen === 'customer-booking'
                ? 'bg-[#ff6b00] text-white shadow-md'
                : 'bg-[#1c1b1b] text-neutral-300 hover:bg-[#252525] border border-neutral-800'
            }`}
          >
            <Fuel className="w-4 h-4" />
            <span>Book Fuel & Rates</span>
          </button>

          <button
            id="nav-live-cctv-btn"
            onClick={() => onSelectScreen('live-cctv')}
            className={`px-3 py-1.5 rounded text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap flex items-center gap-1.5 transition-all ${
              currentScreen === 'live-cctv'
                ? 'bg-[#ff6b00] text-white shadow-md'
                : 'bg-[#1c1b1b] text-neutral-300 hover:bg-[#252525] border border-neutral-800'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Live Cams (₹5 Token)</span>
          </button>

          <button
            id="nav-transporter-portal-btn"
            onClick={() => onSelectScreen('transporter-portal')}
            className={`px-3 py-1.5 rounded text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap flex items-center gap-1.5 transition-all ${
              currentScreen === 'transporter-portal'
                ? 'bg-[#34d399] text-neutral-950 font-bold shadow-md'
                : 'bg-[#1c1b1b] text-neutral-300 hover:bg-[#252525] border border-neutral-800'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Transporters (₹25 Pass)</span>
          </button>

          <button
            id="nav-master-control-btn"
            onClick={() => onSelectScreen('master-control')}
            className={`px-3 py-1.5 rounded text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap flex items-center gap-1.5 transition-all ${
              currentScreen === 'master-control'
                ? 'bg-[#ff6b00] text-white shadow-md'
                : 'bg-[#1c1b1b] text-neutral-300 hover:bg-[#252525] border border-neutral-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Master Control (Sovereign)</span>
          </button>

          <button
            id="nav-desktop-dispatcher-btn"
            onClick={() => onSelectScreen('desktop-dispatcher')}
            className={`px-3 py-1.5 rounded text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap flex items-center gap-1.5 transition-all ${
              currentScreen === 'desktop-dispatcher'
                ? 'bg-[#ff6b00] text-white shadow-md'
                : 'bg-[#1c1b1b] text-neutral-300 hover:bg-[#252525] border border-neutral-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Forecourt Dispatcher & Tanks</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
