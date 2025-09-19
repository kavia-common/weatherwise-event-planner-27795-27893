import React, { useEffect } from "react";
import "./App.css";
import { applyCssVariables, themeTokens } from "./theme";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PlanEvent from "./pages/PlanEvent";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

/**
 * PUBLIC_INTERFACE
 * App: Root layout shell with Elegant Rose Gold theme, navbar, sidebar, and route content.
 */
function App() {
  // Initialize theme variables on mount
  useEffect(() => {
    applyCssVariables();
  }, []);

  const handlePrimaryAction = () => {
    alert("Recommendations flow coming soon!");
  };

  return (
    <div className="app" aria-label={`${themeTokens.name} Themed Application Shell`}>
      <Navbar onPrimaryAction={handlePrimaryAction} />
      <Sidebar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<PlanEvent />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          {/* legacy hash anchors or unknown paths redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
