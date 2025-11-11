import React, { useState } from "react";
export default function SequelGeneratorPanel({ author, lastProject, onGenerated }) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateSequel() {
    setLoading(true);
    // Real: send author.styleSummary, world/arc/scene data, prev book summary, etc to AI API.
    await new Promise(r => setTimeout(r, 1100));
    const sequel = {
      title: "The Shadowglass Returns",
      summary: "Evalyn returns to confront her legacy. The Black Queen's secret threatens the world. Old enemies become allies as the true villain emerges.",
      hookScene: "Evalyn stands on the ruined battlements, the shadows stirring at her call as dawn peeks over a haunted city..."
    };
    setOutput(
      `**Title:** ${sequel.title}\n\n` +
      `**Summary:** ${sequel.summary}\n\n` +
      `**Opening Scene Snippet:**\n${sequel.hookScene}\n`
    );
    setLoading(false);
    onGenerated?.(sequel);
  }

  return (
    <div style={{ marginTop: 19, background: "#fffbe8", borderRadius: 13, padding: 14, border: "1.1px solid #fd7" }}>
      <button onClick={generateSequel} disabled={loading}>
        {loading ? "AI Thinking..." : "Generate Sequel"}
      </button>
      {output && (
        <div style={{ marginTop: 10, whiteSpace: "pre-line", background: "#f9fff2", border: "1px solid #cfc", borderRadius: 10, padding: 12 }}>
          {output}
        </div>
      )}
    </div>
  );
}