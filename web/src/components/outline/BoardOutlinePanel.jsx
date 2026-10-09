import React, { useState } from "react";

/**
 * BoardOutlinePanel
 * Props:
 * - scenes: array of { id, title, text, chapterId, color, labels }
 * - chapters: array of { id, name }
 * - onUpdateScene: (sceneId, updates) => void
 * - onReorder: (sceneIdsByChapter: { [chapterId]: string[] }) => void
 */
export default function BoardOutlinePanel({ scenes, chapters, onUpdateScene, onReorder }) {
  const [dragged, setDragged] = useState(null);
  const [filter, setFilter] = useState("");

  const scenesByChapter = {};
  chapters.forEach(ch => scenesByChapter[ch.id] = []);
  (scenes || []).forEach(s => {
    // Filter
    if (filter && !(s.title?.toLowerCase().includes(filter.toLowerCase()) || s.labels?.join(",").toLowerCase().includes(filter.toLowerCase()))) return;
    scenesByChapter[s.chapterId || chapters[0]?.id || ""] = scenesByChapter[s.chapterId || chapters[0]?.id || ""]
      ? [...(scenesByChapter[s.chapterId || chapters[0]?.id || ""]), s]
      : [s];
  });

  function onCardDragStart(chapterId, idx) {
    setDragged({chapterId, idx});
  }
  function onCardDrop(targetChapterId, targetIdx) {
    if (!dragged) return;
    // Remove from original
    const all = {...scenesByChapter};
    const movingCard = all[dragged.chapterId][dragged.idx];
    all[dragged.chapterId].splice(dragged.idx,1);
    // Insert into target
    all[targetChapterId].splice(targetIdx, 0, movingCard);
    // Update scene's chapter assignment
    if (movingCard.chapterId !== targetChapterId) onUpdateScene(movingCard.id, {chapterId: targetChapterId});
    // Reorder
    onReorder(Object.fromEntries(Object.entries(all).map(([cid, arr]) => [cid, arr.map(c=>c.id)])));
    setDragged(null);
  }

  const labelColors = ["#8ec", "#fd9", "#fb8", "#e8e", "#baf", "#fd9c", "#6ef"];
  return (
    <div style={{marginTop: 34, padding: "2px 2px"}}>
      <h3 style={{marginBottom: 6}}>Outline Board (Drag & Drop Scenes)</h3>
      <input
        value={filter}
        onChange={e=>setFilter(e.target.value)}
        placeholder="Filter scenes by title/label"
        style={{padding:"4px 8px", borderRadius:6, border:"1px solid #bee",marginBottom:15,minWidth:275}}
      />
      <div style={{display:"flex",gap:18,alignItems:"flex-start", overflowX:"auto"}}>
        {chapters.map((ch, chidx) =>
          <div key={ch.id} style={{background:"#fafdfe", borderRadius:10, minWidth:220, padding:"9px 7px 20px 7px", border:"1.2px solid #dde"}}>
            <div style={{fontWeight:600,marginBottom:11,fontSize:"1.1em",color:"#259"}}>
              {ch.name}
            </div>
            <div style={{minHeight:40, marginBottom:8}}>
              {scenesByChapter[ch.id]?.map((scene, idx) => (
                <div
                  key={scene.id}
                  draggable
                  onDragStart={()=>onCardDragStart(ch.id, idx)}
                  onDragOver={e => e.preventDefault()}
                  onDrop={()=>onCardDrop(ch.id, idx)}
                  onDragEnd={()=>setDragged(null)}
                  style={{
                    background: scene.color || "#e6f7fa",
                    border: dragged?.chapterId === ch.id && dragged.idx === idx ? "2.7px solid #39a" : "1px solid #bef",
                    margin: "4px 0",
                    borderRadius: 7,
                    padding:"8px 7px",
                    opacity: dragged?.chapterId === ch.id && dragged.idx === idx ? 0.5 : 1,
                    boxShadow:"1px 2px 10px #def7",
                    cursor:"grab"
                  }}
                  title={scene.text?.slice(0,100)}
                >
                  <b>{scene.title}</b>
                  <div style={{fontSize:"0.97em", color:"#567", marginTop:2}}>
                    {scene.labels?.map((l, i) => (
                      <span key={l} style={{
                        marginRight:7, background: labelColors[i%labelColors.length], padding:"1.5px 7px", borderRadius:5, fontSize:"0.91em"
                      }}>{l}</span>
                    ))}
                  </div>
                  {scene.text && <div style={{marginTop:4, fontSize:"0.93em",color:"#899"}}>
                    {scene.text.split(/\s+/).slice(0,22).join(" ")}{scene.text.split(/\s+/).length > 22 && "..."}
                  </div>}
                  <button style={{fontSize:"0.91em",marginTop:4}}
                    onClick={e=>{
                      e.stopPropagation();
                      const label = prompt("Add label/tag:");
                      if(label) onUpdateScene(scene.id, {labels: Array.from(new Set([...(scene.labels||[]), label]))});
                    }}>+ Label</button>
                  <input
                    type="color"
                    defaultValue={scene.color || "#e6f7fa"}
                    style={{marginLeft:8,verticalAlign:"middle"}}
                    onChange={e=>onUpdateScene(scene.id, {color: e.target.value})}
                  />
                </div>
              ))}
            </div>
            {/* Drop to end of column */}
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={()=>onCardDrop(ch.id, scenesByChapter[ch.id]?.length||0)}
              style={{height:16}}
            ></div>
          </div>
        )}
      </div>
      <div style={{marginTop:19, fontSize:"0.96em",color:"#789"}}>
        Drag scenes between chapters or reorder within chapters.
      </div>
    </div>
  );
}