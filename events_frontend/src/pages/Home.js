import React from "react";

/**
 * PUBLIC_INTERFACE
 * Home page component showing the hero section and introductory text.
 */
export default function Home() {
  return (
    <section className="hero">
      <h1 className="title">Plan weather‑wise, celebrate stress‑free</h1>
      <p className="subtitle">
        Elegant planning with live weather insights. Use our recommendations to
        choose the best time for your event based on forecast and comfort.
      </p>
      <div className="card-grid">
        <div className="card">
          <h3>Live Weather</h3>
          <p>See current conditions and plan with confidence.</p>
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
