import { useCallback, useEffect, useRef, useState } from "react";
//
// PUBLIC INTERFACE: Frontend API client and React hooks for WeatherWise Events
//
// Provides a lightweight fetch wrapper, typed request helpers for backend endpoints,
// and convenience React hooks for common UI flows (live weather, scoring, booking, recommendations).
//
// Configuration:
// - Reads base URL from environment variable REACT_APP_API_BASE_URL (set in .env).
// - If not set, defaults to same-origin API paths (e.g., /api/...).
//
// Error handling:
// - Throws on HTTP !ok; wraps error with message and status code.
// - Hooks expose { data, error, loading, refetch }.
//

const API_BASE =
  process.env.REACT_APP_API_BASE_URL && process.env.REACT_APP_API_BASE_URL.trim() !== ""
    ? process.env.REACT_APP_API_BASE_URL.replace(/\/$/, "")
    : ""; // same-origin

/**
 * Low-level JSON fetch helper with standard headers and error handling.
 * @param {string} path - Path relative to API_BASE, e.g. '/api/weather/current?location=...'
 * @param {RequestInit} options - fetch options
 * @returns {Promise<any>} Parsed JSON
 */
async function jsonFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  let payload = null;
  const contentType = resp.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      payload = await resp.json();
    } catch (_) {
      payload = null;
    }
  } else {
    payload = await resp.text().catch(() => null);
  }
  if (!resp.ok) {
    const err = new Error(
      (payload && payload.detail) || (payload && payload.message) || `Request failed: ${resp.status}`
    );
    err.status = resp.status;
    err.payload = payload;
    throw err;
  }
  return payload;
}

// PUBLIC_INTERFACE
export const api = {
  /** Health check GET / */
  health() {
    return jsonFetch(`/`, { method: "GET" });
  },

  // Weather endpoints
  /** GET /api/weather/current?location=City */
  getCurrentWeather(location) {
    const p = new URLSearchParams({ location });
    return jsonFetch(`/api/weather/current?${p.toString()}`, { method: "GET" });
  },
  /** GET /api/weather/forecast?location=City&hours=24&step_hours=3 */
  getForecast({ location, hours, step_hours } = {}) {
    const p = new URLSearchParams();
    if (location) p.set("location", location);
    if (hours != null) p.set("hours", String(hours));
    if (step_hours != null) p.set("step_hours", String(step_hours));
    return jsonFetch(`/api/weather/forecast?${p.toString()}`, { method: "GET" });
  },
  /** GET /api/weather/location/search?q=City&limit=5 */
  searchLocation({ q, limit } = {}) {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (limit != null) p.set("limit", String(limit));
    return jsonFetch(`/api/weather/location/search?${p.toString()}`, { method: "GET" });
  },

  // Events endpoints
  /** GET /api/events?userId=... */
  listEvents({ userId } = {}) {
    const p = new URLSearchParams();
    if (userId) p.set("userId", userId);
    const qs = p.toString();
    return jsonFetch(`/api/events${qs ? "?" + qs : ""}`, { method: "GET" });
  },
  /** POST /api/events */
  createEvent(eventBody) {
    return jsonFetch(`/api/events`, { method: "POST", body: JSON.stringify(eventBody) });
  },
  /** GET /api/events/{id} */
  getEvent(eventId) {
    return jsonFetch(`/api/events/${encodeURIComponent(eventId)}`, { method: "GET" });
  },
  /** GET /api/events/{id}/recommendations */
  getEventRecommendations(eventId) {
    return jsonFetch(`/api/events/${encodeURIComponent(eventId)}/recommendations`, { method: "GET" });
  },

  // Scoring and ad-hoc recommendations
  /** POST /api/events/score */
  scoreEventDate(scoreRequest) {
    return jsonFetch(`/api/events/score`, { method: "POST", body: JSON.stringify(scoreRequest) });
  },
  /** POST /api/events/recommendations */
  recommendAdhoc(recommendationRequest) {
    return jsonFetch(`/api/events/recommendations`, {
      method: "POST",
      body: JSON.stringify(recommendationRequest),
    });
  },
};

// Simple hook factory for GET-like effects
function useAsync(asyncFn, deps = []) {
  const mountedRef = useRef(true);
  const [state, setState] = useState({ loading: true, data: null, error: null });

  const run = useCallback(
    async (...args) => {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const data = await asyncFn(...args);
        if (mountedRef.current) setState({ loading: false, data, error: null });
        return data;
      } catch (error) {
        if (mountedRef.current) setState({ loading: false, data: null, error });
        throw error;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return { ...state, run, refetch: run };
}

// PUBLIC_INTERFACE
export function useCurrentWeather(location, { auto = true } = {}) {
  /**
   * Fetch current weather snapshot for a location.
   * Returns: { data, error, loading, refetch }
   */
  const { data, error, loading, run, refetch } = useAsync(
    () => api.getCurrentWeather(location),
    [location]
  );

  useEffect(() => {
    if (auto && location) {
      run();
    }
  }, [auto, location, run]);

  return { data, error, loading, refetch };
}

// PUBLIC_INTERFACE
export function useForecast(params, { auto = true } = {}) {
  /**
   * Fetch forecast for a location.
   * params: { location, hours, step_hours }
   */
  const { data, error, loading, run, refetch } = useAsync(() => api.getForecast(params), [JSON.stringify(params)]);
  useEffect(() => {
    if (auto && params && params.location) {
      run();
    }
  }, [auto, params, run]);

  return { data, error, loading, refetch };
}

// PUBLIC_INTERFACE
export function useRecommendations(requestBody, { auto = false } = {}) {
  /**
   * Generate ad-hoc recommendations for a new event (not persisted).
   * Triggers POST /api/events/recommendations
   */
  const { data, error, loading, run, refetch } = useAsync(
    () => api.recommendAdhoc(requestBody),
    [JSON.stringify(requestBody)]
  );
  useEffect(() => {
    if (auto && requestBody && requestBody.location && requestBody.date) {
      run();
    }
  }, [auto, requestBody, run]);

  return { data, error, loading, refetch };
}

// PUBLIC_INTERFACE
export function useScoreEventDate(requestBody, { auto = false } = {}) {
  /**
   * Score suitability for a specific date.
   * Triggers POST /api/events/score
   */
  const { data, error, loading, run, refetch } = useAsync(
    () => api.scoreEventDate(requestBody),
    [JSON.stringify(requestBody)]
  );
  useEffect(() => {
    if (auto && requestBody && requestBody.location && requestBody.target_date) {
      run();
    }
  }, [auto, requestBody, run]);

  return { data, error, loading, refetch };
}

// PUBLIC_INTERFACE
export function useCreateEvent() {
  /**
   * Returns a submit function for creating an event along with async state.
   */
  const [state, setState] = useState({ loading: false, data: null, error: null });

  const submit = useCallback(async (payload) => {
    setState({ loading: true, data: null, error: null });
    try {
      const data = await api.createEvent(payload);
      setState({ loading: false, data, error: null });
      return data;
    } catch (error) {
      setState({ loading: false, data: null, error });
      throw error;
    }
  }, []);

  return { ...state, submit };
}
