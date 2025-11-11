import React from "react";
export default function PaparazziEthicsCheckPanel({ article }) {
  const flagged = [
    { type: "privacy", detail: "Article describes private location and movements of subject." },
    { type: "chase", detail: "Mentions pursuit by photographers; could reference car chase: high public risk." },
    { type: "legal", detail: "Describes methods (e.g. ‘exclusive photo’ in private setting) potentially violating local laws." }
  ];
  return (
    <div style={{background:"#fff0f0",border:"2px solid #f33",borderRadius:8,padding:15,maxWidth:580}}>
      <b>Ethics Risk & Fact Checker (Paparazzi Story Detection)</b>
      <ul>
        {flagged.map((f,i)=><li key={i}><b>{f.type.toUpperCase()}</b>: {f.detail}</li>)}
      </ul>
      <div style={{marginTop:10}}>
        <b>Editorial Action Required:</b>
        <ul>
          <li>Verify all claims with public sources.</li>
          <li>Remove invasive/personal/private details not in public interest.</li>
          <li>Include privacy warning and law status for readers and legal teams.</li>
        </ul>
        <span style={{color:"#555"}}>
          Example: <i>"Coverage of Princess Diana's final hours directly linked to paparazzi chasing, a tragic breach of privacy widely condemned by press councils and the public."</i>
        </span>
      </div>
    </div>
  );
}