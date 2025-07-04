import React, { useState } from "react";
import { theme } from "../theme";
import "../ui/GlobalStyle.css";
import { getSpotifyAccessToken, searchTracksForVibe } from "../utils/spotifyApi";

/**
 * PUBLIC_INTERFACE
 * MusicScreen
 * Fully refactored: quiz/question flow, answer chips, and results all appear in full-width, open, "floaty" pastel section-bubbles and grid/row layouts,
 * using the entire space beside the sidebar. Sparkling, dreamy, soft floating backgrounds and bubble-style pastel row dividers assure a wide,
 * ultra-spacious, gentle arrangement. All layouts are open (not boxed), animated, and responsive, matching the app's aesthetic.
 */

// Quiz Step Data: Each "step" is now a pastel floaty row, not a card
const QUIZ_STEPS = [
  {
    key: "color",
    prompt: "Pick a color that matches your mood right now:",
    options: [
      { label: "Pink Blush", value: "pink", emoji: "🌸", color: "#ffd1dc" },
      { label: "Lavender", value: "lavender", emoji: "💜", color: "#b794f6" },
      { label: "Cloud Blue", value: "blue", emoji: "💧", color: "#c2e9fb" },
      { label: "Mint", value: "mint", emoji: "🌿", color: "#caf7e2" },
      { label: "Peach", value: "peach", emoji: "🍑", color: "#ffcad4" },
    ],
    sparkle: "🫧"
  },
  {
    key: "mood",
    prompt: "How does your soul feel today?",
    options: [
      { label: "Dreamy", value: "dreamy", emoji: "🦄", color: "#b794f6" },
      { label: "Cozy", value: "cozy", emoji: "🧸", color: "#ffd1dc" },
      { label: "Chill", value: "chill", emoji: "🛌", color: "#c2e9fb" },
      { label: "Energized", value: "energized", emoji: "✨", color: "#fdffb6" },
      { label: "Tender", value: "tender", emoji: "💖", color: "#ffb6b9" }
    ],
    sparkle: "✨"
  },
  {
    key: "aesthetic",
    prompt: "Pick an aesthetic for your vibe:",
    options: [
      { label: "Lofi", value: "lofi", emoji: "🎧", color: "#b794f6" },
      { label: "Fairycore", value: "fairycore", emoji: "🧚‍♀️", color: "#ffeafb" },
      { label: "Cottagecore", value: "cottagecore", emoji: "🍃", color: "#caf7e2" },
      { label: "Pastel Pop", value: "pastelpop", emoji: "🌈", color: "#ffd1dc" },
      { label: "Night Sky", value: "nightsky", emoji: "🌠", color: "#c2e9fb" }
    ],
    sparkle: "🌸"
  },
];

const SPARKLE_EMOJIS = ["✨", "🌟", "💖", "🫧", "🌸", "⭐"];

// ---- Dreamy floating animated sparkle background ----
function FloatingPastelSparkles({count = 18, zIndex=4}) {
  return (
    <div
      aria-hidden="true"
      style={{
        pointerEvents: "none",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        zIndex
      }}
    >
      {[...Array(count)].map((_, i) => {
        const left = 6 + Math.random() * 87;
        const top = 4 + Math.random() * 89;
        const size = 18 + Math.random() * 20;
        const delay = Math.random() * 2.1;
        const emoji = SPARKLE_EMOJIS[i % SPARKLE_EMOJIS.length];
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              fontSize: `${size}px`,
              opacity: 0.49 + Math.random() * 0.44,
              textShadow: "0 1.5px 8px #b794f62a, 0 2px 12px #ffd1dc33",
              animation: `musicSparkleFadeIn 3.9s linear infinite`,
              animationDelay: `${delay}s`,
              filter: "blur(0.3px)"
            }}
            aria-hidden="true"
          >{emoji}</span>
        );
      })}
      <style>
        {`
        @keyframes musicSparkleFadeIn {
          0%   { opacity: 0.27; transform: scale(.93) translateY(0);}
          22%  { opacity: 0.85; }
          53%  { opacity: 1; transform: translateY(-11px) scale(1.11);}
          79%  { opacity: .50; }
          100% { opacity: 0; transform: scale(1) translateY(15px);}
        }
        `}
      </style>
    </div>
  );
}

// ---- Pastel Section Bubble/Row for full-width dreamy openness ----
function SectionBubble({children, bg, border, className="", zIndex=3, style={}}) {
  return (
    <section
      className={`music-section-bubble ${className}`}
      style={{
        background: bg || "linear-gradient(112deg, #fffafd 91%, #ffd1dc17 140%)",
        borderBottom: border ? `2.25px solid ${border}` : "2.15px solid #eee9f6",
        borderRadius: 42,
        boxShadow: "0 8px 36px #b794f61e, 0 2px 13px #ffd1dc1a",
        margin: "2em auto 2.2em auto",
        padding: "2.9em 4vw 2.2em 4vw",
        width: "99vw",
        maxWidth: 1300,
        zIndex,
        position: "relative",
        ...style
      }}
    >
      {children}
    </section>
  );
}

// ---- Option Chip ----
function PastelOptionChip({active, color, onClick, children, style, ...rest}) {
  return (
    <button
      {...rest}
      type="button"
      className="music-quiz-chip"
      style={{
        background: active
          ? `linear-gradient(110deg, ${color||"#fff"} 80%, #c2e9fb 180%)`
          : "#fff9fa",
        color: active ? "#b794f6" : "#8a7fae",
        fontWeight: 700,
        border: active ? "2.3px solid #b794f6" : "1.7px solid #eee9f6",
        borderRadius: 29,
        fontFamily: `'Poppins', cursive`,
        boxShadow: active
          ? "0 4px 16px #ffd1dc54, 0 1.2px 19px #b794f678"
          : "0 1px 8px #c2e9fb13",
        fontSize: "1.09em",
        padding: "0.63em 1.35em",
        margin: "0.14em 0.37em",
        outline: "none",
        cursor: "pointer",
        transition: "background .17s, box-shadow .13s, border .14s, color .15s",
        filter: active ? "drop-shadow(0 2px 7px #ffd1dcB5)" : "",
        ...style
      }}
      onClick={onClick}
    >{children}</button>
  );
}

// ---- Quiz Step: As a floaty wide row ----
function MusicQuizRow({step, value, onSelect, stepIdx, totalSteps, sparkle}) {
  return (
    <SectionBubble
      bg={`linear-gradient(105deg,
        ${theme.palette.primary} 81%,
        ${theme.palette.accent} 124%,
        #fff9fa 128%)`}
      border={theme.palette.accent}
      className="music-quiz-row"
      zIndex={6}
      style={{
        marginTop: stepIdx === 0 ? "2.2em" : "0",
        marginBottom: "1.8em",
        animation: "musicBubbleFloatIn 1.03s cubic-bezier(.66,1.18,.47,1.05)"
      }}
    >
      <FloatingPastelSparkles count={11 + stepIdx * 2} />
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch"
      }}>
        <div style={{
          fontFamily: "'Poppins', cursive",
          color: theme.palette.accent,
          fontWeight: 700,
          fontSize: "1.26em",
          marginBottom: "1.15em",
          textAlign: "left",
          letterSpacing: ".02em"
        }}>
          {step.prompt} {sparkle &&
            <span style={{
              marginLeft: 8,
              fontSize: "1.18em",
              verticalAlign: "middle",
              textShadow: "0 1px 8px #ffd1dc41"
            }}>{sparkle}</span>
          }
        </div>
        {/* Chips: open grid/row */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: "0.8em 0.5em",
          justifyContent: "flex-start"
        }}>
          {step.options.map(opt => (
            <PastelOptionChip
              key={opt.value}
              active={value === opt.value}
              color={opt.color}
              onClick={() => onSelect(opt.value)}
              aria-label={opt.label}
              style={{
                background: value === opt.value
                  ? `linear-gradient(98deg, ${opt.color} 82%, #fff8fd 140%)`
                  : "#fff9fd"
              }}
            >
              <span style={{
                fontSize: "1.22em",
                filter: value === opt.value
                  ? "drop-shadow(0 1px 8px #ffd1dc)"
                  : "",
                marginRight: "0.33em"
              }}>{opt.emoji}</span> {opt.label}
            </PastelOptionChip>
          ))}
        </div>
        {/* Step Indicator */}
        <div style={{
          marginTop: "1.7em",
          color: theme.palette.accent,
          opacity: 0.82,
          fontFamily: "'Poppins', cursive",
          fontWeight: 500,
          fontSize: "1.01em",
          letterSpacing: "0.04em"
        }}>
          Step {stepIdx + 1} <span style={{opacity:.41}}>of</span> {totalSteps}
        </div>
      </div>
      <style>
        {`
        @keyframes musicBubbleFloatIn {
          from { opacity: 0; transform: translateY(42px) scale(.98);}
          to   { opacity: 1; transform: translateY(0) scale(1);}
        }
        `}
      </style>
    </SectionBubble>
  );
}

// ---- Dreamy Floating Animated Intro Row ----
function MusicBarIntro({ onStart }) {
  return (
    <SectionBubble
      bg="linear-gradient(120deg, #ffd1dc44 71%, #b794f6 130%, #fff9fa 180%)"
      border={theme.palette.primary}
      className="music-intro-row"
      zIndex={9}
      style={{
        marginTop: "clamp(2.2rem, 7vw, 3.4rem)",
        marginBottom: "2.3em",
        borderRadius: 60,
        minHeight: 86,
        maxWidth: 770,
        animation: "musicIntroFloatIn 1.16s cubic-bezier(.75,1.13,.51,0.97)"
      }}
    >
      <FloatingPastelSparkles count={20} />
      <div style={{ position: "relative", zIndex: 7 }}>
        <div style={{
          position: "absolute",
          left: 14,
          top: 18,
          fontSize: "3.1em",
          filter: "drop-shadow(0 2px 8px #ffd1dc76) blur(0.1px)",
          userSelect: "none",
          zIndex: 4
        }}>🎵</div>
        <div
          className="intro-message"
          style={{
            position: "relative",
            zIndex: 4,
            marginTop: "0.82em",
            marginBottom: "0.55em",
            background: "#fff6facc",
            boxShadow: "0 1px 10px #ffd1dc16",
            borderRadius: "2.2em",
            maxWidth: 550,
            fontSize: "1.13em"
          }}
        >
          <span className="handwritten">
            What does your soul sound like today? <span role="img" aria-label="sparkle">✨</span>
          </span>
        </div>
        <div className="centered" style={{ marginTop: ".3em", zIndex: 20 }}>
          <button
            className="pastel-btn"
            onClick={onStart}
            style={{
              fontSize: "1.14em",
              borderRadius: 41,
              marginTop: "0.52em",
              padding: "0.92em 3.4em",
              fontWeight: 700,
              color: "#fff",
              background: "linear-gradient(95deg, #b794f6 100%, #ffd1dc 94%)",
              boxShadow: "0 8px 32px #b794f623"
            }}
          >
            Take Mood Music Quiz
          </button>
        </div>
      </div>
      <style>
        {`
        @keyframes musicIntroFloatIn {
          from {opacity:0; transform:translateY(55px) scale(.93);}
          to   {opacity:1; transform:translateY(0) scale(1);}
        }
        `}
      </style>
    </SectionBubble>
  );
}

// ---- Quiz Results as a pastel floaty row (full width, bubbles, sections) ----
function QuizResultsRow({ selections, onRetake, tracks, error, loading }) {
  return (
    <SectionBubble
      bg={`linear-gradient(121deg, #ffd1dc66 84%, #b794f6 140%, #c2e9fb 180%)`}
      border="#b794f6"
      className="music-results-row"
      zIndex={8}
      style={{
        maxWidth: 860,
        margin: "2.5em auto 2.2em auto",
        borderRadius: 53,
        animation: "musicResultsFadeIn 1.02s cubic-bezier(.72,1.11,.67,1)"
      }}
    >
      <FloatingPastelSparkles count={18} />
      <div style={{
        width: "100%",
        maxWidth: 810,
        minHeight: 92,
        margin: "0 auto",
        padding: "0 0.3em"
      }}>
        <div style={{
          textAlign: "center",
          fontFamily: "'Poppins', cursive",
          fontWeight: 700,
          color: "#b794f6",
          fontSize: "1.28em",
          marginBottom: "1.2em",
          letterSpacing: "0.01em"
        }}>
          Dreamy Tracks for Your Mood <span style={{marginLeft:6}} role="img" aria-label="sparkle">✨</span>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2.2em 2.3em",
          alignItems: "stretch",
          justifyContent: "center",
          minHeight: 95
        }}>
          {loading && (
            <div style={{
              color: "#b794f6",
              fontWeight: 600,
              fontSize: "1.13em",
              fontFamily: "'Poppins', cursive",
              gridColumn: "span 2"
            }}>
              Fetching dreamy music from the clouds...
            </div>
          )}
          {error && (
            <div style={{
              color: "#febbbb",
              fontWeight: 700,
              fontSize: "1.09em",
              textAlign: "center",
              background: "#fff4f8bb",
              borderRadius: "22px",
              boxShadow: "0 2px 12px #ffd1dc28",
              padding: "2em 0 1.2em 0",
              gridColumn: "span 2"
            }}>
              Sorry, we couldn't find music for this vibe.<br/>
              <span style={{color:"#b794f6"}}>Try a different mood or check your connection.<br/></span>
              <span style={{fontSize:"1.5em"}}>🌥️</span>
            </div>
          )}
          {!loading && !error && Array.isArray(tracks) && tracks.length > 0 && (
            tracks.slice(0,5).map((track, idx) => {
              const artistsStr = (track.artists || []).map(a=>a.name).join(", ");
              return (
                <div key={track.id || idx}
                  style={{
                    borderRadius: 31,
                    boxShadow: "0 4px 26px #ffd1dc22, 0 1px 9px #b794f631",
                    background: "linear-gradient(103deg,#fff8fc 85%,#f9f7ff 140%)",
                    margin: "0 auto 0.81em auto",
                    width: "100%",
                    maxWidth: 330,
                    minWidth: 180,
                    padding: "1.3em 0.7em 2.1em 0.7em",
                    position: "relative",
                    filter: "blur(0px) drop-shadow(0 0px 8px #b794f618)",
                    animation: "musicResultCardFloatIn .81s cubic-bezier(.73,1.11,.57,1.04)",
                    animationDelay: `${0.2*idx+0.09}s`,
                    opacity: 0.98
                  }}
                >
                  <div style={{
                    fontSize: "2em",
                    marginBottom: 8,
                    textAlign: "center",
                    filter:"drop-shadow(0 2px 9px #b794f632)"
                  }}>{SPARKLE_EMOJIS[idx%SPARKLE_EMOJIS.length]}</div>
                  <div style={{
                    color: "#b794f6",
                    fontWeight: 700,
                    fontSize: "1.08em",
                    fontFamily: "'Poppins', cursive",
                    marginBottom: 7,
                    textAlign:"center"
                  }}>{track.name || "Dreamy Track"}</div>
                  <div style={{
                    color:"#8a7fae",
                    fontWeight:500,
                    fontSize:"0.98em",
                    marginBottom: 7,
                    textAlign:"center"
                  }}>{artistsStr}</div>
                  <iframe
                    src={`https://open.spotify.com/embed/track/${track.id}`}
                    width="100%"
                    height="80"
                    style={{
                      borderRadius: 19,
                      border: "none",
                      filter: "saturate(1.06) drop-shadow(0 0px 13px #c2e9fb18)",
                      background: "#fff",
                      marginTop: 4
                    }}
                    title={`spotify-track-${track.id}`}
                    allow="encrypted-media"
                    loading="lazy"
                  />
                </div>
              )
            })
          )}
        </div>
        <div style={{marginTop:"2.9em", display:"flex", justifyContent:"center", width:"100%"}}>
          <button
            type="button"
            className="pastel-btn"
            onClick={onRetake}
            style={{
              fontSize: "1.12em",
              fontWeight: 700,
              borderRadius: 37,
              background: "linear-gradient(108deg,#c2e9fb,#b794f6 128%)",
              color: "#fff",
              boxShadow: "0 0 15px #ffd1dc36",
              minWidth: 150
            }}
          >Retake Quiz</button>
        </div>
      </div>
      <style>
        {`
          @keyframes musicResultsFadeIn {
            from {opacity: 0; transform: translateY(51px) scale(.97);}
            to   {opacity: 1; transform: translateY(0) scale(1);}
          }
          @keyframes musicResultCardFloatIn {
            from { opacity:0; transform:translateY(19px) scale(.93);}
            to   { opacity:0.99; transform:translateY(0) scale(1);}
          }
        `}
      </style>
    </SectionBubble>
  );
}

// ---- Actual Screen Component ----
function MusicScreen() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [selections, setSelections] = useState({});
  const [showResult, setShowResult] = useState(false);

  // Spotify state
  const [spotifyLoading, setSpotifyLoading] = useState(false);
  const [spotifyTracks, setSpotifyTracks] = useState([]);
  const [spotifyError, setSpotifyError] = useState(null);

  // Fetch Spotify when quiz ends
  React.useEffect(() => {
    if (showResult) {
      setSpotifyLoading(true);
      setSpotifyError(null);
      setSpotifyTracks([]);
      (async () => {
        try {
          if (!selections.color || !selections.mood || !selections.aesthetic) {
            setSpotifyTracks([]);
            setSpotifyLoading(false);
            return;
          }
          const accessToken = await getSpotifyAccessToken();
          let tracksRaw = await searchTracksForVibe(selections, accessToken);
          tracksRaw = Array.isArray(tracksRaw)
            ? tracksRaw.filter(
                (t) =>
                  t.id &&
                  t.name &&
                  (t.preview_url || t.external_urls?.spotify)
              )
            : [];
          let tracks = tracksRaw.sort(() => Math.random() - 0.5).slice(0, 5);
          setSpotifyTracks(tracks);
          if (!tracks.length) setSpotifyError("No tracks found for this vibe.");
        } catch (err) {
          setSpotifyError(
            typeof err === "string"
              ? err
              : (err && err.message
                ? err.message
                : "Could not fetch music from Spotify.")
          );
          setSpotifyTracks([]);
        } finally {
          setSpotifyLoading(false);
        }
      })();
    }
    // eslint-disable-next-line
  }, [showResult, selections.color, selections.mood, selections.aesthetic]);

  function handleSelect(val) {
    const curKey = QUIZ_STEPS[stepIdx].key;
    const nextSelections = { ...selections, [curKey]: val };
    setSelections(nextSelections);
    if (stepIdx === QUIZ_STEPS.length - 1) {
      setTimeout(() => {
        setShowResult(true);
      }, 555); // gentle fade
    } else {
      setTimeout(() => setStepIdx(stepIdx + 1), 410);
    }
  }

  // Start/Retake
  function startQuiz() {
    setQuizStarted(true);
    setShowResult(false);
    setSelections({});
    setStepIdx(0);
    setSpotifyLoading(false);
    setSpotifyTracks([]);
    setSpotifyError(null);
  }
  function retakeQuiz() {
    setQuizStarted(false);
    setShowResult(false);
    setSelections({});
    setStepIdx(0);
    setSpotifyLoading(false);
    setSpotifyTracks([]);
    setSpotifyError(null);
  }

  // ---- MAIN: open, wide, pastel dreamy layout ----
  return (
    <main
      className="main-music-dreamy"
      style={{
        background: "linear-gradient(117deg, #ffd1dc19 71%, #c2e9fb1b 130%, #b794f624 180%)",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "none",
        boxShadow: "none",
        position: "relative",
        overflow: "visible",
        display: "block"
      }}
    >
      {/* Dreamy ambient pastel sparkles in bg */}
      <FloatingPastelSparkles count={28} zIndex={2} />

      {/* Intro row */}
      {!quizStarted && !showResult && (
        <>
          <MusicBarIntro onStart={startQuiz} />
          <div
            aria-hidden="true"
            style={{
              width: "84%",
              maxWidth: 1210,
              height: 0,
              border: 0,
              borderBottom: "7px solid #c2e9fb24",
              margin: "0 auto 1em auto",
              borderRadius: 18
            }}
          />
        </>
      )}

      {/* Quiz multi-rows */}
      {quizStarted && !showResult && (
        <>
          <MusicQuizRow
            step={QUIZ_STEPS[stepIdx]}
            value={selections[QUIZ_STEPS[stepIdx].key] || ""}
            onSelect={handleSelect}
            stepIdx={stepIdx}
            totalSteps={QUIZ_STEPS.length}
            sparkle={QUIZ_STEPS[stepIdx].sparkle}
          />
          <div
            aria-hidden="true"
            style={{
              width:"70%",
              maxWidth:1080,
              margin:"0 auto 1.3em auto",
              height: 0,
              border: 0,
              borderBottom: "4.5px solid #ffd1dc21",
              borderRadius: 13
            }}
          />
        </>
      )}

      {/* Results row */}
      {showResult && (
        <QuizResultsRow
          selections={selections}
          onRetake={retakeQuiz}
          tracks={spotifyTracks}
          error={spotifyError}
          loading={spotifyLoading}
        />
      )}

      {/* Custom style for open rows, pastel bubbles, and gentle transitions */}
      <style>
        {`
          .music-section-bubble {
            width: 98vw;
            max-width: 1320px;
            margin: 2.4em auto 2.1em auto;
            transition: box-shadow .17s, background .13s, border-bottom .12s;
            animation: musicBubbleFloatIn 1.04s cubic-bezier(.63,1.15,.47,0.98);
            will-change: opacity, transform;
            border-radius: 39px;
          }
          @media (max-width: 1400px) {
            .music-section-bubble { max-width: 98vw; }
          }
          @media (max-width: 800px) {
            .music-section-bubble { width: 99vw; min-width: 0; padding-left:2vw; padding-right:2vw;}
          }
          @media (max-width: 600px) {
            .music-section-bubble { padding:1.2em 2vw 1.1em 2vw; }
            main.main-music-dreamy { min-height:98vh;}
          }
          .music-quiz-chip:focus, .music-quiz-chip:hover {
            background: linear-gradient(111deg, #ffd1dc, #b794f6 119%);
            color: #fff !important;
            border: 2.25px solid #ffd1dc;
            box-shadow: 0 3px 14px #ffd1dc6e;
            transform: scale(1.04);
            outline: none;
          }
        `}
      </style>
    </main>
  );
}

export default MusicScreen;

