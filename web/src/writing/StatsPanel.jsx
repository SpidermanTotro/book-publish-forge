import { useMemo } from 'react'
import './writing.css'

// Demo project data; in production inject real project state here
const DEMO_PROJECT = {
  scenes: [
    { id: 's1', title: 'Opening',      text: 'Our hero wakes to find the world changed overnight. The sun rises red, an omen of things to come.' },
    { id: 's2', title: 'First Threat', text: 'A letter arrives sealed with black wax. The words inside are impossible: surrender everything or lose everyone.', updatedAt: new Date(Date.now() - 1 * 86400000).toISOString() },
    { id: 's3', title: 'Ally Found',   text: 'Mira slides into the booth across from Aria, uninvited. She knows things she should not.', updatedAt: new Date(Date.now() - 2 * 86400000).toISOString() },
    { id: 's4', title: 'Betrayal',     text: 'The message on Mira\'s phone tells Aria everything. Three years of friendship: a lie. Two choices remain.', updatedAt: new Date(Date.now() - 3 * 86400000).toISOString() },
    { id: 's5', title: 'Showdown',     text: 'Rain hammers the lighthouse glass. Villain steps from the shadows. Aria raises her hand — and chooses mercy. The arc closes.', updatedAt: new Date(Date.now() - 0 * 86400000).toISOString() },
  ],
  chapters: [
    { id: 'ch1', name: 'The Beginning' },
    { id: 'ch2', name: 'Rising Action' },
    { id: 'ch3', name: 'Climax' },
  ],
}

const DAILY_GOAL = 500   // words per day

export default function StatsPanel() {
  const stats = useMemo(() => {
    const scenes = DEMO_PROJECT.scenes
    const wordCount = scenes
      .map(s => (s.text || '').trim().split(/\s+/).filter(Boolean).length)
      .reduce((a, b) => a + b, 0)

    const perDay = {}
    scenes.forEach((s, i) => {
      const dt = s.updatedAt ? new Date(s.updatedAt) : new Date(Date.now() - 86400000 * (scenes.length - i))
      const key = dt.toISOString().slice(0, 10)
      perDay[key] = (perDay[key] || 0) + (s.text || '').trim().split(/\s+/).filter(Boolean).length
    })

    const days = Object.keys(perDay).sort()
    let streak = 0
    for (let i = days.length - 1; i >= 0; i--) {
      const expected = new Date(Date.now() - (days.length - 1 - i) * 86400000).toISOString().slice(0, 10)
      if (days[i] === expected) streak++; else break
    }

    const todayKey = new Date().toISOString().slice(0, 10)
    const todayWords = perDay[todayKey] || 0

    return { wordCount, scenes: scenes.length, chapters: DEMO_PROJECT.chapters.length, perDay, days, streak, todayWords }
  }, [])

  const todayPct = Math.min(100, Math.round((stats.todayWords / DAILY_GOAL) * 100))
  const maxDaily = Math.max(...Object.values(stats.perDay), 1)

  return (
    <div className="writing-panel">
      <div className="writing-panel__header">
        <span className="writing-panel__icon">📊</span>
        <div>
          <h2 className="writing-panel__title">Writing Stats</h2>
          <p className="writing-panel__desc">Word count, streaks, and daily progress at a glance.</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="stats-cards">
        <div className="stats-card">
          <div className="stats-card__value">{stats.wordCount.toLocaleString()}</div>
          <div className="stats-card__label">Total words</div>
        </div>
        <div className="stats-card">
          <div className="stats-card__value">{stats.scenes}</div>
          <div className="stats-card__label">Scenes</div>
        </div>
        <div className="stats-card">
          <div className="stats-card__value">{stats.chapters}</div>
          <div className="stats-card__label">Chapters</div>
        </div>
        <div className="stats-card stats-card--streak">
          <div className="stats-card__value">{stats.streak > 0 ? `🔥 ${stats.streak}` : '—'}</div>
          <div className="stats-card__label">Day streak</div>
        </div>
      </div>

      {/* Daily goal */}
      <div className="stats-goal">
        <div className="stats-goal__header">
          <span>Today: <b>{stats.todayWords}</b> / {DAILY_GOAL} words</span>
          <span style={{ color: todayPct >= 100 ? 'var(--color-success)' : 'var(--text-tertiary)' }}>
            {todayPct >= 100 ? '✓ Goal reached!' : `${todayPct}%`}
          </span>
        </div>
        <div className="stats-goal__bar">
          <div className="stats-goal__fill" style={{ width: `${todayPct}%` }} />
        </div>
      </div>

      {/* Bar chart */}
      {stats.days.length > 0 && (
        <div className="stats-chart">
          <div className="stats-chart__title">Words per day</div>
          <div className="stats-chart__bars">
            {stats.days.map(day => {
              const val = stats.perDay[day]
              const pct = Math.round((val / maxDaily) * 100)
              return (
                <div key={day} className="stats-chart__col" title={`${day}: ${val} words`}>
                  <div className="stats-chart__bar" style={{ height: `${pct}%` }} />
                  <div className="stats-chart__bar-label">{day.slice(5)}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Per-scene breakdown */}
      <details className="stats-details">
        <summary className="stats-details__summary">Per-scene word counts</summary>
        <ul className="stats-details__list">
          {DEMO_PROJECT.scenes.map(s => {
            const wc = (s.text || '').trim().split(/\s+/).filter(Boolean).length
            return <li key={s.id}><b>{s.title}</b>: {wc.toLocaleString()} words</li>
          })}
        </ul>
      </details>
    </div>
  )
}
