import React, { useState } from "react";

/**
 * Multi-Project Dashboard
 * Props:
 * - projects: array of { id, name, lastOpened, ... }
 * - onCreate: (name) => void
 * - onOpen: (id) => void
 * - onDelete: (id) => void
 * - onRename: (id, newName) => void
 */
export default function MultiProjectDashboard({ projects, onCreate, onOpen, onDelete, onRename }) {
  const [newName, setNewName] = useState("");
  const [renameId, setRenameId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  return (
    <section style={{
      maxWidth: 690, margin: "30px auto", background: "#f9fcff", padding: 32, borderRadius: 12,
      border: "1.5px solid #c6daf1", boxShadow: "0 2px 14px #e1eaf4"
    }}>
      <h2>Your Writing Projects</h2>
      <div style={{ marginBottom: 18 }}>
        <input
          value={newName}
          placeholder="New project name…"
          onChange={e => setNewName(e.target.value)}
          style={{ fontSize: "1.08em", marginRight: 10, padding: 5, borderRadius: 5, border: "1px solid #bcd" }}
        />
        <button
          disabled={!newName.trim()}
          onClick={() => {
            if (!newName.trim()) return;
            onCreate(newName.trim());
            setNewName("");
          }}
        >Create Project</button>
      </div>
      {projects.length === 0 ? (
        <div style={{ color: "#956", fontStyle: "italic" }}>You have no projects. Create one to get started!</div>
      ) : (
        <table style={{ width: "98%", marginTop: 10 }}>
          <thead>
            <tr>
              <th align="left">Name</th>
              <th align="left">Last Modified</th>
              <th align="left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(prj => (
              <tr key={prj.id}>
                <td>
                  {renameId === prj.id ? (
                    <>
                      <input
                        value={renameValue}
                        autoFocus
                        onChange={e => setRenameValue(e.target.value)}
                        style={{ fontSize: "1em", padding: "2px 6px", borderRadius: 4, border: "1px solid #ddf" }}
                        onBlur={() => setRenameId(null)}
                        onKeyDown={e => {
                          if (e.key === "Enter") {
                            if (renameValue.trim() && renameValue !== prj.name) onRename(prj.id, renameValue.trim());
                            setRenameId(null);
                          } else if (e.key === "Escape") {
                            setRenameId(null);
                          }
                        }}
                      />
                      <button
                        style={{ marginLeft: 8 }}
                        onClick={() => {
                          if (renameValue.trim() && renameValue !== prj.name) onRename(prj.id, renameValue.trim());
                          setRenameId(null);
                        }}
                      >Save</button>
                    </>
                  ) : (
                    <>
                      <b>{prj.name}</b>
                      <button
                        style={{ marginLeft: 18, fontSize: "0.84em" }}
                        onClick={() => {
                          setRenameId(prj.id);
                          setRenameValue(prj.name);
                        }}
                        title="Rename"
                      >Rename</button>
                    </>
                  )}
                </td>
                <td>
                  {(prj.lastOpened || prj.updatedAt)
                    ? (new Date(prj.lastOpened || prj.updatedAt)).toLocaleString()
                    : <span style={{ color: "#999" }}>–</span>
                  }
                </td>
                <td>
                  <button onClick={() => onOpen(prj.id)} style={{ marginRight: 8 }}>Open</button>
                  <button
                    onClick={() => { if (window.confirm(`Delete project "${prj.name}"?`)) onDelete(prj.id); }}
                    style={{ color: "#a33" }}
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}