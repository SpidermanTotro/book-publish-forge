import { useState } from 'react'
import AIToolShell from '../shared/AIToolShell.jsx'

const CONTEXT_OPTS = [
  { value: 'project', label: 'Whole Story', desc: 'Generate 5–8 major story beats for the entire novel.' },
  { value: 'chapter', label: 'Chapter',     desc: 'Suggest what should happen next in this chapter.' },
  { value: 'scene',   label: 'Next Scene',  desc: 'Suggest the next best scene that logically follows.' },
]

const GENRES = ['Fantasy', 'Thriller', 'Romance', 'Sci-Fi', 'Horror', 'Mystery', 'Literary Fiction', 'Historical']

export default function AIBeatSceneGeneratorPanel({ context: ctxProp = 'project', data: _data = {} }) {
  const [ctx, setCtx]         = useState(ctxProp)
  const [genre, setGenre]     = useState('Fantasy')
  const [output, setOutput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const selected = CONTEXT_OPTS.find(o => o.value === ctx)

  async function generate() {
    setLoading(true); setError(null); setOutput('')
    try {
      await new Promise(r => setTimeout(r, 850))
      const examples = {
        project: `1. Inciting incident disrupts the protagonist's world.\n2. Protagonist accepts the call to adventure.\n3. First major setback reveals the antagonist's power.\n4. Midpoint revelation changes protagonist's understanding.\n5. Allies are tested; one betrays the cause.\n6. Dark night of the soul—protagonist nearly gives up.\n7. Final confrontation and resolution.\n8. New equilibrium established with changed world.`,
        chapter: `1. The protagonist uncovers a troubling secret that recontextualizes past events.\n2. Conflict escalates with an unexpected new obstacle.\n3. An unlikely ally offers help at a price.\n4. Chapter closes on a revelation that demands action.`,
        scene: `The protagonist makes a pivotal choice between safety and principle—a decision that permanently alters their relationship with the story's central antagonist and raises the stakes for the final act.`,
      }
      setOutput(`Context: ${selected.label} | Genre: ${genre}\n\n${examples[ctx]}`)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const controls = (
    <>
      <span className="ai-shell__select-label">Genre</span>
      <select className="ai-shell__select" value={genre} onChange={e => setGenre(e.target.value)}>
        {GENRES.map(g => <option key={g}>{g}</option>)}
      </select>
    </>
  )

  return (
    <AIToolShell
      icon="🎬"
      title="Beat & Scene Generator"
      description="Generate story beats, chapter outlines, and scene ideas powered by AI."
      badge="Outline AI"
      controls={controls}
      loading={loading}
      error={error}
      output={output}
      outputLabel="Story Beats"
      emptyIcon="🎬"
      emptyTitle="Ready to generate beats"
      emptyHint="Choose your scope and genre, then click Generate."
      onGenerate={generate}
      onRegenerate={generate}
      onClear={() => setOutput('')}
      generateLabel="Generate Beats"
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
    </AIToolShell>
  )
}
