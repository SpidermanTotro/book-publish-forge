import React, { useState } from "react";

/**
 * Props:
 * - notes: array of { id, parentType, parentId, text, url, fileName, fileDataUrl, tags }
 * - onAddNote: (note) => void
 * - onDeleteNote: (noteId) => void
 * - parentType: "character" | "location" | "scene"
 * - parentId: id of the node/scene this note is for
 */
export default function ResearchNotesPanel({
  notes,
  onAddNote,
  onDeleteNote,
  parentType,
  parentId
}) {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = e => {
    const f = e.target.files[0];
    if (!f) return setFile(null);
    const reader = new FileReader();
    reader.onload = ev => setFile({
      fileName: f.name,
      fileDataUrl: ev.target.result
    });
    reader.readAsDataURL(f);
  };

  const handleAdd = () => {
    if (!text && !url && !file) return;
    onAddNote({
      id: Math.random().toString(36).slice(2, 10),
      parentType,
      parentId,
      text: text ? text.trim() : undefined,
      url: url ? url.trim() : undefined,
      fileName: file ? file.fileName : undefined,
      fileDataUrl: file ? file.fileDataUrl : undefined,
      tags: tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : []
    });
    setText("");
    setUrl("");
    setTags("");
    setFile(null);
  };

  const theseNotes = notes.filter(
    n => n.parentType === parentType && n.parentId === parentId
  );

  return (
    <div style={{ padding: 10, background: "#fffbea", border: "1px solid #dde", borderRadius: 7, marginTop: 10 }}>
      <h4>Research & Notes</h4>
      <div>
        <textarea
          value={text}
          placeholder="Research note or summary…"
          onChange={e => setText(e.target.value)}
          rows={2}
          style={{ width: "95%", marginBottom: 3 }}
        /><br />
        <input
          type="text"
          value={url}
          placeholder="Website or reference URL"
          onChange={e => setUrl(e.target.value)}
          style={{ width: "87%", marginBottom: 3 }}
        /><br />
        <label>
          File/PDF/image:
          <input type="file" onChange={handleFileChange} style={{ marginLeft: 8 }} />
        </label><br />
        <input
          type="text"
          value={tags}
          placeholder="Tags (comma separated)"
          onChange={e => setTags(e.target.value)}
          style={{ width: "60%", marginTop: 4 }}
        /> <br />
        <button style={{ marginTop: 8 }} onClick={handleAdd}>
          Add Note/Research
        </button>
      </div>
      <hr />
      {theseNotes.length === 0 ? (
        <em>No notes or research linked yet.</em>
      ) : (
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {theseNotes.map(n => (
            <li key={n.id} style={{ marginBottom: 8 }}>
              {n.tags && n.tags.length > 0 && (
                <span style={{ color: "#b44", fontSize: "0.96em" }}>
                  [{n.tags.join(", ")}]{" "}
                </span>
              )}
              {n.text && <span>{n.text}{" "}</span>}
              {n.url && (
                <a href={n.url} target="_blank" rel="noopener noreferrer">
                  {n.url.length < 45 ? n.url : n.url.slice(0, 44) + '…'}
                </a>
              )}
              {n.fileName && (
                <span>
                  {" "} | <a href={n.fileDataUrl} download={n.fileName}>
                    {n.fileName}
                  </a>
                </span>
              )}
              <button
                onClick={() => onDeleteNote(n.id)}
                style={{
                  marginLeft: 14,
                  color: "crimson",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer"
                }}
                title="Delete this note"
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}