import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Elegant sidebar with quick navigation items */
  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <h4 className="sidebar-title">Navigation</h4>
        <Link className="sidebar-item" to="/">Dashboard</Link>
        <Link className="sidebar-item" to="/plan">Plan an Event</Link>
        <Link className="sidebar-item" to="/services">Services</Link>
        <Link className="sidebar-item" to="/contact">Contact</Link>
      </div>
    </aside>
  );
}
