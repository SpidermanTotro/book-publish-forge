import React, { useState } from "react";
import { checkAIAvailability } from "../services/aiService";

/** Local-only AI configuration; never stores third-party API keys. */
export default function AISettings() {
  const read = (key, fallback) => {
    try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
  };
  const [ollamaUrl, setOllamaUrl] = useState(() =>
    read("ollama_url", process.env.REACT_APP_OLLAMA_URL || "http://127.0.0.1:11434")
  );
  const [ollamaModel, setOllamaModel] = useState(() =>
    read("ollama_model", process.env.REACT_APP_OLLAMA_MODEL || "qwen3:8b")
  );
  const [status, setStatus] = useState("Not tested");
  const [testing, setTesting] = useState(false);

  async function testConnection() {
    setTesting(true);
    setStatus("Testing local Ollama...");
    try {
      const url = new URL(ollamaUrl);
      if (!["http:", "https:"].includes(url.protocol) ||
          !["127.0.0.1", "localhost", "[::1]"].includes(url.hostname) ||
          url.username || url.password || url.search || url.hash) {
        throw new Error("Use a loopback Ollama address, such as http://127.0.0.1:11434");
      }
      const model = ollamaModel.trim();
      if (!model) throw new Error("Choose an installed Ollama model.");
      localStorage.setItem("ollama_url", url.origin);
      localStorage.setItem("ollama_model", model);
      localStorage.removeItem("openai_key");
      localStorage.removeItem("ai_backend");
      const available = await checkAIAvailability("ollama");
      setStatus(available ? "Local Ollama is reachable." : "Local Ollama is not reachable.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setTesting(false);
    }
  }

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: 24 }}>
      <h2>AI configuration — local only</h2>
      <p>Book text is sent only to Ollama on this computer. Cloud inference and browser API keys are disabled.</p>
      <label htmlFor="ollama-url">Local Ollama URL</label>
      <input id="ollama-url" value={ollamaUrl} onChange={e => setOllamaUrl(e.target.value)}
        style={{ display: "block", width: "100%", margin: "8px 0 18px", padding: 10 }} />
      <label htmlFor="ollama-model">Installed model name</label>
      <input id="ollama-model" value={ollamaModel} onChange={e => setOllamaModel(e.target.value)}
        style={{ display: "block", width: "100%", margin: "8px 0 18px", padding: 10 }} />
      <button onClick={testConnection} disabled={testing}>
        {testing ? "Testing..." : "Save and test local connection"}
      </button>
      <p role="status">{status}</p>
      <p>Ollama must already be installed and running locally. Nothing downloads automatically.</p>
    </div>
  );
}
