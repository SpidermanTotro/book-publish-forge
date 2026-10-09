import React from "react";

/** Local-only placeholder: never fetch arbitrary public plugin endpoints. */
export default function PluginMarketPanel() {
  return (
    <section style={{ background: "#fafdea", borderRadius: 11,
      padding: "19px 14px", border: "1.3px solid #cab" }}>
      <h3>Offline Plugin Gallery</h3>
      <p>Online plugin discovery and automatic installation are disabled in
        the local-only prototype. No external catalog or executable plugin
        code is downloaded.</p>
      <p>You can save a disabled source draft using the Plugin Draft Builder.
        A verified sandbox is required before custom plugin execution.</p>
    </section>
  );
}
