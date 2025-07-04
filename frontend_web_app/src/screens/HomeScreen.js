import React, { useEffect, useRef, useState } from "react";
import { theme } from "../theme";
import "./../ui/GlobalStyle.css";
import "./HomeScreen.css";

// Dreamy moods with corresponding gradients, sounds, and particles
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

// Gentle daily affirmations
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

// Helper: Random affirmation
function getAffirmation() {
  return AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
}

// ---- HomeScreen components (room, avatar, toolbar, moods, effects) ----

// Individual decor item, draggable, rotatable, scaleable
function DecorItem({ item, isActive, onStartDrag, onDrop, onDelete, onUpdate, dragging }) {
  const itemRef = useRef();
  // Drag/Touch logic for position, rotate, scale
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
          // Pinch/rotate
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
          // Drag
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
          onStartDrag(item.type);
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
        boxShadow: isActive ? "0 8px 32px #b794f633,0 2px 12px #ffd1dc22" : "0 1px 6px #b794f610",
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

// Avatar component
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
        {/* Affirmations particles */}
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
          fontSize: "1.05em",
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
              fontSize: "1.25em",
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

// Toolbar for adding decor items
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
        top: 8,
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

// Moods menu button & floating menu
function MoodMenu({ moods, selectedMood, onSelect, onClose, anchorRef }) {
  return (
    <div
      style={{
        position: "absolute",
        top: anchorRef && anchorRef.current ? anchorRef.current.offsetTop + 60 : 66,
        right: 26,
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
            fontSize: "1.05em",
            transition: "background 0.16s"
          }}
          onClick={() => {
            onSelect(mood.key);
            onClose();
          }}
        >
          <span style={{ fontSize: "1.3em", marginRight: 13 }} role="img" aria-label={mood.name}>
            {
              {
                rainy: "🌧️",
                sunset: "🌅",
                nightsky: "🌠",
                strawberryfog: "🍓",
                sakura: "🌸"
              }[mood.key] || "✨"
            }
          </span>
          {mood.name}
        </div>
      ))}
      <button className="pastel-btn" style={{ fontSize: "0.98em", marginTop: "0.8em", padding: "6px 8px" }} onClick={onClose}>Close</button>
    </div>
  );
}

// Soft magical particles (hearts, sparkles, petals, stars, rain overlay)
function ParticlesAnim({ type, num = 18 }) {
  // Only simple anim – not physics, for emotion
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
 * HomeScreen – Dreamy, whimsical personal room for CozyDreams, with pastel backgrounds, drag-and-drop decor,
 * mood selection, magical avatar/affirmation, persistent upgrades, and gentle, emotionally-charged effects.
 */
function HomeScreen() {
  // Local state: decor, mood, avatar pose, affirmation, show welcome
  const [decors, setDecors] = useState([]);
  const [draggingType, setDraggingType] = useState(null);
  const [curMood, setCurMood] = useState(MOODS[0].key);
  const [avatarPose, setAvatarPose] = useState("sit");
  const [affirm, setAffirm] = useState(getAffirmation());
  const [animAffirm, setAnimAffirm] = useState(false);
  const [showMood, setShowMood] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const moodBtnRef = useRef();

  // Load room state on mount
  useEffect(() => {
    const state = loadRoomState();
    if (state) {
      setDecors(state.decors || []);
      setCurMood(state.mood || MOODS[0].key);
      setAvatarPose(state.avatarPose || "sit");
      setAffirm(state.affirm || getAffirmation());
      setShowWelcome(true);
      setTimeout(() => setShowWelcome(false), 2600);
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
    // Soft extra effect for tea/cuddle/hug
    setAnimAffirm(true);
    setTimeout(() => setAnimAffirm(false), 1300);
  }

  // Change mood
  function handleMood(key) {
    setCurMood(key);
  }

  // Get mood config
  const moodCfg = MOODS.find((m) => m.key === curMood) || MOODS[0];

  // Ambient mood sound/effects could go here (not implemented: audio assets pending)
  // (Plays/changes soft music/ambience here.)

  return (
    <main
      className="floating-screen"
      style={{
        background: moodCfg.bg,
        minHeight: 470,
        maxWidth: 490,
        boxShadow: moodCfg.glow
          ? `0 12px 48px ${moodCfg.glow}, 0 4px 32px #b794f61c`
          : "var(--card-shadow)"
      }}
    >
      {/* Toolbar */}
      <FloatingToolbar onAdd={addDecor} dragAddType={draggingType} />
      {/* Welcome bubble on load */}
      {showWelcome && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 42,
            transform: "translateX(-50%)",
            background: "#fff6fab4",
            color: "#b794f6",
            borderRadius: 29,
            boxShadow: "0 2px 20px #ffd1dc33",
            fontSize: "1.13em",
            fontWeight: 600,
            fontFamily: "'Poppins', cursive",
            padding: "17px 35px",
            zIndex: 55,
            transition: "opacity 0.3s"
          }}
        >
          Welcome back to your dreamy sanctuary...
        </div>
      )}
      {/* Magical mood particles */}
      <ParticlesAnim type={moodCfg.particles} num={16} />
      {/* Mood-changing ambient breathing glow */}
      <div
        style={{
          position: "absolute",
          left: 0, top: 0, width: "100%", height: "100%",
          zIndex: 0, pointerEvents: "none",
          borderRadius: "calc(var(--border-radius) + 12px)",
          boxShadow: `0 0 70px 18px ${moodCfg.glow || "#ffd1dc55"}`,
          opacity: 0.42,
          animation: "breathGlow 3.8s ease-in-out infinite"
        }}
      />
      <style>
        {`@keyframes breathGlow {0%{opacity:0.22;} 55%{opacity:0.51;} 100%{opacity:0.22;}}`}
      </style>
      {/* Dreamy layered room */}
      <div
        style={{
          position: "relative",
          width: 355,
          height: 255,
          background:
            "linear-gradient(125deg, #fff8fd 70%, #f0e4f7 100%)",
          border: "2.8px solid #b794f6",
          borderRadius: 38,
          margin: "0 auto 2.15em auto",
          marginTop: 22,
          boxShadow: "0 10px 38px #b794f62c, 0 2px 19px #ffd1dc10",
          overflow: "visible"
        }}
      >
        {/* Soft wallpaper overlay */}
        <div
          style={{
            position: "absolute",
            left: 0, top: 0, width: "100%", height: "100%",
            borderRadius: 36,
            background: moodCfg.bg,
            opacity: 0.2,
            zIndex: 1
          }}
        />
        {/* Decors (layered) */}
        {decors.map((item) => (
          <DecorItem
            key={item.type}
            item={item}
            isActive={draggingType === item.type}
            onStartDrag={setDraggingType}
            onDrop={dropDecor}
            onDelete={deleteDecor}
            onUpdate={updateDecor}
            dragging={draggingType === item.type}
          />
        ))}
        {/* Floating magical avatar, centered */}
        <div
          style={{
            position: "absolute",
            left: "48%",
            top: avatarPose === "sit" ? 168 : avatarPose === "stand" ? 122 : 150,
            transform: "translate(-50%, -50%)",
            zIndex: 5
          }}
        >
          <span
            style={{
              fontSize: "2.7em",
              filter: "drop-shadow(0 2px 11px #ffd1dc72)"
            }}
            title="Avatar"
          >
            {AVATAR_POSES.find((p) => p.pose === avatarPose)?.emoji || "🧸"}
          </span>
        </div>
      </div>
      {/* Avatar + interaction area */}
      <AvatarSection
        pose={avatarPose}
        onPose={handlePose}
        mood={curMood}
        onAffirm={gentleAffirm}
        affirmText={affirm}
        onInteract={handleInteraction}
        animAffirm={animAffirm}
      />
      {/* Mood selector button */}
      <button
        ref={moodBtnRef}
        className="pastel-btn"
        style={{
          marginTop: "0.6em",
          marginBottom: "0.7em",
          fontSize: "1.04em",
          border: "2px solid #b794f633",
          boxShadow: "0 3px 12px #ffd1dc34",
          borderRadius: 19
        }}
        onClick={() => setShowMood((v) => !v)}
      >
        Change Room Mood&nbsp;
        <span aria-label="mood">
          {{
            rainy: "🌧️", sunset: "🌅", nightsky: "🌠", strawberryfog: "🍓", sakura: "🌸"
          }[curMood] || "✨"}
        </span>
      </button>
      {showMood && (
        <MoodMenu
          moods={MOODS}
          selectedMood={curMood}
          onSelect={handleMood}
          onClose={() => setShowMood(false)}
          anchorRef={moodBtnRef}
        />
      )}
      {/* Whisper bubble */}
      <div
        style={{
          background: "rgba(194,233,251,0.15)",
          borderRadius: 14,
          margin: "0 auto",
          padding: "0.7em 1.3em",
          color: "#b794f6",
          fontSize: "1.03em",
          maxWidth: 320,
          fontFamily: "'Poppins', cursive, sans-serif",
          marginTop: "1.19em",
          boxShadow: "0 2px 9px #b794f611"
        }}
      >
        <span role="img" aria-label="Whisper Bubble" style={{ fontSize: "1.21em" }}>💬</span>{" "}
        Whisper Bubble: {getAffirmation()}
      </div>
      {/* Magical floating sparkles UI */}
      <style>
        {`
          .decor-item:focus, .decor-item:hover {
            box-shadow: 0 14px 38px #ffd1dc58, 0 3px 13px #b794f640;
            outline: none;
          }
          .toolbar-btn.active, .toolbar-btn:hover {
            box-shadow: 0 3px 18px #b794f678;
            background: #ffd1dc55 !important;
            transform: scale(1.08);
          }
        `}
      </style>
    </main>
  );
}

export default HomeScreen;
