import React from "react";
/**
 * Props: universe: [{
 *   author: {id, name, avatar},
 *   worlds: [{name, projects:[{title, year, projectId}]}],
 *   styleSummary
 * }]
 */
export default function AuthorUniverseMapPanel({ universe }) {
  return (
    <div style={{ padding: 18, background: "#fff8ea", borderRadius: 14, display: "flex", flexWrap: "wrap", gap: 22, minHeight: 300 }}>
      {universe.map((a, i) =>
        <div key={i} style={{ minWidth: 260, background: "#f4f9fb", borderRadius: 10, padding: 15, border: "1px solid #ebe" }}>
          <img src={a.author.avatar} alt={a.author.name} style={{ width: 39, height: 39, borderRadius: "50%" }} />
          <b style={{ marginLeft: 8 }}>{a.author.name}</b>
          <div style={{ color: "#678", fontSize: "0.96em", marginBottom: 7 }}>
            {a.styleSummary}
          </div>
          <ul>
            {a.worlds.map(w => <li key={w.name}>
              <b>{w.name}</b>
              <ul>{w.projects.map(p =>
                <li key={p.projectId}>{p.title} ({p.year})</li>
              )}</ul>
            </li>)}
          </ul>
        </div>
      )}
    </div>
  );
}