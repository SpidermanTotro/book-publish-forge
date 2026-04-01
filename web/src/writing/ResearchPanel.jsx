import { useState } from 'react'
import './writing.css'

const PARENT_TYPES = ['character', 'location', 'scene']
const DEMO_NOTES = [
  { id: 'n1', parentType: 'character', parentId: 'Aria', text: 'Aria grew up near the sea; afraid of fire since childhood.', url: '', tags: ['backstory'] },
  { id: 'n2', parentType: 'location',  parentId: 'Lighthouse', text: 'Built 1887. Decommissioned 1963. Urban-explorer hotspot.', url: 'https://en.wikipedia.org/wiki/Lighthouse', tags: ['setting', 'history'] },
  { id: 'n3', parentType: 'scene',     parentId: 'Showdown', text: 'Weather: heavy rain. Reference: John Le Carré chapter openings.', url: '', tags: ['atmosphere'] },
]

export default function ResearchPanel() {
  const [notes,      setNotes]      = useState(DEMO_NOTES)
  const [parentType, setParentType] = useState('character')
  const [parentId,   setParentId]   = useState('')
  const [text,       setText]       = useState('')
  const [url,        setUrl]        = useState('')
  const [tags,       setTags]       = useState('')
  const [filterType, setFilterType] = useState('all')

  function addNote() {
    if (!text.trim() && !url.trim()) return
    setNotes(ns => [...ns, {
      id: 'n' + Date.now(),
      parentType,
      parentId: parentId.trim() || '(unlinked)',
      text: text.trim(),
      url: url.trim(),
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    }])
    setText(''); setUrl(''); setTags('')
  }

  function deleteNote(id) {
    setNotes(ns => ns.filter(n => n.id !== id))
  }

  const visible = filterType === 'all' ? notes : notes.filter(n => n.parentType === filterType)

  return (
    <div className="writing-panel">
      <div className="writing-panel__header">
        <span className="writing-panel__icon">🔬</span>
        <div>
          <h2 className="writing-panel__title">Research Notes</h2>
          <p className="writing-panel__desc">Link research, URLs, and references to any character, location, or scene.</p>
        </div>
      </div>

      {/* Add form */}
      <div className="research-form">
        <div className="research-form__row">
          <label className="research-form__label">Link to</label>
          <select className="writing-select" value={parentType} onChange={e => setParentType(e.target.value)}>
            {PARENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <input
            className="writing-input"
            value={parentId}
            onChange={e => setParentId(e.target.value)}
            placeholder={`${parentType} name / id`}
          />
        </div>
        <textarea
          className="writing-textarea"
          rows={3}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Note or research summary…"
        />
        <div className="research-form__row">
          <input
            className="writing-input"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Reference URL (optional)"
          />
          <input
            className="writing-input"
            style={{ maxWidth: 200 }}
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="Tags: setting, history…"
          />
          <button className="writing-btn" onClick={addNote}>+ Add Note</button>
        </div>
      </div>

      {/* Filter */}
      <div className="writing-panel__toolbar" style={{ marginTop: 'var(--space-4)' }}>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginRight: 8 }}>Show:</span>
        {['all', ...PARENT_TYPES].map(t => (
          <button
            key={t}
            className={`writing-btn writing-btn--ghost${filterType === t ? ' writing-btn--active' : ''}`}
            onClick={() => setFilterType(t)}
          >{t}</button>
        ))}
      </div>

      {/* Notes list */}
      <div className="research-notes">
        {visible.length === 0 && <p className="writing-panel__empty">No notes yet. Add one above.</p>}
        {visible.map(n => (
          <div key={n.id} className="research-note">
            <div className="research-note__meta">
              <span className="research-note__type">{n.parentType}</span>
              <span className="research-note__id">{n.parentId}</span>
              {n.tags.map(t => <span key={t} className="research-note__tag">{t}</span>)}
            </div>
            {n.text && <div className="research-note__text">{n.text}</div>}
            {n.url && (
              <a className="research-note__url" href={n.url} target="_blank" rel="noopener noreferrer">
                {n.url.length < 60 ? n.url : n.url.slice(0, 58) + '…'}
              </a>
            )}
            <button className="research-note__del" onClick={() => deleteNote(n.id)} title="Delete note">🗑</button>
          </div>
        ))}
      </div>
    </div>
  )
}
