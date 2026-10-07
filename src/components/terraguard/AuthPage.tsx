import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, User, KeyRound, AlertCircle, 
  Landmark, Compass, Briefcase, ChevronRight, Eye, EyeOff, 
  RefreshCw, LogOut, Check, ArrowRight
} from 'lucide-react';
import type { UserRole, AuthUser } from '../../types/terraguard';

interface AuthPageProps {
  currentUser: AuthUser | null;
  onLoginSuccess: (user: AuthUser) => void;
  onLogout: () => void;
  onNavigateToScanner: () => void;
}

interface PersonaOption {
  role: UserRole;
  name: string;
  email: string;
  title: string;
  org: string;
  badge: string;
  license?: string;
  privileges: string[];
  icon: React.ElementType;
}

const PERSONA_CATALOG: PersonaOption[] = [
  {
    role: 'ceo_admin',
    name: 'Alexandra Vance',
    email: 'alexandra.vance@terraguard.io',
    title: 'Founder & Chief Executive Officer',
    org: 'TerraGuard Global Trust Inc.',
    badge: 'FULL ADMINISTRATIVE CLEARANCE',
    privileges: [
      'Real-time P&L and ARR run-rate analytics',
      'Stripe & Paystack interbank settlement ledgers',
      'Dynamic pricing elasticity controls',
      'Global system logs & audit overrides',
    ],
    icon: Landmark,
  },
  {
    role: 'licensed_surveyor',
    name: 'Surv. B. A. Adeleke (FNIS)',
    email: 'b.adeleke@surcon-cadastre.ng',
    title: 'Licensed Cadastral Surveyor',
    org: 'SURCON Accreditation Board #9412/A',
    badge: 'SURCON ACCREDITED PRACTITIONER',
    license: 'SURCON/9412/A',
    privileges: [
      'Field traverse closure mathematical calculation',
      'Beacon monumentation and coordinate mapping',
      'UTM Minna to WGS84 datum projection',
      'Statutory boundary sign-off stamps',
    ],
    icon: Compass,
  },
  {
    role: 'lead_auditor',
    name: 'Barrister Folake Sanusi',
    email: 'f.sanusi@lagoslandsbureau.org',
    title: 'Lead Legal Title Counsel',
    org: 'State Lands Bureau Cadastral Review Division',
    badge: 'STATUTORY LEGAL COUNSEL',
    privileges: [
      'Federal & State Gazette Acquisition database lookup',
      'Excision revocation & highway collision matrix',
      'Statutory risk factor override ledger',
      'Official Certificate of Due-Diligence endorsement',
    ],
    icon: ShieldCheck,
  },
  {
    role: 'diaspora_investor',
    name: 'Dr. Chidi Okafor, FRCS',
    email: 'chidi.okafor@nhs.net',
    title: 'Diaspora Real Estate Acquirer',
    org: 'London Medical Trust & Diaspora Syndicate',
    badge: 'VERIFIED PROPERTY BUYER',
    privileges: [
      'Unlocked due-diligence case dossiers',
      'Multi-property cadastral vault storage',
      'Tamper-evident SHA-256 PDF certificate download',
      'Real-time demolition & land grab fraud alerts',
    ],
    icon: Briefcase,
  },
];

export const AuthPage: React.FC<AuthPageProps> = ({
  currentUser,
  onLoginSuccess,
  onLogout,
  onNavigateToScanner,
}) => {
  const [selectedPersona, setSelectedPersona] = useState<PersonaOption>(PERSONA_CATALOG[0]);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState<string>(PERSONA_CATALOG[0].email);
  const [password, setPassword] = useState<string>('TerraGuard@Secure2026');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [twoFactorCode, setTwoFactorCode] = useState<string>('892 410');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelectPersona = (p: PersonaOption) => {
    setSelectedPersona(p);
    setEmail(p.email);
    setPassword('TerraGuard@Secure2026');
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both corporate email and security password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      const generatedToken = `TG-AUTH-${selectedPersona.role.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

      const userObj: AuthUser = {
        id: `USR-${selectedPersona.role.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        name: selectedPersona.name,
        email: email,
        role: selectedPersona.role,
        organization: selectedPersona.org,
        surconLicense: selectedPersona.license,
        sessionToken: generatedToken,
        lastLogin: new Date().toISOString(),
        twoFactorEnabled: true,
      };

      onLoginSuccess(userObj);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Breadcrumb / Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Statutory Security & Authentication Gate</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mb-3">
          Institutional Access & Role Management
        </h1>
        <p className="text-sm text-slate-300">
          Sign in with role-verified credentials or choose an accredited enterprise persona to unlock tailored cadastral workstations.
        </p>
      </div>

      {/* If Already Logged In: Show Active Identity Card */}
      {currentUser ? (
        <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-wrap items-start justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-800 flex items-center justify-center text-slate-950 font-extrabold text-2xl font-mono shadow-lg shadow-emerald-500/20">
                {currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Active Session Authenticated
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{currentUser.name}</h2>
                <p className="text-xs text-slate-400 font-mono">{currentUser.email}</p>
                {currentUser.organization && (
                  <p className="text-xs text-slate-300 font-semibold mt-0.5">{currentUser.organization}</p>
                )}
              </div>
            </div>

            <span className="px-3 py-1 rounded-lg bg-slate-800 text-emerald-400 border border-emerald-500/30 font-mono text-xs font-bold">
              {currentUser.role.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-slate-800 text-xs font-mono">
            <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block mb-1">Session Token</span>
              <span className="text-white truncate block font-bold">{currentUser.sessionToken}</span>
            </div>
            <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block mb-1">Cryptographic 2FA</span>
              <span className="text-emerald-400 font-bold">Hardware Token Verified</span>
            </div>
            <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block mb-1">SURCON Standing</span>
              <span className="text-blue-400 font-bold">{currentUser.surconLicense || 'Statutory Trust'}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
            <button
              onClick={onLogout}
              className="px-5 py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 text-xs font-bold transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Terminate Active Session (Sign Out)</span>
            </button>

            <button
              onClick={onNavigateToScanner}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 hover:scale-105"
            >
              <span>Proceed to Workstation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Main Login 2-Column Split: Persona Quick Selection & Credentials Form */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column (5 Cols): Enterprise Personas Selector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                1. Select Institutional Role:
              </h3>
              <span className="text-[11px] text-emerald-400 font-mono">1-Click Fast Auth</span>
            </div>

            <div className="space-y-3">
              {PERSONA_CATALOG.map((p) => {
                const isSelected = selectedPersona.role === p.role;
                const IconComp = p.icon;

                return (
                  <div
                    key={p.role}
                    onClick={() => handleSelectPersona(p)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-slate-800/90 border-emerald-500 shadow-xl shadow-emerald-500/15 scale-[1.02]'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected ? 'bg-emerald-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-sm font-bold text-white block truncate">
                            {p.title}
                          </strong>
                          {isSelected && <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">{p.name}</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{p.org}</p>

                        {isSelected && (
                          <div className="mt-3 pt-3 border-t border-slate-700/80 space-y-1.5">
                            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                              Granted Privileges:
                            </span>
                            {p.privileges.map((priv, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300 font-mono">
                                <span className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0"></span>
                                <span className="truncate">{priv}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (7 Cols): Credentials & 2FA Form */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                  Secured Workstation Sign-In
                </span>
                <h3 className="text-lg font-bold text-white">
                  Authenticate as {selectedPersona.title}
                </h3>
              </div>

              <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    authMode === 'signin' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    authMode === 'register' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400'
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Address */}
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  Institutional Email Address
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="practitioner@institution.gov"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-slate-300 font-semibold">
                    Security Passcode
                  </label>
                  <a href="#reset" className="text-[11px] text-emerald-400 hover:underline font-mono">
                    Forgot key?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 2FA Token Code */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-blue-400" />
                    Two-Factor Authentication Token (TOTP)
                  </label>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">256-BIT ROTATING PIN</span>
                </div>

                <input
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-emerald-400 tracking-widest text-center focus:border-emerald-500 focus:outline-none font-bold"
                  placeholder="000 000"
                />
                <p className="text-[10px] text-slate-500 text-center font-mono">
                  Hardware token simulated for instant audit session clearance.
                </p>
              </div>

              {/* Remember Me & Terms */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                  <span>Persist session token on this terminal</span>
                </label>
                <span className="text-[11px] text-slate-500 font-mono">TLS 1.3 Strict</span>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Cryptographic Credentials...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 stroke-[2.5]" />
                    <span>Sign In to {selectedPersona.title} Workstation</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>

            {/* Security Compliance Footer */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SURCON & Lands Bureau Statutory Interlock</span>
              </div>
              <span>SOC-2 Type II Certified</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
