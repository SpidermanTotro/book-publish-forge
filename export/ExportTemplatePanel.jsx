import React, { useState } from "react";
export default function ExportTemplatePanel({ onSelect }) {
  const [tpl, setTpl] = useState("default");
  const templates = {
    default: { name: "Standard Book", desc: "Basic title, chapters, and end." },
    formal: { name: "Formal Manuscript", desc: "Adds title page, copyright, dedication." },
    verse: { name: "Verse/Poetry", desc: "Big breaks, stanza format." }
  };
  return (
    <div style={{marginTop:18, marginBottom:8}}>
      <b>Export Template:</b>
      <select value={tpl} onChange={e=>setTpl(e.target.value)} style={{marginLeft:14}}>
        {Object.entries(templates).map(([id,t]) =>
          <option key={id} value={id}>{t.name}</option>
        )}
      </select>
      <span style={{marginLeft:14, color:"#688"}}>{templates[tpl].desc}</span>
      <button style={{marginLeft:18}} onClick={()=>onSelect?.(tpl)}>Apply Template</button>
    </div>
  );
}