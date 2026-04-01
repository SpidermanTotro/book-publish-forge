import React, { useState } from "react";
import NaughtyConverter from "./NaughtyConverter.jsx";
import EthicsReviewPanel from "./EthicsReviewPanel.jsx";
import AuditLog from "./AuditLog.jsx";

export default function MasterForgeModule() {
  const [doc, setDoc] = useState("");
  const [mode, setMode] = useState("unknown");
  const [converted, setConverted] = useState("");
  const [auditEntries, setAuditEntries] = useState([]);
  const [lastAction, setLastAction] = useState("");

  function handleLoad(ev) {
    setDoc(ev.target.value || "");
    setConverted("");
    setMode("unknown");
    setLastAction("");
  }

  function onClassify(modeDetect) {
    setMode(modeDetect);
    setLastAction(`Classified as ${modeDetect}`);
    setAuditEntries(e => [
      ...e,
      {
        time: new Date(),
        action: "Classified",
        details: `Document classified as: ${modeDetect}`
      }
    ]);
  }

  function onConvert(type, newText) {
    setConverted(newText);
    setLastAction(type === "naughtify" ? "Converted to Erotic" : "Cleaned to Normal");
    setAuditEntries(e => [
      ...e,
      {
        time: new Date(),
        action: type === "naughtify" ? "Naughtified" : "Cleansed",
        details: "Document auto-transformed via converter."
      }
    ]);
  }

  function onEthicsProceed() {
    setAuditEntries(e => [
      ...e,
      {
        time: new Date(),
        action: "Ethics Review Passed",
        details: "Document passed all ethics/consent checks."
      }
    ]);
    setLastAction("Ethics check passed");
  }

  function handleExport() {
    setAuditEntries(e => [
      ...e,
      {
        time: new Date(),
        action: "Exported",
        details: "Document exported/output."
      }
    ]);
    setLastAction("Document exported");
  }

  return (
    <div style={{background:"#f9f5fd", padding:32, borderRadius:14, maxWidth:920, margin:"40px auto"}}>
      <h1>Book Publish AI & Erotic Forge Master Pipeline</h1>
      <textarea
        style={{width:"100%",height:110,padding:8,marginBottom:14, borderRadius:6}}
        placeholder="Paste or import your draft here..."
        value={doc}
        onChange={handleLoad}
      />
      <NaughtyConverter
        doc={doc}
        setMode={onClassify}
        mode={mode}
        onConvert={onConvert}
      />
      <EthicsReviewPanel
        content={converted || doc}
        onProceed={onEthicsProceed}
      />
      <button
        style={{marginTop:19, padding:"12px 29px", background:"#782ca1", color:"#fff", border:"none", borderRadius:8, fontWeight:"bold"}}
        onClick={handleExport}
      >
        Export / Publish
      </button>
      <div style={{marginTop:25}}>
        <AuditLog initialEntries={auditEntries} />
      </div>
      {lastAction && (
        <div style={{marginTop:10, color:"#168", fontWeight:"bold"}}>
          Last Action: {lastAction}
        </div>
      )}
    </div>
  );
}