import React from "react";

/**
 * Props: project ({scenes, chapters...})
 */
export default function ExportStatsPanel({ project }) {
  function downloadCSV() {
    let rows = [
      ["Scene", "Word Count", "Chapter", "Date"],
      ...(project.scenes||[]).map(s=>[
        '"' + (s.title||"") + '"', (s.text||"").split(/\s+/).length, s.chapterId||"", s.updatedAt||""
      ])
    ];
    let csv = rows.map(r=>r.join(",")).join("\n");
    let blob = new Blob([csv], {type:"text/csv"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (project.name||"project") + "_stats.csv";
    a.click();
  }
  return (
    <div style={{marginTop:14}}>
      <button onClick={downloadCSV}>Download Progress/Stats as CSV</button>
    </div>
  );
}