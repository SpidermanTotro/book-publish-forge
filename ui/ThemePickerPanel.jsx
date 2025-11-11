import React from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemePickerPanel() {
  const { theme, setTheme, themes } = useTheme();
  return (
    <div style={{padding:16,marginBottom:12}}>
      <b>Theme:</b>{" "}
      {Object.keys(themes).map(k =>
        <button key={k} style={{
          margin: "0 8px", padding: "4px 12px",
          fontWeight: theme === k ? 700 : 400,
          background: theme === k ? "var(--primary)" : "#eee", color: theme === k ? "#fff" : "var(--text)"
        }} onClick={() => setTheme(k)}>{k.charAt(0).toUpperCase()+k.slice(1)}</button>
      )}
    </div>
  );
}