import React from "react";
import { getGradient } from "../theme";

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
        <a className="nav-link" href="#home">Home</a>
        <a className="nav-link" href="#plan">Plan Event</a>
        <a className="nav-link" href="#forecast">Forecast</a>
        <a className="nav-link" href="#services">Services</a>
        <a className="nav-link" href="#contact">Contact</a>
        <button className="btn" onClick={onPrimaryAction}>Get Recommendations</button>
      </div>
    </nav>
  );
}
