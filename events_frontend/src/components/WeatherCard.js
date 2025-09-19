import React from "react";
import { getGradient } from "../theme";
import { Spinner, Skeleton } from "./Loading";

/**
 * PUBLIC_INTERFACE
 * WeatherCard with accessible loading and error states.
 */
export default function WeatherCard({ title = "Current Weather", location, data, loading, error, onRefresh, onError }) {
  /**
   * WeatherCard: Elegant rose-gold card to display current weather snapshot for a location.
   * Props:
   * - title: string
   * - location: string
   * - data: { condition, temperature_c, humidity?, wind_kph?, timestamp }
   * - loading: boolean
   * - error: Error | null
   * - onRefresh: function to refetch data
   * - onError?: (error) => void  // optional callback for error toasts
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
          <h3 style={{ margin: 0 }} id="weather-title">{title}</h3>
          <button
            className="btn"
            onClick={onRefresh}
            disabled={loading}
            aria-label="Refresh weather"
            aria-describedby="weather-title"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        {loading && (
          <div>
            <Spinner label="Loading current weather" />
            <div style={{ marginTop: 10 }}>
              <Skeleton width="40%" height={24} />
              <Skeleton width="60%" style={{ marginTop: 8 }} />
              <Skeleton width="30%" style={{ marginTop: 8 }} />
            </div>
          </div>
        )}

        {error && (
          <p style={{ color: "var(--color-error)" }} role="alert">
            {onError ? onError(error) : null}
            {error.message || "Failed to load"}
          </p>
        )}

        {!loading && !error && !data && (
          <p style={{ color: "var(--color-text-muted)" }} role="status">
            Enter a city to view current weather.
          </p>
        )}

        {data && !loading && !error && (
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
