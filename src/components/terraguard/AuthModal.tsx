import React, { useState } from 'react';
import { ShieldCheck, Lock, User, KeyRound, CheckCircle2, AlertCircle, X, Landmark, Compass, Briefcase, ChevronRight } from 'lucide-react';
import type { UserRole, AuthUser } from '../../types/terraguard';

interface AuthModalProps {
  currentUser: AuthUser | null;
  onLoginSuccess: (user: AuthUser) => void;
  onLogout: () => void;
  onClose: () => void;
}

interface PersonaPreset {
  role: UserRole;
  name: string;
  email: string;
  title: string;
  org: string;
  license?: string;
  description: string;
  icon: React.ElementType;
}

const PERSONA_PRESETS: PersonaPreset[] = [
  {
    role: 'ceo_admin',
    name: 'Alexandra Vance',
    email: 'alexandra.vance@terraguard.io',
    title: 'Founder & Chief Executive Officer',
    org: 'TerraGuard Global Trust Inc.',
    description: 'Full statutory authority, revenue run-rates, Stripe/Paystack settlement controls, dynamic pricing elasticity.',
    icon: Landmark,
  },
  {
    role: 'licensed_surveyor',
    name: 'Surv. B. A. Adeleke (FNIS)',
    email: 'b.adeleke@surcon-cadastre.ng',
    title: 'Fellow of Nigerian Institution of Surveyors',
    org: 'SURCON Accreditation Board #9412/A',
    license: 'SURCON/9412/A',
    description: 'Field traverse geometry closure, beacon coordinate monumentation, UTM Minna transformation.',
    icon: Compass,
  },
  {
    role: 'lead_auditor',
    name: 'Barrister Folake Sanusi',
    email: 'f.sanusi@lagoslandsbureau.org',
    title: 'Lead Legal Title & Cadastral Risk Counsel',
    org: 'State Lands Bureau Cadastral Review Division',
    description: 'Gazette acquisition collision validation, excision status matching, statutory override ledger.',
    icon: ShieldCheck,
  },
  {
    role: 'diaspora_investor',
    name: 'Dr. Chidi Okafor, FRCS',
    email: 'chidi.okafor@nhs.net',
    title: 'Private Diaspora Real Estate Acquirer',
    org: 'London Medical Trust & Diaspora Syndicate',
    description: 'Unlocked due-diligence dossiers, property portfolio vault, tamper-evident SHA-256 certificates.',
    icon: Briefcase,
  },
];

export const AuthModal: React.FC<AuthModalProps> = ({
  currentUser,
  onLoginSuccess,
  onLogout,
  onClose,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<PersonaPreset>(PERSONA_PRESETS[0]);
  const [email, setEmail] = useState<string>(PERSONA_PRESETS[0].email);
  const [password, setPassword] = useState<string>('••••••••••••');
  const [twoFactorCode, setTwoFactorCode] = useState<string>('892 410');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSelectPreset = (preset: PersonaPreset) => {
    setSelectedPreset(preset);
    setEmail(preset.email);
    setPassword('••••••••••••');
    setErrorMsg(null);
  };

  const handleExecuteLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please provide a valid corporate or investor email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    setTimeout(() => {
      const generatedToken = `TG-AUTH-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
      
      const userObj: AuthUser = {
        id: `USR-${selectedPreset.role.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        name: selectedPreset.name,
        email: email,
        role: selectedPreset.role,
        organization: selectedPreset.org,
        surconLicense: selectedPreset.license,
        sessionToken: generatedToken,
        lastLogin: new Date().toISOString(),
        twoFactorEnabled: true,
      };

      onLoginSuccess(userObj);
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0B0F17] border border-slate-700/80 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Enterprise Authentication & RBAC Gate
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Institutional Access & Role-Based Workstation Authorization
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If user is already authenticated */}
        {currentUser ? (
          <div className="p-6 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-emerald-400 block mb-1">
                    Active Authenticated Session
                  </span>
                  <h4 className="text-base font-bold text-white">{currentUser.name}</h4>
                  <p className="text-xs text-slate-400">{currentUser.email}</p>
                  {currentUser.organization && (
                    <p className="text-xs text-slate-300 font-semibold mt-1">
                      {currentUser.organization}
                    </p>
                  )}
                  {currentUser.surconLicense && (
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[11px] border border-emerald-500/30">
                      License: {currentUser.surconLicense}
                    </span>
                  )}
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {currentUser.role.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs font-mono text-slate-400">
                <div>
                  <span className="text-[10px] text-slate-500 block">Session Token</span>
                  <span className="text-slate-300">{currentUser.sessionToken}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">2FA Security</span>
                  <span className="text-emerald-400 font-semibold">Hardware TOTP Active</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onLogout}
                className="px-5 py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 text-xs font-bold transition-all"
              >
                Sign Out Current Session
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
              >
                Return to Workspace
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleExecuteLogin} className="p-6 space-y-6">
            {/* Persona Quick Selection */}
            <div>
              <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
                Select Enterprise Persona to Sign In:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PERSONA_PRESETS.map((p) => {
                  const isSelected = selectedPreset.role === p.role;
                  const IconComp = p.icon;

                  return (
                    <div
                      key={p.role}
                      onClick={() => handleSelectPreset(p)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all duration-150 flex items-start gap-3 ${
                        isSelected
                          ? 'bg-slate-800/90 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-xs font-bold text-white truncate block">
                            {p.title}
                          </strong>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 ml-1" />}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">{p.name}</p>
                        <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{p.org}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Credential Inputs */}
            <div className="space-y-3 bg-slate-900/40 border border-slate-800/80 rounded-xl p-4">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  Institutional Email Address
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="name@organization.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">
                    Security Passcode
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1 flex items-center justify-between">
                    <span>2FA Security Token</span>
                    <span className="text-[10px] text-emerald-400 font-mono">TOTP Active</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={twoFactorCode}
                      onChange={(e) => setTwoFactorCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Login Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              {isSubmitting ? (
                <span>Authenticating Session...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate as {selectedPreset.title}</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
