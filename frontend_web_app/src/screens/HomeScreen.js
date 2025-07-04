import React from "react";

/**
 * PUBLIC_INTERFACE
 * HomeScreen
 * The room/home/main screen, floating in a pastel card.
 */
function HomeScreen() {
  return (
    <main className="floating-screen">
      <h1 className="whimsical">🏠 Cozy Room</h1>
      <p style={{marginBottom: "2.5em"}}>Welcome to your dreamy, pastel home!</p>
      <div
        style={{
          background: "linear-gradient(120deg, #ffd1dc 70%, #c2e9fb 100%)",
          borderRadius: "32px",
          boxShadow: "0 10px 36px #b794f62e, 0 2px 24px #ffd1dc16",
          margin: "0 auto 2.2em auto",
          maxWidth: 355,
          padding: "2.2em 1.5em 2.5em 1.5em",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "#fff8fd",
            border: "2.2px dashed #b794f6",
            borderRadius: "28px",
            minHeight: 86,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 3px 16px #c2e9fb26",
            marginBottom: "0.8em"
          }}
        >
          <span style={{ fontSize: "2.1rem", color: "#b794f6", filter: "drop-shadow(0 2px 6px #ffd1dc44)" }}>🛋️</span>
        </div>
        <div style={{
          color: "#b794f6",
          fontFamily: "'Poppins', cursive",
          fontSize: "1.18em",
          fontWeight: 600,
          marginBottom: "0.2em"
        }}>
          Drag &amp; drop to decorate your sanctuary!
        </div>
        <div style={{
          color: "#8a7fae",
          fontSize: "0.99em",
          fontWeight: 400
        }}>
          (Furniture, art, plushies… drop here soon!)
        </div>
      </div>
      <div
        style={{
          background: "rgba(194,233,251,0.11)",
          borderRadius: "14px",
          margin: "0 auto",
          padding: "0.6em 1.2em",
          color: "#b794f6",
          fontSize: "1em",
          maxWidth: "320px",
          fontFamily: "'Poppins', cursive, sans-serif"
        }}
      >
        <span role="img" aria-label="Whisper Bubble" style={{fontSize: "1.4em"}}>💬</span>{" "}
        Whisper Bubble: Daily gentle message appears here.
      </div>
    </main>
  );
}
export default HomeScreen;
