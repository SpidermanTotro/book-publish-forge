import React, { useState } from "react";

// Mock geo/data check logic
const bannedCountries = ["Saudi Arabia", "China", "Indonesia"];
const userRegion = "UK"; // Ideally detected automatically

export default function LegalRegionBlocker({mode}) {
  const [region, setRegion] = useState(userRegion);

  function isBlocked(region) {
    return bannedCountries.includes(region) && mode==="erotic";
  }

  return (
    <div style={{background:"#fbeff2",borderRadius:10,padding:26,maxWidth:520,margin:"24px auto"}}>
      <h2>Legal Region Blocker</h2>
      <div>
        <label>Publishing Region: {" "}
          <select value={region} onChange={e=>setRegion(e.target.value)}>
            <option>UK</option>
            <option>USA</option>
            <option>Saudi Arabia</option>
            <option>China</option>
            <option>Indonesia</option>
          </select>
        </label>
      </div>
      <div style={{marginTop:14}}>
        {(isBlocked(region)) ? (
          <div style={{color:"#be2456",fontWeight:"bold"}}>
            Erotic/Adult content publishing is <u>blocked</u> in this region due to local law. Please review and change your selection.
          </div>
        ) : (
          <div style={{color:"#178254",fontWeight:"bold"}}>
            Publishing is permitted for your current selection.
          </div>
        )}
      </div>
    </div>
  );
}