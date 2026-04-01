import React from "react";
export default function MagazineDashboard({ issues, onCreate, onOpen }) {
  return (
    <div style={{padding:22}}>
      <h2>Smash Magazine Hub</h2>
      <button onClick={onCreate} style={{marginBottom:12, fontWeight:700}}>+ New Issue/Anthology</button>
      <div style={{display:"flex",gap:18,flexWrap:"wrap"}}>
        {issues.map((issue, i) => (
          <div key={i} style={{
            background:"#fffbe9",borderRadius:11,padding:17,minWidth:210,boxShadow:"1px 2px 8px #ddc",cursor:"pointer"
          }} onClick={()=>onOpen(issue.id)}>
            <b>{issue.title}</b>
            <div style={{color:"#888",marginBottom:4}}>Edition: {issue.edition || i+1}</div>
            <div>Stories: {issue.stories.length}</div>
            <div>Theme: <i>{issue.theme}</i></div>
          </div>
        ))}
      </div>
    </div>
  );
}