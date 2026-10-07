// XERXES Module 04: Personal & Infrastructure Automation Engine
import { useState } from 'react';
import { Play, Power, Zap, Plus, CheckCircle2, History } from 'lucide-react';
import type { LanguageCode } from '../../types';
import { eventEngine } from '../../core/events/eventEngine';

interface AutomationRulesProps {
  currentLang: LanguageCode;
  onNavigateToScanner?: () => void;
  onNavigateToPassport?: () => void;
}

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  enabled: boolean;
  category: 'safety' | 'energy' | 'maintenance' | 'commerce';
  lastTriggered?: string;
  executionCount: number;
}

const INITIAL_RULES: AutomationRule[] = [
  {
    id: 'rule_inv_01',
    name: 'Critical Inverter Battery Protection',
    trigger: 'PowerTwin Battery State of Charge < 20%',
    condition: 'Grid status == Offline AND Diesel generator == Standby',
    action: 'Auto-start Generator Phase 1 + Send Emergency Mobile Alert',
    enabled: true,
    category: 'energy',
    lastTriggered: '14 minutes ago',
    executionCount: 12,
  },
  {
    id: 'rule_scan_02',
    name: 'Instant RealityScan Passport Registration',
    trigger: 'RealityScanner completes scan with Confidence > 92%',
    condition: 'Scanned item does not already match an active Serial Hash',
    action: 'Generate SHA-256 Digital Passport Dossier + Start Warranty Clock',
    enabled: true,
    category: 'commerce',
    lastTriggered: '2 hours ago',
    executionCount: 47,
  },
  {
    id: 'rule_defect_03',
    name: 'High-Severity Defect Lockdown',
    trigger: 'RepairVision detects severity == "CRITICAL"',
    condition: 'Device voltage > 240V or thermal anomaly detected',
    action: 'Broadcast audible warning + Auto-generate technician work order',
    enabled: true,
    category: 'safety',
    lastTriggered: 'Yesterday at 16:42',
    executionCount: 3,
  },
  {
    id: 'rule_receipt_04',
    name: 'Receipt DNA Expense & Warranty Auto-Sync',
    trigger: 'Receipt processed with Total > ₦25,000',
    condition: 'Line item matches warranty category (Electronics / Appliances)',
    action: 'Link purchase invoice to Object Passport + Track VAT ledger',
    enabled: true,
    category: 'commerce',
    lastTriggered: '3 days ago',
    executionCount: 88,
  },
  {
    id: 'rule_preventive_05',
    name: 'Solar Panel Dust & Output Degrade Alert',
    trigger: 'Solar Array irradiance delta > 25% drop over 48 hours',
    condition: 'Weather clear AND ambient temperature < 34°C',
    action: 'Queue preventive maintenance cleaning task for Tunde Adeleke',
    enabled: false,
    category: 'maintenance',
    lastTriggered: 'Never',
    executionCount: 0,
  },
];

export function AutomationRules({}: AutomationRulesProps) {
  const [rules, setRules] = useState<AutomationRule[]>(INITIAL_RULES);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [testLog, setTestLog] = useState<string | null>(null);

  const toggleRule = (ruleId: string) => {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id === ruleId) {
          const nextState = !r.enabled;
          eventEngine.emit({
            type: 'RULE_TRIGGERED',
            source: 'Module 04: Automation Rules Engine',
            description: `Automation rule "${r.name}" turned ${nextState ? 'ON' : 'OFF'}`,
            confidence: 1.0,
            objectId: ruleId,
            metadata: { ruleId, nextState },
          });
          return { ...r, enabled: nextState };
        }
        return r;
      })
    );
  };

  const executeRuleTest = (rule: AutomationRule) => {
    setTestLog(`Executing trigger simulation for "${rule.name}"...`);
    setTimeout(() => {
      setTestLog(`✓ Trigger validated. Action dispatched: [${rule.action}]`);
      eventEngine.emit({
        type: 'RULE_TRIGGERED',
        source: 'Module 04: Automation Rules Engine',
        description: `Executed test run for rule: ${rule.name}`,
        confidence: 0.98,
        objectId: rule.id,
        metadata: { rule },
      });
      setRules((prev) =>
        prev.map((r) => (r.id === rule.id ? { ...r, executionCount: r.executionCount + 1, lastTriggered: 'Just now' } : r))
      );
      setTimeout(() => setTestLog(null), 4000);
    }, 700);
  };

  const filteredRules = activeCategory === 'all' ? rules : rules.filter((r) => r.category === activeCategory);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '28px 32px',
          borderRadius: '28px',
          background: 'linear-gradient(135deg, rgba(38,34,98,0.6) 0%, rgba(66,22,75,0.45) 50%, rgba(241,102,35,0.2) 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-cyan">MODULE 04</span>
            <span className="badge badge-violet">NEURAL EVENT DRIVEN</span>
            <span className="badge badge-emerald">ACTIVE DISPATCHER</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
            Autonomous Automation & Smart Rules Engine
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '650px' }}>
            Program conditional IF / THEN logic across your sensory mesh. Automate actions between cameras, IoT telemetry, maintenance tickets, and cryptographic ledgers.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              const name = prompt('Enter new automation rule name:');
              if (name) {
                const newRule: AutomationRule = {
                  id: `rule_custom_${Date.now()}`,
                  name,
                  trigger: 'Custom Sensory Mesh Sensor Trigger',
                  condition: 'Value threshold exceeded',
                  action: 'Dispatch notification & log event to immutable ledger',
                  enabled: true,
                  category: 'maintenance',
                  lastTriggered: 'Just created',
                  executionCount: 0,
                };
                setRules([newRule, ...rules]);
              }
            }}
            className="btn-primary"
            style={{ borderRadius: '16px' }}
          >
            <Plus size={16} />
            Create Automation Rule
          </button>
        </div>
      </div>

      {testLog && (
        <div
          style={{
            padding: '14px 20px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(16, 76, 100, 0.6), rgba(38, 34, 98, 0.7))',
            border: '1px solid rgba(241, 102, 35, 0.4)',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          <CheckCircle2 size={16} color="var(--color-sunset)" />
          <span>{testLog}</span>
        </div>
      )}

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {[
          { id: 'all', label: 'All Rules' },
          { id: 'energy', label: '⚡ Energy & Power' },
          { id: 'commerce', label: '🛡️ Passports & Receipts' },
          { id: 'safety', label: '🚨 Safety & Diagnostics' },
          { id: 'maintenance', label: '🔧 Preventive Maintenance' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              background: activeCategory === cat.id ? 'linear-gradient(135deg, #262262, #F16623)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${activeCategory === cat.id ? 'var(--color-sunset)' : 'var(--border-subtle)'}`,
              color: activeCategory === cat.id ? '#FFFFFF' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Rules Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="glass-panel"
            style={{
              padding: '24px',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              border: rule.enabled ? '1px solid rgba(241, 102, 35, 0.35)' : '1px solid var(--border-subtle)',
              background: rule.enabled
                ? 'linear-gradient(145deg, rgba(38,34,98,0.45) 0%, rgba(66,22,75,0.3) 100%)'
                : 'rgba(26,24,54,0.3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    background: rule.enabled ? 'linear-gradient(135deg, #262262, #F16623)' : 'rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                  }}
                >
                  <Zap size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{rule.name}</h4>
                  <span style={{ fontSize: '11px', color: 'var(--color-blush)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {rule.category}
                  </span>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => toggleRule(rule.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  background: rule.enabled ? 'rgba(241, 102, 35, 0.2)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${rule.enabled ? 'var(--color-sunset)' : 'var(--border-subtle)'}`,
                  color: rule.enabled ? 'var(--color-sunset)' : 'var(--text-muted)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <Power size={13} />
                {rule.enabled ? 'ACTIVE' : 'PAUSED'}
              </button>
            </div>

            {/* Condition Logic Blocks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(224,180,178,0.1)',
                }}
              >
                <span style={{ color: 'var(--color-sunset)', fontWeight: 700, marginRight: '6px' }}>IF:</span>
                <span style={{ color: 'var(--text-primary)' }}>{rule.trigger}</span>
              </div>

              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(224,180,178,0.1)',
                }}
              >
                <span style={{ color: 'var(--color-apricot)', fontWeight: 700, marginRight: '6px' }}>AND:</span>
                <span style={{ color: 'var(--text-secondary)' }}>{rule.condition}</span>
              </div>

              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(38,34,98,0.5), rgba(66,22,75,0.5))',
                  border: '1px solid rgba(241, 102, 35, 0.25)',
                }}
              >
                <span style={{ color: '#00F0FF', fontWeight: 700, marginRight: '6px' }}>THEN:</span>
                <span style={{ color: '#FFFFFF', fontWeight: 500 }}>{rule.action}</span>
              </div>
            </div>

            {/* Bottom Meta & Test Trigger Button */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '12px',
                color: 'var(--text-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <History size={13} />
                <span>Runs: {rule.executionCount} • Last: {rule.lastTriggered}</span>
              </div>

              <button
                onClick={() => executeRuleTest(rule)}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '11px', borderRadius: '12px' }}
                title="Simulate rule trigger event"
              >
                <Play size={12} />
                Simulate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
