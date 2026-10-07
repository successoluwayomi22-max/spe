// DiasporaLand AI — Evidence Vault View
// Categorized repository (Property, Survey, Legal, Government, Seller, Site Photos)
// Tracks versions (v1, v2) and cryptographic integrity seals

import React, { useState } from 'react';
import type { EvidenceVaultFile } from '../../types/diasporaland';
import { 
  FileText, 
  UploadCloud, 
  ShieldCheck, 
  Lock, 
  Eye, 
  Download, 
  FolderArchive,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface EvidenceVaultViewProps {
  files: EvidenceVaultFile[];
  onUploadNew?: () => void;
}

export const EvidenceVaultView: React.FC<EvidenceVaultViewProps> = ({ files, onUploadNew }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeFile, setActiveFile] = useState<EvidenceVaultFile | null>(files[0] || null);

  const categories = [
    'all',
    'Survey Plan',
    'Deed of Assignment',
    'Allocation Letter',
    'Certificate of Occupancy',
    'Family Receipt',
    'Site Photographs'
  ];

  const filteredFiles = selectedCategory === 'all'
    ? files
    : files.filter((f) => f.category === selectedCategory);

  const getStatusBadge = (status: EvidenceVaultFile['verificationStatus']) => {
    switch (status) {
      case 'Verified Authenticated':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Verified
          </span>
        );
      case 'Flagged Discrepancy':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-300 bg-red-950/80 border border-red-500/40 px-2 py-0.5 rounded animate-pulse">
            <AlertTriangle className="w-3 h-3 text-red-400" />
            Flagged Variance
          </span>
        );
      case 'Cross-Checked':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-300 bg-blue-950/80 border border-blue-500/40 px-2 py-0.5 rounded">
            Cross-Checked
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
            Extracted
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Encrypted Document Repository</span>
              <span className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800/40 text-[11px] text-blue-300 font-mono">
                AES-256 / SHA-256
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <FolderArchive className="w-6 h-6 text-blue-400" />
              Property Evidence Vault
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Secure institutional evidence vault. Uploaded land titles, surveys, and receipts are stored with cryptographic hashes, version trees, and role-scoped access control.
            </p>
          </div>

          <button
            onClick={onUploadNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-blue-600/20"
          >
            <UploadCloud className="w-4 h-4" />
            Lodge New Document
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-slate-800">
          <span className="text-xs font-semibold text-slate-400 mr-2">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-[#141f33] text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Instruments' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-7 space-y-3">
          {filteredFiles.map((file) => {
            const isSelected = activeFile?.id === file.id;

            return (
              <div
                key={file.id}
                onClick={() => setActiveFile(file)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#131f36] border-blue-500 shadow-lg shadow-blue-900/20'
                    : 'bg-[#0d1524] border-[#1c2a44] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-8 h-8 rounded-lg bg-[#090f1c] border border-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <h4 className="text-sm font-bold text-white truncate">{file.name}</h4>
                      <span className="text-[11px] text-slate-400">{file.category} • Version {file.version}</span>
                    </div>
                  </div>
                  {getStatusBadge(file.verificationStatus)}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 font-mono">
                  <span>Size: {file.fileSizeMb} MB</span>
                  <span>Uploaded: {file.uploadDate}</span>
                  <span className="text-slate-300">By: {file.uploaderName}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Preview Inspector */}
        <div className="lg:col-span-5">
          {activeFile ? (
            <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-xl p-6 shadow-xl sticky top-24 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-slate-300">Access: {activeFile.accessLevel}</span>
                </div>
                {getStatusBadge(activeFile.verificationStatus)}
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{activeFile.name}</h3>
                <span className="text-xs text-blue-400 font-mono">{activeFile.category} • v{activeFile.version}.0</span>
              </div>

              {/* Cryptographic Hash Seal */}
              <div className="bg-[#090f1c] border border-slate-800 rounded-lg p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  SHA-256 Provenance Seal
                </div>
                <div className="font-mono text-[10px] text-slate-300 break-all bg-black/40 p-2 rounded border border-slate-900">
                  {activeFile.sha256Seal}
                </div>
              </div>

              {/* Security & Access Audit */}
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex justify-between border-b border-slate-800/60 pb-1">
                  <span>MIME Type:</span>
                  <span className="font-mono text-slate-200">{activeFile.fileType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-1">
                  <span>Lodged By:</span>
                  <span className="text-slate-200">{activeFile.uploaderName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-1">
                  <span>Upload Timestamp:</span>
                  <span className="font-mono text-slate-200">{activeFile.uploadDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Signed URL Status:</span>
                  <span className="text-emerald-400 font-semibold">Active Temporary Token (15m)</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                <button
                  onClick={() => alert(`Opening secure in-browser preview for ${activeFile.name}`)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Scan
                </button>
                <button
                  onClick={() => alert(`Generating signed temporary download token for ${activeFile.name}`)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#141f33] hover:bg-[#1a2842] text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-xl p-8 text-center text-slate-400">
              Select a vault file to view cryptographic metadata.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
