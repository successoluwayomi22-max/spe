import type { FC } from 'react';
import type { ActiveTab } from '../../types';

interface ModulesRoadmapProps {
  onSelectModule: (tab: ActiveTab) => void;
}

interface ModuleSpec {
  num: string;
  name: string;
  category: 'personal' | 'physical' | 'equipment' | 'enterprise';
  desc: string;
  status: 'mvp' | 'v2' | 'architecture';
  tab?: ActiveTab;
}

const ALL_40_MODULES: ModuleSpec[] = [
  // Personal Intelligence
  { num: '01', name: 'Reality Scanner', category: 'personal', desc: 'Camera input and AI to identify and explain objects, text, and physical environments.', status: 'mvp', tab: 'scanner' },
  { num: '02', name: 'Memory House', category: 'personal', desc: 'Private visual memory of where permitted physical objects were last observed.', status: 'v2' },
  { num: '03', name: 'Life Archive', category: 'personal', desc: 'Organize permitted documents, receipts, and records into a searchable knowledge system.', status: 'v2' },
  { num: '04', name: 'Personal Automation', category: 'personal', desc: 'Create safe automated workflows, sensor triggers, and reminders.', status: 'v2' },
  { num: '05', name: 'AI Skill Twin', category: 'personal', desc: 'Builds a verified skills and engineering profile based on provided achievements.', status: 'v2' },
  { num: '06', name: 'AI Life Planner', category: 'personal', desc: 'Converts long-term goals into actionable schedules, milestones, and tasks.', status: 'v2' },
  { num: '07', name: 'Decision Simulator', category: 'personal', desc: 'Compares real-world decisions using transparent mathematical assumptions.', status: 'architecture' },
  { num: '08', name: 'Personal Knowledge Graph', category: 'personal', desc: 'Connects people, projects, objects, documents, and locations.', status: 'architecture' },
  { num: '09', name: 'AI Memory Search', category: 'personal', desc: 'Natural language search and reasoning across your permitted physical world data.', status: 'mvp', tab: 'memory' },
  { num: '10', name: 'Digital Self', category: 'personal', desc: 'Personalized AI representative assistant (strictly identified as AI).', status: 'architecture' },

  // Physical World
  { num: '11', name: 'PowerTwin', category: 'physical', desc: 'Analyze electricity usage, solar telemetry, and connected device anomalies.', status: 'v2' },
  { num: '12', name: 'Water Brain', category: 'physical', desc: 'Monitor water consumption and acoustic detection of abnormal leaks.', status: 'architecture' },
  { num: '13', name: 'Flood Predictor', category: 'physical', desc: 'Combine sensor, weather, and topography data to estimate localized flood risks.', status: 'architecture' },
  { num: '14', name: 'Waste Intelligence', category: 'physical', desc: 'Classify materials and provide circular disposal/recycling guidance.', status: 'architecture' },
  { num: '15', name: 'City Pulse', category: 'physical', desc: 'Aggregate anonymized infrastructure and environmental telemetry.', status: 'architecture' },
  { num: '16', name: 'Road Health', category: 'physical', desc: 'Community and sensor reporting of potholes and road infrastructure degradation.', status: 'architecture' },
  { num: '17', name: 'Noise Map', category: 'physical', desc: 'Aggregate privacy-preserving environmental acoustic measurements.', status: 'architecture' },
  { num: '18', name: 'Facility Monitor', category: 'physical', desc: 'Track reported conditions and operational uptime of public facilities.', status: 'architecture' },
  { num: '19', name: 'Problem Bounty', category: 'physical', desc: 'Publish verified community issues with backed solution funding.', status: 'architecture' },
  { num: '20', name: 'Community Resource Map', category: 'physical', desc: 'Geospatial mapping of charging points, water points, and emergency clinics.', status: 'architecture' },

  // Objects, Repair & Equipment
  { num: '21', name: 'Object Passport', category: 'equipment', desc: 'Digital identity, history, warranty, and cryptographic SHA-256 proofs.', status: 'mvp', tab: 'passport' },
  { num: '22', name: 'TrustScore', category: 'equipment', desc: 'Transparent reliability and verification index based on audit evidence.', status: 'v2' },
  { num: '23', name: 'RepairVision', category: 'equipment', desc: 'Camera/AI assistance to identify equipment problems, safety bounds, and protocols.', status: 'mvp', tab: 'repair' },
  { num: '24', name: 'Car Health', category: 'equipment', desc: 'Organize vehicle observations, OBD telemetry, and maintenance forecasts.', status: 'v2' },
  { num: '25', name: 'ToolChain', category: 'equipment', desc: 'Track industrial equipment, custody lending, returns, and calibration logs.', status: 'v2' },
  { num: '26', name: 'Invisible Inventory', category: 'equipment', desc: 'Computer vision and optical shelf signals for automatic stock management.', status: 'architecture' },
  { num: '27', name: 'Construction Guardian', category: 'equipment', desc: 'Compare physical construction site progress against architectural plans.', status: 'architecture' },
  { num: '28', name: 'Receipt DNA', category: 'equipment', desc: 'Scan receipts, extract structured itemization, and link warranties to passports.', status: 'mvp', tab: 'receipt' },
  { num: '29', name: 'ClinicFlow', category: 'equipment', desc: 'Administrative workflow, scheduling, and queue tools for healthcare facilities.', status: 'architecture' },
  { num: '30', name: 'Local Knowledge Engine', category: 'equipment', desc: 'Verified, locally relevant information using trusted community contributors.', status: 'architecture' },

  // Advanced Vision & Enterprise
  { num: '31', name: 'AR Repair Overlay', category: 'enterprise', desc: 'Spatial visual guidance markers projected over physical equipment.', status: 'architecture' },
  { num: '32', name: 'Instant Measure', category: 'enterprise', desc: 'Spatial dimensions and volume estimation using supported device camera bounds.', status: 'v2' },
  { num: '33', name: 'Visual Change Detector', category: 'enterprise', desc: 'Compare historical images over time to identify structural shifts or cracks.', status: 'architecture' },
  { num: '34', name: 'Document Recovery', category: 'enterprise', desc: 'Enhance contrast and readability of degraded paper records and technical schematics.', status: 'v2' },
  { num: '35', name: 'Environment Monitor', category: 'enterprise', desc: 'Analyze permitted ambient environmental sensors (CO2, Temp, Humidity).', status: 'v2' },
  { num: '36', name: 'AI Shop Manager', category: 'enterprise', desc: 'Assist small businesses with inventory, POS insights, and re-order triggers.', status: 'v2' },
  { num: '37', name: 'Business Digital Twin', category: 'enterprise', desc: 'Simulate business operations and identify logistical bottlenecks.', status: 'architecture' },
  { num: '38', name: 'Predictive Maintenance', category: 'enterprise', desc: 'Telemetry analysis to estimate mean time between failures for machines.', status: 'v2' },
  { num: '39', name: 'AI Procurement', category: 'enterprise', desc: 'Benchmark suppliers, RFQs, and historical parts pricing.', status: 'architecture' },
  { num: '40', name: 'Product Authenticity', category: 'enterprise', desc: 'Cryptographic proofs and physical identifiers to detect counterfeit goods.', status: 'architecture' },
];

export const ModulesRoadmap: FC<ModulesRoadmapProps> = ({ onSelectModule }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge badge-cyan">SYSTEM ARCHITECTURE</span>
          <span className="badge badge-violet">40 MODULE TAXONOMY</span>
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>
          The 40 XERXES Modules Roadmap
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          One unified intelligent operating layer across personal intelligence, physical infrastructure, equipment repair, and enterprise operations.
        </p>
      </div>

      {/* Domain Sections */}
      {[
        { title: 'Personal Intelligence (01 - 10)', category: 'personal', color: 'var(--accent-cyan)' },
        { title: 'Physical World & Infrastructure (11 - 20)', category: 'physical', color: 'var(--accent-emerald)' },
        { title: 'Objects, Repair & Equipment (21 - 30)', category: 'equipment', color: 'var(--accent-amber)' },
        { title: 'Advanced Vision & Enterprise (31 - 40)', category: 'enterprise', color: 'var(--accent-violet)' },
      ].map((domain) => {
        const domainModules = ALL_40_MODULES.filter((m) => m.category === domain.category);
        return (
          <div key={domain.category} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: domain.color, borderBottom: '1px solid var(--border-subtle)', paddingBottom: '6px' }}>
              {domain.title}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
              {domainModules.map((m) => {
                const isMvp = m.status === 'mvp';
                return (
                  <div
                    key={m.num}
                    onClick={() => {
                      if (m.tab) onSelectModule(m.tab);
                    }}
                    className="glass-panel"
                    style={{
                      padding: '16px',
                      cursor: isMvp ? 'pointer' : 'default',
                      borderColor: isMvp ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                      background: isMvp ? 'var(--bg-card-hover)' : 'rgba(255,255,255,0.02)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)' }}>
                        #{m.num}
                      </span>
                      {isMvp ? (
                        <span className="badge badge-emerald">LIVE MVP &rarr;</span>
                      ) : m.status === 'v2' ? (
                        <span className="badge badge-violet">PHASE 2</span>
                      ) : (
                        <span className="badge badge-cyan" style={{ opacity: 0.6 }}>SPECIFIED</span>
                      )}
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {m.name}
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {m.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
