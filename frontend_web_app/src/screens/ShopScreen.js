import React from "react";

/**
 * PUBLIC_INTERFACE
 * ShopScreen
 * Presents all shop grids/features in ultra-wide, floaty, pastel pastel rows and bubbles
 * using the entire content width—no boxed or centered cards, just gentle open sections,
 * floaty grids, and soft pastel dividers.
 */
function ShopScreen() {
  // Demo data - replace with backend/shop API later
  const shopItems = [
    { emoji: "🪴", name: "Plant Pot", price: 12 },
    { emoji: "🖼️", name: "Pastel Poster", price: 15 },
    { emoji: "🕯️", name: "Glowy Candle", price: 10 },
    { emoji: "🛋️", name: "Comfy Sofa", price: 23 }
  ];

  // Open, pastel, floaty row/section
  function SectionBubble({ children, bg, border, style, className = "" }) {
    return (
      <section
        className={`shop-section-bubble ${className}`}
        style={{
          background: bg || "linear-gradient(113deg, #fff8fd 91%, #ffd1dc17 140%)",
          borderBottom: border ? `2.3px solid ${border}` : "2.15px solid #eee9f6",
          borderRadius: 36,
          boxShadow: "0 6px 32px #b794f625, 0 2px 13px #ffd1dc19",
          margin: "2.5em auto 1em auto",
          padding: "2.7em 2.2vw 1.7em 2.7vw",
          width: "99vw",
          maxWidth: 1440,
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
        background: "linear-gradient(120deg, #ffd1dc18 72%, #c2e9fb18 112%, #b794f617 151%)",
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
      {/* Heading - open pastel bar */}
      <SectionBubble
        bg="linear-gradient(109deg, #ffd1dc66 76%, #c2e9fb33 130%, #fff8fd 230%)"
        border="#ffd1dc"
        style={{
          margin: "clamp(2em,6vw,3.6em) auto 1.7em auto",
          padding: "2.8em 2vw 1.95em 4vw",
          borderRadius: 56,
          boxShadow: "0 10px 38px #ffd1dc19, 0 2px 17px #b794f61c",
        }}
        className="shop-heading-bubble"
      >
        <h1
          className="whimsical"
          style={{
            width: "100%",
            textAlign: "left",
            margin: 0,
            fontSize: "2.6rem",
            letterSpacing: "0.02em"
          }}
        >
          🛍️ Shop
        </h1>
      </SectionBubble>

      {/* Gentle pastel divider */}
      <div
        aria-hidden="true"
        style={{
          height: 0,
          border: 0,
          borderBottom: "8px solid #c2e9fb33",
          width: "84%",
          maxWidth: 1220,
          margin: "0 auto 0.8em auto",
          borderRadius: 16,
        }}
      />

      {/* Product grid row - floaty, stretch grid */}
      <SectionBubble
        bg="linear-gradient(108deg, #c2e9fb5d 83%, #ffd1dc39 164%)"
        border="#b794f6"
        style={{
          margin: "0.8em auto 1.3em auto",
          padding: "2.6em 0.7vw 2.6em 0.7vw",
          borderRadius: 44,
        }}
        className="shop-products-row"
      >
        <div
          style={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: "repeat(auto-fit, minmax(245px, 1fr))",
            gap: "2.5em 3.7em",
            alignItems: "stretch",
            margin: "0 auto",
            padding: 0,
            maxWidth: 1200,
            minWidth: 220,
          }}
        >
          {shopItems.map((item, n) => (
            <div
              key={n}
              className="shop-item-float"
              style={{
                background: "linear-gradient(119deg, #ffd1dc 90%, #c2e9fb 145%)",
                borderRadius: 27,
                boxShadow: "0 6px 34px #ffd1dc23, 0 3px 14px #b794f62b",
                padding: "2.2em 1.1em 1.5em 1.1em",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 140,
                transition: "box-shadow .21s, transform .17s",
              }}
              tabIndex={0}
            >
              <span
                style={{
                  fontSize: "3em",
                  marginBottom: "0.12em",
                  filter: "drop-shadow(0 2px 13px #ffd1dc55) drop-shadow(0 2px 8px #b794f679)",
                  letterSpacing: "-0.08em"
                }}
                role="img"
                aria-label="shop item"
              >
                {item.emoji}
              </span>
              <div
                style={{
                  color: "#b794f6",
                  fontSize: "1.21em",
                  fontWeight: 700,
                  fontFamily: "'Poppins', cursive",
                  marginBottom: "6px",
                  letterSpacing: "0.03em",
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
                  opacity: 0.89,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.27em"
                }}
              >
                {item.price}
                <span
                  role="img"
                  aria-label="hearts"
                  style={{
                    fontSize: "1.29em",
                    marginLeft: 6,
                    verticalAlign: "middle"
                  }}
                >💖</span>
              </div>
            </div>
          ))}
        </div>
      </SectionBubble>

      {/* Gentle section divider */}
      <div
        aria-hidden="true"
        style={{
          height: 0,
          border: 0,
          borderBottom: "7px solid #ffd1dc33",
          width: "80%",
          maxWidth: 1190,
          margin: "0.1em auto 1em auto",
          borderRadius: 14,
        }}
      />

      {/* Info row - floaty bubble */}
      <SectionBubble
        bg="linear-gradient(110deg, #ffeaf7b0 79%, #ffd1dc66 120%, #fff6fa 140%)"
        border="#ffd1dc"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.4em",
          margin: "1.35em auto 3.6em auto",
          textAlign: "center",
          fontSize: "1.14em",
          color: "#8a7fae",
          fontFamily: "'Poppins', cursive",
          fontWeight: 500,
          minHeight: 40,
        }}
        className="shop-info-bubble"
      >
        Cozy decor and dreamy extras to unlock — all pastel and magical!
      </SectionBubble>

      {/* Custom pastel style for open floaty rows, max-width grids, and pastel dividers */}
      <style>
        {`
        .shop-section-bubble {
          width: 100vw;
          max-width: 1460px;
          margin: 2.3em auto 1.3em auto;
          box-sizing: border-box;
          transition: box-shadow .17s, background .13s, border-bottom .12s;
          animation: bubbleFloatIn 1.11s cubic-bezier(.63,1.13,.47,0.95);
          will-change: opacity, transform;
        }
        .shop-heading-bubble {
          margin-top: clamp(2em,6vw,3.6em) !important;
          border-radius: 66px !important;
        }
        .shop-products-row {
          padding-left: 0vw !important; padding-right: 0vw !important;
        }
        .shop-item-float:focus, .shop-item-float:hover {
          box-shadow: 0 15px 36px #b794f647, 0 3px 26px #ffd1dc1e !important;
          transform: scale(1.045);
          outline: none;
          z-index: 12;
        }
        @media (max-width: 1500px) {
          .shop-section-bubble { max-width: 99vw; }
        }
        @media (max-width: 1100px) {
          .shop-section-bubble { max-width: 99vw; }
        }
        @media (max-width: 900px) {
          .shop-section-bubble { width: 99vw; min-width: 0;}
          .shop-products-row > div { gap: 1.5em 0.7em; }
        }
        @media (max-width: 700px) {
          .shop-section-bubble { padding-left: 0.7em; padding-right: 0.7em; }
        }
        @media (max-width: 565px) {
          .shop-section-bubble { padding: 1em 2vw 1em 2vw !important; }
        }
        @media (max-width: 450px) {
          .shop-products-row > div { grid-template-columns: 1fr; }
        }
        @keyframes bubbleFloatIn {
          from { opacity: 0; transform: translateY(32px) scale(0.97);}
          to   { opacity: 1; transform: translateY(0) scale(1);}
        }
        `}
      </style>
    </main>
  );
}

export default ShopScreen;
