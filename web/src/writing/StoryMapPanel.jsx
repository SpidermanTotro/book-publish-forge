import { useState } from 'react'
import AIToolShell from '../shared/AIToolShell.jsx'

const DEMO_PROJECT = {
  plotArcs: [{ name: 'Romance' }, { name: 'Revenge' }, { name: 'Redemption' }],
  characters: [{ name: 'Aria' }, { name: 'Villain' }, { name: 'Mira' }],
  scenes: 12,
}

export default function StoryMapPanel() {
  const [output,  setOutput]  = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function analyse() {
    setLoading(true); setOutput(''); setError('')
    try {
      await new Promise(r => setTimeout(r, 1300))
      const arcs  = DEMO_PROJECT.plotArcs.map(a => a.name).join(', ')
      const chars = DEMO_PROJECT.characters.map(c => c.name).join(', ')
      setOutput(
        `AI Story Map — ${DEMO_PROJECT.scenes} scenes analysed\n\n` +
        `ARCS: ${arcs}\nCHARACTERS: ${chars}\n\n` +
        `⚠ Arc "Romance": missing midpoint beat — no scene features Aria & Villain together in Chapters 4–7.\n` +
        `⚠ "Villain" disappears for 5 consecutive scenes (Ch.3–Ch.8). Add a complication or reminder.\n` +
        `⚠ Arc "Redemption" has no Act III payoff scene yet.\n\n` +
        `✓ "Aria" appears in all three acts — good protagonist visibility.\n` +
        `✓ "Mira" introduced at the midpoint, consistent with Rising Action arc.\n\n` +
        `Suggested next beat: a scene where Aria confronts Villain about the letter, revealing Mira's connection.`
      )
    } catch (e) {
      setError('Analysis failed: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AIToolShell
      icon="🗺️"
      title="AI Story Map"
      badge="Arc AI"
      description="Analyse your plot arcs and character visibility. Spot gaps and missing beats before you write them."
      loading={loading}
      loadingText="Mapping story arcs…"
      error={error}
      output={output}
      outputLabel="Story Map Analysis"
      emptyIcon="🗺️"
      emptyTitle="Ready to map your story"
      emptyHint="Click Analyse to let AI check your arcs, character visibility, and missing beats."
      onGenerate={analyse}
      onRegenerate={analyse}
      onClear={() => setOutput('')}
      generateLabel="Analyse Story"
    />
  )
}
