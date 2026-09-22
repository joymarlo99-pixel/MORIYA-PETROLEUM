import React, { useState, useEffect } from 'react';
import { CCTVFeed } from '../types';
import { STATION_METADATA } from '../data/stationData';
import { ASSETS } from '../assets';
import { 
  Video, 
  Lock, 
  Unlock, 
  Radio, 
  PhoneCall, 
  Maximize2, 
  ShieldCheck, 
  AlertTriangle, 
  Camera, 
  Volume2, 
  ZoomIn, 
  ZoomOut, 
  RefreshCw,
  QrCode,
  CheckCircle2,
  X
} from 'lucide-react';

interface LiveCctvFeedsProps {
  cctvFeeds: CCTVFeed[];
  onUnlockFeed: (camId: string) => void;
  onOpenQrModal: (title: string, amount: number, purpose: string, token: string) => void;
  onOpenIntercom: (bay: string) => void;
  onNavigateToTransporter: () => void;
  onNavigateToMasterControl: () => void;
}

export const LiveCctvFeeds: React.FC<LiveCctvFeedsProps> = ({
  cctvFeeds,
  onUnlockFeed,
  onOpenQrModal,
  onOpenIntercom,
  onNavigateToTransporter,
  onNavigateToMasterControl,
}) => {
  const [activeTab, setActiveTab] = useState<'live-cams' | 'fleet-pass' | 'desk-login'>('live-cams');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [selectedFeedForModal, setSelectedFeedForModal] = useState<CCTVFeed | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activePtzPreset, setActivePtzPreset] = useState<'canopy' | 'nozzle' | 'anpr'>('canopy');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live timestamp timer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePayToken = () => {
    const token = `#TK-${Math.floor(1000 + Math.random() * 9000)}`;
    onOpenQrModal(
      'CCTV Surveillance Stream Access',
      5.00,
      '15-Minute Unlocked Forecourt Stream • All Bays',
      token
    );
  };

  const handleCaptureSnapshot = (camCode: string) => {
    setToastMessage(`Snapshot captured: ${camCode} saved to security logs`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto animate-fadeIn">
      {/* Subheader & Quick Navigation Tabs (Image 4.png) */}
      <div className="bg-[#1c1b1b] border border-neutral-800 rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between gap-3 flex-wrap">
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
                  {STATION_METADATA.alternateName || STATION_METADATA.name}
                </h2>
                <span className="text-[10px] bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/30 font-semibold px-1.5 py-0.5 rounded">
                  24/7 OPEN
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                {STATION_METADATA.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-[#121212] p-1 rounded-lg border border-neutral-800">
            <button
              id="cctv-tab-live-cams-btn"
              onClick={() => setActiveTab('live-cams')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'live-cams'
                  ? 'bg-[#34d399] text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Live Cams
            </button>
            <button
              id="cctv-tab-fleet-pass-btn"
              onClick={onNavigateToTransporter}
              className="px-3 py-1 text-xs font-semibold rounded-md text-neutral-400 hover:text-white transition-all"
            >
              Fleet Pass
            </button>
            <button
              id="cctv-tab-desk-login-btn"
              onClick={onNavigateToMasterControl}
              className="px-3 py-1 text-xs font-semibold rounded-md text-neutral-400 hover:text-white transition-all"
            >
              Desk Login
            </button>
          </div>
        </div>
      </div>

      {/* CAMERA TOKEN ACCESS ₹5 / 15 MINS (Image 4.png) */}
      <div className="bg-gradient-to-br from-[#201f1f] to-[#151515] border border-neutral-700 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#ff6b00]/20 text-[#ff6b00] border border-[#ff6b00]/40 flex items-center justify-center">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-condensed text-xl font-bold text-white tracking-wide uppercase">
                CAMERA TOKEN ACCESS
              </h3>
              <span className="text-[11px] text-[#ff6b00] font-mono font-bold block">
                ₹5 / 15 MINS
              </span>
            </div>
          </div>
          <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/40 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            PESO Security Layer
          </span>
        </div>

        <p className="text-xs text-neutral-300 mb-3">
          High-security CCTV feeds require prior physical bay validation to prevent vehicle license plate scraping.
        </p>

        {/* 2 Step instructions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-xs">
          <div className="p-2.5 bg-[#121212] border border-neutral-800 rounded-lg flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-[#ff6b00] text-black font-bold flex items-center justify-center text-xs flex-shrink-0">
              1
            </span>
            <div>
              <span className="text-white font-semibold block">Step 1: Bay Check</span>
              <span className="text-neutral-400 text-[11px]">
                Call Manager Rahul ({STATION_METADATA.manager.phone}) for visual bay clearance.
              </span>
            </div>
          </div>

          <div className="p-2.5 bg-[#121212] border border-neutral-800 rounded-lg flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-[#34d399] text-black font-bold flex items-center justify-center text-xs flex-shrink-0">
              2
            </span>
            <div>
              <span className="text-white font-semibold block">Step 2: Instant Token</span>
              <span className="text-neutral-400 text-[11px]">
                Scan Paytm QR ({STATION_METADATA.upiId}) for automated stream release.
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons from Image 4 */}
        <div className="flex flex-col sm:flex-row gap-2">
          <a
            id="cctv-call-manager-btn"
            href={`tel:${STATION_METADATA.manager.phone}`}
            className="flex-1 py-2.5 px-4 bg-[#252525] hover:bg-[#303030] text-white border border-neutral-600 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-[#34d399]" />
            <span>CALL MANAGER FOR APPROVAL ({STATION_METADATA.manager.phone})</span>
          </a>

          <button
            id="cctv-pay-token-btn"
            onClick={handlePayToken}
            className="flex-1 py-2.5 px-4 bg-[#ff6b00] hover:bg-[#ff7b1a] text-white font-condensed font-bold text-sm tracking-wider uppercase rounded-lg shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <QrCode className="w-4 h-4" />
            <span>UNLOCK WITH ₹5 TOKEN (PAYTM)</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="bg-[#1e2a22] border border-[#34d399] text-[#34d399] text-xs p-2.5 rounded-lg flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ACTIVE FORECOURT FEEDS (3 Feeds from Image 4) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-condensed text-xl font-bold text-white tracking-wide uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            ACTIVE FORECOURT FEEDS
          </h3>
          <span className="font-mono text-[11px] text-neutral-400">
            {currentTime}
          </span>
        </div>

        <div className="space-y-4">
          {cctvFeeds.map((feed) => (
            <div
              key={feed.id}
              className="bg-[#1c1b1b] border border-neutral-800 rounded-xl overflow-hidden shadow-lg"
            >
              {/* Camera Header Bar */}
              <div className="px-4 py-2.5 bg-[#252525] border-b border-neutral-700/80 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-red-600/30 text-red-400 font-mono text-[11px] font-bold tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    {feed.camCode}
                  </span>
                  <span className="font-condensed text-base font-bold text-white uppercase">
                    {feed.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-neutral-400 hidden sm:inline">{feed.bayName}</span>
                  {feed.isLocked ? (
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      LOCKED
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1">
                      <Unlock className="w-3 h-3" />
                      STREAM ACTIVE
                    </span>
                  )}
                </div>
              </div>

              {/* Video Monitor Frame */}
              <div className="relative aspect-video sm:h-72 w-full bg-neutral-950 overflow-hidden flex items-center justify-center">
                {/* Background CCTV footage asset */}
                <img 
                  src={ASSETS.cctvForecourt} 
                  alt={feed.title}
                  className={`w-full h-full object-cover filter transition-all duration-300 ${
                    feed.isLocked ? 'blur-md brightness-40' : 'brightness-90 contrast-110'
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* CCTV Scanlines & HUD Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40"></div>

                {/* Live HUD Timestamp & Camera Code */}
                <div className="absolute top-2.5 left-3 flex items-center gap-2 text-[11px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span>{feed.camCode}</span>
                  <span className="text-neutral-400">|</span>
                  <span>{currentTime}</span>
                </div>

                <div className="absolute top-2.5 right-3 flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  <span>H.265 • 30 FPS • 1080p</span>
                </div>

                {/* If LOCKED Overlay */}
                {feed.isLocked ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-black/60 backdrop-blur-xs">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400 mb-2">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h4 className="font-condensed text-lg font-bold text-white uppercase tracking-wider mb-1">
                      FEED SECURITY ENCRYPTED
                    </h4>
                    <p className="text-xs text-neutral-300 max-w-sm mb-3">
                      Access to {feed.title} requires ₹5 corridor token or Manager Rahul physical clearance.
                    </p>
                    <div className="flex gap-2">
                      <button
                        id={`unlock-${feed.id}-btn`}
                        onClick={() => onUnlockFeed(feed.id)}
                        className="px-4 py-2 bg-[#34d399] hover:bg-[#2fc28c] text-black font-condensed font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors shadow-md"
                      >
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Instant Bay Unlock (Simulate)</span>
                      </button>
                      <button
                        id={`paytm-token-${feed.id}-btn`}
                        onClick={handlePayToken}
                        className="px-4 py-2 bg-[#ff6b00] hover:bg-[#ff7b1a] text-white font-condensed font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors shadow-md"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>₹5 Token</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Active HUD Telemetry Overlay on bottom */
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between flex-wrap gap-2 pointer-events-none">
                    <div className="bg-black/75 backdrop-blur-sm border border-neutral-700/80 p-2 rounded-lg text-xs font-mono space-y-0.5 pointer-events-auto">
                      <div className="text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        {feed.cluster}
                      </div>
                      {feed.flowRate && (
                        <div className="text-neutral-300">
                          FLOW RATE: <span className="text-amber-400 font-bold">{feed.flowRate}</span>
                        </div>
                      )}
                      {feed.currentVehicle && (
                        <div className="text-neutral-300">
                          TARGET: <span className="text-white font-bold">{feed.currentVehicle}</span>
                        </div>
                      )}
                      {feed.queueStatus && (
                        <div className="text-neutral-400 text-[10px]">
                          QUEUE: {feed.queueStatus}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 pointer-events-auto">
                      <button
                        id={`snapshot-${feed.id}-btn`}
                        onClick={() => handleCaptureSnapshot(feed.camCode)}
                        className="p-2 bg-black/75 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg border border-neutral-700 transition-colors"
                        title="Capture Surveillance Snapshot"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                      <button
                        id={`expand-${feed.id}-btn`}
                        onClick={() => setSelectedFeedForModal(feed)}
                        className="p-2 bg-black/75 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg border border-neutral-700 transition-colors"
                        title="Expand Full Screen Monitor"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Feed Controls Footer */}
              <div className="p-3 bg-[#181818] border-t border-neutral-800 flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">Bay Audio:</span>
                  <button
                    id={`intercom-${feed.id}-btn`}
                    onClick={() => onOpenIntercom(feed.title)}
                    className="px-2.5 py-1 rounded bg-[#252525] hover:bg-[#333333] text-neutral-200 border border-neutral-700 flex items-center gap-1 transition-colors"
                  >
                    <Radio className="w-3.5 h-3.5 text-[#ff6b00]" />
                    <span>Intercom to Bay Pole</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id={`ptz-${feed.id}-btn`}
                    onClick={() => setSelectedFeedForModal(feed)}
                    className="px-2.5 py-1 rounded bg-[#252525] hover:bg-[#333333] text-neutral-200 border border-neutral-700 flex items-center gap-1 transition-colors"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-[#34d399]" />
                    <span>PTZ Controls</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Camera Modal with PTZ controls */}
      {selectedFeedForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#181818] border border-neutral-700 rounded-xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
            <div className="flex items-center justify-between px-4 py-3 bg-[#201f1f] border-b border-neutral-700">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <h3 className="font-condensed text-lg font-bold text-white tracking-wide uppercase">
                  MONITOR: {selectedFeedForModal.camCode} • {selectedFeedForModal.title}
                </h3>
              </div>
              <button
                id="close-expanded-cam-modal-btn"
                onClick={() => setSelectedFeedForModal(null)}
                className="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center min-h-[340px]">
              <img
                src={ASSETS.cctvForecourt}
                alt={selectedFeedForModal.title}
                className="w-full h-full object-cover transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
                referrerPolicy="no-referrer"
              />

              {/* PTZ Crosshair */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-24 h-24 border border-emerald-400/40 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-emerald-400/60 rounded-full"></div>
                </div>
              </div>

              {/* Angle HUD */}
              <div className="absolute top-3 left-4 text-xs font-mono bg-black/70 text-emerald-400 p-2 rounded border border-neutral-800">
                <div>PRESET: {activePtzPreset.toUpperCase()}</div>
                <div>OPTICAL ZOOM: {zoomLevel.toFixed(1)}x</div>
                <div>FOV: 114° ULTRA-WIDE CORRIDOR</div>
              </div>
            </div>

            {/* PTZ Control Bar */}
            <div className="p-3 bg-[#151515] border-t border-neutral-800 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-neutral-400 text-[11px] uppercase font-bold mr-1">Camera Presets:</span>
                {(['canopy', 'nozzle', 'anpr'] as const).map((preset) => (
                  <button
                    key={preset}
                    id={`ptz-preset-${preset}-btn`}
                    onClick={() => setActivePtzPreset(preset)}
                    className={`px-2.5 py-1 rounded text-xs uppercase font-medium transition-all ${
                      activePtzPreset === preset
                        ? 'bg-[#ff6b00] text-white font-bold'
                        : 'bg-[#222222] text-neutral-300 hover:bg-[#2d2d2d]'
                    }`}
                  >
                    {preset === 'anpr' ? 'Number Plate' : preset}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="zoom-out-btn"
                  onClick={() => setZoomLevel(prev => Math.max(1, prev - 0.25))}
                  className="p-1.5 rounded bg-[#252525] text-white hover:bg-[#333333]"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-neutral-300 text-xs px-1">{zoomLevel.toFixed(1)}x</span>
                <button
                  id="zoom-in-btn"
                  onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.25))}
                  className="p-1.5 rounded bg-[#252525] text-white hover:bg-[#333333]"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  id="expanded-cam-intercom-btn"
                  onClick={() => {
                    setSelectedFeedForModal(null);
                    onOpenIntercom(selectedFeedForModal.title);
                  }}
                  className="px-3 py-1.5 rounded bg-[#ff6b00] text-white font-condensed font-bold text-xs uppercase tracking-wider flex items-center gap-1 ml-2"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Talk to Bay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
