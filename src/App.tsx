/**
 * Moriya Petroleum - Indian Oil Retail Outlet #24391
 * Comprehensive Forecourt Operations, Surveillance Matrix, Direct Token Dispatcher & Fleet Gateway
 */
import React, { useState } from 'react';
import { ViewScreen, DeviceMode, CCTVFeed, CCTVQueueItem, PaytmTransaction, UndergroundTank, TrafficTelemetry } from './types';
import { 
  STATION_METADATA, 
  INITIAL_RATES, 
  INITIAL_CCTV_FEEDS, 
  INITIAL_CCTV_QUEUE, 
  INITIAL_PAYTM_TRANSACTIONS, 
  INITIAL_TANKS, 
  INITIAL_TRAFFIC 
} from './data/stationData';
import { Header } from './components/Header';
import { CustomerFuelBooking } from './components/CustomerFuelBooking';
import { LiveCctvFeeds } from './components/LiveCctvFeeds';
import { TransporterPortal } from './components/TransporterPortal';
import { MasterControlCenter } from './components/MasterControlCenter';
import { DesktopDispatcher } from './components/DesktopDispatcher';
import { PaytmQrModal } from './components/PaytmQrModal';
import { IntercomModal } from './components/IntercomModal';
import { ASSETS } from './assets';
import { Wifi, BatteryMedium, Signal, AlertTriangle } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ViewScreen>('customer-booking');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('responsive');
  const [isDayMode, setIsDayMode] = useState<boolean>(false);
  const [petrolRate, setPetrolRate] = useState<number>(INITIAL_RATES.petrol);
  const [dieselRate, setDieselRate] = useState<number>(INITIAL_RATES.diesel);
  const [isEmergencyLocked, setIsEmergencyLocked] = useState<boolean>(false);

  // Dynamic state stores
  const [cctvFeeds, setCctvFeeds] = useState<CCTVFeed[]>(INITIAL_CCTV_FEEDS);
  const [queueItems, setQueueItems] = useState<CCTVQueueItem[]>(INITIAL_CCTV_QUEUE);
  const [paytmTransactions, setPaytmTransactions] = useState<PaytmTransaction[]>(INITIAL_PAYTM_TRANSACTIONS);
  const [tanks, setTanks] = useState<UndergroundTank[]>(INITIAL_TANKS);
  const [traffic, setTraffic] = useState<TrafficTelemetry>(INITIAL_TRAFFIC);

  // Modal States
  const [qrModal, setQrModal] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    amount: number;
    purposeText: string;
    tokenCode?: string;
  }>({
    isOpen: false,
    title: '',
    amount: 0,
    purposeText: '',
  });

  const [intercomModal, setIntercomModal] = useState<{
    isOpen: boolean;
    targetBay: string;
  }>({
    isOpen: false,
    targetBay: 'Bay 1 High-Flow',
  });

  // Handlers
  const handleOpenQrModal = (title: string, amount: number, purpose: string, token: string) => {
    setQrModal({
      isOpen: true,
      title,
      subtitle: `Instant reconciliation for ${purpose}`,
      amount,
      purposeText: purpose,
      tokenCode: token,
    });
  };

  const handlePaymentComplete = (utr: string) => {
    // Add transaction to Paytm list
    const newTx: PaytmTransaction = {
      id: `tx-${Date.now()}`,
      amount: qrModal.amount,
      customerName: 'Highway Patron / Driver',
      utrNumber: utr,
      description: `${qrModal.purposeText} • ${qrModal.tokenCode}`,
      status: 'APPROVED',
      timestamp: 'Just now',
      tokenCode: qrModal.tokenCode,
    };
    setPaytmTransactions(prev => [newTx, ...prev]);

    // If it's a CCTV token, unlock the first camera
    if (qrModal.amount === 5) {
      setCctvFeeds(prev => prev.map(feed => ({ ...feed, isLocked: false })));
    }
  };

  const handleUnlockFeed = (camId: string) => {
    setCctvFeeds(prev => prev.map(feed => 
      feed.id === camId ? { ...feed, isLocked: false } : feed
    ));
  };

  const handleUpdateQueueItem = (id: string, updates: Partial<CCTVQueueItem>) => {
    setQueueItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const handleApproveTransaction = (id: string) => {
    setPaytmTransactions(prev => prev.map(tx => 
      tx.id === id ? { ...tx, status: 'APPROVED' } : tx
    ));
  };

  const handleUpdateRates = (petrol: number, diesel: number) => {
    setPetrolRate(petrol);
    setDieselRate(diesel);
  };

  const handleOpenIntercom = (bay: string) => {
    setIntercomModal({
      isOpen: true,
      targetBay: bay,
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDayMode ? 'bg-[#f4f3f0] text-[#1c1b1b]' : 'bg-[#131313] text-[#e5e2e1]'
    }`}>
      {/* Emergency Trip Banner */}
      {isEmergencyLocked && (
        <div className="bg-red-600 text-white font-condensed tracking-wider font-bold text-sm px-4 py-2 text-center uppercase flex items-center justify-center gap-2 sticky top-0 z-50 animate-pulse">
          <AlertTriangle className="w-5 h-5" />
          <span>EMERGENCY FORECOURT POWER TRIPPED: ALL DISPENSER VALVES CLOSED</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        deviceMode={deviceMode}
        onToggleDeviceMode={setDeviceMode}
        isDayMode={isDayMode}
        onToggleDayMode={() => setIsDayMode(!isDayMode)}
        petrolRate={petrolRate}
        dieselRate={dieselRate}
        isEmergencyLocked={isEmergencyLocked}
        onOpenIntercom={handleOpenIntercom}
      />

      {/* Main Content Area: Supports Auto Fluid, Simulated Mobile Phone Frame, or Desktop Wide */}
      <main className="p-3 sm:p-5 lg:p-6">
        {deviceMode === 'mobile-simulated' ? (
          /* Realistic Smartphone Chassis Frame replicating the exact mobile screens from images */
          <div className="flex flex-col items-center justify-center my-2">
            <div className="text-center mb-3 text-xs text-neutral-400">
              <span className="font-mono text-[#ff6b00]">Simulating Highway Smartphone Device Frame</span> (as shown in Screenshots 1, 4, 8, 12, 15)
            </div>
            
            <div className="relative w-full max-w-[420px] bg-[#0c0c0c] rounded-[42px] p-3.5 shadow-2xl border-4 border-neutral-700 ring-1 ring-neutral-800">
              {/* Phone Speaker & Dynamic Island */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-neutral-900 mr-2 border border-neutral-800"></div>
                <div className="w-8 h-1 bg-neutral-800 rounded-full"></div>
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between px-6 pt-2 pb-1 text-[11px] font-mono text-neutral-300 select-none">
                <span>09:41</span>
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3 h-3" />
                  <span className="text-[10px] font-bold">5G</span>
                  <Wifi className="w-3 h-3" />
                  <BatteryMedium className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Mobile Screen Container */}
              <div className="rounded-[30px] overflow-hidden bg-[#131313] min-h-[700px] max-h-[780px] overflow-y-auto p-3 text-left">
                {currentScreen === 'customer-booking' && (
                  <CustomerFuelBooking
                    petrolRate={petrolRate}
                    dieselRate={dieselRate}
                    onOpenQrModal={handleOpenQrModal}
                    onNavigateToCctv={() => setCurrentScreen('live-cctv')}
                    onNavigateToTransporter={() => setCurrentScreen('transporter-portal')}
                    onOpenIntercom={handleOpenIntercom}
                  />
                )}

                {currentScreen === 'live-cctv' && (
                  <LiveCctvFeeds
                    cctvFeeds={cctvFeeds}
                    onUnlockFeed={handleUnlockFeed}
                    onOpenQrModal={handleOpenQrModal}
                    onOpenIntercom={handleOpenIntercom}
                    onNavigateToTransporter={() => setCurrentScreen('transporter-portal')}
                    onNavigateToMasterControl={() => setCurrentScreen('master-control')}
                  />
                )}

                {currentScreen === 'transporter-portal' && (
                  <TransporterPortal
                    onOpenQrModal={handleOpenQrModal}
                    onNavigateToManager={() => setCurrentScreen('master-control')}
                    onNavigateToOwner={() => setCurrentScreen('master-control')}
                    onOpenIntercom={handleOpenIntercom}
                  />
                )}

                {currentScreen === 'master-control' && (
                  <MasterControlCenter
                    cctvFeeds={cctvFeeds}
                    queueItems={queueItems}
                    onUpdateQueueItem={handleUpdateQueueItem}
                    paytmTransactions={paytmTransactions}
                    onApproveTransaction={handleApproveTransaction}
                    petrolRate={petrolRate}
                    dieselRate={dieselRate}
                    onUpdateRates={handleUpdateRates}
                    isEmergencyLocked={isEmergencyLocked}
                    onToggleEmergencyLock={() => setIsEmergencyLocked(!isEmergencyLocked)}
                    onOpenIntercom={handleOpenIntercom}
                  />
                )}

                {currentScreen === 'desktop-dispatcher' && (
                  <DesktopDispatcher
                    petrolRate={petrolRate}
                    dieselRate={dieselRate}
                    tanks={tanks}
                    traffic={traffic}
                    onOpenQrModal={handleOpenQrModal}
                    onOpenIntercom={handleOpenIntercom}
                  />
                )}
              </div>

              {/* Home Indicator Bar */}
              <div className="w-32 h-1 bg-neutral-600 rounded-full mx-auto mt-2"></div>
            </div>
          </div>
        ) : (
          /* Standard Fluid or Desktop Wide View */
          <div className={deviceMode === 'desktop-wide' ? 'max-w-7xl mx-auto' : 'max-w-6xl mx-auto'}>
            {currentScreen === 'customer-booking' && (
              <CustomerFuelBooking
                petrolRate={petrolRate}
                dieselRate={dieselRate}
                onOpenQrModal={handleOpenQrModal}
                onNavigateToCctv={() => setCurrentScreen('live-cctv')}
                onNavigateToTransporter={() => setCurrentScreen('transporter-portal')}
                onOpenIntercom={handleOpenIntercom}
              />
            )}

            {currentScreen === 'live-cctv' && (
              <LiveCctvFeeds
                cctvFeeds={cctvFeeds}
                onUnlockFeed={handleUnlockFeed}
                onOpenQrModal={handleOpenQrModal}
                onOpenIntercom={handleOpenIntercom}
                onNavigateToTransporter={() => setCurrentScreen('transporter-portal')}
                onNavigateToMasterControl={() => setCurrentScreen('master-control')}
              />
            )}

            {currentScreen === 'transporter-portal' && (
              <TransporterPortal
                onOpenQrModal={handleOpenQrModal}
                onNavigateToManager={() => setCurrentScreen('master-control')}
                onNavigateToOwner={() => setCurrentScreen('master-control')}
                onOpenIntercom={handleOpenIntercom}
              />
            )}

            {currentScreen === 'master-control' && (
              <MasterControlCenter
                cctvFeeds={cctvFeeds}
                queueItems={queueItems}
                onUpdateQueueItem={handleUpdateQueueItem}
                paytmTransactions={paytmTransactions}
                onApproveTransaction={handleApproveTransaction}
                petrolRate={petrolRate}
                dieselRate={dieselRate}
                onUpdateRates={handleUpdateRates}
                isEmergencyLocked={isEmergencyLocked}
                onToggleEmergencyLock={() => setIsEmergencyLocked(!isEmergencyLocked)}
                onOpenIntercom={handleOpenIntercom}
              />
            )}

            {currentScreen === 'desktop-dispatcher' && (
              <DesktopDispatcher
                petrolRate={petrolRate}
                dieselRate={dieselRate}
                tanks={tanks}
                traffic={traffic}
                onOpenQrModal={handleOpenQrModal}
                onOpenIntercom={handleOpenIntercom}
              />
            )}
          </div>
        )}
      </main>

      {/* Global Modals */}
      <PaytmQrModal
        isOpen={qrModal.isOpen}
        onClose={() => setQrModal(prev => ({ ...prev, isOpen: false }))}
        title={qrModal.title}
        subtitle={qrModal.subtitle}
        amount={qrModal.amount}
        purposeText={qrModal.purposeText}
        tokenCode={qrModal.tokenCode}
        onPaymentComplete={handlePaymentComplete}
      />

      <IntercomModal
        isOpen={intercomModal.isOpen}
        onClose={() => setIntercomModal(prev => ({ ...prev, isOpen: false }))}
        targetBay={intercomModal.targetBay}
      />
    </div>
  );
}
