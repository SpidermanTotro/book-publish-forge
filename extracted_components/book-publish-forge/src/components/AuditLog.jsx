import React from "react";

export default function AuditLog({ initialEntries = [] }) {
  return (
    <div style={{marginTop:17, background:"#f9fbe7", borderRadius:10, padding:20, maxWidth:730}}>
      <h3>Audit Log</h3>
      <ul style={{fontFamily:"monospace", fontSize:".98em"}}>
      {initialEntries.map((entry, i) =>
        <li key={i} style={{marginBottom:7}}>
          [{entry.time.toLocaleString()}] {entry.action} — {entry.details}
        </li>
      )}
      {initialEntries.length === 0 && (
        <li>No actions taken yet.</li>
      )}
      </ul>
    </div>
  );
}