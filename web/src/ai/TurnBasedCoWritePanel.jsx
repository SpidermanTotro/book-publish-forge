import { useState } from 'react'
import AIToolShell from '../shared/AIToolShell.jsx'

const AI_DEMO = `[AI's Next Section]\n\nThe adventure continues with a twist: as the doors swing open, the protagonist doesn't find the empty chamber they expected — instead, a figure sits at the far end of the long table, face obscured, hands folded, waiting as if they'd known the arrival time all along.`

export default function TurnBasedCoWritePanel({ text = '', onNewText, context: _context = {} }) {
  const [mode, setMode]       = useState('human')
  const [aiText, setAiText]   = useState('')
  const [output, setOutput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  async function aiWrite() {
    setMode('ai-thinking'); setAiText(''); setLoading(true); setError(null)
    try {
      await new Promise(r => setTimeout(r, 950))
      setAiText(AI_DEMO)
      setOutput(AI_DEMO)
      setMode('ai-review')
    } catch (e) {
      setError(e.message)
      setMode('human')
    } finally {
      setLoading(false)
    }
  }

  function acceptAI() {
    onNewText?.(prev => (prev || '') + '\n' + aiText)
    setMode('human')
    setAiText('')
    setOutput('')
  }

  const modeLabel = {
    human:        'Your Turn',
    'ai-thinking': 'AI Writing…',
    'ai-review':  "Review AI's Section",
    ai:           'AI Turn',
  }

  const turnIndicator = (
    <div className="turn-indicator" style={{ marginBottom: 'var(--space-4)' }}>
      <span className={`turn-dot turn-dot--${mode === 'human' ? 'human' : mode === 'ai-review' ? 'review' : 'ai'}`} />
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontWeight: 600 }}>
        {modeLabel[mode]}
      </span>
    </div>
  )

  const extraActions = mode === 'ai-review' ? (
    <button className="btn btn--secondary btn--sm" onClick={acceptAI}>✓ Accept AI Section</button>
  ) : null

  return (
    <AIToolShell
      icon="✍️"
      title="Turn-Based Co-Writing"
      description="Alternate between writing yourself and having the AI continue the story."
      badge="Co-write"
      loading={loading}
      error={error}
      output={output}
      outputLabel="AI's Section"
      emptyIcon="✍️"
      emptyTitle="Ready to co-write"
      emptyHint="Click 'AI Write Next' to have the AI write the next section."
      onGenerate={mode === 'human' || mode === 'ai' ? aiWrite : undefined}
      onRegenerate={mode === 'ai-review' ? aiWrite : undefined}
      onClear={() => { setMode('human'); setAiText(''); setOutput('') }}
      generateLabel={mode === 'ai-review' ? 'Regenerate' : 'AI Write Next'}
      regenerateLabel="Try Again"
      extraActions={extraActions}
    >
      {turnIndicator}
      {mode === 'human' && (
        <div className="field">
          <label className="field__label">Your writing so far</label>
          <textarea
            className="field__textarea"
            rows={5}
            defaultValue={text}
            placeholder="Write your section here, then hand off to the AI…"
          />
        </div>
      )}
    </AIToolShell>
  )
}
