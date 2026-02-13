import React, { useState, useEffect } from "react";
import { convertToErotic, convertToNormal, detectContentType } from "../services/aiService";

/**
 * REAL AI-POWERED Content Converter
 * Uses actual LLMs (Ollama or OpenAI) instead of simple regex
 */
export default function NaughtyConverterAI({ doc, setMode, mode, onConvert }) {
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-detect mode using REAL AI
  useEffect(() => {
    if (!doc || doc.length < 50) return; // Need minimum content
    
    const detectMode = async () => {
      try {
        setLoading(true);
        setError("");
        const detected = await detectContentType(doc);
        setMode(detected);
      } catch (err) {
        console.error("AI detection failed:", err);
        // Fallback to simple detection if AI unavailable
        const fallbackMode = /lust|nipple|moan|orgasm|intimate|sensual/i.test(doc) ? "erotic" : "normal";
        setMode(fallbackMode);
        setError("AI detection unavailable, using keyword fallback");
      } finally {
        setLoading(false);
      }
    };
    
    // Debounce detection
    const timer = setTimeout(detectMode, 1000);
    return () => clearTimeout(timer);
  }, [doc, setMode]);

  async function handleConvert(type) {
    if (!doc) {
      setError("Please add content first");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      let converted;
      if (type === "naughtify") {
        converted = await convertToErotic(doc);
        setPreview(converted);
        onConvert("naughtify", converted);
      } else {
        converted = await convertToNormal(doc);
        setPreview(converted);
        onConvert("clean", converted);
      }
    } catch (err) {
      setError(err.message || "AI conversion failed");
      console.error("Conversion error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleMerge() {
    if (!doc) return;
    
    setLoading(true);
    setError("");
    
    try {
      const [naughty, clean] = await Promise.all([
        convertToErotic(doc),
        convertToNormal(doc)
      ]);
      
      const merged = `--- Original ---\n${doc}\n\n--- Erotic Version (AI) ---\n${naughty}\n\n--- Normal Version (AI) ---\n${clean}`;
      setPreview(merged);
    } catch (err) {
      setError(err.message || "AI merge failed");
      console.error("Merge error:", err);
    } finally {
      setLoading(false);
    }
  }

  if (!doc) {
    return (
      <div style={{color:"#888", padding: 16, background: "#f9f9f9", borderRadius: 8}}>
        <p>📝 Paste your document to begin AI-powered mode detection and conversion...</p>
        <p style={{fontSize: "0.9em", color: "#666"}}>
          Powered by real language models (Ollama or OpenAI)
        </p>
      </div>
    );
  }

  return (
    <div style={{margin:"14px 0",background:"#f1f7fa",borderRadius:9,padding:17}}>
      <div style={{marginBottom: 12}}>
        <b>AI-Detected Mode:</b>{" "}
        {loading && mode === "Unknown" ? (
          <span style={{color: "#777"}}>Analyzing with AI...</span>
        ) : (
          <span style={{
            color: mode === "erotic" ? "#a1055a" : "#0c9443", 
            fontWeight: 700,
            background: mode === "erotic" ? "#fce7f3" : "#d1fae5",
            padding: "4px 12px",
            borderRadius: 4
          }}>
            {mode === "erotic" ? "🔥 Erotic Forge" : "📖 Book Forge"}
          </span>
        )}
      </div>

      {error && (
        <div style={{
          background: "#fee", 
          color: "#c00", 
          padding: 12, 
          borderRadius: 6,
          marginBottom: 12,
          border: "1px solid #fcc"
        }}>
          ⚠️ {error}
          <div style={{fontSize: "0.85em", marginTop: 6}}>
            Tip: Make sure Ollama is running or configure OpenAI API key
          </div>
        </div>
      )}
      
      <div style={{marginTop:12, display: "flex", gap: 8, flexWrap: "wrap"}}>
        <button 
          onClick={() => handleConvert("naughtify")} 
          disabled={loading || mode === "erotic"}
          style={{
            padding: "10px 20px",
            background: mode === "erotic" ? "#ccc" : "linear-gradient(90deg,#ff34a3,#9c35b0)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: loading || mode === "erotic" ? "not-allowed" : "pointer",
            fontWeight: 600
          }}
        >
          {loading ? "🤖 Converting with AI..." : "🔥 Convert to Erotic (AI)"}
        </button>
        
        <button 
          onClick={() => handleConvert("clean")} 
          disabled={loading || mode === "normal"}
          style={{
            padding: "10px 20px",
            background: mode === "normal" ? "#ccc" : "#2b68ac",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: loading || mode === "normal" ? "not-allowed" : "pointer",
            fontWeight: 600
          }}
        >
          {loading ? "🤖 Converting with AI..." : "📖 Convert to Normal (AI)"}
        </button>
        
        <button 
          onClick={handleMerge}
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: loading ? "#ccc" : "#6b21a8",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600
          }}
        >
          {loading ? "🤖 Processing..." : "🔮 Preview All Versions (AI)"}
        </button>
      </div>

      {preview && (
        <div style={{
          marginTop: 16,
          fontFamily: "Georgia, serif",
          background: "#fff",
          padding: 16,
          borderRadius: 8,
          border: "2px solid #e5e7eb",
          maxHeight: 400,
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          lineHeight: 1.6
        }}>
          {preview}
        </div>
      )}

      <div style={{
        marginTop: 12,
        fontSize: "0.85em",
        color: "#666",
        padding: 8,
        background: "#f9fafb",
        borderRadius: 4
      }}>
        💡 <b>Powered by Real AI:</b> Using {AI_CONFIG.backend === 'ollama' ? 'Ollama (local)' : 'OpenAI (cloud)'} for intelligent content transformation
      </div>
    </div>
  );
}

// Export config for UI display
const AI_CONFIG = {
  backend: process.env.REACT_APP_AI_BACKEND || 'ollama',
  model: process.env.REACT_APP_OLLAMA_MODEL || 'dolphin-mixtral'
};
