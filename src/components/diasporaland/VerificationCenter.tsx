// DiasporaLand AI — Verification Center
// Segregates due-diligence items into:
// 1. AI Verified
// 2. User Verified
// 3. Professional Review Required (Surveyor / Lawyer)
// 4. Official Verification Required (Lands Bureau / AGIS / Registry)

import React, { useState } from 'react';
import type { VerificationTaskItem } from '../../types/diasporaland';
import { 
  CheckCircle2, 
  Clock, 
  Building2, 
  Briefcase, 
  UserCheck, 
  Bot, 
  AlertCircle,
  Plus,
  Filter
} from 'lucide-react';

interface VerificationCenterProps {
  tasks: VerificationTaskItem[];
  caseNumber: string;
  onUpdateStatus?: (taskId: string, newStatus: VerificationTaskItem['status']) => void;
}

export const VerificationCenter: React.FC<VerificationCenterProps> = ({
  tasks,
  caseNumber,
  onUpdateStatus
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [taskList, setTaskList] = useState<VerificationTaskItem[]>(tasks);

  const groups: Array<{ key: VerificationTaskItem['verificationGroup']; label: string; icon: React.ReactNode; color: string; desc: string }> = [
    {
      key: 'Official Verification Required',
      label: 'Official Authority Verification',
      icon: <Building2 className="w-4 h-4 text-red-400" />,
      color: 'border-red-500/50 bg-red-950/20 text-red-400',
      desc: 'Statutory searches at AGIS, Alausa Lands Bureau, or Ministry of Lands'
    },
    {
      key: 'Professional Review Required',
      label: 'Professional Review Required',
      icon: <Briefcase className="w-4 h-4 text-amber-400" />,
      color: 'border-amber-500/50 bg-amber-950/20 text-amber-400',
      desc: 'Field beacons traverse by SURCON surveyor or Title opinion by Barrister'
    },
    {
      key: 'User Verified',
      label: 'Buyer / User Action Items',
      icon: <UserCheck className="w-4 h-4 text-blue-400" />,
      color: 'border-blue-500/50 bg-blue-950/20 text-blue-400',
      desc: 'Physical neighbour interviews, community elder checks, seller identity verification'
    },
    {
      key: 'AI Verified',
      label: 'AI Algorithmic Extractions',
      icon: <Bot className="w-4 h-4 text-emerald-400" />,
      color: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400',
      desc: 'Automated OCR transcription, cross-check matching, and cryptographic sealing'
    }
  ];

  const handleToggleStatus = (id: string) => {
    const updated = taskList.map((t) => {
      if (t.id === id) {
        const next: VerificationTaskItem['status'] = t.status === 'Verified' ? 'Pending' : 'Verified';
        if (onUpdateStatus) onUpdateStatus(id, next);
        return { ...t, status: next };
      }
      return t;
    });
    setTaskList(updated);
  };

  const filteredTasks = selectedGroup === 'all'
    ? taskList
    : taskList.filter((t) => t.verificationGroup === selectedGroup);

  const getStatusBadge = (status: VerificationTaskItem['status']) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            VERIFIED
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-950/80 border border-blue-500/40 text-blue-300">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            IN PROGRESS
          </span>
        );
      case 'Flagged':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-red-950/80 border border-red-500/40 text-red-300">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            FLAGGED CONCERN
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            PENDING
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Due-Diligence Governance Hub</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 font-mono">Case #{caseNumber}</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Institutional Verification Center
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Strictly delineating machine extractions from sovereign legal checks. AI identifies risks and cross-checks documents, but official clearance requires registered surveyors, title lawyers, and statutory land registry archives.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-blue-600/20">
            <Plus className="w-4 h-4" />
            Add Verification Task
          </button>
        </div>

        {/* Quadrant Filter Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800">
          {groups.map((grp) => {
            const count = taskList.filter((t) => t.verificationGroup === grp.key).length;
            const verifiedCount = taskList.filter((t) => t.verificationGroup === grp.key && t.status === 'Verified').length;
            const isSelected = selectedGroup === grp.key;

            return (
              <button
                key={grp.key}
                onClick={() => setSelectedGroup(isSelected ? 'all' : grp.key)}
                className={`p-4 rounded-lg border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'border-blue-500 bg-[#14213d] shadow-lg shadow-blue-900/30'
                    : 'border-slate-800 bg-[#090e1a] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {grp.icon}
                    <span className="text-xs font-bold text-slate-200 truncate">{grp.label}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {verifiedCount}/{count}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {grp.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Task List */}
      <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Filter className="w-4 h-4 text-blue-400" />
            Showing: {selectedGroup === 'all' ? 'All Verification Mandates' : selectedGroup}
            <span className="text-xs font-mono text-slate-400">({filteredTasks.length} items)</span>
          </div>
          <span className="text-xs text-slate-400">
            Click checkbox to acknowledge completed evidence review
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {filteredTasks.map((task) => {
            const isVerified = task.status === 'Verified';

            return (
              <div
                key={task.id}
                className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#111c30]/40 px-3 rounded-lg transition-all"
              >
                <div className="flex items-start gap-3.5 flex-1">
                  <button
                    onClick={() => handleToggleStatus(task.id)}
                    className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all ${
                      isVerified
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'border-slate-700 hover:border-slate-500 bg-slate-900/60'
                    }`}
                  >
                    {isVerified && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                        {task.id}
                      </span>
                      <h4 className={`text-sm font-bold ${isVerified ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                        {task.title}
                      </h4>
                      <span className="text-[11px] font-mono text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-900/30">
                        {task.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong className="text-slate-300">Evidence Required:</strong> {task.evidenceRequired}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400">
                      <span>Assigned: <strong className="text-slate-300">{task.owner}</strong></span>
                      {task.dueDate && <span>Deadline: <strong className="text-amber-400 font-mono">{task.dueDate}</strong></span>}
                      <span>Notes: {task.notes}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  {getStatusBadge(task.status)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
