import React, { useState } from "react";
export default function CommandPalette({ actions }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  React.useEffect(() => {
    const handler = e => (e.ctrlKey && e.key==="k") && (setOpen(o=>!o),e.preventDefault());
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  if (!open) return null;
  const visible = actions.filter(a => a.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{position:"fixed",top:65,left:"50%",transform:"translateX(-50%)",background:"#fff",border:"2px solid #78c",borderRadius:9,padding:18,zIndex:1000,minWidth:320,boxShadow:"0 4px 22px #0003"}}>
      <input autoFocus value={q} onChange={e=>setQ(e.target.value)} style={{fontSize:"1.15em",width:"100%",marginBottom:13}} placeholder="Type a command..."/>
      <ul style={{listStyle:"none",padding:0,margin:0,maxHeight:200,overflowY:"auto"}}>
        {visible.map((a,i)=>
          <li key={i} style={{padding:"7px 0",cursor:"pointer"}} onClick={()=>{setOpen(false);a.action();}}>
            {a.label}
          </li>
        )}
        {visible.length === 0 && <li style={{color:"#b66"}}>No commands found.</li>}
      </ul>
      <span style={{fontSize:"0.88em",color:"#88a"}}>CMD/CTRL+K to open/close</span>
    </div>
  );
};