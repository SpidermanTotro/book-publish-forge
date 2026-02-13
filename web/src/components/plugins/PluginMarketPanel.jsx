import React, { useState, useEffect } from "react";

/**
 * PluginMarketPanel
 * Props:
 * - discoverUrl: string (optional; pull a JSON array of plugins from here)
 * - onInstall: (pluginConfig) => void
 */
export default function PluginMarketPanel({ discoverUrl, onInstall }) {
  const [plugins, setPlugins] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    if (!discoverUrl) return setPlugins([]);
    fetch(discoverUrl)
      .then(r=>r.json()).then(arr=>setPlugins(arr))
      .catch(()=>setPlugins([]));
  }, [discoverUrl]);
  const visible = filter ? plugins.filter(p=>JSON.stringify(p).toLowerCase().includes(filter.toLowerCase())) : plugins;
  return (
    <div style={{background:"#fafdea",borderRadius:11,padding:"19px 14px",border:"1.3px solid #cab",maxWidth:790}}>
      <h3>Public Plugin & AI Agent Gallery</h3>
      <input
        style={{width:"70%",marginBottom:12,padding:7,fontSize:"1em"}}
        value={filter}
        onChange={e=>setFilter(e.target.value)}
        placeholder="Filter by plugin or agent name, tag..."
      />
      <ul style={{listStyle:"none",padding:0}}>
        {visible.map(p=>
          <li key={p.id} style={{
            background:"#f6fff8",marginBottom:13,padding:"12px 15px",borderRadius:7,
            border:"1px solid #bab"
          }}>
            <b>{p.name}</b> <span style={{color:"#789",fontSize:"0.96em"}}>{p.tags?.join(", ")}</span>
            <br/><i>{p.description}</i>
            <br/>
            <button style={{marginTop:5,padding:"4px 23px"}} onClick={()=>onInstall?.(p)}>Install</button>
          </li>
        )}
        {visible.length === 0 && <li style={{color:"#c34"}}>No plugins/agents found.</li>}
      </ul>
      <div style={{fontSize:"0.94em", color:"#97a",marginTop:12}}>
        Connect your own JSON endpoint or host library of vetted plugins.
      </div>
    </div>
  );
}