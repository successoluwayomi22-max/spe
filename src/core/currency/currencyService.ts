// XERXES Multi-Currency Engine
import type { CurrencyCode } from '../../types';

export interface CurrencyRate {
  code: CurrencyCode;
  name: string;
  symbol: string;
  rateAgainstUSD: number; // 1 USD = X in currency
}

export const CURRENCY_REGISTRY: Record<CurrencyCode, CurrencyRate> = {
  NGN: { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', rateAgainstUSD: 1450.0 },
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', rateAgainstUSD: 1.0 },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', rateAgainstUSD: 0.78 },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', rateAgainstUSD: 0.92 },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', rateAgainstUSD: 1.36 },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rateAgainstUSD: 1.52 },
};

export const LAST_UPDATED_TIMESTAMP = '2026-09-10T12:00:00Z';

export function convertCurrency(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode
): { convertedAmount: number; rate: number; timestamp: string } {
  const fromRate = CURRENCY_REGISTRY[from].rateAgainstUSD;
  const toRate = CURRENCY_REGISTRY[to].rateAgainstUSD;

  // Convert from origin to USD, then from USD to target
  const inUSD = amount / fromRate;
  const convertedAmount = inUSD * toRate;
  const directRate = toRate / fromRate;

  return {
    convertedAmount: Math.round(convertedAmount * 100) / 100,
    rate: directRate,
    timestamp: LAST_UPDATED_TIMESTAMP,
  };
}

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  const meta = CURRENCY_REGISTRY[currency];
  return `${meta.symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
