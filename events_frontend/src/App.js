import React, { useEffect } from "react";
import "./App.css";
import { applyCssVariables, themeTokens } from "./theme";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

/**
 * PUBLIC_INTERFACE
 * App: Root layout shell with Elegant Rose Gold theme, navbar, sidebar, and demo content.
 */
function App() {
  // Initialize theme variables on mount
  useEffect(() => {
    applyCssVariables();
  }, []);

  const handlePrimaryAction = () => {
    // Placeholder action: in future connect to backend (/api/events/recommendations)
    // For now, just focus visible feedback.
    alert("Recommendations flow coming soon!");
  };

  return (
    <div className="app" aria-label={`${themeTokens.name} Themed Application Shell`}>
      <Navbar onPrimaryAction={handlePrimaryAction} />
      <Sidebar />
      <main className="content">
        <section className="hero">
          <h1 className="title">Plan weather‑wise, celebrate stress‑free</h1>
          <p className="subtitle">
            Elegant planning with live weather insights. Use our recommendations to
            choose the best time for your event based on forecast and comfort.
          </p>
          <div className="row">
            <button className="btn" onClick={handlePrimaryAction}>Start Planning</button>
            <div className="grow" />
          </div>

          <div className="card-grid">
            <div className="card">
              <h3>Live Weather</h3>
              <p>See current conditions and plan with confidence.</p>
            </div>
            <div className="card">
              <h3>Forecast Windows</h3>
              <p>We score time windows to find the most comfortable slot.</p>
            </div>
            <div className="card">
              <h3>Smart Recommendations</h3>
              <p>Personalized suggestions tailored to your event.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
