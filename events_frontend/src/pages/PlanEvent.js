import React, { useMemo, useState } from "react";
import { useRecommendations, useScoreEventDate, useCreateEvent } from "../api/client";

/**
 * PUBLIC_INTERFACE
 * PlanEvent page component: basic form to request recommendations and submit a booking.
 */
export default function PlanEvent() {
  const [name, setName] = useState("Birthday Brunch");
  const [email, setEmail] = useState("guest@example.com");
  const [location, setLocation] = useState("San Francisco");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [windowHours, setWindowHours] = useState(3);
  const [stepHours, setStepHours] = useState(3);

  const recommendationRequest = useMemo(
    () => ({
      name,
      email,
      date,
      location,
      hours: 48,
      step_hours: Number(stepHours),
      window_hours: Number(windowHours),
    }),
    [name, email, date, location, stepHours, windowHours]
  );

  const scoreRequest = useMemo(
    () => ({
      location,
      target_date: date,
      hours: 24,
      step_hours: Number(stepHours),
      window_hours: Number(windowHours),
    }),
    [location, date, stepHours, windowHours]
  );

  const { data: recs, error: recError, loading: recLoading, refetch: runRecs } = useRecommendations(recommendationRequest, { auto: false });
  const { data: scores, error: scoreError, loading: scoreLoading, refetch: runScore } = useScoreEventDate(scoreRequest, { auto: false });
  const { data: created, error: createError, loading: creating, submit: createEvent } = useCreateEvent();

  const handleRecommend = () => runRecs();
  const handleScore = () => runScore();
  const handleBook = async () => {
    const payload = {
      name,
      email,
      date,
      location,
      flexibility_days: 0,
      preferences: [],
      notes: "Created via demo form",
    };
    await createEvent(payload);
  };

  return (
    <section className="hero">
      <h1 className="title">Plan an Event</h1>
      <p className="subtitle">
        Select a date and location. Generate recommendations or score time windows, then book.
      </p>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3>Event Details</h3>
        <div className="row" style={{ marginTop: 8 }}>
          <input
            className="grow"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Event name"
            aria-label="Event name"
            style={{ padding: 10, borderRadius: 10, border: "1px solid var(--color-border)" }}
          />
          <input
            className="grow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-label="Email"
            type="email"
            style={{ padding: 10, borderRadius: 10, border: "1px solid var(--color-border)" }}
          />
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          <input
            className="grow"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            aria-label="Location"
            style={{ padding: 10, borderRadius: 10, border: "1px solid var(--color-border)" }}
          />
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Date"
            type="date"
            style={{ padding: 10, borderRadius: 10, border: "1px solid var(--color-border)" }}
          />
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          <label style={{ color: "var(--color-text-muted)" }}>
            Window (hrs)
            <input
              value={windowHours}
              onChange={(e) => setWindowHours(e.target.value)}
              type="number"
              min={1}
              max={12}
              style={{ marginLeft: 8, padding: 8, borderRadius: 10, border: "1px solid var(--color-border)", width: 80 }}
            />
          </label>
          <label style={{ color: "var(--color-text-muted)" }}>
            Step (hrs)
            <input
              value={stepHours}
              onChange={(e) => setStepHours(e.target.value)}
              type="number"
              min={1}
              max={24}
              style={{ marginLeft: 8, padding: 8, borderRadius: 10, border: "1px solid var(--color-border)", width: 80 }}
            />
          </label>
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn" onClick={handleRecommend} disabled={recLoading}>
            {recLoading ? "Generating…" : "Get Recommendations"}
          </button>
          <button className="btn" onClick={handleScore} disabled={scoreLoading}>
            {scoreLoading ? "Scoring…" : "Score Date"}
          </button>
          <button className="btn" onClick={handleBook} disabled={creating}>
            {creating ? "Booking…" : "Book Event"}
          </button>
        </div>

        {(recError || scoreError || createError) && (
          <p style={{ color: "var(--color-error)", marginTop: 8 }}>
            {(recError && recError.message) || (scoreError && scoreError.message) || (createError && createError.message)}
          </p>
        )}
        {created && (
          <p style={{ color: "var(--color-success)", marginTop: 8 }}>
            Event created! ID: {created.id}
          </p>
        )}
      </div>

      <div className="card-grid">
        <div className="card">
          <h3>Recommendations</h3>
          {!recLoading && !recs && <p>Click "Get Recommendations" to view options.</p>}
          {recLoading && <p>Generating recommendations…</p>}
          {recs && Array.isArray(recs.options) && recs.options.length > 0 ? (
            <ul>
              {recs.options.map((opt, idx) => (
                <li key={idx}>
                  <strong>{opt.label}</strong> — score {Math.round(opt.score * 100) / 100}
                  {opt.start && opt.end && (
                    <span style={{ color: "var(--color-text-muted)" }}>
                      {" "}
                      ({new Date(opt.start).toLocaleTimeString()} - {new Date(opt.end).toLocaleTimeString()})
                    </span>
                  )}
                  {opt.notes && <div style={{ color: "var(--color-text-muted)" }}>{opt.notes}</div>}
                </li>
              ))}
            </ul>
          ) : recs ? (
            <p>No options returned.</p>
          ) : null}
        </div>
        <div className="card">
          <h3>Scored Windows</h3>
          {!scoreLoading && !scores && <p>Click "Score Date" to evaluate time windows.</p>}
          {scoreLoading && <p>Scoring windows…</p>}
          {scores && Array.isArray(scores.options) && scores.options.length > 0 ? (
            <ol>
              {scores.options.map((opt, idx) => (
                <li key={idx}>
                  <strong>{opt.label}</strong> — score {Math.round(opt.score * 100) / 100}
                  {opt.start && opt.end && (
                    <span style={{ color: "var(--color-text-muted)" }}>
                      {" "}
                      ({new Date(opt.start).toLocaleTimeString()} - {new Date(opt.end).toLocaleTimeString()})
                    </span>
                  )}
                </li>
              ))}
            </ol>
          ) : scores ? (
            <p>No scored windows returned.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
