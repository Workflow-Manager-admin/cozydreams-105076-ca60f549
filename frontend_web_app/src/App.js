import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./ui/GlobalStyle.css";
import theme from "./theme";
import HomeScreen from "./screens/HomeScreen";
import JournalScreen from "./screens/JournalScreen";
import ExploreScreen from "./screens/ExploreScreen";
import ShopScreen from "./screens/ShopScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SidebarNav from "./components/SidebarNav";

/**
 * CozyDreams App Entry Point (SPA).
 * Uses a dreamy vertical sidebar nav and routes to main whimsical screens.
 */
// PUBLIC_INTERFACE
function App() {
  // Theme state
  const [appTheme, setAppTheme] = useState("light");

  useEffect(() => {
    document.body.setAttribute("data-theme", appTheme);
  }, [appTheme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setAppTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Main layout with sidebar
  return (
    <Router>
      <button
        className="pastel-btn"
        style={{
          position: "fixed",
          top: 18,
          right: 24,
          zIndex: 50,
          fontSize: "1em",
          boxShadow: "0 3px 12px #ffd1dc34",
        }}
        onClick={toggleTheme}
        aria-label={`Switch to ${appTheme === "light" ? "dark" : "light"} mode`}
      >
        {appTheme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <div className="app-layout">
        <SidebarNav />
        <main className="main-content-float">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/journal" element={<JournalScreen />} />
            <Route path="/explore" element={<ExploreScreen />} />
            <Route path="/shop" element={<ShopScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

