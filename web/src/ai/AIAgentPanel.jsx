import { useState } from 'react'
import AIToolShell from '../shared/AIToolShell.jsx'

const AGENTS = [
  { id: 'tone',     label: 'Tone Checker',         desc: 'Check if the passage matches the target mood, genre, or tone.' },
  { id: 'voice',    label: 'Voice Consistency',     desc: 'Verify the passage matches the established narrative voice.' },
  { id: 'dialogue', label: 'In-Character Dialogue', desc: "Check that all character speech matches each character's voice." },
  { id: 'grammar',  label: 'Grammar & Spelling',    desc: 'Proofread for grammar, spelling, and basic style issues.' },
]

const TONES = ['Auto-detect', 'Literary', 'Commercial', 'Genre (Fantasy)', 'Genre (Thriller)', 'Romance', 'Horror', 'Humorous']

export default function AIAgentPanel({ text = '', context = {} }) {
  const [agentId, setAgentId] = useState('tone')
  const [tone, setTone]       = useState('Auto-detect')
  const [output, setOutput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const agent = AGENTS.find(a => a.id === agentId)

  async function run() {
    setLoading(true); setError(null); setOutput('')
    try {
      await new Promise(r => setTimeout(r, 900))
      setOutput(
        `Agent: ${agent.label}\nTone preset: ${tone}\n\n` +
        `[AI Output]\nThis passage has been analyzed for ${agent.label.toLowerCase()}.\n` +
        `Context: ${context.project?.genre ?? 'unknown genre'}\n\n` +
        `Excerpt analyzed:\n"${(text || '(no text provided)').slice(0, 300)}"\n\n` +
        `Suggestions:\n• Consider adjusting sentence rhythm for better pacing.\n• Voice feels consistent overall.\n• Two grammar improvements flagged in lines 3 and 7.`
      )
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const controls = (
    <>
      <span className="ai-shell__select-label">Tone</span>
      <select className="ai-shell__select" value={tone} onChange={e => setTone(e.target.value)}>
        {TONES.map(t => <option key={t}>{t}</option>)}
      </select>
    </>
  )

  return (
    <AIToolShell
      icon="🔍"
      title="AI Proofreading Agents"
      description="Run specialized AI agents to check tone, voice, dialogue, and grammar."
      badge="4 agents"
      controls={controls}
      loading={loading}
      error={error}
      output={output}
      outputLabel="Agent Report"
      emptyIcon="🔍"
      emptyTitle="Select an agent and run"
      emptyHint="Pick an agent below, paste your text, then click Run Agent."
      onGenerate={run}
      onRegenerate={run}
      onClear={() => setOutput('')}
      generateLabel="Run Agent"
    >
      <div className="segment" style={{ marginBottom: 'var(--space-4)' }}>
        {AGENTS.map(a => (
          <button
            key={a.id}
            className={`segment__btn${agentId === a.id ? ' segment__btn--active' : ''}`}
            onClick={() => setAgentId(a.id)}
          >
            {a.label}
          </button>
        ))}
      </div>
      {agent && (
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
          {agent.desc}
        </p>
      )}
      <div className="field">
        <label className="field__label">Text to analyze</label>
        <textarea
          className="field__textarea"
          rows={5}
          defaultValue={text}
          placeholder="Paste your scene or chapter here…"
        />
      </div>
    </AIToolShell>
  )
}
