import React, { useState } from "react";

/**
 * Props:
 * - context: "project" | "character" | "location" | "scene"
 * - data: { name, description, ... }  // data for the context to feed to AI
 * - onCopy?: (output) => void
 */
export default function AIHelperPanel({ context, data, onCopy }) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const promptMap = {
    project: "Write a one-paragraph blurb for this novel project, summarizing its genre and core hook.",
    character: `Write a short, style-appropriate two-sentence character description for "${data.name}".`,
    location: `Write a vivid one-sentence description of the location "${data.name}".`,
    scene: `Summarize this scene and suggest the next possible event in the story.`
  };

  async function handleRequest() {
    setLoading(true); setOutput("");
    try {
      // --- Replace below with direct call to your /api/ai-blurb or OpenAI API ---
      const prompt = `${promptMap[context]}\n\nContext: ${JSON.stringify(data, null, 1)}`;
      // Fake AI response for prototype:
      await new Promise(r => setTimeout(r, 800));
      setOutput(
        "🪄 [This would be an AI response: project blurb, vivid character, etc.]\n\n" +
        `Prompt: ${prompt}`
      );
      // To call OpenAI, use fetch:
      // const res = await fetch("/api/ai-blurb", { method: "POST", body: JSON.stringify({ prompt }) });
      // const text = await res.text(); setOutput(text);
    } catch (e) {
      setOutput("AI generation failed: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      padding: 14, background: "#f6f5fc", border: "1px solid #cce",
      borderRadius: 8, marginTop: 14, marginBottom: 10, maxWidth: 570
    }}>
      <b>AI Helper</b>
      <div style={{ margin: "9px 0" }}>
        {context === "project" && <span>Get a synopsis or punchy blurb for your novel/project.</span>}
        {context === "character" && <span>Generate a memorable description for this character.</span>}
        {context === "location" && <span>AI-prose a setting blurb for this place.</span>}
        {context === "scene" && <span>Summarize or get ideas for the next scene beat.</span>}
      </div>
      <button onClick={handleRequest} disabled={loading}>
        {loading ? "Thinking…" : "Generate with AI"}
      </button>
      {output && (
        <div style={{ marginTop: 10, fontFamily: "monospace", background: "#FAFAFF", padding: 10, borderRadius: 6 }}>
          <span>{output}</span>
          <button
            style={{ marginLeft: 18, marginTop:3, fontSize: "0.97em" }}
            onClick={() => {
              navigator.clipboard.writeText(output);
              if (onCopy) onCopy(output);
            }}>Copy</button>
        </div>
      )}
    </div>
  );
}