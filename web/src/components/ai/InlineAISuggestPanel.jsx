import React, { useState } from "react";
/**
 * Props:
 * - text (what user has written so far)
 * - onAccept (callback with AI suggestion)
 * - context (scene/project/etc for more context)
 */
export default function InlineAISuggestPanel({ text, onAccept, context }) {
  const [aiText, setAiText] = useState("");
  const [loading, setLoading] = useState(false);
  async function askAI() {
    setLoading(true); setAiText("");
    // Replace this with your real endpoint!
    await new Promise(r=>setTimeout(r,700));
    setAiText("[AI Suggestion]\n" + (text ? "Following your current writing..." : "Start your story!"));
    setLoading(false);
  }
  return (
    <div style={{marginTop:9,marginBottom:9,padding:10,background:"#eef6fc",borderRadius:8}}>
      <button onClick={askAI} disabled={loading}>{loading?"AI Thinking...":"Ask AI for Next"} </button>
      {aiText && (
        <div style={{marginTop:8,background:"#fff",padding:8,borderRadius:6}}>
          <b>AI Suggestion:</b> <br />
          <span>{aiText}</span>
          <div>
            <button
              style={{marginTop:6,marginRight:8}}
              onClick={()=>onAccept(aiText)}
            >Accept</button>
          </div>
        </div>
      )}
    </div>
  );
}