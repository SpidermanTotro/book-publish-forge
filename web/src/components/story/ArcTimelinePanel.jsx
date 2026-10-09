import React from "react";

/**
 * ArcTimelinePanel
 * Props:
 * - project: { scenes: array, characters: array, plotArcs: array }
 */
export default function ArcTimelinePanel({ project }) {
  const scenes = project.scenes || [];
  const characters = project.characters || [];
  // Each plotArc: { id, name, color, segments: [{sceneId, description}] }
  const arcs = project.plotArcs || [];

  // Build a grid: rows for arcs, columns for scenes
  return (
    <div style={{padding:"19px 10px",background:"#f3fafc", borderRadius:13,maxWidth:900,overflowX:"auto",marginBottom:20}}>
      <h3>Arc/Character Timeline View</h3>
      <table style={{borderCollapse:"collapse",width:"100%"}}>
        <thead>
          <tr>
            <th align="left">Arc</th>
            {scenes.map((s,i)=><th key={i} style={{padding:3, fontSize:"0.96em"}}>{s.title}</th>)}
          </tr>
        </thead>
        <tbody>
          {arcs.map((arc, i) => (
            <tr key={arc.id}>
              <td style={{fontWeight:600, color:arc.color||"#4ba",background:arc.color+"22"||"#e3fff0",height:32}}>{arc.name}</td>
              {scenes.map((s,j) => {
                const active = arc.segments?.some(seg=>seg.sceneId===s.id);
                return (
                  <td key={j} style={{
                    background:active?arc.color+"44":"#fff",
                    textAlign:"center",
                    fontWeight:active?650:400,
                    borderRadius:4,
                    padding:2
                  }}>
                    {active ? "●" : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{fontSize:"0.87em",color:"#789",marginTop:9}}>
        Each colored row is a plot arc or character. Dot means appearance—in that scene.<br/>
        Add/assign arcs via your scene and arc detail panels!
      </div>
    </div>
  );
}