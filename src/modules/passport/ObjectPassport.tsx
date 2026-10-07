import { useState, useEffect, type FC } from 'react';
import { ShieldCheck, Plus, Copy, MapPin, Wrench, Check } from 'lucide-react';
import type { ObjectEntity, LanguageCode, CurrencyCode } from '../../types';
import { db, generateCryptographicHash } from '../../core/db/storage';
import { eventEngine } from '../../core/events/eventEngine';
import { formatCurrency, convertCurrency } from '../../core/currency/currencyService';
import { TRANSLATIONS } from '../../core/i18n/translations';

interface ObjectPassportProps {
  currentLang: LanguageCode;
  currentCurrency: CurrencyCode;
  prefillData?: Partial<ObjectEntity> | null;
  onClearPrefill?: () => void;
  onInspectRepair?: (objectName: string) => void;
}

export const ObjectPassport: FC<ObjectPassportProps> = ({
  currentLang,
  currentCurrency,
  prefillData,
  onClearPrefill,
  onInspectRepair,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [objects, setObjects] = useState<ObjectEntity[]>([]);
  const [selectedObject, setSelectedObject] = useState<ObjectEntity | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  // New object form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'electronics' as ObjectEntity['category'],
    brand: '',
    model: '',
    serialNumber: '',
    location: 'Main Workshop & Lab',
    condition: 'good' as ObjectEntity['currentCondition'],
    purchasePrice: 250000,
    warrantyExpiry: '2027-12-31',
    imageUrl: '',
    notes: '',
  });

  useEffect(() => {
    loadObjects();
  }, []);

  useEffect(() => {
    if (prefillData) {
      setFormData((prev) => ({
        ...prev,
        name: prefillData.name || '',
        category: prefillData.category || 'electronics',
        imageUrl: prefillData.imageUrl || '',
      }));
      setIsRegisterModalOpen(true);
      if (onClearPrefill) onClearPrefill();
    }
  }, [prefillData, onClearPrefill]);

  const loadObjects = async () => {
    const list = await db.getObjects();
    setObjects(list);
    if (list.length > 0 && !selectedObject) {
      setSelectedObject(list[0]);
    }
  };

  const handleCreateObject = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = `obj_${Date.now()}`;
    const timestamp = new Date().toISOString();

    const proofPayload = `${id}:${formData.name}:${formData.serialNumber}:${timestamp}`;
    const cryptographicProof = await generateCryptographicHash(proofPayload);

    const newObj: ObjectEntity = {
      id,
      name: formData.name || 'Registered Object',
      category: formData.category,
      brand: formData.brand,
      model: formData.model,
      serialNumber: formData.serialNumber || `SN-${Math.floor(100000 + Math.random() * 900000)}`,
      location: formData.location,
      placeId: 'plc_01',
      currentCondition: formData.condition,
      purchasePrice: Number(formData.purchasePrice),
      purchaseCurrency: 'NGN',
      warrantyExpiry: formData.warrantyExpiry,
      cryptographicProof,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
      notes: formData.notes,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await db.saveObject(newObj);
    await eventEngine.emit({
      type: 'OBJECT_REGISTERED',
      source: 'Object Passport (21)',
      description: `Object registered: ${newObj.name} with immutable hash ${newObj.cryptographicProof.substring(0, 12)}...`,
      confidence: 1.0,
      objectId: newObj.id,
    });

    await loadObjects();
    setSelectedObject(newObj);
    setIsRegisterModalOpen(false);
  };

  const copyProofHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-cyan">MODULE 21</span>
            <span className="badge badge-emerald">ACTIVE MVP</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>{t.passport.title}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{t.passport.subtitle}</p>
        </div>

        <button onClick={() => setIsRegisterModalOpen(true)} className="btn-primary">
          <Plus size={18} />
          {t.passport.newItem}
        </button>
      </div>

      {/* Grid: Object List + Selected Passport Details */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Objects Master Catalog List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {t.passport.registeredItems} ({objects.length})
            </span>
            <span style={{ fontSize: '12px', color: 'var(--accent-cyan)' }}>Tamper-Evident Ledger</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {objects.map((obj) => {
              const isSelected = selectedObject?.id === obj.id;
              return (
                <div
                  key={obj.id}
                  onClick={() => setSelectedObject(obj)}
                  className="glass-panel"
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                    backgroundColor: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={obj.imageUrl}
                    alt={obj.name}
                    style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', border: '1px solid var(--border-subtle)' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {obj.name}
                      </h4>
                      <span className={`badge ${obj.currentCondition === 'excellent' || obj.currentCondition === 'good' ? 'badge-emerald' : 'badge-amber'}`}>
                        {obj.currentCondition}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <MapPin size={12} color="var(--accent-cyan)" />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{obj.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Object Passport Dossier */}
        {selectedObject && (
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Dossier Header */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <img
                src={selectedObject.imageUrl}
                alt={selectedObject.name}
                style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--border-glow)' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="badge badge-cyan">{selectedObject.category}</span>
                  <span className="badge badge-violet">{selectedObject.brand || 'XERXES Verified'}</span>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  {selectedObject.name}
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Model: {selectedObject.model || 'Standard'} &bull; Serial: {selectedObject.serialNumber}
                </div>
              </div>
            </div>

            {/* Cryptographic Verification Seal */}
            <div style={{ background: 'rgba(0, 240, 255, 0.04)', border: '1px solid var(--border-glow)', borderRadius: 'var(--radius-sm)', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} />
                  {t.passport.verifiedSeal} (Part 10 Proof)
                </span>
                <button
                  onClick={() => copyProofHash(selectedObject.cryptographicProof)}
                  style={{ background: 'none', border: 'none', color: copiedHash ? 'var(--accent-emerald)' : 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                >
                  {copiedHash ? <Check size={14} /> : <Copy size={14} />}
                  {copiedHash ? 'Hash Copied' : 'Copy Hash'}
                </button>
              </div>
              <code style={{ fontSize: '11px', color: 'var(--accent-cyan)', wordBreak: 'break-all', fontFamily: 'monospace' }}>
                {selectedObject.cryptographicProof}
              </code>
            </div>

            {/* Key Passport Metadata Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
              <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t.passport.location}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {selectedObject.location}
                </div>
              </div>

              <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t.passport.warranty}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-emerald)', marginTop: '2px' }}>
                  Valid &bull; Exp: {selectedObject.warrantyExpiry || 'Lifetime'}
                </div>
              </div>

              <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Acquisition Value</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {selectedObject.purchasePrice
                    ? formatCurrency(
                        convertCurrency(selectedObject.purchasePrice, selectedObject.purchaseCurrency || 'NGN', currentCurrency).convertedAmount,
                        currentCurrency
                      )
                    : 'N/A'}
                </div>
              </div>

              <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Physical State</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px', textTransform: 'capitalize' }}>
                  {selectedObject.currentCondition}
                </div>
              </div>
            </div>

            {selectedObject.notes && (
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong>Custodian Notes:</strong> {selectedObject.notes}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', flexWrap: 'wrap' }}>
              <button
                onClick={() => onInspectRepair && onInspectRepair(selectedObject.name)}
                className="btn-primary"
                style={{ flex: 1, fontSize: '13px' }}
              >
                <Wrench size={16} />
                Diagnose with RepairVision
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Register New Object Modal */}
      {isRegisterModalOpen && (
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
          <div className="glass-panel" style={{ width: '100%', maxWidth: '520px', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              {t.passport.newItem}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Issue an immutable digital passport with cryptographic proof of custody.
            </p>

            <form onSubmit={handleCreateObject} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Object Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '14px' }}
                  placeholder="e.g. Fluke Multimeter or Honda Generator"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                    Brand
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '14px' }}
                    placeholder="e.g. Honda, Apple, Fluke"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                    Serial Number / Tag
                  </label>
                  <input
                    type="text"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '14px' }}
                    placeholder="e.g. SN-884920"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                    Current Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                    Condition
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '14px' }}
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="damaged">Damaged</option>
                    <option value="in_repair">In Repair</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <button type="button" onClick={() => setIsRegisterModalOpen(false)} className="btn-secondary">
                  {t.actions.cancel}
                </button>
                <button type="submit" className="btn-primary">
                  Generate Passport Seal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
