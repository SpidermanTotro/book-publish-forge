import React, { useRef, useState } from "react";
// You may use: npm install jszip file-saver
import JSZip from "jszip";
import { saveAs } from "file-saver";

/**
 * ExportPanel
 * Props:
 * - project: Full project state { name, scenes, chapters, outline, etc. }
 * - formats?: array (e.g. ["epub", "docx", "json", "zip"])
 * - defaultFormat?: string
 */
export default function ExportPanel({ project, formats = ["epub", "docx", "json", "zip"], defaultFormat = "epub" }) {
  const [format, setFormat] = useState(defaultFormat);
  const [status, setStatus] = useState("");

  const handleExport = async () => {
    setStatus("Exporting...");
    try {
      if (format === "json") {
        const blob = new Blob([JSON.stringify(project, null, 2)], { type: "application/json" });
        saveAs(blob, (project.name || "project") + ".json");
      } else if (format === "zip") {
        const zip = new JSZip();
        (project.scenes || []).forEach(s => {
          zip.file((s.title || "Scene") + ".txt", s.text || "");
        });
        const blob = await zip.generateAsync({ type: "blob" });
        saveAs(blob, (project.name || "project") + ".zip");
      } else if (format === "epub") {
        // Simple EPUB structure (not all metadata included). You can swap with "epub-gen" for advanced
        const zip = new JSZip();
        zip.file("mimetype", "application/epub+zip");
        zip.file("META-INF/container.xml", `<?xml version="1.0"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/Content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>`);
        zip.file("OEBPS/Content.opf", `
          <?xml version="1.0" encoding="UTF-8" ?>
          <package xmlns="http://www.idpf.org/2007/opf" unique-identifier="bookid" version="2.0">
            <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
              <dc:title>${project.name}</dc:title>
              <dc:language>en</dc:language>
            </metadata>
            <manifest>
              ${(project.scenes||[]).map((s,i) => `<item id="ch${i+1}" href="ch${i+1}.xhtml" media-type="application/xhtml+xml"/>`).join("\n")}
            </manifest>
            <spine toc="ncx">
              ${(project.scenes||[]).map((s,i) => `<itemref idref="ch${i+1}" />`).join("\n")}
            </spine>
          </package>`);
        (project.scenes||[]).forEach((s, i) => {
          zip.file(`OEBPS/ch${i+1}.xhtml`, `<?xml version="1.0" encoding="UTF-8"?>
          <html xmlns="http://www.w3.org/1999/xhtml"><head><title>${s.title}</title></head>
          <body><h1>${s.title}</h1>
          <div>${(s.text||"").replace(/\n/g, "<br/>")}</div></body></html>`);
        });
        // Optionally add TOC, cover, etc.
        const blob = await zip.generateAsync({ type: "blob" });
        saveAs(blob, (project.name || "project") + ".epub");
      } else if (format === "docx") {
        // Simple DOCX (just scenes as plain text, separated)
        // For advanced: use "docx" npm package
        let fileText = "# " + (project.name || "Untitled") + "\n\n";
        (project.scenes||[]).forEach(s => {
          fileText += "## " + s.title + "\n" + (s.text || "") + "\n\n";
        });
        const blob = new Blob([fileText], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
        saveAs(blob, (project.name || "project") + ".docx");
      }
      setStatus("Export ready!");
    } catch (e) {
      setStatus("Export failed: " + e.message);
    }
  };

  return (
    <div style={{
      background: "#fcfcfd", border: "1px solid #ebebeb", borderRadius: 10,
      padding: "20px 19px", maxWidth: 480, margin: "24px auto"
    }}>
      <h3 style={{ margin: 0 }}>Export Project</h3>
      <div style={{ margin: "14px 0" }}>
        Format:{" "}
        <select value={format} onChange={e => setFormat(e.target.value)}>
          {formats.map(f => <option key={f} value={f}>{f.toUpperCase()}</option>)}
        </select>
        <button
          style={{ marginLeft: 21, padding: "6px 30px" }}
          onClick={handleExport}
        >Export</button>
      </div>
      {status && <div style={{ color: status.startsWith("Export failed") ? "#a33" : "#252", marginTop: 6 }}>{status}</div>}
      <div style={{ color: "#777", marginTop: 14, fontSize: "0.88em" }}>
        Supports: .EPUB (e-reader), .DOCX (Word), .JSON (full project), or .ZIP of all scenes.
      </div>
    </div>
  );
}