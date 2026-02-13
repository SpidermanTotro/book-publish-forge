import React, { useState, useEffect } from "react";
/**
 * Props: suggestions: array [{user:"Alice", type:"ai"/"human", text, time}]
 */
export default function LiveAICollabSidebar({ suggestions }) {
  // Sample: [{user:"Alice",type:"human",text:"writes opening",time:"..."},{user:"ai",type:"ai",text:"suggest door opens",time:"..."}]
  return (
    <div style={{
      background:"#f4fafd", border:"1.2px solid #bbe",marginLeft:18,
      borderRadius:13,padding:13,maxWidth:285,minWidth:170
    }}>
      <b>Co-Writer Activity</b>
      <ul style={{fontSize:"0.97em",marginLeft:0,paddingLeft:0,listStyle:"none"}}>
        {suggestions.slice(-7).map((s,i)=>
          <li key={i} style={{
            background: s.type==="ai"?"#ecdff7":"#eaffea",
            marginBottom:6, borderRadius:6, padding:"6px 2px"
          }}>
            <b>{s.type==="ai"?"AI":"@"+s.user}</b>: {" "}
            <span style={{color:"#789"}}>{s.text.slice(0,64)}{s.text.length>64?"...":""}</span>
            <span style={{marginLeft:9,color:"#999",fontSize:"0.88em"}}>{s.time}</span>
          </li>
        )}
      </ul>
      <span style={{fontSize:"0.92em",color:"#88c"}}>See latest suggestions, edits, and who accepted them.</span>
    </div>
  );
}