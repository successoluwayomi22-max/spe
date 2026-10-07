import { useState, type FC } from 'react';
import { Sparkles, Search, AlertCircle, ArrowRight } from 'lucide-react';
import type { MemorySearchResult, LanguageCode, CurrencyCode } from '../../types';
import { db } from '../../core/db/storage';
import { aiGateway } from '../../core/ai/gateway';
import { eventEngine } from '../../core/events/eventEngine';
import { TRANSLATIONS } from '../../core/i18n/translations';

interface AIMemorySearchProps {
  currentLang: LanguageCode;
  currentCurrency: CurrencyCode;
  onNavigateToTab: (tab: any, entityId?: string) => void;
}

const SAMPLE_QUESTIONS = [
  'Where did I last see my charger?',
  'Show recent equipment repairs and diagnostics.',
  'How much did I spend on maintenance this month?',
  'Is my solar inverter under warranty?',
];

export const AIMemorySearch: FC<AIMemorySearchProps> = ({
  currentLang,
  currentCurrency: _currentCurrency,
  onNavigateToTab,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [queryText, setQueryText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResponse, setSearchResponse] = useState<{
    answer: string;
    confidence: number;
    uncertaintyNote?: string;
    matches: MemorySearchResult[];
  } | null>(null);

  const handleSearch = async (queryToUse?: string) => {
    const q = queryToUse || queryText;
    if (!q.trim()) return;

    setIsSearching(true);
    try {
      const [objects, places, repairs, receipts] = await Promise.all([
        db.getObjects(),
        db.getPlaces(),
        db.getRepairs(),
        db.getReceipts(),
      ]);

      const result = await aiGateway.queryMemory(q, { objects, places, repairs, receipts });
      setSearchResponse(result);

      await eventEngine.emit({
        type: 'AI_MEMORY_QUERIED',
        source: 'AI Memory (09)',
        description: `Memory queried: "${q}" -> ${result.matches.length} matches found`,
        confidence: result.confidence,
        metadata: { query: q, matchCount: result.matches.length },
      });
    } catch (err) {
      console.error('Memory search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-cyan">MODULE 09</span>
            <span className="badge badge-emerald">ACTIVE MVP</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>{t.memory.title}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{t.memory.subtitle}</p>
        </div>
      </div>

      {/* Conversational Query Bar */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(14,19,34,0.9), rgba(24,34,53,0.7))' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
        >
          <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
            <Search
              size={18}
              color="var(--accent-cyan)"
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder={t.memory.placeholder}
              style={{
                width: '100%',
                padding: '14px 18px 14px 46px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '15px',
              }}
            />
          </div>
          <button type="submit" disabled={isSearching} className="btn-primary" style={{ padding: '0 28px' }}>
            <Sparkles size={16} />
            {isSearching ? 'Reasoning...' : t.memory.askButton}
          </button>
        </form>

        {/* Suggested Queries */}
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.memory.recentQueries}:</span>
          {SAMPLE_QUESTIONS.map((sq) => (
            <button
              key={sq}
              onClick={() => {
                setQueryText(sq);
                handleSearch(sq);
              }}
              className="btn-secondary"
              style={{ padding: '4px 12px', fontSize: '12px', borderRadius: 'var(--radius-full)' }}
            >
              "{sq}"
            </button>
          ))}
        </div>
      </div>

      {/* Answer & Grounding Results */}
      {searchResponse && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* AI Response Card */}
          <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--accent-cyan)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-cyan)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} />
                XERXES Grounded Reasoning
              </span>
              <span className={`badge ${searchResponse.confidence > 0.85 ? 'badge-emerald' : 'badge-amber'}`}>
                {Math.round(searchResponse.confidence * 100)}% Confidence
              </span>
            </div>

            <p style={{ fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
              {searchResponse.answer}
            </p>

            {searchResponse.uncertaintyNote && (
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--accent-amber)' }}>
                <AlertCircle size={16} />
                <span>{searchResponse.uncertaintyNote}</span>
              </div>
            )}
          </div>

          {/* Referenced Entity Cards */}
          {searchResponse.matches.length > 0 && (
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                {t.memory.foundRecords} ({searchResponse.matches.length})
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                {searchResponse.matches.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      if (m.type === 'object') onNavigateToTab('passport');
                      else if (m.type === 'repair') onNavigateToTab('repair');
                      else if (m.type === 'receipt') onNavigateToTab('receipt');
                    }}
                    className="glass-panel"
                    style={{
                      padding: '16px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="badge badge-cyan">{m.badge}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {new Date(m.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {m.title}
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {m.snippet}
                    </p>
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      <span>Inspect Entity Record</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
