import { useState } from 'react'
import './App.css'
import AIAgentPanel from './ai/AIAgentPanel.jsx'
import AIBeatSceneGeneratorPanel from './ai/AIBeatSceneGeneratorPanel.jsx'
import AIHelperPanel from './ai/AIHelperPanel.jsx'
import AIPlotConsistencyAgent from './ai/AIPlotConsistencyAgent.jsx'
import CompanionPanel from './ai/CompanionPanel.jsx'
import CorrectionEnginePanel from './ai/CorrectionEnginePanel.jsx'
import ExtractAuthorStyleAgent from './ai/ExtractAuthorStyleAgent.jsx'
import InlineAISuggestPanel from './ai/InlineAISuggestPanel.jsx'
import SequelGeneratorPanel from './ai/SequelGeneratorPanel.jsx'
import TurnBasedCoWritePanel from './ai/TurnBasedCoWritePanel.jsx'

const TOOLS = [
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
]

export default function App() {
  const [activeId, setActiveId]     = useState('beat')
  const [theme, setTheme]           = useState('light')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  const ActiveTool = TOOLS.find(t => t.id === activeId)?.component ?? null

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
        <nav className={`app-sidebar${sidebarOpen ? ' app-sidebar--open' : ''}`} aria-label="AI Tools">
          <div className="app-sidebar__label">AI Writing Tools</div>
          <ul className="app-sidebar__list">
            {TOOLS.map(tool => (
              <li key={tool.id}>
                <button
                  className={`app-sidebar__item${activeId === tool.id ? ' app-sidebar__item--active' : ''}`}
                  onClick={() => { setActiveId(tool.id); setSidebarOpen(false) }}
                >
                  <span className="app-sidebar__item-icon" aria-hidden="true">{tool.icon}</span>
                  <span className="app-sidebar__item-label">{tool.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div className="app-sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
        )}

        {/* Main content */}
        <main className="app-main">
          <div className="app-main__inner">
            {ActiveTool && <ActiveTool />}
          </div>
        </main>
      </div>
    </div>
  )
}
