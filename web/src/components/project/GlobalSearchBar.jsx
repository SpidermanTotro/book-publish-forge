import React, { useState } from "react";

/**
 * Props:
 * - project: {
 *     scenes: [{ id, title, text, ... }],
 *     world: { characters: [], locations: [], ... },
 *     notes: [{ id, text, url, tags, parentType, parentId }]
 *   }
 * - onJump: (type, id) => void // type: "scene", "character", "location", "note"
 */
export default function GlobalSearchBar({ project, onJump }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Simple search (case-insensitive, broad)
  const handleSearch = (q) => {
    q = q.trim();
    setQuery(q);
    if (!q) return setResults([]);

    // Helper: highlights match
    const highlight = (text) => {
      const i = text.toLowerCase().indexOf(q.toLowerCase());
      if (i === -1) return text;
      return (
        <>
          {text.slice(0, i)}
          <b style={{ color: "#b14" }}>{text.slice(i, i + q.length)}</b>
          {text.slice(i + q.length)}
        </>
      );
    };

    const found = [];
    // Scenes
    (project.scenes || []).forEach(scene => {
      if (
        scene.title?.toLowerCase().includes(q.toLowerCase())
        || scene.text?.toLowerCase().includes(q.toLowerCase())
      )
        found.push({
          type: "scene",
          id: scene.id,
          label: (
            <>
              <span style={{ color: "#364" }}>Scene:</span> {highlight(scene.title)}
            </>
          )
        });
    });
    // Characters & Locations
    (project.world.characters || []).forEach(char => {
      if (char.name?.toLowerCase().includes(q.toLowerCase()))
        found.push({
          type: "character",
          id: char.id,
          label: (
            <>
              <span style={{ color: "#225" }}>Character:</span> {highlight(char.name)}
            </>
          )
        });
    });
    (project.world.locations || []).forEach(loc => {
      if (loc.name?.toLowerCase().includes(q.toLowerCase()))
        found.push({
          type: "location",
          id: loc.id,
          label: (
            <>
              <span style={{ color: "#124" }}>Location:</span> {highlight(loc.name)}
            </>
          )
        });
    });
    // Notes/Research
    (project.notes || []).forEach(note => {
      if (
        note.text?.toLowerCase().includes(q.toLowerCase())
        || note.url?.toLowerCase().includes(q.toLowerCase())
        || (note.tags || []).some(t => t.toLowerCase().includes(q.toLowerCase()))
      )
        found.push({
          type: note.parentType === "scene" ? "note:scene"
              : note.parentType === "character" ? "note:character"
              : note.parentType === "location" ? "note:location"
              : "note",
          id: note.id,
          label: (
            <>
              <span style={{ color: "#b44" }}>Note:</span> {highlight(note.text || note.url || "—")}
            </>
          )
        });
    });
    setResults(found);
  };

  return (
    <div style={{
      background: "#f6faff", padding: 16, borderRadius: 7, border: "1px solid #dde",
      margin: "20px auto 8px auto", maxWidth: 630
    }}>
      <input
        type="search"
        value={query}
        onChange={e => handleSearch(e.target.value)}
        placeholder="Search scenes, characters, locations, notes…"
        style={{
          fontSize: "1.2em", width: "86%", padding: 7,
          borderRadius: 7, border: "1px solid #bbb"
        }}
        autoFocus
      />
      {query && (
        <div style={{
          marginTop: 8, background: "#fff", borderRadius: 6,
          border: "1px solid #eee", padding: 8, maxHeight: 250, overflow: "auto"
        }}>
          {results.length === 0 ? (
            <div style={{ color: "#993" }}><i>No results found.</i></div>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {results.map(r => (
                <li key={r.type + r.id} style={{ marginBottom: 6 }}>
                  <button
                    style={{
                      all: "unset", cursor: "pointer",
                      color: "#235", fontWeight: 500, fontFamily: "inherit",
                      background: "#f2f5ff", borderRadius: 6, padding: "2px 9px"
                    }}
                    onClick={() => onJump?.(r.type.split(":")[1] || r.type, r.id)}
                  >{r.label}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}