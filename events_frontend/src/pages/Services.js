import React from "react";

/**
 * PUBLIC_INTERFACE
 * Services page component: describes offerings.
 */
export default function Services() {
  return (
    <section className="hero">
      <h1 className="title">Our Services</h1>
      <p className="subtitle">
        Weather‑aware event planning, date recommendations, and on‑site coordination.
      </p>
      <div className="card-grid">
        <div className="card">
          <h3>Weather Intelligence</h3>
          <p>Forecast analysis and comfort scoring for your date.</p>
        </div>
        <div className="card">
          <h3>Planning & Coordination</h3>
          <p>Professionally planned events with contingency options.</p>
        </div>
        <div className="card">
          <h3>Vendor Guidance</h3>
          <p>Shortlists and coordination with trusted local vendors.</p>
        </div>
      </div>
    </section>
  );
}
