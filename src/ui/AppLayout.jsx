import React from "react";
export default function AppLayout({ top, sidebar, main, rightbar, bottombar }) {
  return (
    <div style={{height:"100vh",maxWidth:"100vw",display:"flex",flexDirection:"column",background:"var(--bg,#f7fafc)"}}>
      <div style={{height:60,padding:"0 19px",display:"flex",alignItems:"center",borderBottom:"1.5px solid #dde"}}>
        {top}
      </div>
      <div style={{flex:1,display:"flex",minHeight:0}}>
        <div style={{width:70,background:"#f8f9fd",borderRight:"1.3px solid #eef",display:"flex",flexDirection:"column",alignItems:"center"}}>
          {sidebar}
        </div>
        <div style={{flex:1,display:"flex",minHeight:0}}>
          <div style={{flex:1,overflowY:"auto",padding:22}}>{main}</div>
          <div style={{width:320,background:"#f6fafd",borderLeft:"1.1px solid #dde",overflowY:"auto"}}>
            {rightbar}
          </div>
        </div>
      </div>
      <div style={{height:38,background:"#f5f9fe",borderTop:"1.3px solid #dde",display:"flex",alignItems:"center",padding:"0 36px"}}>
        {bottombar}
      </div>
    </div>
  );
}