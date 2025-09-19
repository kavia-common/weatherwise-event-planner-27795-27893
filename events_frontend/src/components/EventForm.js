import React from "react";
import { Spinner } from "./Loading";

// PUBLIC_INTERFACE
export default function EventForm({
  name, email, location, date, windowHours, stepHours,
  setName, setEmail, setLocation, setDate, setWindowHours, setStepHours,
  onRecommend, onScore, onBook, loadingStates = {}, onValidationError
}) {
  /**
   * EventForm: Elegant rose-gold styled form for planning events.
   * Props include controlled field values, setters, and action handlers.
   * loadingStates: { recLoading, scoreLoading, creating }
   */
  const { recLoading, scoreLoading, creating } = loadingStates;
  const inputStyle = { padding: 10, borderRadius: 10, border: "1px solid var(--color-border)", background: "var(--color-surface)" };

  const validate = () => {
    if (!name || !email || !location || !date) {
      onValidationError && onValidationError("Please fill all required fields: name, email, location, and date.");
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      onValidationError && onValidationError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleAction = (fn) => {
    if (!validate()) return;
    fn && fn();
  };

  return (
    <div className="card" style={{ marginBottom: 16 }} role="form" aria-labelledby="event-form-title">
      <h3 id="event-form-title">Event Details</h3>
      <div className="row" style={{ marginTop: 8 }}>
        <label className="grow" style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "var(--color-text-muted)", marginBottom: 4 }}>Event name</span>
          <input
            className="grow"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Event name"
            aria-required="true"
            aria-invalid={!name ? "true" : "false"}
            style={inputStyle}
          />
          {!name && <span role="alert" style={{ color: "var(--color-error)", fontSize: 12, marginTop: 4 }}>Required</span>}
        </label>
        <label className="grow" style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "var(--color-text-muted)", marginBottom: 4 }}>Email</span>
          <input
            className="grow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-required="true"
            aria-invalid={email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? "false" : "true"}
            type="email"
            style={inputStyle}
          />
          {(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) && (
            <span role="alert" style={{ color: "var(--color-error)", fontSize: 12, marginTop: 4 }}>Enter a valid email</span>
          )}
        </label>
      </div>
      <div className="row" style={{ marginTop: 8 }}>
        <label className="grow" style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "var(--color-text-muted)", marginBottom: 4 }}>Location</span>
          <input
            className="grow"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            aria-required="true"
            aria-invalid={!location ? "true" : "false"}
            style={inputStyle}
          />
          {!location && <span role="alert" style={{ color: "var(--color-error)", fontSize: 12, marginTop: 4 }}>Required</span>}
        </label>
        <label style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "var(--color-text-muted)", marginBottom: 4 }}>Date</span>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Date"
            aria-required="true"
            aria-invalid={!date ? "true" : "false"}
            type="date"
            style={inputStyle}
          />
          {!date && <span role="alert" style={{ color: "var(--color-error)", fontSize: 12, marginTop: 4 }}>Required</span>}
        </label>
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
        <button
          className="btn"
          onClick={() => handleAction(onRecommend)}
          disabled={recLoading}
          aria-disabled={recLoading ? "true" : "false"}
        >
          {recLoading ? <Spinner label="Generating recommendations" /> : "Get Recommendations"}
        </button>
        <button
          className="btn"
          onClick={() => handleAction(onScore)}
          disabled={scoreLoading}
          aria-disabled={scoreLoading ? "true" : "false"}
        >
          {scoreLoading ? <Spinner label="Scoring date" /> : "Score Date"}
        </button>
        <button
          className="btn"
          onClick={() => handleAction(onBook)}
          disabled={creating}
          aria-disabled={creating ? "true" : "false"}
        >
          {creating ? <Spinner label="Booking event" /> : "Book Event"}
        </button>
      </div>
    </div>
  );
}
