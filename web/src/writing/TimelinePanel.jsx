import { useState } from 'react'
import './writing.css'

const DEMO_SCENES = [
  { id: 's1', title: 'Opening',      summary: 'Hero wakes to find the world changed.',                        characters: ['Aria'],              locations: ['Home'],        position: 0, color: '#a78bfa' },
  { id: 's2', title: 'First Threat', summary: 'A mysterious letter arrives.',                                  characters: ['Aria', 'Villain'],   locations: ['Post Office'], position: 1, color: '#f59e0b' },
  { id: 's3', title: 'Ally Found',   summary: 'Mira appears offering help at a price.',                        characters: ['Aria', 'Mira'],      locations: ['Café'],        position: 2, color: '#34d399' },
  { id: 's4', title: 'Betrayal',     summary: "Mira's true loyalties surface.",                                characters: ['Mira'],              locations: ['Warehouse'],   position: 3, color: '#f87171' },
  { id: 's5', title: 'Showdown',     summary: 'Everything converges at the old lighthouse.',                   characters: ['Aria', 'Villain', 'Mira'], locations: ['Lighthouse'], position: 4, color: '#60a5fa' },
]

export default function TimelinePanel() {
  const [scenes,  setScenes]  = useState(DEMO_SCENES)
  const [dragged, setDragged] = useState(null)

  const sorted = [...scenes].sort((a, b) => a.position - b.position)

  function handleDrop(targetIdx) {
    if (dragged === null || dragged === targetIdx) { setDragged(null); return }
    const next = [...sorted]
    const [moved] = next.splice(dragged, 1)
    next.splice(targetIdx, 0, moved)
    setScenes(next.map((s, i) => ({ ...s, position: i })))
    setDragged(null)
  }

  return (
    <div className="writing-panel">
      <div className="writing-panel__header">
        <span className="writing-panel__icon">📅</span>
        <div>
          <h2 className="writing-panel__title">Scene Timeline</h2>
          <p className="writing-panel__desc">Visualise and reorder your scenes on the story timeline. Drag to rearrange.</p>
        </div>
      </div>

      <div className="timeline">
        <div className="timeline__line" />
        {sorted.map((scene, idx) => (
          <div
            key={scene.id}
            className={`timeline__item${dragged === idx ? ' timeline__item--dragging' : ''}`}
            draggable
            onDragStart={() => setDragged(idx)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(idx)}
            onDragEnd={() => setDragged(null)}
          >
            <div className="timeline__dot" style={{ background: scene.color || '#8b5cf6' }} />
            <div className="timeline__card">
              <div className="timeline__card-num">#{idx + 1}</div>
              <div className="timeline__card-title">{scene.title}</div>
              {scene.summary && <div className="timeline__card-summary">{scene.summary}</div>}
              <div className="timeline__card-meta">
                {scene.characters?.length > 0 && (
                  <span className="timeline__tag timeline__tag--char">👤 {scene.characters.join(', ')}</span>
                )}
                {scene.locations?.length > 0 && (
                  <span className="timeline__tag timeline__tag--loc">📍 {scene.locations.join(', ')}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {sorted.length === 0 && (
        <p className="writing-panel__empty">No scenes yet. Add scenes via the Story Board.</p>
      )}
    </div>
  )
}
