import React, { useState } from "react";
export default function ProofFinderPanel({ article, lastScan, results, onRescan }) {
  return (
    <div style={{background:"#effaf6",border:"1.6px solid #bbc",borderRadius:9,padding:15,maxWidth:650}}>
      <h3>Proof Finder: Article Trust Report</h3>
      <div>
        <b>Grade: </b>
        {results.grade === "green" && <span style={{color:"#2a8",fontWeight:700}}>✅ Trusted</span>}
        {results.grade === "yellow" && <span style={{color:"#aa0",fontWeight:700}}>🟡 Needs Sources</span>}
        {results.grade === "red" && <span style={{color:"#d22",fontWeight:700}}>❌ Flagged</span>}
        {results.legacy && (
          <span style={{color:"#4ae",fontWeight:700,marginLeft:18}}>🏅 Legacy Score: {results.legacy}</span>
        )}
      </div>
      <div style={{margin:"8px 0",fontSize:"0.96em"}}>Last Scan: {lastScan}</div>
      <table style={{width:"100%",borderCollapse:"collapse",marginTop:10}}>
        <thead>
          <tr style={{background:"#e5eeea"}}>
            <th align="left">Claim</th>
            <th align="left">Status</th>
            <th align="left">Evidence/Source</th>
          </tr>
        </thead>
        <tbody>
          {results.claims.map((c,i) => (
            <tr key={i} style={{background:c.status==="flagged"?"#fee4e1":c.status==="needs-review"?"#fffae4":"#e7ffea"}}>
              <td>{c.text}</td>
              <td>
                {c.status==="ok" && "Verified"}
                {c.status==="needs-review" && <b style={{color:"#aa0"}}>Needs Review</b>}
                {c.status==="flagged" && <b style={{color:"#d44"}}>Flagged</b>}
              </td>
              <td>
                {c.source ? <a href={c.source} target="_blank" rel="noopener noreferrer">Source</a>:"—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{marginTop:11}} onClick={onRescan}>Re-scan for Proof</button>
      {results.grade!=="green" && <div style={{color:"#b00",marginTop:8}}>
        Article cannot be published until all red flags are addressed.
      </div>}
    </div>
  );
}