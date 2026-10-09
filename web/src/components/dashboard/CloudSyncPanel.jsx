import React, { useRef } from "react";

/**
 * Props:
 * - project: your full project data (object)
 * - onLoadCloud: (projectData) => void
 * - onSaveCloud: (projectData) => void or Promise
 */
export default function LocalBackupPanel({ project, onLoadCloud, onSaveCloud }) {
  const fileInput = useRef();

  // Temporary browser-only backup; never uploads anything
  const handleSaveCloud = () => {
    // Save to this browser profile only; not an off-device backup
    localStorage.setItem("cloudProjectBackup", JSON.stringify(project));
    if (onSaveCloud) onSaveCloud(project);
    alert("Saved in this browser only. Export a file for a durable backup.");
  };
  const handleLoadCloud = () => {
    // Simulate cloud load—would GET from server/cloud
    const data = localStorage.getItem("cloudProjectBackup");
    if (!data) {
      alert("No browser backup found.");
      return;
    }
    try {
      const loaded = JSON.parse(data);
      if (onLoadCloud) onLoadCloud(loaded);
      alert("Loaded from this browser's storage.");
    } catch {
      alert("Invalid cloud backup data.");
    }
  };

  // Local import/export
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = project.name ? `${project.name}.json` : "project.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleImport = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (onLoadCloud) onLoadCloud(data);
        alert("Project imported from file!");
      } catch {
        alert("Invalid file!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ margin: "21px 0", background: "#f3f5fa", border: "1px solid #dde", borderRadius: 8, padding: 18, display: "inline-block" }}>
      <b>Local Backup Controls:</b>
      <div style={{ marginTop: 12 }}>
        <button onClick={handleSaveCloud} style={{ marginRight: 14 }}>Save in Browser</button>
        <button onClick={handleLoadCloud} style={{ marginRight: 14 }}>Load from Browser</button>
        <button onClick={handleExport} style={{ marginRight: 14 }}>Export to File</button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json"
          style={{ display: "none" }}
          onChange={handleImport}
        />
        <button onClick={() => fileInput.current.click()}>Import from File</button>
      </div>
    </div>
  );
}