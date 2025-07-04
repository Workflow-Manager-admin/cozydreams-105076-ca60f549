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
  // Main layout with sidebar
  return (
    <Router>
      <div className="app-layout">
        <SidebarNav />
        <main className="main-content-float">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/my-room" element={<HomeScreen />} /> {/* My Room uses HomeScreen for now */}
            <Route path="/journal" element={<JournalScreen />} />
            <Route path="/music" element={<ExploreScreen />} /> {/* Music nav temporarily routes to ExploreScreen; adjust as MusicScreen is added */}
            <Route path="/shop" element={<ShopScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

