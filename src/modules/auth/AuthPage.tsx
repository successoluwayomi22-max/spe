import { useState, type FC } from 'react';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, Fingerprint, ArrowRight } from 'lucide-react';
import type { Person, LanguageCode } from '../../types';
import { XerxesLogo } from '../../components/brand/Logos';
import { AIAvatarOrb } from '../../components/brand/AIAvatarOrb';
import { TRANSLATIONS } from '../../core/i18n/translations';

interface AuthPageProps {
  currentLang: LanguageCode;
  onLoginSuccess: (person: Person) => void;
}

const DEMO_PERSONAS: Person[] = [
  {
    id: 'usr_tunde_01',
    name: 'Tunde Adeleke',
    email: 'tunde@xerxes.world',
    role: 'Asset Custodian & Facility Lead',
    skills: ['Solar Inverter Maintenance', 'IoT Sensor Diagnostics', 'Preventive Maintenance'],
    preferences: {
      language: 'en',
      currency: 'NGN',
      theme: 'dark',
      privacyLevel: 'strict',
    },
  },
  {
    id: 'usr_julia_02',
    name: 'Julia Chen',
    email: 'julia.chen@xerxes.world',
    role: 'Systems & AI Health Engineer',
    skills: ['Robotics Diagnostics', 'Computer Vision Telemetry', 'Energy Grid Analytics'],
    preferences: {
      language: 'en',
      currency: 'USD',
      theme: 'dark',
      privacyLevel: 'strict',
    },
  },
  {
    id: 'usr_marcus_03',
    name: 'Marcus Vance',
    email: 'marcus@xerxes.world',
    role: 'Field Inspection Specialist',
    skills: ['Acoustic Ultrasound Testing', 'Pothole Analysis', 'Waste Classification'],
    preferences: {
      language: 'en',
      currency: 'EUR',
      theme: 'dark',
      privacyLevel: 'standard',
    },
  },
];

export const AuthPage: FC<AuthPageProps> = ({ currentLang, onLoginSuccess }) => {
  const t = TRANSLATIONS[currentLang];
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('tunde@xerxes.world');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: Person = {
        id: `usr_${Date.now()}`,
        name: isRegisterMode ? name || 'XERXES Explorer' : 'Tunde Adeleke',
        email,
        role: isRegisterMode ? 'Verified Member' : 'Asset Custodian',
        skills: ['Reality Inspection', 'Equipment Management'],
        preferences: {
          language: currentLang,
          currency: 'NGN',
          theme: 'dark',
          privacyLevel: 'strict',
        },
      };
      onLoginSuccess(user);
    }, 600);
  };

  const handleSelectPersona = (persona: Person) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(persona);
    }, 400);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        background: 'radial-gradient(ellipse at 50% 15%, rgba(0, 240, 255, 0.12), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.15), transparent 60%), var(--bg-primary)',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '36px 32px',
          borderRadius: '28px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 240, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Animated AI Agent Avatar Orb Header */}
        <div style={{ marginBottom: '8px' }}>
          <AIAvatarOrb size={90} isThinking={isLoading} />
        </div>

        <div style={{ marginBottom: '6px' }}>
          <XerxesLogo variant="wordmark" size={30} colorMode="brand" />
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          {isRegisterMode ? 'Create Your Digital Identity' : 'Authenticate to XERXES'}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          {t.brandStatement}
        </p>

        {/* Quick Demo Persona Pickers */}
        <div style={{ width: '100%', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
              Quick One-Click Demo Profiles
            </span>
            <span className="badge badge-cyan" style={{ fontSize: '10px' }}>Instant Access</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {DEMO_PERSONAS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPersona(p)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-cyan)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '13px',
                    }}
                  >
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.role}</div>
                  </div>
                </div>
                <ArrowRight size={14} color="var(--accent-cyan)" />
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '12px 0 18px 0', gap: '10px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            or with credentials
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isRegisterMode && (
            <div style={{ textAlign: 'left' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Adebayo Ogunlesi"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '14px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                }}
              />
            </div>
          )}

          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
              Email Identity
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@xerxes.world"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  borderRadius: '14px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
              Cryptographic Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 40px',
                  borderRadius: '14px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary"
            style={{ width: '100%', padding: '14px', borderRadius: '14px', fontSize: '15px', marginTop: '6px' }}
          >
            {isLoading ? (
              <span>Authenticating Session...</span>
            ) : isRegisterMode ? (
              <span>Register Identity &rarr;</span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Fingerprint size={18} />
                Sign In to Platform
              </span>
            )}
          </button>

          {/* Toggle between register & login */}
          <div style={{ marginTop: '8px' }}>
            <button
              type="button"
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}
            >
              {isRegisterMode ? 'Already have an identity? Sign In' : 'New to XERXES? Create Digital Identity'}
            </button>
          </div>
        </form>

        {/* Security / Privacy badge */}
        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
          <ShieldCheck size={14} color="var(--accent-emerald)" />
          <span>Encrypted Session &bull; Zero Third-Party Tracking &bull; Privacy by Default</span>
        </div>
      </div>
    </div>
  );
};
