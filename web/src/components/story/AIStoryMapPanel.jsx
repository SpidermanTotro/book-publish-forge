import React, { useState } from "react";

export default function AIStoryMapPanel({ project }) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true); setOutput("");
    // Simulate AI output. Swap for your real endpoint!
    const arcs = (project.plotArcs||[]).map(a=>a.name).join(", ");
    const chars = (project.characters||[]).map(c=>c.name).join(", ");
    await new Promise(r=>setTimeout(r,1200));
    setOutput(
      `[AI Map Example]\n\n` +
      `For Arc "Romance": missing beat in midpoint (no scene with both Alex & Casey).\n` +
      `Character "Villain" does not appear from Ch.4 to Ch.9 (suggest add complication scene).\n`
      + `Arcs: ${arcs}\nCharacters: ${chars}`
    );
    setLoading(false);
  }
  return (
    <div style={{background:"#ebfaff",padding:18,borderRadius:9,border:"1px solid #bbf",marginBottom:16,maxWidth:800}}>
      <h3>AI Story Map & Consistency Checker</h3>
      <button onClick={generate} disabled={loading}>
        {loading ? "Mapping..." : "Analyze Arcs/Story"}
      </button>
      {output && <pre style={{background:"#fff",padding:12,borderRadius:5,marginTop:10}}>{output}</pre>}
    </div>
  );
}