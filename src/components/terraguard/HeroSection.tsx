import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, ArrowRight, Calculator, Upload } from 'lucide-react';
import type { CurrencyCode, LanguageCode, PropertyAuditRecord } from '../../types/terraguard';
import { formatCurrency } from '../../core/currency/terraguardCurrency';
import { TRANSLATIONS } from '../../core/i18n/terraguardI18n';

interface HeroSectionProps {
  currency: CurrencyCode;
  language: LanguageCode;
  onOpenUpload: () => void;
  onSelectCase: (record: PropertyAuditRecord) => void;
  mockCases: PropertyAuditRecord[];
  activeCaseId: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currency,
  language,
  onOpenUpload,
  onSelectCase,
  mockCases,
  activeCaseId,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [propertyValueUSD, setPropertyValueUSD] = useState<number>(50000);

  // 35% average loss exposure in high-risk unverified transactions
  const capitalAtRiskUSD = propertyValueUSD * 0.35;
  const auditCostUSD = 29;

  return (
    <section className="relative overflow-hidden pt-10 pb-16 border-b border-slate-800/80 bg-gradient-to-b from-[#07090E] via-[#0B0F19] to-[#07090E]">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-purple-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Institutional Land Asset Verification Protocol</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display mb-5 leading-tight">
            {t.heroHeadline}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
            {t.heroSubheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenUpload}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Upload className="w-4 h-4 stroke-[2.5]" />
              {t.ctaUploadScan}
            </button>
            <a
              href="#cadastre-section"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-sm border border-slate-700 transition-all"
            >
              {t.ctaViewSample}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center backdrop-blur-md">
            <p className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 mb-1">
              {formatCurrency(42800000, currency)}
            </p>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Fraud & Demolition Prevented
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center backdrop-blur-md">
            <p className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">
              14,820+
            </p>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Parcels & Surveys Audited
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center backdrop-blur-md">
            <p className="text-2xl sm:text-3xl font-bold font-mono text-purple-400 mb-1">
              99.8%
            </p>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Gazette & Cadastral Precision
            </p>
          </div>
        </div>

        {/* Interactive Scam Loss Exposure Calculator */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-slate-900/90 via-slate-850 to-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <Calculator className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">Diaspora Land Scam Risk Calculator</h3>
            </div>
            <span className="text-xs text-amber-400/90 bg-amber-400/10 border border-amber-400/30 px-2.5 py-1 rounded-full font-mono font-semibold">
              Real-time Risk Simulation
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Drag the slider to your planned land purchase price. See how much money you stand to lose if unvetted coordinates fall under committed government acquisition:
          </p>

          {/* Slider input */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2 font-mono">
              <span className="text-xs text-slate-400">Asking Price:</span>
              <span className="text-lg font-bold text-emerald-400">
                {formatCurrency(propertyValueUSD, currency)}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="200000"
              step="5000"
              value={propertyValueUSD}
              onChange={(e) => setPropertyValueUSD(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>{formatCurrency(5000, currency)}</span>
              <span>{formatCurrency(100000, currency)}</span>
              <span>{formatCurrency(200000, currency)}</span>
            </div>
          </div>

          {/* Result cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30">
              <p className="text-xs text-red-300 uppercase font-semibold tracking-wider mb-1">
                Estimated Capital at Risk (35% Avg)
              </p>
              <p className="text-xl font-extrabold font-mono text-red-400">
                {formatCurrency(capitalAtRiskUSD, currency)}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Demolition, fake title, or double allocation</p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <p className="text-xs text-emerald-300 uppercase font-semibold tracking-wider mb-1">
                Cost to Fully Protect & Audit
              </p>
              <p className="text-xl font-extrabold font-mono text-emerald-400">
                {formatCurrency(auditCostUSD, currency)}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Instant digital certificate + satellite check</p>
            </div>
          </div>
        </div>

        {/* Forensic Cadastral Audit Switcher */}
        <div id="cadastre-section" className="text-center">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-mono mb-3">
            Inspect Real-World Forensic Case Studies:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {mockCases.map((c) => {
              const isActive = c.id === activeCaseId;
              const isFraud = c.riskLevel === 'critical_fraud';
              const isSafe = c.riskLevel === 'safe';
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectCase(c)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border ${
                    isActive
                      ? 'bg-slate-800 text-white border-emerald-500 shadow-lg shadow-emerald-500/10 scale-105'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {isFraud && <ShieldAlert className="w-3.5 h-3.5 text-red-400" />}
                  {isSafe && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                  {!isFraud && !isSafe && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{c.propertyTitle.split('—')[0]}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    isSafe ? 'bg-emerald-400/20 text-emerald-300' : isFraud ? 'bg-red-400/20 text-red-300' : 'bg-amber-400/20 text-amber-300'
                  }`}>
                    {c.overallTrustScore}/100
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
