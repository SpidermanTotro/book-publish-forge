import { useState } from 'react'
import './App.css'
import ManuscriptEditor        from './editor/ManuscriptEditor.jsx'
import AIAgentPanel            from './ai/AIAgentPanel.jsx'
import AIBeatSceneGeneratorPanel from './ai/AIBeatSceneGeneratorPanel.jsx'
import AIHelperPanel           from './ai/AIHelperPanel.jsx'
import AIPlotConsistencyAgent  from './ai/AIPlotConsistencyAgent.jsx'
import CompanionPanel          from './ai/CompanionPanel.jsx'
import CorrectionEnginePanel   from './ai/CorrectionEnginePanel.jsx'
import ExtractAuthorStyleAgent from './ai/ExtractAuthorStyleAgent.jsx'
import InlineAISuggestPanel    from './ai/InlineAISuggestPanel.jsx'
import SequelGeneratorPanel    from './ai/SequelGeneratorPanel.jsx'
import TurnBasedCoWritePanel   from './ai/TurnBasedCoWritePanel.jsx'
// Writing tools
import StoryBoardPanel   from './writing/StoryBoardPanel.jsx'
import TimelinePanel     from './writing/TimelinePanel.jsx'
import StoryMapPanel     from './writing/StoryMapPanel.jsx'
import ResearchPanel     from './writing/ResearchPanel.jsx'
import StatsPanel        from './writing/StatsPanel.jsx'
import WritingCoachPanel from './writing/WritingCoachPanel.jsx'
import CollabPanel       from './writing/CollabPanel.jsx'

const TOOL_GROUPS = [
  {
    label: 'Editor',
    tools: [
      { id: 'editor', label: 'Manuscript Editor', icon: '✍️', component: ManuscriptEditor, fullHeight: true },
    ],
  },
  {
    label: 'AI Writing Tools',
    tools: [
      { id: 'beat',       label: 'Beat Generator',     icon: '🎬', component: AIBeatSceneGeneratorPanel },
      { id: 'helper',     label: 'Writing Helper',      icon: '🪄', component: AIHelperPanel },
      { id: 'inline',     label: 'Inline Suggestions',  icon: '💡', component: InlineAISuggestPanel },
      { id: 'cowrite',    label: 'Co-Writing',          icon: '✍️', component: TurnBasedCoWritePanel },
      { id: 'agents',     label: 'Proofreading Agents', icon: '🔍', component: AIAgentPanel },
      { id: 'correction', label: 'Correction Engines',  icon: '⚙️', component: CorrectionEnginePanel },
      { id: 'plot',       label: 'Plot Checker',        icon: '🔎', component: AIPlotConsistencyAgent },
      { id: 'style',      label: 'Style Extractor',     icon: '🖊️', component: ExtractAuthorStyleAgent },
      { id: 'sequel',     label: 'Sequel Generator',    icon: '📖', component: SequelGeneratorPanel },
      { id: 'companion',  label: 'AI Companion',        icon: '🤝', component: CompanionPanel },
    ],
  },
  {
    label: 'Writing & Planning',
    tools: [
      { id: 'board',    label: 'Story Board',     icon: '🗂️', component: StoryBoardPanel },
      { id: 'timeline', label: 'Scene Timeline',  icon: '📅', component: TimelinePanel },
      { id: 'storymap', label: 'AI Story Map',    icon: '🗺️', component: StoryMapPanel },
      { id: 'research', label: 'Research Notes',  icon: '🔬', component: ResearchPanel },
      { id: 'stats',    label: 'Writing Stats',   icon: '📊', component: StatsPanel },
      { id: 'coach',    label: 'Writing Coach',   icon: '🎓', component: WritingCoachPanel },
      { id: 'collab',   label: 'Live Collab',     icon: '🤝', component: CollabPanel },
    ],
  },
]

const ALL_TOOLS = TOOL_GROUPS.flatMap(g => g.tools)

export default function App() {
  const [activeId,    setActiveId]    = useState('editor')
  const [theme,       setTheme]       = useState('light')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  function selectTool(id) {
    setActiveId(id)
    setSidebarOpen(false)
  }

  const activeTool = ALL_TOOLS.find(t => t.id === activeId) ?? null
  const ActiveTool = activeTool?.component ?? null
  const isFullHeight = activeTool?.fullHeight === true

  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <header className="app-navbar">
        <div className="app-navbar__left">
          <button className="app-navbar__menu-btn" onClick={() => setSidebarOpen(o => !o)} aria-label="Toggle menu">
            <span className="hamburger-icon">☰</span>
          </button>
          <div className="app-navbar__brand">
            <span className="app-navbar__logo" aria-hidden="true">📚</span>
            <span className="app-navbar__name">Book Publish Forge</span>
            <span className="app-navbar__sub">AI Writing Studio</span>
          </div>
        </div>
        <div className="app-navbar__right">
          <button className="btn btn--ghost btn--sm app-navbar__theme-btn" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </header>

      <div className="app-body">
        {/* Sidebar */}
        <nav className={`app-sidebar${sidebarOpen ? ' app-sidebar--open' : ''}`} aria-label="Tools">
          {TOOL_GROUPS.map(group => (
            <div key={group.label} className="app-sidebar__group">
              <div className="app-sidebar__label">{group.label}</div>
              <ul className="app-sidebar__list">
                {group.tools.map(tool => (
                  <li key={tool.id}>
                    <button
                      className={`app-sidebar__item${activeId === tool.id ? ' app-sidebar__item--active' : ''}`}
                      onClick={() => selectTool(tool.id)}
                    >
                      <span className="app-sidebar__item-icon" aria-hidden="true">{tool.icon}</span>
                      <span className="app-sidebar__item-label">{tool.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div className="app-sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
        )}

        {/* Main content */}
        <main className={`app-main${isFullHeight ? ' app-main--full-height' : ''}`}>
          {isFullHeight ? (
            ActiveTool && <ActiveTool />
          ) : (
            <div className="app-main__inner">
              {ActiveTool && <ActiveTool />}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
