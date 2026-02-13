import React, { useState, useEffect } from "react";
import { checkAIAvailability } from "../services/aiService";

/**
 * AI Configuration Panel
 * Allows users to configure and test AI backend
 */
export default function AISettings() {
  const [backend, setBackend] = useState(
    localStorage.getItem('ai_backend') || process.env.REACT_APP_AI_BACKEND || 'ollama'
  );
  const [ollamaUrl, setOllamaUrl] = useState(
    localStorage.getItem('ollama_url') || process.env.REACT_APP_OLLAMA_URL || 'http://127.0.0.1:11434'
  );
  const [ollamaModel, setOllamaModel] = useState(
    localStorage.getItem('ollama_model') || process.env.REACT_APP_OLLAMA_MODEL || 'dolphin-mixtral'
  );
  const [openaiKey, setOpenaiKey] = useState(
    localStorage.getItem('openai_key') || process.env.REACT_APP_OPENAI_KEY || ''
  );
  const [status, setStatus] = useState("Not tested");
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    // Update environment variables when settings change
    if (backend === 'ollama') {
      process.env.REACT_APP_OLLAMA_URL = ollamaUrl;
      process.env.REACT_APP_OLLAMA_MODEL = ollamaModel;
    } else if (backend === 'openai') {
      process.env.REACT_APP_OPENAI_KEY = openaiKey;
    }
    process.env.REACT_APP_AI_BACKEND = backend;
  }, [backend, ollamaUrl, ollamaModel, openaiKey]);

  async function testConnection() {
    setTesting(true);
    setStatus("Testing...");
    
    try {
      const available = await checkAIAvailability(backend);
      if (available) {
        setStatus("✅ Connected successfully!");
        // Save to localStorage
        localStorage.setItem('ai_backend', backend);
        if (backend === 'ollama') {
          localStorage.setItem('ollama_url', ollamaUrl);
          localStorage.setItem('ollama_model', ollamaModel);
        } else if (backend === 'openai') {
          localStorage.setItem('openai_key', openaiKey);
        }
      } else {
        setStatus("❌ Connection failed. Check your configuration.");
      }
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
    } finally {
      setTesting(false);
    }
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      padding: 24,
      maxWidth: 700,
      margin: "0 auto",
      boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{margin: "0 0 20px 0", color: "#4c1d95"}}>
        ⚙️ AI Configuration
      </h2>
      
      <div style={{marginBottom: 20}}>
        <label style={{display: "block", marginBottom: 8, fontWeight: 600}}>
          AI Backend
        </label>
        <select 
          value={backend}
          onChange={(e) => setBackend(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 6,
            border: "2px solid #e5e7eb",
            fontSize: "1em"
          }}
        >
          <option value="ollama">Ollama (Local, Privacy-First)</option>
          <option value="openai">OpenAI (Cloud, Requires API Key)</option>
        </select>
      </div>

      {backend === 'ollama' && (
        <>
          <div style={{marginBottom: 16}}>
            <label style={{display: "block", marginBottom: 8, fontWeight: 600}}>
              Ollama URL
            </label>
            <input
              type="text"
              value={ollamaUrl}
              onChange={(e) => setOllamaUrl(e.target.value)}
              placeholder="http://127.0.0.1:11434"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 6,
                border: "2px solid #e5e7eb",
                fontSize: "1em"
              }}
            />
            <small style={{color: "#666", fontSize: "0.85em"}}>
              Default: http://127.0.0.1:11434 (same as desktop app)
            </small>
          </div>

          <div style={{marginBottom: 16}}>
            <label style={{display: "block", marginBottom: 8, fontWeight: 600}}>
              Ollama Model
            </label>
            <input
              type="text"
              value={ollamaModel}
              onChange={(e) => setOllamaModel(e.target.value)}
              placeholder="dolphin-mixtral"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 6,
                border: "2px solid #e5e7eb",
                fontSize: "1em"
              }}
            />
            <small style={{color: "#666", fontSize: "0.85em", display: "block"}}>
              Recommended: dolphin-mixtral, llama3, mistral
            </small>
            <small style={{color: "#666", fontSize: "0.85em", display: "block", marginTop: 4}}>
              Install with: <code style={{background: "#f3f4f6", padding: "2px 6px", borderRadius: 3}}>ollama pull {ollamaModel}</code>
            </small>
          </div>
        </>
      )}

      {backend === 'openai' && (
        <div style={{marginBottom: 16}}>
          <label style={{display: "block", marginBottom: 8, fontWeight: 600}}>
            OpenAI API Key
          </label>
          <input
            type="password"
            value={openaiKey}
            onChange={(e) => setOpenaiKey(e.target.value)}
            placeholder="sk-..."
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 6,
              border: "2px solid #e5e7eb",
              fontSize: "1em"
            }}
          />
          <small style={{color: "#666", fontSize: "0.85em"}}>
            Get your API key from: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">platform.openai.com</a>
          </small>
        </div>
      )}

      <button
        onClick={testConnection}
        disabled={testing}
        style={{
          width: "100%",
          padding: 14,
          background: testing ? "#9ca3af" : "#4c1d95",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: "1.1em",
          fontWeight: 600,
          cursor: testing ? "not-allowed" : "pointer",
          marginBottom: 12
        }}
      >
        {testing ? "🧪 Testing Connection..." : "🧪 Test AI Connection"}
      </button>

      <div style={{
        padding: 12,
        background: status.includes("✅") ? "#d1fae5" : status.includes("❌") ? "#fee" : "#f3f4f6",
        color: status.includes("✅") ? "#065f46" : status.includes("❌") ? "#c00" : "#444",
        borderRadius: 6,
        fontWeight: 600,
        textAlign: "center"
      }}>
        {status}
      </div>

      <div style={{
        marginTop: 20,
        padding: 16,
        background: "#fef3c7",
        borderRadius: 8,
        border: "2px solid #fbbf24"
      }}>
        <b>🚀 Quick Setup Guide:</b>
        
        {backend === 'ollama' ? (
          <div style={{marginTop: 8, fontSize: "0.95em"}}>
            <p>1. Install Ollama: <code style={{background: "#fff", padding: "2px 6px"}}>curl -fsSL https://ollama.com/install.sh | sh</code></p>
            <p>2. Pull a model: <code style={{background: "#fff", padding: "2px 6px"}}>ollama pull dolphin-mixtral</code></p>
            <p>3. Ollama runs automatically at http://127.0.0.1:11434</p>
            <p>4. Click "Test AI Connection" above</p>
          </div>
        ) : (
          <div style={{marginTop: 8, fontSize: "0.95em"}}>
            <p>1. Sign up at OpenAI: <a href="https://platform.openai.com/signup">platform.openai.com/signup</a></p>
            <p>2. Get API key: <a href="https://platform.openai.com/api-keys">platform.openai.com/api-keys</a></p>
            <p>3. Paste key above and click "Test AI Connection"</p>
          </div>
        )}
      </div>

      <div style={{
        marginTop: 16,
        fontSize: "0.9em",
        color: "#666",
        padding: 12,
        background: "#f9fafb",
        borderRadius: 6
      }}>
        <b>Privacy Note:</b> 
        {backend === 'ollama' ? 
          " Ollama runs 100% locally on your machine. Your content never leaves your computer." :
          " OpenAI processes content in the cloud. Review their privacy policy if handling sensitive content."
        }
      </div>
    </div>
  );
}
