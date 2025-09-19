import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Elegant sidebar with quick navigation items */
  return (
    <aside className="sidebar" aria-label="Sidebar">
      <div className="sidebar-card">
        <h4 className="sidebar-title">Navigation</h4>
        <nav role="navigation" aria-label="Main navigation">
          <ul className="list-reset" role="list">
            <li role="listitem"><Link className="sidebar-item" to="/">Dashboard</Link></li>
            <li role="listitem"><Link className="sidebar-item" to="/plan">Plan an Event</Link></li>
            <li role="listitem"><Link className="sidebar-item" to="/services">Services</Link></li>
            <li role="listitem"><Link className="sidebar-item" to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
