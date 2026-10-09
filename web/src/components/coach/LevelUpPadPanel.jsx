import React, { useState } from "react";
/**
 * Props:
 * - level: "starter" | "medium" | "advanced"
 * - writingSample: user text
 * - onLevelChange: fn(nextLevel)
 */
const skillMap = {
  starter: {
    label: "Starter",
    help: "Let’s master structure, inspiration, and basic storytelling. Ready for bite-sized tips and encouragement?",
    challenges: [
      "Write a 3-sentence scene featuring a surprise.",
      "Describe a character using all 5 senses.",
      "Rewrite a paragraph in shorter sentences."
    ]
  },
  medium: {
    label: "Medium",
    help: "Time for style, voice, and pacing practice. Ready for a real writer’s workshop?",
    challenges: [
      "Edit for better pacing: cut 2 unnecessary sentences.",
      "Turn 1 summary into dialogue.",
      "Mirror the style of a famous author in this paragraph."
    ]
  },
  advanced: {
    label: "Advanced",
    help: "Theme, subtext, and mastery. You’ll get tough AI challenge critiques and must show deep skills.",
    challenges: [
      "Weave a running motif/echo into a scene.",
      "Hide a clue for the reader (foreshadow subtly).",
      "Identify and remove all clichés in your passage."
    ]
  }
};

export default function LevelUpPadPanel({ level="starter", writingSample="", onLevelChange }) {
  const [feedback, setFeedback] = useState("");
  const skill = skillMap[level] || skillMap.starter;
  async function getFeedback(challenge) {
    setFeedback("AI reading...");
    // Replace with live AI critique:
    await new Promise(r=>setTimeout(r, 900));
    setFeedback("[AI Feedback]\n\n" + (level==="starter"
      ? "Great start! Try being even more specific about senses."
      : level==="medium"
      ? "Nice dialogue! Consider cutting adverbs for sharper style."
      : "Masterful foreshadowing—did you intend the symbol as a clue? Clichés: 'brave as a lion'—consider cutting that."
    ));
  }
  return (
    <div style={{background:"#fbf7ee",borderRadius:11,padding:18,maxWidth:540,border:"1.3px solid #eca",margin:"22px 0"}}>
      <h3>Level Up Your Writing: {skill.label}</h3>
      <div style={{color:"#679",marginBottom:7}}>{skill.help}</div>
      <div>
        {skill.challenges.map((c,i) => (
          <div key={i} style={{marginBottom:6}}>
            <button onClick={()=>getFeedback(c)}>{c}</button>
          </div>
        ))}
      </div>
      {!!feedback && (
        <div style={{marginTop:13,background:"#fefffd",padding:10,borderRadius:8,color:"#387",fontFamily:"monospace"}}>
          {feedback}
        </div>
      )}
      <div style={{marginTop:12}}>
        <b>Change Level: </b>
        <select value={level} onChange={e=>onLevelChange?.(e.target.value)}>
          <option value="starter">Starter</option>
          <option value="medium">Medium</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
    </div>
  );
}