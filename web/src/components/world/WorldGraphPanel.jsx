import React, { useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

/**
 * Props:
 * - world: {
 *     locations: [{id, name, type: "location", portrait?}],
 *     characters: [{id, name, type: "character", portrait?}],
 *     links: [{from, to, type}]
 *   }
 * - setWorld: function to update the world state
 * - scenes: array of {id, title, characterIds, locationIds}
 * - onJumpToScene: function(sceneId), called to jump to a specific scene (optional)
 */
export default function WorldGraphPanel({ world, setWorld, scenes = [], onJumpToScene }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [relationSource, setRelationSource] = useState(null);

  // Add node handler
  const handleAddNode = (type) => {
    const name = prompt(`Enter name for new ${type}:`);
    if (!name) return;
    const id = `${type}:${name}:${Math.random().toString(36).slice(2,8)}`;
    const node = { id, name, type };
    if (type === "character") {
      setWorld(w => ({ ...w, characters: [...(w.characters||[]), node] }));
    } else {
      setWorld(w => ({ ...w, locations: [...(w.locations||[]), node] }));
    }
  };

  // Remove node and its links
  const handleRemoveNode = (nodeId, nodeType) => {
    setWorld(w => ({
      ...w,
      locations: (w.locations||[]).filter(n => n.id !== nodeId),
      characters: (w.characters||[]).filter(n => n.id !== nodeId),
      links: (w.links||[]).filter(l => l.from !== nodeId && l.to !== nodeId)
    }));
    setSelectedNode(null);
  };

  // Add a new relationship with custom type
  const handleAddLink = (fromId, toId) => {
    if (fromId === toId) return;
    let type = prompt("Relationship type? (e.g., family, mentor, ally, antagonist, etc.)", "related");
    if (!type) type = "related";
    setWorld(w => ({
      ...w,
      links: [...(w.links||[]), { from: fromId, to: toId, type }]
    }));
  };

  // Export PNG function
  const handleExportPNG = () => {
    // Select the force-graph canvas (first canvas in the panel)
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "world-graph.png";
    link.href = url;
    link.click();
  };

  // Assemble nodes/links for rendering
  const nodes = [
    ...(world.locations||[]),
    ...(world.characters||[])
  ];
  const links = world.links || [];

  return (
    <div>
      <div style={{marginBottom: 10}}>
        <button onClick={()=>handleAddNode("location")}>Add Location</button>
        <button onClick={()=>handleAddNode("character")}>Add Character</button>
        <button onClick={handleExportPNG}>Export Graph as PNG</button>
        {relationSource && (
          <span style={{marginLeft:18}}>
            Click another node to link from <b>{relationSource.name}</b>
            <button onClick={()=>setRelationSource(null)} style={{marginLeft:10}}>Cancel</button>
          </span>
        )}
      </div>
      <ForceGraph2D
        width={800}
        height={500}
        graphData={{ nodes, links }}
        nodeAutoColorBy="type"
        nodeLabel={node =>
          `${node.type.toUpperCase()}: ${node.name}`
        }
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 16 / globalScale;
          ctx.font = `${fontSize}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          // Draw circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, 22, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.type === "location" ? "#3681d2" : "#b14";
          ctx.globalAlpha = 0.18;
          ctx.fill();
          ctx.globalAlpha = 1.0;
          // Draw portrait if exists
          if (node.portrait) {
            const img = new window.Image();
            img.src = node.portrait;
            ctx.save();
            ctx.beginPath();
            ctx.arc(node.x, node.y - 7, 16, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(img, node.x - 16, node.y - 23, 32, 32);
            ctx.restore();
          }
          // Draw label
          ctx.fillStyle = "#222";
          ctx.fillText(label, node.x, node.y + 24);
        }}
        onNodeClick={node => {
          if (relationSource) {
            handleAddLink(relationSource.id, node.id);
            setRelationSource(null);
          } else {
            setSelectedNode(node);
          }
        }}
        onNodeRightClick={node => {
          // Start relation mode
          setRelationSource(node);
          setSelectedNode(null);
        }}
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkLabel={l => l.type}
        minZoom={0.2}
        maxZoom={5}
        enableNodeDrag
      />
      {selectedNode && (
        <div style={{marginTop:10, padding:12, background:"#f8faff", border:"1px solid #bbb"}}>
          <b>{selectedNode.type.toUpperCase()}:</b>
          <input
            value={selectedNode.name}
            style={{marginLeft:8, fontSize:'1em'}}
            onChange={e => {
              setWorld(w => ({
                ...w,
                [selectedNode.type === "location" ? "locations" : "characters"]:
                  w[selectedNode.type === "location" ? "locations" : "characters"]
                    .map(n => n.id === selectedNode.id ? { ...n, name: e.target.value } : n)
              }));
              setSelectedNode(n => ({ ...n, name: e.target.value }));
            }}
          />
          {/* Portrait upload UI */}
          <div style={{marginTop:8}}>
            <label>
              Portrait:
              <input type="file" accept="image/*"
                style={{marginLeft:10}}
                onChange={e => {
                  const file = e.target.files[0];
                  if(!file) return;
                  const reader = new FileReader();
                  reader.onload = ev => {
                    setWorld(w => ({
                      ...w,
                      [selectedNode.type === "location" ? "locations" : "characters"]:
                        w[selectedNode.type === "location" ? "locations" : "characters"]
                        .map(n => n.id === selectedNode.id ? { ...n, portrait: ev.target.result } : n)
                    }));
                    setSelectedNode(n => ({ ...n, portrait: ev.target.result }));
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </label>
            {selectedNode.portrait && (
              <img
                src={selectedNode.portrait}
                alt="portrait"
                style={{
                  display: "inline-block",
                  maxWidth: 64, maxHeight: 64,
                  marginLeft: 12, verticalAlign: "middle", borderRadius: "18%"
                }}
              />
            )}
          </div>
          {/* Scenes featuring this node */}
          {scenes.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <b>Scenes featuring {selectedNode.name}:</b>
              <ul style={{ margin: 6, paddingLeft: 18 }}>
                {scenes
                  .filter(scene =>
                    (scene.characterIds || []).includes(selectedNode.id) ||
                    (scene.locationIds || []).includes(selectedNode.id)
                  )
                  .map(scene => (
                    <li key={scene.id}>
                      <button
                        onClick={() => onJumpToScene ? onJumpToScene(scene.id) : alert(`Go to scene: ${scene.title}`)}
                        style={{
                          padding: '2px 10px',
                          margin: '2px 0',
                          background: '#eee',
                          border: '1px solid #ccc',
                          borderRadius: 5,
                          cursor: 'pointer'
                        }}
                      >
                        {scene.title}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          )}
          <br />
          <button
            style={{marginTop:7, marginRight:8, color: "crimson"}}
            onClick={() => handleRemoveNode(selectedNode.id, selectedNode.type)}
          >
            Remove
          </button>
          <button
            style={{marginTop:7}}
            onClick={() => setSelectedNode(null)}
          >
            Done
          </button>
        </div>
      )}
      <div style={{fontSize:"0.96em", color:"#444", marginTop: 10}}>
        <span>
          Tip: Right-click a node to start linking from it! Click another node to finish the relationship.
          All node/relationship changes are saved in your project.
          <br />
          <b>Relationship types</b> are prompted during linking: try "family", "mentor", "rival", etc!
        </span>
      </div>
    </div>
  );
}