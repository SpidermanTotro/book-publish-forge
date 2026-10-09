import React, { useState } from "react";

/**
 * AI Beat/Scene Generator Panel
 * Props:
 * - context: "project" | "scene" | "chapter"
 * - data: { title, summary, [text], [outline], ... }  // Minimal key info for context
 * - onAccept: (suggestion: string) => void (optional)
 */
export default function AIBeatSceneGeneratorPanel({ context, data, onAccept }) {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  // You can tune the prompt, or expand for more advanced controls:
  const promptMap = {
    project: `Suggest an outline of 5-8 beats (major events or scenes) for the story below. List them in order, with 1-2 sentences each.`,
    chapter: `Suggest what should happen next in this chapter. Give 2-4 numbered beat ideas.`,
    scene: `Suggest the next best scene or story development that logically fits after this context. Reply in 1-3 sentences.`
  };

  async function handleGenerate() {
    setLoading(true);
    setSuggestion("");

    try {
      // --- Replace below with actual call to your cloud function, OpenAI, or Claude ---
      const prompt = `${promptMap[context]}\n\n====\nCONTEXT:\n${JSON.stringify(data, null, 1)}`;
      // Demo: simulate an AI response.
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuggestion(
        `[AI Example Output]\n` +
        (context === "project"
          ? `1. Inciting incident disrupts protagonist's world.\n2. Characters unite to pursue their goals.\n3. Dangerous antagonist is revealed.\n4. A major turning point tests loyalties.\n5. [Your outline would continue here...]`
          : context === "chapter"
          ? `1. The protagonist uncovers a troubling secret.\n2. Conflict escalates with a new obstacle.\n3. An ally offers unexpected help.`
          : `The next scene should show the protagonist making a pivotal decision that changes the story's direction or increases the stakes.`
        )
        + `\n\nPrompt:\n${prompt}`
      );
      // For real AI: POST { prompt } to your /api/ai-beat endpoint, parse text.
      // const resp = await fetch("/api/ai-beat", { method: "POST", body: JSON.stringify({ prompt }) });
      // const ai = await resp.text(); setSuggestion(ai);
    } catch (e) {
      setSuggestion("AI failed: " + e.message);
    }
    setLoading(false);
  }

  return (
    <div style={{
      background: "#f9faff", border: "1px solid #cbe",
      borderRadius: 8, margin: "16px 0", padding: 16, maxWidth: 650
    }}>
      <b>AI Beat/Scene Generator</b>
      <div style={{ margin: "8px 0 14px 0" }}>
        {context === "project" && <span>Generate an outline of beats for your whole story.</span>}
        {context === "chapter" && <span>Suggest beats for this chapter.</span>}
        {context === "scene" && <span>Suggest what should happen in the next scene.</span>}
      </div>
      <button disabled={loading} onClick={handleGenerate}>
        {loading ? "Generating…" : "Generate AI Suggestion"}
      </button>
      {suggestion && (
        <div style={{
          marginTop: 13, fontFamily: "monospace", fontSize: "1em",
          background: "#f7f7fc", padding: "10px 12px", borderRadius: 6
        }}>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{suggestion}</pre>
          <button
            style={{ marginLeft: 15, marginTop: 4, fontSize: "1em" }}
            onClick={() => {
              navigator.clipboard.writeText(suggestion);
              if (onAccept) onAccept(suggestion);
            }}
          >Copy</button>
        </div>
      )}
    </div>
  );
}