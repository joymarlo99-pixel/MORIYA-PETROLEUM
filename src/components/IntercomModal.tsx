import React, { useState } from 'react';
import { STATION_METADATA } from '../data/stationData';
import { X, Mic, MicOff, Radio, PhoneCall, Volume2, Shield, AlertTriangle } from 'lucide-react';

interface IntercomModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetBay?: string;
}

export const IntercomModal: React.FC<IntercomModalProps> = ({
  isOpen,
  onClose,
  targetBay = 'Bay 1 High-Flow',
}) => {
  const [selectedChannel, setSelectedChannel] = useState(targetBay);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [lastAnnouncement, setLastAnnouncement] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickAnnouncements = [
    "Nozzle 01 Ready • Please switch off engine and engage handbrake.",
    "High-Flow corridor clear • Tata/Ashok Leyland multi-axle pull up to Bay 1.",
    "CCTV surveillance token verified • Remote monitoring stream unlocked.",
    "Tire Care & Nitrogen attendant dispatched to vehicle.",
    "PESO Safety Protocol: Mobile phones prohibited within 5m of dispenser.",
  ];

  const handleBroadcast = (text: string) => {
    setLastAnnouncement(text);
    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#181818] border border-neutral-700 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#201f1f] border-b border-neutral-700">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#ff6b00] animate-pulse" />
            <h3 className="font-condensed text-lg font-bold text-white tracking-wide uppercase">
              Forecourt Bay Intercom Matrix
            </h3>
          </div>
          <button 
            id="close-intercom-modal-btn"
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Channel Selector */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1.5">
              Active Audio Channel
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['Bay 1 High-Flow', 'Bay 2 Cars/Bikes', 'Bay 3 ATM/Air', 'Forecourt Manager', 'Sovereign Command'].map((channel) => (
                <button
                  key={channel}
                  id={`channel-${channel.toLowerCase().replace(/[^a-z0-9]/g, '-')}-btn`}
                  onClick={() => setSelectedChannel(channel)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-all ${
                    selectedChannel === channel
                      ? 'bg-[#ff6b00] text-white border-[#ff6b00] shadow-sm font-semibold'
                      : 'bg-[#121212] text-neutral-300 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {channel}
                </button>
              ))}
            </div>
          </div>

          {/* Audio Telemetry Visualizer */}
          <div className="bg-[#101010] border border-neutral-800 p-4 rounded-xl text-center space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                FULL DUPLEX AUDIO: {selectedChannel}
              </span>
              <span className="font-mono text-neutral-500">AES-128 CORRIDOR</span>
            </div>

            {/* Audio Waveform */}
            <div className="h-14 flex items-center justify-center gap-1.5 py-2">
              {[40, 65, 25, 80, 50, 95, 30, 70, 45, 85, 60, 35, 90, 55, 75, 40].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-200 ${
                    isTransmitting
                      ? 'bg-[#ff6b00] animate-pulse'
                      : 'bg-neutral-700'
                  }`}
                  style={{ height: isTransmitting ? `${Math.max(15, (h * Math.random() + 20))}%` : '20%' }}
                ></div>
              ))}
            </div>

            <p className="text-xs text-neutral-300">
              {isTransmitting ? (
                <span className="text-[#ff6b00] font-semibold animate-pulse">
                  TRANSMITTING TO {selectedChannel.toUpperCase()}...
                </span>
              ) : (
                <span className="text-neutral-500">Channel open. Ready for microphone transmission or PA alert.</span>
              )}
            </p>

            {lastAnnouncement && (
              <div className="p-2 bg-[#1c1b1b] rounded border border-neutral-800 text-left text-xs text-neutral-300">
                <span className="text-neutral-500 text-[10px] block uppercase">Last Broadcast:</span>
                "{lastAnnouncement}"
              </div>
            )}
          </div>

          {/* Push to talk button */}
          <button
            id="push-to-talk-btn"
            onMouseDown={() => setIsTransmitting(true)}
            onMouseUp={() => setIsTransmitting(false)}
            onTouchStart={() => setIsTransmitting(true)}
            onTouchEnd={() => setIsTransmitting(false)}
            className={`w-full py-3 rounded-lg font-condensed text-base font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
              isTransmitting
                ? 'bg-red-600 text-white shadow-lg scale-[0.99]'
                : 'bg-[#ff6b00] hover:bg-[#ff7a1a] text-white shadow-md'
            }`}
          >
            {isTransmitting ? <Mic className="w-5 h-5 animate-pulse" /> : <MicOff className="w-5 h-5" />}
            <span>{isTransmitting ? 'HOLDING: MIC BROADCAST LIVE' : 'PRESS & HOLD TO TALK TO BAY'}</span>
          </button>

          {/* Quick Pre-recorded Canned Announcements */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1.5">
              1-Touch Automated Bay Announcements
            </label>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {quickAnnouncements.map((ann, idx) => (
                <button
                  key={idx}
                  id={`quick-announcement-${idx}-btn`}
                  onClick={() => handleBroadcast(ann)}
                  className="w-full text-left p-2 rounded bg-[#141414] hover:bg-[#201f1f] border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between group transition-colors"
                >
                  <span className="truncate mr-2 font-sans">{ann}</span>
                  <Volume2 className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#ff6b00] flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Direct Phone Escalation Contacts */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              id="call-manager-rahul-btn"
              href={`tel:${STATION_METADATA.manager.phone}`}
              className="p-2.5 bg-[#201f1f] border border-neutral-700 hover:border-neutral-600 rounded-lg text-left transition-all group"
            >
              <span className="text-[10px] text-neutral-400 block uppercase">Forecourt Manager</span>
              <span className="text-xs font-bold text-white block truncate">{STATION_METADATA.manager.name}</span>
              <span className="text-[11px] text-[#34d399] flex items-center gap-1 mt-0.5">
                <PhoneCall className="w-3 h-3" />
                {STATION_METADATA.manager.phone}
              </span>
            </a>

            <a
              id="call-sovereign-yash-btn"
              href={`tel:${STATION_METADATA.sovereignOwner.phone}`}
              className="p-2.5 bg-[#201f1f] border border-neutral-700 hover:border-neutral-600 rounded-lg text-left transition-all group"
            >
              <span className="text-[10px] text-neutral-400 block uppercase">Station Sovereign</span>
              <span className="text-xs font-bold text-white block truncate">{STATION_METADATA.sovereignOwner.name}</span>
              <span className="text-[11px] text-[#ff6b00] flex items-center gap-1 mt-0.5">
                <PhoneCall className="w-3 h-3" />
                {STATION_METADATA.sovereignOwner.phone}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
