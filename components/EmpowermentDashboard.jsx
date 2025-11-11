import React from "react";
export default function EmpowermentDashboard({ stats, leaders }) {
  return (
    <div style={{
      background:"#eaf6ff", padding:22, borderRadius:12, maxWidth:650, margin:"23px auto"
    }}>
      <h2>Empowerment & Respect Dashboard</h2>
      <ul style={{fontSize:"1.08em"}}>
        <li><b>Respect Score:</b> {stats.respectScore}/100</li>
        <li><b>Flagged Articles (30 days):</b> {stats.flagged}</li>
        <li><b>Takedowns Completed:</b> {stats.takedowns}</li>
        <li><b>User Reports Addressed:</b> {stats.reports}</li>
      </ul>
      <h3 style={{marginTop:20}}>Hall of Fame</h3>
      <ul>
        {leaders.map((l,i) =>
          <li key={i}><b>{l.name}</b>: {l.role} — Respect Score: {l.score}</li>
        )}
      </ul>
    </div>
  );
}