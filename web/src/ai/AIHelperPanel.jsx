import { useState } from 'react'
import AIToolShell from '../shared/AIToolShell.jsx'

const CONTEXT_OPTS = [
  { value: 'project',   label: 'Project Blurb', desc: 'Write a punchy back-cover blurb for your novel.' },
  { value: 'character', label: 'Character',      desc: 'Generate a vivid description for this character.' },
  { value: 'location',  label: 'Location',       desc: 'AI-prose a setting description for this place.' },
  { value: 'scene',     label: 'Scene Summary',  desc: 'Summarize and suggest next beats for a scene.' },
]

const STYLES = ['Neutral', 'Lyrical', 'Gritty', 'Whimsical', 'Tense', 'Nostalgic']

export default function AIHelperPanel({ context: ctxProp = 'project', data = {}, onCopy }) {
  const [ctx, setCtx]         = useState(ctxProp)
  const [style, setStyle]     = useState('Neutral')
  const [name, setName]       = useState(data.name || '')
  const [output, setOutput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const selected = CONTEXT_OPTS.find(o => o.value === ctx)

  async function generate() {
    setLoading(true); setError(null); setOutput('')
    try {
      await new Promise(r => setTimeout(r, 800))
      const results = {
        project:   `In a world teetering on the edge of collapse, ${name || 'our protagonist'} must choose between the safety of silence and the cost of truth. "${name || 'Book Title'}" is a gripping ${style.toLowerCase()} tale of resilience, sacrifice, and the enduring power of hope.`,
        character: `${name || 'The character'} moves through every room like a secret kept too long—sharp-eyed, deliberate, with hands that remember every wrong they've righted and every wrong they've caused. Their ${style.toLowerCase()} presence commands attention even in silence.`,
        location:  `${name || 'The location'} breathes with a ${style.toLowerCase()} life of its own: crumbling cornices catch the last light, while below, the streets hum with voices that have witnessed too much history to ever be truly quiet.`,
        scene:     `The scene establishes tension through contrast—light vs shadow, speech vs silence. Next beat suggestion: the catalyst that forces the protagonist's hand arrives unexpectedly, leaving no room for careful planning.`,
      }
      const result = results[ctx]
      setOutput(result)
      if (onCopy) onCopy(result)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const controls = (
    <>
      <span className="ai-shell__select-label">Writing Style</span>
      <select className="ai-shell__select" value={style} onChange={e => setStyle(e.target.value)}>
        {STYLES.map(s => <option key={s}>{s}</option>)}
      </select>
    </>
  )

  return (
    <AIToolShell
      icon="🪄"
      title="AI Writing Helper"
      description="Generate blurbs, character descriptions, location prose, and scene summaries."
      badge="Content AI"
      controls={controls}
      loading={loading}
      error={error}
      output={output}
      outputLabel="Generated Content"
      emptyIcon="🪄"
      emptyTitle="Ready to write"
      emptyHint="Choose a content type, enter a name, and click Generate."
      onGenerate={generate}
      onRegenerate={generate}
      onClear={() => setOutput('')}
      generateLabel="Generate Content"
    >
      <div className="segment" style={{ marginBottom: 'var(--space-4)' }}>
        {CONTEXT_OPTS.map(o => (
          <button
            key={o.value}
            className={`segment__btn${ctx === o.value ? ' segment__btn--active' : ''}`}
            onClick={() => setCtx(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
      {selected && (
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
          {selected.desc}
        </p>
      )}
      <div className="field">
        <label className="field__label">Name / Title</label>
        <input
          className="field__input"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={ctx === 'project' ? 'Book title…' : ctx === 'location' ? 'Location name…' : 'Character name…'}
        />
      </div>
    </AIToolShell>
  )
}
