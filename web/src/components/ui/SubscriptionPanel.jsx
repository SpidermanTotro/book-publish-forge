import React, { useState } from "react";
export default function SubscriptionPanel({ user }) {
  const [sub, setSub] = useState(user?.isPro ? "pro" : "free");
  return (
    <div style={{background:"#f7f8fd",border:"1.7px solid #acb",borderRadius:11,padding:19,maxWidth:330}}>
      <h3>Your Plan</h3>
      <div>Current: <b style={{color:sub==="pro"?"#27a":"#333"}}>{sub==="pro"?"Pro":"Free"}</b></div>
      <button
        style={{marginTop:12,padding:"7px 28px",background:"#27a",color:"#fff",borderRadius:9}}
        onClick={()=>setSub(s=>s==="pro"?"free":"pro")}
      >{sub==="pro"?"Downgrade to Free":"Upgrade to Pro"}</button>
      <div style={{fontSize:"0.89em",color:"#678",marginTop:9}}>
        Pro plans unlock advanced AI and collaborative tools.
      </div>
    </div>
  );
}