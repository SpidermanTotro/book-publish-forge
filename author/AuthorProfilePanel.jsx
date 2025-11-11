import React from "react";

/**
 * Props:
 * - author: { id, name, avatar, bio, genres, styleSummary, works: [ {title, projectId, summary, year} ] }
 * - onInvite?: (authorId, projectId) => void
 */
export default function AuthorProfilePanel({ author, onInvite }) {
  return (
    <div style={{border:"1px solid #acb",background:"#f8f5ff",borderRadius:11,padding:18,maxWidth:410}}>
      <div style={{display:'flex',alignItems:"center",marginBottom:12}}>
        <img src={author.avatar} alt={author.name} style={{width:59,height:59,borderRadius:"50%",marginRight:17}}/>
        <div>
          <b style={{fontSize:"1.18em"}}>{author.name}</b><br/>
          <span style={{color:"#77a"}}>{author.genres.join(", ")}</span>
        </div>
      </div>
      <div style={{color:"#345"}}><i>{author.bio}</i></div>
      <div style={{marginTop:9, fontSize:"0.98em"}}><b>Signature Style:</b> <span style={{color:"#876"}}>{author.styleSummary}</span></div>
      <div style={{marginTop:11}}><b>Works:</b>
        <ul>
          {author.works.map(w=>
            <li key={w.projectId}><b>{w.title}</b> ({w.year}): <span style={{color:"#555"}}>{w.summary}</span></li>
          )}
        </ul>
      </div>
      {onInvite && (
        <button onClick={()=>onInvite(author.id)}>Invite to Project</button>
      )}
    </div>
  );
}