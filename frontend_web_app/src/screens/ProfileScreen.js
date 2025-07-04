import React from "react";

/**
 * PUBLIC_INTERFACE
 * ProfileScreen
 * Public and editable user profile.
 */
function ProfileScreen() {
  return (
    <main className="floating-screen">
      <h1 className="whimsical">🧑‍🎤 Profile</h1>
      <div className="centered" style={{marginBottom:"1.1em"}}>
        <div
          style={{
            background: "linear-gradient(135deg, #c2e9fb 70%, #ffd1dc 120%)",
            borderRadius: "50%",
            boxShadow: "0 5px 28px #b794f62a",
            width: 96,
            height: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 0.5em"
          }}
        >
          <span role="img" aria-label="Avatar" style={{fontSize:"3.5em"}}>🧚‍♀️</span>
        </div>
        <div
          style={{
            background: "#fff6fa",
            borderRadius: "14px",
            color: "#b794f6",
            padding: "0.3em 0.9em",
            fontWeight: 600,
            fontSize: "1.04em",
            margin: "0 auto",
            fontFamily: "'Poppins',cursive"
          }}
        >
          Vibe: <span style={{color:"#8a7fae"}}>Dreamy Pastel</span>
        </div>
      </div>
      <div
        style={{
          background: "rgba(255,209,220,0.16)",
          borderRadius: "16px",
          padding: "0.9em 1em",
          margin: "0 auto 1.05em auto",
          maxWidth: 340
        }}
      >
        <span style={{color:"#b794f6", fontSize:"1em", fontWeight: 600}}>Pinned Quote: </span>
        <span style={{color:"#8a7fae", fontStyle:"italic"}}>"Shine gentle in your own sky."</span>
      </div>
      <div
        style={{
          background: "rgba(194,233,251,0.13)",
          borderRadius: "15px",
          padding: "0.72em 0.9em",
          margin: "0 auto",
          maxWidth: 330,
          display: "flex",
          justifyContent: "center",
          gap: "0.66em"
        }}
      >
        <span style={{
          color:"#b794f6",fontWeight:500,fontSize:"0.99em",fontFamily:"'Poppins', cursive"
        }}>
          <span role="img" aria-label="Hearts" style={{fontSize:"1.3em"}}>💖</span> 123
        </span>
        <span style={{
          color:"#b794f6",fontWeight:500,fontSize:"0.99em",fontFamily:"'Poppins', cursive"
        }}>
          <span role="img" aria-label="Stars" style={{fontSize:"1.25em"}}>⭐</span> 47
        </span>
      </div>
      <p style={{ color: "#8a7fae", marginTop: "1.2em" }}>
        Your avatar, vibe, and favorites — all about you, cozy style.
      </p>
    </main>
  );
}
export default ProfileScreen;
