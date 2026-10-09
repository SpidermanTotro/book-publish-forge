import React, { useState } from "react";

/**
 * PluginGalleryPanel
 * Props:
 * - installed: Array<{ id, name, description, enabled, author, url, Component }>
 * - onToggle: (id, enabled: boolean) => void   (for enabling/disabling plugins)
 * - onInstall: (pluginConfig) => void         (optional, for uploads)
 */
export default function PluginGalleryPanel({ installed, onToggle, onInstall }) {
  const [showUpload, setShowUpload] = useState(false);
  const [uploadJson, setUploadJson] = useState("");

  function handleUpload() {
    try {
      const config = JSON.parse(uploadJson);
      if (!config.id || !config.name || !config.Component) throw new Error("Invalid config");
      onInstall?.(config);
      setUploadJson(""); setShowUpload(false);
    } catch (e) {
      alert("Invalid plugin JSON: " + e.message);
    }
  }

  return (
    <div style={{background:"#f9f6fd",borderRadius:11,padding:"23px 15px",border:"1.3px solid #ccb",maxWidth:590}}>
      <h3>Plugin Gallery</h3>
      <div style={{fontSize:"0.97em",marginBottom:12}}>
        Browse/add extra views, analytics, or helpers—add more from your team or community!
      </div>
      <ul style={{margin:0,padding:0,listStyle:"none"}}>
        {installed.map(p=>
          <li key={p.id} style={{
            background:p.enabled?"#f7ffee":"#f7f8fa",marginBottom:11,padding:"10px 11px",borderRadius:7,
            border:"1px solid #dda"
          }}>
            <b>{p.name}</b>{" "}<span style={{fontSize:"0.93em",color:"#796"}}>by {p.author||"anon"}</span>{" "}
            <span style={{fontSize:"0.93em",color:p.enabled?"#292":"#a30"}}>
              [{p.enabled?"Enabled":"Disabled"}]
            </span>
            <br/><i style={{color:"#467"}}>{p.description}</i>
            <button style={{marginLeft:13}}
              onClick={()=>onToggle(p.id, !p.enabled)}>{p.enabled ? "Disable" : "Enable"}</button>
            {p.url && <a href={p.url} style={{marginLeft:12,fontSize:"0.95em"}} target="_blank" rel="noopener noreferrer">Info</a>}
          </li>
        )}
      </ul>
      <div style={{margin:"16px 0 9px 0"}}>
        <button onClick={()=>setShowUpload(x=>!x)}>Upload/Install Custom Plugin…</button>
      </div>
      {showUpload && (
        <div style={{background:"#f9fcfe",border:"1.1px solid #ccf",borderRadius:9,padding:15,maxWidth:380,marginTop:8}}>
          <textarea
            rows={7}
            style={{width:"100%",fontFamily:"monospace",fontSize:"1em"}}
            placeholder='Paste plugin config JSON (see docs)'
            value={uploadJson}
            onChange={e=>setUploadJson(e.target.value)}
          />
          <div>
            <button onClick={handleUpload}>Install Plugin</button>
            <button onClick={()=>{setShowUpload(false);setUploadJson("");}} style={{marginLeft:16}}>Cancel</button>
          </div>
        </div>
      )}
      <div style={{fontSize:"0.94em", color:"#97a",marginTop:12}}>
        Tip: Plugins must export a React component as <b>Component</b>.<br/>
        Safe, sandboxed evaluation is recommended for remote/uploaded plugins.
      </div>
    </div>
  );
}