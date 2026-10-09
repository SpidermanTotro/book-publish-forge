import React from "react";

/** Remote uploads are intentionally unavailable in the local-only prototype. */
export default function ExportToCloudPanel() {
  return (
    <section style={{ marginTop: 15 }} aria-label="Cloud export status">
      <strong>Cloud export is disabled</strong>
      <p>Book Publish Forge does not upload manuscripts to an external
        storage provider in this local-only build. Use Export to File
        for a backup that stays under your control.</p>
    </section>
  );
}
