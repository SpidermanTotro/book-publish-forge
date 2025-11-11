import React, { useState } from "react";

export default function ExportWizard({mode="main"}) {
  const [exportType, setExportType] = useState("PDF");
  const [includeAudit, setIncludeAudit] = useState(true);
  const [withDisclaimers, setWithDisclaimers] = useState(mode==="erotic");
  const [badge, setBadge] = useState(mode==="erotic"?"CONSENT+ AGE 18+":"RESPECT VERIFIED");

  function handleExport() {
    alert(`Exporting as ${exportType} with${includeAudit?"":"out"} audit log and ${badge} badge.`);
  }

  return (
    <div style={{background:"#f7f0fa",borderRadius:9,padding:28,maxWidth:440,margin:"28px auto"}}>
      <h2>Export Wizard</h2>
      <div>
        <label>Export as:
          <select style={{marginLeft:8}} value={exportType} onChange={e=>setExportType(e.target.value)}>
            <option>PDF</option>
            <option>ePub</option>
            <option>Flipbook</option>
            <option>JSON+Audit</option>
          </select>
        </label>
      </div>
      <div style={{marginTop:12}}>
        <label>
          <input type="checkbox" checked={includeAudit} onChange={e=>setIncludeAudit(e.target.checked)}/>
          Include audit log
        </label>
      </div>
      <div style={{marginTop:8}}>
        <label>
          <input type="checkbox" checked={withDisclaimers} onChange={e=>setWithDisclaimers(e.target.checked)}/>
          {mode==="erotic" ? "Include Erotic Forge disclaimers/warnings" : "Respect/disclaimer badge"}
        </label>
      </div>
      <div style={{margin:"12px 0"}}>
        <label>Attach Badge:
          <select style={{marginLeft:8}} value={badge} onChange={e=>setBadge(e.target.value)}>
            <option>RESPECT VERIFIED</option>
            <option>CONSENT+ AGE 18+</option>
            <option>TRUTH CHECKED</option>
          </select>
        </label>
      </div>
      <button style={{marginTop:18,background:"#6e2ca1",color:"#fff",border:"none",borderRadius:7,padding:"10px 31px",fontWeight:700}}
        onClick={handleExport}>
        Export Now
      </button>
    </div>
  );
}