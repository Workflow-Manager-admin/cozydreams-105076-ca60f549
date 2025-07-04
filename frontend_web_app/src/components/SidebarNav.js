import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./SidebarNav.css";

const navTabs = [
  { path: "/", label: "Home", emoji: "🏠" },
  { path: "/my-room", label: "Room", emoji: "🛌" }, // Changed from 'My Room' to 'Room'
  { path: "/journal", label: "Journal", emoji: "📒" },
  { path: "/music", label: "Music", emoji: "🎵" },    // Replaces 'Explore' with Music
  { path: "/shop", label: "Shop", emoji: "🛍️" },
  { path: "/profile", label: "Profile", emoji: "🧑‍🎤" },
];

/**
 * PUBLIC_INTERFACE
 * SidebarNav: Dreamy, floating, pastel vertical nav for CozyDreams main navigation.
 * Pinned to the left, full height, with animated rounded pastel tabs.
 */
function SidebarNav() {
  const location = useLocation();

  return (
    <nav className="sidebar-nav" aria-label="Main Navigation">
      <div className="sidebar-nav-inner">
        {navTabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.path === "/"}
            className={({ isActive }) =>
              `sidebar-nav-item${isActive ? " active" : ""} ${
                location.pathname.startsWith(tab.path) && tab.path !== "/" ? "active" : ""
              }`
            }
            aria-label={tab.label}
            tabIndex={0}
          >
            <span className="emoji">{tab.emoji}</span>
            <span className="label">{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default SidebarNav;
