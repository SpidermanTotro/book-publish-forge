import React from "react";

/**
 * Local-only placeholder. The old WebRTC version joined a public signaling
 * network automatically. Live collaboration needs an explicit consent flow
 * and a trusted self-hosted signaling service before it can be enabled.
 */
export default function CollaboratorsPanel() {
  return (
    <section aria-label="Collaboration status" style={{padding: 16}}>
      <h3>Collaboration — offline</h3>
      <p>Live peer discovery is disabled. Your manuscript is not shared with a
        signaling server. Use local export/import to exchange drafts deliberately.</p>
    </section>
  );
}
