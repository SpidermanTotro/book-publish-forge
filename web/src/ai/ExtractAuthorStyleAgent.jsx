import { useState } from 'react'
import AIToolShell from '../shared/AIToolShell.jsx'

const DEMO_STYLE = {
  genres: ['Fantasy', 'Adventure'],
  styleSummary: 'Lively first-person, tight pacing, punchy comic relief.',
  recurringThemes: ['Redemption', 'Family', 'The cost of power'],
  tropes: ['Mentor dies', 'Reluctant hero', 'Hidden royalty'],
  signatureWords: ['skirl', 'whinge', 'shadowglass'],
  mainCharacters: ['Evalyn Drake', 'Jax', 'The Black Queen'],
}

export default function ExtractAuthorStyleAgent({ scenes: _scenes = [], chapters: _chapters = [], characters: _characters = [] }) {
  const [style, setStyle]     = useState(null)
  const [output, setOutput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  async function extract() {
    setLoading(true); setError(null); setOutput(''); setStyle(null)
    try {
      await new Promise(r => setTimeout(r, 1000))
      setStyle(DEMO_STYLE)
      setOutput(
        `Genres: ${DEMO_STYLE.genres.join(', ')}\n` +
        `Style: ${DEMO_STYLE.styleSummary}\n\n` +
        `Themes: ${DEMO_STYLE.recurringThemes.join(', ')}\n` +
        `Tropes: ${DEMO_STYLE.tropes.join(', ')}\n` +
        `Signature words: ${DEMO_STYLE.signatureWords.join(', ')}\n` +
        `Key characters: ${DEMO_STYLE.mainCharacters.join(', ')}`
      )
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AIToolShell
      icon="🖊️"
      title="Author Style Extractor"
      description="Analyze your manuscript to identify writing style, recurring themes, signature words, and tropes."
      badge="Style AI"
      loading={loading}
      error={error}
      output={style ? null : output}
      outputLabel="Style Profile"
      emptyIcon="🖊️"
      emptyTitle="Style profile not yet extracted"
      emptyHint="Click Extract Style to analyze your manuscript's voice and patterns."
      onGenerate={extract}
      onRegenerate={extract}
      onClear={() => { setStyle(null); setOutput('') }}
      generateLabel="Extract Style"
    >
      {!loading && style && (
        <div className="fade-in">
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>Style Summary</p>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>{style.styleSummary}</p>
          </div>
          {[
            { label: 'Genres',           items: style.genres },
            { label: 'Recurring Themes', items: style.recurringThemes },
            { label: 'Common Tropes',    items: style.tropes },
            { label: 'Signature Words',  items: style.signatureWords },
            { label: 'Key Characters',   items: style.mainCharacters },
          ].map(({ label, items }) => (
            <div key={label} style={{ marginBottom: 'var(--space-4)' }}>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>{label}</p>
              <div className="chip-list">{items.map(item => <span key={item} className="chip">{item}</span>)}</div>
            </div>
          ))}
        </div>
      )}
    </AIToolShell>
  )
}
