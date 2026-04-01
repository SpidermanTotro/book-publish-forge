import { useState, useRef, useEffect, useCallback } from 'react'
import AIBeatSceneGeneratorPanel from '../ai/AIBeatSceneGeneratorPanel.jsx'
import AIHelperPanel             from '../ai/AIHelperPanel.jsx'
import InlineAISuggestPanel      from '../ai/InlineAISuggestPanel.jsx'
import TurnBasedCoWritePanel     from '../ai/TurnBasedCoWritePanel.jsx'
import AIAgentPanel              from '../ai/AIAgentPanel.jsx'
import CorrectionEnginePanel     from '../ai/CorrectionEnginePanel.jsx'
import AIPlotConsistencyAgent    from '../ai/AIPlotConsistencyAgent.jsx'
import ExtractAuthorStyleAgent   from '../ai/ExtractAuthorStyleAgent.jsx'
import SequelGeneratorPanel      from '../ai/SequelGeneratorPanel.jsx'
import CompanionPanel            from '../ai/CompanionPanel.jsx'
import './ManuscriptEditor.css'

const AI_TOOLS = [
  { id: 'inline',     label: 'Inline AI',    icon: '💡', component: InlineAISuggestPanel },
  { id: 'cowrite',    label: 'Co-Write',      icon: '✍️', component: TurnBasedCoWritePanel },
  { id: 'beat',       label: 'Beat Gen',      icon: '🎬', component: AIBeatSceneGeneratorPanel },
  { id: 'helper',     label: 'Helper',        icon: '🪄', component: AIHelperPanel },
  { id: 'agents',     label: 'Proofread',     icon: '🔍', component: AIAgentPanel },
  { id: 'correction', label: 'Correction',    icon: '⚙️', component: CorrectionEnginePanel },
  { id: 'plot',       label: 'Plot Check',    icon: '🔎', component: AIPlotConsistencyAgent },
  { id: 'style',      label: 'Style',         icon: '🖊️', component: ExtractAuthorStyleAgent },
  { id: 'sequel',     label: 'Sequel',        icon: '📖', component: SequelGeneratorPanel },
  { id: 'companion',  label: 'Companion',     icon: '🤝', component: CompanionPanel },
]

/** Lightweight debounce hook */
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

/**
 * ManuscriptEditor
 *
 * A split-pane writing canvas:
 *  - Left:  rich textarea with inline ghost suggestion (Tab to accept, Esc to dismiss)
 *  - Right: switchable AI tool panel wired to the editor (Insert at cursor / Accept)
 *
 * Turn-based co-writing mode shows alternating human/AI paragraphs in the left pane.
 */
export default function ManuscriptEditor() {
  // ── Editor state ──────────────────────────────────────────────────
  const [text, setText]             = useState('')
  const [activeTool, setActiveTool] = useState('inline')

  // ── Inline ghost suggestion ───────────────────────────────────────
  const [suggestion, setSuggestion]   = useState('')
  const [fetchingSug, setFetchingSug] = useState(false)
  const debouncedText = useDebounce(text, 1500)
  const textareaRef   = useRef(null)
  const cursorPosRef  = useRef(0)

  // Fetch a ghost suggestion after 1.5 s of no typing
  useEffect(() => {
    if (!debouncedText.trim() || activeTool !== 'inline') {
      setSuggestion('')
      return
    }
    let cancelled = false
    setFetchingSug(true)

    // Simulate async AI call (replace with real Ollama fetch in production)
    const timer = setTimeout(() => {
      if (cancelled) return
      const endings = [
        ' She paused, fingers hovering over the keys, and listened.',
        ' The silence that followed was heavier than any answer.',
        ' Something in the distance moved — or perhaps it was only the light.',
        ' He had not expected it to feel this ordinary.',
        ' The door was open, and on the other side waited everything she feared.',
      ]
      setSuggestion(endings[Math.floor(Math.random() * endings.length)])
      setFetchingSug(false)
    }, 400)

    return () => { cancelled = true; clearTimeout(timer) }
  }, [debouncedText, activeTool])

  function acceptSuggestion() {
    if (!suggestion) return
    const ta = textareaRef.current
    const pos = cursorPosRef.current
    const before = text.slice(0, pos)
    const after  = text.slice(pos)
    const newText = before + suggestion + after
    setText(newText)
    setSuggestion('')
    // restore cursor after the inserted suggestion
    requestAnimationFrame(() => {
      if (ta) {
        const newPos = pos + suggestion.length
        ta.setSelectionRange(newPos, newPos)
        ta.focus()
      }
    })
  }

  function dismissSuggestion() {
    setSuggestion('')
  }

  function handleKeyDown(e) {
    if (suggestion) {
      if (e.key === 'Tab') {
        e.preventDefault()
        acceptSuggestion()
        return
      }
      if (e.key === 'Escape') {
        dismissSuggestion()
        return
      }
    }
  }

  function handleTextChange(e) {
    cursorPosRef.current = e.target.selectionStart
    setText(e.target.value)
    setSuggestion('')           // clear stale suggestion while typing
  }

  function handleSelect(e) {
    cursorPosRef.current = e.target.selectionStart
  }

  // ── Insert AI output at cursor ────────────────────────────────────
  const insertAtCursor = useCallback((aiOutput) => {
    if (!aiOutput) return
    const ta  = textareaRef.current
    const pos = cursorPosRef.current
    const before = text.slice(0, pos)
    const after  = text.slice(pos)
    const sep    = before.length > 0 && !before.endsWith('\n\n') ? '\n\n' : ''
    const newText = before + sep + aiOutput.trim() + '\n\n' + after
    setText(newText)
    setSuggestion('')
    const newPos = (before + sep + aiOutput.trim() + '\n\n').length
    requestAnimationFrame(() => {
      if (ta) {
        ta.setSelectionRange(newPos, newPos)
        ta.focus()
      }
    })
  }, [text])

  // ── Turn-based co-write ───────────────────────────────────────────
  const [coWriteMode, setCoWriteMode] = useState(false)
  const [turns, setTurns]             = useState([])   // [{author:'human'|'ai', text:string}]
  const [humanDraft, setHumanDraft]   = useState('')

  function handleCoWriteNewText(updater) {
    // TurnBasedCoWritePanel calls onNewText(prev => prev + '\n' + aiText)
    const aiText = typeof updater === 'function'
      ? updater('').replace(/^\n/, '')
      : String(updater)
    setTurns(prev => [...prev, { author: 'ai', text: aiText.trim() }])
    // Also append to main text so other tools see it
    setText(prev => prev + (prev ? '\n\n' : '') + aiText.trim())
  }

  function submitHumanTurn() {
    if (!humanDraft.trim()) return
    setTurns(prev => [...prev, { author: 'human', text: humanDraft.trim() }])
    setText(prev => prev + (prev ? '\n\n' : '') + humanDraft.trim())
    setHumanDraft('')
  }

  // ── Render active AI tool ─────────────────────────────────────────
  const toolDef = AI_TOOLS.find(t => t.id === activeTool) ?? AI_TOOLS[0]
  const ToolComponent = toolDef.component

  const toolProps = {
    text,
    onAccept:   insertAtCursor,
    onNewText:  handleCoWriteNewText,
    context:    { wordCount: text.split(/\s+/).filter(Boolean).length },
  }

  // ── Word count ────────────────────────────────────────────────────
  const wordCount = text.split(/\s+/).filter(Boolean).length

  return (
    <div className="mse-root">
      {/* ── Left pane: editor ───────────────────────────────────── */}
      <div className="mse-editor-pane">
        {/* Toolbar */}
        <div className="mse-toolbar">
          <span className="mse-toolbar__title">📝 Manuscript Editor</span>
          <div className="mse-toolbar__actions">
            <button
              className={`btn btn--sm ${coWriteMode ? 'btn--primary' : 'btn--secondary'}`}
              onClick={() => setCoWriteMode(v => !v)}
              title="Toggle turn-based co-writing with colour coding"
            >
              {coWriteMode ? '✍️ Co-Write ON' : '✍️ Co-Write'}
            </button>
            <span className="mse-toolbar__wordcount">{wordCount.toLocaleString()} words</span>
          </div>
        </div>

        {/* Turn-based view (co-write mode) */}
        {coWriteMode && turns.length > 0 && (
          <div className="mse-turns">
            {turns.map((turn, i) => (
              <div key={i} className={`mse-turn mse-turn--${turn.author}`}>
                <span className="mse-turn__label">{turn.author === 'human' ? '🧑 You' : '🤖 AI'}</span>
                <p className="mse-turn__text">{turn.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Main editor textarea */}
        {coWriteMode ? (
          <div className="mse-cowrite-input">
            <textarea
              className="mse-textarea mse-textarea--human"
              value={humanDraft}
              onChange={e => setHumanDraft(e.target.value)}
              placeholder="Write your section here, then hand off to the AI…"
              rows={6}
            />
            <button
              className="btn btn--primary btn--sm mse-cowrite-submit"
              onClick={submitHumanTurn}
              disabled={!humanDraft.trim()}
            >
              Add my turn →
            </button>
          </div>
        ) : (
          <div className="mse-editor-area">
            <textarea
              ref={textareaRef}
              className="mse-textarea"
              value={text}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              onSelect={handleSelect}
              onClick={handleSelect}
              placeholder="Start writing your manuscript here…"
              spellCheck
              autoComplete="off"
            />

            {/* Ghost suggestion strip */}
            {(suggestion || fetchingSug) && (
              <div className="mse-ghost-strip">
                {fetchingSug ? (
                  <span className="mse-ghost-strip__text mse-ghost-strip__text--loading">
                    AI is thinking…
                  </span>
                ) : (
                  <>
                    <span className="mse-ghost-strip__text">{suggestion}</span>
                    <div className="mse-ghost-strip__actions">
                      <kbd className="mse-ghost-strip__kbd" onClick={acceptSuggestion} title="Accept suggestion">
                        Tab ↹ accept
                      </kbd>
                      <kbd className="mse-ghost-strip__kbd mse-ghost-strip__kbd--dismiss" onClick={dismissSuggestion} title="Dismiss">
                        Esc
                      </kbd>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Right pane: AI sidebar ──────────────────────────────── */}
      <div className="mse-ai-pane">
        {/* Tool picker tabs */}
        <div className="mse-ai-tabs" role="tablist">
          {AI_TOOLS.map(tool => (
            <button
              key={tool.id}
              role="tab"
              aria-selected={activeTool === tool.id}
              className={`mse-ai-tab${activeTool === tool.id ? ' mse-ai-tab--active' : ''}`}
              onClick={() => { setActiveTool(tool.id); setSuggestion('') }}
              title={tool.label}
            >
              <span aria-hidden="true">{tool.icon}</span>
              <span className="mse-ai-tab__label">{tool.label}</span>
            </button>
          ))}
        </div>

        {/* Active tool */}
        <div className="mse-ai-content">
          <ToolComponent {...toolProps} />
        </div>
      </div>
    </div>
  )
}
