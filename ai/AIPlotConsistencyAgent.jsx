import React, { useState } from "react";

/**
 * Props:
 * - project: {scenes, characters, ...}
 * - onResult?: (output) => void
 */
export default function AIPlotConsistencyAgent({ project, onResult }) {
  const [status, setStatus] = useState("");
  const [output, setOutput] = useState("");

  async function check() {
    setStatus("Scanning with AI...");
    // Demo agent prompt, real API call needed
    const prompt = `
Analyze this novel for plot holes or missing arcs. List any inconsistencies where named characters, items, or locations are dropped for too long, or actions are forgotten.
Characters: ${project.characters?.map(c=>c.name).join(", ")}
Scenes: ${project.scenes?.length}
== SCENES ==
${project.scenes?.map(s=>`- ${s.title}: ${s.text?.slice(0,130)}`).join("\n")}
`.slice(0, 4500); // prompt limit
    await new Promise(r=>setTimeout(r, 1000));
    setOutput("[AI Output Example]\n\n- Detected: Character 'Sam' introduced in Chapter 2 but absent for 7 chapters.\n- Antagonist weapon lost in Chapter 10, never mentioned again.");
    setStatus("");
    if (onResult) onResult(output);
  }

  return (
    <div style={{background:"#fff8fc",border:"1.3px solid #faa",borderRadius:10,padding:15,maxWidth:700,margin:"18px 0"}}>
      <h3>Plot Consistency Checker</h3>
      {status ? <b>{status}</b> : <button onClick={check}>Run Plot Consistency/Arc Checker</button>}
      {output && (
        <div style={{background:"#fafafa",borderRadius:7,padding:"10px 11px",marginTop:10,fontFamily:"monospace"}}>
          <pre style={{margin:0}}>{output}</pre>
        </div>
      )}
    </div>
  );
}