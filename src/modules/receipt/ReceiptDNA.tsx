import { useState, useEffect, type FC } from 'react';
import { Upload, CheckCircle2, ShieldCheck, Plus } from 'lucide-react';
import type { ReceiptDNAData, LanguageCode, CurrencyCode } from '../../types';
import { db } from '../../core/db/storage';
import { aiGateway } from '../../core/ai/gateway';
import { eventEngine } from '../../core/events/eventEngine';
import { formatCurrency, convertCurrency } from '../../core/currency/currencyService';
import { TRANSLATIONS } from '../../core/i18n/translations';

interface ReceiptDNAProps {
  currentLang: LanguageCode;
  currentCurrency: CurrencyCode;
  onLinkToPassport: (itemData: { name: string; category: any; brand?: string }) => void;
}

export const ReceiptDNA: FC<ReceiptDNAProps> = ({
  currentLang,
  currentCurrency,
  onLinkToPassport,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [receipts, setReceipts] = useState<ReceiptDNAData[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptDNAData | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [linkedNotice, setLinkedNotice] = useState<string | null>(null);

  useEffect(() => {
    loadReceipts();
  }, []);

  const loadReceipts = async () => {
    const list = await db.getReceipts();
    setReceipts(list);
    if (list.length > 0 && !selectedReceipt) {
      setSelectedReceipt(list[0]);
    }
  };

  const handleScanSampleReceipt = async () => {
    setIsScanning(true);
    setLinkedNotice(null);
    try {
      const data = await aiGateway.extractReceiptData();
      await db.saveReceipt(data);
      await eventEngine.emit({
        type: 'RECEIPT_SCANNED',
        source: 'Receipt DNA (28)',
        description: `Receipt scanned: ${data.merchant} (Total: ₦${data.total.toLocaleString()})`,
        confidence: data.confidence,
        metadata: { merchant: data.merchant, total: data.total },
      });

      await loadReceipts();
      setSelectedReceipt(data);
    } catch (err) {
      console.error('Receipt scan error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleAutoLinkWarranty = (item: ReceiptDNAData['items'][0]) => {
    onLinkToPassport({
      name: item.name,
      category: 'tools',
      brand: selectedReceipt?.merchant.split(' ')[0] || 'Hardware Vendor',
    });
    setLinkedNotice(`Linked "${item.name}" to Object Passport.`);
    setTimeout(() => setLinkedNotice(null), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-cyan">MODULE 28</span>
            <span className="badge badge-emerald">ACTIVE MVP</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>{t.receipt.title}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{t.receipt.subtitle}</p>
        </div>

        <button onClick={handleScanSampleReceipt} disabled={isScanning} className="btn-primary">
          <Upload size={18} />
          {isScanning ? 'Extracting DNA...' : t.receipt.uploadReceipt}
        </button>
      </div>

      {linkedNotice && (
        <div style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-emerald)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-emerald)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} />
          <span>{linkedNotice}</span>
        </div>
      )}

      {/* Main Grid: Past Receipts Ledger & Selected Receipt Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Past Receipts Master List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Extracted Receipts ({receipts.length})
          </span>

          {receipts.map((rcp) => {
            const isSelected = selectedReceipt?.id === rcp.id;
            return (
              <div
                key={rcp.id}
                onClick={() => setSelectedReceipt(rcp)}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {rcp.merchant}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    {formatCurrency(
                      convertCurrency(rcp.total, rcp.currency, currentCurrency).convertedAmount,
                      currentCurrency
                    )}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{rcp.category}</span>
                  <span>{rcp.date}</span>
                </div>
                {rcp.warrantyDetected && (
                  <div style={{ fontSize: '11px', color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={12} />
                    Warranty: {rcp.warrantyDetected.durationMonths} Months ({rcp.warrantyDetected.itemName})
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Receipt DNA Dossier */}
        {selectedReceipt && (
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>
                  OCR GROUNDED &bull; {Math.round(selectedReceipt.confidence * 100)}% CONFIDENCE
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {selectedReceipt.merchant}
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Invoice Date: {selectedReceipt.date} &bull; Category: {selectedReceipt.category}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.receipt.totalAmount}</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                  {formatCurrency(
                    convertCurrency(selectedReceipt.total, selectedReceipt.currency, currentCurrency).convertedAmount,
                    currentCurrency
                  )}
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
                {t.receipt.itemsFound} ({selectedReceipt.items.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedReceipt.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                        {item.quantity}x {item.name}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Category: {item.category}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {formatCurrency(
                          convertCurrency(item.price * item.quantity, selectedReceipt.currency, currentCurrency).convertedAmount,
                          currentCurrency
                        )}
                      </span>
                      {item.warrantyEligible && (
                        <button
                          onClick={() => handleAutoLinkWarranty(item)}
                          className="btn-secondary"
                          style={{ padding: '4px 10px', fontSize: '11px' }}
                          title="Auto-create Object Passport"
                        >
                          <Plus size={12} />
                          {t.receipt.autoLink}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary Breakdown */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>
                  {formatCurrency(
                    convertCurrency(selectedReceipt.subtotal, selectedReceipt.currency, currentCurrency).convertedAmount,
                    currentCurrency
                  )}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>VAT / Sales Tax</span>
                <span>
                  {formatCurrency(
                    convertCurrency(selectedReceipt.tax, selectedReceipt.currency, currentCurrency).convertedAmount,
                    currentCurrency
                  )}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '15px', paddingTop: '6px', borderTop: '1px solid var(--border-subtle)' }}>
                <span>Total Charge</span>
                <span>
                  {formatCurrency(
                    convertCurrency(selectedReceipt.total, selectedReceipt.currency, currentCurrency).convertedAmount,
                    currentCurrency
                  )}
                </span>
              </div>
            </div>

            {/* Raw OCR Stream snippet */}
            {selectedReceipt.rawText && (
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Raw OCR Extracted Transcript
                </div>
                <pre style={{ fontSize: '11px', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: 'var(--radius-sm)', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                  {selectedReceipt.rawText}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
