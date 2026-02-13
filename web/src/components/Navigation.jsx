import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navSections = [
    {
      title: "📖 Writing Tools",
      items: [
        { name: "Book Forge", path: "/book" },
        { name: "Erotic Forge", path: "/erotic" },
        { name: "Multi-Project Dashboard", path: "/dashboard" },
        { name: "Outline Board", path: "/outline" },
        { name: "Timeline Visualizer", path: "/timeline" },
      ]
    },
    {
      title: "🤖 AI Tools",
      items: [
        { name: "AI Writing Assistant", path: "/ai/helper" },
        { name: "AI Beat Generator", path: "/ai/beat-generator" },
        { name: "Plot Consistency", path: "/ai/plot-consistency" },
        { name: "Correction Engine", path: "/ai/corrections" },
        { name: "Inline Suggestions", path: "/ai/inline" },
      ]
    },
    {
      title: "👥 Collaboration",
      items: [
        { name: "Collaborators", path: "/collab/team" },
        { name: "Writing Room Chat", path: "/collab/chat" },
        { name: "Revision History", path: "/collab/revisions" },
      ]
    },
    {
      title: "📤 Export & Publish",
      items: [
        { name: "Export Wizard", path: "/export" },
        { name: "Export Panel", path: "/export/panel" },
        { name: "Export to Cloud", path: "/export/cloud" },
      ]
    },
    {
      title: "✅ Ethics & Respect",
      items: [
        { name: "Ethics Review", path: "/ethics" },
        { name: "Audit Log", path: "/audit" },
        { name: "Consent & Takedown", path: "/consent" },
        { name: "Admin Review", path: "/admin-review" },
      ]
    },
    {
      title: "📰 Magazine Tools",
      items: [
        { name: "Magazine Dashboard", path: "/magazine" },
        { name: "Proof Finder", path: "/magazine/proof" },
        { name: "Paparazzi Ethics", path: "/magazine/ethics" },
      ]
    },
    {
      title: "🔌 Plugins",
      items: [
        { name: "Plugin Gallery", path: "/plugins/gallery" },
        { name: "Plugin Market", path: "/plugins/market" },
        { name: "Plugin Wizard", path: "/plugins/wizard" },
      ]
    },
    {
      title: "⚙️ Settings",
      items: [
        { name: "AI Configuration", path: "/settings/ai" },
      ]
    },
  ];

  return (
    <nav style={{
      background: "#4c1d95",
      padding: "12px 24px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 1200,
        margin: "0 auto"
      }}>
        <Link to="/" style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1.5em",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>
          📚 Book Publish Forge
        </Link>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: "1em",
            fontWeight: 600
          }}
        >
          {isOpen ? "✕ Close Menu" : "☰ Menu"}
        </button>
      </div>

      {isOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          maxWidth: 1200,
          margin: "0 auto",
          borderRadius: "0 0 8px 8px",
          maxHeight: "70vh",
          overflowY: "auto"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 24,
            padding: 24
          }}>
            {navSections.map((section, idx) => (
              <div key={idx}>
                <h3 style={{
                  margin: "0 0 12px 0",
                  color: "#4c1d95",
                  fontSize: "1.1em"
                }}>
                  {section.title}
                </h3>
                <ul style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0
                }}>
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} style={{ marginBottom: 8 }}>
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        style={{
                          color: "#6b21a8",
                          textDecoration: "none",
                          display: "block",
                          padding: "4px 8px",
                          borderRadius: 4,
                          transition: "background 0.2s"
                        }}
                        onMouseOver={(e) => e.target.style.background = "#f3f4f6"}
                        onMouseOut={(e) => e.target.style.background = "transparent"}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
