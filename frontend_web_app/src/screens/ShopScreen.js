import React from "react";

/**
 * PUBLIC_INTERFACE
 * ShopScreen
 * Placeholder for item shop.
 */
function ShopScreen() {
  return (
    <main className="floating-screen">
      <h1 className="whimsical">🛍️ Shop</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25em",
          margin: "1.5em auto 1em auto",
          maxWidth: 380,
          justifyContent: "center"
        }}
      >
        {[1,2,3,4].map((n) => (
          <div
            key={n}
            style={{
              background: "linear-gradient(110deg, #ffd1dc 80%, #c2e9fb 130%)",
              borderRadius: "19px",
              boxShadow: "0 3px 18px #c2e9fb22, 0 1.9px 9px #b794f612",
              padding: "1.2em 0 0.7em 0",
              textAlign: "center",
              minHeight: "84px"
            }}
          >
            <div style={{paddingBottom:"0.17em"}}>
              <span style={{fontSize:"2em"}} role="img" aria-label="shop item">{["🪴","🖼️","🕯️","🛋️"][n-1]}</span>
            </div>
            <div style={{
              color:"#b794f6",
              fontSize:"1.03em",
              fontWeight:500,
              fontFamily:"'Poppins', cursive"
            }}>
              {["Plant Pot","Pastel Poster","Glowy Candle","Comfy Sofa"][n-1]}
            </div>
            <div style={{
              fontSize:"0.93em",
              color:"#8a7fae"
            }}>
              {["12","15","10","23"][n-1]} <span role="img" aria-label="hearts">💖</span>
            </div>
          </div>
        ))}
      </div>
      <p style={{ color: "#8a7fae" }}>Cozy decor and extras to unlock — all pastel and dreamy!</p>
    </main>
  );
}
export default ShopScreen;
