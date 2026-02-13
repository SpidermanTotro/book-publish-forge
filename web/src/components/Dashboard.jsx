import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const sections = [
    {
      title: "Writing & Creation",
      icon: "📖",
      color: "#2b68ac",
      items: [
        { name: "Book Forge", path: "/book", desc: "General writing mode" },
        { name: "Erotic Forge", path: "/erotic", desc: "Adult content mode" },
        { name: "Outline Board", path: "/outline", desc: "Story planning" },
        { name: "Timeline Visualizer", path: "/timeline", desc: "Plot timeline" },
        { name: "World Builder", path: "/world", desc: "World building tools" },
      ]
    },
    {
      title: "AI Assistance",
      icon: "🤖",
      color: "#7c3aed",
      items: [
        { name: "AI Helper", path: "/ai/helper", desc: "General AI assistance" },
        { name: "Beat Generator", path: "/ai/beat-generator", desc: "Generate story beats" },
        { name: "Plot Consistency", path: "/ai/plot-consistency", desc: "Check plot holes" },
        { name: "Correction Engine", path: "/ai/corrections", desc: "Grammar & style" },
        { name: "AI Companion", path: "/ai/companion", desc: "Writing companion" },
      ]
    },
    {
      title: "Ethics & Compliance",
      icon: "✅",
      color: "#059669",
      items: [
        { name: "Ethics Review", path: "/ethics", desc: "Content ethics check" },
        { name: "Audit Log", path: "/audit", desc: "Transparency log" },
        { name: "Consent Center", path: "/consent", desc: "Consent management" },
        { name: "Legal Compliance", path: "/legal", desc: "Regional compliance" },
      ]
    },
    {
      title: "Collaboration",
      icon: "👥",
      color: "#dc2626",
      items: [
        { name: "Team Management", path: "/collab/team", desc: "Manage collaborators" },
        { name: "Writing Room", path: "/collab/chat", desc: "Real-time chat" },
        { name: "Revision History", path: "/collab/revisions", desc: "Track changes" },
        { name: "Cloud Sync", path: "/cloud", desc: "Cloud synchronization" },
      ]
    },
    {
      title: "Publishing",
      icon: "📤",
      color: "#ea580c",
      items: [
        { name: "Export Wizard", path: "/export", desc: "Multi-format export" },
        { name: "Magazine Tools", path: "/magazine", desc: "Magazine publishing" },
        { name: "Export Stats", path: "/stats/export", desc: "Export analytics" },
      ]
    },
    {
      title: "Extensions",
      icon: "🔌",
      color: "#8b5cf6",
      items: [
        { name: "Plugin Gallery", path: "/plugins/gallery", desc: "Browse plugins" },
        { name: "Plugin Market", path: "/plugins/market", desc: "Download plugins" },
        { name: "Create Plugin", path: "/plugins/wizard", desc: "Plugin wizard" },
      ]
    },
  ];

  return (
    <div style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      minHeight: "100vh",
      padding: "40px 20px"
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto"
      }}>
        <div style={{
          background: "#fff",
          borderRadius: 16,
          padding: 40,
          marginBottom: 32,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{
            margin: "0 0 12px 0",
            fontSize: "2.5em",
            color: "#1f2937"
          }}>
            Welcome to Book Publish Forge
          </h1>
          <p style={{
            fontSize: "1.2em",
            color: "#6b7280",
            margin: 0
          }}>
            Your complete ethical writing and publishing platform
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: 24
        }}>
          {sections.map((section, idx) => (
            <div
              key={idx}
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 24,
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                border: `3px solid ${section.color}`
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16
              }}>
                <span style={{ fontSize: "2em" }}>{section.icon}</span>
                <h2 style={{
                  margin: 0,
                  fontSize: "1.5em",
                  color: section.color
                }}>
                  {section.title}
                </h2>
              </div>
              
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0
              }}>
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx} style={{ marginBottom: 12 }}>
                    <Link
                      to={item.path}
                      style={{
                        textDecoration: "none",
                        display: "block",
                        padding: 12,
                        borderRadius: 8,
                        background: "#f9fafb",
                        transition: "all 0.2s"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = section.color;
                        e.currentTarget.style.transform = "translateX(4px)";
                        e.currentTarget.querySelector("div").style.color = "#fff";
                        e.currentTarget.querySelector("small").style.color = "#f3f4f6";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "#f9fafb";
                        e.currentTarget.style.transform = "translateX(0)";
                        e.currentTarget.querySelector("div").style.color = "#1f2937";
                        e.currentTarget.querySelector("small").style.color = "#6b7280";
                      }}
                    >
                      <div style={{
                        fontWeight: 600,
                        marginBottom: 4,
                        color: "#1f2937"
                      }}>
                        {item.name}
                      </div>
                      <small style={{ color: "#6b7280" }}>
                        {item.desc}
                      </small>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          background: "#fff",
          borderRadius: 12,
          padding: 32,
          marginTop: 32,
          textAlign: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
        }}>
          <h3 style={{ color: "#4c1d95", marginBottom: 12 }}>
            Respect • Empowerment • Transparency
          </h3>
          <p style={{ color: "#6b7280", margin: 0 }}>
            Every creation is audit-safe and consent-powered
          </p>
        </div>
      </div>
    </div>
  );
}
