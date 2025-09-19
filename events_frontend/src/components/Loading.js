import React from "react";

/**
 * PUBLIC_INTERFACE
 * Spinner: small accessible loading spinner with label
 */
export function Spinner({ label = "Loading…" }) {
  return (
    <div role="status" aria-live="polite" aria-label={label} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span
        aria-hidden="true"
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          border: "2px solid rgba(0,0,0,0.1)",
          borderTopColor: "var(--color-primary)",
          animation: "spin 1s linear infinite",
        }}
      />
      <span style={{ color: "var(--color-text-muted)" }}>{label}</span>
      <style>
        {`@keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }`}
      </style>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Skeleton: gray shimmering placeholder for content loading
 */
export function Skeleton({ width = "100%", height = 14, radius = "8px", style = {} }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width,
        height,
        borderRadius: radius,
        background:
          "linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.1) 37%, rgba(0,0,0,0.06) 63%)",
        backgroundSize: "400% 100%",
        animation: "skeleton 1.4s ease infinite",
        ...style,
      }}
    >
      <style>
        {`@keyframes skeleton { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }`}
      </style>
    </div>
  );
}
