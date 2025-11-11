import React, { useState } from "react";
/**
 * Props:
 * - text: String (user’s manuscript/scene)
 * - context: { project, scene, authorPrefs }
 */
export default function CorrectionEnginePanel({ text, context }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  async function runEngines() {
    setLoading(true); setSuggestions([]);
    // In production, this would POST to an “correction/gap engine” API
    await new Promise(r=>setTimeout(r,850));
    setSuggestions([
      {
        type: "gap",
        finding: "Plot arc: Antagonist disappears between chapters 3-7.",
        correction: "Suggest a minor scene or note where the antagonist’s absence is explained—or foreshadow a reappearance.",
        engine: "ArcGapEngine",
        why: "Maintains arc continuity (no plot holes)."
      },
      {
        type: "style",
        finding: "Inconsistent tone: switch from first to third person.",
        correction: "Convert the highlighted section to first person for style consistency.",
        engine: "StyleCorrectionAI",
        why: "Maintains narrative voice; as author prefers first person."
      }
    ]);
    setLoading(false);
  }
  function acceptSuggestion(idx) {
    // Log feedback for adaptivity (not shown here)
    alert("Applied suggestion: " + suggestions[idx].correction);
  }
  function rejectSuggestion(idx) {
    // Training: learns user's intent
    alert("Suggestion ignored, will adjust future output!");
  }
  return (
    <div style={{background:"#f9fded",borderRadius:11,padding:17,maxWidth:600}}>
      <button onClick={runEngines} disabled={loading}>
        {loading ? "Scanning..." : "Run Correction & Gap Engines"}
      </button>
      {suggestions.length > 0 && (
        <ul style={{marginTop:11}}>
          {suggestions.map((s, i) => (
            <li key={i} style={{marginBottom:13,background:"#fffbe8",padding:13,borderRadius:7,border:"1px solid #eec"}}>
              <b>Finding:</b> {s.finding}<br/>
              <b>Suggestion:</b> {s.correction}<br/>
              <span style={{color:"#888"}}>
                <b>Engine:</b> {s.engine} | <b>Why:</b> {s.why}
              </span><br/>
              <button
                style={{marginTop:5,marginRight:6}}
                onClick={()=>acceptSuggestion(i)}>Accept</button>
              <button style={{marginTop:5}} onClick={()=>rejectSuggestion(i)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}