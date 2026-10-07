// XERXES Module 11: PowerTwin & Energy Intelligence
import { useState, useEffect } from 'react';
import { Battery, Zap, Activity, Gauge, Flame, SunMedium, ArrowUpRight, RefreshCw } from 'lucide-react';
import type { LanguageCode } from '../../types';
import { eventEngine } from '../../core/events/eventEngine';

interface PowerTwinProps {
  currentLang: LanguageCode;
}

export function PowerTwin({}: PowerTwinProps) {
  const [solarOutputKw, setSolarOutputKw] = useState<number>(3.84);
  const [batterySoc, setBatterySoc] = useState<number>(86);
  const [gridVoltage, setGridVoltage] = useState<number>(228);
  const [activeLoadKw, setActiveLoadKw] = useState<number>(2.42);
  const [generatorStatus, setGeneratorStatus] = useState<'standby' | 'running' | 'offline'>('standby');
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Live telemetry pulse simulation
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setSolarOutputKw((prev) => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(2));
      setActiveLoadKw((prev) => +(prev + (Math.random() * 0.15 - 0.07)).toFixed(2));
      setGridVoltage(Math.round(226 + Math.random() * 5));
      setBatterySoc((prev) => Math.min(100, Math.max(20, prev + (Math.random() > 0.5 ? 1 : 0))));
    }, 3000);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const triggerGeneratorStart = () => {
    setGeneratorStatus('running');
    eventEngine.emit({
      type: 'DEVICE_COMMAND',
      source: 'Module 11: PowerTwin',
      objectId: 'gen_cummins_01',
      description: 'Manual remote start dispatched to Cummins 15kVA Diesel Generator',
      confidence: 1.0,
      metadata: { command: 'START_PHASE_1' },
    });
  };

  const triggerGeneratorStop = () => {
    setGeneratorStatus('standby');
    eventEngine.emit({
      type: 'DEVICE_COMMAND',
      source: 'Module 11: PowerTwin',
      objectId: 'gen_cummins_01',
      description: 'Generator switched back to Automated Standby Monitoring',
      confidence: 1.0,
      metadata: { command: 'STANDBY' },
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* PowerTwin Header */}
      <div
        className="glass-panel"
        style={{
          padding: '28px 32px',
          borderRadius: '28px',
          background: 'linear-gradient(135deg, rgba(38,34,98,0.7) 0%, rgba(16,76,100,0.5) 50%, rgba(241,102,35,0.2) 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-cyan">MODULE 11</span>
            <span className="badge badge-emerald">LIVE TELEMETRY</span>
            <span className="badge badge-amber">GRID AWARE</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
            PowerTwin — Microgrid & Inverter Digital Twin
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '640px' }}>
            Real-time telemetry, load balancing, and automated power management across solar inverters, lithium batteries, public grid phases, and generators.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className="btn-secondary"
            style={{ borderRadius: '16px' }}
          >
            <RefreshCw size={14} className={isSimulating ? 'animate-spin' : ''} />
            {isSimulating ? 'Live Telemetry Active' : 'Telemetry Paused'}
          </button>
        </div>
      </div>

      {/* Main Power Gauges Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
        {/* Solar Generation */}
        <div
          className="glass-panel"
          style={{
            padding: '24px',
            borderRadius: '24px',
            background: 'linear-gradient(145deg, rgba(38,34,98,0.4) 0%, rgba(241,102,35,0.15) 100%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-apricot)', letterSpacing: '0.5px' }}>
              SOLAR PV ARRAY
            </span>
            <SunMedium size={20} color="var(--color-sunset)" />
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
            {solarOutputKw} <span style={{ fontSize: '16px', color: 'var(--color-apricot)' }}>kW</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-blush)', marginTop: 'auto' }}>
            <ArrowUpRight size={14} color="var(--color-sunset)" />
            <span>12x 450W Monocrystalline Panels</span>
          </div>
        </div>

        {/* Battery State of Charge */}
        <div
          className="glass-panel"
          style={{
            padding: '24px',
            borderRadius: '24px',
            background: 'linear-gradient(145deg, rgba(38,34,98,0.4) 0%, rgba(16,76,100,0.2) 100%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#10B981', letterSpacing: '0.5px' }}>
              LITHIUM STORAGE (LiFePO4)
            </span>
            <Battery size={20} color="#10B981" />
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
            {batterySoc}% <span style={{ fontSize: '14px', color: '#10B981' }}>Optimal</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden', marginTop: '4px' }}>
            <div
              style={{
                width: `${batterySoc}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #104C64, #10B981)',
                borderRadius: '4px',
              }}
            />
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Est. Runtime: 9 hrs 40 mins at current load
          </span>
        </div>

        {/* Active Facility Load */}
        <div
          className="glass-panel"
          style={{
            padding: '24px',
            borderRadius: '24px',
            background: 'linear-gradient(145deg, rgba(38,34,98,0.4) 0%, rgba(66,22,75,0.25) 100%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-blush)', letterSpacing: '0.5px' }}>
              FACILITY CONSUMPTION
            </span>
            <Activity size={20} color="var(--color-sunset)" />
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
            {activeLoadKw} <span style={{ fontSize: '16px', color: 'var(--color-blush)' }}>kW</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-blush)', marginTop: 'auto' }}>
            <span>Net Surplus: +{(solarOutputKw - activeLoadKw).toFixed(2)} kW charging battery</span>
          </div>
        </div>

        {/* Public Grid Voltage */}
        <div
          className="glass-panel"
          style={{
            padding: '24px',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
              GRID HEALTH & PHASE
            </span>
            <Gauge size={20} color="#38BDF8" />
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
            {gridVoltage} <span style={{ fontSize: '16px', color: '#38BDF8' }}>VAC</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#38BDF8', marginTop: 'auto' }}>
            <span>Phase 1 Stable • 50.1 Hz</span>
          </div>
        </div>
      </div>

      {/* Generator Remote Management & Grid Fallback Section */}
      <div
        className="glass-panel"
        style={{
          padding: '28px',
          borderRadius: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: generatorStatus === 'running' ? 'linear-gradient(135deg, #F16623, #B6410F)' : 'rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            <Flame size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Backup Diesel Generator (Cummins 15kVA Silent Series)
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Fuel Level: 84% • Last Autotest: 3 days ago • ATS Controller: Smart Linked
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: generatorStatus === 'running' ? 'rgba(241, 102, 35, 0.2)' : 'rgba(16, 76, 100, 0.3)',
              color: generatorStatus === 'running' ? 'var(--color-sunset)' : '#38BDF8',
              border: `1px solid ${generatorStatus === 'running' ? 'var(--color-sunset)' : '#38BDF8'}`,
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            STATUS: {generatorStatus.toUpperCase()}
          </span>

          {generatorStatus === 'running' ? (
            <button
              onClick={triggerGeneratorStop}
              className="btn-secondary"
              style={{ borderRadius: '14px', color: '#F43F5E', borderColor: '#F43F5E' }}
            >
              Stop Generator
            </button>
          ) : (
            <button
              onClick={triggerGeneratorStart}
              className="btn-primary"
              style={{ borderRadius: '14px' }}
            >
              <Zap size={14} />
              Manual Start ATS
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
