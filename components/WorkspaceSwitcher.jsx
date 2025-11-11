import React from "react";
export default function WorkspaceSwitcher({mode, setMode}) {
  return (
    <div style={{
      margin:"22px auto", padding:18, maxWidth:475,
      background:"#f2ecff", borderRadius:11, textAlign:"center"
    }}>
      <b>Choose your creative workspace:</b><br/>
      <button
        style={{
          margin:"12px 13px",padding:"12px 31px",fontWeight:700,
          background:mode==="main"?"#158ed9":"#ccc",color:"#fff",border:"none",borderRadius:8
        }}
        onClick={()=>setMode("main")}>
        Book Forge (Mainstream)
      </button>
      <button
        style={{
          margin:"12px 13px",padding:"12px 31px",fontWeight:700,
          background:mode==="erotic"?"#a1055a":"#eee",
          color:mode==="erotic"?"#fff":"#a1055a",border:"none",borderRadius:8
        }}
        onClick={()=>setMode("erotic")}>
        Erotic Forge (Adult & Spicy)
      </button>
      <div style={{marginTop:11, color:"#777",fontSize:".97em"}}>
        <b>Mode:</b> {mode==="main"? "Mainstream, all-ages writing":
          "Erotic, adult creative & sensual publishing"
        }
      </div>
    </div>
  );
}