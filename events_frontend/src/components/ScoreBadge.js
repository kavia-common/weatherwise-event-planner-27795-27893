import React from "react";

// PUBLIC_INTERFACE
export default function ScoreBadge({ score, label }) {
  /**
   * ScoreBadge: rounded pill indicating suitability score (0-1) with soft color coding.
   * Props:
   * - score: number (0..1)
   * - label: optional string
   */
  const pct = typeof score === "number" ? Math.round(score * 100) : null;
  let bg = "rgba(16,185,129,0.12)"; // success
  let color = "var(--color-success)";
  if (score < 0.66) {
    bg = "rgba(245,158,11,0.12)";
    color = "var(--color-secondary-dark)";
  }
  if (score < 0.33) {
    bg = "rgba(239,68,68,0.12)";
    color = "var(--color-error)";
  }
  return (
    <span
      title={label || "Score"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: bg,
        color,
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-pill)",
        padding: "6px 10px",
        fontWeight: 700,
        fontSize: 12,
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: 9999, background: color }} aria-hidden="true" />
      {label ? `${label}: ` : null}
      {pct !== null ? `${pct}%` : "—"}
    </span>
  );
}
