import React from "react";
import { Skeleton } from "./Loading";

// PUBLIC_INTERFACE
export default function ForecastGrid({ items, loading, error, title = "Forecast" }) {
  /**
   * ForecastGrid: displays forecast items in a responsive grid with subtle rose-gold styling.
   * Accessibility:
   * - Uses role="list" and role="listitem".
   * - Keyboard focusable cards.
   */
  return (
    <div className="card" aria-labelledby="forecast-title">
      <h3 style={{ marginTop: 0 }} id="forecast-title">{title}</h3>

      {loading && (
        <div aria-live="polite">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            <Skeleton height={90} />
            <Skeleton height={90} />
            <Skeleton height={90} />
          </div>
        </div>
      )}

      {error && <p style={{ color: "var(--color-error)" }} role="alert">{error.message || "Failed to load forecast"}</p>}

      {!loading && !error && (!items || items.length === 0) && (
        <p style={{ color: "var(--color-text-muted)" }} role="status">No forecast data available.</p>
      )}

      <div
        role="list"
        aria-busy={loading ? "true" : "false"}
        aria-describedby="forecast-title"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "var(--space-md)",
          marginTop: 8,
        }}
      >
        {Array.isArray(items) &&
          items.map((it, idx) => (
            <div
              role="listitem"
              tabIndex={0}
              key={idx}
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                background: "var(--color-surface)",
                padding: "var(--space-sm)",
                boxShadow: "0 4px 10px var(--color-shadow)",
                outline: "none",
              }}
              aria-label={`Forecast item ${new Date(it.timestamp).toLocaleString()}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.currentTarget.click?.();
                }
              }}
            >
              <div style={{ fontWeight: 600 }}>{new Date(it.timestamp).toLocaleString()}</div>
              <div style={{ color: "var(--color-primary-dark)", fontSize: 20, fontWeight: 700 }}>
                {Math.round(it.temperature_c)}°C
              </div>
              <div style={{ color: "var(--color-text-muted)" }}>{it.condition}</div>
              {"precipitation_mm" in it && <div>Precip: {it.precipitation_mm} mm</div>}
              {"probability_precip" in it && (
                <div>Chance: {Math.round((it.probability_precip || 0) * 100)}%</div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
