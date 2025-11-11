import React, { useState } from "react";

// Simulated AI verdicts; replace with real AI/ML/NLP calls in production
function analyzeContent(text) {
  // Simulated output
  if (!text) return [];
  const verdicts = [];
  if (/paparazzi|chased|unconsent(ed)?|privacy breach/i.test(text)) verdicts.push({
    type: "privacy",
    msg: "Possible privacy violation or paparazzi behavior detected. Remove/replace before publishing.",
    severity: "high"
  });
  if (/objectify|shame\b|degrade/i.test(text)) verdicts.push({
    type: "objectification",
    msg: "Objectifying or demeaning language detected. Rephrase for dignity and respect.",
    severity: "high"
  });
  if (/fake|mislead|hoax|rumor/i.test(text)) verdicts.push({
    type: "truth",
    msg: "Factually questionable or unverified claim detected. Cite or revise for accuracy.",
    severity: "medium"
  });
  return verdicts;
}

export default function EthicsReviewPanel({ content, onProceed }) {
  const [verdicts, setVerdicts] = useState(analyzeContent(content));

  return (
    <div style={{
      background: "#f7fafd", border: "2px solid #1fa4d8",
      borderRadius: 13, padding: 22, maxWidth: 740, margin: "32px auto"
    }}>
      <h2>Ethics & Respect Review</h2>
      {!content && <i style={{color:"#555"}}>Paste your story or article here to check for ethics/respect risks.</i>}
      {content && (
        <>
          {verdicts.length === 0 ? (
            <div style={{color: "#1b8232", fontWeight: 600}}>✅ No problems detected. Proceed with publishing!</div>
          ) : (
            <ul>
              {verdicts.map((v, i) =>
                <li key={i}
                  style={{color: v.severity==="high"? "#d00606" : "#915600", fontWeight:"bold", margin:"9px 0"}}>
                  {v.msg}
                </li>
              )}
            </ul>
          )}
          {verdicts.length > 0 ? (
            <div style={{color:"#b21313", marginTop:13, fontWeight:600}}>
              Please revise flagged issues before publishing. Contact an editor if you need help.
            </div>
          ) : (
            <button style={{marginTop:20, fontSize:"1.12em", background:"#1fa4d8", color:"#fff", border:"none", borderRadius:6, padding:"10px 25px"}} onClick={onProceed}>
              Publish with Respect
            </button>
          )}
        </>
      )}
    </div>
  );
}