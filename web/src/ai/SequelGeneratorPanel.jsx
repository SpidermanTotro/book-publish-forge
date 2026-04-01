import { useState } from 'react'
import AIToolShell from '../shared/AIToolShell.jsx'

const TONES = ['Epic', 'Intimate', 'Darker', 'Lighter', 'Surprising twist', 'Character-focused']

const DEMO = {
  title: 'The Shadowglass Returns',
  summary: "Evalyn returns to confront her legacy. The Black Queen's secret threatens the world. Old enemies become allies as the true villain emerges from the shadows of history itself.",
  hookScene: 'Evalyn stands on the ruined battlements, shadows stirring at her call as dawn creeps over a haunted city. The shadowglass hangs cold at her belt — and for the first time in years, it pulses.',
}

export default function SequelGeneratorPanel({ author: _author = {}, lastProject: _lastProject = {}, onGenerated }) {
  const [tone, setTone]       = useState('Epic')
  const [sequel, setSequel]   = useState(null)
  const [output, setOutput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  async function generate() {
    setLoading(true); setError(null); setOutput(''); setSequel(null)
    try {
      await new Promise(r => setTimeout(r, 1100))
      setSequel(DEMO)
      setOutput(`**Title:** ${DEMO.title}\n\n**Summary:** ${DEMO.summary}\n\n**Opening Hook:**\n${DEMO.hookScene}`)
      onGenerated?.(DEMO)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const controls = (
    <>
      <span className="ai-shell__select-label">Sequel Tone</span>
      <select className="ai-shell__select" value={tone} onChange={e => setTone(e.target.value)}>
        {TONES.map(t => <option key={t}>{t}</option>)}
      </select>
    </>
  )

  return (
    <AIToolShell
      icon="📖"
      title="Sequel Generator"
      description="Generate a compelling sequel concept — new title, summary, and opening hook."
      badge="Series AI"
      controls={controls}
      loading={loading}
      error={error}
      output={sequel ? null : output}
      outputLabel="Sequel Concept"
      emptyIcon="📖"
      emptyTitle="No sequel generated yet"
      emptyHint="Select a tone and click Generate Sequel to start."
      onGenerate={generate}
      onRegenerate={generate}
      onClear={() => { setSequel(null); setOutput('') }}
      generateLabel="Generate Sequel"
    >
      {!loading && sequel && (
        <div className="fade-in">
          <div style={{ marginBottom: 'var(--space-5)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', marginBottom: 'var(--space-1)' }}>Title</p>
            <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>{sequel.title}</p>
          </div>
          <div style={{ marginBottom: 'var(--space-5)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>Summary</p>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{sequel.summary}</p>
          </div>
          <div>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>Opening Hook</p>
            <p style={{ fontSize: 'var(--text-base)', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.7, borderLeft: '3px solid var(--color-brand-400)', paddingLeft: 'var(--space-4)' }}>{sequel.hookScene}</p>
          </div>
        </div>
      )}
    </AIToolShell>
  )
}
