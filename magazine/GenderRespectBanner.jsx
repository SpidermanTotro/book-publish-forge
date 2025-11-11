import React from "react";
export default function GenderRespectBanner({ contentStatus }) {
  if (!contentStatus.flagged) return null;
  return (
    <div style={{
      background:"#fbeaea",
      color:"#940a2d",
      fontWeight:700,
      borderRadius:8,padding:"10px 18px",fontSize:"1.1em",margin:"12px 0"
    }}>
      {contentStatus.why}
      <div style={{color:"#b07",marginTop:4,fontWeight:400}}>
        This content will not be published until revised for respect, inclusion, and empowerment.
      </div>
    </div>
  );
}
// usage: <GenderRespectBanner contentStatus={{flagged: true, why: "Objectifying language detected."}} />