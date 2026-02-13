import React, { useState } from "react";
export default function TurnBasedCoWritePanel({ text, onNewText, context }) {
  const [mode, setMode] = useState("human");
  const [aiText, setAiText] = useState("");
  async function aiWrite() {
    setMode("ai-thinking"); setAiText("");
    await new Promise(r=>setTimeout(r,900));
    setAiText("[AI’s Next Section]\nThe adventure continues with a twist...");
    setMode("ai-review");
  }
  function acceptAI() {
    onNewText(prev => (prev + "\n" + aiText));
    setMode("human"); setAiText("");
  }
  return (
    <div style={{margin:"16px 0",background:"#f7f4fd",borderRadius:10,padding:12}}>
      <b>Co-Writing Mode:</b>{" "}
      <button onClick={()=>setMode(mode==="human"?"ai":"human")}>
        Switch to {mode==="human"?"AI":"Human"}
      </button>
      {mode==="ai" && (
        <span>
          <button style={{marginLeft:13}} onClick={aiWrite}>AI Write Next</button>
        </span>
      )}
      {mode==="ai-thinking" && <span style={{marginLeft:17}}>AI generating...</span>}
      {mode==="ai-review" && <div style={{marginTop:12}}>
        <pre style={{background:"#fffbe9",padding:10,borderRadius:7}}>{aiText}</pre>
        <button onClick={acceptAI} style={{marginTop:7}}>Accept AI Section</button>
      </div>}
    </div>
  );
}