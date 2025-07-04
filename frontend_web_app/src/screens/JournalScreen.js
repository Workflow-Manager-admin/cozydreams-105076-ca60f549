import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * JournalScreen
 * Layout: Open, wide pastel bubble/row sections (no central boxed card) for journaling entry, prompt, calendar, and mood, full page width, floaty and responsive.
 */
function JournalScreen() {
  // Placeholder states for future entries; ready for gentle expansion
  const [entry, setEntry] = useState("");
  const todaysPrompt = "What warmed your heart?";
  const moodOptions = [
    { label: "Cozy", value: "cozy", emoji: "🧣" },
    { label: "Dreamy", value: "dreamy", emoji: "🌸" },
    { label: "Reflective", value: "reflective", emoji: "🪞" },
    { label: "Grateful", value: "grateful", emoji: "🙏" },
    { label: "Tender", value: "tender", emoji: "💖" },
  ];
  const [mood, setMood] = useState(moodOptions[2].value);

  // Pastel section bubble helper
  function SectionBubble({ children, bg, border, style, className = "" }) {
    return (
      <section
        className={`journal-section-bubble ${className}`}
        style={{
          background: bg || "linear-gradient(118deg, #fff8fd 92%, #ffd1dc13 130%)",
          borderBottom: border ? `2.2px solid ${border}` : "2.15px solid #eee9f6",
          borderRadius: 34,
          boxShadow: "0 3px 16px #ffd1dc18, 0 1.5px 7px #b794f614",
          margin: "2.2em auto 0.5em auto",
          padding: "2.2em 1.6em 1.7em 2.3em",
          width: "96vw",
          maxWidth: 900,
          ...style
        }}
      >
        {children}
      </section>
    );
  }

  return (
    <main
      className="main-journal-dreamy"
      style={{
        background: "linear-gradient(117deg, #ffd1dc18 67%, #c2e9fb18 117%, #b794f617 150%)",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "none",
        boxShadow: "none",
        position: "relative",
        display: "block",
        padding: 0,
        overflow: "visible"
      }}
    >
      <h1 className="whimsical" style={{
        width: "100%", 
        textAlign: "left",
        paddingLeft: "4vw",
        margin:"clamp(2em, 7vw, 3.5em) auto 0.6em auto"
      }}>📒 Journal</h1>

      {/* Prompt row bubble */}
      <SectionBubble
        bg="linear-gradient(120deg, #c2e9fb44 90%, #fff8fd 140%)"
        border="#b794f6"
        style={{
          marginTop: "0.6em",
          marginBottom: "0.3em",
          padding: "2.2em 1.2em 1.85em 2.2em",
          zIndex: 4,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1.8em",
          flexWrap: "wrap"
        }}
        className="prompt-bubble"
      >
        <span role="img" aria-label="journal" style={{
          fontSize: "2.1em",
          color: "#b794f6",
          marginRight: "0.11em"
        }}>📝</span>
        <div
          className="journal-prompt"
          style={{
            fontFamily: "'Poppins', cursive",
            fontWeight: 600,
            fontSize: "1.14em",
            color: "#8a7fae",
            lineHeight: 1.51,
            letterSpacing: "0.06em"
          }}
        >
          Today’s Prompt: <span style={{ color: "#b794f6" }}>{todaysPrompt}</span>
        </div>
      </SectionBubble>

      {/* Divider */}
      <div aria-hidden="true"
        style={{
          height: 0,
          borderBottom: "3px solid #c2e9fb23",
          width: "66%",
          maxWidth: 790,
          margin: "0.1em auto 0 auto"
        }}
      ></div>

      {/* Mood Selector Bubble */}
      <SectionBubble
        bg="linear-gradient(120deg, #ffd1dc33 84%, #c2e9fb14 128%)"
        border="#ffd1dc"
        style={{
          padding: "1.7em 1.4em 1em 2.2em",
          marginBottom: "0.3em",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "1.2em"
        }}
        className="mood-bubble"
      >
        <span style={{
          fontFamily: "'Poppins', cursive",
          color: "#b794f6",
          fontWeight: 700,
          fontSize: "1.15em",
          marginRight: "0.7em"
        }}>
          Today's Mood:
        </span>
        <div style={{
          display: "flex", gap: "0.45em", flexWrap: "wrap"
        }}>
          {moodOptions.map(opt => (
            <button
              key={opt.value}
              className="pastel-btn"
              style={{
                background: mood === opt.value
                  ? "linear-gradient(94deg,#b794f638 60%, #ffd1dc88 140%)"
                  : "#fff6fa",
                color: mood === opt.value ? "#b794f6" : "#8a7fae",
                border: mood === opt.value ? "2.1px solid #b794f6" : "1.4px solid #eee9f6",
                borderRadius: 27,
                fontWeight: mood === opt.value ? 700 : 500,
                fontSize: "1.08em",
                padding: "0.43em 1.55em",
                margin: "0.1em 0.19em",
                outline: "none",
                boxShadow: mood === opt.value
                  ? "0 2.5px 12px #ffd1dc35"
                  : "0 1px 5px #c2e9fb24",
                cursor: "pointer",
                transition: "all 0.18s"
              }}
              aria-pressed={mood === opt.value}
              tabIndex={0}
              onClick={() => setMood(opt.value)}
            >
              <span style={{ marginRight: 8 }}>{opt.emoji}</span>{opt.label}
            </button>
          ))}
        </div>
      </SectionBubble>

      {/* Divider */}
      <div aria-hidden="true"
        style={{
          height: 0,
          borderBottom: "2.5px solid #ffd1dc1a",
          width: "62%",
          maxWidth: 700,
          margin: "0.1em auto 0 auto"
        }}
      ></div>

      {/* Journal Entry Bubble */}
      <SectionBubble
        bg="linear-gradient(98deg, #ffeaf7 91%, #fff8fd 125%)"
        border="#eee9f6"
        style={{
          padding: "2.1em 1.7em 1.7em 2.3em",
          marginBottom: "0.4em",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
        className="entry-bubble"
      >
        <label htmlFor="journal-entry" style={{
          fontFamily: "'Poppins', cursive",
          color: "#8a7fae",
          fontWeight: 600,
          fontSize: "1.11em",
          marginBottom: "0.8em"
        }}>
          Journal Entry
        </label>
        <textarea
          id="journal-entry"
          placeholder="Type your gentle thoughts here… (coming soon)"
          value={entry}
          onChange={e => setEntry(e.target.value)}
          disabled // Feature WIP: Enable when ready for storage/API
          style={{
            width: "100%",
            minHeight: "72px",
            resize: "vertical",
            background: "#faf7ff",
            border: "1.8px solid #eee9f6",
            borderRadius: "18px",
            padding: "13px 15px",
            fontSize: "1.03em",
            fontFamily: "inherit",
            color: "#34243a",
            opacity: 0.7,
            marginBottom: "0.81em",
            outline: "none"
          }}
        />
      </SectionBubble>

      {/* Divider */}
      <div aria-hidden="true"
        style={{
          height: 0,
          borderBottom: "2px solid #b794f61b",
          width: "67%",
          maxWidth: 740,
          margin: "0.1em auto 0.5em auto"
        }}
      ></div>

      {/* Calendar (Coming Soon) Bubble */}
      <SectionBubble
        bg="linear-gradient(97deg, #c2e9fb23 82%, #ffd1dc34 118%)"
        border="#c2e9fb"
        style={{
          marginBottom: "0.45em",
          display: "flex",
          alignItems: "center",
          gap: "1.3em",
          padding: "1.6em 1.2em 1.3em 2em"
        }}
        className="calendar-bubble"
      >
        <span role="img" aria-label="calendar" style={{ fontSize: "1.7em", marginRight: "0.71em" }}>📆</span>
        <div style={{
          color: "#b794f6",
          fontWeight: 500,
          fontSize: "1.09em",
          fontFamily: "'Poppins', cursive"
        }}>
          Journal Calendar (coming soon)
        </div>
      </SectionBubble>

      {/* Divider */}
      <div aria-hidden="true"
        style={{
          height: 0,
          borderBottom: "2px solid #b794f61b",
          width: "69%",
          maxWidth: 790,
          margin: "0.1em auto 1em auto"
        }}
      ></div>

      {/* Inspiration / bottom gentle notes */}
      <div style={{
        width: "100%",
        margin: "0 0 2.6em 0",
        textAlign: "center",
        fontFamily: "'Poppins', cursive",
        color: "#8a7fae",
        fontSize: "1.04em",
        lineHeight: 1.5,
        opacity: 0.97
      }}>
        Reflect, dream, and keep gentle records of your days.
      </div>

      {/* Extra: embed minimalist style for wide pastel openness & responsiveness */}
      <style>
        {`
        .journal-section-bubble {
          width: 96vw;
          max-width: 1100px;
          margin: 2em auto 0.65em auto;
          transition: box-shadow .15s, background .17s, border-bottom .13s;
          animation: bubbleFloatIn 1s cubic-bezier(.63,1.13,.47,0.95);
          will-change: opacity, transform;
        }
        @media (max-width: 1100px) {
          .journal-section-bubble { max-width: 99vw; }
        }
        @media (max-width: 700px) {
          .journal-section-bubble { padding-left: 0.5em; padding-right: 0.5em;}
        }
        @media (max-width: 505px) {
          .journal-section-bubble { padding: 1em 2vw 1em 2vw; }
        }
        @keyframes bubbleFloatIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97);}
          to   { opacity: 1; transform: translateY(0) scale(1);}
        }
        `}
      </style>
    </main>
  );
}
export default JournalScreen;
