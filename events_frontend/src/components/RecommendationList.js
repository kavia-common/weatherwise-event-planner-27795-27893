import React from "react";
import ScoreBadge from "./ScoreBadge";
import { Skeleton } from "./Loading";

// PUBLIC_INTERFACE
export default function RecommendationList({ options, loading, error, title = "Recommendations" }) {
  /**
   * RecommendationList: renders ranked options with scores and optional notes.
   * Accessibility:
   * - role="list" and role="listitem" with keyboard focus management.
   */
  return (
    <div className="card" aria-labelledby="recs-title">
      <h3 style={{ marginTop: 0 }} id="recs-title">{title}</h3>

      {loading && (
        <div aria-live="polite">
          <Skeleton height={18} width="60%" />
          <Skeleton height={18} width="70%" style={{ marginTop: 8 }} />
          <Skeleton height={18} width="50%" style={{ marginTop: 8 }} />
        </div>
      )}

      {error && <p style={{ color: "var(--color-error)" }} role="alert">{error.message || "Failed to generate"}</p>}

      {!loading && !error && (!options || options.length === 0) && (
        <p style={{ color: "var(--color-text-muted)" }} role="status">No options yet.</p>
      )}

      {Array.isArray(options) && options.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }} role="list" aria-describedby="recs-title">
          {options.map((opt, idx) => (
            <li
              role="listitem"
              tabIndex={0}
              key={`${opt.label}-${idx}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 12,
                padding: "12px 10px",
                borderBottom: "1px dashed var(--color-border)",
                outline: "none",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.currentTarget.click?.();
                }
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
