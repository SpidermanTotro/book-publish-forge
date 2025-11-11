import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import MasterForgeModule from './components/MasterForgeModule.jsx';
import AppLayout from './ui/AppLayout.jsx';
import CommandPalette from './ui/CommandPalette.jsx';
import WorkspaceSwitcher from './components-root/WorkspaceSwitcher.jsx';
import ExportWizard from './components-root/ExportWizard.jsx';
import RespectDashboard from './components-root/RespectDashboard.jsx';
import EmpowermentDashboard from './components-root/EmpowermentDashboard.jsx';
import AIWritingTools from './pages/AIWritingTools.jsx';

function HomePage() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      minHeight: "calc(100vh - 160px)",
      padding: "60px 24px",
      margin: 0,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '5%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>

      <div style={{
        maxWidth: 900, 
        margin: "0 auto", 
        padding: "60px 40px", 
        borderRadius: 24, 
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)", 
        background: "rgba(255,255,255,0.95)",
        backdropFilter: 'blur(10px)',
        animation: 'fadeInUp 0.8s ease-out'
      }}>
        <div style={{textAlign: 'center', marginBottom: 40}}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
            fontSize: '2.5em',
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: 20,
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            BF
          </div>
          <h1 style={{
            margin: '0 0 12px 0', 
            fontSize: "3.5em", 
            letterSpacing: -1,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Book Publish Forge</h1>
          <div style={{
            color:"#764ba2", 
            fontWeight: 600, 
            fontSize: '1.3em',
            marginBottom: 24
          }}>Ethical, AI-powered publishing suite</div>
          <p style={{
            fontSize: "1.2em", 
            color: "#555", 
            marginBottom: 0,
            lineHeight: 1.8,
            maxWidth: 700,
            margin: '0 auto'
          }}>
            A modular suite for writers and publishers — instantly analyze, transform, audit, and ethically publish any story with cutting-edge AI technology.
          </p>
        </div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginTop: 50}}>
          <Link to="/forge" style={{
            textDecoration: "none", 
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", 
            color: "#fff", 
            padding: "28px 24px", 
            borderRadius: "16px",
            fontSize: "1.15em", 
            fontWeight: 700, 
            textAlign: "center", 
            boxShadow: "0 8px 25px rgba(79, 172, 254, 0.4)",
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(79, 172, 254, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(79, 172, 254, 0.4)';
          }}
          >
            <div style={{
              width: 50,
              height: 50,
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <div>Book Forge</div>
            <div style={{fontSize: '0.85em', opacity: 0.9, fontWeight: 400}}>Main Editor</div>
          </Link>
          <Link to="/ai-tools" style={{
            textDecoration: "none", 
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", 
            color: "#fff", 
            padding: "28px 24px", 
            borderRadius: "16px",
            fontSize: "1.15em", 
            fontWeight: 700, 
            textAlign: "center", 
            boxShadow: "0 8px 25px rgba(240, 147, 251, 0.4)",
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(240, 147, 251, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(240, 147, 251, 0.4)';
          }}
          >
            <div style={{
              width: 50,
              height: 50,
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <div>AI Writing Tools</div>
            <div style={{fontSize: '0.85em', opacity: 0.9, fontWeight: 400}}>25+ Tools</div>
          </Link>
          <Link to="/export" style={{
            textDecoration: "none", 
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", 
            color: "#fff", 
            padding: "28px 24px", 
            borderRadius: "16px",
            fontSize: "1.15em", 
            fontWeight: 700, 
            textAlign: "center", 
            boxShadow: "0 8px 25px rgba(52, 173, 129, 0.4)",
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(52, 173, 129, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(52, 173, 129, 0.4)';
          }}
          >
            <div style={{
              width: 50,
              height: 50,
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </div>
            <div>Export</div>
            <div style={{fontSize: '0.85em', opacity: 0.9, fontWeight: 400}}>Multiple Formats</div>
          </Link>
          <Link to="/respect" style={{
            textDecoration: "none", 
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", 
            color: "#fff", 
            padding: "28px 24px", 
            borderRadius: "16px",
            fontSize: "1.15em", 
            fontWeight: 700, 
            textAlign: "center", 
            boxShadow: "0 8px 25px rgba(156, 53, 176, 0.4)",
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(156, 53, 176, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(156, 53, 176, 0.4)';
          }}
          >
            <div style={{
              width: 50,
              height: 50,
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <div>Respect Dashboard</div>
            <div style={{fontSize: '0.85em', opacity: 0.9, fontWeight: 400}}>Ethics & Consent</div>
          </Link>
          <Link to="/empowerment" style={{
            textDecoration: "none", 
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", 
            color: "#fff", 
            padding: "28px 24px", 
            borderRadius: "16px",
            fontSize: "1.15em", 
            fontWeight: 700, 
            textAlign: "center", 
            boxShadow: "0 8px 25px rgba(120, 44, 161, 0.4)",
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(120, 44, 161, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(120, 44, 161, 0.4)';
          }}
          >
            <div style={{
              width: 50,
              height: 50,
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <div>Empowerment</div>
            <div style={{fontSize: '0.85em', opacity: 0.9, fontWeight: 400}}>User Tools</div>
          </Link>
        </div>
        <div style={{
          marginTop: 40, 
          padding: '30px', 
          fontSize: "1.05em", 
          color:"#666",
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          borderRadius: '16px',
          lineHeight: 1.8
        }}>
          <div style={{fontWeight: 700, fontSize: '1.1em', marginBottom: 12, color: '#764ba2'}}>✨ Key Features:</div>
          Instant mode detection • Naughty/non-naughty conversion • Ethics & audit panels • Export with compliance badges • Admin & user empowerment tools • 25+ AI writing assistants
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
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
      <Link to="/" style={{
        fontSize: "1.4em", 
        fontWeight: "700", 
        color: "#782ca1", 
        textDecoration: "none", 
        marginRight: 20,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.7em',
          fontWeight: 'bold',
          color: '#fff'
        }}>
          BF
        </div>
        Book Forge
      </Link>
      <Link to="/" style={navStyle(isActive('/'))}>Home</Link>
      <Link to="/forge" style={navStyle(isActive('/forge'))}>Forge</Link>
      <Link to="/ai-tools" style={navStyle(isActive('/ai-tools'))}>AI Tools</Link>
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
            <Route path="/ai-tools" element={<AIWritingTools />} />
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

