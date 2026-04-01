import React from "react";

/**
 * ResponsiveWrapper
 * Use to wrap dashboards; applies adaptive padding/grid/flex.
 * Example:
 * <ResponsiveWrapper>
 *   <DashboardPanels />
 * </ResponsiveWrapper>
 */
export default function ResponsiveWrapper({ children }) {
  return (
    <div
      style={{
        maxWidth: "100vw",
        margin: "0 auto",
        padding: "2vw 2vw 6vw 2vw",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "3vw",
        fontSize: "clamp(1rem, 2vw, 1.2rem)",
      }}
    >
      {children}
    </div>
  );
}