import { useState, useRef, useEffect, type FC } from 'react';
import { Camera, RefreshCw, CheckCircle2, ShieldAlert, Cpu, Sparkles, Layers, ArrowRight, Upload, FolderKanban } from 'lucide-react';
import type { ScanAnalysisResult, DetectedBoundingBox, LanguageCode } from '../../types';
import { aiGateway } from '../../core/ai/gateway';
import { eventEngine } from '../../core/events/eventEngine';
import { TRANSLATIONS } from '../../core/i18n/translations';

interface RealityScannerProps {
  currentLang: LanguageCode;
  onNavigateToPassport: (prefillData?: any) => void;
  onNavigateToRepair: (objectName: string, symptom: string) => void;
  onNavigateToReceipt: () => void;
}

interface ScanGalleryItem {
  id: string;
  name: string;
  category: 'power' | 'tools' | 'electronics' | 'documents' | 'vehicles';
  imageUrl: string;
  timestamp: string;
  confidence: number;
  hint: string;
}

const INITIAL_SCAN_LIBRARY: ScanGalleryItem[] = [
  {
    id: 'scan_g1',
    name: 'Hybrid Solar Inverter (Power Room)',
    category: 'power',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
    timestamp: 'Today, 14:20',
    confidence: 0.96,
    hint: 'solar inverter',
  },
  {
    id: 'scan_g2',
    name: 'Industrial Multimeter (Workshop Bench)',
    category: 'tools',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    timestamp: 'Today, 11:05',
    confidence: 0.94,
    hint: 'multimeter tool',
  },
  {
    id: 'scan_g3',
    name: 'Inverter Generator Engine (Service Bay)',
    category: 'tools',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    timestamp: 'Yesterday',
    confidence: 0.93,
    hint: 'generator engine',
  },
  {
    id: 'scan_g4',
    name: 'Equipment Hardware Receipt (Desk)',
    category: 'documents',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
    timestamp: 'Yesterday',
    confidence: 0.97,
    hint: 'receipt bill',
  },
  {
    id: 'scan_g5',
    name: 'MacBook Pro Workstation',
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    timestamp: '3 days ago',
    confidence: 0.98,
    hint: 'laptop computer',
  },
];

export const RealityScanner: FC<RealityScannerProps> = ({
  currentLang,
  onNavigateToPassport,
  onNavigateToRepair,
  onNavigateToReceipt,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [selectedScan, setSelectedScan] = useState<ScanGalleryItem>(INITIAL_SCAN_LIBRARY[0]);
  const [scanLibrary, setScanLibrary] = useState<ScanGalleryItem[]>(INITIAL_SCAN_LIBRARY);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'power' | 'tools' | 'electronics' | 'documents'>('all');
  
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState<ScanAnalysisResult | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    runAnalysis(selectedScan.imageUrl, selectedScan.hint);
  }, [selectedScan]);

  const startWebcam = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsCameraActive(true);
      } else {
        setCameraError('Webcam access not supported in this browser environment. Using high-resolution test feeds.');
      }
    } catch (err: any) {
      console.warn('Webcam error:', err);
      setCameraError('Camera permission denied or camera unavailable. Switched to test sensor feed.');
      setIsCameraActive(false);
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureWebcamFrame = async () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

      const newItem: ScanGalleryItem = {
        id: `scan_${Date.now()}`,
        name: `Live Capture #${scanLibrary.length + 1}`,
        category: 'tools',
        imageUrl: dataUrl,
        timestamp: 'Just now',
        confidence: 0.95,
        hint: 'captured physical object',
      };
      setScanLibrary([newItem, ...scanLibrary]);
      setSelectedScan(newItem);
    }
  };

  // Handle User File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      const isDoc = file.name.toLowerCase().includes('receipt') || file.name.toLowerCase().includes('invoice') || file.name.toLowerCase().includes('bill');

      const uploadedScan: ScanGalleryItem = {
        id: `scan_up_${Date.now()}`,
        name: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
        category: isDoc ? 'documents' : 'tools',
        imageUrl: dataUrl,
        timestamp: 'Just uploaded',
        confidence: 0.95,
        hint: isDoc ? 'receipt document' : cleanName,
      };

      setScanLibrary([uploadedScan, ...scanLibrary]);
      setSelectedScan(uploadedScan);
      setUploadNotice(`Successfully uploaded & cataloged "${uploadedScan.name}"!`);
      setTimeout(() => setUploadNotice(null), 3500);
    };
    reader.readAsDataURL(file);
  };

  const runAnalysis = async (imageUrl: string, hint?: string) => {
    setIsAnalyzing(true);
    try {
      const result = await aiGateway.analyzeVisualScene(imageUrl, hint);
      setScanResult(result);

      await eventEngine.emit({
        type: 'OBJECT_SEEN',
        source: 'Reality Scanner (01)',
        description: `Visual scan: ${result.primaryObject} (Confidence: ${Math.round(result.confidence * 100)}%)`,
        confidence: result.confidence,
        metadata: { category: result.category, primaryObject: result.primaryObject },
      });
    } catch (e) {
      console.error('Scan error:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Filtered scans
  const filteredLibrary = scanLibrary.filter((item) => {
    if (activeCategoryFilter === 'all') return true;
    return item.category === activeCategoryFilter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Module Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-cyan">MODULE 01</span>
            <span className="badge badge-emerald">ACTIVE MVP</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>{t.scanner.title}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{t.scanner.subtitle}</p>
        </div>

        {/* Action Controls: Live Camera & Upload File */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-secondary"
            style={{ borderRadius: '16px' }}
          >
            <Upload size={16} color="var(--accent-cyan)" />
            <span>Upload Scan Photo</span>
          </button>

          {!isCameraActive ? (
            <button onClick={startWebcam} className="btn-primary" style={{ borderRadius: '16px' }}>
              <Camera size={18} />
              <span>{t.scanner.startScanning}</span>
            </button>
          ) : (
            <button onClick={stopWebcam} className="btn-secondary" style={{ borderRadius: '16px' }}>
              <RefreshCw size={18} />
              <span>{t.scanner.stopScanning}</span>
            </button>
          )}
        </div>
      </div>

      {uploadNotice && (
        <div style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-emerald)', borderRadius: '14px', color: 'var(--accent-emerald)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} />
          <span>{uploadNotice}</span>
        </div>
      )}

      {cameraError && (
        <div style={{ padding: '12px 16px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid var(--accent-amber)', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--accent-amber)' }}>
          <ShieldAlert size={18} />
          <span>{cameraError}</span>
        </div>
      )}

      {/* Main Viewport & Telemetry Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Optical Viewport Canvas */}
        <div className="glass-panel" style={{ overflow: 'hidden', position: 'relative', minHeight: '380px', display: 'flex', flexDirection: 'column', borderRadius: '24px' }}>
          <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} />
              {isCameraActive ? t.scanner.liveFeed : selectedScan.name}
            </span>
            <span className="badge badge-cyan">
              {isAnalyzing ? 'Scanning Neural Stream...' : 'Optical Lock Verified'}
            </span>
          </div>

          <div style={{ position: 'relative', flex: 1, backgroundColor: '#05070D', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {isAnalyzing && <div className="scanner-beam" />}

            {isCameraActive ? (
              <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <img
                src={selectedScan.imageUrl}
                alt="Selected Scan"
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '340px' }}
              />
            )}

            {/* Bounding Boxes Overlay */}
            {scanResult && !isAnalyzing && (
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                {scanResult.boundingBoxes.map((box: DetectedBoundingBox) => (
                  <div
                    key={box.id}
                    style={{
                      position: 'absolute',
                      left: `${box.x}%`,
                      top: `${box.y}%`,
                      width: `${box.width}%`,
                      height: `${box.height}%`,
                      border: '2px solid #00F0FF',
                      backgroundColor: 'rgba(0, 240, 255, 0.12)',
                      boxShadow: '0 0 16px rgba(0, 240, 255, 0.45)',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '-24px',
                        left: '0',
                        backgroundColor: '#00F0FF',
                        color: '#080B12',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        letterSpacing: '0.5px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {box.label} ({Math.round(box.confidence * 100)}%)
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Controls Bar */}
          <div style={{ padding: '12px 18px', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            {isCameraActive ? (
              <button onClick={captureWebcamFrame} className="btn-primary" style={{ padding: '8px 18px', fontSize: '13px' }}>
                <Camera size={16} />
                {t.scanner.takePhoto}
              </button>
            ) : (
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Viewing: <strong style={{ color: 'var(--text-primary)' }}>{selectedScan.name}</strong>
              </span>
            )}

            <button
              onClick={() => runAnalysis(isCameraActive ? scanLibrary[0].imageUrl : selectedScan.imageUrl, selectedScan.hint)}
              className="btn-secondary"
              style={{ padding: '6px 14px', fontSize: '12px' }}
              disabled={isAnalyzing}
            >
              <RefreshCw size={14} className={isAnalyzing ? 'animate-spin' : ''} />
              Re-Analyze
            </button>
          </div>
        </div>

        {/* Real-Time Telemetry Card */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', borderRadius: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Vision Inference Telemetry</h3>
            {scanResult && (
              <span className="badge badge-emerald">
                Confidence: {Math.round(scanResult.confidence * 100)}%
              </span>
            )}
          </div>

          {scanResult ? (
            <>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '16px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '6px' }}>
                  Identified Entity
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {scanResult.primaryObject}
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {scanResult.summary}
                </p>
                {scanResult.estimatedDimensions && (
                  <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--accent-violet)', fontWeight: 600 }}>
                    Spatial Dimensions: {scanResult.estimatedDimensions}
                  </div>
                )}
              </div>

              {/* Detected Physical Features */}
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Layers size={15} color="var(--accent-cyan)" />
                  {t.scanner.detectedObjects} ({scanResult.boundingBoxes.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {scanResult.boundingBoxes.map((b) => (
                    <div
                      key={b.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 12px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '12px',
                        fontSize: '13px',
                      }}
                    >
                      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{b.label}</span>
                      <span style={{ color: 'var(--accent-cyan)', fontSize: '12px', fontWeight: 700 }}>
                        {Math.round(b.confidence * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cross-Module Handoff Prompts */}
              <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                  Cross-Module Actions
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <button
                    onClick={() =>
                      onNavigateToPassport({
                        name: scanResult.primaryObject,
                        category: scanResult.category,
                        imageUrl: scanResult.imageUrl,
                      })
                    }
                    className="btn-primary"
                    style={{ flex: 1, fontSize: '13px', padding: '10px 14px', borderRadius: '14px' }}
                  >
                    <CheckCircle2 size={16} />
                    {t.actions.addToPassport}
                  </button>

                  <button
                    onClick={() => onNavigateToRepair(scanResult.primaryObject, scanResult.summary)}
                    className="btn-secondary"
                    style={{ fontSize: '13px', padding: '10px 14px', borderRadius: '14px' }}
                  >
                    <Cpu size={16} />
                    {t.actions.startRepair}
                  </button>

                  {scanResult.suggestedModule === 'receipt' && (
                    <button
                      onClick={onNavigateToReceipt}
                      className="btn-secondary"
                      style={{ fontSize: '13px', padding: '10px 14px', borderRadius: '14px' }}
                    >
                      <ArrowRight size={16} />
                      Receipt DNA
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px', color: 'var(--text-muted)' }}>
              <Sparkles size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
              <p>Select or upload an image to start visual perception.</p>
            </div>
          )}
        </div>
      </div>

      {/* Categorized Scans Library & Gallery (Grouped by Category) */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FolderKanban size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Scans Library & Grouped Categories
            </h3>
            <span className="badge badge-cyan">{filteredLibrary.length} Items</span>
          </div>

          {/* Category Filter Chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Scans' },
              { id: 'power', label: '⚡ Power & Solar' },
              { id: 'tools', label: '🔧 Tools & Machinery' },
              { id: 'electronics', label: '💻 Electronics' },
              { id: 'documents', label: '📄 Receipts & Docs' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(cat.id as any)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: activeCategoryFilter === cat.id ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                  background: activeCategoryFilter === cat.id ? 'rgba(0,240,255,0.15)' : 'rgba(255,255,255,0.02)',
                  color: activeCategoryFilter === cat.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
          {filteredLibrary.map((item) => {
            const isSelected = selectedScan.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedScan(item)}
                style={{
                  padding: '12px',
                  borderRadius: '18px',
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(0,240,255,0.08)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                  boxShadow: isSelected ? '0 0 15px rgba(0,240,255,0.25)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '120px', borderRadius: '12px', overflow: 'hidden' }}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      padding: '2px 8px',
                      borderRadius: '8px',
                      fontSize: '10px',
                      fontWeight: 700,
                      background: 'rgba(0,0,0,0.65)',
                      color: '#00F0FF',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {Math.round(item.confidence * 100)}%
                  </span>
                </div>

                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {item.timestamp} &bull; <span style={{ textTransform: 'capitalize' }}>{item.category}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
