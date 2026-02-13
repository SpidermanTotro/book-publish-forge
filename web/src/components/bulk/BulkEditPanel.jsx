import React, { useState } from "react";

/**
 * BulkEditPanel
 * Props:
 * - items: array of objects (scenes, characters, locations, etc.) with at least {id, name/title}
 * - itemType: "scene"|"character"|"location"
 * - onBulkUpdate: (ids: Array, action: string, value: any) => void
 * - extraActions?: [{ label, action, renderInput? }]
 */
export default function BulkEditPanel({ items, itemType, onBulkUpdate, extraActions = [] }) {
  const [selected, setSelected] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [value, setValue] = useState("");

  // Standard actions—customize as needed
  const actions = [
    { label: "Delete", action: "delete" },
    { label: "Assign Label", action: "label", renderInput: () =>
      <input value={value} onChange={e => setValue(e.target.value)} placeholder="Label" />
    },
    { label: "Set Color", action: "color", renderInput: () =>
      <input value={value} onChange={e => setValue(e.target.value)} placeholder="Color (e.g., #FFEEDD)" type="color" />
    },
    ...extraActions
  ];

  function handleSelectAll(e) {
    setSelected(e.target.checked ? items.map(i => i.id) : []);
  }
  function handleBulkApply() {
    if (!bulkAction || selected.length === 0) return;
    onBulkUpdate(selected, bulkAction, value);
    setSelected([]);
    setBulkAction("");
    setValue("");
  }

  return (
    <div style={{
      margin: "20px 0", background: "#f8f8ef", border: "1.3px solid #cab",
      borderRadius: 10, padding: 23, maxWidth: 510
    }}>
      <h4>Bulk {itemType.charAt(0).toUpperCase() + itemType.slice(1)} Actions</h4>
      <div style={{ margin: "7px 0 13px 0" }}>
        <label>
          <input
            type="checkbox"
            checked={selected.length === items.length && items.length > 0}
            onChange={handleSelectAll}
          />{" "}
          Select all
        </label>
      </div>
      <div style={{ maxHeight: 170, overflowY: "auto", border: "1px solid #ede", borderRadius: 5, marginBottom: 9 }}>
        {items.map(it => (
          <label key={it.id} style={{
            display: "block", padding: "2px 8px",
            background: selected.includes(it.id) ? "#e9f4fb" : "transparent"
          }}>
            <input
              type="checkbox"
              checked={selected.includes(it.id)}
              onChange={e =>
                setSelected(sel =>
                  e.target.checked
                    ? [...sel, it.id]
                    : sel.filter(id => id !== it.id)
                )
              }
            />{" "} {it.name || it.title}
          </label>
        ))}
      </div>
      <div style={{ marginBottom: 12 }}>
        <select value={bulkAction} onChange={e => setBulkAction(e.target.value)}>
          <option value="">Bulk Action…</option>
          {actions.map(a => (
            <option key={a.action} value={a.action}>{a.label}</option>
          ))}
        </select>
        {actions.find(a => a.action === bulkAction)?.renderInput?.()}
        <button
          style={{ marginLeft: 14, padding: "5px 15px" }}
          disabled={!bulkAction || selected.length === 0}
          onClick={handleBulkApply}
        >Apply to {selected.length || ""} selected</button>
      </div>
      <div style={{ fontSize: "0.91em", color: "#789" }}>
        Tip: Hold <b>Ctrl/Cmd</b> to select multiple, or use “Select all”.
      </div>
    </div>
  );
}