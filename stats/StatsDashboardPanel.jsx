import React, { useMemo } from "react";

/**
 * Props:
 * - project: your full project data ({ scenes, chapters, ... })
 */
export default function StatsDashboardPanel({ project }) {
  // Aggregate stats
  const stats = useMemo(() => {
    const now = new Date();
    const wordCount = (project.scenes || [])
      .map(s => (s.text || "").split(/\s+/).filter(Boolean).length)
      .reduce((a, b) => a + b, 0);

    const scenes = project.scenes || [];
    const chapters = project.chapters || [];
    // Simulate per-day writing (here: generate dummy times for demo)
    const perDay = {};
    scenes.forEach((s, i) => {
      // Simulate a created/updated date; replace with actual timestamps in prod
      const dt = s.updatedAt
        ? new Date(s.updatedAt)
        : new Date(now.getTime() - 24 * 3600 * 1000 * (scenes.length - i));
      const dstr = dt.toISOString().slice(0, 10);
      perDay[dstr] = (perDay[dstr] || 0) + (s.text || "").split(/\s+/).filter(Boolean).length;
    });
    const days = Object.keys(perDay).sort();
    return {
      wordCount,
      scenes: scenes.length,
      chapters: chapters.length,
      perDay,
      days,
      streak: days.length > 0 ? days.reduce((a, d, i, arr) =>
        i > 0 && new Date(d) - new Date(arr[i-1]) === 86400000 ? a + 1 : a, 1) : 0
    };
  }, [project]);

  // Simple bar graph for writing days
  function Graph () {
    if(stats.days.length < 2) return null;
    const max = Math.max(...stats.days.map(d => stats.perDay[d]));
    return (
      <svg width={Math.max(stats.days.length*32,220)} height={90} style={{ background: "#f7faff", borderRadius: 7, margin: "10px 0" }}>
        {stats.days.map((d, i) => (
          <g key={d}>
            <rect x={18+i*32} y={85-(stats.perDay[d]/max)*80}
              width={18} height={(stats.perDay[d]/max)*80}
              fill="#5af" opacity={0.89} rx={5}/>
            <text x={18+i*32+7} y={88} fontSize={11} textAnchor="middle" fill="#456">{d.slice(5)}</text>
            <text x={18+i*32+7} y={83-(stats.perDay[d]/max)*80} fontSize={11} textAnchor="middle" fill="#274">
              {stats.perDay[d]}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  return (
    <div style={{
      margin:"26px 0", background:"#f9fbfc", borderRadius: 11, border:"1.2px solid #cfd",
      padding:"24px 24px 14px 24px", maxWidth:530
    }}>
      <h3>Writing Stats & Streaks</h3>
      <div style={{ fontSize: "1.06em", marginTop: 6 }}>
        <b>{stats.wordCount.toLocaleString()}</b> words in <b>{stats.scenes}</b> scenes{stats.chapters > 0 && <> and <b>{stats.chapters}</b> chapters</>}<br/>
        {stats.streak > 1
          ? (<span style={{ color: "#27b", fontWeight: 500 }}>🔥 {stats.streak}-day streak</span>)
          : null}
      </div>
      <Graph />
      <div style={{color:"#666", fontSize:"0.98em", marginTop:2}}>
        {stats.days.length > 0
          ? <>Last written: <b>{stats.days[stats.days.length-1]}</b>.<br/></>
          : <>No project writing days detected.<br/></>
        }
      </div>
      <div style={{marginTop: 13}}>
        <details>
          <summary style={{cursor:"pointer", fontWeight:600}}>Per-Scene Stats</summary>
          <ul>
            {(project.scenes || []).map(s => (
              <li key={s.id}><b>{s.title}</b>: {(s.text||"").split(/\s+/).filter(Boolean).length} words</li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}