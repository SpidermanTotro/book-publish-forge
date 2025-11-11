import React, { useState, useEffect } from "react";

/**
 * Props:
 * - project: full project state (passed to plugins)
 * - plugins: array of { id, name, Component }
 */
export default function PluginHost({ project, plugins }) {
  const [activePluginId, setActivePluginId] = useState(plugins[0]?.id || "");

  useEffect(() => {
    if (!plugins.find(p => p.id === activePluginId) && plugins[0]) {
      setActivePluginId(plugins[0].id);
    }
  }, [plugins, activePluginId]);

  return (
    <div style={{ marginTop: 32, background: "#eefdfe", borderRadius: 10, padding: "18px 11px", minHeight: 128 }}>
      <h3 style={{ margin: 0, marginBottom: 10 }}>Plugins & Custom Panels</h3>
      <div style={{ marginBottom: 15 }}>
        {plugins.map(p =>
          <button
            key={p.id}
            style={{
              marginRight: 12, marginBottom: 3,
              background: activePluginId === p.id ? "#b4e3f7" : "#fff",
              border: "1px solid #aaa", borderRadius: 6, fontWeight: 600, padding: "4px 15px"
            }}
            onClick={() => setActivePluginId(p.id)}
          >{p.name}</button>
        )}
      </div>
      <div>
        {plugins.map(p => (
          <div key={p.id} style={{ display: p.id === activePluginId ? 'block' : 'none' }}>
            <p style={{ fontWeight: 600, color: "#228", fontSize: "1.14em" }}>Panel: {p.name}</p>
            <p style={{ fontSize: "0.96em", color: "#567" }}>
              <i>Plugin can read/project data and render custom UI.</i>
            </p>
            <p>
              <p>
                <p>
                  <p>
                    {typeof p.Component === "function"
                      ? <p.Component project={project} />
                      : "No component found."}
                  </p>
                </p>
              </p>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}