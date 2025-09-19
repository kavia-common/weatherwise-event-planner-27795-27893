import React from "react";
import { getGradient } from "../theme";

// PUBLIC_INTERFACE
export default function WeatherCard({ title = "Current Weather", location, data, loading, error, onRefresh }) {
  /**
   * WeatherCard: Elegant rose-gold card to display current weather snapshot for a location.
   * Props:
   * - title: string
   * - location: string
   * - data: { condition, temperature_c, humidity?, wind_kph?, timestamp }
   * - loading: boolean
   * - error: Error | null
   * - onRefresh: function to refetch data
   */
  return (
    <div
      className="card"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundImage: getGradient("subtle"),
      }}
      aria-label={`Weather card for ${location || "unknown location"}`}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.95))",
        }}
        aria-hidden="true"
      />
      <div style={{ position: "relative" }}>
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button className="btn" onClick={onRefresh} disabled={loading} aria-label="Refresh weather">
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>
        {error && <p style={{ color: "var(--color-error)" }}>{error.message || "Failed to load"}</p>}
        {!loading && !error && !data && <p style={{ color: "var(--color-text-muted)" }}>Enter a city to view current weather.</p>}
        {data && (
          <div className="row" style={{ alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "var(--color-primary-dark)" }}>
                {Math.round(data.temperature_c)}°C
              </div>
              <div style={{ color: "var(--color-text-muted)", marginTop: 2 }}>{data.condition}</div>
              <div style={{ color: "var(--color-text-muted)", marginTop: 4 }}>
                {location ? <strong>{location}</strong> : null}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              {"humidity" in data && <div>Humidity: {data.humidity}%</div>}
              {"wind_kph" in data && <div>Wind: {data.wind_kph} km/h</div>}
              {"timestamp" in data && (
                <div style={{ color: "var(--color-text-muted)", marginTop: 6 }}>
                  Updated: {new Date(data.timestamp).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
