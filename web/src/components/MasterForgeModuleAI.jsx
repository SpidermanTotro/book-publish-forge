import React, { useState } from "react";
import NaughtyConverterAI from "./NaughtyConverterAI.jsx";
import EthicsReviewPanel from "./EthicsReviewPanel.jsx";
import AuditLog from "./AuditLog.jsx";

/**
 * REAL AI-POWERED Master Forge Module
 * Uses actual LLMs instead of simple regex
 */
export default function MasterForgeModuleAI() {
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
    setLastAction(`AI classified as ${modeDetect}`);
    setAuditEntries(e => [
      ...e,
      {
        time: new Date(),
        action: "AI Classification",
        details: `Real LLM classified document as: ${modeDetect}`
      }
    ]);
  }

  function onConvert(type, newText) {
    setConverted(newText);
    const action = type === "naughtify" ? "AI Converted to Erotic" : "AI Cleaned to Normal";
    setLastAction(action);
    setAuditEntries(e => [
      ...e,
      {
        time: new Date(),
        action,
        details: `Real LLM transformed content via ${type === "naughtify" ? "erotic" : "normal"} conversion`
      }
    ]);
  }

  function onEthicsProceed() {
    setAuditEntries(e => [
      ...e,
      {
        time: new Date(),
        action: "Ethics Review Passed",
        details: "Document passed all ethics/consent checks with AI analysis."
      }
    ]);
    setLastAction("Ethics check passed");
  }

  function handleExport() {
    const content = converted || doc;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `book-forge-export-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    setAuditEntries(e => [
      ...e,
      {
        time: new Date(),
        action: "Exported",
        details: "Document exported with AI-processed content."
      }
    ]);
    setLastAction("Document exported");
  }

  return (
    <div style={{
      background:"#f9f5fd", 
      padding: 32, 
      borderRadius: 14, 
      maxWidth: 920, 
      margin: "40px auto",
      minHeight: "calc(100vh - 120px)"
    }}>
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: 24,
        borderRadius: 12,
        marginBottom: 24,
        color: "#fff"
      }}>
        <h1 style={{margin: 0, fontSize: "2.2em"}}>
          📚 Book Publish Forge - AI Edition
        </h1>
        <p style={{margin: "8px 0 0 0", fontSize: "1.1em", opacity: 0.95}}>
          Real AI-powered content transformation using Ollama or OpenAI
        </p>
      </div>

      <div style={{marginBottom: 20}}>
        <label style={{display: "block", marginBottom: 8, fontWeight: 600, color: "#4c1d95"}}>
          ✍️ Your Content
        </label>
        <textarea
          style={{
            width: "100%",
            height: 200,
            padding: 12,
            borderRadius: 8,
            border: "2px solid #e5e7eb",
            fontSize: "1em",
            fontFamily: "Georgia, serif",
            lineHeight: 1.6,
            resize: "vertical"
          }}
          placeholder="Paste or write your story here... AI will automatically detect whether it's normal or erotic content and help you transform it."
          value={doc}
          onChange={handleLoad}
        />
        <small style={{color: "#666", fontSize: "0.9em"}}>
          Tip: Write at least 50 characters for accurate AI mode detection
        </small>
      </div>

      <NaughtyConverterAI
        doc={doc}
        setMode={onClassify}
        mode={mode}
        onConvert={onConvert}
      />

      <div style={{marginTop: 24}}>
        <EthicsReviewPanel
          content={converted || doc}
          onProceed={onEthicsProceed}
        />
      </div>

      <div style={{display: "flex", gap: 12, marginTop: 24}}>
        <button
          style={{
            flex: 1,
            padding: "14px 28px", 
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
            color: "#fff", 
            border: "none", 
            borderRadius: 8, 
            fontWeight: "bold",
            fontSize: "1.1em",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)"
          }}
          onClick={handleExport}
          disabled={!doc && !converted}
        >
          📤 Export / Download
        </button>
      </div>

      {lastAction && (
        <div style={{
          marginTop: 16,
          padding: 12,
          background: "#d1fae5",
          color: "#065f46",
          borderRadius: 6,
          fontWeight: 600,
          textAlign: "center"
        }}>
          ✓ {lastAction}
        </div>
      )}

      <div style={{marginTop: 32}}>
        <h3 style={{color: "#4c1d95"}}>📋 Audit Log & Transparency</h3>
        <AuditLog initialEntries={auditEntries} />
      </div>

      <div style={{
        marginTop: 24,
        padding: 16,
        background: "#fef3c7",
        borderRadius: 8,
        border: "2px solid #fbbf24"
      }}>
        <b>💡 How the REAL AI Works:</b>
        <ul style={{marginTop: 8, paddingLeft: 20}}>
          <li><b>Mode Detection:</b> Real LLM analyzes your content to determine if it's normal or erotic</li>
          <li><b>Conversion:</b> Advanced prompts guide the LLM to transform style professionally</li>
          <li><b>Ethics:</b> AI checks for privacy violations, objectification, and misinformation</li>
          <li><b>Local Option:</b> Use Ollama for 100% privacy (content never leaves your machine)</li>
          <li><b>Cloud Option:</b> Use OpenAI for more powerful models (requires API key)</li>
        </ul>
      </div>
    </div>
  );
}
