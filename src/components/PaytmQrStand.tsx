import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { STATION_METADATA } from '../data/stationData';
import { Check, Copy, ExternalLink, ShieldCheck } from 'lucide-react';

interface PaytmQrStandProps {
  amount?: number;
  purpose?: string;
  size?: number;
  showActions?: boolean;
}

export const PaytmQrStand: React.FC<PaytmQrStandProps> = ({
  amount,
  purpose = 'Fuel & Forecourt Services',
  size = 200,
  showActions = true,
}) => {
  const [copied, setCopied] = React.useState(false);
  const upiId = STATION_METADATA.upiId; // paytm.s1pmcch@pty

  // Generate valid standard NPCI UPI URI string
  // Format: upi://pay?pa=paytm.s1pmcch@pty&pn=Moriya%20Petroleum&mc=5541&mode=02&purpose=00
  const upiUri = React.useMemo(() => {
    const params = new URLSearchParams({
      pa: upiId,
      pn: 'Moriya Petroleum',
      mc: '5541', // MCC for Fuel/Service Station
      mode: '02',
      cu: 'INR',
    });
    if (amount && amount > 0) {
      params.append('am', amount.toFixed(2));
    }
    return `upi://pay?${params.toString()}`;
  }, [upiId, amount]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[340px] mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-[#00baf2]/40 text-neutral-900 select-none font-sans">
      {/* Top Bright Yellow Banner - Matching user's uploaded Paytm Stand (Image: WhatsApp Image 2026-09-21) */}
      <div className="relative bg-gradient-to-b from-[#ffcf00] to-[#fdb900] px-4 pt-3 pb-3 text-center overflow-hidden border-b-2 border-[#00baf2]">
        {/* Festive Confetti accents */}
        <div className="absolute top-1 left-3 w-2 h-2 rounded-full bg-blue-500 opacity-70 transform rotate-12"></div>
        <div className="absolute top-2 left-10 w-2.5 h-1 bg-green-500 rounded-sm opacity-70 transform -rotate-45"></div>
        <div className="absolute top-3 right-6 w-2 h-2 bg-red-500 rounded-sm opacity-70 transform rotate-45"></div>
        <div className="absolute top-1 right-12 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-70"></div>
        <div className="absolute bottom-2 left-6 w-2 h-1 bg-purple-500 opacity-60"></div>
        <div className="absolute bottom-3 right-4 w-2.5 h-1 bg-amber-600 opacity-60"></div>

        <span className="text-[11px] font-bold text-neutral-900 tracking-wide uppercase block">
          Get Assured
        </span>
        <div className="font-black text-2xl tracking-wider text-[#00baf2] drop-shadow-[0_1.5px_0_#002e6e] uppercase leading-none my-0.5">
          CASHBACK
        </div>
        <div className="inline-block mt-1 px-3 py-0.5 bg-white text-[#002e6e] text-[10px] font-bold rounded-full shadow-sm tracking-wide">
          Scan in Paytm App
        </div>
      </div>

      {/* Cyan Curved Accent Line */}
      <div className="h-1.5 bg-[#00baf2] w-full"></div>

      {/* White Card Body with Paytm Logo and Scannable QR Code */}
      <div className="bg-white px-5 pt-3 pb-4 text-center">
        {/* Paytm Logo */}
        <div className="flex items-center justify-center gap-0.5 mb-2">
          <span className="font-black text-2xl tracking-tighter text-[#002e6e]">pay</span>
          <span className="font-black text-2xl tracking-tighter text-[#00baf2]">tm</span>
        </div>

        {/* 100% Mathematically Scannable Real QR Code */}
        <div className="relative mx-auto inline-block p-2.5 bg-white rounded-2xl shadow-md border-2 border-neutral-200">
          <QRCodeSVG
            value={upiUri}
            size={size}
            level="M"
            marginSize={1}
            className="rounded-lg"
          />
        </div>

        {/* Exact UPI ID beneath QR */}
        <div className="mt-2.5">
          <p className="text-xs font-bold text-neutral-800 tracking-tight">
            UPI ID: <span className="font-mono text-neutral-950 font-extrabold">{upiId}</span>
          </p>
          {amount && amount > 0 && (
            <p className="text-xs font-semibold text-[#00baf2] font-mono mt-0.5">
              Pay ₹{amount.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Blue Strip with Official UPI & Paytm Postpaid Brands */}
      <div className="bg-[#0f2e5c] px-4 py-2.5 text-white flex items-center justify-between gap-1 text-[9px] font-bold">
        {/* Paytm Postpaid */}
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 rounded bg-[#00baf2] flex items-center justify-center text-[10px] text-[#0f2e5c] font-black">
            ₹
          </span>
          <div className="leading-tight text-left">
            <span className="text-[#00baf2] block">paytm</span>
            <span className="text-white text-[8px]">Postpaid</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-white/20"></div>

        {/* UPI Standard */}
        <div className="flex items-center gap-1">
          <span className="text-white font-extrabold italic tracking-tighter text-[11px]">UPI</span>
          <div className="text-[7px] text-neutral-300 leading-tight text-left">
            <span>UNIFIED PAYMENTS</span>
            <br />
            <span>INTERFACE</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-white/20"></div>

        {/* UPI LITE */}
        <div className="flex items-center gap-1">
          <span className="text-white font-extrabold italic tracking-tighter text-[11px]">UPI</span>
          <span className="text-[7px] text-amber-400 font-black">LITE</span>
        </div>
      </div>

      {/* Interactive Helper Controls */}
      {showActions && (
        <div className="bg-[#f3f4f6] px-3 py-2 border-t border-neutral-200 flex items-center justify-between gap-2 text-xs">
          <button
            type="button"
            onClick={handleCopyUpi}
            className="flex-1 py-1.5 px-2 bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-700 font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors text-[11px]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-500" />}
            <span>{copied ? 'UPI Copied!' : 'Copy UPI ID'}</span>
          </button>

          <a
            href={upiUri}
            className="flex-1 py-1.5 px-2 bg-[#00baf2] hover:bg-[#009fd0] text-white font-bold rounded-lg flex items-center justify-center gap-1 transition-colors text-[11px] shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Pay with App</span>
          </a>
        </div>
      )}
    </div>
  );
};
