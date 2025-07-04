import React, { useState } from "react";
import { theme } from "../theme";
import "../ui/GlobalStyle.css";

/**
 * PUBLIC_INTERFACE
 * MusicScreen
 * Dreamy, animated, emotionally-soft multi-step Music Mood Quiz UI.
 * Music Bar opens quiz; pastel fading cards for color, mood, aesthetic; glowing chip buttons; floating emoji/sparkle anims;
 * dreamy intro and result transitions. Shows 3-5 fetched Spotify results, with retake option.
 */

// Quiz Step Data: each step is a card w/ soft pastel gradients, emoji/sparkle highlights
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

const dreamySpotifyResults = [
  // Placeholder static tracks for visuals; real fetch would use Spotify API
  {
    name: "Pastel Skies",
    artist: "Dream Lofi",
    spotify: "https://open.spotify.com/embed/track/3qEIdv5fVyASgBycn8THwW",
    mood: "dreamy"
  },
  {
    name: "Cloud Blanket",
    artist: "AmbientCo",
    spotify: "https://open.spotify.com/embed/track/5Wn4R9uqti10li8wZPCAlX",
    mood: "cozy"
  },
  {
    name: "Lavender Glow",
    artist: "Soft Beats",
    spotify: "https://open.spotify.com/embed/track/3pzVPn4KDK7xIdGvTnR9E5",
    mood: "chill"
  }
];

// ---- Helper: Animated Sparkle Emoji Bubbles (floating, gentle drift) ----
function FloatingSparkles({ count = 14, fadeIn = true }) {
  return (
    <div style={{ pointerEvents: "none", position: "absolute", left: 0, top: 0, width: "100%", height: "100%", zIndex: 6 }}>
      {[...Array(count)].map((_, i) => {
        const left = 6 + Math.random() * 88;
        const top = 4 + Math.random() * 79;
        const size = 18 + Math.random() * 20;
        const delay = Math.random() * 2.3;
        const emoji = SPARKLE_EMOJIS[i % SPARKLE_EMOJIS.length];
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              fontSize: `${size}px`,
              opacity: fadeIn ? 0.58 + Math.random() * 0.36 : 0.24 + Math.random() * 0.4,
              textShadow: "0 1.5px 8px #b794f62a, 0 2px 12px #ffd1dc33, 0 0 31px #b794f666",
              animation: `dreamySparkleFadeIn 3.3s linear infinite`,
              animationDelay: `${delay}s`,
              filter: "blur(0.35px)"
            }}
          >{emoji}</span>
        );
      })}
      <style>
        {`
        @keyframes dreamySparkleFadeIn {
          0%   { opacity: 0.35; transform: scale(1) translateY(0); }
          20%  { opacity: 0.78; }
          50%  { opacity: 1; transform: translateY(-13px) scale(1.08);}
          80%  { opacity: .59; }
          100% { opacity: 0; transform: scale(1) translateY(13px);}
        }`}
      </style>
    </div>
  );
}

// ---- Helper: Glowing Bubble/Chip Button ----
function GlowingChipButton({ active, color, onClick, children, style, ...rest }) {
  return (
    <button
      {...rest}
      type="button"
      className="dreamy-chip-btn"
      style={{
        background: active
          ? `linear-gradient(110deg, ${color || "#fff"} 80%, #c2e9fb 180%)`
          : "#fffafa",
        color: active ? "#b794f6" : "#8a7fae",
        fontWeight: 600,
        border: active ? `2.2px solid #b794f6` : "1.8px solid #eee9f6",
        borderRadius: 32,
        fontFamily: `'Poppins', cursive`,
        boxShadow: active
          ? "0 4px 19px #ffd1dc49, 0 0px 23px #b794f641"
          : "0 1px 8px #c2e9fb15",
        fontSize: "1.09em",
        padding: "0.64em 1.38em",
        margin: "0.18em 0.38em",
        outline: "none",
        cursor: "pointer",
        transition: "background .19s, box-shadow .16s, border .15s, color .15s",
        filter: active ? "drop-shadow(0 2px 11px #ffd1dc88)" : "",
        ...style
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ---- Main Quiz Flow Component ----
function MusicMoodQuizCard({ step, value, onSelect, stepIdx, totalSteps, sparkle }) {
  // Animated dreamy, floating pastel card for quiz step
  return (
    <div className="quiz-card-float dreamy-quiz-step"
      style={{
        background: `linear-gradient(132deg, ${theme.palette.primary} 67%, ${theme.palette.secondary} 180%)`,
        borderRadius: 34,
        boxShadow: "0 8px 33px #b794f632, 0 3px 14px #ffd1dc23",
        maxWidth: 415,
        minHeight: 94,
        margin: "2.3em auto 1.3em auto",
        padding: "2.1em 1.3em 1.8em 1.3em",
        position: "relative",
        zIndex: 4,
        filter: "drop-shadow(0 2px 33px #ffd1dc33)",
        opacity: 1,
        animation: "dreamyQuizFadeIn 1.1s"
      }}
    >
      {/* Sparkles floating on card */}
      <FloatingSparkles count={8 + stepIdx * 2} fadeIn={true} />
      {/* Prompt */}
      <div style={{
        fontFamily: "'Poppins', cursive",
        color: "#b794f6",
        fontSize: "1.18em",
        marginBottom: "1.1em",
        fontWeight: 700,
        textAlign: "center",
        letterSpacing: "0.02em"
      }}>
        {step.prompt}
        {sparkle && (
          <span style={{
            marginLeft: 8,
            fontSize: "1.23em",
            verticalAlign: "middle",
            textShadow: "0 1px 8px #ffd1dc43"
          }}>{sparkle}</span>
        )}
      </div>
      {/* Option Chips */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.8em 0.4em",
        minHeight: 49
      }}>
        {step.options.map(opt => (
          <GlowingChipButton
            key={opt.value}
            active={value === opt.value}
            color={opt.color}
            onClick={() => onSelect(opt.value)}
            aria-label={opt.label}
            style={{
              fontWeight: 700,
              fontSize: "1.1em",
              border: value === opt.value ? "2.7px solid #b794f6" : "",
              background: value === opt.value
                ? `linear-gradient(99deg, ${opt.color} 80%, #fff6fa 140%)`
                : "#fff8fd"
            }}
          >
            <span style={{
              fontSize: "1.24em",
              filter: value === opt.value ? "drop-shadow(0 1px 8px #ffd1dc)" : "",
              marginRight: "0.35em"
            }}>{opt.emoji}</span> {opt.label}
          </GlowingChipButton>
        ))}
      </div>
      {/* Step Indicator */}
      <div style={{
        marginTop: "1.5em",
        textAlign: "center",
        color: "#b794f6",
        opacity: 0.81,
        letterSpacing: "0.06em",
        fontFamily: "'Poppins', cursive",
        fontSize: "0.97em"
      }}>
        Step {stepIdx + 1} <span style={{opacity:0.4}}>of</span> {totalSteps}
      </div>
      <style>
        {`
        @keyframes dreamyQuizFadeIn {
          from { opacity: 0; transform: translateY(33px) scale(.95);}
          to { opacity: 1; transform: translateY(0) scale(1);}
        }
        `}
      </style>
    </div>
  );
}

// ---- Dreamy Floating Animated Intro Card ----
function MusicBarIntro({ onStart }) {
  return (
    <div className="dreamy-intro-card dreamy-musicbar"
      style={{
        position: "relative",
        margin: "0 auto",
        marginTop: "clamp(2.1rem, 7vw, 3.4rem)",
        marginBottom: "2.3em",
        maxWidth: "420px",
        minWidth: "240px",
        minHeight: "88px",
        padding: "2.3rem 2.5rem 2.0rem 2.2rem",
        borderRadius: 38,
        boxShadow: "0 9px 36px #b794f62e, 0 2px 13px #ffd1dc2a",
        background: "transparent",
        zIndex: 9,
        overflow: "visible",
        filter: "drop-shadow(0 4px 30px #ffd1dc23)",
        animation: "dreamyFloatMusicIntro 1.2s cubic-bezier(.71,1.3,.59,0.98)"
      }}
    >
      {/* Pastel blurred floating bg */}
      <div className="intro-bg-blur" style={{
        position:'absolute',inset: '-17px -15px -17px -15px',borderRadius:56,
        background: 'linear-gradient(120deg, #ffd1dc66 79%, #c2e9fb88 140%, #b794f655 211%)',
        filter: "blur(18.5px) saturate(1.21)",
        opacity: 0.91,
        zIndex: 0,
        animation: "dreamyBlurFloat 3.1s infinite alternate"
      }} />
      {/* Floating emoji sparkles */}
      <FloatingSparkles count={18} fadeIn={true} />
      {/* Soft animated music note bar */}
      <div style={{
        position: "absolute",
        left: 28, top: 12,
        fontSize: "2.1em",
        filter: "drop-shadow(0 2px 8px #ffd1dc6c) blur(0.12px)",
        userSelect: "none",
        zIndex: 5
      }}>🎵</div>
      {/* Whimsical intro message */}
      <div className="intro-message" style={{
        position: "relative", zIndex: 4, marginTop: "0.92em", marginBottom: "0.6em",
        background: "#fff9fbcc", boxShadow: "0 1px 10px #ffd1dc18",
        borderRadius: "2.0em", fontSize:"1.06em"
      }}>
        <span className="handwritten">What does your soul sound like today? <span role="img" aria-label="sparkle">✨</span></span>
      </div>
      <div className="centered" style={{zIndex:9, marginTop:".3em"}}>
        <button
          className="pastel-btn"
          onClick={onStart}
          style={{
            fontSize: "1.14em",
            borderRadius: 38,
            marginTop: "0.44em",
            padding: "0.9em 3.1em",
            fontWeight: 700,
            color: "#fff",
            background: "linear-gradient(95deg, #b794f6 100%, #ffd1dc 60%)",
            boxShadow: "0 6px 24px #b794f633"
          }}
        >
          Take Mood Music Quiz
        </button>
      </div>
      <style>
        {`
        @keyframes dreamyFloatMusicIntro {
          from {opacity:0; transform:translateY(45px) scale(.95);}
          to   {opacity:1; transform:translateY(0) scale(1);}
        }
        `}
      </style>
    </div>
  );
}

// ---- Result Card (dreamy, shows recommended tracks) ----
function QuizResults({ selections, onRetake }) {
  // In real implementation, would fetch Spotify tracks matching traits
  // Here, filter mock data for mood and shuffle in random order for demo
  let filtered = dreamySpotifyResults;
  if (selections?.mood) {
    filtered = dreamySpotifyResults.filter(x=>x.mood === selections.mood) || dreamySpotifyResults;
  }
  // Shuffle some for visual interest
  filtered = [...filtered].sort(()=>Math.random()-0.5);
  // Dreamy result transition (fade in, pastel float)
  return (
    <div className="quiz-results-card dreamy-quiz-results"
      style={{
        background: `linear-gradient(121deg, #ffd1dc 70%, #b794f6 140%, #c2e9fb 190%)`,
        borderRadius: 39,
        boxShadow: "0 10px 40px #b794f625, 0 3px 18px #b794f61b",
        maxWidth: 420,
        minHeight: 135,
        margin: "2.7em auto 2.2em auto",
        padding: "2.4em 1.6em 2em 1.6em",
        position: "relative",
        zIndex: 7,
        filter: "drop-shadow(0 3px 41px #ffd1dc47)",
        animation: "dreamyResultFade 1.21s"
      }}
    >
      {/* Magic sparkles float */}
      <FloatingSparkles count={19} fadeIn={true} />
      {/* Dreamy results header */}
      <div style={{
        textAlign: "center",
        fontFamily: "'Poppins', cursive",
        fontWeight: 700,
        color: "#b794f6",
        fontSize: "1.26em",
        marginBottom: "1.1em",
        letterSpacing: "0.02em",
        textShadow: "0 1px 10px #ffd1dc38"
      }}>
        Dreamy Tracks for Your Mood
        <span style={{marginLeft:6}} role="img" aria-label="sparkle">✨</span>
      </div>
      {/* Results list */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "2.5em", marginTop: "0.6em"
      }}>
        {filtered.slice(0, 3).map((track, idx) => (
          <div key={track.spotify}
            style={{
              borderRadius: 27,
              boxShadow: "0 3px 29px #ffd1dc2A, 0 1px 9px #b794f63a",
              background: "linear-gradient(103deg,#fff8fc 80%,#f9f7ff 130%)",
              marginBottom: "0.8em",
              width: "100%",
              maxWidth: 350,
              padding: "1.1em 0.45em 1.2em 0.45em",
              position: "relative",
              opacity: 0.95,
              filter: "blur(0px) drop-shadow(0 0px 8px #b794f630)",
              animation: "resultCardFloatIn .9s cubic-bezier(.75,1.1,.49,1.13)",
              animationDelay: `${0.2*idx+0.19}s`
            }}
          >
            {/* Emoji album / mood */}
            <div style={{
              fontSize: "1.8em", marginBottom: 3, textAlign: "center",
              filter:"drop-shadow(0 2px 9px #b794f652)"
            }}>{SPARKLE_EMOJIS[idx%SPARKLE_EMOJIS.length]}</div>
            <div style={{
              color: "#b794f6", fontWeight: 700, fontSize: "1.09em", textAlign:"center",
              fontFamily: "'Poppins', cursive"
            }}>{track.name}</div>
            <div style={{
              color: "#8a7fae", fontWeight: 500, fontSize: "0.97em", marginBottom:8
            }}>{track.artist}</div>
            <iframe
              src={track.spotify}
              width="100%"
              height="80"
              style={{
                borderRadius: 19,
                border: "none",
                filter: "saturate(1.06) drop-shadow(0 0px 16px #c2e9fb28)",
                background: "#fff",
                marginTop: 7
              }}
              title={`spotify-${idx}`}
              allow="encrypted-media"
              loading="lazy"
            ></iframe>
          </div>
        ))}
      </div>
      {/* Retake btn */}
      <div style={{
        marginTop: "2em", display: "flex", justifyContent: "center"
      }}>
        <button
          type="button"
          className="pastel-btn"
          onClick={onRetake}
          style={{
            fontSize: "1.11em", fontWeight: 700, borderRadius: 33,
            background: "linear-gradient(99deg,#c2e9fb,#b794f6 130%)",
            color: "#fff", boxShadow: "0 0 15px #ffd1dc42"
          }}>
          Retake Quiz
        </button>
      </div>
      <style>
        {`
          @keyframes dreamyResultFade {
            from {opacity: 0; transform: translateY(45px) scale(.95);}
            to   {opacity: 1; transform: translateY(0) scale(1);}
          }
          @keyframes resultCardFloatIn {
            from { opacity:0; transform:translateY(26px) scale(.93);}
            to   { opacity:0.99; transform:translateY(0) scale(1);}
          }
        `}
      </style>
    </div>
  );
}

// ---- Main Music Quiz Container ----
function MusicScreen() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [selections, setSelections] = useState({});
  const [showResult, setShowResult] = useState(false);

  function handleSelect(val) {
    // Save selection and advance
    const curKey = QUIZ_STEPS[stepIdx].key;
    const nextSelections = { ...selections, [curKey]: val };
    setSelections(nextSelections);
    if (stepIdx === QUIZ_STEPS.length - 1) {
      setTimeout(() => {
        setShowResult(true);
      }, 550); // dreamy fade transition
    } else {
      setTimeout(() => setStepIdx(stepIdx + 1), 425);
    }
  }

  function startQuiz() {
    setQuizStarted(true);
    setShowResult(false);
    setSelections({});
    setStepIdx(0);
  }

  function retakeQuiz() {
    setQuizStarted(false);
    setShowResult(false);
    setSelections({});
    setStepIdx(0);
  }

  return (
    <main
      className="main-music-dreamy"
      style={{
        background: "linear-gradient(117deg, #ffd1dc23 75%, #c2e9fb1f 120%, #b794f622 160%)",
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0",
        overflow: "visible"
      }}
    >
      <FloatingSparkles count={23} fadeIn={true} />
      {/* Dreamy Intro Bar */}
      {!quizStarted && !showResult && (
        <MusicBarIntro onStart={startQuiz} />
      )}

      {/* Quiz Steps */}
      {quizStarted && !showResult && (
        <MusicMoodQuizCard
          step={QUIZ_STEPS[stepIdx]}
          value={selections[QUIZ_STEPS[stepIdx].key] || ""}
          onSelect={handleSelect}
          stepIdx={stepIdx}
          totalSteps={QUIZ_STEPS.length}
          sparkle={QUIZ_STEPS[stepIdx].sparkle}
        />
      )}

      {/* Results */}
      {showResult && (
        <QuizResults selections={selections} onRetake={retakeQuiz} />
      )}

      <style>
        {`
        .dreamy-chip-btn:focus, .dreamy-chip-btn:hover {
          background: linear-gradient(111deg, #ffd1dc, #b794f6 140%);
          color: #fff;
          border: 2.4px solid #ffd1dc;
          box-shadow: 0 3px 22px #ffd1dc6e;
          transform: scale(1.05);
          outline: none;
        }
        `}
      </style>
    </main>
  );
}

export default MusicScreen;

