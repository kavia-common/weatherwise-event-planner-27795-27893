import React from "react";

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Elegant sidebar with quick navigation items */
  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <h4 className="sidebar-title">Navigation</h4>
        <a className="sidebar-item" href="#home">Dashboard</a>
        <a className="sidebar-item" href="#plan">Plan an Event</a>
        <a className="sidebar-item" href="#forecast">Weather & Forecast</a>
        <a className="sidebar-item" href="#bookings">My Bookings</a>
      </div>
    </aside>
  );
}
