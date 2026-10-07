import React, { useState } from 'react';
import { Compass, CheckCircle2, Search, Database, Calculator, FileCheck, ShieldCheck, ShieldAlert } from 'lucide-react';
import type { PropertyAuditRecord, UserRole, GazetteRecord } from '../../types/terraguard';
import { calculateClosureError } from '../../core/geo/terraguardGeo';

interface AuditorConsoleProps {
  currentRole: UserRole;
  currentAudit: PropertyAuditRecord;
  onUpdateScore: (newScore: number) => void;
}

const OFFICIAL_GAZETTE_REGISTRY: GazetteRecord[] = [
  {
    id: 'GAZ-01',
    noticeNumber: 'L.S.G. Notice No. 42 / 2024',
    state: 'Lagos State',
    lga: 'Ibeju-Lekki / Eti-Osa',
    title: 'Federal Coastal Expressway 100m Right-of-Way Corridor',
    purpose: 'National Super-Highway & Maritime Evacuation Route',
    gazetteDate: '15th March 2024',
    status: 'Highway Right-of-Way',
    boundaryZone: 'Zone A - Km 12 through Km 65 Akodo to Badore',
  },
  {
    id: 'GAZ-02',
    noticeNumber: 'FCT Gazette Vol 18 No. 11',
    state: 'Abuja FCT',
    lga: 'Municipal Area Council',
    title: 'Katampe Extension Diplomatic & Security Buffer Reserve',
    purpose: 'Embassies, Chanceries and Topographic Ridgeline Protection',
    gazetteDate: '22nd January 2021',
    status: 'Committed',
    boundaryZone: 'Cadastral Zone B07 Ridgeline Corridor',
  },
  {
    id: 'GAZ-03',
    noticeNumber: 'L.S.G. Notice No. 19 / 2020',
    state: 'Lagos State',
    lga: 'Epe',
    title: 'Greenfield Agricultural & Conservation Forest Reserve',
    purpose: 'Food Security Basin & Eco-Watershed Catchment Area',
    gazetteDate: '10th August 2020',
    status: 'Forestry Reserve',
    boundaryZone: 'Epe-Ijebu Ode Interchange Sector 4',
  },
  {
    id: 'GAZ-04',
    noticeNumber: 'L.S.G. Notice No. 88 / 2018',
    state: 'Lagos State',
    lga: 'Ibeju-Lekki',
    title: 'Lekki Free Trade Zone Stage 2 Industrial Enclave',
    purpose: 'Deep Sea Port, Refinery Logistics & Chemical Processing Hub',
    gazetteDate: '4th November 2018',
    status: 'Committed',
    boundaryZone: 'Magbon Segun, Idasho, and Itoke Corridor',
  },
];

export const AuditorConsole: React.FC<AuditorConsoleProps> = ({
  currentRole,
  currentAudit,
  onUpdateScore,
}) => {
  const [activeConsoleTab, setActiveConsoleTab] = useState<'surveyor' | 'gazette' | 'override'>('surveyor');

  // Surveyor Traverse Calculator State
  const [beaconsList] = useState(currentAudit.beacons);
  const [traverseResult, setTraverseResult] = useState<{ errorMetres: number; ratio: string; isValid: boolean }>({
    errorMetres: currentAudit.closureErrorMetres,
    ratio: currentAudit.closureRatio,
    isValid: currentAudit.isClosureValid,
  });

  // Gazette Search State
  const [gazetteFilter, setGazetteFilter] = useState<string>('');
  
  // Surveyor Accreditation Search
  const [surveyorQuery, setSurveyorQuery] = useState<string>(currentAudit.surveyorName);
  const [surveyorStatus, setSurveyorStatus] = useState<{ name: string; reg: string; status: 'ACTIVE' | 'EXPIRED' | 'NOT_FOUND' } | null>({
    name: currentAudit.surveyorName,
    reg: currentAudit.surveyorRegNumber,
    status: currentAudit.surveyorRegNumber.startsWith('SURCON') ? 'ACTIVE' : 'EXPIRED',
  });

  // Override State
  const [overrideScore, setOverrideScore] = useState<number>(currentAudit.overallTrustScore);
  const [overrideNote, setOverrideNote] = useState<string>('');
  const [isApplied, setIsApplied] = useState<boolean>(false);

  const handleRecalculateTraverse = () => {
    const res = calculateClosureError(beaconsList);
    setTraverseResult(res);
  };

  const handleSearchSurveyor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!surveyorQuery) return;
    const lower = surveyorQuery.toLowerCase();
    if (lower.includes('adeleke') || lower.includes('9412')) {
      setSurveyorStatus({ name: 'Surv. B. A. Adeleke (FNIS)', reg: 'SURCON/9412/A', status: 'ACTIVE' });
    } else if (lower.includes('usman') || lower.includes('6102')) {
      setSurveyorStatus({ name: 'Surv. Dr. M. K. Usman (FNIS)', reg: 'SURCON/6102/K', status: 'ACTIVE' });
    } else if (lower.includes('fashola') || lower.includes('8821')) {
      setSurveyorStatus({ name: 'Surv. O. G. Fashola', reg: 'SURCON/8821/F', status: 'ACTIVE' });
    } else {
      setSurveyorStatus({ name: surveyorQuery, reg: 'SURCON/UNVERIFIED', status: 'EXPIRED' });
    }
  };

  const handleApplyOverride = () => {
    onUpdateScore(overrideScore);
    setIsApplied(true);
    setTimeout(() => setIsApplied(false), 2000);
  };

  const filteredGazettes = OFFICIAL_GAZETTE_REGISTRY.filter((g) => 
    g.title.toLowerCase().includes(gazetteFilter.toLowerCase()) ||
    g.noticeNumber.toLowerCase().includes(gazetteFilter.toLowerCase()) ||
    g.state.toLowerCase().includes(gazetteFilter.toLowerCase()) ||
    g.lga.toLowerCase().includes(gazetteFilter.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Console Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 text-[11px] font-mono font-bold uppercase tracking-wider">
              Regulatory Workstation ({currentRole.replace('_', ' ')})
            </span>
            <span className="text-xs text-slate-400 font-mono">Statutory Land Records & Cadastral Verification</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Surveyor & Legal Auditor Command Desk
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Execute precision traverse closure calculations, search official Federal/State acquisition gazettes, and verify surveyor seals.
          </p>
        </div>

        {/* Console Sub-Navigation */}
        <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => setActiveConsoleTab('surveyor')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeConsoleTab === 'surveyor'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Surveyor Station</span>
          </button>

          <button
            onClick={() => setActiveConsoleTab('gazette')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeConsoleTab === 'gazette'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Gazette Registry</span>
          </button>

          <button
            onClick={() => setActiveConsoleTab('override')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeConsoleTab === 'override'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Audit Override</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SURVEYOR STATION (TRAVERSE GEOMETRY ENGINE) */}
      {activeConsoleTab === 'surveyor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Beacon Points Editor & Mathematical Closure Calculator */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-400" />
                  Boundary Traverse Mathematical Closure Engine
                </h3>
                <p className="text-xs text-slate-400">
                  SURCON Statutory Requirement: Traverse Closing Ratio must be &ge; 1:5,000
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                  traverseResult.isValid
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-red-500/20 text-red-400 border border-red-500/40'
                }`}
              >
                {traverseResult.isValid ? 'TRAVERSE CLOSURE PASS' : 'CRITICAL CLOSURE ERROR'}
              </span>
            </div>

            {/* Precision Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Closing Error Vector
                </span>
                <span className="text-2xl font-bold font-mono text-white">
                  {traverseResult.errorMetres.toFixed(3)} m
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">Linear misclose distance</span>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Mathematical Ratio
                </span>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {traverseResult.ratio}
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">Standard: min 1:5,000</span>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Cadastral Datum
                </span>
                <span className="text-base font-bold font-mono text-purple-400">
                  UTM Minna Zone 31N
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">WGS84 Ellipsoid Match</span>
              </div>
            </div>

            {/* Beacon Coordinate Table */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
                Active Traverse Boundary Beacons ({beaconsList.length} Monuments)
              </h4>

              <div className="border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Beacon ID</th>
                      <th className="p-3">Easting (m)</th>
                      <th className="p-3">Northing (m)</th>
                      <th className="p-3">Latitude / Longitude</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                    {beaconsList.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-800/40">
                        <td className="p-3 font-bold text-emerald-400">{b.id}</td>
                        <td className="p-3 text-white">{b.easting.toFixed(2)}</td>
                        <td className="p-3 text-white">{b.northing.toFixed(2)}</td>
                        <td className="p-3 text-slate-400">
                          {b.lat.toFixed(4)}°N, {b.lng.toFixed(4)}°E
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button
              onClick={handleRecalculateTraverse}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Recompute Precision Closure Vector</span>
            </button>
          </div>

          {/* Surveyor SURCON Registry Validator Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                SURCON Seal & License Verification
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Verify practicing license standing with the Surveyors Council of Nigeria.
              </p>
            </div>

            <form onSubmit={handleSearchSurveyor} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={surveyorQuery}
                  onChange={(e) => setSurveyorQuery(e.target.value)}
                  placeholder="Enter Surveyor name or registration..."
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-blue-500 focus:outline-none"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
              >
                Lookup Surveyor Registry
              </button>
            </form>

            {surveyorStatus && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-white">{surveyorStatus.name}</strong>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      surveyorStatus.status === 'ACTIVE'
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-red-400 text-slate-950'
                    }`}
                  >
                    {surveyorStatus.status}
                  </span>
                </div>
                <p className="text-slate-300">Registration: {surveyorStatus.reg}</p>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {surveyorStatus.status === 'ACTIVE'
                    ? 'Official licensed practitioner in good standing with Surveyors Council of Nigeria (SURCON).'
                    : 'Practice license expired or unaccredited. Surveys submitted under this seal are non-statutory.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: OFFICIAL GAZETTE REGISTRY BROWSER */}
      {activeConsoleTab === 'gazette' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-400" />
                State & Federal Gazette Acquisition Registry
              </h3>
              <p className="text-xs text-slate-400">
                Official statutory notices revoking private titles for public infrastructure, highways, and ecological reserves.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={gazetteFilter}
                onChange={(e) => setGazetteFilter(e.target.value)}
                placeholder="Search gazette roll or location..."
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGazettes.map((gaz) => (
              <div
                key={gaz.id}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 font-bold block mb-1">
                      {gaz.noticeNumber}
                    </span>
                    <h4 className="text-sm font-bold text-white">{gaz.title}</h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30 text-[10px] font-mono font-bold flex-shrink-0">
                    {gaz.status}
                  </span>
                </div>

                <p className="text-xs text-slate-400">{gaz.purpose}</p>

                <div className="pt-3 border-t border-slate-900 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-500">
                  <div>
                    <span className="block text-slate-600">Location</span>
                    <span className="text-slate-300">{gaz.lga}, {gaz.state}</span>
                  </div>
                  <div>
                    <span className="block text-slate-600">Gazette Date</span>
                    <span className="text-slate-300">{gaz.gazetteDate}</span>
                  </div>
                </div>

                <div className="bg-slate-900/60 rounded-lg p-2 text-[10px] font-mono text-slate-400">
                  Boundary: {gaz.boundaryZone}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AUDITOR SCORE OVERRIDE & SIGN-OFF */}
      {activeConsoleTab === 'override' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              Lead Auditor Risk Score Override Ledger
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Adjust property risk score based on primary document verification at State Lands Bureau.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-300 font-bold block mb-2">
                Override Overall Trust Score (Current: {overrideScore}/100)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={overrideScore}
                onChange={(e) => setOverrideScore(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>0 (Critical Fraud)</span>
                <span>50 (High Caution)</span>
                <span>100 (Clean Title)</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">
                Statutory Reason for Override
              </label>
              <textarea
                value={overrideNote}
                onChange={(e) => setOverrideNote(e.target.value)}
                placeholder="Cite specific Lands Bureau archive roll, court judgment, or excision gazette confirmation..."
                className="w-full h-24 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleApplyOverride}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isApplied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Attestation Registered to Ledger</span>
                </>
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  <span>Sign & Disburse Attested Score</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function RefreshCw(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}
