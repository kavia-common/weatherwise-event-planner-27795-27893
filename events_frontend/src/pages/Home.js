import React, { useState } from "react";
import { useCurrentWeather } from "../api/client";

/**
 * PUBLIC_INTERFACE
 * Home page component showing the hero section and introductory text.
 */
export default function Home() {
  const [location, setLocation] = useState("San Francisco");
  const { data, error, loading, refetch } = useCurrentWeather(location, { auto: true });

  return (
    <section className="hero">
      <h1 className="title">Plan weather‑wise, celebrate stress‑free</h1>
      <p className="subtitle">
        Elegant planning with live weather insights. Use our recommendations to
        choose the best time for your event based on forecast and comfort.
      </p>

      <div className="row" style={{ marginBottom: 12 }}>
        <input
          aria-label="Weather location"
          className="grow"
          style={{
            padding: 10,
            borderRadius: 10,
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
          }}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a city (e.g., San Francisco)"
        />
        <button className="btn" onClick={() => refetch()}>Check Weather</button>
      </div>

      <div className="card-grid">
        <div className="card">
          <h3>Live Weather</h3>
          {loading && <p>Loading current weather…</p>}
          {error && <p style={{ color: "var(--color-error)" }}>{error.message || "Failed to load weather"}</p>}
          {data && (
            <div>
              <p>
                <strong>{location}</strong>
              </p>
              <p>Condition: {data.condition}</p>
              <p>Temperature: {data.temperature_c}°C</p>
              {"humidity" in data && <p>Humidity: {data.humidity}%</p>}
              {"wind_kph" in data && <p>Wind: {data.wind_kph} km/h</p>}
              <p style={{ color: "var(--color-text-muted)" }}>Updated: {new Date(data.timestamp).toLocaleString()}</p>
            </div>
          )}
          {!loading && !error && !data && <p>Enter a city to view current weather.</p>}
        </div>
        <div className="card">
          <h3>Forecast Windows</h3>
          <p>We score time windows to find the most comfortable slot.</p>
        </div>
        <div className="card">
          <h3>Smart Recommendations</h3>
          <p>Personalized suggestions tailored to your event.</p>
        </div>
      </div>
    </section>
  );
}
