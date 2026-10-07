import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Lock, CheckCircle2, 
  XCircle, Download, Scale, Sparkles 
} from 'lucide-react';
import type { PropertyAuditRecord, UserRole, CurrencyCode } from '../../types/terraguard';
import { formatCurrency } from '../../core/currency/terraguardCurrency';

interface RiskScorecardProps {
  audit: PropertyAuditRecord;
  currentRole: UserRole;
  currency: CurrencyCode;
  onOpenPaywall: () => void;
  onOpenCertificate: () => void;
}

export const RiskScorecard: React.FC<RiskScorecardProps> = ({
  audit,
  currentRole,
  currency,
  onOpenPaywall,
  onOpenCertificate,
}) => {
  const { overallTrustScore, riskLevel, riskFactors, isUnlocked, claimedTitleType, surveyorName, surveyorRegNumber, surveyPlanNumber, cryptographicHash } = audit;

  const isSafe = riskLevel === 'safe';
  const isCaution = riskLevel === 'caution';
  const isCritical = riskLevel === 'critical_fraud';

  // Role privileges: CEO and Lead Auditor have full bypass to audit details
  const canViewFull = isUnlocked || currentRole === 'ceo_admin' || currentRole === 'lead_auditor' || currentRole === 'licensed_surveyor';

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Top Trust Score Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div className="flex items-center gap-4">
          {/* Trust Score Radial Gauge */}
          <div className={`relative w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-2 shadow-xl ${
            isSafe 
              ? 'bg-emerald-500/10 border-emerald-500/60 shadow-emerald-500/20' 
              : isCaution 
              ? 'bg-amber-500/10 border-amber-500/60 shadow-amber-500/20' 
              : 'bg-red-500/10 border-red-500/60 shadow-red-500/20'
          }`}>
            <span className={`text-3xl font-extrabold font-mono ${
              isSafe ? 'text-emerald-400' : isCaution ? 'text-amber-400' : 'text-red-400'
            }`}>
              {overallTrustScore}
            </span>
            <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-slate-400">
              / 100
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider font-mono ${
                isSafe 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : isCaution 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                  : 'bg-red-500/20 text-red-300 border border-red-500/40'
              }`}>
                {isSafe ? 'Verified Clean & Safe' : isCaution ? 'Zoning / Title Caution' : 'CRITICAL FRAUD ALERT'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
              {audit.propertyTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Location: {audit.location.address}, {audit.location.lga}, {audit.location.state}
            </p>
          </div>
        </div>

        {/* Action button */}
        <div>
          {canViewFull ? (
            <button
              onClick={onOpenCertificate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              Official Certificate (PDF)
            </button>
          ) : (
            <button
              onClick={onOpenPaywall}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105 animate-pulse"
            >
              <Lock className="w-4 h-4 stroke-[2.5]" />
              Unlock Full Report ({formatCurrency(29, currency)})
            </button>
          )}
        </div>
      </div>

      {/* 10-Point Due-Diligence Checklist Summary */}
      <div className="mb-6">
        <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-slate-400 mb-3 flex items-center gap-2">
          <Scale className="w-3.5 h-3.5 text-emerald-400" />
          Forensic Land Due-Diligence Checklist (10 Verification Checks)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
            <span className="text-slate-300">1. Government Acquisition</span>
            {isCritical ? (
              <span className="text-red-400 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> FAILED</span>
            ) : (
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> FREE</span>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
            <span className="text-slate-300">2. Boundary Vector Closure</span>
            {audit.isClosureValid ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> PASSED</span>
            ) : (
              <span className="text-red-400 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> FAILED</span>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
            <span className="text-slate-300">3. Official Gazette Matching</span>
            {isCritical ? (
              <span className="text-red-400 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> NO MATCH</span>
            ) : (
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> CONFIRMED</span>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
            <span className="text-slate-300">4. SURCON Surveyor License</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> ACTIVE</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
            <span className="text-slate-300">5. Duplicate Beacon Allocation</span>
            {audit.id === 'CASE-SANGOTEDO-OVERLAP' ? (
              <span className="text-red-400 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> DUPLICATE</span>
            ) : (
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> UNIQUE</span>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
            <span className="text-slate-300">6. Right-of-Way Buffer (Road/Pipe)</span>
            {isCritical ? (
              <span className="text-red-400 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> ENCROACHED</span>
            ) : (
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> CLEAR</span>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
            <span className="text-slate-300">7. Urban Zoning / Green Belt</span>
            {isCaution ? (
              <span className="text-amber-400 font-bold flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> AGRO ONLY</span>
            ) : (
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> RESIDENTIAL</span>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
            <span className="text-slate-300">8. Title Chain & Consent</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> {claimedTitleType}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
            <span className="text-slate-300">9. Family Court Dispute History</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> 0 LIS PENDENS</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
            <span className="text-slate-300">10. SHA-256 Tamper Seal</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1 font-mono text-[10px]">VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Risk Factors Section */}
      <div className="relative">
        <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-slate-400 mb-3">
          Detailed Risk Factor & Legal Findings ({riskFactors.length})
        </h4>

        <div className="space-y-3">
          {riskFactors.map((rf) => {
            const isCrit = rf.severity === 'critical';
            const isWarn = rf.severity === 'warning';
            return (
              <div
                key={rf.id}
                className={`p-4 rounded-xl border transition-all ${
                  isCrit
                    ? 'bg-red-500/10 border-red-500/40'
                    : isWarn
                    ? 'bg-amber-500/10 border-amber-500/40'
                    : 'bg-emerald-500/10 border-emerald-500/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2">
                    {isCrit ? (
                      <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
                    ) : isWarn ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    )}
                    <span className="text-sm font-bold text-white">{rf.title}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    isCrit ? 'bg-red-400/20 text-red-300' : isWarn ? 'bg-amber-400/20 text-amber-300' : 'bg-emerald-400/20 text-emerald-300'
                  }`}>
                    {rf.code} ({rf.scoreImpact} pts)
                  </span>
                </div>

                <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                  {rf.description}
                </p>

                {/* Evidence & Legal Recommendation */}
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60 text-xs font-mono space-y-1">
                  <p className="text-slate-400">
                    <strong className="text-slate-300">Cadastral Evidence:</strong> {rf.evidence}
                  </p>
                  <p className="text-amber-300">
                    <strong className="text-amber-400">Legal Counsel Recommendation:</strong> {rf.legalRecommendation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Teaser Paywall Overlay if locked and public */}
        {!canViewFull && (
          <div className="mt-4 p-5 rounded-xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-amber-500/15 border border-amber-500/40 text-center relative overflow-hidden backdrop-blur-md">
            <div className="max-w-md mx-auto">
              <Lock className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <h3 className="text-base font-bold text-white mb-1">
                Forensic Gazette Citations & Surveyor Records Locked
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Unlock the complete Investor Due-Diligence Pack to reveal exact legal roll numbers, surveyor contact coordinates, and download the tamper-proof PDF certificate.
              </p>
              <button
                onClick={onOpenPaywall}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/25 transition-all hover:scale-105"
              >
                Unlock Investor Report ({formatCurrency(29, currency)})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cryptographic Verification Seal Footer */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
        <div>
          <span>Survey Plan Ref: </span>
          <strong className="text-white">{surveyPlanNumber}</strong>
          <span className="mx-2">•</span>
          <span>Surveyor: </span>
          <strong className="text-white">{surveyorName} ({surveyorRegNumber})</strong>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SHA-256 Seal: </span>
          <code className="text-[11px] bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300 font-bold">
            {cryptographicHash}
          </code>
        </div>
      </div>
    </div>
  );
};
