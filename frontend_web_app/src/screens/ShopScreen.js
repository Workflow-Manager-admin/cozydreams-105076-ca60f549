import React, { useState, useEffect } from 'react';
import './ShopScreen.css';

// Icon stubs (can replace with SVGs or images)
const categoryIcons = {
  "Room Decor": "🪞",
  "Avatar Fashion": "🧚‍♀️",
  "Themes": "🎨",
  "Music": "🎵",
  "Stickers": "✨",
  "Mystery": "🎁",
};

// Example product data
const CATEGORIES = [
  { name: "Room Decor", icon: categoryIcons["Room Decor"], key: "decor" },
  { name: "Avatar Fashion", icon: categoryIcons["Avatar Fashion"], key: "fashion" },
  { name: "Themes", icon: categoryIcons["Themes"], key: "theme" },
  { name: "Music", icon: categoryIcons["Music"], key: "music" },
  { name: "Stickers", icon: categoryIcons["Stickers"], key: "stickers" },
  { name: "Mystery", icon: categoryIcons["Mystery"], key: "mystery" },
];

// Example product catalogue with some locked/unlocked items.
const PRODUCTS = [
  { id: 1, name: "Fluffy Cloud Rug", category: "decor", price: 30, type: "Stars", image: "☁️", locked: false },
  { id: 2, name: "Dreamy Drape", category: "decor", price: 45, type: "Stars", image: "🪡", locked: true, lockType:"journal", lockReq: 3, lockMsg: "Write 3 journal entries to unlock!" },
  { id: 3, name: "Luna's Bed", category: "decor", price: 65, type: "Stars", image: "🛏️", locked: false },
  { id: 4, name: "Pastel Wings", category: "fashion", price: 50, type: "Hearts", image: "🎀", locked: false },
  { id: 5, name: "Cozy Sweater", category: "fashion", price: 80, type: "Hearts", image: "🧥", locked: true, lockType:"vibe", lockReq: "cozy", lockMsg: "Reach Cozy vibe to unlock!" },
  { id: 6, name: "Sunbeam Theme", category: "theme", price: 100, type: "Stars", image: "🌞", locked: false },
  { id: 7, name: "Gentle Rain", category: "music", price: 25, type: "Hearts", image: "💧", locked: false},
  { id: 8, name: "Sleepy Bear Sticker", category: "stickers", price: 10, type: "Stars", image: "🐻", locked: false },
  { id: 9, name: "Mystic Box", category: "mystery", price: 120, type: "Stars", image: "🦄", locked: true, lockType: "journal", lockReq: 10, lockMsg: "Write 10 journal entries to unlock!" }
];

// Inventory util for localStorage
function loadInventory() {
  try {
    const data = JSON.parse(localStorage.getItem('shop-inventory') || '{}');
    // Default values if not present
    return {
      stars: isNaN(Number(data.stars)) ? 200 : data.stars,
      hearts: isNaN(Number(data.hearts)) ? 100 : data.hearts,
      owned: Array.isArray(data.owned) ? data.owned : [],
      journalEntries: isNaN(Number(data.journalEntries)) ? 0 : data.journalEntries,
      vibe: typeof data.vibe === 'string' ? data.vibe : 'calm',
    };
  } catch {
    return { stars: 200, hearts: 100, owned: [], journalEntries: 0, vibe: 'calm' };
  }
}

function saveInventory(inv) {
  localStorage.setItem('shop-inventory', JSON.stringify(inv));
}

//
// MAIN COMPONENT
//
const ShopScreen = () => {
  // Shop state
  const [balance, setBalance] = useState({ stars: 0, hearts: 0 });
  const [owned, setOwned] = useState([]);
  const [selectedCat, setSelectedCat] = useState('all');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');
  const [showInventory, setShowInventory] = useState(false);
  const [animatedConfirm, setAnimatedConfirm] = useState(null); // item id for animated purchase
  const [modalConfirm, setModalConfirm] = useState(null); // object {item, state}
  const [journalEntries, setJournalEntries] = useState(0);
  const [vibe, setVibe] = useState('calm');

  // INIT: Load from localStorage
  useEffect(() => {
    const inv = loadInventory();
    setBalance({ stars: inv.stars, hearts: inv.hearts });
    setOwned(inv.owned);
    setJournalEntries(inv.journalEntries);
    setVibe(inv.vibe);
  }, []);

  // SAVE to localStorage (debounce for rapid updates not needed here)
  function saveAll(newBalance, newOwned) {
    setBalance(newBalance);
    setOwned(newOwned);
    saveInventory({
      stars: newBalance.stars,
      hearts: newBalance.hearts,
      owned: newOwned,
      journalEntries,
      vibe
    });
  }

  // Filtering and sorting products
  let shownProducts = PRODUCTS
    .filter(p => selectedCat === 'all' ? true : p.category === selectedCat)
    .filter(p => filter === 'all' ? true : !p.locked)
    .sort((a, b) => {
      if (sort === 'cheapest') return a.price - b.price;
      if (sort === 'mostexp') return b.price - a.price;
      if (sort === 'alpha') return a.name.localeCompare(b.name);
      return 0;
    });

  // Inventory: Open modal and animate
  function openInventory() {
    setShowInventory(true);
  }

  function closeInventory() {
    setShowInventory(false);
  }

  // Purchase (handle lock, animation, confirmation)
  function attemptPurchase(prod) {
    if (owned.includes(prod.id)) return; // already owned

    // Check if locked
    if (prod.locked) {
      if (prod.lockType === "journal" && journalEntries < prod.lockReq) {
        setModalConfirm({item: prod, state: "locked"});
        return;
      }
      if (prod.lockType === "vibe" && vibe !== prod.lockReq) {
        setModalConfirm({item: prod, state: "locked"});
        return;
      }
    }

    // Check balance
    if ((prod.type === "Stars" && balance.stars < prod.price) ||
      (prod.type === "Hearts" && balance.hearts < prod.price)) {
      setModalConfirm({item: prod, state: "notenough"});
      return;
    }

    // Animate
    setAnimatedConfirm(prod.id);
    setTimeout(() => {
      let newBalance = {...balance};
      if (prod.type === "Stars") newBalance.stars -= prod.price;
      if (prod.type === "Hearts") newBalance.hearts -= prod.price;
      let newOwned = [...owned, prod.id];
      saveAll(newBalance, newOwned);
      setAnimatedConfirm(null);
      setModalConfirm({item: prod, state: "success"});
    }, 1200);
  }

  // Confirmation Modal Handler
  function closeConfirmModal() {
    setModalConfirm(null);
  }

  // Soft glass background behind content
  return (
    <div className="shop__glass-bg">
      {/* Balance Bar */}
      <div className="shop__balance-bar dreamy-glass">
        <span className="shop__currency shop__stars">★ {balance.stars}</span>
        <span className="shop__currency shop__hearts">❤ {balance.hearts}</span>
        <button className="shop__inventory-btn floating" onClick={openInventory}>
          <span role="img" aria-label="bag">👜</span> Inventory
        </button>
      </div>
      {/* Magic Shop Title */}
      <h1 className="shop__main-title pastel-rainbow">Dream Bazaar</h1>

      {/* Categories */}
      <div className="shop__categories">
        <button className={selectedCat === 'all' ? "active-cat dreamy-glass" : "dreamy-glass"}
          onClick={() => setSelectedCat('all')}>✨ All</button>
        {CATEGORIES.map(cat => (
          <button key={cat.key}
                  className={selectedCat === cat.key ? "active-cat dreamy-glass" : "dreamy-glass"}
                  onClick={() => setSelectedCat(cat.key)}>
            <span className="cat__icon">{cat.icon}</span> {cat.name}
          </button>
        ))}
      </div>
      {/* Soft Filters */}
      <div className="shop__filters">
        <label>
          <span role="img" aria-label="filter">🔮</span>
          <select
            className="magic-select"
            value={filter}
            onChange={e => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="unlocked">Only Unlocked</option>
          </select>
        </label>
        <label>
          <span role="img" aria-label="sort">🪐</span>
          <select
            className="magic-select"
            value={sort}
            onChange={e => setSort(e.target.value)}>
            <option value="default">Featured</option>
            <option value="cheapest">Cheapest</option>
            <option value="mostexp">Most Expensive</option>
            <option value="alpha">A-Z</option>
          </select>
        </label>
      </div>

      {/* Product Cards */}
      <div className="shop__product-grid floating-bg">
        {shownProducts.map(prod => {
          const ownedItem = owned.includes(prod.id);
          const lockedItem = prod.locked && ((prod.lockType === "journal" && journalEntries < prod.lockReq) ||
                                             (prod.lockType === "vibe" && vibe !== prod.lockReq));
          return (
            <div
              key={prod.id}
              className={`
                dreamy-glass shop__product-card 
                ${ownedItem ? "owned" : ""}
                ${lockedItem ? "locked" : ""}
                ${animatedConfirm === prod.id ? "purchase-animate" : ""}
              `}
              onClick={() => !ownedItem && !lockedItem && animatedConfirm !== prod.id && attemptPurchase(prod)}
            >
              <div className="shop__product-img">{prod.image}</div>
              <div className="shop__product-name">{prod.name}</div>
              <div className="shop__product-price">
                {prod.type === "Stars" ? <span className="shop__stars">★ {prod.price}</span> : <span className="shop__hearts">❤ {prod.price}</span>}
              </div>
              {ownedItem &&
                <div className="shop__product-owned float-badge">Owned</div>
              }
              {lockedItem && (
                <div className="shop__product-locked float-badge">{prod.lockMsg}</div>
              )}
              {/* Magical Animation Sparkle */}
              {animatedConfirm === prod.id && (
                <div className="shop__purchase-sparkle">
                  <span role="img" aria-label="sparkle">✨</span>
                </div>
              )}
              <div className="shop__product-hover-sparkle"></div>
            </div>
          );
        })}
        {/* If no products */}
        {shownProducts.length === 0 && (
          <div className="shop__empty-msg">
            <span role="img" aria-label="empty">🌈</span> Nothing here! Try another category.
          </div>
        )}
      </div>

      {/* Magical Inventory Modal */}
      {showInventory &&
        <FloatingInventoryModal
          products={PRODUCTS}
          owned={owned}
          onClose={closeInventory}
        />
      }

      {/* Magical Purchase Confirmation/Failure Modal */}
      {modalConfirm &&
        <ConfirmModal
          modal={modalConfirm}
          onClose={closeConfirmModal}
        />
      }
    </div>
  );
};

// Inventory Modal Component
function FloatingInventoryModal({ products, owned, onClose }) {
  // Animated modal with sparkly pastel float
  return (
    <div className="shop__modal-overlay" tabIndex={-1} onClick={onClose}>
      <div className="shop__modal dreamy-glass inventory-modal floating" onClick={e => e.stopPropagation()}>
        <h2 className="pastel-rainbow">Your Magical Inventory</h2>
        <div className="modal__owned-grid">
          {products.filter(p => owned.includes(p.id)).length === 0 && (
            <div className="modal__empty">
              <span role="img" aria-label="sparkle">🔒</span> No items yet! Buy something cute!
            </div>
          )}
          {products.filter(p => owned.includes(p.id)).map(p =>
            <div className="modal__owned-item dreamy-glass" key={p.id}>
              <div className="owned__img">{p.image}</div>
              <div className="owned__name">{p.name}</div>
            </div>
          )}
        </div>
        <button className="modal__close-btn floating" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// Magical Confirmation Modal
function ConfirmModal({ modal, onClose }) {
  const { item, state } = modal;
  let content;
  if (state === "success") {
    content = (
      <>
        <div className="confirm__sparkle">✨</div>
        <p className="pastel-rainbow">You've unlocked <b>{item.name}</b>!</p>
      </>
    );
  } else if (state === "locked") {
    content = (
      <>
        <div className="confirm__sparkle-lock">🔒</div>
        <p>{item.lockMsg}</p>
      </>
    );
  } else if (state === "notenough") {
    content = (
      <>
        <p style={{color: "#E57373"}}>Not enough {item.type === "Stars" ? "Stars ★" : "Hearts ❤"}!</p>
      </>
    );
  }
  return (
    <div className="shop__modal-overlay" tabIndex={-1} onClick={onClose}>
      <div className="shop__modal dreamy-glass confirm-modal magical" onClick={e => e.stopPropagation()}>
        {content}
        <button className="modal__close-btn floating" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ShopScreen;
