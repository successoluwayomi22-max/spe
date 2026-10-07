// DiasporaLand AI — Document Comparison UI
// Displays Document A vs Document B with MATCH / MISMATCH / MISSING / UNCERTAIN status badges

import React, { useState } from 'react';
import type { CrossCheckMismatch, ExtractedDocumentData } from '../../types/diasporaland';
import { AlertTriangle, CheckCircle2, FileQuestion, HelpCircle, FileText, ArrowRight, ShieldAlert, ArrowLeftRight } from 'lucide-react';

interface DocumentComparisonViewProps {
  crossChecks: CrossCheckMismatch[];
  documents: ExtractedDocumentData[];
  onSelectMismatch?: (mismatch: CrossCheckMismatch) => void;
}

export const DocumentComparisonView: React.FC<DocumentComparisonViewProps> = ({
  crossChecks,
  documents,
  onSelectMismatch
}) => {
  const [selectedParam, setSelectedParam] = useState<string>('all');
  const [activeMismatch, setActiveMismatch] = useState<CrossCheckMismatch | null>(crossChecks[0] || null);

  const filteredChecks = selectedParam === 'all' 
    ? crossChecks 
    : crossChecks.filter((c) => c.parameter.toLowerCase().includes(selectedParam.toLowerCase()));

  const getStatusBadge = (status: CrossCheckMismatch['status']) => {
    switch (status) {
      case 'MATCH':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            MATCH
          </span>
        );
      case 'MISMATCH':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/90 border border-red-500/50 text-red-300 text-xs font-semibold uppercase tracking-wider animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            MISMATCH
          </span>
        );
      case 'MISSING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <FileQuestion className="w-3.5 h-3.5 text-amber-400" />
            MISSING
          </span>
        );
      case 'UNCERTAIN':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            UNCERTAIN
          </span>
        );
    }
  };

  const getSeverityPill = (severity: CrossCheckMismatch['severity']) => {
    switch (severity) {
      case 'CRITICAL':
      case 'HIGH':
        return <span className="text-xs font-bold text-red-400 bg-red-950/50 px-2 py-0.5 rounded border border-red-800/40">HIGH PRIORITY</span>;
      case 'ELEVATED':
      case 'MODERATE':
        return <span className="text-xs font-bold text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/40">ATTENTION</span>;
      case 'LOW':
        return <span className="text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">VERIFIED</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">DiasporaLand AI Due-Diligence Engine</span>
              <span className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40 text-[11px] text-blue-300 font-mono">Algorithm v4.2</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <ArrowLeftRight className="w-6 h-6 text-blue-400" />
              Document Cross-Verification Matrix
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Automated cross-document concordance analysis comparing primary Survey, Deed, Allocation, and Registry archives to expose conflicting recitals, boundary creep, and root-title gaps.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-400">Cross-Checked Documents</div>
              <div className="text-lg font-bold text-slate-100 font-mono">{documents.length} Files Lodged</div>
            </div>
            <div className="h-9 w-px bg-slate-800" />
            <div className="text-right">
              <div className="text-xs text-slate-400">Flagged Variances</div>
              <div className="text-lg font-bold text-red-400 font-mono">
                {crossChecks.filter((c) => c.status === 'MISMATCH').length} Inconsistencies
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 mr-2">Filter Parameter:</span>
          {['all', 'Plot Number', 'Parcel Area', 'Parties / Names', 'Document References'].map((param) => (
            <button
              key={param}
              onClick={() => setSelectedParam(param)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedParam === param
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-[#141f33] text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {param === 'all' ? 'All Parameters' : param}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: List of Checks */}
        <div className="lg:col-span-7 space-y-4">
          {filteredChecks.map((item) => {
            const isSelected = activeMismatch?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveMismatch(item);
                  if (onSelectMismatch) onSelectMismatch(item);
                }}
                className={`p-5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#131f36] border-blue-500/80 shadow-lg shadow-blue-900/20'
                    : 'bg-[#0d1524] border-[#1c2a44] hover:border-slate-700 hover:bg-[#111a2c]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                      {item.id}
                    </span>
                    <span className="text-sm font-semibold text-white">{item.parameter}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getSeverityPill(item.severity)}
                    {getStatusBadge(item.status)}
                  </div>
                </div>

                <p className="text-sm text-slate-300 font-medium mb-4 leading-relaxed">
                  {item.findingDescription}
                </p>

                {/* Document A vs Document B comparative bar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg bg-[#080d17] border border-slate-800/80 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      <span className="font-semibold truncate">{item.docA.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Page {item.docA.page} reference:</div>
                    <div className="font-mono font-bold text-blue-300 bg-blue-950/40 p-1.5 rounded border border-blue-900/40">
                      {item.docA.value}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-semibold truncate">{item.docB.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {item.docB.page > 0 ? `Page ${item.docB.page} reference:` : 'Status reference:'}
                    </div>
                    <div className="font-mono font-bold text-amber-300 bg-amber-950/40 p-1.5 rounded border border-amber-900/40">
                      {item.docB.value}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep Forensic Inspector */}
        <div className="lg:col-span-5">
          {activeMismatch ? (
            <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-xl p-6 sticky top-24 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-semibold text-blue-400">Forensic Investigation</span>
                  <h3 className="text-lg font-bold text-white">{activeMismatch.parameter} Inconsistency</h3>
                </div>
                {getStatusBadge(activeMismatch.status)}
              </div>

              {/* Finding Narrative */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Finding Analysis</h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-[#080d17] p-3.5 rounded-lg border border-slate-800 font-mono text-xs">
                  {activeMismatch.findingDescription}
                </p>
              </div>

              {/* Why It Matters */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  Why It Matters (Legal & Title Hazard)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-amber-950/20 border border-amber-900/30 p-3.5 rounded-lg">
                  {activeMismatch.whyItMatters}
                </p>
              </div>

              {/* Recommended Action */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  Due-Diligence Action Protocol
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-emerald-950/20 border border-emerald-900/30 p-3.5 rounded-lg">
                  {activeMismatch.recommendedAction}
                </p>
              </div>

              {/* Disclaimer Notice */}
              <div className="pt-4 border-t border-slate-800/80">
                <p className="text-[11px] text-slate-400 leading-normal">
                  <strong className="text-slate-300">Statutory Notice:</strong> DiasporaLand AI highlights comparative discrepancies for due-diligence verification. It does not replace an official title report from the Land Registry or physical survey re-establishment.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-xl p-8 text-center text-slate-400">
              Select an inconsistency item from the list to inspect forensic recitals.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
