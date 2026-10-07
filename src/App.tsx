import { useState } from 'react';
import { Navbar } from './components/terraguard/Navbar';
import { HeroSection } from './components/terraguard/HeroSection';
import { GeoCanvas } from './components/terraguard/GeoCanvas';
import { RiskScorecard } from './components/terraguard/RiskScorecard';
import { ScannerPortal } from './components/terraguard/ScannerPortal';
import { CertificateModal } from './components/terraguard/CertificateModal';
import { PaywallModal } from './components/terraguard/PaywallModal';
import { CeoDashboard } from './components/terraguard/CeoDashboard';
import { AuditorConsole } from './components/terraguard/AuditorConsole';
import { PricingView } from './components/terraguard/PricingView';
import { AuthModal } from './components/terraguard/AuthModal';
import { AuthPage } from './components/terraguard/AuthPage';

// DiasporaLand AI Modules
import { FrontPageHero } from './components/diasporaland/FrontPageHero';
import { DocumentComparisonView } from './components/diasporaland/DocumentComparisonView';
import { VerificationCenter } from './components/diasporaland/VerificationCenter';
import { InvestigationAssistant } from './components/diasporaland/InvestigationAssistant';
import { DueDiligenceReportView } from './components/diasporaland/DueDiligenceReportView';
import { EvidenceVaultView } from './components/diasporaland/EvidenceVaultView';
import { CaseCreationWizard } from './components/diasporaland/CaseCreationWizard';
import { LandKnowledgeBase } from './components/diasporaland/LandKnowledgeBase';

import type { UserRole, CurrencyCode, LanguageCode, PropertyAuditRecord, RiskLevel, AuthUser } from './types/terraguard';
import type { PropertyCase } from './types/diasporaland';
import { MOCK_AUDIT_CASES } from './data/mockLandCases';
import { MOCK_DIASPORALAND_CASES } from './data/mockDiasporaCases';
import { ShieldCheck, ArrowRight, AlertTriangle, PlusCircle, Building2 } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('ceo_admin');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [activeTab, setActiveTab] = useState<
    'home' | 'cases' | 'scanner' | 'comparison' | 'verification' | 'assistant' | 'report' | 'knowledge' | 'vault' | 'pricing' | 'dashboard' | 'auditor' | 'auth'
  >('home');

  // Authenticated User State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    id: 'USR-CEO-9104',
    name: 'Alexandra Vance',
    email: 'alexandra.vance@diasporaland.ai',
    role: 'ceo_admin',
    organization: 'DiasporaLand AI Global Trust Inc.',
    sessionToken: 'DL-AUTH-EXEC-89104A',
    lastLogin: new Date().toISOString(),
    twoFactorEnabled: true,
  });

  // DiasporaLand Cases State (persisted to localStorage so real user work is preserved)
  const [diasporaCases, setDiasporaCases] = useState<PropertyCase[]>(() => {
    try {
      const saved = localStorage.getItem('diasporaland_user_cases');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });
  const [activeCase, setActiveCase] = useState<PropertyCase | null>(() => diasporaCases[0] || null);

  // Terraguard Legacy Cadastre State for GeoCanvas
  const [audits, setAudits] = useState<PropertyAuditRecord[]>(MOCK_AUDIT_CASES);
  const [activeAudit, setActiveAudit] = useState<PropertyAuditRecord>(MOCK_AUDIT_CASES[0]);

  // Modal States
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isNewCaseWizardOpen, setIsNewCaseWizardOpen] = useState<boolean>(false);

  const unlockedCount = audits.filter((a) => a.isUnlocked).length;

  const handleSelectCase = (record: PropertyAuditRecord) => {
    setActiveAudit(record);
    setActiveTab('scanner');
  };

  const handleScanComplete = (newAudit: PropertyAuditRecord) => {
    setAudits([newAudit, ...audits]);
    setActiveAudit(newAudit);
    setIsUploadOpen(false);
    setActiveTab('scanner');
  };

  const handleSuccessUnlock = (auditId: string) => {
    const updated = audits.map((a) => (a.id === auditId ? { ...a, isUnlocked: true } : a));
    setAudits(updated);
    if (activeAudit.id === auditId) {
      setActiveAudit({ ...activeAudit, isUnlocked: true });
    }
    setIsPaywallOpen(false);
    setIsCertificateOpen(true);
  };

  const handleUpdateScore = (newScore: number) => {
    const riskLevel: RiskLevel = newScore >= 85 ? 'safe' : newScore >= 50 ? 'caution' : 'critical_fraud';
    const updated: PropertyAuditRecord = { ...activeAudit, overallTrustScore: newScore, riskLevel };
    setActiveAudit(updated);
    setAudits(audits.map((a) => (a.id === updated.id ? updated : a)));
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    if (user.role === 'ceo_admin') {
      setActiveTab('dashboard');
    } else if (user.role === 'lead_auditor' || user.role === 'licensed_surveyor') {
      setActiveTab('auditor');
    } else if (user.role === 'diaspora_investor') {
      setActiveTab('cases');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRole('public_viewer');
    setActiveTab('cases');
    setIsAuthOpen(false);
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (currentUser) {
      setCurrentUser({ ...currentUser, role });
    }
    if (role === 'ceo_admin') {
      setActiveTab('dashboard');
    } else if (role === 'lead_auditor' || role === 'licensed_surveyor') {
      setActiveTab('auditor');
    }
  };

  const handleClearDemoCases = () => {
    setDiasporaCases([]);
    setActiveCase(null);
    try {
      localStorage.setItem('diasporaland_user_cases', JSON.stringify([]));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreatedNewCase = (newCase: PropertyCase) => {
    const updated = [newCase, ...diasporaCases];
    setDiasporaCases(updated);
    setActiveCase(newCase);
    try {
      localStorage.setItem('diasporaland_user_cases', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setIsNewCaseWizardOpen(false);
    setActiveTab('comparison');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white font-sans">
      {/* Top Navbar with Persona / Currency / Language / Auth */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={handleRoleChange}
        currency={currency}
        onSelectCurrency={setCurrency}
        language={language}
        onSelectLanguage={setLanguage}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        unlockedCount={unlockedCount}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenNewCaseWizard={() => setIsNewCaseWizardOpen(true)}
      />

      {/* Main App Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* VIEW 0: FRONT PAGE / LANDING PAGE */}
        {activeTab === 'home' && (
          <FrontPageHero
            currency={currency}
            language={language}
            onAnalyzeProperty={() => setIsNewCaseWizardOpen(true)}
            onExploreCases={() => setActiveTab('cases')}
            onSelectCase={(caseKey) => {
              const found = diasporaCases.find((c) => c.id === caseKey);
              if (found) setActiveCase(found);
              setActiveTab('comparison');
            }}
          />
        )}

        {/* VIEW 1: PROPERTY CASES HUB */}
        {activeTab === 'cases' && (
          <div className="space-y-8">
            {/* Headline Card */}
            <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
                      Diaspora Due-Diligence & Cadastral Intelligence
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-950 text-[11px] text-blue-300 font-mono border border-blue-800">
                      Nigeria Initial
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Your Property Intelligence Dossiers
                  </h1>
                  <p className="text-sm text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
                    Transforming unverified surveys, deeds, and receipts into structured risk assessments with evidence citations. Know the risk before you release funds.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsNewCaseWizardOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Investigate New Property</span>
                  </button>

                  {diasporaCases.length > 0 && (
                    <button
                      onClick={handleClearDemoCases}
                      className="px-3.5 py-2.5 rounded-xl bg-[#141f33] hover:bg-red-950/40 text-slate-300 hover:text-red-300 font-semibold text-xs border border-slate-700 hover:border-red-800/60 transition-all"
                      title="Clear all demo activity and work on a clean workspace"
                    >
                      <span>Clear Demo Activity</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Metric Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
                <div className="bg-[#090f1d] border border-slate-800/80 p-3.5 rounded-xl">
                  <span className="text-xs text-slate-400 block mb-1">Active Cases</span>
                  <span className="text-2xl font-mono font-bold text-white">{diasporaCases.length}</span>
                </div>
                <div className="bg-[#090f1d] border border-slate-800/80 p-3.5 rounded-xl">
                  <span className="text-xs text-slate-400 block mb-1">Flagged Mismatches</span>
                  <span className="text-2xl font-mono font-bold text-red-400">
                    {diasporaCases.reduce((acc, c) => acc + c.crossChecks.filter((x) => x.status === 'MISMATCH').length, 0)}
                  </span>
                </div>
                <div className="bg-[#090f1d] border border-slate-800/80 p-3.5 rounded-xl">
                  <span className="text-xs text-slate-400 block mb-1">Verification Tasks</span>
                  <span className="text-2xl font-mono font-bold text-amber-400">
                    {diasporaCases.reduce((acc, c) => acc + c.verificationTasks.length, 0)}
                  </span>
                </div>
                <div className="bg-[#090f1d] border border-slate-800/80 p-3.5 rounded-xl">
                  <span className="text-xs text-slate-400 block mb-1">Evidence Files</span>
                  <span className="text-2xl font-mono font-bold text-emerald-400">
                    {diasporaCases.reduce((acc, c) => acc + c.vaultFiles.length, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Properties Requiring Attention */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-400" />
                  Properties Requiring Attention
                </h3>
                <span className="text-xs text-slate-400">Sorted by forensic priority</span>
              </div>

              {diasporaCases.length === 0 ? (
                <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-2xl p-12 text-center max-w-2xl mx-auto space-y-4 shadow-2xl my-6">
                  <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mx-auto">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Real Due-Diligence Workspace Ready</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                    All demo activity has been removed. Lodge real land instruments, specify vendor details, and run automated cadastral cross-checks to assess acquisition or title risks.
                  </p>
                  <button
                    onClick={() => setIsNewCaseWizardOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all inline-flex items-center gap-2 hover:scale-105 active:scale-95"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Initiate New Property Investigation</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {diasporaCases.map((c) => {
                    const isHigh = c.riskLevel === 'HIGH' || c.riskLevel === 'CRITICAL';
                    const isSelected = activeCase ? activeCase.id === c.id : false;

                    return (
                      <div
                        key={c.id}
                        onClick={() => setActiveCase(c)}
                        className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                          isSelected
                            ? 'bg-[#131f36] border-blue-500 shadow-xl shadow-blue-900/30 ring-1 ring-blue-500'
                            : 'bg-[#0d1524] border-[#1c2a44] hover:border-slate-700 hover:bg-[#111a2d]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                {c.caseNumber}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                                isHigh ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                              }`}>
                                {c.lifecycle.replace('_', ' ')}
                              </span>
                            </div>
                            <h4 className="text-base font-bold text-white tracking-tight">{c.name}</h4>
                            <span className="text-xs text-slate-400">{c.address} • {c.state}</span>
                          </div>

                          <div className="text-right">
                            <div className="text-[10px] uppercase font-mono text-slate-400">Risk Score</div>
                            <div className={`text-2xl font-mono font-black ${isHigh ? 'text-red-400' : 'text-amber-400'}`}>
                              {c.riskIndicatorScore}
                              <span className="text-xs font-normal text-slate-500">/100</span>
                            </div>
                            <span className={`text-[10px] font-bold uppercase font-mono ${isHigh ? 'text-red-400' : 'text-amber-400'}`}>
                              {c.riskLevel}
                            </span>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#080e18] border border-slate-800/80 text-xs text-slate-300 space-y-1.5 my-4 font-mono">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Asking Price:</span>
                            <span className="font-semibold text-emerald-400">{c.currency} {c.purchasePrice.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Claimed Seller:</span>
                            <span className="text-slate-200">{c.sellerName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Evidence Completeness:</span>
                            <span className="text-blue-400">{c.evidenceCompletenessPercent}% Analyzed</span>
                          </div>
                        </div>

                        {/* Flagged Red Warning Indicator */}
                        {c.crossChecks.some((x) => x.status === 'MISMATCH') && (
                          <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-900/50 text-red-300 text-xs flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                            <span className="truncate">
                              <strong>Severe Discrepancy:</strong> {c.crossChecks.find((x) => x.status === 'MISMATCH')?.findingDescription}
                            </span>
                          </div>
                        )}

                        {/* Quick Navigation Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveCase(c);
                              setActiveTab('comparison');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                          >
                            <span>Inspect Discrepancies</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveCase(c);
                              setActiveTab('verification');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#141f33] hover:bg-[#1a2942] text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
                          >
                            Verification Tasks ({c.verificationTasks.length})
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveCase(c);
                              setActiveTab('report');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#141f33] hover:bg-[#1a2942] text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
                          >
                            Due-Diligence Report
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: CADASTRAL BOUNDARY MAP (Original GeoCanvas + Hero Section) */}
        {activeTab === 'scanner' && (
          <div>
            <HeroSection
              currency={currency}
              language={language}
              onOpenUpload={() => setIsUploadOpen(true)}
              onSelectCase={handleSelectCase}
              mockCases={audits}
              activeCaseId={activeAudit.id}
            />

            <div className="py-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase text-blue-400 font-bold block">
                    Forensic Due-Diligence Case File
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Cadastral Boundary & Statutory Audit
                  </h2>
                </div>

                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
                >
                  + Audit Another Survey
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <GeoCanvas audit={activeAudit} />
                <RiskScorecard
                  audit={activeAudit}
                  currentRole={currentRole}
                  currency={currency}
                  onOpenPaywall={() => setIsPaywallOpen(true)}
                  onOpenCertificate={() => setIsCertificateOpen(true)}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: CROSS-DOCUMENT INCONSISTENCY MATRIX */}
        {activeTab === 'comparison' && (
          activeCase ? (
            <DocumentComparisonView
              crossChecks={activeCase.crossChecks}
              documents={activeCase.documents}
            />
          ) : (
            <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4 shadow-2xl my-8">
              <Building2 className="w-12 h-12 text-blue-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">No Active Property Investigation</h3>
              <p className="text-xs text-slate-400">Initiate a real property investigation to view concordance cross-checks.</p>
              <button
                onClick={() => setIsNewCaseWizardOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Initiate New Investigation</span>
              </button>
            </div>
          )
        )}

        {/* VIEW 4: INSTITUTIONAL VERIFICATION CENTER */}
        {activeTab === 'verification' && (
          activeCase ? (
            <VerificationCenter
              tasks={activeCase.verificationTasks}
              caseNumber={activeCase.caseNumber}
            />
          ) : (
            <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4 shadow-2xl my-8">
              <Building2 className="w-12 h-12 text-blue-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">No Active Verification Tasks</h3>
              <p className="text-xs text-slate-400">Select or initiate a property case to inspect official verification tasks.</p>
              <button
                onClick={() => setIsNewCaseWizardOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Initiate New Investigation</span>
              </button>
            </div>
          )
        )}

        {/* VIEW 5: AI INVESTIGATION ASSISTANT */}
        {activeTab === 'assistant' && (
          activeCase ? (
            <InvestigationAssistant
              propertyCase={activeCase}
            />
          ) : (
            <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4 shadow-2xl my-8">
              <Building2 className="w-12 h-12 text-blue-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">AI Assistant Requires an Active Case</h3>
              <p className="text-xs text-slate-400">Lodge property recitals to ask questions regarding root title and boundary compliance.</p>
              <button
                onClick={() => setIsNewCaseWizardOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Initiate New Investigation</span>
              </button>
            </div>
          )
        )}

        {/* VIEW 6: DUE-DILIGENCE REPORT */}
        {activeTab === 'report' && (
          activeCase ? (
            <DueDiligenceReportView
              propertyCase={activeCase}
            />
          ) : (
            <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4 shadow-2xl my-8">
              <Building2 className="w-12 h-12 text-blue-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">No Due-Diligence Report Generated</h3>
              <p className="text-xs text-slate-400">Lodge real conveyance instruments to compile an institutional risk dossier.</p>
              <button
                onClick={() => setIsNewCaseWizardOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Initiate New Investigation</span>
              </button>
            </div>
          )
        )}

        {/* VIEW 6B: INSTITUTIONAL STATUTORY KNOWLEDGE BASE */}
        {activeTab === 'knowledge' && (
          <LandKnowledgeBase />
        )}

        {/* VIEW 7: EVIDENCE VAULT */}
        {activeTab === 'vault' && (
          activeCase ? (
            <EvidenceVaultView
              files={activeCase.vaultFiles}
              onUploadNew={() => setIsNewCaseWizardOpen(true)}
            />
          ) : (
            <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4 shadow-2xl my-8">
              <Building2 className="w-12 h-12 text-blue-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Evidence Vault is Empty</h3>
              <p className="text-xs text-slate-400">Upload deeds, surveys, and receipts to store cryptographic SHA-256 evidence seals.</p>
              <button
                onClick={() => setIsNewCaseWizardOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Initiate New Investigation</span>
              </button>
            </div>
          )
        )}

        {/* VIEW 8: EXECUTIVE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <CeoDashboard currency={currency} />
        )}

        {/* VIEW 9: AUDITOR CONSOLE */}
        {activeTab === 'auditor' && (
          <AuditorConsole
            currentRole={currentRole}
            currentAudit={activeAudit}
            onUpdateScore={handleUpdateScore}
          />
        )}

        {/* VIEW 10: PRICING VIEW */}
        {activeTab === 'pricing' && (
          <PricingView
            currency={currency}
            onOpenPaywall={() => setIsPaywallOpen(true)}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        )}

        {/* VIEW 11: AUTH PAGE */}
        {activeTab === 'auth' && (
          <AuthPage
            currentUser={currentUser}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
            onNavigateToScanner={() => setActiveTab('cases')}
          />
        )}
      </main>

      {/* Global Modals */}
      {isNewCaseWizardOpen && (
        <div className="modal-overlay-shield">
          <CaseCreationWizard
            onCaseCreated={handleCreatedNewCase}
            onCancel={() => setIsNewCaseWizardOpen(false)}
          />
        </div>
      )}

      {isAuthOpen && (
        <AuthModal
          currentUser={currentUser}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
          onClose={() => setIsAuthOpen(false)}
        />
      )}

      {isUploadOpen && (
        <ScannerPortal
          onScanComplete={handleScanComplete}
          onClose={() => setIsUploadOpen(false)}
          currentRole={currentRole}
        />
      )}

      {isPaywallOpen && (
        <PaywallModal
          audit={activeAudit}
          currency={currency}
          onSuccessUnlock={handleSuccessUnlock}
          onClose={() => setIsPaywallOpen(false)}
        />
      )}

      {isCertificateOpen && (
        <CertificateModal
          audit={activeAudit}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-[#1c2a44] bg-[#05070d] py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white text-sm">DiasporaLand AI</strong>
              <p className="text-[11px] text-slate-500">Know the Risk Before You Buy • Property Due Diligence & Cadastral Intelligence</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <span>Statutory Verification System</span>
            <span>Document Cross-Verification Matrix</span>
            <span>Cryptographic SHA-256 Certificates</span>
            <span>Multilingual Due-Diligence Intelligence</span>
          </div>

          <p className="text-[11px] text-slate-500 w-full text-center sm:text-right">
            © {new Date().getFullYear()} DiasporaLand AI Inc. Due-diligence and risk-assessment assistant. Not a substitute for official legal, surveying, or governmental verification.
          </p>
        </div>
      </footer>
    </div>
  );
}
