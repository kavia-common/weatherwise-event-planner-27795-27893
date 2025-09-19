import React from "react";

// PUBLIC_INTERFACE
export default function EventForm({
  name, email, location, date, windowHours, stepHours,
  setName, setEmail, setLocation, setDate, setWindowHours, setStepHours,
  onRecommend, onScore, onBook, loadingStates = {}
}) {
  /**
   * EventForm: Elegant rose-gold styled form for planning events.
   * Props include controlled field values, setters, and action handlers.
   * loadingStates: { recLoading, scoreLoading, creating }
   */
  const { recLoading, scoreLoading, creating } = loadingStates;
  const inputStyle = { padding: 10, borderRadius: 10, border: "1px solid var(--color-border)", background: "var(--color-surface)" };

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <h3>Event Details</h3>
      <div className="row" style={{ marginTop: 8 }}>
        <input className="grow" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event name" aria-label="Event name" style={inputStyle} />
        <input className="grow" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" type="email" style={inputStyle} />
      </div>
      <div className="row" style={{ marginTop: 8 }}>
        <input className="grow" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" aria-label="Location" style={inputStyle} />
        <input value={date} onChange={(e) => setDate(e.target.value)} aria-label="Date" type="date" style={inputStyle} />
      </div>
      <div className="row" style={{ marginTop: 8 }}>
        <label style={{ color: "var(--color-text-muted)" }}>
          Window (hrs)
          <input value={windowHours} onChange={(e) => setWindowHours(e.target.value)} type="number" min={1} max={12} style={{ marginLeft: 8, ...inputStyle, width: 90 }} />
        </label>
        <label style={{ color: "var(--color-text-muted)" }}>
          Step (hrs)
          <input value={stepHours} onChange={(e) => setStepHours(e.target.value)} type="number" min={1} max={24} style={{ marginLeft: 8, ...inputStyle, width: 90 }} />
        </label>
      </div>
      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn" onClick={onRecommend} disabled={recLoading}>{recLoading ? "Generating…" : "Get Recommendations"}</button>
        <button className="btn" onClick={onScore} disabled={scoreLoading}>{scoreLoading ? "Scoring…" : "Score Date"}</button>
        <button className="btn" onClick={onBook} disabled={creating}>{creating ? "Booking…" : "Book Event"}</button>
      </div>
    </div>
  );
}
