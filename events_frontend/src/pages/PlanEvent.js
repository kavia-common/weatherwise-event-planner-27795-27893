import React, { useMemo, useState } from "react";
import { useRecommendations, useScoreEventDate, useCreateEvent } from "../api/client";
import EventForm from "../components/EventForm";
import RecommendationList from "../components/RecommendationList";
import ScoreBadge from "../components/ScoreBadge";

/**
 * PUBLIC_INTERFACE
 * PlanEvent page component: enhanced with reusable EventForm, RecommendationList, and ScoreBadge.
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

  const bestScore = scores?.options?.length ? scores.options[0].score : null;

  return (
    <section className="hero">
      <h1 className="title">Plan an Event</h1>
      <p className="subtitle">
        Select a date and location. Generate recommendations or score time windows, then book.
      </p>

      <EventForm
        name={name}
        email={email}
        location={location}
        date={date}
        windowHours={windowHours}
        stepHours={stepHours}
        setName={setName}
        setEmail={setEmail}
        setLocation={setLocation}
        setDate={setDate}
        setWindowHours={setWindowHours}
        setStepHours={setStepHours}
        onRecommend={handleRecommend}
        onScore={handleScore}
        onBook={handleBook}
        loadingStates={{ recLoading, scoreLoading, creating }}
      />

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

      <div className="card-grid">
        <RecommendationList
          title="Recommendations"
          options={recs?.options || []}
          loading={recLoading}
          error={recError}
        />
        <div className="card">
          <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ marginTop: 0 }}>Scored Windows</h3>
            {bestScore != null ? <ScoreBadge label="Best" score={bestScore} /> : null}
          </div>
          {!scoreLoading && !scores && <p>Click "Score Date" to evaluate time windows.</p>}
          {scoreLoading && <p>Scoring windows…</p>}
          {scores && Array.isArray(scores.options) && scores.options.length > 0 ? (
            <ol>
              {scores.options.map((opt, idx) => (
                <li key={idx} style={{ marginBottom: 6 }}>
                  <ScoreBadge score={opt.score} />{" "}
                  <strong>{opt.label}</strong>
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
