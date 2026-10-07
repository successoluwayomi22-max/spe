import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Activity } from 'lucide-react';
import type { CurrencyCode } from '../../types/terraguard';
import { getCurrencyRegistry, subscribeToRates, refreshLiveMarketRates, type CurrencyMeta } from '../../core/currency/terraguardCurrency';

interface CurrencyTickerProps {
  currentCurrency: CurrencyCode;
  onSelectCurrency: (currency: CurrencyCode) => void;
}

export const CurrencyTicker: React.FC<CurrencyTickerProps> = ({
  currentCurrency,
  onSelectCurrency,
}) => {
  const [rates, setRates] = useState<Record<CurrencyCode, CurrencyMeta>>(getCurrencyRegistry());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastTick, setLastTick] = useState<string>('Live');

  useEffect(() => {
    const unsub = subscribeToRates((updated) => {
      setRates({ ...updated });
      setLastTick(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    });

    // Simulated periodic market ticks every 25 seconds
    const interval = setInterval(() => {
      refreshLiveMarketRates();
    }, 25000);

    return () => {
      unsub();
      clearInterval(interval);
    };
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    refreshLiveMarketRates();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const currencyList = Object.values(rates);

  return (
    <div className="bg-[#05070A] border-b border-slate-800/80 py-1.5 px-4 text-xs font-mono overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Market Status Label */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold hidden sm:inline flex items-center gap-1">
            <Activity className="w-3 h-3 text-emerald-400" />
            FX Volatility Index
          </span>
          <span className="text-[10px] text-slate-500 hidden md:inline">[{lastTick}]</span>
        </div>

        {/* Currency Pairs Scrolling / Grid */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5 flex-1 justify-start sm:justify-center">
          {currencyList.filter((item) => item.code !== 'USD').map((item) => {
            const isSelected = item.code === currentCurrency;
            const isUp = item.change24h > 0;
            const isDown = item.change24h < 0;

            return (
              <button
                key={item.code}
                onClick={() => onSelectCurrency(item.code)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition-all duration-150 ${
                  isSelected
                    ? 'bg-slate-800 text-white border border-emerald-500/50 shadow-sm shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                }`}
                title={`Click to switch app currency to ${item.name}`}
              >
                <span className="font-bold text-slate-300">USD/{item.code}</span>
                <span className="text-white font-medium">
                  {item.code === 'NGN' ? Math.round(item.rateToUSD).toLocaleString() : item.rateToUSD.toFixed(3)}
                </span>
                
                {item.code !== 'USD' && (
                  <span
                    className={`flex items-center text-[10px] font-semibold ${
                      isUp ? 'text-emerald-400' : isDown ? 'text-red-400' : 'text-slate-400'
                    }`}
                  >
                    {isUp ? (
                      <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                    ) : isDown ? (
                      <TrendingDown className="w-2.5 h-2.5 mr-0.5" />
                    ) : null}
                    {item.change24h > 0 ? `+${item.change24h}%` : `${item.change24h}%`}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Refresh button */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="p-1 rounded text-slate-400 hover:text-emerald-400 hover:bg-slate-800/80 transition-colors flex items-center gap-1 text-[11px]"
            title="Refresh Live Interbank Rates"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
            <span className="hidden lg:inline text-[10px]">Sync Rates</span>
          </button>
        </div>
      </div>
    </div>
  );
};
