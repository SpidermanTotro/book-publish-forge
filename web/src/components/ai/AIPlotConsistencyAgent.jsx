import React, { useState } from "react";
import { callAI } from "../../services/aiService";

/** Plot consistency review uses only the configured loopback Ollama service. */
export default function AIPlotConsistencyAgent({ project = {}, onResult }) {
  const [status, setStatus] = useState("");
  const [output, setOutput] = useState("");

  async function check() {
    const scenes = Array.isArray(project.scenes) ? project.scenes : [];
    const characters = Array.isArray(project.characters) ? project.characters : [];
    if (!scenes.length) {
      setOutput("Add scenes to your project before checking plot consistency.");
      return;
    }

    setStatus("Checking with local Ollama...");
    try {
      const prompt = `Review this manuscript outline for possible plot inconsistencies.
Identify dropped characters, missing motivations, contradictory event order,
and unresolved story threads. Label uncertain suggestions as hypotheses.
Do not invent missing source scenes.
Characters: ${characters.map(c => c.name || "unnamed").join(", ")}
Scenes: ${scenes.length}
== SCENE EXCERPTS ==
${scenes.map(s => "- " + (s.title || "Untitled") + ": " + (s.text || "").slice(0, 200)).join("\n")}
`.slice(0, 7000);
      const result = await callAI(prompt, { temperature: 0.2 });
      setOutput(result || "The local model returned an empty response.");
      onResult?.(result);
    } catch (error) {
      setOutput("Local Ollama check unavailable: " + error.message);
    } finally {
      setStatus("");
    }
  }

  return (
    <div style={{ background: "#fff8fc", border: "1.3px solid #faa",
      borderRadius: 10, padding: 15, maxWidth: 700, margin: "18px 0" }}>
      <h3>Plot Consistency Checker (local AI)</h3>
      {status ? <b>{status}</b> :
        <button onClick={check}>Run Local Plot/Arc Checker</button>}
      {output && (
        <div style={{ background: "#fafafa", borderRadius: 7, padding: "10px 11px", marginTop: 10 }}>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{output}</pre>
        </div>
      )}
    </div>
  );
}
