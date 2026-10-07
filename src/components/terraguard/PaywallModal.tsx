import React, { useState } from 'react';
import { CreditCard, Lock, Check, X, Loader2 } from 'lucide-react';
import type { CurrencyCode, PropertyAuditRecord } from '../../types/terraguard';
import { formatCurrency } from '../../core/currency/terraguardCurrency';
import { eventBus } from '../../core/events/terraguardEvents';

interface PaywallModalProps {
  audit: PropertyAuditRecord;
  currency: CurrencyCode;
  onSuccessUnlock: (auditId: string) => void;
  onClose: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  audit,
  currency,
  onSuccessUnlock,
  onClose,
}) => {
  const [selectedTier, setSelectedTier] = useState<'quick' | 'comprehensive' | 'enterprise'>('comprehensive');
  const [selectedGateway, setSelectedGateway] = useState<'Stripe' | 'Paystack'>(currency === 'NGN' ? 'Paystack' : 'Stripe');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const tierPrices = {
    quick: 29,
    comprehensive: 69,
    enterprise: 199,
  };

  const currentAmountUSD = tierPrices[selectedTier];

  const handlePay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      eventBus.emit({
        type: 'PAYMENT_CONFIRMED',
        summary: `Payment of $${currentAmountUSD} (${formatCurrency(currentAmountUSD, currency)}) confirmed via ${selectedGateway} for ${audit.propertyTitle}.`,
        actorRole: 'diaspora_investor',
        propertyId: audit.id,
      });

      setTimeout(() => {
        onSuccessUnlock(audit.id);
      }, 1200);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Payment Confirmed!</h3>
            <p className="text-sm font-mono text-emerald-400 mb-2">
              Full Due-Diligence Investor Pack Unlocked
            </p>
            <p className="text-xs text-slate-400">Loading your comprehensive report & PDF certificate...</p>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase mb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Instant Due-Diligence Unlock</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Protect Your Land Investment
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                Unlock full government gazette citations, licensed surveyor checks, and the official downloadable PDF certificate for:
              </p>
              <p className="text-xs font-mono font-bold text-emerald-400 mt-1">
                {audit.propertyTitle}
              </p>
            </div>

            {/* Pricing Tier Selector */}
            <div className="space-y-3 mb-6">
              {/* Quick Audit Tier */}
              <div
                onClick={() => setSelectedTier('quick')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedTier === 'quick'
                    ? 'bg-slate-800 border-emerald-500 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-white">Quick Beacon Check</strong>
                    <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-mono">Standard</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Boundary closure math & satellite map plot</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-mono text-white">
                    {formatCurrency(tierPrices.quick, currency)}
                  </span>
                </div>
              </div>

              {/* Investor Comprehensive Tier (Recommended) */}
              <div
                onClick={() => setSelectedTier('comprehensive')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex items-center justify-between ${
                  selectedTier === 'comprehensive'
                    ? 'bg-slate-800/90 border-emerald-400 shadow-xl shadow-emerald-500/20'
                    : 'bg-slate-900/60 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="absolute -right-8 top-3 bg-emerald-500 text-slate-950 text-[9px] font-extrabold uppercase py-0.5 px-8 rotate-45 font-mono shadow">
                  RECOMMENDED
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-white">Investor Comprehensive Pack</strong>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    10-Point Legal Checklist + Gazette Search + Official PDF Certificate
                  </p>
                </div>
                <div className="text-right pr-6 sm:pr-4">
                  <span className="text-xl font-extrabold font-mono text-emerald-400">
                    {formatCurrency(tierPrices.comprehensive, currency)}
                  </span>
                </div>
              </div>

              {/* Enterprise Pack */}
              <div
                onClick={() => setSelectedTier('enterprise')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedTier === 'enterprise'
                    ? 'bg-slate-800 border-purple-500 shadow-lg shadow-purple-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-white">Commercial Portfolio Pack</strong>
                    <span className="text-[10px] bg-purple-900/60 text-purple-300 border border-purple-700 px-2 py-0.5 rounded font-mono">5 Parcels</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">For multi-plot estate developments & syndicates</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-mono text-white">
                    {formatCurrency(tierPrices.enterprise, currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Gateway Selector */}
            <div className="mb-6">
              <label className="text-xs font-mono font-semibold text-slate-400 block mb-2">
                Select Payment Method:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedGateway('Stripe')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                    selectedGateway === 'Stripe'
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Stripe (USD/GBP/EUR/CAD)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedGateway('Paystack')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                    selectedGateway === 'Paystack'
                      ? 'bg-teal-600 text-white border-teal-400 shadow-md'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  <span>Paystack (NGN Cards & Transfer)</span>
                </button>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Secure Checkout...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 stroke-[2.5]" />
                  <span>Pay {formatCurrency(currentAmountUSD, currency)} & Unlock Report</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-slate-500 font-mono mt-3 flex items-center justify-center gap-1.5">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>256-Bit Encrypted Protocol. 100% Statutory Accuracy Guarantee.</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
