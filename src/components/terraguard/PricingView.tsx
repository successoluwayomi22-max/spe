import React from 'react';
import { Check, HelpCircle, X } from 'lucide-react';
import type { CurrencyCode } from '../../types/terraguard';
import { formatCurrency } from '../../core/currency/terraguardCurrency';

interface PricingViewProps {
  currency: CurrencyCode;
  onOpenPaywall: () => void;
  onOpenUpload: () => void;
}

export const PricingView: React.FC<PricingViewProps> = ({
  currency,
  onOpenPaywall,
  onOpenUpload,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold uppercase">
          Transparent Investor Pricing
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display mt-3 mb-4">
          Save Millions. Audit Before You Pay.
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          A single land fraud or demolition can wipe out tens of thousands of dollars. Protect your life savings with instant, cryptographic cadastral audits.
        </p>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Tier 1: Quick Beacon Check */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl backdrop-blur-md">
          <div>
            <span className="text-xs uppercase font-mono text-slate-400 font-bold block mb-1">
              Standard Check
            </span>
            <h3 className="text-xl font-bold text-white mb-2">Quick Beacon Check</h3>
            <p className="text-xs text-slate-400 mb-6">
              Ideal for initial plot screening before visiting the site or paying an inspection fee.
            </p>
            <div className="flex items-baseline gap-1 font-mono mb-6">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                {formatCurrency(29, currency)}
              </span>
              <span className="text-xs text-slate-400">/ plot</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 font-mono mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Beacon coordinate extraction & map plot</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Traverse mathematical closure calculation</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Government Acquisition collision flag</span>
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <span className="w-4 h-4 flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-slate-500" />
                </span>
                <span>Official PDF Certificate</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenUpload}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
          >
            Start Quick Scan
          </button>
        </div>

        {/* Tier 2: Investor Comprehensive (Featured) */}
        <div className="bg-slate-900/90 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative backdrop-blur-xl scale-105">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase px-4 py-1 rounded-full font-mono shadow-md">
            MOST POPULAR FOR DIASPORA
          </div>

          <div>
            <span className="text-xs uppercase font-mono text-emerald-400 font-bold block mb-1">
              Full Legal Protection
            </span>
            <h3 className="text-xl font-bold text-white mb-2">Investor Comprehensive</h3>
            <p className="text-xs text-slate-300 mb-6">
              Complete due-diligence pack for buyers about to transfer purchase deposits.
            </p>
            <div className="flex items-baseline gap-1 font-mono mb-6">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                {formatCurrency(69, currency)}
              </span>
              <span className="text-xs text-slate-400">/ plot</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-200 font-mono mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Everything in Quick Check</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>10-Point Forensic Due-Diligence Audit</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Official Gazette Citation & Volume verification</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>SURCON Licensed Surveyor standing check</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Downloadable Branded PDF Trust Certificate</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Tamper-evident SHA-256 verification QR code</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenPaywall}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-xl shadow-emerald-500/25 transition-all hover:scale-105"
          >
            Get Comprehensive Pack ({formatCurrency(69, currency)})
          </button>
        </div>

        {/* Tier 3: Commercial Syndicate Pack */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl backdrop-blur-md">
          <div>
            <span className="text-xs uppercase font-mono text-purple-400 font-bold block mb-1">
              For Developers & Law Firms
            </span>
            <h3 className="text-xl font-bold text-white mb-2">Commercial Syndicate Pack</h3>
            <p className="text-xs text-slate-400 mb-6">
              For multi-hectare estate syndicates, family offices, and conveyancing law firms.
            </p>
            <div className="flex items-baseline gap-1 font-mono mb-6">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                {formatCurrency(199, currency)}
              </span>
              <span className="text-xs text-slate-400">/ 5 audits</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 font-mono mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>5 Comprehensive Investor Audits Included</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Multi-beacon boundary traverse export (DXF/CSV)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Law firm white-label report branding</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Priority Lead Surveyor Review within 2 hours</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenPaywall}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-colors"
          >
            Purchase Syndicate Pack
          </button>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-3xl mx-auto pt-8 border-t border-slate-800">
        <h3 className="text-xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-400" />
          Frequently Asked Questions
        </h3>

        <div className="space-y-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="font-bold text-white text-sm mb-1">
              How does TerraGuard detect land scams?
            </h4>
            <p className="text-slate-300 leading-relaxed">
              We compare the mathematical coordinates on your survey plan against our database of gazetted Government Acquisitions (like road expansions, ecological reserves, and industrial zones). We also calculate whether the surveyor's boundary coordinates close mathematically—fake plans fabricated in an office usually have severe mathematical closure errors.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="font-bold text-white text-sm mb-1">
              Can diaspora investors pay using foreign credit cards?
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Yes! We accept all international cards (Visa, Mastercard, Amex, Apple Pay) via Stripe in USD, GBP, EUR, and CAD, as well as local bank transfers and cards in Nigerian Naira via Paystack.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="font-bold text-white text-sm mb-1">
              What does the SHA-256 cryptographic seal mean?
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Every audit report generates a unique digital cryptographic fingerprint. If anyone attempts to alter the surveyor name, risk score, or coordinates on the PDF certificate, the QR code verification link will immediately show that the certificate has been tampered with.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
