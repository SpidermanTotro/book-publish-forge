import React, { useState } from "react";

// Mock notifications
const initialNotifications = [
  { id:1, msg: "Your takedown request for 'Green Dream' was Approved.", time: new Date() },
  { id:2, msg: "A flagged erotic story was resolved by admin.", time: new Date(Date.now()-500000) },
  { id:3, msg: "Your story 'Starfall' received positive community feedback.", time: new Date(Date.now()-900000) },
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(initialNotifications);

  return (
    <div style={{background:"#edf8fa",borderRadius:9,padding:24,maxWidth:450,margin:"38px auto"}}>
      <h2>Notification Center</h2>
      <ul style={{listStyle:"none",padding:0}}>
        {notifications.map(n =>
          <li key={n.id} style={{
            margin:"10px 0",background:"#fff",borderRadius:6,padding:"9px 12px",boxShadow:"0 0 4px #ccd"}}>
            <div style={{color:"#238", fontWeight:"bold"}}>{n.msg}</div>
            <div style={{fontSize:".95em",color:"#666"}}>{n.time.toLocaleString()}</div>
          </li>
        )}
      </ul>
      {notifications.length === 0 && <div>No notifications yet.</div>}
    </div>
  );
}