import React, { useEffect, useRef, useState } from "react";
import { theme } from "../theme";
import "./../ui/GlobalStyle.css";
import "./HomeScreen.css";

// Dreamy poetic welcome/about lines or daily whisper (rotates by day)
const INTRO_WHISPERS = [
  "No matter what the world brings, this is your gentle sky — you are safe & seen here.✨",
  "Welcome home. In this soft space, even your smallest dreams are starlight.",
  "Every heart-pulse and pastel cloud is made to comfort you. Let yourself be.",
  "Breathe slow, feel the sparkle — you’re cherished in every way that matters.",
  "This is your gentle sanctuary: hush, glow, journal, and let kindness float.",
  "Your feelings decorate this space — nothing too small, too big, or too much.",
  "Softness isn’t weakness but magic; let it fill these dreamy, friendly rooms.",
  "Let your mind unfurl; here, every gentle wish is a distant, twinkling star."
];

// Helper to pick the "daily" whisper (rotates each day, fallback to random)
function getDailyWhisper() {
  const day = new Date().getDate();
  return INTRO_WHISPERS[day % INTRO_WHISPERS.length];
}

const MOODS = [
  {
    key: "rainy",
    name: "Rainy",
    bg: "linear-gradient(120deg, #c2e9fb 65%, #b794f6 100%)",
    glow: "#c2e9fb55",
    sound: "rain.mp3",
    particles: "rain"
  },
  {
    key: "sunset",
    name: "Sunset",
    bg: "linear-gradient(120deg, #ffd1dc 68%, #ffcae8 100%)",
    glow: "#ffd1dc99",
    sound: "sunset.mp3",
    particles: "hearts"
  },
  {
    key: "nightsky",
    name: "Night Sky",
    bg: "linear-gradient(120deg, #bfe6f9 70%, #b794f6 100%)",
    glow: "#b794f655",
    sound: "night.mp3",
    particles: "stars"
  },
  {
    key: "strawberryfog",
    name: "Strawberry Fog",
    bg: "linear-gradient(120deg, #ffd1dc 50%, #f4d0e1 100%)",
    glow: "#ffd1dc44",
    sound: "fog.mp3",
    particles: "sparkles"
  },
  {
    key: "sakura",
    name: "Sakura Bloom",
    bg: "linear-gradient(120deg, #fad0e8 40%, #c2e9fb 120%)",
    glow: "#ffcde655",
    sound: "sakura.mp3",
    particles: "petals"
  }
];

const DECOR_CATALOG = [
  {
    type: "bed",
    label: "Bed",
    emoji: "🛏️",
    default: { x: 70, y: 145, rotate: 0 }
  },
  {
    type: "lights",
    label: "Fairy Lights",
    emoji: "✨",
    default: { x: 195, y: 60, rotate: 0 }
  },
  {
    type: "wallart",
    label: "Wall Art",
    emoji: "🖼️",
    default: { x: 250, y: 96, rotate: 2 }
  },
  {
    type: "plant",
    label: "Plant",
    emoji: "🪴",
    default: { x: 290, y: 180, rotate: 0 }
  },
  {
    type: "extra",
    label: "Extras",
    emoji: "🧸",
    default: { x: 160, y: 210, rotate: 0 }
  }
];

const AVATAR_POSES = [
  {
    pose: "sit",
    label: "Sitting",
    emoji: "🧘‍♀️"
  },
  {
    pose: "stand",
    label: "Standing",
    emoji: "🧍"
  },
  {
    pose: "hug",
    label: "Hug",
    emoji: "🤗"
  },
  {
    pose: "cuddle",
    label: "Cuddle",
    emoji: "🐻"
  },
  {
    pose: "tea",
    label: "With Tea",
    emoji: "🍵"
  },
  {
    pose: "journal",
    label: "Journaling",
    emoji: "✍️"
  }
];

const AFFIRMATIONS = [
  "You are enough just as you are. 💖",
  "Let yourself breathe and glow softly.",
  "May your dreams be as cozy as your heart.",
  "You’re a gentle light in someone’s sky.",
  "Rest here; it’s safe to be you.",
  "Warm tea, kind hugs, soft hearts with you.",
  "Every feeling is welcome here.",
  "You belong – in this space, always."
];

function getAffirmation() {
  return AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
}

// --- Individual Section Components ---

// Section Bubble Wrapper
function SectionBubble({ bg, border, style, className = "", children }) {
  return (
    <section
      className={`home-section-bubble ${className}`}
      style={{
        background: bg || "linear-gradient(116deg, #fff8fd 87%, #ffd1dc14 130%)",
        borderBottom: border ? `2.3px solid ${border}` : "2.3px solid #eee9f6",
        borderRadius: 37,
        boxShadow: "0 3px 18px #ffd1dc17, 0 1.2px 7px #b794f611",
        margin: "0.8em 0",
        padding: "2.3em 1.8em 1.5em 2.1em",
        width: "100%",
        maxWidth: 1080,
        ...style
      }}
    >
      {children}
    </section>
  );
}

// Dreamy intro section (was card)
function HomeIntroSection() {
  const [pulse, setPulse] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setPulse(v => !v), 2100);
    return () => clearInterval(interval);
  }, []);
  // Sparkle/floating anims
  const sparkleCount = 11;
  const sparkles = Array.from({ length: sparkleCount }).map((_, i) => ({
    left: 8 + Math.random() * 82 + "%",
    top: 15 + Math.random() * 38 + "%",
    size: Math.random() * 15 + 18,
    delay: i * 0.17 + Math.random(),
    key: `sparkle-${i}`,
    rotate: Math.random() * 35 - 13
  }));
  return (
    <SectionBubble
      bg="linear-gradient(125deg, #ffd1dc33 88%, #c2e9fb55 124%, #b794f614 190%)"
      border="#b794f6"
      style={{
        marginTop: "clamp(2.1rem, 8vw, 3.7rem)",
        marginBottom: ".5em",
        padding: "2.8em 1.3em 1.95em 2.7em",
        zIndex: 4,
        overflow: "visible",
        position: "relative"
      }}
      className="intro-bubble"
    >
      <div style={{ position: "relative", minHeight: 66 }}>
        {/* Floating heart */}
        <span
          className={`intro-heart${pulse ? " pulse" : ""}`}
          style={{
            left: "7px",
            top: "7px",
            fontSize: "1.55em"
          }}
          aria-label="love"
          role="img"
        >💖</span>
        {/* Sparkles */}
        {sparkles.map(s => (
          <span
            key={s.key}
            className="intro-sparkle"
            style={{
              left: s.left,
              top: s.top,
              fontSize: s.size + "px",
              animationDelay: `${s.delay}s`,
              transform: `rotate(${s.rotate}deg)`
            }}
            aria-hidden="true"
          >✨</span>
        ))}
        <div className="intro-message" style={{
          background: "#fff6fbcc",
          color: "#b794f6",
          letterSpacing: "0.07em",
          margin: "0 auto",
          borderRadius: "1.7em",
          maxWidth: 900
        }}>
          <span className="handwritten">{getDailyWhisper()}</span>
        </div>
      </div>
    </SectionBubble>
  );
}

// MOOD section: room mood actions
function MoodSection({ curMood, onChangeMood, showMood, setShowMood, moodBtnRef }) {
  const moodCfg = MOODS.find((m) => m.key === curMood) || MOODS[0];
  return (
    <SectionBubble
      bg="linear-gradient(125deg, #c2e9fb44 84%, #ffd1dc1f 123%)"
      border="#c2e9fb"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: "1.1em"
      }}
    >
      <span style={{
        fontFamily: "'Poppins', cursive",
        color: "#b794f6",
        fontWeight: 700,
        fontSize: "1.13em",
        marginRight: "0.9em"
      }}>
        Current Mood: <span style={{ color: "#8a7fae", fontWeight: 600 }}>{moodCfg.name}</span>&nbsp;
        <span aria-label="mood">
          {{
            rainy: "🌧️", sunset: "🌅", nightsky: "🌠", strawberryfog: "🍓", sakura: "🌸"
          }[curMood] || "✨"}
        </span>
      </span>
      <button
        ref={moodBtnRef}
        className="pastel-btn"
        style={{
          fontSize: "1.01em",
          border: "2px solid #b794f633",
          boxShadow: "0 3px 12px #ffd1dc22",
          borderRadius: 19,
          margin: 0
        }}
        onClick={() => setShowMood(v => !v)}
      >Change Room Mood</button>
      {showMood && (
        <MoodMenu
          moods={MOODS}
          selectedMood={curMood}
          onSelect={onChangeMood}
          onClose={() => setShowMood(false)}
          anchorRef={moodBtnRef}
        />
      )}
    </SectionBubble>
  );
}

// Room Decor section, open row
function RoomDecorSection({
  decors, draggingType, addDecor, updateDecor, dropDecor, deleteDecor
}) {
  return (
    <SectionBubble
      bg="linear-gradient(125deg, #fff9fa 81%, #c2e9fb23 121%)"
      border="#ffd1dc"
      style={{
        position: "relative",
        minHeight: 260,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "visible"
      }}
      className="decor-bubble"
    >
      <div style={{
        position: "relative",
        width: "100%",
        minWidth: 350,
        maxWidth: 440,
        minHeight: 235,
        height: 255,
        margin: "0 auto"
      }}>
        {/* Soft wallpaper overlay */}
        <div style={{
          position: "absolute",
          left: 0, top: 0, width: "100%", height: "100%",
          borderRadius: 36,
          background: "linear-gradient(132deg, #bfe6f9 49%, #ffd1dc2e 100%)",
          opacity: 0.14, zIndex: 1
        }} />
        {/* FloatingToolbar for decor */}
        <FloatingToolbar onAdd={addDecor} dragAddType={draggingType} />
        {/* Decors (layered) */}
        {decors.map(item => (
          <DecorItem
            key={item.type}
            item={item}
            isActive={draggingType === item.type}
            onStartDrag={() => {}}
            onDrop={dropDecor}
            onDelete={deleteDecor}
            onUpdate={updateDecor}
            dragging={draggingType === item.type}
          />
        ))}
        {/* Info hint */}
        {decors.length === 0 && (
          <div style={{
            position: "absolute", left: "50%", top: "54%",
            transform: "translate(-50%,-50%)",
            color: "#8a7fae", fontFamily: "'Poppins', cursive",
            opacity: .8, fontSize: "1.03em"
          }}>
            Add decor and drag into your magical room!
          </div>
        )}
      </div>
    </SectionBubble>
  );
}

// Avatar & Actions section
function AvatarAreaSection({
  pose, onPose, curMood, onAffirm, affirmText, onInteract, animAffirm
}) {
  return (
    <SectionBubble
      bg="linear-gradient(123deg, #ffd1dc44 69%, #c2e9fb55 142%, #fffefa 200%)"
      border="#ffd1dc"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.3em",
      }}
    >
      <AvatarSection
        pose={pose}
        mood={curMood}
        onAffirm={onAffirm}
        onInteract={onInteract}
        onPose={onPose}
        affirmText={affirmText}
        animAffirm={animAffirm}
      />
    </SectionBubble>
  );
}

// Affirmations section
function AffirmationSection({ affirm }) {
  return (
    <SectionBubble
      bg="linear-gradient(122deg, #fffdfa 75%, #c2e9fb38 110%)"
      border="#b794f6"
      style={{
        textAlign: "center",
        fontSize: "1.12em",
        fontFamily: "'Poppins', cursive",
        fontWeight: 700,
        color: "#b794f6",
        paddingTop: ".82em"
      }}
    >
      {affirm}
    </SectionBubble>
  );
}

// Particles ambient
function AmbientParticles({ count = 18 }) {
  return (
    <div className="main-global-sparkles" aria-hidden="true">
      {[...Array(count)].map((_, i) => (
        <span
          key={`magicsparkle${i}`}
          className="ambient-magic-sparkle"
          style={{
            left: `${10 + Math.random() * 75}%`,
            top: `${18 + Math.random() * 77}%`,
            fontSize: `${17 + Math.random() * 17}px`,
            opacity: `${0.52 + Math.random() * 0.42}`,
            animationDelay: `${Math.random() * 3.5}s`,
            filter: "blur(0.3px)"
          }}
        >✨</span>
      ))}
    </div>
  );
}

// --- Components from prior layout (retain, style open) ---

function DecorItem({ item, isActive, onStartDrag, onDrop, onDelete, onUpdate, dragging }) {
  const itemRef = useRef();
  useEffect(() => {
    function onPointerDown(e) {
      e.preventDefault();
      const orig = itemRef.current.getBoundingClientRect();
      const startX = (e.touches ? e.touches[0].clientX : e.clientX);
      const startY = (e.touches ? e.touches[0].clientY : e.clientY);
      let lastX = item.x, lastY = item.y, lastR = item.rotate, scale = item.scale || 1;
      let moved = false;
      let pinching = false;
      let startD = 0, startAngle = 0;
      function onPointerMove(ev) {
        moved = true;
        if (ev.touches && ev.touches.length === 2) {
          pinching = true;
          const dx = ev.touches[1].clientX - ev.touches[0].clientX;
          const dy = ev.touches[1].clientY - ev.touches[0].clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;
          if (!startD) {
            startD = dist;
            startAngle = angle;
          }
          const newScale = Math.min(Math.max((dist / startD) * (item.scale || 1), 0.75), 1.3);
          const newRotate = lastR + (angle - startAngle);
          onUpdate({ ...item, scale: newScale, rotate: newRotate });
        } else {
          const curX = (ev.touches ? ev.touches[0].clientX : ev.clientX);
          const curY = (ev.touches ? ev.touches[0].clientY : ev.clientY);
          const dx = curX - startX, dy = curY - startY;
          onUpdate({ ...item, x: Math.max(10, Math.min(lastX + dx, 320)), y: Math.max(30, Math.min(lastY + dy, 220)), dragging: true });
        }
      }
      function onPointerUp(ev) {
        window.removeEventListener("mousemove", onPointerMove);
        window.removeEventListener("touchmove", onPointerMove);
        window.removeEventListener("mouseup", onPointerUp);
        window.removeEventListener("touchend", onPointerUp);
        if (moved) {
          onDrop(item);
        } else if (!pinching) {
          if (typeof onStartDrag === 'function') onStartDrag(item.type);
        }
      }
      window.addEventListener("mousemove", onPointerMove);
      window.addEventListener("touchmove", onPointerMove, { passive: false });
      window.addEventListener("mouseup", onPointerUp);
      window.addEventListener("touchend", onPointerUp);
    }
    const node = itemRef.current;
    node.addEventListener("mousedown", onPointerDown);
    node.addEventListener("touchstart", onPointerDown, { passive: false });
    return () => {
      if (node) {
        node.removeEventListener("mousedown", onPointerDown);
        node.removeEventListener("touchstart", onPointerDown);
      }
    };
  }, [item]);
  return (
    <div
      ref={itemRef}
      className="decor-item"
      style={{
        position: "absolute",
        left: item.x,
        top: item.y,
        zIndex: isActive ? 4 : 2,
        transform: `translate(-50%,-50%) scale(${item.scale || 1}) rotate(${item.rotate || 0}deg)`,
        transition: item.dragging ? "none" : "box-shadow 0.16s, transform 0.18s",
        boxShadow: isActive ? "0 8px 32px #b794f633,0 2px 12px #ffd1dc68" : "0 1px 6px #b794f610",
        border: isActive ? "2.2px solid #b794f6" : "none",
        borderRadius: 38,
        background: isActive ? "#fff9fc" : "transparent",
        fontSize: "2.3em",
        filter: isActive ? "drop-shadow(0 2px 8px #ffd1dc68)" : ""
      }}
      tabIndex={0}
      aria-label={item.label}
    >
      {item.emoji}
      <span className="decor-delete"
        style={{
          display: isActive ? "block" : "none",
          position: "absolute",
          top: -11, right: -11,
          background: "#ffd1dc",
          borderRadius: 12,
          width: 25,
          height: 25,
          fontSize: "1.1em",
          color: "#b794f6",
          boxShadow: "0 2px 8px #c2e9fb32",
          cursor: "pointer",
        }}
        role="button"
        title="Remove"
        tabIndex={0}
        onClick={() => onDelete(item.type)}
      >×</span>
    </div>
  );
}

function AvatarSection({ pose, mood, onPose, onAffirm, onInteract, affirmText, animAffirm }) {
  const poseObj = AVATAR_POSES.find((p) => p.pose === pose) || AVATAR_POSES[0];
  return (
    <div className="avatar-area" style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "0.6em",
      userSelect: "none"
    }}>
      <div style={{
        width: 96, height: 96, borderRadius: 48, background: "linear-gradient(132deg, #c2e9fb 60%, #ffd1dc 130%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 24px #b794f64c, 0 1px 8px #ffd1dc19",
        position: "relative",
        marginBottom: "0.7em",
        transition: "box-shadow 0.22s"
      }}>
        <span
          style={{
            fontSize: "3.1em",
            filter: "drop-shadow(0 1px 6px #b794f6b6)"
          }}
        >
          {poseObj.emoji}
        </span>
        {animAffirm && <ParticlesAnim type="hearts" />}
      </div>
      <div
        style={{
          fontFamily: "'Poppins', cursive",
          color: "#b794f6",
          background: "#fff6faee",
          padding: "0.65em 1.4em",
          marginBottom: "0.36em",
          borderRadius: 19,
          fontWeight: 500,
          fontSize: "1.07em",
          minHeight: "1.8em",
          boxShadow: "0 1px 7px #b794f614"
        }}
      >
        {affirmText}
      </div>
      <div style={{ display: "flex", gap: "0.5em", justifyContent: "center" }}>
        <button className="pastel-btn" style={{ padding: "4px 17px", fontSize: "1.1em" }} onClick={onAffirm}>Sit With Me</button>
        <button className="pastel-btn" style={{ padding: "4px 17px", fontSize: "1.1em" }} onClick={() => onInteract("hug")}>🤗 Hug</button>
        <button className="pastel-btn" style={{ padding: "4px 17px", fontSize: "1.1em" }} onClick={() => onInteract("tea")}>🍵 Tea</button>
        <button className="pastel-btn" style={{ padding: "4px 17px", fontSize: "1.1em" }} onClick={() => onInteract("cuddle")}>🐻 Cuddle</button>
      </div>
      <div style={{ marginTop: "0.37em", display: "flex", justifyContent: "center", gap: "0.44em" }}>
        {AVATAR_POSES.map((p) => (
          <button
            key={p.pose}
            style={{
              border: "none",
              borderRadius: 20,
              background: pose === p.pose ? "#ffd1dc77" : "#c2e9fb22",
              color: "#b794f6",
              padding: "2px 9px",
              fontSize: "1.18em",
              margin: "0 1.5px",
              transition: "background 0.18s"
            }}
            aria-label={`Pose: ${p.label}`}
            onClick={() => onPose(p.pose)}
          >
            {p.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

function FloatingToolbar({ onAdd, dragAddType }) {
  return (
    <div
      className="floating-toolbar"
      style={{
        display: "flex",
        background: "linear-gradient(120deg, #ffd1dc 60%, #c2e9fb 120%)",
        borderRadius: 32,
        boxShadow: "0 4px 24px #b794f626",
        padding: "0.26em 0.33em",
        position: "absolute",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
        gap: "0.5em",
        zIndex: 44,
        alignItems: "center"
      }}
    >
      {DECOR_CATALOG.map((item) => (
        <div
          role="button"
          key={item.type}
          tabIndex={0}
          title={`Add ${item.label}`}
          className={`toolbar-btn${dragAddType === item.type ? " active" : ""}`}
          onClick={() => onAdd(item.type)}
          style={{
            background: dragAddType === item.type ? "#b794f633" : "#fff6fa",
            border: dragAddType === item.type ? "2.2px solid #b794f6" : "none",
            borderRadius: 12,
            boxShadow: "0 1px 8px #c2e9fb18",
            fontSize: "1.9em",
            padding: "8px 14px",
            cursor: "grab",
            userSelect: "none",
            filter: dragAddType === item.type ? "drop-shadow(0 3px 6px #ffd1dc85)" : ""
          }}
        >
          <span>{item.emoji}</span>
        </div>
      ))}
    </div>
  );
}

function MoodMenu({ moods, selectedMood, onSelect, onClose, anchorRef }) {
  return (
    <div
      style={{
        position: "absolute",
        top: anchorRef && anchorRef.current ? anchorRef.current.offsetTop + 48 : 66,
        right: 16,
        background: "linear-gradient(132deg, #ffd1dc 60%, #c2e9fb 150%)",
        borderRadius: 26,
        boxShadow: "0 3px 24px #b794f622",
        zIndex: 55,
        padding: "1.2em 1.1em 0.85em 1.1em",
        minWidth: 152,
        animation: "floatCardIn 0.29s",
      }}
    >
      <div style={{ fontFamily: "'Poppins', cursive", color: "#b794f6", marginBottom: "0.7em", fontWeight: 600 }}>
        Room Mood
      </div>
      {moods.map((mood) => (
        <div
          key={mood.key}
          style={{
            display: "flex",
            alignItems: "center",
            background: selectedMood === mood.key ? "#b794f633" : "transparent",
            borderRadius: 18,
            marginBottom: 7,
            cursor: "pointer",
            padding: "0.5em 1em",
            fontWeight: selectedMood === mood.key ? 700 : 500,
            color: "#8a7fae",
            fontSize: "1.07em",
            transition: "background 0.16s"
          }}
          onClick={() => {
            onSelect(mood.key);
            onClose();
          }}
        >
          <span style={{ fontSize: "1.39em", marginRight: 14 }} role="img" aria-label={mood.name}>
            {{
              rainy: "🌧️",
              sunset: "🌅",
              nightsky: "🌠",
              strawberryfog: "🍓",
              sakura: "🌸"
            }[mood.key] || "✨"}
          </span>
          {mood.name}
        </div>
      ))}
      <button className="pastel-btn" style={{ fontSize: "0.97em", marginTop: "0.8em", padding: "6px 8px" }} onClick={onClose}>Close</button>
    </div>
  );
}

function ParticlesAnim({ type, num = 18 }) {
  const shapes = {
    hearts: "💖",
    sparkles: "✨",
    petals: "🌸",
    stars: "⭐",
    rain: "❄️"
  };
  return (
    <div style={{
      pointerEvents: "none",
      position: "absolute",
      left: 0, top: 0, width: "100%", height: "100%", zIndex: 7,
      overflow: "hidden"
    }}>
      {[...Array(num)].map((_, i) => (
        <span key={i}
          style={{
            position: "absolute",
            left: `${Math.random() * 90 + 2}%`,
            top: type === "rain" ? `${-Math.random() * 24}%` : `${Math.random() * 70 + 2}%`,
            fontSize: type === "petals" ? `${Math.random() * 0.54 + 1.2}em` : "1.11em",
            opacity: Math.random() * 0.7 + 0.35,
            filter: `drop-shadow(0 2px 10px #fff6)`,
            animation: type === "rain"
              ? "rainfall 1.2s linear infinite"
              : "floatParticle 1.1s ease-in infinite",
            animationDelay: `${i * 0.13 + Math.random() * 0.7}s`,
            userSelect: "none"
          }}>
          {shapes[type] || "✨"}
        </span>
      ))}
      <style>
        {`
          @keyframes floatParticle {
            0% { transform: translateY(0) scale(0.85) rotate(-8deg); }
            50% { transform: translateY(-12px) scale(1.04) rotate(11deg); }
            100% { transform: translateY(12px) scale(1); }
          }
          @keyframes rainfall {
            0% { opacity: 0.7; transform: translateY(-20px);}
            100% { opacity: 0.33; transform: translateY(100vh);}
          }
        `}
      </style>
    </div>
  );
}

// Save/load persistent room/decors/mood/avatar state to localStorage
function saveRoomState(roomData) {
  try {
    localStorage.setItem("cozydreams-room", JSON.stringify(roomData));
  } catch (_) {}
}
function loadRoomState() {
  try {
    const raw = localStorage.getItem("cozydreams-room");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

/**
 * PUBLIC_INTERFACE
 * HomeScreen – New airy, open, wide-screen pastel-bubble sections for all areas; no central card.
 * Rows: gentle intro, mood/actions, avatar, decor, affirmation/notes. Fully responsive, floaty, and magical.
 */
function HomeScreen() {
  // Local state: decor, mood, avatar pose, affirmation
  const [decors, setDecors] = useState([]);
  const [draggingType, setDraggingType] = useState(null);
  const [curMood, setCurMood] = useState(MOODS[0].key);
  const [avatarPose, setAvatarPose] = useState("sit");
  const [affirm, setAffirm] = useState(getAffirmation());
  const [animAffirm, setAnimAffirm] = useState(false);
  const [showMood, setShowMood] = useState(false);
  const moodBtnRef = useRef();

  // Load room state on mount
  useEffect(() => {
    const state = loadRoomState();
    if (state) {
      setDecors(state.decors || []);
      setCurMood(state.mood || MOODS[0].key);
      setAvatarPose(state.avatarPose || "sit");
      setAffirm(state.affirm || getAffirmation());
    }
  }, []);
  // Save any state changes
  useEffect(() => {
    saveRoomState({
      decors,
      mood: curMood,
      avatarPose,
      affirm
    });
  }, [decors, curMood, avatarPose, affirm]);

  // Animating gentle affirmation bubble
  function gentleAffirm() {
    setAffirm(getAffirmation());
    setAnimAffirm(true);
    setTimeout(() => setAnimAffirm(false), 1800);
  }

  // Add new decor
  function addDecor(type) {
    if (decors.find((d) => d.type === type)) return setDraggingType(type);
    const cat = DECOR_CATALOG.find((c) => c.type === type);
    if (!cat) return;
    const added = { ...cat, x: cat.default.x, y: cat.default.y, rotate: 0, scale: 1 };
    setDecors([...decors, added]);
    setDraggingType(type);
  }
  // On decor drag
  function updateDecor(updated) {
    setDecors((prev) => prev.map((d) => (d.type === updated.type ? updated : d)));
    setDraggingType(updated.type);
  }
  // On decor drop
  function dropDecor(item) {
    setDraggingType(null);
    setTimeout(() => setDecors((prev) =>
      prev.map((d) =>
        d.type === item.type ? { ...d, dragging: false } : d
      )), 100);
  }
  // On decor delete
  function deleteDecor(type) {
    setDecors(decors.filter((d) => d.type !== type));
  }

  // Handle avatar pose & gentle interactions
  function handlePose(pose) {
    setAvatarPose(pose);
    gentleAffirm();
  }
  function handleInteraction(action) {
    handlePose(action);
    setAnimAffirm(true);
    setTimeout(() => setAnimAffirm(false), 1300);
  }

  // Change mood
  function handleMood(key) {
    setCurMood(key);
  }

  // Get mood config
  const moodCfg = MOODS.find((m) => m.key === curMood) || MOODS[0];

  // ---- OPEN PASTEL SECTION BUBBLES (wide, floaty) ----
  return (
    <main
      className="main-home-dreamy"
      style={{
        background: moodCfg.bg,
        minHeight: "calc(100vh - 0px)",
        width: "100%",
        maxWidth: "none",
        boxShadow: "none",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0", overflow: "visible"
      }}
    >
      {/* Ambient pastel particles */}
      <AmbientParticles />
      {/* 1: Intro/Whisper/Greeting */}
      <HomeIntroSection />
      {/* 2: Room mood section */}
      <MoodSection
        curMood={curMood}
        onChangeMood={handleMood}
        showMood={showMood}
        setShowMood={setShowMood}
        moodBtnRef={moodBtnRef}
      />
      {/* 3: Avatar & Actions */}
      <AvatarAreaSection
        pose={avatarPose}
        onPose={handlePose}
        curMood={curMood}
        onAffirm={gentleAffirm}
        affirmText={affirm}
        onInteract={handleInteraction}
        animAffirm={animAffirm}
      />
      {/* 4: Room Decor - open, wide */}
      <RoomDecorSection
        decors={decors}
        draggingType={draggingType}
        addDecor={addDecor}
        updateDecor={updateDecor}
        dropDecor={dropDecor}
        deleteDecor={deleteDecor}
      />
      {/* 5: Affirmation Section */}
      <AffirmationSection affirm={affirm} />

      <style>
        {`
        .home-section-bubble {
          box-sizing: border-box;
          margin-left: auto; margin-right: auto;
          transition: box-shadow .17s, background .17s, border-bottom .14s;
          animation: bubbleFloatIn 1.05s cubic-bezier(.63,1.13,.47,0.95);
          will-change: opacity, transform;
        }
        @keyframes bubbleFloatIn {
          from { opacity: 0; transform: translateY(31px) scale(0.97);}
          to   { opacity: 1; transform: translateY(0) scale(1);}
        }
        @media (max-width: 1040px) {
          .home-section-bubble { max-width: 99vw; }
        }
        @media (max-width: 700px) {
          .home-section-bubble { padding-left: 0.5em; padding-right: 0.5em;}
        }
        @media (max-width: 490px) {
          .home-section-bubble { padding: 1em 2vw 0.9em 2vw; }
        }
        `}
      </style>
    </main>
  );
}

export default HomeScreen;
