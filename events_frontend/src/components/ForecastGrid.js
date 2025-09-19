import React from "react";

// PUBLIC_INTERFACE
export default function ForecastGrid({ items, loading, error, title = "Forecast" }) {
  /**
   * ForecastGrid: displays forecast items in a responsive grid with subtle rose-gold styling.
   * Props:
   * - items: Array<{ timestamp, temperature_c, condition, precipitation_mm?, probability_precip? }>
   * - loading: boolean
   * - error: Error | null
   * - title: string
   */
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {loading && <p>Loading forecast…</p>}
      {error && <p style={{ color: "var(--color-error)" }}>{error.message || "Failed to load forecast"}</p>}
      {!loading && !error && (!items || items.length === 0) && (
        <p style={{ color: "var(--color-text-muted)" }}>No forecast data available.</p>
      )}

      <div
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
              key={idx}
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                background: "var(--color-surface)",
                padding: "var(--space-sm)",
                boxShadow: "0 4px 10px var(--color-shadow)",
              }}
              aria-label={`Forecast item ${new Date(it.timestamp).toLocaleString()}`}
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
