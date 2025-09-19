import React from "react";
import { getGradient } from "../theme";
import { NavLink } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Navbar({ onPrimaryAction }) {
  /** Elegant top navigation bar with brand and quick links */
  return (
    <nav className="navbar" style={{ backgroundImage: getGradient("subtle") }}>
      <div className="brand">
        <div className="brand-mark" aria-hidden="true" />
        <span className="brand-name">WeatherWise Events</span>
      </div>
      <div className="nav-links">
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/plan">Plan Event</NavLink>
        <NavLink className="nav-link" to="/services">Services</NavLink>
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
        <button className="btn" onClick={onPrimaryAction}>Get Recommendations</button>
      </div>
    </nav>
  );
}
