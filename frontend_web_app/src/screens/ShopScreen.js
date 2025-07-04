import React from "react";

/**
 * PUBLIC_INTERFACE
 * ShopScreen
 * Features, grids, and items are displayed in wide, open, floating pastel bubble rows/dividers—airy, responsive, and use full content space.
 */
function ShopScreen() {
  // Items (should be fetched in future, hardcoded for now)
  const shopItems = [
    {
      emoji: "🪴",
      name: "Plant Pot",
      price: 12,
    },
    {
      emoji: "🖼️",
      name: "Pastel Poster",
      price: 15,
    },
    {
      emoji: "🕯️",
      name: "Glowy Candle",
      price: 10,
    },
    {
      emoji: "🛋️",
      name: "Comfy Sofa",
      price: 23,
    },
  ];

  // SectionBubble helper, for wide pastel floaty rows
  function SectionBubble({ children, bg, border, style, className = "" }) {
    return (
      <section
        className={`shop-section-bubble ${className}`}
        style={{
          background:
            bg || "linear-gradient(113deg, #fff8fd 91%, #ffd1dc17 140%)",
          borderBottom: border
            ? `2.3px solid ${border}`
            : "2.15px solid #eee9f6",
          borderRadius: 30,
          boxShadow: "0 3px 16px #ffd1dc14, 0 1.4px 7px #b794f613",
          margin: "2.15em auto 0.7em auto",
          padding: "2.1em 1.6em 1.5em 2.2em",
          width: "98vw",
          maxWidth: 1100,
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
        background:
          "linear-gradient(118deg, #ffd1dc18 65%, #c2e9fb19 117%, #b794f617 155%)",
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
      <h1
        className="whimsical"
        style={{
          width: "100%",
          textAlign: "left",
          paddingLeft: "4vw",
          margin: "clamp(2em, 7vw, 3.7em) auto 0.6em auto",
        }}
      >
        🛍️ Shop
      </h1>

      {/* Featured Items Bubble (wide grid row, unboxed) */}
      <SectionBubble
        bg="linear-gradient(110deg, #ffd1dc33 93%, #c2e9fb5a 124%, #fff8fd 160%)"
        border="#b794f6"
        style={{
          marginTop: "0.5em",
          marginBottom: "0.12em",
          padding: "2.2em 1.4em 2em 2.3em",
          display: "flex",
          flexDirection: "column",
          gap: "1.25em",
        }}
        className="shop-featured-bubble"
      >
        {/* Product Grid */}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "1.35em 2.3em",
            margin: "0 auto 0 0",
            alignItems: "stretch",
            justifyItems: "center",
          }}
        >
          {shopItems.map((item, n) => (
            <div
              key={n}
              style={{
                background:
                  "linear-gradient(121deg, #ffd1dc 79%, #c2e9fb 135%)",
                borderRadius: 19,
                boxShadow:
                  "0 4px 18px #b794f628, 0 2px 9px #c2e9fb16",
                padding: "1.47em 1em 1.01em 1em",
                textAlign: "center",
                minHeight: "108px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "96%",
                maxWidth: 295,
                transition: "box-shadow 0.21s, transform 0.16s",
              }}
              tabIndex={0}
            >
              <div style={{ paddingBottom: "0.2em" }}>
                <span
                  style={{
                    fontSize: "2.35em",
                    filter:
                      "drop-shadow(0 2px 9px #ffd1dc47) drop-shadow(0 2px 7px #b794f669)",
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
                  fontSize: "1.12em",
                  fontWeight: 600,
                  fontFamily: "'Poppins', cursive",
                  marginBottom: 2,
                  letterSpacing: "0.04em",
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  fontSize: "0.98em",
                  color: "#8a7fae",
                  fontWeight: 500,
                  marginTop: 2,
                }}
              >
                {item.price} <span role="img" aria-label="hearts">
                  💖
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionBubble>

      {/* Gentle Divider */}
      <div
        aria-hidden="true"
        style={{
          height: 0,
          border: 0,
          borderBottom: "3.5px solid #c2e9fb26",
          width: "76%",
          maxWidth: 950,
          margin: "0em auto 0.2em auto",
        }}
      ></div>

      {/* Info Bubble */}
      <SectionBubble
        bg="linear-gradient(109deg, #ffeaf7 81%, #ffd1dc44 120%, #fff6fa 170%)"
        border="#ffd1dc"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.12em",
          margin: "0.8em auto 2.5em auto",
          textAlign: "center",
          fontSize: "1.07em",
          color: "#8a7fae",
          fontFamily: "'Poppins', cursive",
          fontWeight: 500,
        }}
        className="shop-info-bubble"
      >
        Cozy decor and extras to unlock — all pastel and dreamy!
      </SectionBubble>

      {/* Responsive style for open pastel bubbles & airy grid */}
      <style>
        {`
        .shop-section-bubble {
          width: 98vw;
          max-width: 1140px;
          margin: 2em auto 0.65em auto;
          transition: box-shadow .16s, background .12s, border-bottom .15s;
          animation: bubbleFloatIn 1.09s cubic-bezier(.63,1.13,.47,0.95);
          will-change: opacity, transform;
        }
        @media (max-width: 1200px) {
          .shop-section-bubble { max-width: 99vw; }
        }
        @media (max-width: 800px) {
          .shop-section-bubble { width: 99vw; min-width: 0; padding-left: 0.7em; padding-right: 0.7em;}
        }
        @media (max-width: 540px) {
          .shop-section-bubble { padding: 1em 2vw 0.9em 2vw;}
        }
        @keyframes bubbleFloatIn {
          from { opacity: 0; transform: translateY(30px) scale(0.96);}
          to   { opacity: 1; transform: translateY(0) scale(1);}
        }
        `}
      </style>
    </main>
  );
}
export default ShopScreen;
