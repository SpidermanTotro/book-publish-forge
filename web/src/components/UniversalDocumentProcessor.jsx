import React, { useState } from "react";
import NaughtyConverter from "./NaughtyConverter.jsx";
import EthicsReviewPanel from "./EthicsReviewPanel.jsx";
import AuditLog from "./AuditLog.jsx";

export default function UniversalDocumentProcessor() {
  const [doc, setDoc] = useState("");
  const [mode, setMode] = useState("unknown");
  const [converted, setConverted] = useState("");
  const [auditEntries, setAuditEntries] = useState([]);
  const [lastAction, setLastAction] = useState("");

  function handleLoad(e) {
    const text = e.target.value;
    setDoc(text);
    setConverted("");
    setMode("unknown");
    setLastAction("");
  }

  function onClassify(modeDetect) {
    setMode(modeDetect);
    setLastAction(`Classified as ${modeDetect}`);
    setAuditEntries(prev => [
      ...prev,
      { time: new Date(), action: "Classified", details: `Text: ${modeDetect}` }
    ]);
  }

  function onConvert(type, newText) {
    setConverted(newText);
    setLastAction(type === "naughtify" ? "Converted to Erotic" : "Cleaned to Normal");
    setAuditEntries(prev => [
      ...prev,
      { time: new Date(), action: type === "naughtify" ? "Naughtified" : "Cleansed", details: "Document auto-transformed." }
    ]);
  }

  function onAudit(action, details) {
    setAuditEntries(prev => [
      ...prev,
      { time: new Date(), action, details }
    ]);
  }

  return (
    <div style={{background:"#fdf6f7",maxWidth:810,margin:"36px auto",borderRadius:12,padding:21}}>
      <h2>Universal Document Processor - Naughty/Normal Merge & Audit</h2>
      <textarea placeholder="Paste or import document…" value={doc}
        onChange={handleLoad} style={{width:"100%",height:120,padding:8,marginBottom:12}}/>
      <NaughtyConverter
        doc={doc}
        setMode={onClassify}
        mode={mode}
        onConvert={onConvert}
      />
      <EthicsReviewPanel
        content={converted || doc}
        onProceed={() => onAudit("EthicsPassed", "Ready to Publish/Export.")}
      />
      <button style={{marginTop:18,padding:"11px 24px",background:"#1e944b",color:"#fff",fontWeight:700,border:"none",borderRadius:7}}
        onClick={()=>onAudit("Saved", "Document version exported or finalized.")}>
        Save & Log
      </button>
      <AuditLog initialEntries={auditEntries}/>
      {lastAction && <div style={{marginTop:10, color:"#188", fontWeight:700}}>Last: {lastAction}</div>}
    </div>
  );
}