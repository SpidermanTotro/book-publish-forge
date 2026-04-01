import { useState } from 'react'
import AIToolShell from '../shared/AIToolShell.jsx'

const LEVELS = ['starter', 'medium', 'advanced']

const SKILL_MAP = {
  starter: {
    label: 'Starter',
    badge: 'Writing Coach',
    desc: 'Master structure, inspiration, and basic storytelling. Bite-sized tips and encouragement.',
    challenges: [
      'Write a 3-sentence scene featuring a surprise.',
      'Describe a character using all 5 senses.',
      'Rewrite a paragraph using only short sentences (≤8 words each).',
    ],
  },
  medium: {
    label: 'Medium',
    badge: 'Writing Coach',
    desc: 'Sharpen style, voice, and pacing. Real writer\'s workshop challenges.',
    challenges: [
      'Edit for pacing: cut 2 unnecessary sentences from a scene.',
      'Turn 1 paragraph of narration into dialogue.',
      'Mirror the style of a famous author in one passage.',
    ],
  },
  advanced: {
    label: 'Advanced',
    badge: 'Writing Coach',
    desc: 'Theme, subtext, and craft mastery. Tough AI critiques required.',
    challenges: [
      'Weave a running motif or echo across three scenes.',
      'Hide a clue for the reader — foreshadow subtly without telegraphing.',
      'Identify and remove every cliché in a passage.',
    ],
  },
}

const DEMO_FEEDBACK = {
  starter: 'Great start! Try being even more specific — instead of "the sun was bright", try "the sun pressed against her eyelids like a warm hand." Specificity = power.',
  medium:  'Nice dialogue! Watch out for adverbs ("said quietly") — show the quiet in the action instead. Cut "very" wherever you find it.',
  advanced: 'Masterful foreshadowing! The raven motif lands perfectly in Chapter 3. Spotted clichés: "brave as a lion" (Ch.1) and "heart of gold" (Ch.2) — both cut-worthy.',
}

export default function WritingCoachPanel() {
  const [level,    setLevel]    = useState('starter')
  const [output,   setOutput]   = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [_challenge, setChallenge] = useState('')

  const skill = SKILL_MAP[level]

  async function getAIFeedback(ch) {
    setChallenge(ch)
    setLoading(true); setOutput(''); setError('')
    try {
      await new Promise(r => setTimeout(r, 950))
      setOutput(`Challenge: "${ch}"\n\n` + DEMO_FEEDBACK[level])
    } catch (e) {
      setError('Feedback failed: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  const controls = (
    <>
      <span className="ai-shell__select-label">Skill Level</span>
      <select className="ai-shell__select" value={level} onChange={e => { setLevel(e.target.value); setOutput('') }}>
        {LEVELS.map(l => <option key={l} value={l}>{SKILL_MAP[l].label}</option>)}
      </select>
    </>
  )

  const challengeButtons = (
    <div style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
        {skill.desc}
      </p>
      <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>
        Pick a challenge to get AI feedback:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {skill.challenges.map((ch, i) => (
          <button
            key={i}
            className="writing-btn writing-btn--ghost"
            style={{ textAlign: 'left', justifyContent: 'flex-start' }}
            onClick={() => getAIFeedback(ch)}
          >
            {ch}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <AIToolShell
      icon="🎓"
      title="Writing Coach"
      badge={skill.badge}
      description="Level up your craft with targeted challenges and instant AI feedback."
      controls={controls}
      loading={loading}
      loadingText="AI is reviewing your writing…"
      error={error}
      output={output}
      outputLabel="AI Feedback"
      emptyIcon="🎓"
      emptyTitle={`${skill.label} — pick a challenge`}
      emptyHint="Select a skill level and click a challenge below to receive AI feedback."
      onClear={() => { setOutput(''); setChallenge('') }}
    >
      {challengeButtons}
    </AIToolShell>
  )
}
