import { useState } from 'react'
import AIToolShell from '../shared/AIToolShell.jsx'

const DEMO = [
  { type: 'gap',   finding: 'Plot arc: Antagonist disappears between chapters 3–7.', correction: 'Add a minor scene or note where the absence is explained, or foreshadow a reappearance.', engine: 'ArcGapEngine',       why: 'Maintains arc continuity.' },
  { type: 'style', finding: 'Inconsistent tone: switches from first to third person mid-chapter.', correction: 'Convert the highlighted section to first person for style consistency.', engine: 'StyleCorrectionAI', why: 'Maintains narrative voice.' },
]

export default function CorrectionEnginePanel({ text: _text = '', context: _context = {} }) {
  const [results, setResults]   = useState([])
  const [output, setOutput]     = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [accepted, setAccepted] = useState({})

  async function run() {
    setLoading(true); setError(null); setOutput(''); setResults([]); setAccepted({})
    try {
      await new Promise(r => setTimeout(r, 900))
      setResults(DEMO)
      setOutput(DEMO.map((s, i) => `[${i + 1}] ${s.finding}\n    → ${s.correction} (${s.engine})`).join('\n\n'))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AIToolShell
      icon="⚙️"
      title="Correction & Gap Engines"
      description="Multi-engine scan for plot arc gaps, style inconsistencies, and narrative issues."
      badge="Multi-engine"
      loading={loading}
      error={error}
      output={results.length === 0 ? output : null}
      outputLabel="Engine Report"
      emptyIcon="⚙️"
      emptyTitle="Engines standing by"
      emptyHint="Click Run Engines to scan your manuscript for issues."
      onGenerate={run}
      onRegenerate={run}
      onClear={() => { setResults([]); setOutput('') }}
      generateLabel="Run Engines"
    >
      {!loading && results.length > 0 && (
        <div className="fade-in">
          {results.map((s, i) => (
            <div key={i} className="result-card">
              <span className={`result-card__tag result-card__tag--${s.type}`}>{s.engine}</span>
              <p className="result-card__finding">{s.finding}</p>
              <p className="result-card__body">{s.correction}</p>
              <p className="result-card__meta">Why: {s.why}</p>
              {accepted[i] === undefined && (
                <div className="result-card__actions">
                  <button className="btn btn--secondary btn--sm" onClick={() => setAccepted(a => ({ ...a, [i]: true }))}>✓ Accept</button>
                  <button className="btn btn--ghost btn--sm"     onClick={() => setAccepted(a => ({ ...a, [i]: false }))}>✗ Reject</button>
                </div>
              )}
              {accepted[i] === true  && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)' }}>✓ Applied</p>}
              {accepted[i] === false && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Rejected — feedback logged</p>}
            </div>
          ))}
        </div>
      )}
    </AIToolShell>
  )
}
