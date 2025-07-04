import React from "react";

/**
 * PUBLIC_INTERFACE
 * ShopScreen
 * Fully open, airy, floaty layout: presents product grid and shop features
 * in ultra-wide, pastel bubble/row sections spanning the available horizontal space.
 * All boxes/centering removed; responsive, visually "floaty", pastel section
 * dividers between each row as gentle color transitions.
 */
function ShopScreen() {
  // Future: replace with fetched shop data (for now hardcoded)
  const shopItems = [
    { emoji: "🪴", name: "Plant Pot", price: 12 },
    { emoji: "🖼️", name: "Pastel Poster", price: 15 },
    { emoji: "🕯️", name: "Glowy Candle", price: 10 },
    { emoji: "🛋️", name: "Comfy Sofa", price: 23 }
  ];

  // Wide pastel row/bubble (open layout)
  function SectionBubble({ children, bg, border, style, className = "" }) {
    return (
      <section
        className={`shop-section-bubble ${className}`}
        style={{
          background: bg || "linear-gradient(113deg, #fff8fd 91%, #ffd1dc17 140%)",
          borderBottom: border ? `2.3px solid ${border}` : "2.15px solid #eee9f6",
          borderRadius: 34,
          boxShadow: "0 5px 19px #ffd1dc13, 0 2px 10px #c2e9fb17",
          margin: "2.3em auto 0.9em auto",
          padding: "2.4em 1.9em 1.8em 2.5em",
          width: "100vw",
          maxWidth: 1380,
          ...style,
        }}
      >
        {children}
      </section>
    );
  }

  return (
    <main
      className="main-shop-dreamy"
      style={{
        background: "linear-gradient(118deg, #ffd1dc18 65%, #c2e9fb19 117%, #b794f617 155%)",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "none",
        boxShadow: "none",
        position: "relative",
        display: "block",
        padding: 0,
        overflow: "visible",
      }}
    >
      {/* Pastel particles and ambient animation would be here if desired */}

      {/* Shop heading as an airy floaty pastel row */}
      <SectionBubble
        bg="linear-gradient(110deg, #ffd1dc33 81%, #fff8fd 120%)"
        border="#ffd1dc"
        style={{
          margin: "clamp(2em,5vw,3.6em) auto 1.2em auto",
          padding: "2.15em 0em 1.7em 4vw",
          borderRadius: 48,
          boxShadow: "0 9.5px 40px #ffd1dc16, 0 2px 15px #b794f612",
        }}
        className="shop-heading-bubble"
      >
        <h1
          className="whimsical"
          style={{
            width: "100%",
            textAlign: "left",
            margin: 0,
            fontSize: "2.4rem",
          }}
        >
          🛍️ Shop
        </h1>
      </SectionBubble>

      {/* Pastel divider */}
      <div
        aria-hidden="true"
        style={{
          height: 0,
          border: 0,
          borderBottom: "5px solid #c2e9fb29",
          width: "82%",
          maxWidth: 1180,
          margin: "0 auto 0.5em auto",
          borderRadius: 11,
        }}
      ></div>

      {/* Product grid - full-width, open pastel bubble/row */}
      <SectionBubble
        bg="linear-gradient(109deg, #c2e9fb4c 95%, #ffd1dc26 145%)"
        border="#b794f6"
        style={{
          margin: "0.7em auto 0.8em auto",
          padding: "2.85em 2vw 2em 3vw",
          borderRadius: 38,
        }}
        className="shop-products-bubble"
      >
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5em 3.1em",
            justifyContent: "center",
            alignItems: "stretch",
            margin: "0 auto",
            padding: "0.5em 1vw",
          }}
        >
          {shopItems.map((item, n) => (
            <div
              key={n}
              style={{
                background: "linear-gradient(121deg, #ffd1dc 79%, #c2e9fb 120%)",
                borderRadius: 24,
                boxShadow: "0 6px 23px #ffd1dc27, 0 3px 13px #b794f61c",
                padding: "2.13em 0.9em 1.3em 0.9em",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "98%",
                maxWidth: 330,
                minHeight: 122,
                transition: "box-shadow 0.21s, transform 0.15s",
                margin: "0 auto",
              }}
              tabIndex={0}
              className="shop-item-card"
            >
              <div style={{ paddingBottom: "0.35em" }}>
                <span
                  style={{
                    fontSize: "2.7em",
                    filter: "drop-shadow(0 2px 11px #ffd1dc53) drop-shadow(0 2px 8px #b794f677)",
                  }}
                  role="img"
                  aria-label="shop item"
                >
                  {item.emoji}
                </span>
              </div>
              <div
                style={{
                  color: "#b794f6",
                  fontSize: "1.17em",
                  fontWeight: 700,
                  fontFamily: "'Poppins', cursive",
                  marginBottom: 3,
                  letterSpacing: "0.04em",
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  fontSize: "1.03em",
                  color: "#8a7fae",
                  fontWeight: 500,
                  marginTop: 2,
                  opacity: 0.90,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.27em"
                }}
              >
                {item.price}
                <span role="img" aria-label="hearts" style={{ fontSize: "1.19em" }}>
                  💖
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionBubble>

      {/* Section divider - pastel line bubble */}
      <div
        aria-hidden="true"
        style={{
          height: 0,
          border: 0,
          borderBottom: "4.5px solid #ffd1dc22",
          width: "78%",
          maxWidth: 1110,
          margin: "0em auto 0.9em auto",
          borderRadius: 9,
        }}
      ></div>

      {/* Shop info secondary row - open pastel bubble */}
      <SectionBubble
        bg="linear-gradient(109deg, #ffeaf7 81%, #ffd1dc44 120%, #fff6fa 170%)"
        border="#ffd1dc"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.2em",
          margin: "1.1em auto 3.1em auto",
          textAlign: "center",
          fontSize: "1.13em",
          color: "#8a7fae",
          fontFamily: "'Poppins', cursive",
          fontWeight: 500,
          minHeight: 40,
        }}
        className="shop-info-bubble"
      >
        Cozy decor and dreamy extras to unlock — all pastel and magical!
      </SectionBubble>

      {/* Final pastel style for fully open, airy sections */}
      <style>
        {`
        .shop-section-bubble {
          width: 99vw;
          max-width: 1400px;
          margin: 2.2em auto 1em auto;
          box-sizing: border-box;
          transition: box-shadow .18s, background .11s, border-bottom .15s;
          animation: bubbleFloatIn 1.11s cubic-bezier(.63,1.13,.47,0.95);
          will-change: opacity, transform;
        }
        .shop-products-bubble {
          margin: 0.78em auto 1.3em auto;
          padding-left: 0vw; padding-right: 0vw;
        }
        @media (max-width: 1450px) {
          .shop-section-bubble { max-width: 99vw; }
        }
        @media (max-width: 1100px) {
          .shop-section-bubble { max-width: 99vw; }
        }
        @media (max-width: 900px) {
          .shop-section-bubble { width: 98vw; min-width: 0;}
          .shop-products-bubble { gap: 1.7em 1em;}
        }
        @media (max-width: 700px) {
          .shop-section-bubble { padding-left: 0.7em; padding-right: 0.7em; }
        }
        @media (max-width: 540px) {
          .shop-section-bubble { padding: 1em 1vw 1em 1vw; }
        }
        @media (max-width: 490px) {
          .shop-products-bubble { grid-template-columns: 1fr; }
        }
        .shop-item-card:focus, .shop-item-card:hover {
          box-shadow: 0 13px 32px #b794f647, 0 2px 20px #ffd1dc1b !important;
          transform: scale(1.035);
          outline: none;
          z-index: 11;
        }
        @keyframes bubbleFloatIn {
          from { opacity: 0; transform: translateY(29px) scale(0.97);}
          to   { opacity: 1; transform: translateY(0) scale(1);}
        }
        `}
      </style>
    </main>
  );
}

export default ShopScreen;
