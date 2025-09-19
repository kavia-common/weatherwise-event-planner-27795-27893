import React, { useState } from "react";
import { useCurrentWeather, useForecast } from "../api/client";
import WeatherCard from "../components/WeatherCard";
import ForecastGrid from "../components/ForecastGrid";

/**
 * PUBLIC_INTERFACE
 * Home page component showing the hero section and introductory text.
 */
export default function Home() {
  const [location, setLocation] = useState("San Francisco");
  const { data, error, loading, refetch } = useCurrentWeather(location, { auto: true });
  const { data: forecast, error: fErr, loading: fLoading, refetch: refetchForecast } = useForecast(
    { location, hours: 24, step_hours: 3 },
    { auto: true }
  );

  const handleCheck = async () => {
    await refetch();
    await refetchForecast();
  };

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
        <button className="btn" onClick={handleCheck}>Check Weather</button>
      </div>

      <div className="card-grid">
        <WeatherCard
          title="Live Weather"
          location={location}
          data={data}
          loading={loading}
          error={error}
          onRefresh={handleCheck}
        />
        <ForecastGrid
          title="Next 24h Forecast"
          items={forecast}
          loading={fLoading}
          error={fErr}
        />
        <div className="card">
          <h3>Smart Recommendations</h3>
          <p>Personalized suggestions tailored to your event.</p>
        </div>
      </div>
    </section>
  );
}
