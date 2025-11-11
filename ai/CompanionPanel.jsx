import React, { useState, useEffect } from "react";
export default function CompanionPanel({ manuscript, isOnline, onOfflinePrompt }) {
  const [inactivity, setInactivity] = useState(0);
  const [tip, setTip] = useState("");
  // In an actual app, would use a doc-wide activity hook & local change tracker

  useEffect(() => {
    let timer = setInterval(() => setInactivity(i => i + 1), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (inactivity > 6 && !tip) {
      setTip("You’ve been away—want a quick warm-up prompt or scene review?");
      if(onOfflinePrompt) onOfflinePrompt();
    }
  }, [inactivity]);

  function aiAssist() {
    setTip(isOnline
      ? "Analyzing your script holistically... Remember, the subplot you started in Act I is still unresolved in Act III."
      : "Offline! AI still available. Let’s check continuity: last scene is consistent. Want more tips when reconnected?");
  }

  function resetIdle() {
    setInactivity(0); setTip("");
  }

  return (
    <div style={{background:"#e8fbef",border:"1.3px solid #bde",borderRadius:12,padding:17,maxWidth:400,marginTop:19}}>
      <b>AI Companion</b> – <span style={{color:isOnline?"#187":"#d70"}}>{isOnline ? "Connected" : "Offline (local AI active)"}</span>
      <button style={{marginLeft:12}} onClick={aiAssist}>Guide Me</button>
      <div style={{color:"#778",fontSize:"0.97em",marginTop:10}}>
        {tip && <div>{tip}</div>}
        {inactivity > 0 && <i>Inactivity: {inactivity} min</i>}
      </div>
      <button style={{marginTop:7}} onClick={resetIdle}>I'm back!</button>
    </div>
  );
}