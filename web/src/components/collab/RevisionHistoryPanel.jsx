import React, { useState } from "react";
import * as Y from "yjs";

/**
 * RevisionHistoryPanel
 * Props:
 * - ydoc: Y.Doc (live document, from your collab provider)
 * - ydata: Y.Map or root structure (your synced project state)
 * - renderState: (state) => ReactNode  // render for each historical state
 * - showDiff?: boolean (for future: implement diff view)
 */
export default function RevisionHistoryPanel({ ydoc, ydata, renderState, showDiff }) {
  const [snapshots, setSnapshots] = useState([]);
  const [selected, setSelected] = useState(null);

  function captureSnapshot() {
    const snap = Y.snapshot(ydoc);
    setSnapshots(arr => [
      ...arr,
      {
        snap,
        time: new Date().toISOString(),
        user: ydoc.clientID // For demo; you may want usernames from awareness!
      }
    ]);
  }

  function restoreSnapshot(idx) {
    const ss = snapshots[idx];
    if (!ss) return;
    const json = Y.encodeStateAsUpdate(ydoc, undefined, ss.snap);
    Y.applyUpdate(ydoc, json);
    setSelected(idx);
  }

  return (
    <div style={{
      background: "#f2f5fd", border: "1.1px solid #aac",
      borderRadius: 10, margin: "20px 0", padding: "19px 14px", maxWidth: 550
    }}>
      <h4>Revision History</h4>
      <div>
        <button onClick={captureSnapshot}>Create Snapshot</button>
        {snapshots.length > 0 && (
          <span style={{marginLeft:18}}>Snapshots: <b>{snapshots.length}</b></span>
        )}
      </div>
      <ul style={{marginTop: 12}}>
        {snapshots.map((s, i) => (
          <li key={i} style={{
            background: selected === i ? "#e2f9f2" : "#fff",
            borderRadius:6, marginBottom:8, padding:"6px 8px"
          }}>
            <span>
              <b>{new Date(s.time).toLocaleString()}</b>{" "}
              {s.user && <span style={{color:"#666"}}>by User {s.user}</span>}
            </span>
            <button style={{marginLeft:21}} onClick={()=>restoreSnapshot(i)}>
              Restore to this version
            </button>
            {showDiff && <span style={{marginLeft:9}}>Diff: (coming soon)</span>}
          </li>
        ))}
      </ul>
      {selected !== null && (
        <div style={{background:"#fcfbea",borderRadius:7,padding:11,marginTop:11}}>
          <b>Restored state preview:</b>
          {renderState ? renderState(ydata.toJSON()) : <pre>{JSON.stringify(ydata.toJSON(),null,2)}</pre>}
        </div>
      )}
      <div style={{fontSize:"0.94em",color:"#789",marginTop:10}}>
        Tip: Snapshots are lightweight—take them periodically or before key edits. Full auto-version-tracking can be enabled!
      </div>
    </div>
  );
}