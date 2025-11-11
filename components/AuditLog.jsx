import React, { useState } from "react";

export default function AuditLog({ initialEntries = [] }) {
  const [entries, setEntries] = useState(initialEntries);

  // Add a new log entry
  function addLog(action, details) {
    setEntries(prev => [
      ...prev,
      {
        id: prev.length + 1,
        time: new Date(),
        action,
        details
      }
    ]);
  }

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
      {/* Example controls—replace these with real calls from main app logic */}
      <div style={{marginTop:18}}>
        <button onClick={() => addLog("Consent Revoked", "Model X withdrew consent for Story Y")}>
          Demo: Revoke Consent
        </button>
        <button style={{marginLeft:12}} onClick={() => addLog("Takedown Completed", "Article Z removed for privacy violation")}>
          Demo: Takedown
        </button>
        <button style={{marginLeft:12}} onClick={() => addLog("Respect Passed", "Book draft cleared all ethics checks")}>
          Demo: Pass Respect
        </button>
      </div>
    </div>
  );
}