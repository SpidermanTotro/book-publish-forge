import React, { useState } from "react";

/**
 * TimelineVisualizerPanel
 * Props:
 * - scenes: Array<{ id, title, position, summary?, characters?, locations?, color? }>
 * - onSetOrder: (newOrder: Array<{ id, ... }>) => void
 */
export default function TimelineVisualizerPanel({ scenes, onSetOrder }) {
  // Sort scenes by .position or .order (or fallback to array order)
  const [dragged, setDragged] = useState(null);

  // Assign visual positions if missing
  const sorted = [...(scenes||[])]
    .map((s, i) => ({ ...s, order: s.position ?? s.order ?? i }))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  function handleDragStart(i) {
    setDragged(i);
  }
  function handleDrop(i) {
    if (dragged === null || dragged === i) return setDragged(null);
    const next = [...sorted];
    const [removed] = next.splice(dragged, 1);
    next.splice(i, 0, removed);
    // Update position/order property everywhere
    const updated = next.map((s, idx) => ({ ...s, position: idx }));
    onSetOrder(updated);
    setDragged(null);
  }

  return (
    <div style={{
      background: "#fffdf8", border: "1px solid #ebd", borderRadius: 11,
      minHeight: 124, margin: "32px 0", padding: 24
    }}>
      <h3 style={{ marginTop: 0 }}>Timeline / Outline</h3>
      <div style={{ fontSize: "1em", color: "#666", marginBottom: 12 }}>
        Drag scenes to reorder. Click a scene for quick jump or editing.
      </div>
      <div style={{
        display: "flex", flexWrap: "nowrap", overflowX: "auto", gap: "17px",
        minHeight: 100, paddingBottom: 12
      }}>
        {sorted.map((scene, idx) => (
          <div
            key={scene.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(idx)}
            onDragEnd={() => setDragged(null)}
            style={{
              background: dragged === idx ? "#ececfd" : "#f6f7fa", minWidth: 180,
              border: "1px solid #ccd", borderRadius: 10, boxShadow: "0 2px 10px #e2e7f8",
              opacity: dragged === idx ? 0.6 : 1, cursor: "grab",
              padding: "12px 14px", userSelect: "none", transition: "background 0.17s"
            }}
            title={scene.summary || ""}
          >
            <b style={{ color: "#337", fontSize: "1.08em" }}>{scene.title}</b>
            {scene.summary && (
              <div style={{ color: "#44485e", margin: "7px 0 0 0", fontSize: "0.98em", opacity: 0.92 }}>
                {scene.summary.slice(0, 88)}{scene.summary.length>88 && "..."}
              </div>
            )}
            {/* Characters */}
            {scene.characters && scene.characters.length > 0 && (
              <div style={{ marginTop: 6, fontSize: "0.96em", color: "#638" }}>
                <span role="img" aria-label="characters">👤</span>{" "}
                {scene.characters.map(c => c.name || c.id).join(", ")}
              </div>
            )}
            {/* Locations */}
            {scene.locations && scene.locations.length > 0 && (
              <div style={{ marginTop: 3, fontSize: "0.93em", color: "#285" }}>
                <span role="img" aria-label="location">📍</span>{" "}
                {scene.locations.map(l => l.name || l.id).join(", ")}
              </div>
            )}
          </div>
        ))}
      </div>
      {sorted.length === 0 && (
        <div style={{ color: "#888", fontStyle: "italic", marginLeft: 18 }}>
          No scenes added to the timeline yet.
        </div>
      )}
    </div>
  );
}