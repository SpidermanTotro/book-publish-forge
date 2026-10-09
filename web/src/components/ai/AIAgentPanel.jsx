import React, { useState } from "react";

/**
 * Props:
 * - agents: [{ id, name, description, getPrompt: (text, context) => string }]
 * - text: text to analyze/check (scene, chapter, etc)
 * - context: { project, scene, ... }
 */
export default function AIAgentPanel({ agents, text, context }) {
  const [agentId, setAgentId] = useState(agents[0]?.id || "");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const agent = agents.find(a => a.id === agentId);

  async function handleRun() {
    setLoading(true); setOutput("");
    try {
      // Replace below with your real AI backend
      const prompt = agent.getPrompt(text, context);
      await new Promise(r => setTimeout(r, 900));
      setOutput("[AI Output Demo]\n\n" +
        "Prompt: " + prompt + "\n\nChecked text excerpt:\n" +
        text.slice(0, 320));
      // Real: POST {prompt} to /api/ai-agent, get back string
      // const res = await fetch("/api/ai-agent", {method:"POST", body: JSON.stringify({ prompt })});
      // const ai = await res.text(); setOutput(ai);
    } catch (e) {
      setOutput("AI failed: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: "#f6fdfb", borderRadius: 10, padding: "17px 15px", border: "1px solid #cdd", maxWidth: 600 }}>
      <h3>AI Agents & Proofreading</h3>
      <div style={{ marginBottom: 9 }}>
        {agents.map(a =>
          <button
            key={a.id}
            onClick={() => setAgentId(a.id)}
            style={{
              marginRight: 10, fontWeight: agentId === a.id ? 700 : 400,
              background: agentId === a.id ? "#aef" : "#fff", borderRadius: 7, padding: "3px 15px"
            }}
          >{a.name}</button>
        )}
      </div>
      <p style={{ fontSize: "1.06em", color: "#456" }}>{agent?.description}</p>
      <button onClick={handleRun} disabled={loading || !text}>
        {loading ? "Checking…" : "Run Agent"}
      </button>
      {output && (
        <div style={{ background: "#fcfafc", marginTop: 13, padding: 10, borderRadius: 7, fontFamily: "monospace" }}>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{output}</pre>
          <button style={{ marginTop: 4, marginLeft: 11 }} onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
        </div>
      )}
    </div>
  );
}

// EXAMPLE AGENT CONFIG:
export const defaultAgents = [
  {
    id: "tone",
    name: "Tone Checker",
    description: "Check if passage matches the target mood/genre/tone. Suggest tweaks.",
    getPrompt: (text, context) =>
      `Does this text match the target tone (${context.project?.genre || "unknown"}) and mood? Suggest improvements.\n\nTEXT:\n${text}`,
  },
  {
    id: "voice",
    name: "Voice Consistency",
    description: "Analyze if the passage matches the established narrative voice.",
    getPrompt: (text, context) =>
      `Is the following written in the same style/voice as the project summary?\n---\nPROJECT SUMMARY: ${context.project?.description || ""}\n---\nPASSAGE:\n${text}`,
  },
  {
    id: "dialogue",
    name: "In-Character Dialogue",
    description: "Check if all character speech matches each character's established voice.",
    getPrompt: (text, context) =>
      `Does the following dialogue sound authentic and fit each character? Flag if out of character and suggest edit. TEXT:\n${text}`,
  },
  {
    id: "grammar",
    name: "Grammar/Spelling",
    description: "Proof for grammar, spelling, and basic style issues.",
    getPrompt: (text) => `Proofread for grammar, spelling, and clarity:\n${text}`,
  }
];