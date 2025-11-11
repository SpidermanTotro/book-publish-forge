import React, { useEffect, useState } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

/**
 * Props:
 * - room: unique collaboration ID (e.g., projectId)
 * - currentUser: { id, name, avatar }
 */
export default function CollaboratorsPanel({ room, currentUser }) {
  const [peers, setPeers] = useState([]);
  const [selfId, setSelfId] = useState();

  useEffect(() => {
    // Set up Yjs & provider
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(room, ydoc);
    // Track presence using Yjs awareness API
    provider.awareness.setLocalStateField("user", currentUser);
    setSelfId(provider.awareness.clientID);

    function update() {
      // Get all aware users (including self)
      const states = Array.from(provider.awareness.getStates().entries())
        .map(([id, d]) => ({ id, ...d.user }));
      setPeers(states);
    }
    provider.awareness.on("change", update);
    update();
    return () => {
      provider.awareness.off("change", update);
      provider.disconnect();
      ydoc.destroy();
    };
  }, [room, currentUser]);

  return (
    <div style={{padding:"10px 6px", background:"#e5faff", border:"1px solid #ccf", marginBottom: 10, borderRadius:9, display: "inline-block", minWidth: 220}}>
      <div style={{marginBottom: 5}}>Live editors in this project:</div>
      <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
        {peers.length === 0
          ? <i style={{color:"#777"}}>No one else here…</i>
          : peers.map(p =>
            <span key={p.id || p.name} title={p.name} style={{display:"flex",alignItems:"center"}}>
              {p.avatar
                ? <img src={p.avatar} alt={p.name} style={{width:26, height:26, borderRadius:"50%",marginRight:7}}/>
                : <span style={{background:"#ace",borderRadius:"50%",width:26,height:26,display:"inline-block",marginRight:7}}></span>
              }
              <span style={{color: p.id===selfId?"#1a6":"#124", fontWeight:p.id===selfId?600:400}}>
                {p.name || "Anonymous"}
                {p.id===selfId && " (you)"}
              </span>
            </span>
          )
        }
      </div>
    </div>
  );
}