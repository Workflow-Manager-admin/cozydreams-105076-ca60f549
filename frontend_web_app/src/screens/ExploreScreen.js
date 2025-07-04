import React from "react";

/**
 * PUBLIC_INTERFACE
 * ExploreScreen
 * Social exploration: grid of user rooms.
 */
function ExploreScreen() {
  return (
    <main className="floating-screen">
      <h1 className="whimsical">🔍 Explore</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.2em",
          marginBottom: "1.4em",
          marginTop: "0.7em",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {[1,2,3,4].map((n) => (
          <div
            key={n}
            style={{
              background: "linear-gradient(125deg, #c2e9fb 90%, #ffd1dc 130%)",
              borderRadius: "18px",
              boxShadow: "0 2px 14px #b794f61b",
              padding: "1em 0 0.6em 0",
              textAlign: "center",
              minHeight: "85px"
            }}
          >
            <div style={{paddingBottom:"0.25em"}}>
              <span style={{fontSize:"2.1em",filter:"drop-shadow(0 1px 4px #b794f647)"}} role="img" aria-label="Room">🛏️</span>
            </div>
            <div style={{
              color:"#8a7fae",
              fontSize: "0.97em",
              fontWeight: 500,
              fontFamily: "'Poppins', cursive"
            }}>
              Dream Room #{n}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          background: "linear-gradient(120deg, #ffd1dc33 60%, #b794f633 90%)",
          borderRadius: "22px",
          padding: "1.2em 1em 0.88em 1em",
          boxShadow: "0 2px 10px #c2e9fb28",
          margin: "0 auto 1em auto",
          maxWidth: 390
        }}
      >
        <div
          style={{
            color:"#b794f6",
            fontWeight:600,
            fontSize:"1.14em",
            fontFamily:"'Poppins',cursive",
            marginBottom:".45em"
          }}>
          Kind Notes <span role="img" aria-label="notes">💌</span>
        </div>
        <div style={{color:"#8a7fae",fontSize:"0.98em"}}>
          "Love your pastel decor! 💜"
        </div>
        <div style={{
          color:"#b794f6",
          fontSize:"0.96em",
          marginTop:"0.5em",
          opacity: 0.77
        }}>
          Leave a kind note to brighten someone's day!
        </div>
      </div>
      <p style={{color:"#8a7fae"}}>Visit other dreamy rooms and spread kindness!</p>
    </main>
  );
}
export default ExploreScreen;
