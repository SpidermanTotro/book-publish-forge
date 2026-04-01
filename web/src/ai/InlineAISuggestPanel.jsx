import { useState } from 'react'
import AIToolShell from '../shared/AIToolShell.jsx'

const MODES = ['Next sentence', 'Next paragraph', 'Next scene beat', 'Dialogue continuation', 'Description expansion']

export default function InlineAISuggestPanel({ text = '', onAccept, context: _context = {} }) {
  const [mode, setMode]       = useState('Next sentence')
  const [output, setOutput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  async function suggest() {
    setLoading(true); setError(null); setOutput('')
    try {
      await new Promise(r => setTimeout(r, 750))
      const map = {
        'Next sentence':         `She paused at the threshold, one hand resting on the door frame, fingers tracing the familiar grain of the wood.`,
        'Next paragraph':        `The silence stretched between them like a held breath. Outside, rain had begun to fall in thin, persistent sheets, drumming against the window panes with quiet insistence. Neither of them moved to speak first.`,
        'Next scene beat':       `[BEAT] The letter she's been waiting for arrives — but the handwriting belongs to someone she thought was dead.`,
        'Dialogue continuation': `"You knew," she said, not as an accusation but as a statement of tired fact. "You knew the whole time, and you let me believe otherwise."`,
        'Description expansion': `The room exhaled dust and old paper. Shelves lined three walls from floor to ceiling, crammed with volumes whose spines had faded to illegibility, their titles lost to time and light.`,
      }
      setOutput(map[mode] || `[AI Suggestion — ${mode}]\nFollowing your current writing: "${(text || '(start your story!)').slice(0, 80)}…"`)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const controls = (
    <>
      <span className="ai-shell__select-label">Mode</span>
      <select className="ai-shell__select" value={mode} onChange={e => setMode(e.target.value)}>
        {MODES.map(m => <option key={m}>{m}</option>)}
      </select>
    </>
  )

  const extraActions = output ? (
    <button className="btn btn--secondary btn--sm" onClick={() => onAccept?.(output)}>
      ✓ Accept &amp; Insert
    </button>
  ) : null

  return (
    <AIToolShell
      icon="💡"
      title="Inline AI Suggestions"
      description="Context-aware continuations — next sentence, paragraph, scene beat, or dialogue."
      badge="Inline AI"
      controls={controls}
      loading={loading}
      error={error}
      output={output}
      outputLabel="AI Suggestion"
      emptyIcon="💡"
      emptyTitle="Awaiting your writing"
      emptyHint="Choose a suggestion mode and click Ask AI."
      onGenerate={suggest}
      onRegenerate={suggest}
      onClear={() => setOutput('')}
      generateLabel="Ask AI"
      extraActions={extraActions}
    >
      <div className="field">
        <label className="field__label">Your current text (optional context)</label>
        <textarea className="field__textarea" rows={4} defaultValue={text} placeholder="Paste what you've written so far…" />
      </div>
    </AIToolShell>
  )
}
