import React, { useState, useEffect } from "react";
import "./ui/GlobalStyle.css";
import theme from "./theme";

/**
 * CozyDreams App Entry Point.
 * Applies pastel global theme and demonstrates foundational UI.
 */
// PUBLIC_INTERFACE
function App() {
  // Theme state (future: expand to support night/seasonal themes)
  const [appTheme, setAppTheme] = useState("light");

  useEffect(() => {
    // Ready for future theme classes, currently "light" pastel only
    document.body.setAttribute("data-theme", appTheme);
  }, [appTheme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setAppTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Example: pastel card and whimsical type showcase
  return (
    <div>
      <div className="centered" style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
        <div className="floating-card">
          <button
            className="pastel-btn"
            style={{ float: "right" }}
            onClick={toggleTheme}
            aria-label={`Switch to ${appTheme === "light" ? "dark" : "light"} mode`}
          >
            {appTheme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          <h1 className="whimsical" style={{ marginTop: 18 }}>
            Welcome to <span style={{ color: "var(--color-primary)" }}>CozyDreams</span>
          </h1>
          <p style={{
            fontSize: "1.09em",
            color: "var(--color-text-secondary)",
            margin: "0.45em 0 1em",
            fontFamily: theme.fontFamily,
            fontWeight: 400
          }}>
            Your dreamy, pastel, and gently whimsical world starts here.
          </p>
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: theme.fontFamily,
              display: "inline-block",
              marginTop: "1.3em",
              fontWeight: 600,
              fontSize: "1.03em"
            }}
          >
            🌈 Learn React & Cozy UI
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
