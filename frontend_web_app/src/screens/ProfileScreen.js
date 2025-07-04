import React, { useRef, useState, useEffect } from "react";
import "../ui/GlobalStyle.css";
import "./ProfileScreen.css";
import { theme } from "../theme";

// --- Constants for selectors and mock data ---
const MUSIC_OPTIONS = [
  { key: "lofi", name: "Lo-fi", audio: "lofi.mp3" },
  { key: "rain", name: "Rain", audio: "rain.mp3" },
  { key: "piano", name: "Piano", audio: "piano.mp3" },
  { key: "chillpop", name: "Chill Pop", audio: "chillpop.mp3" },
];
const SCENT_OPTIONS = [
  { key: "lavender", label: "Lavender" },
  { key: "vanilla", label: "Vanilla" },
  { key: "cotton", label: "Fresh Cotton" },
  { key: "spring", label: "Spring Bloom" },
];
const MOOD_AESTHETICS = [
  { key: "fairy", label: "Fairycore", color: "#eebfff" },
  { key: "pastel", label: "Pastel Dreamy", color: "#ffeafb" },
  { key: "loungewear", label: "Loungewear", color: "#d1f9e4" },
  { key: "cottage", label: "Cottage Cozy", color: "#c2e9fb" },
];
const PRONOUNS = [
  "she/her", "he/him", "they/them", "any"
];
const AVATAR_OPTIONS = [
  { key: "fairy", label: "Fairy", emoji: "🧚‍♀️", outfit: "Dream Loungewear" },
  { key: "casual", label: "Casual", emoji: "🧑‍🎤", outfit: "Soft Sweats" },
  { key: "bunny", label: "Bunny", emoji: "🐰", outfit: "Fluffy Hoodie" },
  { key: "pajamas", label: "Pajamas", emoji: "🛌", outfit: "Pastel Pajamas" }
];
const POSE_OPTIONS = [
  { key: "sit", label: "Sitting", emoji: "🪑" },
  { key: "stand", label: "Standing", emoji: "🧍" },
  { key: "hug", label: "Hugging", emoji: "🤗" },
  { key: "twirl", label: "Twirl", emoji: "🩰" }
];

// --- Helper: Floating Sparkle/Particle Animation ---
function CozyParticles({ count = 18 }) {
  // spawn floating, pastel sparkles as ambient bg
  return (
    <div style={{
      pointerEvents: "none",
      position: "fixed",
      zIndex: 0,
      left: 0, top: 0, width: "100vw", height: "100vh"
    }}>
      {[...Array(count)].map((_, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${7 + Math.random() * 87}%`,
            top: `${5 + Math.random() * 89}%`,
            fontSize: `${16 + Math.random() * 21}px`,
            opacity: `${0.44 + Math.random() * 0.44}`,
            color: ["#ffd1dc", "#c2e9fb", "#b794f6", "#fff5fa", "#e3f7fc"][i % 5],
            textShadow: "0 1.5px 8px #b794f62a, 0 2px 12px #ffd1dc33",
            animation: "floatProfileSpark 3.3s linear infinite",
            animationDelay: `${Math.random() * 3.2}s`,
            transition: "filter 0.18s"
          }}
        >{["✨", "🌸", "💖", "⭐", "🫧"][i % 5]}</span>
      ))}
      <style>
        {`
          @keyframes floatProfileSpark {
            0% { opacity: 0.2; transform: scale(1) translateY(0);}
            39% { opacity: 0.64;}
            69% { opacity: 1; transform: translateY(-19px);}
            100% { opacity: 0.18; transform: scale(1) translateY(11px);}
          }
        `}
      </style>
    </div>
  );
}

// --- Helper: Pastel Radio Button Chip ---
function PastelRadioChip({ active, value, onClick, color, children }) {
  return (
    <button
      className="pastel-chip"
      style={{
        background: active
          ? `linear-gradient(90deg, ${color || "#ffd1dc"}, #c2e9fb88)`
          : "#fff8fd",
        color: active ? "#b794f6" : "#8a7fae",
        border: active ? `2.3px solid #b794f6` : "2.2px solid #eee9f6",
        fontWeight: active ? 700 : 500,
        boxShadow: active
          ? "0 1.5px 9px #ffd1dc49"
          : "0 0.5px 5px #c2e9fb22",
        borderRadius: 21,
        transition: "all 0.17s",
        fontSize: "1.01em",
        fontFamily: "'Poppins', cursive",
        padding: "0.56em 1.6em",
        margin: "0.11em 0.33em"
      }}
      type="button"
      aria-pressed={active}
      tabIndex={0}
      onClick={() => onClick(value)}
    >
      {children}
    </button>
  );
}

// --- Helper: Gentle Toggle ---
function GentleToggle({ checked, onChange, label }) {
  return (
    <label style={{
      display: "flex", alignItems: "center", cursor: "pointer",
      gap: "0.73em", fontSize: "1em", fontFamily: "'Poppins',cursive"
    }}>
      <div
        style={{
          width: 46, height: 27, borderRadius: 19,
          background: checked
            ? "linear-gradient(90deg, #b794f6 68%, #ffd1dc 120%)"
            : "#eee9f6",
          boxShadow: checked
            ? "0 1.8px 13px #b794f63b"
            : "0 1px 6px #c2e9fb16",
          transition: "background .23s, box-shadow .21s", position: "relative",
        }}
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onClick={() => onChange(!checked)}
      >
        <div style={{
          width: 24, height: 24, borderRadius: 99,
          position: "absolute",
          top: "50%",
          left: checked ? 19 : 3,
          transform: "translateY(-50%)",
          background: "#fff",
          boxShadow: "0 1px 9px #ffd1dc22",
          border: checked ? "2.2px solid #b794f6" : "2px solid #eee9f6",
          transition: "left .22s, border .17s"
        }} />
      </div>
      <span style={{ color: "#8a7fae" }}>{label}</span>
    </label>
  );
}

// --- Helper: Animated Button ---
function SoftButton({ children, ...props }) {
  return (
    <button
      className="pastel-btn"
      style={{
        borderRadius: 33,
        fontWeight: 700,
        fontSize: "1.09em",
        margin: "0.6em 0.5em",
        boxShadow: "0 3px 15px #ffd1dc28",
        padding: "0.9em 2.3em",
        letterSpacing: "0.03em",
        fontFamily: "'Poppins', cursive"
      }}
      {...props}
    >{children}</button>
  );
}

// --- PUBLIC_INTERFACE
/**
 * PUBLIC_INTERFACE
 * ProfileScreen
 * Profile with dreamy UI, now using floaty left-aligned grid/sections and soft pastel "bubbles" for each input, wide and responsive.
 */
function ProfileScreen() {
  // Form and local state
  const [profilePic, setProfilePic] = useState(null);
  const [picUrl, setPicUrl] = useState("");
  const [music, setMusic] = useState("lofi");
  const [audio, setAudio] = useState(null);
  const [roomScent, setRoomScent] = useState(SCENT_OPTIONS[0].key);
  const [aesthetic, setAesthetic] = useState(MOOD_AESTHETICS[0].key);
  const [avatar, setAvatar] = useState(AVATAR_OPTIONS[0].key);
  const [pose, setPose] = useState(POSE_OPTIONS[0].key);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [pronouns, setPronouns] = useState(PRONOUNS[2]);
  const [bio, setBio] = useState("");
  const [miniMood, setMiniMood] = useState("");
  const [exploreVisible, setExploreVisible] = useState(true);
  const [acceptNotes, setAcceptNotes] = useState(true);

  // --- Music Player logic ---
  const playerRef = useRef();
  useEffect(() => {
    if (audio) {
      audio.pause();
      audio.remove();
    }
    setAudio(null);
    return () => {
      if (audio) audio.pause();
    };
    // eslint-disable-next-line
  }, [music]);

  // Handle image upload and preview
  function onPicChange(e) {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
      setPicUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  // Avatar/pose info
  const avatarObj = AVATAR_OPTIONS.find(x => x.key === avatar) || AVATAR_OPTIONS[0];
  const poseObj = POSE_OPTIONS.find(x => x.key === pose) || POSE_OPTIONS[0];
  const scentLabel = SCENT_OPTIONS.find(x => x.key === roomScent)?.label || "";
  const aestheticLabel = MOOD_AESTHETICS.find(x => x.key === aesthetic)?.label || "";

  // --- BUBBLE STYLES ---
  const pastelBubbles = [
    {
      key: "pic",
      style: {
        gridColumn: "span 2",
        background: "linear-gradient(115deg, #c2e9fbcc 80%, #ffd1dcbd 120%)",
        marginBottom: "2.2em"
      }
    },
    {
      key: "name-dob-row",
      style: {
        background: "linear-gradient(96deg, #fff6fa 80%, #b794f617 100%)",
        marginBottom: "0.6em",
        display: "flex",
        flexWrap: "wrap",
        gap: "2em"
      }
    },
    {
      key: "gender-row",
      style: {
        background: "linear-gradient(100deg, #ffeaf7 95%, #c2e9fb17 130%)",
        marginBottom: "0.6em",
        display: "flex",
        flexWrap: "wrap",
        gap: "1.7em"
      }
    },
    {
      key: "bio",
      style: {
        background: "linear-gradient(90deg, #fff8fd 85%, #ffd1dc18 120%)",
        marginBottom: "1.25em"
      }
    },
    {
      key: "music",
      style: {
        background: "linear-gradient(115deg, #c2e9fb38 60%, #b794f653 95%)",
        marginBottom: "1.16em"
      }
    },
    {
      key: "scent",
      style: {
        background: "linear-gradient(100deg, #ffd1dc55 90%, #c2e9fb33 120%)",
        marginBottom: "1.10em"
      }
    },
    {
      key: "aesthetic",
      style: {
        background: "linear-gradient(115deg, #b794f614 80%, #ffd1dc55 120%)",
        marginBottom: "1.07em"
      }
    },
    {
      key: "avatar-row",
      style: {
        background: "linear-gradient(108deg, #c2e9fb60 82%, #b794f622 124%)",
        marginBottom: "1.1em"
      }
    },
    {
      key: "miniMood",
      style: {
        background: "linear-gradient(92deg, #ffd1dc39 60%, #fffefa 100%)",
        marginBottom: "1.2em"
      }
    },
    {
      key: "toggles",
      style: {
        background: "linear-gradient(92deg, #b794f617 60%, #ffd1dc47 100%)",
        marginBottom: "1.5em"
      }
    }
  ];

  // --- Responsive layout styles ---------
  // We'll create a wrapper and use a CSS grid that's 1 column on mobile, 2-column on wide.
  // Section bubbles get gridColumn based on type and will float with margin

  return (
    <>
      <CozyParticles count={16} />
      <main
        className="main-profile-dream"
        style={{
          background: "linear-gradient(116deg, #ffd1dc22 75%, #c2e9fb19 120%, #fff6fa22 160%)",
          minHeight: "100vh",
          boxShadow: "none",
          position: "relative",
          zIndex: 3
        }}
      >
        <form
          className="profile-sections-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.2em 2.6em",
            maxWidth: 1040,
            padding: "clamp(1.2em,3vw,3.8em) clamp(0.4em,4vw,2.5em)",
            margin: "3.8rem auto 2.8rem auto",
            width: "100%",
          }}
        >
          {/* Header, float across full width */}
          <h1 className="whimsical" style={{
            gridColumn: "span 2",
            textAlign: "left",
            paddingLeft: "0.3em",
            marginBottom: "0.5em"
          }}>Profile</h1>

          {/* Profile pic (wide bubble) */}
          <section className="profile-bubble profile-pic-bubble"
            style={{
              ...pastelBubbles[0].style,
              borderRadius: 39,
              boxShadow: "0 5px 35px #b794f617, 0 4px 14px #ffd1dc19"
            }}
          >
            <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1.3em"
            }}>
              <div className="profile-img-preview"
                style={{
                  width: 94,
                  height: 94,
                  borderRadius: 48,
                  background: "linear-gradient(140deg, #c2e9fb 70%, #ffd1dc 130%)",
                  boxShadow: "0 1.6px 10px #ffd1dc33, 0 2.4px 25px #b794f660",
                  display: "flex",
                  alignItems: "center", justifyContent: "center",
                  border: "3.2px solid #fff8fd", overflow: "hidden",
                  marginRight: "1.2em", position: "relative"
                }}
              >
                {picUrl ? (
                  <img
                    src={picUrl}
                    alt="Profile preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 48, border: "0", filter: "brightness(1) drop-shadow(0 2px 9px #ffd1dc75)" }}
                    className="rounded-img"
                  />
                ) : (
                  <span style={{
                    fontSize: "2.5em",
                    filter: "drop-shadow(0 2px 13px #ffd1dc72)",
                    color: "#b794f6"
                  }}>{avatarObj.emoji}</span>
                )}
                {/* Upload Button */}
                <label
                  htmlFor="pic-upload"
                  className="pastel-btn"
                  style={{
                    cursor: "pointer",
                    fontSize: "1.01em",
                    borderRadius: 17,
                    padding: "0.18em 1.3em",
                    position: "absolute",
                    bottom: -28,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(120deg, #ffd1dc 81%, #c2e9fb76 150%)",
                    color: "#b794f6",
                    fontFamily: "'Poppins', cursive",
                    boxShadow: "0 2px 12px #b794f632"
                  }}>
                  {picUrl ? "Change Photo" : "Upload Photo"}
                  <input
                    id="pic-upload"
                    type="file"
                    accept="image/*"
                    onChange={onPicChange}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'Poppins', cursive",
                  color: "#b794f6",
                  fontWeight: 700,
                  fontSize: "1.19em",
                  marginBottom: 2
                }}>
                  Welcome, {name || "Dreamer"} 🎀
                </div>
                <div style={{
                  color: "#8a7fae",
                  fontFamily: "'Poppins', cursive",
                  fontSize: "0.99em"
                }}>
                  {picUrl
                    ? "Looking lovely today!"
                    : "Add a selfie, an avatar, or something gentle you like."}
                </div>
              </div>
            </div>
          </section>

          {/* Name/DOB bubble */}
          <section className="profile-bubble profile-row"
            style={{ ...pastelBubbles[1].style, borderRadius: 25, boxShadow: "0 3px 15px #b794f604" }}
          >
            <label htmlFor="name"
              style={{
                fontFamily: "'Poppins', cursive",
                color: "#b794f6",
                fontWeight: 600,
                fontSize: "1.07em"
              }}>
              Name<br />
              <input
                type="text"
                id="name"
                style={{ width: 152, marginRight: 10 }}
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </label>
            <label htmlFor="dob"
              style={{
                fontFamily: "'Poppins', cursive",
                color: "#b794f6",
                fontWeight: 600, fontSize: "1.07em"
              }}>
              DOB<br />
              <input
                type="date"
                id="dob"
                style={{ width: 122 }}
                value={dob}
                onChange={e => setDob(e.target.value)}
              />
            </label>
          </section>

          {/* Gender/Pronouns bubble */}
          <section className="profile-bubble profile-row"
            style={{ ...pastelBubbles[2].style, borderRadius: 25, boxShadow: "0 3px 15px #b794f61f" }}
          >
            <label htmlFor="gender" style={{
              fontFamily: "'Poppins', cursive", color: "#b794f6",
              fontWeight: 600, fontSize: "1.07em"
            }}>
              Gender<br />
              <input
                type="text"
                id="gender"
                style={{ width: 120 }}
                placeholder="Type or leave blank"
                value={gender}
                onChange={e => setGender(e.target.value)}
              />
            </label>
            <label htmlFor="pronouns" style={{
              fontFamily: "'Poppins', cursive", color: "#b794f6",
              fontWeight: 600, fontSize: "1.07em"
            }}>
              Pronouns<br />
              <select
                id="pronouns"
                style={{
                  fontFamily: "'Poppins', cursive",
                  color: "#8a7fae",
                  fontWeight: 500,
                  fontSize: "1.07em",
                  borderRadius: 16,
                  border: "1.8px solid #eee9f6",
                  padding: "7.5px 20px",
                  background: "#fff6fa",
                  marginTop: 0
                }}
                value={pronouns}
                onChange={e => setPronouns(e.target.value)}
              >
                {PRONOUNS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>
          </section>

          {/* Bio bubble */}
          <section className="profile-bubble"
            style={{ ...pastelBubbles[3].style, borderRadius: 23, boxShadow: "0 2px 12px #ffd1dc19" }}
          >
            <label style={{
              fontFamily: "'Poppins', cursive",
              color: "#b794f6",
              fontWeight: 600,
              width: "100%",
              textAlign: "left"
            }}>
              Bio<br />
              <textarea
                style={{
                  width: "100%",
                  minHeight: 38,
                  resize: "none",
                  background: "#fff6fa",
                  border: "1.8px solid #eee9f6",
                  borderRadius: "14px",
                  padding: "10px 12px",
                  fontSize: "1.03em",
                  color: "#34243a",
                  opacity: 0.87,
                  outline: "none",
                  marginBottom: 0
                }}
                maxLength={192}
                placeholder="Share something gentle about you..."
                value={bio}
                onChange={e => setBio(e.target.value)}
              />
            </label>
          </section>

          {/* Music Player Selector bubble */}
          <section className="profile-bubble"
            style={{ ...pastelBubbles[4].style, borderRadius: 23, boxShadow: "0 2.5px 11px #b794f61a" }}
          >
            <span style={{ fontFamily: "'Poppins', cursive", fontWeight: 700, color: "#b794f6", fontSize: "1.13em", marginBottom: "0.02em" }}>
              Profile Music&nbsp;
              <span style={{ fontWeight: 400, fontSize: "0.95em", color: "#8a7fae", marginLeft: 7 }}>(autoplays)</span>
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4em 0.8em", alignItems: "center", marginTop: "0.2em" }}>
              {MUSIC_OPTIONS.map(opt => (
                <PastelRadioChip
                  key={opt.key}
                  active={music === opt.key}
                  value={opt.key}
                  color="#e8daf9"
                  onClick={() => setMusic(opt.key)}
                >
                  <span style={{ marginRight: 6 }}>{{
                    lofi: "🌙", rain: "🌧️", piano: "🎹", chillpop: "💿"
                  }[opt.key]}</span>
                  {opt.name}
                  {music === opt.key && <span style={{ fontSize: "1.1em", marginLeft: 7, filter: "blur(0.28px)" }}>🎵</span>}
                </PastelRadioChip>
              ))}
            </div>
          </section>

          {/* Room Scent picker bubble */}
          <section className="profile-bubble"
            style={{ ...pastelBubbles[5].style, borderRadius: 23, boxShadow: "0 2px 10px #ffd1dc19" }}
          >
            <span style={{ fontFamily: "'Poppins', cursive", fontWeight: 700, color: "#b794f6", fontSize: "1.09em" }}>
              Room Scent
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35em 0.9em", alignItems: "center", marginTop: 3 }}>
              {SCENT_OPTIONS.map(opt => (
                <PastelRadioChip
                  key={opt.key}
                  active={roomScent === opt.key}
                  value={opt.key}
                  color="#ffd1dccc"
                  onClick={() => setRoomScent(opt.key)}
                >
                  <span style={{ marginRight: 5 }}>{{
                    lavender: "💜", vanilla: "🕯️", cotton: "🌥️", spring: "🌸"
                  }[opt.key]}</span>
                  {opt.label}
                </PastelRadioChip>
              ))}
            </div>
          </section>

          {/* Mood Aesthetic bubble */}
          <section className="profile-bubble"
            style={{ ...pastelBubbles[6].style, borderRadius: 23, boxShadow: "0 2px 10px #b794f614" }}
          >
            <span style={{ fontFamily: "'Poppins', cursive", fontWeight: 700, color: "#b794f6", fontSize: "1.09em" }}>
              Mood Aesthetic
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35em 0.9em", alignItems: "center", marginTop: 3 }}>
              {MOOD_AESTHETICS.map(opt => (
                <PastelRadioChip
                  key={opt.key}
                  active={aesthetic === opt.key}
                  value={opt.key}
                  color={opt.color}
                  onClick={() => setAesthetic(opt.key)}
                >
                  <span style={{ marginRight: 5 }}>{{
                    fairy: "🧚‍♀️", pastel: "🌸", loungewear: "🛋️", cottage: "🌱"
                  }[opt.key]}</span>
                  {opt.label}
                </PastelRadioChip>
              ))}
            </div>
          </section>

          {/* Avatar & Pose bubble */}
          <section className="profile-bubble"
            style={{ ...pastelBubbles[7].style, borderRadius: 23, boxShadow: "0 2px 13px #c2e9fb1a" }}
          >
            <span style={{ fontFamily: "'Poppins', cursive", fontWeight: 700, color: "#b794f6", fontSize: "1.09em" }}>
              Avatar & Pose
            </span>
            <div style={{
              display: "flex", flexWrap: "wrap", gap: "0.28em 0.7em", alignItems: "center", marginTop: 3
            }}>
              {AVATAR_OPTIONS.map(opt => (
                <PastelRadioChip
                  key={opt.key}
                  active={avatar === opt.key}
                  value={opt.key}
                  color="#b794f633"
                  onClick={() => setAvatar(opt.key)}
                >
                  <span style={{
                    fontSize: "1.15em",
                    marginRight: 4,
                    filter: avatar === opt.key ? "drop-shadow(0 2px 8px #ffd1dc)" : "none"
                  }}>{opt.emoji}</span>
                  {opt.label}
                </PastelRadioChip>
              ))}
              <span style={{
                marginLeft: "1.3em",
                fontFamily: "'Poppins', cursive", fontWeight: 700,
                color: "#b794f6", fontSize: "1em"
              }}>Pose:</span>
              {POSE_OPTIONS.map(pos => (
                <PastelRadioChip
                  key={pos.key}
                  active={pose === pos.key}
                  value={pos.key}
                  color="#fff6fa"
                  onClick={() => setPose(pos.key)}
                >
                  {pos.emoji}
                  <span style={{ marginLeft: 3, fontSize: "0.97em", color: "#8a7fae" }}>{pos.label}</span>
                </PastelRadioChip>
              ))}
            </div>
            <div style={{
              marginTop: "0.57em",
              display: "flex",
              alignItems: "center",
              fontFamily: "'Poppins', cursive",
              fontWeight: 500,
              color: "#8a7fae",
              fontSize: "0.95em"
            }}>
              Now: <span role="img" aria-label="avatar" style={{ fontSize: "1.5em", margin: "0 7px" }}>{avatarObj.emoji}</span>
              <span role="img" aria-label="pose" style={{ fontSize: "1.2em", margin: "0 2px" }}>{poseObj.emoji}</span>
              in <span style={{ fontWeight: 600, marginLeft: 4 }}>{avatarObj.outfit}</span>
            </div>
          </section>

          {/* Mini Mood Status bubble */}
          <section className="profile-bubble"
            style={{ ...pastelBubbles[8].style, borderRadius: 20, boxShadow: "0 1.7px 8px #ffd1dc18" }}
          >
            <label style={{
              fontFamily: "'Poppins', cursive", color: "#b794f6", fontWeight: 600, textAlign: "left", width: "100%"
            }}>
              Mood Status
              <input
                type="text"
                maxLength={40}
                style={{ width: "100%", fontSize: "0.97em" }}
                placeholder="What's your mood today, in a word or two?"
                value={miniMood}
                onChange={e => setMiniMood(e.target.value)}
              />
            </label>
          </section>

          {/* Toggles bubble */}
          <section className="profile-bubble"
            style={{ ...pastelBubbles[9].style, borderRadius: 18, boxShadow: "0 1.8px 6px #b794f61f", display: "flex", gap: "1.5em", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-start" }}
          >
            <GentleToggle
              checked={exploreVisible}
              onChange={setExploreVisible}
              label="Show in Explore"
            />
            <GentleToggle
              checked={acceptNotes}
              onChange={setAcceptNotes}
              label="Accept Kind Notes"
            />
          </section>

          {/* Save/Update & Preview buttons (spans grid for mobile) */}
          <section style={{ gridColumn: "span 2", display: "flex", gap: "1.2em", marginTop: 13, paddingLeft: 4 }}>
            <SoftButton type="submit" style={{
              background: "linear-gradient(95deg, #ffd1dc 81%, #b794f6 120%)",
              color: "#fff", border: "none"
            }}>Save Profile</SoftButton>
            <SoftButton type="button" style={{
              background: "linear-gradient(91deg, #c2e9fb 61%, #b794f6 180%)",
              color: "#fff", border: "none"
            }}>Preview</SoftButton>
          </section>
        </form>
        <div style={{
          margin: "1.8em auto 2.2em auto",
          maxWidth: 660,
          borderRadius: "23px",
          background: "rgba(194,233,251,0.13)",
          boxShadow: "0 1.8px 16px #ffd1dc18",
          padding: "1.3em 1.1em 1.1em 1.1em",
          color: "#b794f6",
          fontFamily: "'Poppins', cursive",
          fontWeight: 700,
          fontSize: "1.07em",
          textAlign: "left"
        }}>
          Profile is your gentle corner — express, customize, and comfort yourself! 
          {miniMood && <span style={{ color: "#8a7fae", fontStyle: "italic", marginLeft: 8 }}>Mood: {miniMood}</span>}
        </div>
      </main>
      <style>
        {`
          .profile-sections-grid input,
          .profile-sections-grid textarea,
          .profile-sections-grid select {
            font-family: 'Poppins', cursive;
            font-size: 1.05em;
            letter-spacing: 0.02em;
            border-radius: 13px;
            background: #fff6fa;
            border: 1.8px solid #eee9f6;
            transition: border .16s, box-shadow .15s;
          }
          .profile-sections-grid input:focus,
          .profile-sections-grid textarea:focus,
          .profile-sections-grid select:focus {
            border-color: #b794f6;
            box-shadow: 0 2px 10px #b794f61f;
          }
          .pastel-chip:focus, .pastel-chip:hover {
            background: linear-gradient(91deg, #ffd1dc, #b794f6 140%);
            color: #fff;
            outline: none;
            border: 2.2px solid #ffd1dc;
            box-shadow: 0 3px 13px #ffd1dc6a;
            transform: scale(1.04);
          }
          /* Bubble fade/glow effect */
          .profile-bubble {
            animation: bubbleFloatIn 1.1s cubic-bezier(.59,1.11,.49,0.99);
            will-change: opacity, transform;
          }
          @keyframes bubbleFloatIn {
            from { opacity: 0; transform: translateY(41px) scale(0.98);}
            to   { opacity: 1; transform: translateY(0) scale(1);}
          }
          @media (max-width: 850px) {
            .profile-sections-grid { grid-template-columns: 1fr !important;}
          }
        `}
      </style>
    </>
  );
}
export default ProfileScreen;
