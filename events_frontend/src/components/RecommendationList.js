import React from "react";
import ScoreBadge from "./ScoreBadge";

// PUBLIC_INTERFACE
export default function RecommendationList({ options, loading, error, title = "Recommendations" }) {
  /**
   * RecommendationList: renders ranked options with scores and optional notes.
   * Props:
   * - options: Array<{ label, score, start?, end?, notes? }>
   * - loading, error
   * - title
   */
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {loading && <p>Generating recommendations…</p>}
      {error && <p style={{ color: "var(--color-error)" }}>{error.message || "Failed to generate"}</p>}
      {!loading && !error && (!options || options.length === 0) && (
        <p style={{ color: "var(--color-text-muted)" }}>No options yet.</p>
      )}
      {Array.isArray(options) && options.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {options.map((opt, idx) => (
            <li
              key={`${opt.label}-${idx}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 12,
                padding: "12px 10px",
                borderBottom: "1px dashed var(--color-border)",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700 }}>{opt.label}</div>
                <div style={{ color: "var(--color-text-muted)", fontSize: 12 }}>
                  {opt.start && opt.end
                    ? `${new Date(opt.start).toLocaleTimeString()} - ${new Date(opt.end).toLocaleTimeString()}`
                    : null}
                </div>
                {opt.notes && (
                  <div style={{ color: "var(--color-text-muted)", marginTop: 4 }}>{opt.notes}</div>
                )}
              </div>
              <ScoreBadge score={opt.score} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
