// DiasporaLand AI — Master Enterprise Header & Navigation System
// Features:
// 1. Sleek institutional branding with glowing beacon seal and tagline
// 2. Primary Navigation: Home, Cases, Cadastre Map, Cross-Check, Verification, Assistant, Report, Vault, Executive
// 3. Status Badges: Active Case quick indicator with Risk Score pill
// 4. Live Multi-Currency Selector with real-time FX symbols
// 5. International Language Selector
// 6. Quick Action: "New Property Case" with modal launcher
// 7. Persona Profile Menu with Role Badges (CEO, Auditor, Surveyor, Buyer) & 2FA indicator
// 8. Mobile Navigation Drawer with full accessibility, smooth transitions, and zero emojis

import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  DollarSign, 
  LogIn, 
  ChevronDown, 
  PlusCircle, 
  Menu, 
  X, 
  CheckCircle2, 
  Bot, 
  FileText, 
  FolderArchive, 
  BarChart3, 
  MapPin, 
  ArrowLeftRight,
  BookOpen
} from 'lucide-react';
import type { UserRole, CurrencyCode, LanguageCode, AuthUser } from '../../types/terraguard';
import { getCurrencyRegistry } from '../../core/currency/terraguardCurrency';
import { LANGUAGE_REGISTRY, TRANSLATIONS } from '../../core/i18n/terraguardI18n';

interface NavbarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  currency: CurrencyCode;
  onSelectCurrency: (c: CurrencyCode) => void;
  language: LanguageCode;
  onSelectLanguage: (l: LanguageCode) => void;
  activeTab: 'home' | 'cases' | 'scanner' | 'comparison' | 'verification' | 'assistant' | 'report' | 'vault' | 'pricing' | 'dashboard' | 'auditor' | 'auth';
  onSelectTab: (tab: any) => void;
  unlockedCount: number;
  currentUser: AuthUser | null;
  onOpenAuth: () => void;
  onOpenNewCaseWizard?: () => void;
  activeCaseInfo?: {
    caseNumber: string;
    name: string;
    riskScore: number;
    riskLevel: string;
  };
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  currency,
  onSelectCurrency,
  language,
  onSelectLanguage,
  activeTab,
  onSelectTab,
  unlockedCount,
  currentUser,
  onOpenAuth,
  onOpenNewCaseWizard,
  activeCaseInfo = {
    caseNumber: 'DL-2026-089',
    name: 'Plot 24, Lokogoma',
    riskScore: 74,
    riskLevel: 'HIGH'
  }
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const currencyRegistry = getCurrencyRegistry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'ceo_admin': return 'CEO ADMIN';
      case 'licensed_surveyor': return 'SURVEYOR';
      case 'lead_auditor': return 'AUDITOR';
      case 'diaspora_investor': return 'BUYER';
      default: return 'GUEST';
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'cases', label: 'Cases', icon: null },
    { id: 'comparison', label: 'Cross-Check', icon: <ArrowLeftRight className="w-3.5 h-3.5" /> },
    { id: 'verification', label: 'Verification', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: 'assistant', label: 'AI Assistant', icon: <Bot className="w-3.5 h-3.5" /> },
    { id: 'report', label: 'Risk Report', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'knowledge', label: 'Knowledge Base', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'scanner', label: 'Cadastre Map', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'vault', label: 'Vault', icon: <FolderArchive className="w-3.5 h-3.5" />, badge: unlockedCount },
    { id: 'pricing', label: 'Plans', icon: null },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#1c2a44] bg-[#070b14]/95 backdrop-blur-xl shadow-lg shadow-black/40 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-2 sm:gap-3 w-full min-w-0">
        
        {/* LEFT: BRAND IDENTITY & LOGO */}
        <div className="flex items-center gap-3 shrink-0">
          <div 
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group flex-shrink-0 select-none py-2"
          >
            {/* Hexagonal / Shield Geometric Icon with Deep Blue Gradient Glow */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-950 flex items-center justify-center border border-blue-400/40 group-hover:scale-105 group-hover:border-blue-400 transition-all duration-200 shadow-lg shadow-blue-600/25 shrink-0">
              <ShieldCheck className="w-5 h-5 text-white stroke-[2.5]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white font-sans">DiasporaLand</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/40 font-mono font-extrabold tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-[9px] text-slate-400 tracking-wider uppercase font-mono font-medium hidden sm:block">
                Know the Risk Before You Buy
              </p>
            </div>
          </div>

          {/* ACTIVE CASE QUICK PILL (Extra Wide Desktops Only) */}
          <div 
            onClick={() => onSelectTab('comparison')}
            className="hidden 2xl:flex items-center gap-2 pl-3 pr-3.5 py-1.5 rounded-lg bg-[#0b1222] hover:bg-[#111c33] border border-slate-800 hover:border-slate-700 cursor-pointer transition-all text-xs shrink-0"
            title="Active Investigation Context"
          >
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-slate-400 font-mono text-[11px] font-semibold">{activeCaseInfo.caseNumber}:</span>
            <span className="text-slate-200 font-medium max-w-[130px] truncate">{activeCaseInfo.name}</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-800">
              {activeCaseInfo.riskScore}/100
            </span>
          </div>
        </div>

        {/* CENTER: DESKTOP NAVIGATION TABS (Scrollable if viewport is tight) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#090f1d] p-1 rounded-xl border border-slate-800/90 shadow-inner overflow-x-auto no-scrollbar max-w-2xl shrink min-w-0">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onSelectTab(link.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="px-1.5 py-0.2 bg-blue-400 text-slate-950 text-[10px] rounded-full font-mono font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          {currentRole === 'ceo_admin' && (
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1 ${
                activeTab === 'dashboard'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-purple-400 hover:text-purple-300 hover:bg-slate-900/80'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Executive</span>
            </button>
          )}
        </nav>

        {/* RIGHT: ACTIONS, CONTROLS & AUTH */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Action: New Investigation Case */}
          {onOpenNewCaseWizard && (
            <button
              onClick={onOpenNewCaseWizard}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/25 hover:scale-105 active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Case</span>
            </button>
          )}

          {/* Live Multi-Currency Selector */}
          <div className="flex items-center bg-[#090f1d] border border-slate-800 rounded-xl px-2.5 py-1.5 gap-1.5 hover:border-slate-700 transition-colors">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <select
              value={currency}
              onChange={(e) => onSelectCurrency(e.target.value as CurrencyCode)}
              className="bg-transparent text-xs font-mono font-bold text-white focus:outline-none cursor-pointer"
              title="Base Settlement Currency"
            >
              {Object.values(currencyRegistry).map((c) => (
                <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                  {c.code} ({c.symbol.trim()})
                </option>
              ))}
            </select>
          </div>

          {/* International Language Selector */}
          <div className="hidden sm:flex items-center bg-[#090f1d] border border-slate-800 rounded-xl px-2.5 py-1.5 gap-1.5 hover:border-slate-700 transition-colors">
            <Globe className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <select
              value={language}
              onChange={(e) => onSelectLanguage(e.target.value as LanguageCode)}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              title="Interface Language"
            >
              {Object.values(LANGUAGE_REGISTRY).map((l) => (
                <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                  {l.nativeLabel}
                </option>
              ))}
            </select>
          </div>

          {/* Authenticated User Account Profile & Role Dropdown */}
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-xl bg-[#090f1d] hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-xs font-mono transition-all group select-none"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-[10px]">
                  {currentUser.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                </div>
                <span className="text-white font-semibold max-w-[80px] truncate hidden md:inline">
                  {currentUser.name.split(' ')[0]}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-blue-400 border border-blue-500/30 font-bold hidden xl:inline">
                  {getRoleLabel(currentUser.role)}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0c1322] border border-[#1e2d4a] shadow-2xl p-3 space-y-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 font-sans">
                  <div className="border-b border-slate-800 pb-2 px-1">
                    <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono truncate">{currentUser.email}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-mono font-bold border border-blue-800">
                        {getRoleLabel(currentUser.role)}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        2FA Active
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        onOpenAuth();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                    >
                      Account Security & Tokens
                    </button>
                    <button
                      onClick={() => {
                        onSelectTab('vault');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center justify-between"
                    >
                      <span>Evidence Repository</span>
                      <span className="text-[10px] font-mono text-blue-400 bg-blue-950 px-1.5 py-0.5 rounded border border-blue-900">
                        AES-256
                      </span>
                    </button>
                  </div>

                  <div className="border-t border-slate-800 pt-2">
                    <button
                      onClick={() => {
                        onOpenAuth();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-red-400 hover:bg-red-950/40 transition-all"
                    >
                      Switch Persona / Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold font-mono transition-all shadow-md shadow-blue-600/20"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.signIn}</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#090f1d] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#070b14] px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200 shadow-2xl">
          {/* Active Case Banner in Mobile */}
          <div className="p-3 rounded-lg bg-[#0c1322] border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Active Case</span>
              <span className="font-bold text-white">{activeCaseInfo.name}</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-800">
              Score: {activeCaseInfo.riskScore}/100
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onSelectTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg text-xs font-bold text-left flex items-center gap-2 border transition-all ${
                  activeTab === link.id
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-[#090f1d] text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          {onOpenNewCaseWizard && (
            <button
              onClick={() => {
                onOpenNewCaseWizard();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Initiate New Property Case</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
