import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Download, Eye, Plus } from 'lucide-react';
import type { PropertyAuditRecord, CurrencyCode } from '../../types/terraguard';
import { formatCurrency } from '../../core/currency/terraguardCurrency';

interface PropertyVaultViewProps {
  audits: PropertyAuditRecord[];
  currency: CurrencyCode;
  onSelectAudit: (audit: PropertyAuditRecord) => void;
  onOpenUpload: () => void;
  onOpenCertificate: (audit: PropertyAuditRecord) => void;
}

export const PropertyVaultView: React.FC<PropertyVaultViewProps> = ({
  audits,
  currency,
  onSelectAudit,
  onOpenUpload,
  onOpenCertificate,
}) => {
  const safeCount = audits.filter((a) => a.riskLevel === 'safe').length;
  const fraudCount = audits.filter((a) => a.riskLevel === 'critical_fraud').length;
  const totalValueUSD = audits.reduce((sum, a) => sum + a.estimatedMarketValueUSD, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Vault Header & Portfolio Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 backdrop-blur-xl">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold uppercase">
            Investor Property Vault
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
            My Due-Diligence & Audited Portfolio
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Cryptographically sealed property records, active monitoring, and statutory certificates.
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Audit New Property
        </button>
      </div>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
          <p className="text-xs uppercase text-slate-400 font-semibold">Total Audited Asset Value</p>
          <p className="text-2xl font-bold text-white mt-1">{formatCurrency(totalValueUSD, currency)}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{audits.length} Properties Tracked</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
          <p className="text-xs uppercase text-slate-400 font-semibold">Verified Clean Titles</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{safeCount} Parcels</p>
          <p className="text-[11px] text-emerald-400/80 mt-0.5">Safe to disburse funds</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
          <p className="text-xs uppercase text-slate-400 font-semibold">High-Risk Fraud Intercepted</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{fraudCount} Scams Flagged</p>
          <p className="text-[11px] text-red-400/80 mt-0.5">Zero capital lost</p>
        </div>
      </div>

      {/* Audited Properties Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-mono uppercase">
            Property Audit Records ({audits.length})
          </h3>
          <span className="text-xs text-slate-400 font-mono">All Records Cryptographically Sealed</span>
        </div>

        <div className="divide-y divide-slate-800">
          {audits.map((a) => {
            const isCrit = a.riskLevel === 'critical_fraud';
            const isSafe = a.riskLevel === 'safe';
            return (
              <div key={a.id} className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-xl mt-0.5 ${
                    isSafe ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : isCrit ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {isSafe ? <ShieldCheck className="w-5 h-5" /> : isCrit ? <ShieldAlert className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm sm:text-base text-white font-bold">{a.propertyTitle}</strong>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isSafe ? 'bg-emerald-400/20 text-emerald-300' : isCrit ? 'bg-red-400/20 text-red-300' : 'bg-amber-400/20 text-amber-300'
                      }`}>
                        {a.overallTrustScore}/100
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Location: {a.location.address}, {a.location.state} • Survey: <code className="text-slate-300">{a.surveyPlanNumber}</code>
                    </p>
                    <p className="text-[11px] font-mono text-slate-500 mt-1">
                      SHA-256: {a.cryptographicHash} • Scanned {a.scannedAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => onSelectAudit(a)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> Inspect Coordinates
                  </button>

                  <button
                    onClick={() => onOpenCertificate(a)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF Certificate
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
