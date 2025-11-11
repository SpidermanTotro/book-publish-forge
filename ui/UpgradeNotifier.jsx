import React, { useEffect, useState } from "react";

// Usage: Add <UpgradeNotifier/> anywhere in your app root.
export default function UpgradeNotifier() {
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(swReg => {
        if (!swReg) return;
        swReg.onupdatefound = () => {
          setUpdated(true);
          const installingWorker = swReg.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdated(true);
              }
            };
          }
        };
      });
    }
  }, []);
  if (!updated) return null;
  return (
    <div style={{
      background: "#d6f7cc", border: "2px solid #7d5", borderRadius: 10,
      position: "fixed", top: 20, right: 20, padding: 20, zIndex: 1000
    }}>
      <b>App Updated!</b> Please <a href="" onClick={e => { e.preventDefault(); window.location.reload(); }}>reload</a> to use the latest features.
    </div>
  );
}