import React, { useState } from "react";
import { api } from "../api/client";

/**
 * PUBLIC_INTERFACE
 * Services page component: describes offerings.
 */
export default function Services() {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    setErr(null);
    try {
      const data = await api.listEvents();
      setEvents(data);
    } catch (e) {
      setErr(e);
    } finally {
      setLoading(false);
    }
  };

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
          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn" onClick={fetchEvents} disabled={loading}>
              {loading ? "Loading…" : "Demo: List Events"}
            </button>
          </div>
          {err && <p style={{ color: "var(--color-error)" }}>{err.message || "Failed to load events"}</p>}
          {Array.isArray(events) && events.length > 0 && (
            <ul style={{ marginTop: 8 }}>
              {events.map((ev) => (
                <li key={ev.id}>
                  {ev.name} — {ev.date} — {ev.location}
                </li>
              ))}
            </ul>
          )}
          {Array.isArray(events) && events.length === 0 && <p style={{ color: "var(--color-text-muted)" }}>No events yet.</p>}
        </div>
      </div>
    </section>
  );
}
