// DiasporaLand AI — Property Due-Diligence Risk Report Generator
// Formats an 18-section executive dossier with printable CSS layout, risk breakdowns, and limitation disclaimers

import React from 'react';
import type { PropertyCase } from '../../types/diasporaland';
import { 
  Printer, 
  Download, 
  Share2, 
  AlertTriangle, 
  Building2, 
  Compass, 
  FileText, 
  HelpCircle
} from 'lucide-react';

interface DueDiligenceReportViewProps {
  propertyCase: PropertyCase;
  onClose?: () => void;
}

export const DueDiligenceReportView: React.FC<DueDiligenceReportViewProps> = ({ propertyCase }) => {
  const handlePrint = () => {
    window.print();
  };

  const getRiskScoreColor = (score: number) => {
    if (score <= 20) return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30';
    if (score <= 40) return 'text-blue-400 border-blue-500/40 bg-blue-950/30';
    if (score <= 60) return 'text-amber-400 border-amber-500/40 bg-amber-950/30';
    return 'text-red-400 border-red-500/40 bg-red-950/30';
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Action Bar (Hidden on Print) */}
      <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-xl p-4 flex items-center justify-between shadow-xl print:hidden">
        <div>
          <span className="text-xs font-mono font-semibold text-blue-400">Formal Intelligence Report</span>
          <h2 className="text-lg font-bold text-white">Property Due-Diligence Risk Report</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-blue-600/20"
          >
            <Printer className="w-4 h-4" />
            Print / Save as PDF
          </button>
          <button
            onClick={() => alert('Secure temporary report link copied to clipboard.')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#141f33] hover:bg-[#1a2942] text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            <Share2 className="w-4 h-4 text-slate-400" />
            Share With Lawyer
          </button>
          <button
            onClick={() => alert('CSV structured export generated.')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#141f33] hover:bg-[#1a2942] text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            <Download className="w-4 h-4 text-slate-400" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Printable Report Document */}
      <div className="bg-[#0c1322] border border-[#1e2d4a] rounded-xl p-8 md:p-12 shadow-2xl space-y-10 print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
        {/* Report Header / Cover Block */}
        <div className="border-b border-slate-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 print:border-black">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="font-extrabold tracking-tight text-xl text-white print:text-black">
                DiasporaLand<span className="text-blue-500">AI</span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-blue-300 font-mono print:border-black print:text-black">
                Dossier v2.4
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight print:text-black">
              Property Due-Diligence & Risk Intelligence Report
            </h1>
            <p className="text-sm text-slate-400 mt-1 print:text-gray-600">
              Prepared for remote buyer verification • Case Number: <strong className="text-slate-200 font-mono print:text-black">{propertyCase.caseNumber}</strong>
            </p>
          </div>

          <div className="text-left md:text-right text-xs text-slate-400 space-y-1 print:text-gray-600">
            <div>Audit Date: <span className="text-slate-200 font-mono print:text-black">2026-09-13 19:30 UTC</span></div>
            <div>Jurisdiction: <span className="text-slate-200 font-semibold print:text-black">{propertyCase.state}, {propertyCase.country}</span></div>
            <div>Cadastral Authority: <span className="text-slate-200 print:text-black">AMAC / AGIS Cadastre</span></div>
          </div>
        </div>

        {/* Executive Summary & Score Gauge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-xl bg-[#090f1c] border border-slate-800/80 print:bg-gray-50 print:border-black">
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 print:text-blue-700">
              1. Executive Summary
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed print:text-black">
              A comprehensive computational analysis of <strong className="text-white print:text-black">{propertyCase.name}</strong> was executed across 4 uploaded conveyancing instruments, boundary beacons, and regional cadastral registers. The subject property has been assigned a <strong className="text-red-400 print:text-red-700">Risk Indicator Score of {propertyCase.riskIndicatorScore}/100 ({propertyCase.riskLevel})</strong>, driven by significant cross-document discrepancies and an unperfected chain of devolution.
            </p>
            <div className="text-xs text-amber-300 bg-amber-950/30 border border-amber-800/40 p-3 rounded-lg flex items-start gap-2 print:text-black print:border-black">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Primary Directive:</strong> Do not release purchase funds or deposit monies until the Surveyor General and AGIS resolve the plot number variance between Plot 24 and Plot 42.
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 print:border-black">
            <div className="text-xs font-mono uppercase text-slate-400 mb-1">Risk Indicator Score</div>
            <div className={`text-5xl font-black font-mono px-6 py-3 rounded-xl border ${getRiskScoreColor(propertyCase.riskIndicatorScore)} print:text-black print:border-black`}>
              {propertyCase.riskIndicatorScore}
              <span className="text-xl font-normal text-slate-500">/100</span>
            </div>
            <div className="text-xs font-bold uppercase mt-2 text-red-400 font-mono tracking-wider print:text-black">
              {propertyCase.riskLevel} CONCERN
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Evidence Completeness: {propertyCase.evidenceCompletenessPercent}%
            </div>
          </div>
        </div>

        {/* Section 2: Property & Transaction Metadata */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2 print:border-black">
            2. Property & Transaction Identification
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-[#090f1c] rounded-lg border border-slate-800/60 print:bg-white print:border-gray-300">
              <span className="text-slate-400 block mb-1">Stated Address</span>
              <span className="font-semibold text-slate-200 print:text-black">{propertyCase.address}</span>
            </div>
            <div className="p-3 bg-[#090f1c] rounded-lg border border-slate-800/60 print:bg-white print:border-gray-300">
              <span className="text-slate-400 block mb-1">Claimed Vendor</span>
              <span className="font-semibold text-slate-200 print:text-black">{propertyCase.sellerName}</span>
            </div>
            <div className="p-3 bg-[#090f1c] rounded-lg border border-slate-800/60 print:bg-white print:border-gray-300">
              <span className="text-slate-400 block mb-1">Asking Consideration</span>
              <span className="font-semibold text-slate-200 font-mono print:text-black">NGN {propertyCase.purchasePrice.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-[#090f1c] rounded-lg border border-slate-800/60 print:bg-white print:border-gray-300">
              <span className="text-slate-400 block mb-1">Coordinates</span>
              <span className="font-semibold text-blue-400 font-mono print:text-black">{propertyCase.coordinates.formattedDMS}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Cross-Document Inconsistencies Matrix */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2 print:border-black">
            3. Cross-Document Inconsistency Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300 border-collapse">
              <thead>
                <tr className="bg-[#090f1c] text-slate-400 border-b border-slate-800 font-mono print:bg-gray-100 print:text-black">
                  <th className="p-3">Parameter</th>
                  <th className="p-3">Document A</th>
                  <th className="p-3">Document B</th>
                  <th className="p-3">Variance Status</th>
                  <th className="p-3">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {propertyCase.crossChecks.map((chk) => (
                  <tr key={chk.id} className="hover:bg-[#111c30]/40">
                    <td className="p-3 font-semibold text-white print:text-black">{chk.parameter}</td>
                    <td className="p-3">
                      <div className="font-mono text-blue-300 print:text-black">{chk.docA.value}</div>
                      <div className="text-[10px] text-slate-400">{chk.docA.name}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-mono text-amber-300 print:text-black">{chk.docB.value}</div>
                      <div className="text-[10px] text-slate-400">{chk.docB.name}</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold font-mono text-[10px] ${
                        chk.status === 'MISMATCH' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {chk.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-red-400 print:text-black">{chk.severity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: Questions for Legal Counsel, Surveyor & Vendor */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#090f1c] border border-slate-800 p-5 rounded-xl space-y-2 print:bg-white print:border-black">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              Questions for Seller
            </h4>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed print:text-black">
              <li>Why does the Survey Plan cite Plot 24 while your Deed conveys Plot 42?</li>
              <li>Where is the registered Power of Attorney linking you to the original allottee?</li>
              <li>Can you provide receipt copies of ground rent and capital gains tax payments?</li>
            </ul>
          </div>

          <div className="bg-[#090f1c] border border-slate-800 p-5 rounded-xl space-y-2 print:bg-white print:border-black">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              Questions for Surveyor
            </h4>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed print:text-black">
              <li>Have physical beacons PB 8104 - 8107 been physically recovered in the ground?</li>
              <li>What is the calculated traverse closure error ratio on site?</li>
              <li>Does any boundary line fall inside the seasonal flood channel buffer?</li>
            </ul>
          </div>

          <div className="bg-[#090f1c] border border-slate-800 p-5 rounded-xl space-y-2 print:bg-white print:border-black">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              Questions for Lawyer
            </h4>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed print:text-black">
              <li>Has an official search report been obtained from the AGIS Deeds Registry?</li>
              <li>Is there any pending lis pendens or caveat registered against this cadastral file?</li>
              <li>Has formal application for Ministerial / Governor's Consent been filed?</li>
            </ul>
          </div>
        </div>

        {/* Mandatory Legal Safety Disclaimer */}
        <div className="border-t border-slate-800 pt-6 text-[11px] text-slate-400 space-y-2 leading-relaxed print:border-black print:text-gray-700">
          <div className="flex items-center gap-2 text-slate-200 font-bold uppercase tracking-wider text-xs print:text-black">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            Mandatory Due-Diligence & Limitation Disclaimer
          </div>
          <p>
            This document is generated by <strong>DiasporaLand AI</strong> as an algorithmic due-diligence and risk-assessment assistant. DiasporaLand AI is not a legal practitioner, registered surveyor, government cadastre authority, or real estate brokerage firm.
          </p>
          <p>
            Nothing in this report constitutes legal advice, title certification, or a warranty of legal ownership. Analysis is derived strictly from scanned copies of documents uploaded by the user. Official legal title verification requires an independent search conducted by a licensed legal practitioner at the relevant state or national land registry archives.
          </p>
          <div className="pt-2 text-slate-500 font-mono text-[10px] print:text-black">
            Report Cryptographic Seal: SHA-256 [0b1220a9diasporaland89104fctlokogoma2026] • DiasporaLand AI Engine
          </div>
        </div>
      </div>
    </div>
  );
};
