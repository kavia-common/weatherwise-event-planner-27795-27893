import React, { useState } from "react";
import { useCurrentWeather, useForecast } from "../api/client";
import WeatherCard from "../components/WeatherCard";
import ForecastGrid from "../components/ForecastGrid";
import Toast from "../components/Toast";

/**
 * PUBLIC_INTERFACE
 * Home page component showing the hero section and introductory text.
 */
export default function Home() {
  const [location, setLocation] = useState("San Francisco");
  const [toast, setToast] = useState(null);

  const { data, error, loading, refetch } = useCurrentWeather(location, { auto: true });
  const { data: forecast, error: fErr, loading: fLoading, refetch: refetchForecast } = useForecast(
    { location, hours: 24, step_hours: 3 },
    { auto: true }
  );

  const handleCheck = async () => {
    try {
      await refetch();
      await refetchForecast();
    } catch (e) {
      setToast({ type: "error", message: e.message || "Failed to refresh data" });
    }
  };

  return (
    <section className="hero">
      <h1 className="title">Plan weather‑wise, celebrate stress‑free</h1>
      <p className="subtitle">
        Elegant planning with live weather insights. Use our recommendations to
        choose the best time for your event based on forecast and comfort.
      </p>

      <div className="row" style={{ marginBottom: 12 }}>
        <label className="grow" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span className="sr-only" aria-hidden="true" style={{ position: "absolute", left: -9999 }}>Weather location</span>
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
        </label>
        <button className="btn" onClick={handleCheck} aria-busy={loading || fLoading ? "true" : "false"}>
          {loading || fLoading ? "Checking…" : "Check Weather"}
        </button>
      </div>

      <div className="card-grid">
        <WeatherCard
          title="Live Weather"
          location={location}
          data={data}
          loading={loading}
          error={error}
          onRefresh={handleCheck}
          onError={(e) => setToast({ type: "error", message: e?.message || "Failed to load weather" })}
        />
        <ForecastGrid
          title="Next 24h Forecast"
          items={forecast}
          loading={fLoading}
          error={fErr}
        />
        <div className="card" role="region" aria-label="Smart Recommendations intro">
          <h3>Smart Recommendations</h3>
          <p>Personalized suggestions tailored to your event.</p>
        </div>
      </div>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </section>
  );
}
