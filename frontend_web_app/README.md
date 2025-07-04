# CozyDreams Frontend – A Gentle, Dreamy Interactive Web App

CozyDreams is a soft, whimsical digital sanctuary where users can decorate dreamy rooms, customize avatars, journal, unlock decor, explore other rooms, send kind notes, and enjoy calming music. The app is focused on emotional comfort, delightful visual design, and a gentle, engaging experience.

---

## 🌸 Project Vision

Our aim is to create a peaceful, welcoming space online for playful, cozy self-expression and mindful, uplifting interaction. CozyDreams blends drag-and-drop room curation, avatar customization, journaling, rewards, social kindness, and pastel visuals in a modern React app with friendly developer tooling.

- **Gentle, dreamy UX:** All screens float on layered pastel cards and gradients with soft edges, round corners, and gentle animations.
- **Interactive room & avatar:** Each user shapes their space and avatar identity, making each profile unique.
- **Journaling & kindness:** Emphasis on emotional comfort and safe, positive interactions.
- **Scalable, friendly tooling:** Modular repo structure, extendable theming, and developer-first patterns.

---

## 📁 Folder Structure

All core source code lives in `src/` and is organized for modularity, theming, and clear separation:

```
src/
│
├── components/    # Standalone UI widgets e.g., BottomNavBar, dialogs
├── screens/       # Page-level React views (Home, Journal, Explore, Shop, Profile)
├── ui/            # Global styles, card styles, fonts
├── assets/        # Images, fonts, (audio soon)
├── theme/         # Theme config (colors, radii, palette)
├── utils/         # Pure helpers/utilities (formatting, theming)
│
├── App.js         # App entry, router & global theme
├── index.js       # ReactDOM root
│
...
```

> **Note:** Main UI screens: HomeScreen, JournalScreen, ExploreScreen, ShopScreen, ProfileScreen (in `screens/`).  
> The BottomNavBar, modals, and UI widgets are in `components/`.

---

## 🎨 Theming Guidelines

- **Palette:** Soft pastels only; primary: `#ffd1dc` (pink blush), secondary: `#c2e9fb` (cloud blue), accent: `#b794f6` (lavender purple).  
  Defined centrally in [`src/theme/colors.js`](src/theme/colors.js) and exposed via [`src/theme/index.js`](src/theme/index.js).
- **Look & Feel:** Floating cards, rounded edges, dreamy soft shadows, and gradient backgrounds.
- **Typography:** 'Poppins' with handwritten/cursive accent—see [`ui/GlobalStyle.css`](src/ui/GlobalStyle.css).
- **UI Components:** Always import theme colors from `theme/` for cross-app consistency.
- **Example:**
  ```js
  import { theme } from '../theme';
  style={{ background: theme.palette.primary, borderRadius: theme.borderRadius }}
  ```
- Prefer utility classes from `ui/GlobalStyle.css` for consistent card, heading, input, and button styles.

---

## 🛠️ Developer Onboarding & Tips

### Quickstart

1. **Install dependencies:**  
   ```bash
   npm install
   ```

2. **Run locally:**  
   ```bash
   npm start
   ```
   App runs at [http://localhost:3000](http://localhost:3000)

3. **Run tests:**  
   ```bash
   npm test
   ```

4. **Build for production:**  
   ```bash
   npm run build
   ```

#### System requirements

- Node.js (v18+ recommended)
- npm (v8+)

#### Key Files & Folders

- `src/components/`        → Reusable widgets (e.g., BottomNavBar)
- `src/screens/`           → App feature screens
- `src/ui/GlobalStyle.css` → Core styles (card, button, pastel palette)
- `src/theme/`             → Color palette, radii, and theme exports
- `src/assets/`            → Project images, soon: icons/audio/fonts
- `src/utils/`             → Misc logic, formatting, helpers

#### Tips

- All navigation and theming are set up for gentle transitions and quick scaling.
- Use the `theme/` exports for new components; avoid hard-coded colors.
- Stick to floating, pastel, rounded designs for new components/screens.
- Storybook integration and feature scaffolds coming soon!

---

## 💡 Overview of Features

- Floating UI cards for all screens
- Room/Avatar customization (soon: fully interactive)
- Journaling with “kindness” rewards
- Explore and visit other user rooms
- Shop pastel decor and unlockables
- Daily gentle “whisper bubbles,” kind notes, secret room guests
- Responsive, mobile-first, and accessibility-ready

_(See [`docs/FEATURES.md`](docs/FEATURES.md) and [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for more details.)_

---

## 🤝 Community & Contributing

Feedback and PRs welcome! Our vision is a creative, safe, gentle place for all.

---

## 📚 Further Reading

- [React documentation](https://reactjs.org/)

Other Create React App guides:
- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [Troubleshooting build](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
