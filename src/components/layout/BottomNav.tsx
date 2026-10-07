import { Home, Camera, ShieldCheck, Wrench, Receipt, Sparkles, User, Layers, Zap, Gauge } from 'lucide-react';
import type { ActiveTab } from '../../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenProfile: () => void;
}

export function BottomNav({ activeTab, onSelectTab, onOpenProfile }: BottomNavProps) {
  const navItems: { id: ActiveTab | 'profile'; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'scanner', label: 'Scanner', icon: Camera },
    { id: 'passport', label: 'Passport', icon: ShieldCheck },
    { id: 'repair', label: 'Repair', icon: Wrench },
    { id: 'receipt', label: 'Receipts', icon: Receipt },
    { id: 'automation', label: 'Automate', icon: Zap },
    { id: 'power', label: 'Power', icon: Gauge },
    { id: 'memory', label: 'Memory', icon: Sparkles },
    { id: 'architecture', label: 'Modules', icon: Layers },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 90,
        width: 'auto',
        maxWidth: '96vw',
      }}
    >
      <div
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '6px 10px',
          borderRadius: '9999px',
          background: 'rgba(26, 24, 54, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(241, 102, 35, 0.35)',
          boxShadow: '0 16px 40px rgba(10, 8, 26, 0.8), 0 0 25px rgba(241, 102, 35, 0.25)',
          overflowX: 'auto',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isSpecial = item.id === 'scanner' || item.id === 'automation';

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'profile') {
                  onOpenProfile();
                } else {
                  onSelectTab(item.id as ActiveTab);
                }
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isSpecial ? '7px 12px' : '7px 10px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                background: isActive
                  ? 'linear-gradient(135deg, #262262 0%, #622347 45%, #F16623 100%)'
                  : 'transparent',
                color: isActive ? '#FFFFFF' : 'var(--color-blush)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                whiteSpace: 'nowrap',
              }}
              title={item.label}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: isActive ? 'drop-shadow(0 0 6px rgba(241,102,35,0.8))' : 'none',
                }}
              >
                <Icon size={isSpecial ? 20 : 18} />
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  marginTop: '2px',
                  display: 'block',
                  color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
