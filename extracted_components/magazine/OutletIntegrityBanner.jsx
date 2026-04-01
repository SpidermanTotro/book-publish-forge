import React from "react";
export default function OutletIntegrityBanner({ outlet }) {
  let color, text;
  switch(outlet.status) {
    case "green": color = "#1e4"; text = "Trusted Journalist Outlet"; break;
    case "yellow": color = "#fea"; text = "Caution: Mixed Integrity / Inconsistent Reports"; break;
    case "red": color = "#e11"; text = "Warning! Unethical, high privacy/scam risk outlet – avoid spending money!"; break;
    default: color = "#aaa"; text = "Unrated outlet"; 
  }
  return (
    <div style={{
      background: color, color: "#211", borderRadius:7, fontWeight:700,
      padding:"10px 15px", fontSize:"1.18em", margin:"13px 0"
    }}>
      {text}
      <span style={{marginLeft:19, color: "#222", fontWeight:400}}>({outlet.name})</span>
    </div>
  );
}