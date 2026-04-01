import { useState } from 'react'
import './writing.css'

const DEMO_CHAPTERS = [
  { id: 'ch1', name: 'Chapter 1 – The Beginning' },
  { id: 'ch2', name: 'Chapter 2 – Rising Action' },
  { id: 'ch3', name: 'Chapter 3 – Climax' },
]

const DEMO_SCENES = [
  { id: 's1', chapterId: 'ch1', title: 'Opening scene', labels: ['intro'], color: '#e6f7fa', text: 'Our hero wakes up to find the world changed overnight.' },
  { id: 's2', chapterId: 'ch1', title: 'First conflict',  labels: ['conflict'], color: '#fef9e7', text: 'A mysterious letter arrives with an impossible demand.' },
  { id: 's3', chapterId: 'ch2', title: 'New ally',        labels: ['character'], color: '#eafaf1', text: 'Mira appears, offering help in exchange for a secret.' },
  { id: 's4', chapterId: 'ch2', title: 'Betrayal',        labels: ['plot-twist'], color: '#fdecea', text: 'The ally turns out to have her own agenda.' },
  { id: 's5', chapterId: 'ch3', title: 'Showdown',        labels: ['action'], color: '#f5eef8', text: 'Everything converges at the old lighthouse.' },
]

const LABEL_COLORS = ['#8ec', '#fd9', '#fb8', '#e8e', '#baf', '#6ef', '#fdc']

export default function StoryBoardPanel() {
  const [chapters, setChapters]   = useState(DEMO_CHAPTERS)
  const [scenes,   setScenes]     = useState(DEMO_SCENES)
  const [filter,   setFilter]     = useState('')
  const [dragged,  setDragged]    = useState(null)
  const [newChName, setNewChName] = useState('')

  function addChapter() {
    const name = newChName.trim() || `Chapter ${chapters.length + 1}`
    setChapters(cs => [...cs, { id: 'ch' + Date.now(), name }])
    setNewChName('')
  }

  function addScene(chapterId) {
    const title = window.prompt('Scene title:')
    if (!title) return
    setScenes(ss => [...ss, {
      id: 's' + Date.now(), chapterId, title, labels: [], color: '#e6f7fa', text: ''
    }])
  }

  function updateScene(id, updates) {
    setScenes(ss => ss.map(s => s.id === id ? { ...s, ...updates } : s))
  }

  function deleteScene(id) {
    setScenes(ss => ss.filter(s => s.id !== id))
  }

  function handleDragStart(chapterId, idx) {
    setDragged({ chapterId, idx })
  }

  function handleDrop(targetChapterId, targetIdx) {
    if (!dragged) return
    const src = { ...dragged }
    setDragged(null)
    setScenes(prev => {
      const byChapter = {}
      chapters.forEach(ch => { byChapter[ch.id] = [] })
      prev.forEach(s => { (byChapter[s.chapterId] || (byChapter[s.chapterId] = [])).push(s) })
      const moving = byChapter[src.chapterId]?.[src.idx]
      if (!moving) return prev
      byChapter[src.chapterId].splice(src.idx, 1)
      const target = byChapter[targetChapterId] || []
      target.splice(targetIdx, 0, { ...moving, chapterId: targetChapterId })
      byChapter[targetChapterId] = target
      return Object.values(byChapter).flat()
    })
  }

  const visibleScenes = filter
    ? scenes.filter(s =>
        s.title.toLowerCase().includes(filter.toLowerCase()) ||
        s.labels.join(',').toLowerCase().includes(filter.toLowerCase()))
    : scenes

  const byChapter = {}
  chapters.forEach(ch => { byChapter[ch.id] = [] })
  visibleScenes.forEach(s => {
    const col = s.chapterId in byChapter ? s.chapterId : chapters[0]?.id
    if (col) byChapter[col].push(s)
  })

  return (
    <div className="writing-panel">
      <div className="writing-panel__header">
        <span className="writing-panel__icon">🗂️</span>
        <div>
          <h2 className="writing-panel__title">Story Board</h2>
          <p className="writing-panel__desc">Drag &amp; drop scenes across chapters — Kanban-style outline.</p>
        </div>
      </div>

      <div className="writing-panel__toolbar">
        <input
          className="writing-input"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Filter scenes by title / label…"
        />
        <input
          className="writing-input"
          style={{ maxWidth: 220 }}
          value={newChName}
          onChange={e => setNewChName(e.target.value)}
          placeholder="New chapter name…"
          onKeyDown={e => e.key === 'Enter' && addChapter()}
        />
        <button className="writing-btn" onClick={addChapter}>+ Chapter</button>
      </div>

      <div className="board">
        {chapters.map(ch => (
          <div key={ch.id} className="board__column">
            <div className="board__column-header">{ch.name}</div>
            <div className="board__cards">
              {byChapter[ch.id]?.map((scene, idx) => (
                <div
                  key={scene.id}
                  className={`board__card${dragged?.chapterId === ch.id && dragged.idx === idx ? ' board__card--dragging' : ''}`}
                  style={{ borderLeft: `4px solid ${scene.color || '#8b5cf6'}` }}
                  draggable
                  onDragStart={() => handleDragStart(ch.id, idx)}
                  onDragOver={e => e.preventDefault()}
                  onDrop={() => handleDrop(ch.id, idx)}
                  onDragEnd={() => setDragged(null)}
                >
                  <div className="board__card-title">{scene.title}</div>
                  <div className="board__card-labels">
                    {scene.labels.map((l, i) => (
                      <span key={l} className="board__label" style={{ background: LABEL_COLORS[i % LABEL_COLORS.length] }}>{l}</span>
                    ))}
                  </div>
                  {scene.text && (
                    <div className="board__card-preview">{scene.text.slice(0, 80)}{scene.text.length > 80 ? '…' : ''}</div>
                  )}
                  <div className="board__card-actions">
                    <button className="board__card-btn" onClick={() => {
                      const lbl = window.prompt('Add label:')
                      if (lbl) updateScene(scene.id, { labels: [...new Set([...scene.labels, lbl])] })
                    }}>+ Label</button>
                    <input
                      type="color"
                      value={scene.color || '#e6f7fa'}
                      onChange={e => updateScene(scene.id, { color: e.target.value })}
                      title="Card colour"
                      style={{ width: 24, height: 24, border: 'none', padding: 0, cursor: 'pointer', background: 'transparent' }}
                    />
                    <button className="board__card-btn board__card-btn--del" onClick={() => deleteScene(scene.id)}>✕</button>
                  </div>
                </div>
              ))}
              <div
                className="board__drop-end"
                onDragOver={e => e.preventDefault()}
                onDrop={() => handleDrop(ch.id, byChapter[ch.id]?.length ?? 0)}
              />
            </div>
            <button className="writing-btn writing-btn--ghost board__add-scene" onClick={() => addScene(ch.id)}>+ Scene</button>
          </div>
        ))}
      </div>
    </div>
  )
}
