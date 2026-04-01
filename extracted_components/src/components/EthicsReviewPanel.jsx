import React, { useState } from "react";

export default function EthicsReviewPanel({ content, onProceed }) {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{
      background: "#f3f9ee", borderRadius: 9, padding: 14, marginTop: 18, maxWidth: 600
    }}>
      <h3>Ethics & Consent Check</h3>
      <div>
        <input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)} id="consent"/>
        <label htmlFor="consent" style={{marginLeft:7}}>
          I confirm this draft respects all boundaries, involves only legal/consensual content, and is appropriate to its mode.
        </label>
      </div>
      <button
        disabled={!checked}
        style={{
          marginTop:10, background:checked?"#41b37f":"#bbb", color:"#fff",
          border:"none", borderRadius:7, padding:"8px 18px", fontWeight:700
        }}
        onClick={onProceed}
      >
        Approve Ethics
      </button>
      <div style={{marginTop:9, color:"#1c6b35"}}>
        {checked && "Ready for export or publishing."}
      </div>
    </div>
  );
}