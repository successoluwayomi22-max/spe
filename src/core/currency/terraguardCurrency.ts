import type { CurrencyCode, ExchangeRateInfo } from '../../types/terraguard';

export interface CurrencyMeta extends ExchangeRateInfo {}

export const INITIAL_CURRENCY_REGISTRY: Record<CurrencyCode, CurrencyMeta> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rateToUSD: 1.0,
    change24h: 0.0,
    trend: 'stable',
    lastUpdated: 'Live Interbank',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    rateToUSD: 0.774,
    change24h: +0.28,
    trend: 'up',
    lastUpdated: '1 min ago',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rateToUSD: 0.918,
    change24h: -0.14,
    trend: 'down',
    lastUpdated: 'Just now',
  },
  CAD: {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
    rateToUSD: 1.356,
    change24h: +0.41,
    trend: 'up',
    lastUpdated: '2 mins ago',
  },
  NGN: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira (NAFEM)',
    rateToUSD: 1548.5,
    change24h: -1.24,
    trend: 'down',
    lastUpdated: 'Central Bank / NAFEM',
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    name: 'UAE Dirham',
    rateToUSD: 3.672,
    change24h: 0.0,
    trend: 'stable',
    lastUpdated: 'Pegged Live',
  },
  CNY: {
    code: 'CNY',
    symbol: '¥',
    name: 'Chinese Yuan',
    rateToUSD: 7.124,
    change24h: +0.18,
    trend: 'up',
    lastUpdated: 'PBOC Fix',
  },
  CHF: {
    code: 'CHF',
    symbol: 'CHF ',
    name: 'Swiss Franc',
    rateToUSD: 0.852,
    change24h: -0.32,
    trend: 'down',
    lastUpdated: 'SNB Rate',
  },
};

// Global in-memory dynamic state with simulated real-world ticks
let currentRegistry: Record<CurrencyCode, CurrencyMeta> = { ...INITIAL_CURRENCY_REGISTRY };
const listeners: Array<(registry: Record<CurrencyCode, CurrencyMeta>) => void> = [];

export function getCurrencyRegistry(): Record<CurrencyCode, CurrencyMeta> {
  return currentRegistry;
}

export function subscribeToRates(callback: (registry: Record<CurrencyCode, CurrencyMeta>) => void): () => void {
  listeners.push(callback);
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx > -1) listeners.splice(idx, 1);
  };
}

export function refreshLiveMarketRates(): Record<CurrencyCode, CurrencyMeta> {
  // Real-world micro-fluctuation jitter based on currency market volatility
  const updated: Record<CurrencyCode, CurrencyMeta> = { ...currentRegistry };
  
  (Object.keys(updated) as CurrencyCode[]).forEach((code) => {
    if (code === 'USD' || code === 'AED') return; // USD base & AED hard peg
    
    // micro jitter between -0.3% and +0.3%
    const jitter = (Math.random() - 0.5) * 0.006;
    const newRate = Number((updated[code].rateToUSD * (1 + jitter)).toFixed(4));
    const deltaChange = Number(((jitter * 100) + updated[code].change24h).toFixed(2));
    
    updated[code] = {
      ...updated[code],
      rateToUSD: newRate,
      change24h: deltaChange,
      trend: deltaChange > 0.05 ? 'up' : deltaChange < -0.05 ? 'down' : 'stable',
      lastUpdated: 'Just now',
    };
  });

  currentRegistry = updated;
  listeners.forEach((fn) => fn(currentRegistry));
  return currentRegistry;
}

export function convertFromUSD(amountUSD: number, targetCurrency: CurrencyCode): number {
  const meta = currentRegistry[targetCurrency] || currentRegistry.USD;
  return amountUSD * meta.rateToUSD;
}

export function formatCurrency(amountUSD: number, currency: CurrencyCode): string {
  const meta = currentRegistry[currency] || currentRegistry.USD;
  const converted = convertFromUSD(amountUSD, currency);

  if (currency === 'NGN') {
    return `${meta.symbol}${Math.round(converted).toLocaleString()}`;
  }
  if (currency === 'CNY') {
    return `${meta.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })}`;
  }
  return `${meta.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

