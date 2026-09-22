import React, { useState } from 'react';
import { STATION_METADATA } from '../data/stationData';
import { PaytmQrStand } from './PaytmQrStand';
import { X, Copy, Check, QrCode, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

interface PaytmQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  amount: number;
  purposeText: string;
  tokenCode?: string;
  onPaymentComplete: (utr: string) => void;
}

export const PaytmQrModal: React.FC<PaytmQrModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  amount,
  purposeText,
  tokenCode = '#MP-LKH-9482',
  onPaymentComplete,
}) => {
  const [copied, setCopied] = useState(false);
  const [enteredUtr, setEnteredUtr] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const upiId = STATION_METADATA.upiId;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = () => {
    setIsVerifying(true);
    const mockUtr = enteredUtr.trim() || `4098${Math.floor(10000000 + Math.random() * 90000000)}`;
    setTimeout(() => {
      setIsVerifying(false);
      onPaymentComplete(mockUtr);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#181818] border border-neutral-700 rounded-xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#201f1f] border-b border-neutral-700">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#ff6b00]" />
            <h3 className="font-condensed text-lg font-bold text-white tracking-wide uppercase">
              {title}
            </h3>
          </div>
          <button 
            id="close-qr-modal-btn"
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-center">
          {subtitle && (
            <p className="text-xs text-neutral-300 -mt-1">{subtitle}</p>
          )}

          {/* Amount Badge */}
          <div className="bg-[#252525] border border-neutral-700 p-3 rounded-lg flex items-center justify-between">
            <div className="text-left">
              <span className="text-[11px] text-neutral-400 block uppercase font-medium">
                {purposeText}
              </span>
              <span className="text-xs font-mono text-[#34d399] font-bold">
                Token: {tokenCode}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-neutral-400 block uppercase font-medium">Payable</span>
              <span className="font-condensed text-2xl font-bold text-white text-[#ff6b00]">
                ₹{amount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* 100% Scannable Authentic Paytm QR Stand */}
          <div className="py-1">
            <PaytmQrStand amount={amount} purpose={purposeText} size={180} showActions={true} />
          </div>

          {/* UPI ID Copy Strip */}
          <div className="flex items-center justify-between bg-[#121212] border border-neutral-800 px-3 py-2 rounded-lg text-xs font-mono text-neutral-200">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-neutral-500">UPI:</span>
              <span className="font-semibold text-neutral-200 truncate">{upiId}</span>
            </div>
            <button
              id="copy-upi-id-btn"
              onClick={handleCopyUpi}
              className="flex items-center gap-1 px-2 py-1 rounded bg-[#2a2a2a] hover:bg-[#383838] text-[11px] text-[#ff6b00] font-sans font-semibold transition-colors flex-shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#34d399]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Instant UTR Verification or Direct Simulation */}
          <div className="space-y-2 pt-1 text-left">
            <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
              12-Digit Bank UTR / Transaction Reference
            </label>
            <div className="flex gap-2">
              <input
                id="modal-utr-input"
                type="text"
                placeholder="e.g. 409822319081"
                value={enteredUtr}
                onChange={(e) => setEnteredUtr(e.target.value)}
                className="w-full px-3 py-2 bg-[#121212] border border-neutral-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-[#ff6b00]"
              />
              <button
                id="modal-submit-utr-btn"
                disabled={isVerifying}
                onClick={handleSimulatePayment}
                className="px-4 py-2 bg-[#ff6b00] hover:bg-[#ff7b1a] text-white font-condensed font-bold text-sm tracking-wider uppercase rounded-lg disabled:opacity-50 transition-all flex items-center gap-1 flex-shrink-0"
              >
                {isVerifying ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </div>

          {/* Auto Verification shortcut */}
          <button
            id="modal-quick-auto-pay-btn"
            disabled={isVerifying}
            onClick={handleSimulatePayment}
            className="w-full py-2.5 bg-[#34d399]/15 hover:bg-[#34d399]/25 border border-[#34d399]/40 text-[#34d399] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Simulate Successful UPI Instant Credit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#141414] border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#34d399]" />
            Zero surcharge • Instant desk reconciliation
          </span>
          <span className="text-neutral-500 font-mono">IOCL-24391</span>
        </div>
      </div>
    </div>
  );
};
