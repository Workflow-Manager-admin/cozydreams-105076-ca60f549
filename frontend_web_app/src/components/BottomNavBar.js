import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./BottomNavBar.css";

/**
 * PUBLIC_INTERFACE
 * BottomNavBar: Floating and pastel navigation bar for 5 tabs.
 * Renders below main content, styled for soft, dreamy, whimsical UI.
 */
const navTabs = [
  { path: "/", label: "Home", emoji: "🏠" },
  { path: "/journal", label: "Journal", emoji: "📒" },
  { path: "/explore", label: "Explore", emoji: "🔍" },
  { path: "/shop", label: "Shop", emoji: "🛍️" },
  { path: "/profile", label: "Profile", emoji: "🧑‍🎤" },
];

function BottomNavBar() {
  const location = useLocation();

  return (
    <nav className="bottom-navbar">
      {navTabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.path === "/"}
          className={({ isActive }) =>
            `nav-item${isActive ? " active" : ""} ${
              location.pathname.startsWith(tab.path) && tab.path !== "/" ? "active" : ""
            }`
          }
          aria-label={tab.label}
        >
          <span className="emoji">{tab.emoji}</span>
          <span className="label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNavBar;
