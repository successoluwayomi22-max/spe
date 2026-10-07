import { useState, useEffect, type FC } from 'react';
import { Wrench, ShieldAlert, CheckCircle, Sparkles } from 'lucide-react';
import type { RepairDiagnostic, LanguageCode, CurrencyCode } from '../../types';
import { db } from '../../core/db/storage';
import { aiGateway } from '../../core/ai/gateway';
import { eventEngine } from '../../core/events/eventEngine';
import { formatCurrency, convertCurrency } from '../../core/currency/currencyService';
import { TRANSLATIONS } from '../../core/i18n/translations';

interface RepairVisionProps {
  currentLang: LanguageCode;
  currentCurrency: CurrencyCode;
  prefillObject?: { name: string; symptom?: string } | null;
}

export const RepairVision: FC<RepairVisionProps> = ({
  currentLang,
  currentCurrency,
  prefillObject,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [repairs, setRepairs] = useState<RepairDiagnostic[]>([]);
  const [selectedRepair, setSelectedRepair] = useState<RepairDiagnostic | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  // Form input
  const [targetName, setTargetName] = useState('Honda EU30is Inverter Generator');
  const [symptomText, setSymptomText] = useState('Carburetor hunting at idle and sudden stall under 1.5kW load');

  useEffect(() => {
    loadRepairs();
  }, []);

  useEffect(() => {
    if (prefillObject) {
      setTargetName(prefillObject.name);
      if (prefillObject.symptom) setSymptomText(prefillObject.symptom);
      handleRunDiagnosis(prefillObject.name, prefillObject.symptom || 'Visual defect observed during Reality Scan');
    }
  }, [prefillObject]);

  const loadRepairs = async () => {
    const list = await db.getRepairs();
    setRepairs(list);
    if (list.length > 0 && !selectedRepair) {
      setSelectedRepair(list[0]);
    }
  };

  const handleRunDiagnosis = async (nameToUse?: string, symptomToUse?: string) => {
    const objName = nameToUse || targetName;
    const symptom = symptomToUse || symptomText;
    setIsDiagnosing(true);

    try {
      const diagnostic = await aiGateway.diagnoseDefect(objName, symptom);
      await db.saveRepair(diagnostic);
      await eventEngine.emit({
        type: 'REPAIR_DIAGNOSED',
        source: 'RepairVision (23)',
        description: `Diagnosed ${diagnostic.objectName}: ${diagnostic.defectType.toUpperCase()} defect (Severity: ${diagnostic.severity.toUpperCase()})`,
        confidence: diagnostic.confidence,
        metadata: { diagnosticId: diagnostic.id, severity: diagnostic.severity },
      });

      await loadRepairs();
      setSelectedRepair(diagnostic);
    } catch (e) {
      console.error('Diagnosis failure:', e);
    } finally {
      setIsDiagnosing(false);
    }
  };

  const handleMarkResolved = async (repair: RepairDiagnostic) => {
    const updated: RepairDiagnostic = { ...repair, status: 'resolved' };
    await db.saveRepair(updated);
    await eventEngine.emit({
      type: 'REPAIR_COMPLETED',
      source: 'RepairVision (23)',
      description: `Repair resolved for ${repair.objectName}. System restored to normal parameters.`,
      confidence: 1.0,
    });
    await loadRepairs();
    setSelectedRepair(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-cyan">MODULE 23</span>
            <span className="badge badge-emerald">ACTIVE MVP</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>{t.repair.title}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{t.repair.subtitle}</p>
        </div>
      </div>

      {/* Diagnostics Launcher Card */}
      <div className="glass-panel" style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(14,19,34,0.8), rgba(24,34,53,0.6))' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="var(--accent-cyan)" />
          Initiate New Optical or Symptom Diagnostic
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
              Equipment / Machine Name
            </label>
            <input
              type="text"
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '14px' }}
              placeholder="e.g. Felicity Solar Inverter or Honda EU30is"
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
              Observed Symptom, Noise, or Optical Fault
            </label>
            <input
              type="text"
              value={symptomText}
              onChange={(e) => setSymptomText(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '14px' }}
              placeholder="e.g. Overheating smell, voltage drop, irregular engine speed"
            />
          </div>
          <button
            onClick={() => handleRunDiagnosis()}
            disabled={isDiagnosing}
            className="btn-primary"
            style={{ height: '42px' }}
          >
            <Wrench size={16} />
            {isDiagnosing ? 'Analyzing Fault Tree...' : t.repair.diagnoseDefect}
          </button>
        </div>
      </div>

      {/* Main Split: History & Detailed Diagnostic Protocol */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Past Diagnostics List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Logged Diagnostic Protocols ({repairs.length})
          </span>

          {repairs.map((rep) => {
            const isSelected = selectedRepair?.id === rep.id;
            return (
              <div
                key={rep.id}
                onClick={() => setSelectedRepair(rep)}
                className="glass-panel"
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                  backgroundColor: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {rep.objectName}
                  </span>
                  <span
                    className={`badge ${
                      rep.severity === 'critical' || rep.severity === 'high'
                        ? 'badge-rose'
                        : rep.severity === 'medium'
                        ? 'badge-amber'
                        : 'badge-emerald'
                    }`}
                  >
                    {rep.severity} risk
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {rep.symptom}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>{new Date(rep.timestamp).toLocaleDateString()}</span>
                  <span style={{ color: rep.status === 'resolved' ? 'var(--accent-emerald)' : 'var(--accent-amber)', fontWeight: 600 }}>
                    {rep.status.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Diagnostic Protocol Dossier */}
        {selectedRepair && (
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="badge badge-violet" style={{ marginBottom: '6px' }}>
                  {selectedRepair.defectType.toUpperCase()} DEFECT
                </span>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {selectedRepair.objectName}
                </h3>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Reported Symptom: <em>"{selectedRepair.symptom}"</em>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estimated Parts/Labor</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                  {formatCurrency(
                    convertCurrency(selectedRepair.estimatedCost.amount, selectedRepair.estimatedCost.currency, currentCurrency).convertedAmount,
                    currentCurrency
                  )}
                </div>
              </div>
            </div>

            {/* Safety Caution Banner */}
            <div
              style={{
                padding: '14px 16px',
                background: 'rgba(244, 63, 94, 0.1)',
                border: '1px solid var(--accent-rose)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
              }}
            >
              <ShieldAlert size={22} color="var(--accent-rose)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-rose)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {t.repair.safetyCaution}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)', marginTop: '2px', lineHeight: 1.4 }}>
                  {selectedRepair.safetyWarning}
                </div>
              </div>
            </div>

            {/* Step-by-Step Remediation Protocol */}
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
                {t.repair.steps}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedRepair.stepByStepGuide.map((step, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      lineHeight: 1.4,
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 700, minWidth: '20px' }}>
                      {idx + 1}.
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Tools */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {t.repair.toolsNeeded}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedRepair.toolsRequired.map((tool) => (
                  <span
                    key={tool}
                    style={{
                      padding: '4px 10px',
                      fontSize: '12px',
                      background: 'rgba(0, 240, 255, 0.08)',
                      border: '1px solid rgba(0, 240, 255, 0.25)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--accent-cyan)',
                    }}
                  >
                    &bull; {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              {selectedRepair.status !== 'resolved' ? (
                <button onClick={() => handleMarkResolved(selectedRepair)} className="btn-primary">
                  <CheckCircle size={16} />
                  Mark Repair Protocol Resolved
                </button>
              ) : (
                <span className="badge badge-emerald" style={{ padding: '8px 16px', fontSize: '13px' }}>
                  <CheckCircle size={16} />
                  Resolved & Certified in Event Ledger
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
