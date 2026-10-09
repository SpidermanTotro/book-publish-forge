import React, { useEffect, useState } from "react";

// Simulate sync by resolving after delay
function fakeSync() {
  return new Promise((res) => setTimeout(res, 1200));
}

export default function OnlineStatusSync({ onSync }) {
  const [online, setOnline] = useState(navigator.onLine);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  // Listen to connection state
  useEffect(() => {
    function handleOnline() {
      setOnline(true);
      handleSync();
    }
    function handleOffline() {
      setOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    }
  }, []);

  // Trigger sync when online
  async function handleSync() {
    setSyncing(true);
    if (onSync) await onSync();
    else await fakeSync();
    setLastSync(new Date());
    setSyncing(false);
  }

  return (
    <div style={{
      background: online ? "#e5ffea" : "#fff3d4",
      color: "#222",
      padding: "10px 18px",
      borderRadius: 9,
      display: "flex",
      alignItems: "center",
      gap: 12,
      minWidth: 290,
      maxWidth: 430,
    }}>
      <span>
        <b>Status:</b>{" "}
        {online ? "Online ✅" : "Offline ⚠️"}
      </span>
      {syncing && <span style={{color:"#0c6", fontWeight:600}}>Syncing...</span>}
      {lastSync && <span style={{fontSize:".93em",color:"#555"}}>Last sync: {lastSync.toLocaleTimeString()}</span>}
      <button
        onClick={handleSync}
        disabled={syncing || !online}
        style={{
          marginLeft: "auto",
          background: online ? "#1fa663" : "#bbb",
          color: "#fff",
          border: "none", borderRadius:5, padding:"4px 13px",
          fontWeight:600, cursor: online && !syncing ? "pointer" : "default"
        }}>
        Sync Now
      </button>
    </div>
  );
}