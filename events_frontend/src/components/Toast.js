import React, { useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * Toast: Accessible toast/alert notifications.
 * Props:
 * - type: "error" | "success" | "info"
 * - message: string
 * - onClose: () => void
 * - autoHideMs?: number
 */
export default function Toast({ type = "info", message, onClose, autoHideMs = 4000 }) {
  const bg = type === "error" ? "rgba(239,68,68,0.1)" : type === "success" ? "rgba(16,185,129,0.1)" : "rgba(59,130,246,0.08)";
  const color = type === "error" ? "var(--color-error)" : type === "success" ? "var(--color-success)" : "var(--color-text)";

  useEffect(() => {
    if (!autoHideMs) return;
    const t = setTimeout(() => onClose && onClose(), autoHideMs);
    return () => clearTimeout(t);
  }, [autoHideMs, onClose]);

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 9999,
        background: bg,
        color,
        border: "1px solid var(--color-border)",
        borderLeft: `4px solid ${color}`,
        boxShadow: "0 8px 18px var(--color-shadow)",
        borderRadius: "var(--radius-md)",
        padding: "10px 14px",
        maxWidth: 360,
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
      }}
    >
      <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 9999, background: color, marginTop: 6 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>
          {type === "error" ? "Error" : type === "success" ? "Success" : "Notice"}
        </div>
        <div>{message}</div>
      </div>
      <button
        aria-label="Close notification"
        onClick={onClose}
        className="btn"
        style={{
          background: "transparent",
          color,
          boxShadow: "none",
          border: "1px solid var(--color-border)",
          padding: "6px 10px",
        }}
      >
        ×
      </button>
    </div>
  );
}
