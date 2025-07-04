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
const PRONOUNS = ["she/her", "he/him", "they/them", "any"];
const AVATAR_OPTIONS = [
  { key: "fairy", label: "Fairy", emoji: "🧚‍♀️", outfit: "Dream Loungewear" },
  { key: "casual", label: "Casual", emoji: "🧑‍🎤", outfit: "Soft Sweats" },
  { key: "bunny", label: "Bunny", emoji: "🐰", outfit: "Fluffy Hoodie" },
  { key: "pajamas", label: "Pajamas", emoji: "🛌", outfit: "Pastel Pajamas" },
];
const POSE_OPTIONS = [
  { key: "sit", label: "Sitting", emoji: "🪑" },
  { key: "stand", label: "Standing", emoji: "🧍" },
  { key: "hug", label: "Hugging", emoji: "🤗" },
  { key: "twirl", label: "Twirl", emoji: "🩰" },
];

// -- Particle animation ambient bg
function CozyParticles({ count = 18 }) {
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

// Pastel Radio Chip Button (for aesthetic, scent, etc.)
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
        fontFamily: `'Poppins', cursive`,
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

// Gentle Toggle Switch
function GentleToggle({ checked, onChange, label }) {
  return (
    <label style={{
      display: "flex", alignItems: "center", cursor: "pointer",
      gap: "0.73em", fontSize: "1em", fontFamily: `'Poppins',cursive`
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

// Soft pastel main button
function SoftButton({ children, style, ...props }) {
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
        fontFamily: `'Poppins', cursive`,
        ...style
      }}
      {...props}
    >{children}</button>
  );
}

// Star sparkle animation (after save)
function FloatingSaveSparkles({ visible }) {
  if (!visible) return null;
  // Star/sparkle cluster near the button, animating upward/floating
  const sparkCount = 6 + Math.floor(Math.random() * 3);
  const EMOJIS = ["✨", "⭐", "🫧", "💖"];
  const items = Array.from({ length: sparkCount });
  return (
    <div style={{
      position: "absolute",
      left: "60%",
      top: "-34px",
      pointerEvents: "none",
      zIndex: 33,
      width: 110,
      height: 42,
    }}>
      {
        items.map((_, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${40 + Math.random() * 40 - i * 7}px`,
              top: `${Math.random() * 16 + i * 2}px`,
              opacity: 0.7 + Math.random() * 0.3,
              fontSize: `${22 + Math.random() * 10}px`,
              animation: `floatSaveSparkle 1.08s ${0.12 * i}s both`,
              filter: "blur(0.05px)",
              color: "#b794f6",
              textShadow: "0 1px 8px #ffd1dc38, 0 2px 13px #b794f647",
            }}
            aria-hidden="true"
          >{EMOJIS[i % EMOJIS.length]}</span>
        ))
      }
      <style>
        {`
          @keyframes floatSaveSparkle {
            0% { opacity: 0; transform: translateY(20px) scale(1); }
            28% { opacity: 1; transform: translateY(-5px) scale(1.11); }
            65% { opacity: 1; }
            100% { opacity: .01; transform: translateY(-27px) scale(0.7);}
          }
        `}
      </style>
    </div>
  );
}

const LOCALSTORAGE_KEY = "cozydreams-profile";

// PUBLIC_INTERFACE
/** 
 * PUBLIC_INTERFACE
 * ProfileScreen
 * Now saves and restores all profile fields using localStorage, shows gentle confirmation on save,
 * animates sparkles, and glows Save button if changes are unsaved. Instant UI updating.
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
  // Data for unsaved change tracking
  const [initialData, setInitialData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  // --- Load profile from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCALSTORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        setName(d.name || "");
        setDob(d.dob || "");
        setGender(d.gender || "");
        setPronouns(d.pronouns || PRONOUNS[2]);
        setBio(d.bio || "");
        setMiniMood(d.miniMood || "");
        setPicUrl(d.picUrl || "");
        setMusic(d.music || "lofi");
        setRoomScent(d.roomScent || SCENT_OPTIONS[0].key);
        setAesthetic(d.aesthetic || MOOD_AESTHETICS[0].key);
        setAvatar(d.avatar || AVATAR_OPTIONS[0].key);
        setPose(d.pose || POSE_OPTIONS[0].key);
        setExploreVisible(d.exploreVisible === undefined ? true : !!d.exploreVisible);
        setAcceptNotes(d.acceptNotes === undefined ? true : !!d.acceptNotes);
        // preserve full original for later unsaved checking
        setInitialData({
          name: d.name || "",
          dob: d.dob || "",
          gender: d.gender || "",
          pronouns: d.pronouns || PRONOUNS[2],
          bio: d.bio || "",
          miniMood: d.miniMood || "",
          picUrl: d.picUrl || "",
          music: d.music || "lofi",
          roomScent: d.roomScent || SCENT_OPTIONS[0].key,
          aesthetic: d.aesthetic || MOOD_AESTHETICS[0].key,
          avatar: d.avatar || AVATAR_OPTIONS[0].key,
          pose: d.pose || POSE_OPTIONS[0].key,
          exploreVisible: d.exploreVisible === undefined ? true : !!d.exploreVisible,
          acceptNotes: d.acceptNotes === undefined ? true : !!d.acceptNotes,
        });
      } else {
        setInitialData({
          name: "",
          dob: "",
          gender: "",
          pronouns: PRONOUNS[2],
          bio: "",
          miniMood: "",
          picUrl: "",
          music: "lofi",
          roomScent: SCENT_OPTIONS[0].key,
          aesthetic: MOOD_AESTHETICS[0].key,
          avatar: AVATAR_OPTIONS[0].key,
          pose: POSE_OPTIONS[0].key,
          exploreVisible: true,
          acceptNotes: true,
        });
      }
    } catch {
      // ignore parse errors
    }
    // eslint-disable-next-line
  }, []);

  // --- Music Player logic ---
  const prevAudio = useRef();
  useEffect(() => {
    if (audio) {
      audio.pause();
      audio.remove();
    }
    setAudio(null);
    // eslint-disable-next-line
    return () => {
      if (audio) audio.pause();
    };
    // eslint-disable-next-line
  }, [music]);

  // Handle image upload and preview
  function onPicChange(e) {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setPicUrl(url);
    }
  }

  // Avatar/pose info
  const avatarObj = AVATAR_OPTIONS.find(x => x.key === avatar) || AVATAR_OPTIONS[0];
  const poseObj = POSE_OPTIONS.find(x => x.key === pose) || POSE_OPTIONS[0];

  // Returns the data in exactly the saved format for comparison and for persistence.
  function getProfileDataObj() {
    return {
      name, dob, gender, pronouns, bio, miniMood,
      picUrl, // Note: we persist only the URL (for local file uploads, this is session-based)
      music, roomScent, aesthetic, avatar, pose,
      exploreVisible, acceptNotes
    };
  }

  // Helper: does any field differ from initialData (for unsaved changes detection)
  function hasUnsavedChanges() {
    if (!initialData) return false;
    const curr = getProfileDataObj();
    for (const k of Object.keys(curr)) {
      if (curr[k] !== initialData[k]) return true;
    }
    return false;
  }

  // Save handler -- update localStorage, update UI
  function handleSave(e) {
    if (e) e.preventDefault();
    const profileData = getProfileDataObj();
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(profileData));
    setInitialData({ ...profileData });
    setIsSaved(true);
    setShowSparkle(true);
    setTimeout(() => setIsSaved(false), 1800);
    setTimeout(() => setShowSparkle(false), 1700);
  }

  // Save shortcut on Ctrl+S (or Command+S)
  useEffect(() => {
    const onKeyDown = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line
  }, [name, dob, gender, pronouns, bio, miniMood, picUrl,
      music, roomScent, aesthetic, avatar, pose, exploreVisible, acceptNotes, initialData]);

  // --- Live update for Name + Pronouns at top ---
  // This is already reflected in the "Welcome, {name}" and pronouns in the header section

  // ---- Fully refactored wide grid/section bubble layout -------
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
            gridTemplateColumns: "repeat(auto-fit, minmax(325px, 1fr))",
            gap: "2.1em 2.5em",
            maxWidth: 1040,
            padding: "clamp(1.2em,3vw,3.8em) clamp(0.4em,4vw,2.5em)",
            margin: "3.2rem auto 2.4rem auto",
            width: "100%",
          }}
          onSubmit={handleSave}
        >
          {/* Heading (span 2 columns on desktop, 1 on mobile) */}
          <h1 className="whimsical"
            style={{
              gridColumn: "span 2",
              textAlign: "left",
              paddingLeft: "0.3em",
              marginBottom: "0.3em"
            }}>
            {name || "Profile"}
            <span style={{
              fontSize: "1.13rem",
              fontWeight: 400,
              color: "#b794f6",
              marginLeft: "1.2em"
            }}>
              {pronouns ? `(${pronouns})` : ""}
            </span>
          </h1>

          {/* Profile picture + name bubble (always top and wide) */}
          <section
            className="profile-bubble pastel-bubble profile-pic-section"
            style={{
              gridColumn: "span 2",
              background: "linear-gradient(115deg, #c2e9fbcc 80%, #ffd1dcbd 120%)",
              borderRadius: 39,
              boxShadow: "0 5px 35px #b794f617, 0 4px 14px #ffd1dc19",
              marginBottom: "1.8em",
              padding: "2.3em 2.2em",
              position: "relative"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "2.1em", flexWrap: "wrap" }}>
              <div className="profile-img-preview"
                style={{
                  width: 108, height: 108, borderRadius: 60,
                  background: "linear-gradient(140deg, #c2e9fb 70%, #ffd1dc 130%)",
                  boxShadow: "0 1.6px 10px #ffd1dc33, 0 2.4px 25px #b794f660",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "3px solid #fff8fd", overflow: "hidden",
                  marginRight: "1em", position: "relative"
                }}>
                {picUrl ? (
                  <img
                    src={picUrl}
                    alt="Profile preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 60, border: "0", filter: "brightness(1) drop-shadow(0 2px 9px #ffd1dc75)" }}
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
                    padding: "0.13em 1.05em",
                    position: "absolute",
                    bottom: -30,
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
              <div style={{ flex: 1, minWidth: 210 }}>
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
              <div style={{ minWidth: 220, marginLeft: "auto", display: "flex", flexDirection: "column", gap: "0.5em" }}>
                <label htmlFor="name" style={{
                  fontFamily: "'Poppins', cursive",
                  color: "#b794f6", fontWeight: 600, fontSize: "1.07em"
                }}>
                  Name<br />
                  <input
                    type="text"
                    id="name"
                    style={{ width: 142, marginRight: 10 }}
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </label>
                <label htmlFor="dob" style={{
                  fontFamily: "'Poppins', cursive",
                  color: "#b794f6", fontWeight: 600, fontSize: "1.07em"
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
              </div>
            </div>
          </section>

          {/* Gender/Pronouns bubble */}
          <section className="profile-bubble profile-row pastel-bubble"
            style={{
              background: "linear-gradient(100deg, #ffeaf7 95%, #c2e9fb17 130%)",
              borderRadius: 27,
              boxShadow: "0 2px 14px #b794f61a",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              gap: "2.4em",
              marginBottom: "0.6em"
            }}
          >
            <label htmlFor="gender" style={{
              fontFamily: "'Poppins', cursive", color: "#b794f6",
              fontWeight: 600, fontSize: "1.07em"
            }}>
              Gender<br />
              <input
                type="text"
                id="gender"
                style={{ width: 130 }}
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

          {/* Large Bio bubble */}
          <section className="profile-bubble pastel-bubble"
            style={{
              background: "linear-gradient(90deg, #fff8fd 85%, #ffd1dc18 120%)",
              borderRadius: 27,
              boxShadow: "0 2.5px 13px #b794f61d",
              marginBottom: "1.1em",
              gridColumn: "span 2",
              minHeight: 86
            }}
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
                  minHeight: 62,
                  resize: "none",
                  background: "#fff6fa",
                  border: "1.8px solid #eee9f6",
                  borderRadius: "17px",
                  padding: "14px 15px",
                  fontSize: "1.08em",
                  color: "#34243a",
                  opacity: 0.89,
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

          {/* Music, Scent, Aesthetic (as grid bubbles) */}
          <section className="profile-bubble pastel-bubble"
            style={{
              background: "linear-gradient(115deg, #c2e9fb38 60%, #b794f653 95%)",
              borderRadius: 24,
              boxShadow: "0 2.5px 11px #b794f61a",
              marginBottom: "1.07em"
            }}
          >
            <span style={{
              fontFamily: "'Poppins', cursive", fontWeight: 700, color: "#b794f6", fontSize: "1.11em", marginBottom: "0.1em"
            }}>
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
                  <span style={{ marginRight: 6 }}>{
                    { lofi: "🌙", rain: "🌧️", piano: "🎹", chillpop: "💿" }[opt.key]
                  }</span>
                  {opt.name}
                  {music === opt.key && <span style={{ fontSize: "1.1em", marginLeft: 7, filter: "blur(0.28px)" }}>🎵</span>}
                </PastelRadioChip>
              ))}
            </div>
          </section>
          <section className="profile-bubble pastel-bubble"
            style={{
              background: "linear-gradient(100deg, #ffd1dc55 90%, #c2e9fb33 120%)",
              borderRadius: 21,
              boxShadow: "0 2px 10px #ffd1dc16",
              marginBottom: "1.07em"
            }}>
            <span style={{ fontFamily: "'Poppins', cursive", fontWeight: 700, color: "#b794f6", fontSize: "1.10em" }}>
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
                  <span style={{ marginRight: 5 }}>{
                    { lavender: "💜", vanilla: "🕯️", cotton: "🌥️", spring: "🌸" }[opt.key]
                  }</span>
                  {opt.label}
                </PastelRadioChip>
              ))}
            </div>
          </section>
          <section className="profile-bubble pastel-bubble"
            style={{
              background: "linear-gradient(115deg, #b794f614 80%, #ffd1dc55 120%)",
              borderRadius: 21,
              boxShadow: "0 2px 10px #b794f614",
              marginBottom: "1.07em"
            }}>
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
                  <span style={{ marginRight: 5 }}>{
                    { fairy: "🧚‍♀️", pastel: "🌸", loungewear: "🛋️", cottage: "🌱" }[opt.key]
                  }</span>
                  {opt.label}
                </PastelRadioChip>
              ))}
            </div>
          </section>

          {/* Avatar & pose bubble */}
          <section className="profile-bubble pastel-bubble"
            style={{
              background: "linear-gradient(108deg, #c2e9fb60 82%, #b794f622 124%)",
              borderRadius: 22,
              boxShadow: "0 2px 14px #c2e9fb16",
              marginBottom: "1.07em"
            }}>
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
                marginLeft: "1.0em",
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
                  <span style={{ marginLeft: 4, fontSize: "0.98em", color: "#8a7fae" }}>{pos.label}</span>
                </PastelRadioChip>
              ))}
            </div>
            <div style={{
              marginTop: "0.32em",
              display: "flex",
              alignItems: "center",
              fontFamily: "'Poppins', cursive",
              fontWeight: 500,
              color: "#8a7fae",
              fontSize: "0.94em"
            }}>
              Now: <span role="img" aria-label="avatar" style={{ fontSize: "1.4em", margin: "0 7px" }}>{avatarObj.emoji}</span>
              <span role="img" aria-label="pose" style={{ fontSize: "1.16em", margin: "0 2px" }}>{poseObj.emoji}</span>
              in <span style={{ fontWeight: 600, marginLeft: 4 }}>{avatarObj.outfit}</span>
            </div>
          </section>

          {/* Mini mood (short status) */}
          <section className="profile-bubble pastel-bubble"
            style={{
              background: "linear-gradient(92deg, #ffd1dc39 60%, #fffefa 100%)",
              borderRadius: 18,
              boxShadow: "0 1.7px 8px #ffd1dc18",
              marginBottom: "0.98em"
            }}
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

          {/* Toggles (explore, notes) bubble */}
          <section className="profile-bubble pastel-bubble"
            style={{
              background: "linear-gradient(92deg, #b794f617 60%, #ffd1dc47 100%)",
              borderRadius: 17,
              boxShadow: "0 1.8px 6px #b794f61f",
              display: "flex", gap: "1.3em", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-start"
            }}>
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

          {/* Save/Preview buttons - always full-width row */}
          <section style={{ gridColumn: "span 2", display: "flex", gap: "1.2em", marginTop: 7, paddingLeft: 4, position: "relative" }}>
            <SoftButton
              type="submit"
              id="saveProfileBtn"
              // Glows softly when unsaved changes exist
              style={{
                background: hasUnsavedChanges()
                  ? "linear-gradient(95deg, #ffd1dc 81%, #b794f6 120%)"
                  : "linear-gradient(90deg, #c2e9fb 65%, #ffd1dc 145%)",
                color: "#fff",
                border: "none",
                boxShadow: hasUnsavedChanges()
                  ? "0 0px 17px 5px #ffd1dc7a, 0 1.5px 10px #b794f648"
                  : "0 3px 11px #ffd1dc20",
                animation: hasUnsavedChanges() ? "glowProfileBtn 1.6s infinite alternate" : "none",
                transition: "box-shadow .28s, background .18s"
              }}
              disabled={isSaved}
            >
              Save Profile
              <FloatingSaveSparkles visible={showSparkle} />
            </SoftButton>
            <SoftButton type="button"
              style={{
                background: "linear-gradient(91deg, #c2e9fb 61%, #b794f6 180%)",
                color: "#fff", border: "none"
              }}>Preview</SoftButton>
            {/* Saved message */}
            <span
              style={{
                marginLeft: "1.2em",
                color: "#b794f6",
                fontSize: "0.98em",
                fontWeight: 700,
                opacity: isSaved ? 1 : 0,
                transition: "opacity .33s",
                boxShadow: isSaved ? "0 1px 18px #b794f648" : "none",
                background: isSaved ? "#fff6fbcc" : "transparent",
                borderRadius: "21px",
                padding: isSaved ? "0.27em 0.88em" : "0"
              }}
              aria-live="polite"
            >
              Saved successfully 💾✨
            </span>
            <style>
              {`
                @keyframes glowProfileBtn {
                  0% { box-shadow: 0 0px 13px 4px #ffd1dc99,0 2px 10px #b794f641;}
                  100% { box-shadow: 0 0px 28px 9px #ffd1dc44, 0 3px 18px #b794f63b; }
                }
              `}
            </style>
          </section>
        </form>
        {/* Gentle hint/info section divider */}
        <div style={{
          margin: "1.7em auto 2.0em auto",
          maxWidth: 710,
          borderRadius: "23px",
          background: "rgba(194,233,251,0.13)",
          boxShadow: "0 1.8px 16px #ffd1dc1a",
          borderBottom: "2.1px solid #eee9f6",
          padding: "1.25em 1.1em 1em 1.1em",
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
            color: #fff !important;
            outline: none;
            border: 2.2px solid #ffd1dc;
            box-shadow: 0 3px 13px #ffd1dc6a;
            transform: scale(1.04);
          }
          .profile-bubble {
            margin-bottom: 0;
            margin-top: 0;
            animation: bubbleFloatIn 1.08s cubic-bezier(.63,1.13,.47,0.95);
            will-change: opacity, transform;
            border-bottom: 2.25px solid #eee9f6;
          }
          .profile-bubble:last-child {
            border-bottom: none;
          }
          @keyframes bubbleFloatIn {
            from { opacity: 0; transform: translateY(41px) scale(0.98);}
            to   { opacity: 1; transform: translateY(0) scale(1);}
          }
          @media (max-width: 900px) {
            .profile-sections-grid { grid-template-columns: 1fr !important;}
          }
          @media (max-width: 500px) {
            .profile-pic-section { flex-direction: column !important; align-items: flex-start !important;}
          }
        `}
      </style>
    </>
  );
}

export default ProfileScreen;
