import { useState } from 'react'
import AIToolShell from '../shared/AIToolShell.jsx'

const DEMO_RESULTS = [
  { type: 'gap',   finding: 'Character "Sam" introduced in Chapter 2 but absent for 7 consecutive chapters.', correction: 'Add a brief mention or subplot appearance in Chapters 4–6 to maintain presence.', engine: 'CharacterArcEngine' },
  { type: 'style', finding: "Antagonist's weapon referenced in Chapter 10 is never mentioned again.", correction: 'Either have a character notice its absence or reveal it was destroyed/lost.', engine: 'ItemTrackerAI' },
  { type: 'info',  finding: 'Timeline inconsistency: Event B occurs "three days later" but context implies two weeks.', correction: 'Standardize the timeline in Chapters 8–9.', engine: 'TimelineChecker' },
]

export default function AIPlotConsistencyAgent({ project: _project = {}, onResult }) {
  const [results, setResults]   = useState([])
  const [output, setOutput]     = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [accepted, setAccepted] = useState({})

  async function run() {
    setLoading(true); setError(null); setOutput(''); setResults([]); setAccepted({})
    try {
      await new Promise(r => setTimeout(r, 1100))
      setResults(DEMO_RESULTS)
      setOutput(DEMO_RESULTS.map((r, i) => `[${i + 1}] ${r.finding}\n    → ${r.correction} (${r.engine})`).join('\n\n'))
      onResult?.(DEMO_RESULTS)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  function accept(i) { setAccepted(a => ({ ...a, [i]: true })) }
  function reject(i) { setAccepted(a => ({ ...a, [i]: false })) }

  return (
    <AIToolShell
      icon="🔎"
      title="Plot Consistency Checker"
      description="Detect plot holes, missing arcs, dropped characters, and timeline inconsistencies."
      badge="Arc AI"
      loading={loading}
      error={error}
      output={results.length === 0 ? output : null}
      outputLabel="Consistency Report"
      emptyIcon="🔎"
      emptyTitle="No issues found yet"
      emptyHint="Click Run Check to scan your project for plot inconsistencies."
      onGenerate={run}
      onRegenerate={run}
      onClear={() => { setResults([]); setOutput('') }}
      generateLabel="Run Consistency Check"
    >
      {!loading && results.length > 0 && (
        <div className="fade-in">
          {results.map((r, i) => (
            <div key={i} className="result-card">
              <span className={`result-card__tag result-card__tag--${r.type}`}>{r.engine}</span>
              <p className="result-card__finding">{r.finding}</p>
              <p className="result-card__body">{r.correction}</p>
              {accepted[i] === undefined && (
                <div className="result-card__actions">
                  <button className="btn btn--secondary btn--sm" onClick={() => accept(i)}>✓ Accept</button>
                  <button className="btn btn--ghost btn--sm" onClick={() => reject(i)}>✗ Dismiss</button>
                </div>
              )}
              {accepted[i] === true  && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)' }}>✓ Applied</p>}
              {accepted[i] === false && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Dismissed</p>}
            </div>
          ))}
        </div>
      )}
    </AIToolShell>
  )
}
