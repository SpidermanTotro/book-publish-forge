import React, { useState, useEffect } from "react";

function classifyDoc(text) {
  if (/lust|nipple|moan|orgasm|thrust|erect|panties|member|climax|seduce|spank|arousal/i.test(text)) return "erotic";
  return "normal";
}

function makeNaughty(text) {
  return text.replace(/\bhand\b/gi, "caressing hand")
    .replace(/\bcaress\b/gi, "sensually caress")
    .replace(/\bsmile\b/gi, "sultry smile")
    + "\n[Magic: language heightened]";
}
function makeNormal(text) {
  return text.replace(/\b(nipple|erect|orgasm|climax|panties|thrust)\b/gi, "[redacted]")
    .replace(/\bsensual|sensually|sultry|seduce(d)?\b/gi, "gentle")
    .replace(/[.!]{2,}/g, ".");
}
function mergeNaughtyNormal(orig, naughty, clean) {
  // Example: merge preview. In production: true diff view.
  return (
    "--- Original ---\n" + orig +
    "\n--- Naughty ---\n" + naughty +
    "\n--- Non-Naughty (Clean) ---\n" + clean
  );
}

export default function NaughtyConverter({ doc, setMode, mode, onConvert }) {
  const [preview, setPreview] = useState("");
  useEffect(() => {
    if (!doc) return;
    const found = classifyDoc(doc);
    setMode(found);
  }, [doc, setMode]);
  function handleConvert(type) {
    if (type === "naughtify") {
      const naughtyVersion = makeNaughty(doc);
      setPreview(naughtyVersion);
      onConvert("naughtify", naughtyVersion);
    } else {
      const cleanVersion = makeNormal(doc);
      setPreview(cleanVersion);
      onConvert("clean", cleanVersion);
    }
  }
  function handleMerge() {
    setPreview(mergeNaughtyNormal(doc, makeNaughty(doc), makeNormal(doc)));
  }
  if (!doc) return <div style={{color:"#888"}}>Paste document to begin scan/conversion…</div>;
  return (
    <div style={{margin:"14px 0",background:"#f1f7fa",borderRadius:9,padding:17}}>
      <b>Detected:</b> <span style={{color:mode==="erotic"?"#a1055a":"#0c9443", fontWeight:700}}>{mode==="erotic"? "Erotic Forge" : "Book Forge"}</span>
      <div style={{marginTop:7}}>
        <button onClick={()=>handleConvert("naughtify")} disabled={mode==="erotic"} style={{marginRight:12}}>Convert to Naughty</button>
        <button onClick={()=>handleConvert("clean")} disabled={mode==="normal"} style={{marginRight:12}}>Convert to Non-Naughty</button>
        <button onClick={handleMerge}>Preview All Modes</button>
      </div>
      {preview && (
        <div style={{marginTop:10,fontFamily:"monospace",background:"#fff",padding:9,borderRadius:7}}>
          {preview}
        </div>
      )}
    </div>
  );
}