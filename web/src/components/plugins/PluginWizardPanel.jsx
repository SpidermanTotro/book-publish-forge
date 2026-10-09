import React, { useState } from "react";

export default function PluginWizardPanel({onFinish}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [code, setCode] = useState("export default function MyPlugin({project}) { return <div>...</div>; }");
  function finish() {
    try {
      // Simulate a build/validation: in a real setting, use a secure sandbox!
      if(!name || !code.match(/export default/)) throw new Error("Name and export required");
      onFinish?.({
        id: name.toLowerCase().replace(/\W/g,"") + Math.floor(1000+Math.random()*9000),
        name,
        description: desc,
        enabled: true,
        author: "You!",
        Component: eval(code) // WARNING: Replace with safe loader in prod!
      });
    } catch (e) { alert("Plugin failed: " + e.message); }
  }
  return (
    <div style={{border:"1.1px solid #cbe",borderRadius:9,padding:16,margin:"18px 0",background:"#f7fafd"}}>
      <h3>Quick Plugin Builder</h3>
      <label>Plugin Name:</label><br/>
      <input value={name} onChange={e=>setName(e.target.value)} style={{width:"99%",margin:"5px 0"}}/><br/>
      <label>Description: </label><br/>
      <input value={desc} onChange={e=>setDesc(e.target.value)} style={{width:"99%",margin:"5px 0"}}/><br/>
      <label>Exported Component Code:</label><br/>
      <textarea value={code} onChange={e=>setCode(e.target.value)} rows={7} style={{width:"99%"}}/><br/>
      <button onClick={finish}>Install Plugin</button>
    </div>
  );
}