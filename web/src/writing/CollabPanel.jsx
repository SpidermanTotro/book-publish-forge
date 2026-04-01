import { useState, useRef, useEffect } from 'react'
import './writing.css'

const DEMO_COLLAB = [
  { user: 'Alice',  type: 'human', text: 'Rewrote the opening paragraph — tighter pacing.',        time: '09:41' },
  { user: 'ai',     type: 'ai',    text: 'Suggested: "The door swung open before she knocked."',   time: '09:42' },
  { user: 'Bob',    type: 'human', text: 'Accepted AI suggestion in Scene 3.',                     time: '09:43' },
  { user: 'ai',     type: 'ai',    text: 'Plot note: Villain hasn\'t appeared since Ch.3.',        time: '09:44' },
  { user: 'Alice',  type: 'human', text: 'Added new scene: "Lighthouse approach".',                time: '09:47' },
]

const ME = { id: 'me', name: 'You' }

export default function CollabPanel() {
  const [activity, setActivity] = useState(DEMO_COLLAB)
  const [msgs,     setMsgs]     = useState([])
  const [msg,      setMsg]      = useState('')
  const chatRef = useRef()

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [msgs])

  function sendMsg(e) {
    e.preventDefault()
    if (!msg.trim()) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMsgs(ms => [...ms, { user: ME.name, text: msg.trim(), time: now }])
    setActivity(a => [...a, { user: ME.name, type: 'human', text: msg.trim(), time: now }])
    setMsg('')
  }

  return (
    <div className="writing-panel">
      <div className="writing-panel__header">
        <span className="writing-panel__icon">🤝</span>
        <div>
          <h2 className="writing-panel__title">Live Collab &amp; Chat</h2>
          <p className="writing-panel__desc">Real-time co-writer activity feed and writing-room chat.</p>
        </div>
      </div>

      <div className="collab-layout">
        {/* Activity feed */}
        <div className="collab-feed">
          <div className="collab-feed__title">Co-writer Activity</div>
          <ul className="collab-feed__list">
            {activity.slice(-10).map((a, i) => (
              <li key={i} className={`collab-feed__item collab-feed__item--${a.type}`}>
                <span className="collab-feed__who">{a.type === 'ai' ? '🤖 AI' : `@${a.user}`}</span>
                <span className="collab-feed__text">{a.text.slice(0, 72)}{a.text.length > 72 ? '…' : ''}</span>
                <span className="collab-feed__time">{a.time}</span>
              </li>
            ))}
          </ul>
          <p className="collab-feed__hint">Live feed of edits, AI suggestions, and acceptances.</p>
        </div>

        {/* Chat */}
        <div className="collab-chat">
          <div className="collab-chat__title">Writing Room Chat</div>
          <div className="collab-chat__messages" ref={chatRef}>
            {msgs.length === 0
              ? <span className="collab-chat__empty">No messages yet — say something!</span>
              : msgs.map((m, i) => (
                  <div key={i} className="collab-chat__msg">
                    <b className="collab-chat__msg-user">{m.user}</b>
                    <span className="collab-chat__msg-time">{m.time}</span>
                    <div className="collab-chat__msg-text">{m.text}</div>
                  </div>
                ))
            }
          </div>
          <form className="collab-chat__form" onSubmit={sendMsg}>
            <input
              className="writing-input"
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="Message your co-writers…"
            />
            <button className="writing-btn" disabled={!msg.trim()}>Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}
