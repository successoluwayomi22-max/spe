import { useState } from 'react';
import { Compass, Layers } from 'lucide-react';
import type { PropertyAuditRecord, BeaconPoint } from '../../types/terraguard';

interface GeoCanvasProps {
  audit: PropertyAuditRecord;
}

export const GeoCanvas: React.FC<GeoCanvasProps> = ({ audit }) => {
  const [selectedBeacon, setSelectedBeacon] = useState<BeaconPoint | null>(null);
  const [showHazardOverlay, setShowHazardOverlay] = useState<boolean>(true);

  const { beacons, isClosureValid, closureRatio, closureErrorMetres, areaSqm, acquisitionStatus, riskLevel } = audit;

  // Calculate bounding box for SVG projection
  const lats = beacons.map((b) => b.lat);
  const lngs = beacons.map((b) => b.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const latSpan = Math.max(maxLat - minLat, 0.0006);
  const lngSpan = Math.max(maxLng - minLng, 0.0006);

  // Projection helpers to 500x320 SVG viewport with 60px padding
  const width = 560;
  const height = 340;
  const padding = 65;

  const project = (lat: number, lng: number) => {
    const x = padding + ((lng - minLng) / lngSpan) * (width - 2 * padding);
    // invert Y for screen coordinates (north is up)
    const y = height - padding - ((lat - minLat) / latSpan) * (height - 2 * padding);
    return { x, y };
  };

  const pointsString = beacons
    .map((b) => {
      const p = project(b.lat, b.lng);
      return `${p.x},${p.y}`;
    })
    .join(' ');

  const isCritical = riskLevel === 'critical_fraud';
  const isSafe = riskLevel === 'safe';

  // Area in acres
  const areaAcres = (areaSqm / 4046.86).toFixed(2);
  const areaPlots = (areaSqm / 648).toFixed(1); // Standard Lagos plot ~648 sqm

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Header telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono font-bold text-emerald-400">
              Cadastral Satellite Engine
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
              WGS84 / UTM Zone 31N
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
            Geospatial Boundary Polygon & Traverse Closure
          </h3>
        </div>

        {/* Action toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHazardOverlay(!showHazardOverlay)}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              showHazardOverlay
                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {showHazardOverlay ? 'Acquisition Overlay ON' : 'Overlay OFF'}
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-[340px] bg-[#070B14] rounded-xl border border-slate-800/80 overflow-hidden flex items-center justify-center">
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* North Arrow */}
        <div className="absolute top-4 right-4 z-10 flex flex-col items-center bg-slate-900/80 border border-slate-700 px-2 py-1.5 rounded-lg shadow-lg">
          <Compass className="w-4 h-4 text-emerald-400 animate-spin-slow" />
          <span className="text-[9px] font-mono font-bold text-white mt-0.5">N</span>
        </div>

        {/* Scale Bar Indicator */}
        <div className="absolute bottom-4 left-4 z-10 bg-slate-900/80 border border-slate-700 px-2.5 py-1 rounded text-[10px] font-mono text-slate-300">
          Scale: 1 : 2,500 Metric
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          {/* Simulated Hazard Corridor if present */}
          {showHazardOverlay && isCritical && (
            <g>
              <rect
                x="0"
                y="60"
                width={width}
                height="110"
                fill="rgba(239, 68, 68, 0.15)"
                stroke="rgba(239, 68, 68, 0.45)"
                strokeDasharray="6 4"
              />
              <rect
                x="14"
                y="80"
                width="380"
                height="22"
                rx="4"
                fill="rgba(15, 23, 42, 0.85)"
                stroke="rgba(239, 68, 68, 0.4)"
              />
              <text
                x="22"
                y="95"
                fill="#f87171"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
              >
                FEDERAL HIGHWAY RIGHT-OF-WAY (RESTRICTED CORRIDOR)
              </text>
            </g>
          )}

          {/* Polygon Boundary Shape */}
          <polygon
            points={pointsString}
            fill={isCritical ? 'rgba(239, 68, 68, 0.22)' : isSafe ? 'rgba(16, 185, 129, 0.22)' : 'rgba(245, 158, 11, 0.22)'}
            stroke={isCritical ? '#ef4444' : isSafe ? '#10b981' : '#f59e0b'}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Boundary coordinate lines with dimensions */}
          {beacons.map((b, idx) => {
            const next = beacons[(idx + 1) % beacons.length];
            const p1 = project(b.lat, b.lng);
            const p2 = project(next.lat, next.lng);
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;

            return (
              <g key={`line-${idx}`}>
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={isCritical ? '#ef4444' : '#10b981'}
                  strokeWidth="2"
                />
                <circle cx={midX} cy={midY} r="3" fill="#38bdf8" />
              </g>
            );
          })}

          {/* Beacon Points */}
          {beacons.map((b) => {
            const { x, y } = project(b.lat, b.lng);
            const isSelected = selectedBeacon?.id === b.id;

            return (
              <g
                key={b.id}
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={() => setSelectedBeacon(b)}
              >
                {/* Glow ring */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? '10' : '7'}
                  fill={isCritical ? 'rgba(239,68,68,0.4)' : 'rgba(16,185,129,0.4)'}
                />
                <circle
                  cx={x}
                  cy={y}
                  r="4.5"
                  fill="#ffffff"
                  stroke={isCritical ? '#ef4444' : '#10b981'}
                  strokeWidth="2"
                />
                <rect
                  x={x + 5}
                  y={y - 18}
                  width={b.id.length * 7.5 + 8}
                  height="16"
                  rx="4"
                  fill="rgba(15, 23, 42, 0.9)"
                  stroke={isCritical ? 'rgba(239, 68, 68, 0.35)' : 'rgba(16, 185, 129, 0.35)'}
                />
                <text
                  x={x + 9}
                  y={y - 6}
                  fill="#f1f5f9"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  className="select-none"
                >
                  {b.id}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Beacon Tooltip Card */}
        {selectedBeacon && (
          <div className="absolute bottom-4 right-4 z-20 bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs font-mono max-w-xs">
            <div className="flex items-center justify-between gap-3 text-emerald-400 font-bold mb-1">
              <span>POINT: {selectedBeacon.id}</span>
              <button
                onClick={() => setSelectedBeacon(null)}
                className="text-slate-400 hover:text-white"
              >
                CLOSE
              </button>
            </div>
            <p className="text-slate-300">Easting: {selectedBeacon.easting.toFixed(2)}m E</p>
            <p className="text-slate-300">Northing: {selectedBeacon.northing.toFixed(2)}m N</p>
            <p className="text-slate-400 text-[10px]">GPS: {selectedBeacon.lat.toFixed(6)}, {selectedBeacon.lng.toFixed(6)}</p>
          </div>
        )}
      </div>

      {/* Mathematical Closure & Land Area Telemetry */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <p className="text-[10px] text-slate-400 uppercase">Calculated Area</p>
          <p className="text-sm font-bold text-white mt-0.5">{areaSqm.toLocaleString()} m²</p>
          <p className="text-[10px] text-emerald-400">{areaPlots} Plots ({areaAcres} Acres)</p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <p className="text-[10px] text-slate-400 uppercase">Traverse Closure</p>
          <p className="text-sm font-bold text-white mt-0.5">{closureRatio}</p>
          <p className={`text-[10px] font-bold ${isClosureValid ? 'text-emerald-400' : 'text-red-400'}`}>
            {isClosureValid ? 'STATUTORY COMPLIANT' : 'NON-COMPLIANT (< 1:5,000)'}
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <p className="text-[10px] text-slate-400 uppercase">Closing Vector Error</p>
          <p className="text-sm font-bold text-white mt-0.5">{closureErrorMetres} meters</p>
          <p className="text-[10px] text-slate-400">Linear discrepancy</p>
        </div>

        <div className={`p-2.5 rounded-xl border ${
          isCritical ? 'bg-red-500/10 border-red-500/30' : isSafe ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-amber-500/10 border-amber-500/30'
        }`}>
          <p className="text-[10px] uppercase font-bold text-slate-400">Acquisition Risk</p>
          <p className={`text-xs font-bold mt-0.5 truncate ${isCritical ? 'text-red-400' : isSafe ? 'text-emerald-400' : 'text-amber-400'}`}>
            {acquisitionStatus}
          </p>
          <p className="text-[10px] text-slate-400">Official Gazetted Layer</p>
        </div>
      </div>
    </div>
  );
};
