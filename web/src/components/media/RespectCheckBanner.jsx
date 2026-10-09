import React from "react";
export default function RespectCheckBanner({ status }) {
  if (!status.flagged) return null;
  return (
    <div style={{
      background: "#e9f8fc",
      color: "#155478",
      borderRadius: 8,
      padding: "14px 20px",
      fontWeight: 700,
      fontSize: "1.1em",
      margin: "14px 0"
    }}>
      {status.reason}
      <div style={{color:"#197698",marginTop:6,fontWeight:400}}>
        Every person, famous or not, deserves basic respect and dignity. This story was flagged for review.
      </div>
    </div>
  );
}
// Usage: <RespectCheckBanner status={{flagged: true, reason: "No consent for private details about this Hollywood figure."}} />