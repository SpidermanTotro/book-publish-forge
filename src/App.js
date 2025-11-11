import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import MasterForgeModule from './components/MasterForgeModule.jsx';
import AppLayout from './ui/AppLayout.jsx';
import CommandPalette from './ui/CommandPalette.jsx';
import WorkspaceSwitcher from './components-root/WorkspaceSwitcher.jsx';
import ExportWizard from './components-root/ExportWizard.jsx';
import RespectDashboard from './components-root/RespectDashboard.jsx';
import EmpowermentDashboard from './components-root/EmpowermentDashboard.jsx';

function HomePage() {
  return (
    <div style={{
      background: "linear-gradient(120deg,#f3ecfa,#e9e3f2 60%,#fbeeff)",
      minHeight: "calc(100vh - 160px)",
      padding: "40px 24px",
      margin: 0
    }}>
      <div style={{
        maxWidth: 700, margin: "0 auto", padding: "54px 24px 42px 24px", borderRadius: 20, boxShadow: "0 8px 40px #a68eb81e", background: "#fff"
      }}>
        <div style={{display: "flex", alignItems: "center", gap: 18, marginBottom: 22}}>
          <img
            src="https://emojicdn.elk.sh/📚?style=apple"
            alt="Book Forge"
            style={{width:48, height:48, filter: "drop-shadow(1px 3px 8px #be79ef2d)"}}
          />
          <div>
            <h1 style={{margin: 0, fontSize: "2.3em", letterSpacing:0.5}}>Book Publish Forge</h1>
            <div style={{color:"#6e3793", fontWeight: 500}}>Ethical, AI-powered publishing suite</div>
          </div>
        </div>
        <p style={{fontSize: "1.1em", color: "#473363", marginBottom: 19}}>
          A modular suite for writers and publishers — instantly analyze, transform, audit, and ethically publish any story.
        </p>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 28}}>
          <Link to="/forge" style={{
            textDecoration: "none", background: "#2b68ac", color: "#fff", padding: "18px 24px", borderRadius: "12px",
            fontSize: "1.1em", fontWeight: 600, textAlign: "center", boxShadow: "0 4px 20px #bee7ff50"
          }}>📖 Book Forge</Link>
          <Link to="/export" style={{
            textDecoration: "none", background: "#34ad81", color: "#fff", padding: "18px 24px", borderRadius: "12px",
            fontSize: "1.1em", fontWeight: 600, textAlign: "center", boxShadow: "0 4px 20px #34ad8150"
          }}>📦 Export</Link>
          <Link to="/respect" style={{
            textDecoration: "none", background: "linear-gradient(90deg,#ff34a3,#9c35b0 80%)", color: "#fff", padding: "18px 24px", borderRadius: "12px",
            fontSize: "1.1em", fontWeight: 600, textAlign: "center", boxShadow: "0 4px 20px #ffcaf650"
          }}>💜 Respect Dashboard</Link>
          <Link to="/empowerment" style={{
            textDecoration: "none", background: "#782ca1", color: "#fff", padding: "18px 24px", borderRadius: "12px",
            fontSize: "1.1em", fontWeight: 600, textAlign: "center", boxShadow: "0 4px 20px #782ca150"
          }}>⚡ Empowerment</Link>
        </div>
        <div style={{marginTop:32, fontSize: "1em", color:"#555379", borderTop: "1px solid #e9e3f2", paddingTop: 20}}>
          <b>Features:</b> Instant mode detection • Naughty/non-naughty conversion • Ethics & audit panels • Export with compliance badges • Admin & user empowerment tools
        </div>
      </div>
    </div>
  );
}

function NavigationBar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  
  const navStyle = (active) => ({
    padding: "8px 16px",
    margin: "0 4px",
    textDecoration: "none",
    color: active ? "#782ca1" : "#555",
    fontWeight: active ? "600" : "500",
    borderBottom: active ? "2px solid #782ca1" : "2px solid transparent",
    transition: "all 0.2s"
  });

  return (
    <div style={{display: "flex", alignItems: "center", gap: 8}}>
      <Link to="/" style={{fontSize: "1.4em", fontWeight: "700", color: "#782ca1", textDecoration: "none", marginRight: 20}}>
        📚 Book Forge
      </Link>
      <Link to="/" style={navStyle(isActive('/'))}>Home</Link>
      <Link to="/forge" style={navStyle(isActive('/forge'))}>Forge</Link>
      <Link to="/export" style={navStyle(isActive('/export'))}>Export</Link>
      <Link to="/respect" style={navStyle(isActive('/respect'))}>Respect</Link>
      <Link to="/empowerment" style={navStyle(isActive('/empowerment'))}>Empowerment</Link>
    </div>
  );
}

function AppContent() {
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  return (
    <AppLayout
      top={<NavigationBar />}
      sidebar={
        <div style={{padding: "20px 0", display: "flex", flexDirection: "column", gap: 16}}>
          <button 
            onClick={() => setShowCommandPalette(!showCommandPalette)}
            style={{background: "none", border: "none", fontSize: "1.5em", cursor: "pointer"}}
            title="Command Palette"
          >
            ⌘
          </button>
          <div style={{fontSize: "1.3em", cursor: "pointer"}} title="Workspaces">🗂️</div>
          <div style={{fontSize: "1.3em", cursor: "pointer"}} title="Settings">⚙️</div>
        </div>
      }
      main={
        <>
          {showCommandPalette && <CommandPalette onClose={() => setShowCommandPalette(false)} />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/forge" element={<MasterForgeModule />} />
            <Route path="/export" element={<ExportWizard />} />
            <Route path="/respect" element={<RespectDashboard />} />
            <Route path="/empowerment" element={<EmpowermentDashboard />} />
          </Routes>
        </>
      }
      rightbar={
        <div style={{padding: 16}}>
          <WorkspaceSwitcher />
        </div>
      }
      bottombar={
        <div style={{display: "flex", justifyContent: "space-between", width: "100%", fontSize: "0.85em", color: "#666"}}>
          <span>© 2025 Book Publish Forge — Safe, creative, ethical AI</span>
          <span>v1.0.0</span>
        </div>
      }
    />
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

