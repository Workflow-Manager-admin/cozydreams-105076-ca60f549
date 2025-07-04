import React from "react";

/**
 * PUBLIC_INTERFACE
 * JournalScreen
 * Placeholder for journaling flow & calendar view.
 */
function JournalScreen() {
  return (
    <main className="floating-screen">
      <h1 className="whimsical">📒 Journal</h1>
      <div
        style={{
          background: "linear-gradient(115deg, #c2e9fb 75%, #b794f6 100%)",
          borderRadius: "30px",
          boxShadow: "0 3px 24px #ffd1dc19",
          padding: "1.9em 1.1em 1.4em 1.1em",
          margin: "0 auto 1.5em auto",
          maxWidth: 330,
          position: "relative"
        }}
      >
        <div
          style={{
            background: "#fff8fd",
            borderRadius: "20px",
            boxShadow: "0 1px 10px #ffd1dc14",
            padding: "1.4em 1em 1.2em",
            marginBottom: "0.74em"
          }}
        >
          <span role="img" aria-label="journal" style={{fontSize: "1.5em", color: "#b794f6"}}>📝</span>
          <div style={{fontWeight: 600, margin: "0.4em 0 0.7em 0", fontSize: "1.08em", color: "#8a7fae", fontFamily: "'Poppins', cursive"}}>
            Today’s Prompt: <span style={{color:"#b794f6"}}>What warmed your heart?</span>
          </div>
          <textarea
            disabled
            placeholder="(Type here soon…)"
            style={{
              width: "100%",
              minHeight: "48px",
              resize: "none",
              background: "#faf7ff",
              border: "1.8px solid #eee9f6",
              borderRadius: "14px",
              padding: "10px 12px",
              fontSize: "0.98em",
              fontFamily: "inherit",
              color: "#34243a",
              opacity: 0.7
            }}
          />
        </div>
        <div
          style={{
            background: "#ffeaf7",
            borderRadius: "14px",
            color: "#b794f6",
            fontWeight: 500,
            fontSize: "0.97em",
            display: "inline-block",
            padding: "0.43em 1.7em",
            margin: "0 auto",
            fontFamily: "'Poppins', cursive"
          }}
        >
          <span role="img" aria-label="calendar" style={{marginRight: "0.6em"}}>📆</span>
          Journal Calendar (coming soon)
        </div>
      </div>
      <p style={{ color: "#8a7fae", marginBottom: 0 }}>
        Reflect, dream, and keep gentle records of your days.
      </p>
    </main>
  );
}
export default JournalScreen;
