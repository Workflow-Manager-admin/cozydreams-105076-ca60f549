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
          transition: "background .23s, box-shadow .21s",
          position: "relative",
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
      <span style={{color: "#8a7fae"}}>{label}</span>
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

// --- Main ProfileScreen Component ---
/**
 * PUBLIC_INTERFACE
 * ProfileScreen
 * Main editable profile and avatar config with dreamy UI and pastel glassmorphism, animations.
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
    // For demo, no real music files in /assets yet; so we skip playback
    // const newAudio = new window.Audio(`/assets/audio/${MUSIC_OPTIONS.find(m => m.key === music)?.audio}`);
    // newAudio.loop = true;
    // newAudio.volume = 0.25;
    // newAudio.play();
    // setAudio(newAudio);
    setAudio(null);
    // Cleanup on unmount
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

  // --- JSX Layout ---
  return (
    <>
      <CozyParticles count={17} />
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
        <form className="profile-floating-card" style={{
          maxWidth: 495,
          margin: "2.8rem auto 2rem auto",
          borderRadius: 36,
          boxShadow: "0 10px 40px #b794f630, 0 2px 18px #ffd1dc1a",
          background: "rgba(255,255,255,0.59)",
          backdropFilter: "blur(23px) saturate(1.13)",
          padding: "2.7rem 2.6rem 2.2rem 2.7rem",
          filter: "drop-shadow(0 4px 46px #ffd1dc32)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          overflow: "visible"
        }}>
          {/* Blurred Glassmorphism Layer */}
          <div
            style={{
              position: "absolute",
              inset: -19,
              borderRadius: 51,
              background: "linear-gradient(137deg, #ffd1dc3b 80%, #c2e9fb47 160%, #b794f627 230%)",
              filter: "blur(14.5px) saturate(1.11)",
              zIndex: 0,
              opacity: 0.89,
              pointerEvents: "none",
              animation: "dreamProfileBlurFloat 3.9s infinite alternate"
            }}
            aria-hidden="true"
          />
          <style>
          {`
            @keyframes dreamProfileBlurFloat {
              0% { filter: blur(11px) saturate(1.04);}
              100% { filter: blur(22px) saturate(1.19);}
            }
          `}
          </style>
          <h1 className="whimsical" style={{
            position: "relative", zIndex: 2, marginBottom: "0.9em"
          }}>Profile</h1>
          {/* Profile Photo Upload */}
          <div className="profile-pic-upload" style={{
            marginBottom: "1.35em", zIndex: 2
          }}>
            <div
              className="profile-img-preview"
              style={{
                width: 97,
                height: 97,
                borderRadius: 49,
                background: "linear-gradient(140deg, #c2e9fb 70%, #ffd1dc 130%)",
                boxShadow: `0 1.6px 10px #ffd1dc33, 0 2.4px 25px #b794f660${picUrl ? "" : ", 0 5px 18px #b794f61f"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                border: "3.2px solid #fff8fd",
                overflow: "hidden",
                margin: "0 auto",
                transition: "box-shadow 0.17s"
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
                  fontSize: "3.2em",
                  filter: "drop-shadow(0 2px 13px #ffd1dc72) drop-shadow(0 0px 8px #b794f660)",
                  color: "#b794f6"
                }}>{avatarObj.emoji}</span>
              )}
              {/* Glow border */}
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: 51,
                border: "3.6px solid #b794f6bb",
                pointerEvents: "none",
                boxShadow: "0 0 18px #c2e9fb66, 0 3px 19px #ffd1dc8a",
                opacity: 0.52,
                zIndex: 1,
                animation: "profilePicGlow 4.9s infinite alternate"
              }} aria-hidden="true"></div>
              <style>
                {`
                  @keyframes profilePicGlow {
                    0% { box-shadow: 0 0 6px #ffd1dc52;}
                    100% { box-shadow: 0 0 32px #b794f693;}
                  }
                `}
              </style>
              {/* Upload Button */}
              <label
                htmlFor="pic-upload"
                className="pastel-btn"
                style={{
                  cursor: "pointer",
                  fontSize: "1.18em",
                  borderRadius: 19,
                  padding: "0.23em 1.6em",
                  position: "absolute",
                  bottom: -36,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(120deg, #ffd1dc 80%, #c2e9fb84 150%)",
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
          </div>
          {/* Name, DOB, Gender, Pronouns */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.34em",
            width: "min(350px, 96vw)",
            margin: "0 auto 1.25em auto",
            zIndex: 2
          }}>
            <div
              style={{ display: "flex", gap: "0.7em", alignItems: "flex-end" }}>
              <label htmlFor="name"
                style={{
                  fontFamily: "'Poppins', cursive",
                  color: "#b794f6",
                  letterSpacing: "0.03em",
                  fontWeight: 600,
                  fontSize: "1.1em"
                }}>
                Name
                <input
                  type="text"
                  id="name"
                  style={{ width: 170 }}
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </label>
              <label htmlFor="dob" style={{
                fontFamily: "'Poppins', cursive", color: "#b794f6",
                fontWeight: 600, fontSize: "1.02em"
              }}>
                <span style={{ opacity: 0.95 }}>DOB</span>
                <input
                  type="date"
                  id="dob"
                  style={{ width: 132 }}
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                />
              </label>
            </div>
            <div style={{ display: "flex", gap: "0.7em", alignItems: "flex-end" }}>
              <label htmlFor="gender" style={{
                fontFamily: "'Poppins', cursive", color: "#b794f6",
                fontWeight: 600, fontSize: "1.02em"
              }}>
                Gender
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
                fontWeight: 600, fontSize: "1.02em"
              }}>
                Pronouns
                <select
                  id="pronouns"
                  style={{
                    fontFamily: "'Poppins', cursive",
                    color: "#8a7fae",
                    fontWeight: 500,
                    fontSize: "1.02em",
                    borderRadius: 16,
                    border: "1.8px solid #eee9f6",
                    padding: "7.5px 20px",
                    background: "#fff6fa",
                  }}
                  value={pronouns}
                  onChange={e => setPronouns(e.target.value)}
                >
                  {PRONOUNS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
            </div>
          </div>
          {/* Bio */}
          <label style={{
            fontFamily: "'Poppins', cursive",
            color: "#b794f6",
            fontWeight: 600,
            width: "100%",
            textAlign: "left",
            marginBottom: "5px"
          }}>
            Bio
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
                fontFamily: "inherit",
                color: "#34243a",
                opacity: 0.87,
                marginBottom: 0,
                outline: "none",
                transition: "border 0.18s"
              }}
              maxLength={192}
              placeholder="Share something gentle about you..."
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
          </label>
          {/* Music Player Selector */}
          <div style={{
            margin: "1.4em 0 0.8em 0",
            width: "100%",
            display: "flex", flexDirection: "column", alignItems: "flex-start"
          }}>
            <span style={{ fontFamily: "'Poppins', cursive", fontWeight: 700, color: "#b794f6", fontSize: "1.15em", marginBottom: "0.22em" }}>
              Profile Music
              <span style={{ fontWeight: 400, fontSize: "0.94em", color: "#8a7fae", marginLeft: 11 }}>(autoplays)</span>
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4em 1.4em", alignItems: "center", marginTop: "0.2em" }}>
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
                  {music === opt.key && <span style={{
                    fontSize: "1.1em", marginLeft: 7, filter: "blur(0.28px)" }}>🎵</span>}
                </PastelRadioChip>
              ))}
            </div>
          </div>
          {/* Room Scent picker */}
          <div style={{
            margin: "1.2em 0 0.7em 0",
            width: "100%",
            display: "flex", flexDirection: "column", alignItems: "flex-start"
          }}>
            <span style={{ fontFamily: "'Poppins', cursive", fontWeight: 700, color: "#b794f6", fontSize: "1.11em", marginBottom: "0.13em" }}>
              Room Scent
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3em 1em", alignItems: "center", marginTop: 3 }}>
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
          </div>
          {/* Mood Aesthetic picker */}
          <div style={{
            margin: "1.1em 0 0.7em 0",
            width: "100%",
            display: "flex", flexDirection: "column", alignItems: "flex-start"
          }}>
            <span style={{ fontFamily: "'Poppins', cursive", fontWeight: 700, color: "#b794f6", fontSize: "1.11em", marginBottom: "0.13em" }}>
              Mood Aesthetic
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3em 1em", alignItems: "center", marginTop: 3 }}>
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
          </div>
          {/* Avatar Pose & Outfit selector */}
          <div style={{
            margin: "1.2em 0 0.7em 0",
            width: "100%",
            display: "flex", flexDirection: "column", alignItems: "flex-start"
          }}>
            <span style={{ fontFamily: "'Poppins', cursive", fontWeight: 700, color: "#b794f6", fontSize: "1.11em", marginBottom: "0.13em" }}>
              Avatar & Pose
            </span>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.28em 0.6em",
              alignItems: "center",
              marginTop: 3
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
                    fontSize: "1.2em",
                    marginRight: 4,
                    filter: avatar === opt.key ? "drop-shadow(0 2px 8px #ffd1dc)" : "none"
                  }}>{opt.emoji}</span>
                  {opt.label}
                </PastelRadioChip>
              ))}
              <span style={{
                marginLeft: "1.6em",
                fontFamily: "'Poppins', cursive", fontWeight: 700,
                color: "#b794f6", fontSize: "1.08em"
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
              marginTop: "0.77em",
              display: "flex",
              alignItems: "center",
              fontFamily: "'Poppins', cursive",
              fontWeight: 500,
              color: "#8a7fae",
              fontSize: "0.99em"
            }}>
              Now: <span role="img" aria-label="avatar" style={{ fontSize: "2.1em", margin: "0 9px" }}>{avatarObj.emoji}</span>
              <span role="img" aria-label="pose" style={{ fontSize: "1.6em", margin: "0 2px" }}>{poseObj.emoji}</span>
              in <span style={{ fontWeight: 600, marginLeft: 4 }}>{avatarObj.outfit}</span>
            </div>
          </div>
          {/* Mini Mood Status */}
          <div style={{ width: "100%", margin: "1.1em 0" }}>
            <label style={{
              fontFamily: "'Poppins', cursive", color: "#b794f6", fontWeight: 600,
              textAlign: "left"
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
          </div>
          {/* Toggles */}
          <div style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            flexWrap: "wrap",
            margin: "0.3em 0 0.4em 0",
            gap: "0.94em"
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
          </div>
          {/* Save/Update & Anim Button */}
          <div style={{ display: "flex", flexDirection: "row", gap: "1.2em", marginTop: 23, zIndex: 2 }}>
            <SoftButton type="submit" style={{
              background: "linear-gradient(95deg, #ffd1dc 80%, #b794f6 120%)",
              color: "#fff", border: "none"
            }}>Save Profile</SoftButton>
            <SoftButton type="button" style={{
              background: "linear-gradient(91deg, #c2e9fb 60%, #b794f6 180%)",
              color: "#fff", border: "none"
            }}>Preview</SoftButton>
          </div>
        </form>
        <div style={{
          margin: "1.3em auto 2em auto",
          maxWidth: 415,
          borderRadius: "31px",
          background: "rgba(194,233,251,0.13)",
          boxShadow: "0 1.8px 16px #ffd1dc18",
          padding: "1.5em 1.1em 1.1em 1.1em",
          color: "#b794f6",
          fontFamily: "'Poppins', cursive",
          fontWeight: 700,
          fontSize: "1.13em"
        }}>
          Profile is your gentle corner — express, customize, and comfort yourself! {miniMood && <span style={{ color: "#8a7fae", fontStyle: "italic", marginLeft:6 }}>Mood: {miniMood}</span>}
        </div>
      </main>
      <style>
      {`
        .profile-floating-card input, .profile-floating-card textarea, .profile-floating-card select {
          font-family: 'Poppins', cursive;
          font-size: 1.07em;
          letter-spacing: 0.02em;
          border-radius: 16px;
          background: #fff6fa;
          border: 1.8px solid #eee9f6;
          transition: border .18s, box-shadow .16s;
        }
        .profile-floating-card input:focus, .profile-floating-card textarea:focus, .profile-floating-card select:focus {
          border-color: #b794f6;
          box-shadow: 0 2px 12px #b794f624;
        }
        .pastel-chip:focus, .pastel-chip:hover {
          background: linear-gradient(91deg, #ffd1dc, #b794f6 140%);
          color: #fff;
          outline: none;
          border: 2.3px solid #ffd1dc;
          box-shadow: 0 3px 19px #ffd1dc6e;
          transform: scale(1.06);
        }
      `}
      </style>
    </>
  );
}
export default ProfileScreen;
