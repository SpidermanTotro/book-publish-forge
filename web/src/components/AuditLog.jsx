import React, { useState } from "react";

export default function AuditLog({ initialEntries = [] }) {
  const [entries] = useState(initialEntries);

  // Function to add log entries (can be used by parent components)
  // Removed local addLog function as entries are now managed externally

  return (
    <div style={{
      background: "#f5f7fa",
      border : "1.5px solid #168de2",
      borderRadius: 10,
      padding: 20,
      maxWidth: 750,
      margin: "25px auto"
    }}>
      <h2>Audit Log (Respect & Ethics)</h2>
      <table style={{width: "100%", fontSize: "1em", borderCollapse: "collapse"}}>
        <thead style={{background:"#e8eef7"}}>
          <tr>
            <th style={{textAlign:"left", padding:"6px"}}>Time</th>
            <th style={{textAlign:"left", padding:"6px"}}>Action</th>
            <th style={{textAlign:"left", padding:"6px"}}>Details</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 && (
            <tr>
              <td colSpan={3} style={{color:"#789", padding:"10px"}}>No entries yet.</td>
            </tr>
          )}
          {entries.map(({id, time, action, details}) => (
            <tr key={id}>
              <td style={{color:"#333",padding:"5px"}}>{time.toLocaleString()}</td>
              <td style={{color:"#178",padding:"5px", fontWeight:"600"}}>{action}</td>
              <td style={{color:"#223",padding:"5px"}}>{details}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Real audit actions would be triggered by parent components */}
    </div>
  );
}