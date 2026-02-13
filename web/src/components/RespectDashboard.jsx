import React from "react";

// Mock stats data for demo
const stats = {
  overallRespectScore: 92,
  flaggedStories: 3,
  totalStories: 48,
  eroticScore: 89,
  mainScore: 96,
  consentWithdrawals: 2,
  takedownRequests: 1,
  positiveFeedback: 140,
  negativeFeedback: 5,
  topContributors: [
    {name: "Ava Storm", mode: "erotic", score: 97},
    {name: "J. Roberts", mode: "main", score: 99},
  ]
};

export default function RespectDashboard() {
  return (
    <div style={{background:"#ebf6fa",borderRadius:12,padding:28,maxWidth:830,margin:"32px auto"}}>
      <h2>Respect & Empowerment Dashboard</h2>
      <b>Overall Respect Score:</b>
      <span style={{fontSize:"2em", color:"#1e944b", marginLeft:15}}>{stats.overallRespectScore}%</span>
      <div style={{margin:"16px 0"}}>
        <b>Mainstream:</b> <span style={{color:"#205ba8"}}>{stats.mainScore}%</span>{" | "}
        <b>Erotic Forge:</b> <span style={{color:"#a1055a"}}>{stats.eroticScore}%</span>
      </div>
      <div>
        <b>Flagged Stories:</b> {stats.flaggedStories} / {stats.totalStories}<br/>
        <b>Consent Withdrawals:</b> {stats.consentWithdrawals} &nbsp;&nbsp;
        <b>Takedown Requests:</b> {stats.takedownRequests}<br/>
        <b>Positive Feedback:</b> {stats.positiveFeedback} &nbsp;&nbsp;
        <b>Negative Feedback:</b> {stats.negativeFeedback}
      </div>
      <h3 style={{marginTop:"20px"}}>Top Contributors</h3>
      <ul>
        {stats.topContributors.map((c,i)=>
          <li key={i}>
            <span style={{color:c.mode==="erotic"?"#a1055a":"#205ba8",fontWeight:"bold"}}>
              {c.name} ({c.mode==="erotic"?"Erotic":"Main"})
            </span>{" "}
            – Respect Score: <b>{c.score}%</b>
          </li>
        )}
      </ul>
    </div>
  );
}