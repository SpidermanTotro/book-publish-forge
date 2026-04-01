import { useState, useEffect } from 'react'
import AIToolShell from '../shared/AIToolShell.jsx'

const INACTIVITY_THRESHOLD_MINUTES = 6

export default function CompanionPanel({ isOnline = true, onOfflinePrompt }) {
  const [inactivity, setInactivity] = useState(0)
  const [output, setOutput]         = useState('')
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(null)

  useEffect(() => {
    const timer = setInterval(() => setInactivity(i => i + 1), 60_000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (inactivity > INACTIVITY_THRESHOLD_MINUTES && !output) {
      setOutput("You've been away for a while — want a quick warm-up prompt or scene review?")
      onOfflinePrompt?.()
    }
  }, [inactivity, output, onOfflinePrompt])

  async function guide() {
    setLoading(true); setError(null); setOutput('')
    try {
      await new Promise(r => setTimeout(r, 700))
      setOutput(isOnline
        ? "Holistic analysis complete. The subplot you started in Act I is still unresolved in Act III. Consider adding a bridge scene in Chapter 11 to tie it back to the main arc before the climax."
        : "Offline mode active — local AI is running. Continuity check: your last scene is consistent with established character motivations. Tip: the secondary antagonist hasn't appeared since Chapter 6.")
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const statusEl = (
    <div className="companion-status">
      <span className={`status-dot status-dot--${isOnline ? 'online' : 'offline'}`} />
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
        {isOnline ? 'Connected — cloud AI available' : 'Offline — local AI active'}
      </span>
      {inactivity > 0 && (
        <span style={{ marginLeft: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
          Idle: {inactivity} min
        </span>
      )}
    </div>
  )

  return (
    <AIToolShell
      icon="🤝"
      title="AI Companion"
      description="Your always-on writing assistant — provides continuity tips, warm-up prompts, and story guidance."
      badge="Companion"
      loading={loading}
      error={error}
      output={output}
      outputLabel="Companion Guidance"
      emptyIcon="🤝"
      emptyTitle="AI Companion is ready"
      emptyHint="Click Guide Me for personalized story and writing tips."
      onGenerate={guide}
      onRegenerate={guide}
      onClear={() => { setOutput(''); setInactivity(0) }}
      generateLabel="Guide Me"
      regenerateLabel="Ask Again"
    >
      <div style={{ marginBottom: 'var(--space-4)' }}>{statusEl}</div>
    </AIToolShell>
  )
}
