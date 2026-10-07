import { ShieldCheck, Printer, CheckCircle2, QrCode, X } from 'lucide-react';
import type { PropertyAuditRecord } from '../../types/terraguard';

interface CertificateModalProps {
  audit: PropertyAuditRecord;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ audit, onClose }) => {
  const { propertyTitle, location, surveyPlanNumber, surveyorName, surveyorRegNumber, areaSqm, overallTrustScore, cryptographicHash, scannedAt } = audit;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-3xl p-6 sm:p-10 shadow-2xl relative print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Close Button (Hidden in print) */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Header (Institutional Design) */}
        <div className="text-center border-b-2 border-emerald-500/40 pb-6 mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-3 print:border-emerald-600 print:text-emerald-700">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wider text-white font-display print:text-slate-900">
            Official Land Due-Diligence Certificate
          </h2>
          <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest mt-1 print:text-emerald-700">
            TerraGuard Global Property Trust & Cadastral Verification
          </p>
          <p className="text-[11px] text-slate-400 mt-1 print:text-slate-600">
            Issued under International Cadastral Verification & Fraud Prevention Standards
          </p>
        </div>

        {/* Certificate Body Grid */}
        <div className="space-y-6">
          {/* Status & Trust Score Ribbon */}
          <div className="flex flex-wrap items-center justify-between p-4 rounded-2xl bg-slate-800/60 border border-slate-700 print:bg-slate-100 print:border-slate-300">
            <div>
              <span className="text-xs uppercase font-mono text-slate-400 block print:text-slate-600">
                Audited Property Asset
              </span>
              <strong className="text-base sm:text-lg text-white font-bold print:text-slate-900">
                {propertyTitle}
              </strong>
              <p className="text-xs text-slate-300 print:text-slate-700 mt-0.5">
                Cadastral Location: {location.address}, {location.lga}, {location.state}, {location.country}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs uppercase font-mono text-slate-400 block print:text-slate-600">
                Composite Trust Score
              </span>
              <span className="text-3xl font-extrabold font-mono text-emerald-400 print:text-emerald-700">
                {overallTrustScore}/100
              </span>
            </div>
          </div>

          {/* Forensic Technical Specifications Table */}
          <div className="border border-slate-800 rounded-xl overflow-hidden print:border-slate-300 text-xs font-mono">
            <table className="w-full text-left">
              <tbody className="divide-y divide-slate-800 print:divide-slate-300">
                <tr className="bg-slate-800/30 print:bg-slate-50">
                  <td className="p-3 text-slate-400 font-semibold w-1/3 print:text-slate-600">Survey Plan Number:</td>
                  <td className="p-3 text-white font-bold print:text-slate-900">{surveyPlanNumber}</td>
                </tr>
                <tr>
                  <td className="p-3 text-slate-400 font-semibold print:text-slate-600">SURCON Surveyor of Record:</td>
                  <td className="p-3 text-white font-bold print:text-slate-900">{surveyorName} ({surveyorRegNumber})</td>
                </tr>
                <tr className="bg-slate-800/30 print:bg-slate-50">
                  <td className="p-3 text-slate-400 font-semibold print:text-slate-600">Calculated Land Area:</td>
                  <td className="p-3 text-white font-bold print:text-slate-900">{areaSqm.toLocaleString()} m² ({(areaSqm / 648).toFixed(1)} Standard Plots)</td>
                </tr>
                <tr>
                  <td className="p-3 text-slate-400 font-semibold print:text-slate-600">Traverse Mathematical Closure:</td>
                  <td className="p-3 text-white font-bold print:text-slate-900">{audit.closureRatio} (Linear error: {audit.closureErrorMetres}m)</td>
                </tr>
                <tr className="bg-slate-800/30 print:bg-slate-50">
                  <td className="p-3 text-slate-400 font-semibold print:text-slate-600">Government Gazette Status:</td>
                  <td className="p-3 text-emerald-400 font-bold print:text-emerald-700">{audit.acquisitionStatus}</td>
                </tr>
                <tr>
                  <td className="p-3 text-slate-400 font-semibold print:text-slate-600">Claimed Title Classification:</td>
                  <td className="p-3 text-white font-bold print:text-slate-900">{audit.claimedTitleType}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Cryptographic Proof & QR Seal */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 print:bg-slate-50 print:border-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white p-1 rounded-lg flex items-center justify-center">
                <QrCode className="w-10 h-10 text-slate-950" />
              </div>
              <div className="text-xs font-mono">
                <p className="text-slate-400 print:text-slate-600 font-semibold">Cryptographic SHA-256 Seal:</p>
                <code className="text-emerald-400 print:text-emerald-700 font-bold block mt-0.5">
                  {cryptographicHash}
                </code>
                <p className="text-[10px] text-slate-500 print:text-slate-600">Verified Timestamp: {scannedAt}</p>
              </div>
            </div>

            <div className="text-right text-[11px] font-mono text-slate-400 print:text-slate-600">
              <span className="text-emerald-400 print:text-emerald-700 font-bold flex items-center gap-1 justify-end">
                <CheckCircle2 className="w-3.5 h-3.5" /> STATUTORY VALID
              </span>
              <p>Tamper-Evident Digital Proof</p>
            </div>
          </div>
        </div>

        {/* Certificate Actions (Print / Download) */}
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-800 print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
          >
            Close
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xl shadow-emerald-500/25 transition-all hover:scale-105"
          >
            <Printer className="w-4 h-4 stroke-[2.5]" />
            Print / Save as PDF Certificate
          </button>
        </div>
      </div>
    </div>
  );
};
