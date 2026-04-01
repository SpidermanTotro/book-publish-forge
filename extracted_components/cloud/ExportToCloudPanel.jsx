import React, { useState } from "react";
export default function ExportToCloudPanel({ project }) {
  const [provider, setProvider] = useState("s3");
  async function upload() {
    // Replace with your upload logic per provider/API
    alert("Uploading " + (project.name||"project") + " to " + provider.toUpperCase());
  }
  return (
    <div style={{marginTop:15}}>
      <b>Save to Cloud:</b>
      <select value={provider} onChange={e=>setProvider(e.target.value)} style={{marginLeft:10}}>
        <option value="s3">Amazon S3</option>
        <option value="gdrive">Google Drive</option>
        <option value="dropbox">Dropbox</option>
      </select>
      <button style={{marginLeft:13}} onClick={upload}>Upload Export</button>
    </div>
  );
}