import React, { useState } from "react";

/**
 * Props:
 * - project: {id, name, collaborators?: array}
 * - onInvite: (emailOrUsername, role) => void
 */
export default function InviteCollaboratorPanel({ project, onInvite }) {
  const [input, setInput] = useState("");
  const [role, setRole] = useState("writer");
  return (
    <div style={{marginTop:19, marginBottom:7, background:"#faf8e3",borderRadius:9,padding:14,border:"1.1px solid #ed3"}}>
      <b>Invite Collaborator</b><br/>
      <input placeholder="email or username" value={input} onChange={e=>setInput(e.target.value)} style={{marginRight:13}}/>
      <select value={role} onChange={e=>setRole(e.target.value)}>
        <option value="writer">Writer</option>
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
      </select>
      <button style={{marginLeft:11}} onClick={()=>input && onInvite(input,role)}>Invite</button>
      <div style={{marginTop:10, fontSize:"0.94em",color:"#968"}}>
        Current collaborators:
        {(project.collaborators||[]).map((u,i)=>
          <span key={i} style={{marginLeft:8,padding:"2px 10px",background:"#eef",borderRadius:6}}>
            {u.name||u.email} <span style={{color:"#789"}}>({u.role})</span>
          </span>
        )}
      </div>
    </div>
  );
}