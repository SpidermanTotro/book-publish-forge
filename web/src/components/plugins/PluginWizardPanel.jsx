import React, { useState } from "react";

/**
 * Draft-only plugin authoring.
 * Browser-supplied JavaScript must not be evaluated in a manuscript workspace.
 */
export default function PluginWizardPanel({ onFinish }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [source, setSource] = useState("export default function MyPlugin({project}) { return <div>...</div>; }");
  const [status, setStatus] = useState("");

  function saveDraft() {
    const trimmed = name.trim();
    if (!trimmed || !source.trim()) {
      setStatus("Enter a plugin name and some source code first.");
      return;
    }
    // Data only. No eval/Function/dynamic imports and no executable component.
    const draft = {
      id: "draft-" + Date.now().toString(36),
      name: trimmed,
      description: desc.trim(),
      enabled: false,
      author: "Local user",
      Component: null,
      sourceCode: source,
      requiresSandbox: true,
    };
    onFinish?.(draft);
    setStatus("Saved a disabled source draft. Plugin execution is not available.");
  }

  return (
    <div style={{border:"1.1px solid #cbe",borderRadius:9,padding:16,
      margin:"18px 0",background:"#f7fafd"}}>
      <h3>Plugin Draft Builder (offline)</h3>
      <p>Save source for later review. This application does not execute
        pasted JavaScript or install untrusted components.</p>
      <label htmlFor="plugin-draft-name">Plugin name</label>
      <input id="plugin-draft-name" value={name} onChange={e => setName(e.target.value)}
        style={{width:"99%",margin:"5px 0"}} />
      <label htmlFor="plugin-draft-description">Description</label>
      <input id="plugin-draft-description" value={desc} onChange={e => setDesc(e.target.value)}
        style={{width:"99%",margin:"5px 0"}} />
      <label htmlFor="plugin-draft-source">Source code (not executed)</label>
      <textarea id="plugin-draft-source" value={source} onChange={e => setSource(e.target.value)}
        rows={7} style={{width:"99%"}} />
      <button onClick={saveDraft}>Save disabled draft</button>
      <p role="status">{status}</p>
    </div>
  );
}
