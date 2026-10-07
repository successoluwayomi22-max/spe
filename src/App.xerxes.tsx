// XERXES — The Intelligent World Platform
import { useState, useEffect } from 'react';
import {
  Camera,
  ShieldCheck,
  Wrench,
  Receipt,
  Sparkles,
  Layers,
  Moon,
  Sun,
  Globe,
  Coins,
  Settings,
  Wifi,
  WifiOff,
  Clock,
  ArrowRight,
  Activity,
  LogOut,
  Zap,
  Gauge,
  CheckCircle2,
} from 'lucide-react';
import type { ActiveTab, LanguageCode, CurrencyCode, ThemeMode, EventRecord, Person } from './types';
import { db } from './core/db/storage';
import { eventEngine } from './core/events/eventEngine';
import { aiGateway } from './core/ai/gateway';
import { TRANSLATIONS } from './core/i18n/translations';
import { formatCurrency, convertCurrency } from './core/currency/currencyService';

import { XerxesLogo } from './components/brand/Logos';
import { CinematicIntro } from './components/brand/CinematicIntro';
import { AIAvatarOrb } from './components/brand/AIAvatarOrb';
import { BottomNav } from './components/layout/BottomNav';

import { AuthPage } from './modules/auth/AuthPage';
import { RealityScanner } from './modules/scanner/RealityScanner';
import { ObjectPassport } from './modules/passport/ObjectPassport';
import { RepairVision } from './modules/repair/RepairVision';
import { ReceiptDNA } from './modules/receipt/ReceiptDNA';
import { AutomationRules } from './modules/automation/AutomationRules';
import { PowerTwin } from './modules/power/PowerTwin';
import { AIMemorySearch } from './modules/memory/AIMemorySearch';
import { ModulesRoadmap } from './modules/roadmap/ModulesRoadmap';

export function App() {
  const [currentUser, setCurrentUser] = useState<Person | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [lang, setLang] = useState<LanguageCode>('en');
  const [currency, setCurrency] = useState<CurrencyCode>('NGN');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [geminiApiKeyInput, setGeminiApiKeyInput] = useState<string>('');
  const [events, setEvents] = useState<EventRecord[]>([]);

  // Cross-module prefill channels
  const [passportPrefill, setPassportPrefill] = useState<any>(null);
  const [repairPrefill, setRepairPrefill] = useState<{ name: string; symptom?: string } | null>(null);

  const t = TRANSLATIONS[lang];

  // Initialize session, preferences, online listener, events, and intro
  useEffect(() => {
    // Load initial user session
    db.getPerson().then(setCurrentUser);

    // Check if first visit in this session for intro
    const hasSeenIntro = sessionStorage.getItem('xerxes_intro_seen');
    if (!hasSeenIntro) {
      setShowIntro(true);
      sessionStorage.setItem('xerxes_intro_seen', 'true');
    }

    // Load initial events
    db.getEvents().then(setEvents);

    // Subscribe to real-time events
    const unsubscribe = eventEngine.subscribe('*', (newEvent) => {
      setEvents((prev) => [newEvent, ...prev.slice(0, 30)]);
    });

    // Online/offline listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load saved API key
    const key = db.getGeminiApiKey();
    if (key) setGeminiApiKeyInput(key);

    return () => {
      unsubscribe();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync theme attribute to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const saveSettings = () => {
    db.setGeminiApiKey(geminiApiKeyInput);
    setIsSettingsOpen(false);
  };

  const handleResetData = () => {
    if (confirm('Reset all demo entities, passports, receipts, and events to factory defaults?')) {
      db.resetToDefaults();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsProfileModalOpen(false);
  };

  // If user logged out, show dedicated Authentication Page
  if (!currentUser) {
    return (
      <AuthPage
        currentLang={lang}
        onLoginSuccess={(person) => {
          setCurrentUser(person);
          setActiveTab('home');
        }}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', paddingBottom: '70px' }}>
      {/* Cinematic Intro (Part 18 of PRD) */}
      {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}

      {/* Top Universal Platform Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 80,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          backgroundColor: 'var(--bg-glass)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '12px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          {/* Logo / Brandmark */}
          <div
            onClick={() => setActiveTab('home')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <XerxesLogo variant="combo" size={36} colorMode="brand" />
          </div>

          {/* Controls: Language, Currency, Theme, Settings, User Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Online/Offline Status Indicator */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '11px',
                fontWeight: 600,
                background: isOnline ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.15)',
                color: isOnline ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                border: `1px solid ${isOnline ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.4)'}`,
              }}
              title={isOnline ? 'Sensory Mesh Connected' : 'Offline Mode: Actions queued in local ledger'}
            >
              {isOnline ? <Wifi size={13} /> : <WifiOff size={13} />}
              <span className="hidden sm:inline">{isOnline ? t.actions.online : t.actions.offline}</span>
            </div>

            {/* Language Selector */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <select
                aria-label="Language selector"
                value={lang}
                onChange={(e) => setLang(e.target.value as LanguageCode)}
                style={{
                  padding: '6px 12px 6px 28px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  appearance: 'none',
                }}
              >
                <option value="en">English (EN)</option>
                <option value="pcm">Pidgin (PCM)</option>
                <option value="yo">Yorùbá (YO)</option>
                <option value="ha">Hausa (HA)</option>
                <option value="ig">Igbo (IG)</option>
              </select>
              <Globe size={13} style={{ position: 'absolute', left: '10px', pointerEvents: 'none', color: 'var(--accent-cyan)' }} />
            </div>

            {/* Currency Selector */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <select
                aria-label="Currency selector"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                style={{
                  padding: '6px 12px 6px 26px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  appearance: 'none',
                }}
              >
                <option value="NGN">NGN (₦)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
                <option value="CAD">CAD (CA$)</option>
                <option value="AUD">AUD (A$)</option>
              </select>
              <Coins size={13} style={{ position: 'absolute', left: '10px', pointerEvents: 'none', color: 'var(--accent-cyan)' }} />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn-secondary"
              style={{ width: '34px', height: '34px', padding: 0, borderRadius: '50%' }}
              aria-label="Toggle Theme"
              title="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? <Sun size={15} color="#F59E0B" /> : <Moon size={15} />}
            </button>

            {/* Settings Trigger */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="btn-secondary"
              style={{ width: '34px', height: '34px', padding: 0, borderRadius: '50%' }}
              aria-label="Settings"
              title="Settings & AI Gateway"
            >
              <Settings size={15} />
            </button>

            {/* Active User Persona Avatar Pill */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 10px 4px 4px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
              title="View Account Profile"
            >
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '12px',
                }}
              >
                {currentUser.name.charAt(0)}
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600 }} className="hidden md:inline">
                {currentUser.name.split(' ')[0]}
              </span>
            </button>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <div className="container" style={{ marginTop: '12px', overflowX: 'auto', display: 'flex', gap: '8px', paddingBottom: '4px' }}>
          {[
            { id: 'home', label: t.nav.home, icon: Activity },
            { id: 'scanner', label: t.nav.scanner, icon: Camera, badge: '01' },
            { id: 'passport', label: t.nav.passport, icon: ShieldCheck, badge: '21' },
            { id: 'repair', label: t.nav.repair, icon: Wrench, badge: '23' },
            { id: 'receipt', label: t.nav.receipt, icon: Receipt, badge: '28' },
            { id: 'automation', label: 'Automate', icon: Zap, badge: '04' },
            { id: 'power', label: 'PowerTwin', icon: Gauge, badge: '11' },
            { id: 'memory', label: t.nav.memory, icon: Sparkles, badge: '09' },
            { id: 'architecture', label: t.nav.architecture, icon: Layers, badge: '40' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: `1px solid ${isActive ? 'var(--color-sunset)' : 'rgba(224,180,178,0.12)'}`,
                  background: isActive
                    ? 'linear-gradient(135deg, #262262 0%, #622347 45%, #F16623 100%)'
                    : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? '#FFFFFF' : 'var(--color-blush)',
                  fontSize: '13px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 4px 20px rgba(241,102,35,0.35)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    style={{
                      fontSize: '10px',
                      padding: '1px 6px',
                      borderRadius: '8px',
                      background: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.08)',
                      color: isActive ? '#262262' : 'var(--text-muted)',
                      fontWeight: 800,
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container" style={{ flex: 1, padding: '28px 20px 48px 20px' }}>
        {/* VIEW: HOME OVERVIEW (Comprehensive Feature Command Center) */}
        {activeTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

            {/* XERXES Palette Harmonizer Indicator (Directly echoing the 3 user swatch references) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 20px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, rgba(26,24,54,0.9), rgba(38,34,98,0.6))',
                border: '1px solid rgba(241,102,35,0.25)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-sunset)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  XERXES SPECTRUM HARMONY
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-blush)' }}>
                  Deep Indigo #262262 ⇄ Sunset Amber #F16623 ⇄ Plum #622347 ⇄ Teal #104C64
                </span>
              </div>

              {/* Visual 3-Pillar Gradient Swatches */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Image 1 Gradient Pill */}
                <div
                  title="Image 1: #262262 to #F16623"
                  style={{
                    width: '38px',
                    height: '14px',
                    borderRadius: '7px',
                    background: 'linear-gradient(90deg, #262262, #F16623)',
                    boxShadow: '0 0 10px rgba(241,102,35,0.5)',
                  }}
                />
                {/* Image 2 Mindazzle Spectrum Pill */}
                <div
                  title="Image 2: #1A1836 - #42164B - #622347 - #A54055 - #E99856 - #E0B4B2"
                  style={{
                    width: '54px',
                    height: '14px',
                    borderRadius: '7px',
                    background: 'linear-gradient(90deg, #1A1836, #42164B, #622347, #A54055, #E99856, #E0B4B2)',
                    boxShadow: '0 0 10px rgba(165,64,85,0.5)',
                  }}
                />
                {/* Image 3 Leeeg Earth/Teal Pill */}
                <div
                  title="Image 3: #0D1D25 - #104C64 - #C6C6D0 - #D59D80 - #C0754D - #B6410F"
                  style={{
                    width: '54px',
                    height: '14px',
                    borderRadius: '7px',
                    background: 'linear-gradient(90deg, #0D1D25, #104C64, #C6C6D0, #D59D80, #C0754D, #B6410F)',
                    boxShadow: '0 0 10px rgba(16,76,100,0.5)',
                  }}
                />
                <span className="badge badge-cyan" style={{ fontSize: '10px' }}>Active Sensory Mesh</span>
              </div>
            </div>

            {/* Hero Companion Banner with Iridescent 3D AI Orb */}
            <div
              className="glass-panel"
              style={{
                padding: '40px 36px',
                borderRadius: '32px',
                background: 'radial-gradient(ellipse at 85% 20%, rgba(241,102,35,0.32), transparent 55%), radial-gradient(ellipse at 15% 85%, rgba(66,22,75,0.45), transparent 55%), linear-gradient(135deg, rgba(38,34,98,0.7) 0%, rgba(26,24,54,0.75) 100%)',
                border: '1px solid rgba(241,102,35,0.4)',
                boxShadow: '0 24px 60px -12px rgba(18, 16, 36, 0.9), 0 0 40px rgba(241,102,35,0.18)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '28px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge badge-cyan">AUTONOMOUS SENSORY OPERATING LAYER</span>
                  <span className="badge badge-violet">VERIFIED OPERATOR: {currentUser.name}</span>
                </div>

                <h1 style={{ fontSize: '38px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15 }}>
                  Hello {currentUser.name.split(' ')[0]},<br />
                  <span style={{ background: 'linear-gradient(90deg, #FFFFFF 0%, #E99856 50%, #F16623 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Intelligence for the world around you.
                  </span>
                </h1>

                <p style={{ fontSize: '15px', color: 'var(--color-blush)', maxWidth: '620px', lineHeight: 1.6 }}>
                  XERXES unifies physical reality, hardware diagnostics, smart microgrid telemetry, itemized expense ledgers, and autonomous rules into one cohesive sensory operating layer.
                </p>

                {/* Direct Action Launchpad */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '6px' }}>
                  <button
                    onClick={() => setActiveTab('scanner')}
                    className="btn-primary"
                    style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '16px' }}
                  >
                    <Camera size={18} />
                    Launch Scanner (01)
                  </button>

                  <button
                    onClick={() => setActiveTab('passport')}
                    className="btn-secondary"
                    style={{ padding: '12px 20px', fontSize: '14px', borderRadius: '16px' }}
                  >
                    <ShieldCheck size={18} color="var(--color-sunset)" />
                    Object Passports (21)
                  </button>

                  <button
                    onClick={() => setActiveTab('automation')}
                    className="btn-secondary"
                    style={{ padding: '12px 20px', fontSize: '14px', borderRadius: '16px' }}
                  >
                    <Zap size={18} color="var(--color-apricot)" />
                    Automation Rules (04)
                  </button>

                  <button
                    onClick={() => setActiveTab('power')}
                    className="btn-secondary"
                    style={{ padding: '12px 20px', fontSize: '14px', borderRadius: '16px' }}
                  >
                    <Gauge size={18} color="#10B981" />
                    PowerTwin (11)
                  </button>
                </div>
              </div>

              {/* Luminous AI Orb Avatar Mascot */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <AIAvatarOrb size={145} isThinking={false} />
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-sunset)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    XERXES SENSORY MESH
                  </span>
                  <div style={{ fontSize: '11px', color: 'var(--color-blush)' }}>
                    Neural Fusion Active • 96.4% Precision
                  </div>
                </div>
              </div>
            </div>

            {/* COMPLETE FEATURE COMMAND CENTER — Where All Core Capabilities Are Displayed */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-cyan">PRD MASTER CAPABILITIES</span>
                    <span className="badge badge-amber">8 ACTIVE MODULES</span>
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                    Intelligent Platform Features & Modules
                  </h2>
                  <p style={{ fontSize: '14px', color: 'var(--color-blush)' }}>
                    Explore active modules. Click any capability card to jump directly into the full interactive engine.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('architecture')}
                  className="btn-secondary"
                  style={{ borderRadius: '14px', padding: '8px 18px', fontSize: '13px' }}
                >
                  <Layers size={15} />
                  View All 40 PRD Modules
                </button>
              </div>

              {/* 8-Card Feature Launchpad Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                
                {/* FEATURE 01: REALITY SCANNER */}
                <div
                  onClick={() => setActiveTab('scanner')}
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    borderRadius: '26px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    background: 'linear-gradient(145deg, rgba(38,34,98,0.5) 0%, rgba(241,102,35,0.18) 100%)',
                    border: '1px solid rgba(241,102,35,0.3)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'linear-gradient(135deg, #262262, #F16623)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                      <Camera size={20} />
                    </div>
                    <span className="badge badge-cyan">MODULE 01</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>RealityScanner</h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-blush)', marginTop: '2px' }}>
                      Real-time camera detection & image upload. Categorizes power equipment, tools, electronics, docs, and vehicles.
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#10B981', fontWeight: 600 }}>
                    <CheckCircle2 size={14} />
                    <span>Live HUD & OCR Active (98.4% conf)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-sunset)', fontWeight: 700, marginTop: 'auto' }}>
                    <span>Launch Scanner HUD</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* FEATURE 21: OBJECT PASSPORT */}
                <div
                  onClick={() => setActiveTab('passport')}
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    borderRadius: '26px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    background: 'linear-gradient(145deg, rgba(38,34,98,0.5) 0%, rgba(16,76,100,0.25) 100%)',
                    border: '1px solid rgba(16,76,100,0.4)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'linear-gradient(135deg, #104C64, #262262)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                      <ShieldCheck size={20} />
                    </div>
                    <span className="badge badge-emerald">MODULE 21</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>Object Passports</h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-blush)', marginTop: '2px' }}>
                      Immutable digital twin dossiers with serial hashes, warranty countdown meters, and cryptographic SHA-256 ledger proof.
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-apricot)', fontWeight: 600 }}>
                    <span>4 Registered • Inverter Warranty: 182d</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-sunset)', fontWeight: 700, marginTop: 'auto' }}>
                    <span>Inspect Passports & Hashes</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* FEATURE 23: REPAIRVISION */}
                <div
                  onClick={() => setActiveTab('repair')}
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    borderRadius: '26px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    background: 'linear-gradient(145deg, rgba(38,34,98,0.5) 0%, rgba(165,64,85,0.25) 100%)',
                    border: '1px solid rgba(165,64,85,0.4)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'linear-gradient(135deg, #622347, #A54055)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                      <Wrench size={20} />
                    </div>
                    <span className="badge badge-rose">MODULE 23</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>RepairVision</h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-blush)', marginTop: '2px' }}>
                      Hardware defect diagnostics, severity safety ratings, thermal fault detection, and step-by-step repair checklists.
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#F43F5E', fontWeight: 600 }}>
                    <span>1 Alert: Thermal Overheat on Inverter</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-sunset)', fontWeight: 700, marginTop: 'auto' }}>
                    <span>Run Diagnostic Guide</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* FEATURE 28: RECEIPT DNA */}
                <div
                  onClick={() => setActiveTab('receipt')}
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    borderRadius: '26px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    background: 'linear-gradient(145deg, rgba(38,34,98,0.5) 0%, rgba(66,22,75,0.3) 100%)',
                    border: '1px solid rgba(224,180,178,0.2)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'linear-gradient(135deg, #42164B, #622347)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                      <Receipt size={20} />
                    </div>
                    <span className="badge badge-violet">MODULE 28</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>Receipt DNA</h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-blush)', marginTop: '2px' }}>
                      Automated itemized receipt extraction. Computes VAT/tax, breaks down purchases, and links warranties to passports.
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#10B981', fontWeight: 600 }}>
                    <span>Tracked Spend: {formatCurrency(convertCurrency(145125, 'NGN', currency).convertedAmount, currency)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-sunset)', fontWeight: 700, marginTop: 'auto' }}>
                    <span>Parse Invoices & Bills</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* FEATURE 04: AUTOMATION ENGINE */}
                <div
                  onClick={() => setActiveTab('automation')}
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    borderRadius: '26px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    background: 'linear-gradient(145deg, rgba(38,34,98,0.5) 0%, rgba(241,102,35,0.2) 100%)',
                    border: '1px solid rgba(241,102,35,0.35)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'linear-gradient(135deg, #F16623, #E99856)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1836' }}>
                      <Zap size={20} />
                    </div>
                    <span className="badge badge-amber">MODULE 04</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>Automation Rules</h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-blush)', marginTop: '2px' }}>
                      Autonomous IF/THEN dispatcher. Auto-starts backup generators, triggers defect lockouts, and generates warranties.
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-apricot)', fontWeight: 600 }}>
                    <span>4 Active Rules • 150 Executions</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-sunset)', fontWeight: 700, marginTop: 'auto' }}>
                    <span>Configure Rules Engine</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* FEATURE 11: POWERTWIN */}
                <div
                  onClick={() => setActiveTab('power')}
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    borderRadius: '26px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    background: 'linear-gradient(145deg, rgba(16,76,100,0.4) 0%, rgba(38,34,98,0.5) 100%)',
                    border: '1px solid rgba(16,76,100,0.45)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'linear-gradient(135deg, #0D1D25, #104C64)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                      <Gauge size={20} />
                    </div>
                    <span className="badge badge-emerald">MODULE 11</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>PowerTwin Telemetry</h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-blush)', marginTop: '2px' }}>
                      Live microgrid & inverter digital twin. Tracks solar PV generation, lithium battery SOC, grid stability, and ATS generator.
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#38BDF8', fontWeight: 600 }}>
                    <span>Solar: 3.84 kW • Battery: 86% • 228 VAC</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-sunset)', fontWeight: 700, marginTop: 'auto' }}>
                    <span>Inspect Power Dashboard</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* FEATURE 09: AI MEMORY SEARCH */}
                <div
                  onClick={() => setActiveTab('memory')}
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    borderRadius: '26px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    background: 'linear-gradient(145deg, rgba(66,22,75,0.45) 0%, rgba(38,34,98,0.5) 100%)',
                    border: '1px solid rgba(165,64,85,0.3)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'linear-gradient(135deg, #622347, #262262)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                      <Sparkles size={20} />
                    </div>
                    <span className="badge badge-violet">MODULE 09</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>AI Sensory Memory</h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-blush)', marginTop: '2px' }}>
                      Natural language query engine. Ask where physical tools are stored, when maintenance occurred, or search past purchases.
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-blush)', fontWeight: 600 }}>
                    <span>"Where did I leave my drill?" • "Inverter check"</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-sunset)', fontWeight: 700, marginTop: 'auto' }}>
                    <span>Ask XERXES Intelligence</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* FEATURE 40: MASTER PRD TAXONOMY */}
                <div
                  onClick={() => setActiveTab('architecture')}
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    borderRadius: '26px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    background: 'linear-gradient(145deg, rgba(26,24,54,0.6) 0%, rgba(38,34,98,0.5) 100%)',
                    border: '1px solid rgba(224,180,178,0.2)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'linear-gradient(135deg, #1A1836, #42164B)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                      <Layers size={20} />
                    </div>
                    <span className="badge badge-cyan">MODULE 40</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>40-Module Architecture</h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-blush)', marginTop: '2px' }}>
                      Complete PRD roadmap mapped across Physical Intelligence, Business & Commerce, Operations & Devices, and Community.
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-blush)', fontWeight: 600 }}>
                    <span>Part 1 to 24 • Complete Operating Layer</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-sunset)', fontWeight: 700, marginTop: 'auto' }}>
                    <span>Browse 40 Modules</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

              </div>
            </div>

            {/* Event Activity Ledger (Part 4 Event Engine) */}
            <div className="glass-panel" style={{ padding: '28px', borderRadius: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={20} color="var(--color-sunset)" />
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {t.today.recentEvents} (Part 4: Structured Event Engine)
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--color-blush)' }}>
                      Real-time ledger entries emitted by sensory vision, IoT telemetry, rules engine, and user actions.
                    </p>
                  </div>
                </div>
                <span className="badge badge-cyan">Real-Time Ledger Stream</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {events.slice(0, 6).map((evt) => (
                  <div
                    key={evt.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 18px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(224,180,178,0.1)',
                      borderRadius: '18px',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span className="badge badge-cyan" style={{ fontSize: '10px' }}>
                        {evt.type}
                      </span>
                      <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}>
                        {evt.description}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <span>Source: {evt.source}</span>
                      <span>{new Date(evt.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: REALITY SCANNER (01) */}
        {activeTab === 'scanner' && (
          <RealityScanner
            currentLang={lang}
            onNavigateToPassport={(prefill) => {
              setPassportPrefill(prefill);
              setActiveTab('passport');
            }}
            onNavigateToRepair={(objName, symptom) => {
              setRepairPrefill({ name: objName, symptom });
              setActiveTab('repair');
            }}
            onNavigateToReceipt={() => setActiveTab('receipt')}
          />
        )}

        {/* VIEW: OBJECT PASSPORT (21) */}
        {activeTab === 'passport' && (
          <ObjectPassport
            currentLang={lang}
            currentCurrency={currency}
            prefillData={passportPrefill}
            onClearPrefill={() => setPassportPrefill(null)}
            onInspectRepair={(objName) => {
              setRepairPrefill({ name: objName });
              setActiveTab('repair');
            }}
          />
        )}

        {/* VIEW: REPAIRVISION (23) */}
        {activeTab === 'repair' && (
          <RepairVision
            currentLang={lang}
            currentCurrency={currency}
            prefillObject={repairPrefill}
          />
        )}

        {/* VIEW: RECEIPT DNA (28) */}
        {activeTab === 'receipt' && (
          <ReceiptDNA
            currentLang={lang}
            currentCurrency={currency}
            onLinkToPassport={(itemData) => {
              setPassportPrefill(itemData);
              setActiveTab('passport');
            }}
          />
        )}

        {/* VIEW: AUTOMATION RULES (04) */}
        {activeTab === 'automation' && (
          <AutomationRules
            currentLang={lang}
            onNavigateToScanner={() => setActiveTab('scanner')}
            onNavigateToPassport={() => setActiveTab('passport')}
          />
        )}

        {/* VIEW: POWERTWIN ENERGY (11) */}
        {activeTab === 'power' && (
          <PowerTwin currentLang={lang} />
        )}

        {/* VIEW: AI MEMORY SEARCH (09) */}
        {activeTab === 'memory' && (
          <AIMemorySearch
            currentLang={lang}
            currentCurrency={currency}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* VIEW: 40 MODULES ROADMAP */}
        {activeTab === 'architecture' && (
          <ModulesRoadmap onSelectModule={(tab) => setActiveTab(tab)} />
        )}
      </main>

      {/* Floating Bottom Navigation Bar (Inspired by user mobile screenshots) */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Profile & Identity Modal */}
      {isProfileModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '30px', borderRadius: '28px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '20px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '24px',
                  marginBottom: '12px',
                  boxShadow: '0 8px 24px rgba(0, 240, 255, 0.4)',
                }}
              >
                {currentUser.name.charAt(0)}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>{currentUser.name}</h3>
              <p style={{ fontSize: '13px', color: 'var(--accent-cyan)', fontWeight: 600 }}>{currentUser.role}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{currentUser.email}</p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>
                Verified Skill Twin Capabilities
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {currentUser.skills.map((s) => (
                  <span key={s} className="badge badge-cyan" style={{ fontSize: '11px', padding: '4px 10px' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={handleLogout}
                className="btn-secondary"
                style={{ flex: 1, borderColor: 'var(--accent-rose)', color: 'var(--accent-rose)', borderRadius: '14px' }}
              >
                <LogOut size={16} />
                Sign Out
              </button>
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="btn-primary"
                style={{ flex: 1, borderRadius: '14px' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Settings & AI Gateway Modal */}
      {isSettingsOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div className="glass-panel" style={{ width: '100%', maxWidth: '540px', padding: '28px', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                XERXES System Settings
              </h3>
              <span className="badge badge-cyan">{aiGateway.getStatus().modelName}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Google Gemini API Key (Optional)
                </label>
                <input
                  type="password"
                  value={geminiApiKeyInput}
                  onChange={(e) => setGeminiApiKeyInput(e.target.value)}
                  placeholder="AIzaSy... (Leave empty to use built-in neural simulation)"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                  }}
                />
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  When no key is configured, XERXES runs autonomously using its built-in on-device neural simulation engine.
                </p>
              </div>

              {/* Currency Disclaimer (PRD Part 12) */}
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <strong>Currency Conversion Notice (Part 12):</strong> Exchange rates are approximate and intended for operational logistics planning; they do not constitute financial advice.
              </div>

              {/* Reset Factory Data */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  type="button"
                  onClick={handleResetData}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Reset Factory Seed Data
                </button>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={() => setIsSettingsOpen(false)} className="btn-secondary">
                    Close
                  </button>
                  <button type="button" onClick={saveSettings} className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '20px 0', background: 'var(--bg-glass)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <XerxesLogo variant="emblem" size={18} />
            <span>XERXES &bull; Intelligence for the world around you &bull; Phase 1 MVP</span>
          </div>
          <div>WCAG 2.2 AA Accessible &bull; Privacy-First &bull; Offline PWA Shell</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
