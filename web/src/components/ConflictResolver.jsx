import React, { useState } from "react";

// Simulated diff for demo; real apps should use a diff library e.g. diff-match-patch
function simpleLineDiff(a, b) {
  const aLines = a.split('\n'), bLines = b.split('\n');
  let out = [];
  for (let i=0; i<Math.max(aLines.length, bLines.length); ++i) {
    if (aLines[i] !== bLines[i]) out.push({i, a: aLines[i]||"", b: bLines[i]||""});
  }
  return out;
}

export default function ConflictResolver({ local, remote, onResolve }) {
  const [choice, setChoice] = useState(null);
  const diffs = simpleLineDiff(local, remote);

  return (
    <div style={{
      background: "#fffbe6", border: "2px solid #dea401",
      borderRadius: 14, padding: 23, maxWidth: 800, margin: "38px auto"
    }}>
      <h2>Resolve Conflict</h2>
      <div>
        <b>Conflict detected!</b> Both versions were changed offline/online.<br/>
        Please review and choose which to keep, or merge by hand.
      </div>
      <div style={{margin: "18px 0 9px 0"}}>
        <span style={{textDecoration:"underline"}}>Differences:</span>
        <ul style={{fontFamily:"monospace", fontSize:".97em"}}>
        {diffs.map(d =>
          <li key={d.i} style={{color:"#c00"}}>
            Line {d.i+1}: <br/>
            <span style={{fontWeight:700}}>Local:</span> "{d.a}"<br/>
            <span style={{fontWeight:700}}>Remote:</span> "{d.b}"
          </li>)}
        </ul>
      </div>
      <div>
        <button
          onClick={()=>setChoice('local')}
          style={{background:"#3d89d8",color:"#fff",marginRight:9,padding:"7px 16px",border:"none",borderRadius:6,fontWeight:700}}>
          Keep Local Version
        </button>
        <button
          onClick={()=>setChoice('remote')}
          style={{background:"#92979b",color:"#fff",marginRight:9,padding:"7px 16px",border:"none",borderRadius:6,fontWeight:700}}>
          Keep Remote Version
        </button>
        <button
          onClick={()=>setChoice('merge')}
          style={{background:"#fbba4a",color:"#333",padding:"7px 16px",border:"none",borderRadius:6,fontWeight:700}}>
          Merge Manually
        </button>
      </div>
      {choice === 'merge' && (
        <div style={{marginTop:18}}>
          <textarea style={{width:"98%",height:120,padding:8}} defaultValue={local+"\n"+remote}></textarea>
        </div>
      )}
      {choice && (
        <div style={{marginTop:15}}>
          <button
            style={{background:"#1fa663",color:"#fff",border:"none",padding:"8px 20px",borderRadius:6,fontWeight:700}}
            onClick={()=>onResolve(choice)}>
            Resolve & Continue
          </button>
        </div>
      )}
    </div>
  );
}