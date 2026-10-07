// DiasporaLand AI — Public Front Page & Landing Experience
// Conforms to Sections 1, 4, 5, 6, 20 & 97 of the Master PRD
// Primary Headline: "Buying land remotely is difficult. Investigating it shouldn't be."
// Primary Tagline: "Know the Risk Before You Buy."
// Workflow: UPLOAD -> EXTRACT -> VERIFY -> CROSS-CHECK -> IDENTIFY RISK -> EXPLAIN -> REPORT -> TAKE ACTION

import React, { useState } from 'react';
import type { CurrencyCode, LanguageCode } from '../../types/terraguard';
import { formatCurrency } from '../../core/currency/terraguardCurrency';
import { 
  ShieldCheck, 
  ArrowRight, 
  UploadCloud, 
  AlertTriangle, 
  Calculator, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface FrontPageHeroProps {
  currency: CurrencyCode;
  language: LanguageCode;
  onAnalyzeProperty: () => void;
  onExploreCases: () => void;
  onSelectCase: (caseKey: string) => void;
}

export const FrontPageHero: React.FC<FrontPageHeroProps> = ({
  currency,
  onAnalyzeProperty,
  onExploreCases,
  onSelectCase
}) => {
  const [propertyPrice, setPropertyValue] = useState<number>(45000000); // 45M NGN / ~30k USD

  // Loss simulation in unvetted transactions (40% average forfeiture or dispute litigation costs)
  const capitalAtRisk = propertyPrice * 0.40;

  return (
    <div className="space-y-16 pb-16">
      {/* SECTION 1: HERO VALUE PROPOSITION */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/4 right-5 w-80 h-80 bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Institutional Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>AI-Powered Property Due Diligence & Land-Risk Intelligence</span>
          </div>

          {/* Primary Confident Headings */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight max-w-4xl mx-auto">
            Buying land remotely is difficult.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-indigo-300">
              Investigating it shouldn't be.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed font-normal">
            Know the risk before you buy. DiasporaLand AI analyzes unverified surveys, deeds, and allocations, detects conflicting recitals, cross-checks coordinates, and generates actionable due-diligence dossiers for diaspora buyers.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <button
              onClick={onAnalyzeProperty}
              className="btn-action-primary"
            >
              <UploadCloud className="w-5 h-5 stroke-[2.5] shrink-0" />
              <span>Analyze a Property</span>
            </button>
            <button
              onClick={onExploreCases}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0e172a] hover:bg-[#1e293b] text-slate-200 font-semibold text-sm border border-slate-700 transition-all shadow-lg hover:border-slate-600"
            >
              <span>See How It Works</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Institutional Trust Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto w-full">
            <div className="bg-[#0c1322] border border-[#1e2d4a] rounded-xl p-3.5 sm:p-4 text-left shadow-lg min-w-0">
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase block mb-1 truncate">Protected Capital</span>
              <span className="text-lg sm:text-2xl font-bold font-mono text-emerald-400 block truncate">
                {formatCurrency(85000000, currency)}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1 truncate">Safeguarded remotely</span>
            </div>

            <div className="bg-[#0c1322] border border-[#1e2d4a] rounded-xl p-3.5 sm:p-4 text-left shadow-lg min-w-0">
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase block mb-1 truncate">Concordance Checks</span>
              <span className="text-lg sm:text-2xl font-bold font-mono text-white block truncate">
                48,200+
              </span>
              <span className="text-[10px] text-slate-500 block mt-1 truncate">Cross-referenced recitals</span>
            </div>

            <div className="bg-[#0c1322] border border-[#1e2d4a] rounded-xl p-3.5 sm:p-4 text-left shadow-lg min-w-0">
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase block mb-1 truncate">Mismatches Exposed</span>
              <span className="text-lg sm:text-2xl font-bold font-mono text-red-400 block truncate">
                1,420
              </span>
              <span className="text-[10px] text-slate-500 block mt-1 truncate">Plot & area discrepancies</span>
            </div>

            <div className="bg-[#0c1322] border border-[#1e2d4a] rounded-xl p-3.5 sm:p-4 text-left shadow-lg min-w-0">
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase block mb-1 truncate">Average Turnaround</span>
              <span className="text-lg sm:text-2xl font-bold font-mono text-blue-400 block truncate">
                180s
              </span>
              <span className="text-[10px] text-slate-500 block mt-1 truncate">Complete dossier synthesis</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: VISUAL DUE-DILIGENCE WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0c1322] border border-[#1e2d4a] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
              The DiasporaLand Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              From Messy Documents to a Verifiable Dossier
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every property investigation follows a structured, evidence-grounded sequence designed to uncover conflicting claims before financial commitment.
            </p>
          </div>

          {/* Step Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="process-step-card">
              <div className="flex items-center justify-between">
                <div className="process-step-badge bg-blue-500/15 border border-blue-500/40 text-blue-400">
                  01
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Step 01</span>
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">Upload Documents</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Lodge Survey Plans, Deeds of Assignment, C of O, Allocation Letters, or Family Receipts securely into the encrypted vault.
              </p>
            </div>

            <div className="process-step-card">
              <div className="flex items-center justify-between">
                <div className="process-step-badge bg-indigo-500/15 border border-indigo-500/40 text-indigo-400">
                  02
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Step 02</span>
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">Extract & OCR</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Computer vision reads handwritten beacon coordinates, parcel boundaries, party names, seal stamps, and execution dates.
              </p>
            </div>

            <div className="process-step-card">
              <div className="flex items-center justify-between">
                <div className="process-step-badge bg-amber-500/15 border border-amber-500/40 text-amber-400">
                  03
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Step 03</span>
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">Cross-Check Recitals</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated matrix cross-references plot numbers (e.g. Plot 24 vs 42), area square metres, and devolution chains between documents.
              </p>
            </div>

            <div className="process-step-card">
              <div className="flex items-center justify-between">
                <div className="process-step-badge bg-red-500/15 border border-red-500/40 text-red-400">
                  04
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Step 04</span>
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">Calculate Risk Score</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The transparent Risk Indicator Score flags documentation gaps, zoning setbacks, missing Governor's Consent, and wetland buffers.
              </p>
            </div>

            <div className="process-step-card">
              <div className="flex items-center justify-between">
                <div className="process-step-badge bg-emerald-500/15 border border-emerald-500/40 text-emerald-400">
                  05
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Step 05</span>
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">Generate Report</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Produces an executive 18-section dossier with tailored questions for your surveyor, lawyer, and seller before releasing funds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE SCAM RISK & LOSS EXPOSURE CALCULATOR */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0c1322] border border-[#1e2d4a] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <Calculator className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-lg font-bold text-white">Remote Acquisition Loss Exposure Calculator</h3>
                <span className="text-xs text-slate-400">Estimate financial risk in unverified remote transactions</span>
              </div>
            </div>
            <span className="text-xs text-amber-300 bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded-full font-mono">
              Empirical Due-Diligence Model
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Adjust the slider to your intended purchase price. If land coordinates fall under committed government acquisition or contain conflicting root titles, buyers typically suffer a 40% capital loss in demolition, forfeiture, or prolonged litigation:
          </p>

          <div className="space-y-3">
            <div className="flex justify-between items-center font-mono">
              <span className="text-xs text-slate-400">Proposed Purchase Price:</span>
              <span className="text-xl font-bold text-emerald-400">
                {formatCurrency(propertyPrice, currency)}
              </span>
            </div>

            <input
              type="range"
              min="5000000"
              max="250000000"
              step="5000000"
              value={propertyPrice}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />

            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>{formatCurrency(5000000, currency)}</span>
              <span>{formatCurrency(125000000, currency)}</span>
              <span>{formatCurrency(250000000, currency)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/40 space-y-1">
              <span className="text-xs uppercase font-mono font-bold text-red-400 tracking-wider">
                Potential Unvetted Loss Exposure
              </span>
              <div className="text-2xl font-black font-mono text-red-400">
                {formatCurrency(capitalAtRisk, currency)}
              </div>
              <p className="text-[11px] text-slate-400">
                Demolition due to right-of-way encroachment or double-allocation disputes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 space-y-1">
              <span className="text-xs uppercase font-mono font-bold text-blue-400 tracking-wider">
                DiasporaLand Due-Diligence Audit
              </span>
              <div className="text-2xl font-black font-mono text-blue-300">
                {formatCurrency(45000, currency)}
              </div>
              <p className="text-[11px] text-slate-400">
                Instant multi-document cross-check, OCR beacon math, and formal risk dossier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: REAL-WORLD INVESTIGATION CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
              Forensic Benchmark Cases
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Real-World Document Investigation Cases
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Click any case to inspect real cross-document discrepancies and cadastral beacon hazards.
            </p>
          </div>

          <button
            onClick={onExploreCases}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-all self-start md:self-auto"
          >
            <span>View All Property Cases</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1: High Risk Plot Inconsistency */}
          <div 
            onClick={() => onSelectCase('CASE-LOK-024')}
            className="bg-[#0c1322] border border-[#1e2d4a] hover:border-blue-500 rounded-xl p-6 shadow-xl cursor-pointer transition-all hover:bg-[#0f172a] space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  DL-2026-089
                </span>
                <span className="text-[11px] text-red-300 bg-red-950 px-2 py-0.5 rounded border border-red-800 font-bold font-mono">
                  HIGH CONCERN
                </span>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Risk Score</div>
                <div className="text-xl font-bold font-mono text-red-400">74/100</div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">Plot 24, Cadastral Zone E08, Lokogoma District</h3>
              <p className="text-xs text-slate-400">Abuja Municipal Area Council (AMAC) • Asking NGN 65,000,000</p>
            </div>

            <div className="p-3 rounded-lg bg-red-950/30 border border-red-900/40 text-xs text-red-300 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                Severe Inconsistency Detected:
              </div>
              <p className="text-[11px] text-slate-300">
                The Survey Plan demarcates <strong>Plot 24</strong> (1,200 sqm), while the Deed of Assignment conveys <strong>Plot 42</strong> (1,850 sqm). High risk of overlapping title conveyance.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80 font-mono">
              <span>4 Documents Analyzed</span>
              <span className="text-blue-400 flex items-center gap-1 font-semibold">
                Inspect Case File <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Case 2: Moderate Risk Coastal Highway Buffer */}
          <div 
            onClick={() => onSelectCase('CASE-LEK-108')}
            className="bg-[#0c1322] border border-[#1e2d4a] hover:border-blue-500 rounded-xl p-6 shadow-xl cursor-pointer transition-all hover:bg-[#0f172a] space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  DL-2026-104
                </span>
                <span className="text-[11px] text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800 font-bold font-mono">
                  MODERATE CONCERN
                </span>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Risk Score</div>
                <div className="text-xl font-bold font-mono text-amber-400">32/100</div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">Parcel 12, Coastal Boulevard, Lekki Phase 1</h3>
              <p className="text-xs text-slate-400">Eti-Osa LGA, Lagos State • Asking NGN 280,000,000</p>
            </div>

            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-900/40 text-xs text-amber-300 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                Planning Setback Alert:
              </div>
              <p className="text-[11px] text-slate-300">
                Root title verified via Lagos C of O #68/68/2004AB, but property perimeter lies within 80m of planned federal coastal transit reserve. Setback clearance required.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80 font-mono">
              <span>6 Documents Analyzed</span>
              <span className="text-blue-400 flex items-center gap-1 font-semibold">
                Inspect Case File <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: LEGAL INTEGRITY NOTICE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-xl bg-[#090f1d] border border-slate-800/90 text-xs text-slate-400 space-y-2 leading-relaxed">
          <div className="flex items-center gap-2 text-slate-200 font-bold uppercase tracking-wider text-xs">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Statutory Legal Positioning & Due-Diligence Mandate
          </div>
          <p>
            DiasporaLand AI is a property due-diligence and land-risk intelligence assistant. We do not provide legal representation, certified cadastral surveying, or statutory guarantees of land title ownership. Our algorithms surface discrepancies, cross-check documents, and synthesize evidence to empower diaspora buyers to make safer, better-informed property decisions.
          </p>
        </div>
      </section>
    </div>
  );
};
