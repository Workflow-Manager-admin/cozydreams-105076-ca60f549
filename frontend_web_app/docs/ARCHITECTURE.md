# CozyDreams App: Architecture Overview

## Overview

CozyDreams is a Single Page Application (SPA) built with React, designed to deliver a whimsical and deeply interactive experience. It implements a rigorous separation of concerns between presentation, state management, navigation, and utility logic while supporting rich UI dynamics and persistent user customization.

## Folder & Component Structure

Proposed final structure (subject to incremental refactoring):

```
src/
│
├── components/
│   ├── RoomDecorator/
│   ├── AvatarCustomizer/
│   ├── Journal/
│   ├── Explore/
│   ├── Shop/
│   ├── Profile/
│   ├── MusicPlayer/
│   ├── Rewards/
│   ├── NavBar/
│   └── Shared/            # Buttons, FloatingCards, Modal, Animations, etc.
│
├── layout/
│   └── BottomTabBar.js
│
├── state/
│   ├── store.js
│   ├── userSlice.js
│   ├── roomSlice.js
│   ├── journalSlice.js
│   └── ...                # More feature-centric slices/modules
│
├── api/
│   └── client.js          # Interface for REST/GraphQL backend
│
├── utils/
│   ├── themeUtils.js
│   └── animationUtils.js
│
├── assets/
│   ├── images/
│   ├── audio/
│   └── fonts/
│
├── App.js
├── index.js
└── App.css (theme, base, floating modules, pastel styling)
```

### Component Hierarchy

- All screens/panels are React components, styled for soft, floating, rounded appearance.
- Shared UI elements (buttons, modals, particles, animations) isolated in `/components/Shared/`.

## Navigation Model

- **Bottom Tab Navigation** with five main tabs: Home (Room), Journal, Explore, Shop, Profile.
- Each tab corresponds to a main stack, with modal overlays (for e.g. customizing, shopping preview, or music selection).
- Tabs float above animated backgrounds with soft ingress/egress transitions.
- Navigation will use `react-router-dom` (or similar), possibly combined with custom animation logic for seamless, gentle transitions.

## State Management

- **Redux Toolkit** or React Context for global state: tracks user profile, room objects, inventory, rewards, and theme.
- Slices for `user`, `room`, `journal`, `social`.
- Local UI state (e.g., modal open) stored in relevant component state.
- Soft syncing with localStorage for persistence of decor and avatar between sessions; backend API for core data.

## Theming & Styling

- Uses CSS variables for theme management.
- Style emphasizes pastels: primary `#ffd1dc`, secondary `#c2e9fb`, accent `#b794f6`.
- Floating cards, soft box-shadows, rounded corners, and layered gentle gradients for depth.
- Custom font: handwriting/cursive for headings and UI prompts.

## Planned Integrations

- **Backend API**: REST or GraphQL for user content, rooms, journals, profiles, shop, etc.
- **Music Playback**: Web audio for soothing playlists (MP3/OGG in `/assets/audio/`)
- **Avatar/Room Assets**: SVG and raster layers for drag-and-drop, found in `/assets/images/`
- **Optional**: Accessibility layer for high-contrast and screen reader support.

## Animation Model

- All item transitions use CSS transitions or React animation libs, always with soft fade/slide/grow effects.
- Confetti/sparkle on decor unlock, floating animation for particles, gentle pop for modal/dialog.

## High-level Mermaid Component Diagram

```mermaid
flowchart TD
    Start[App.js<br/>(Entry Point)]
    Start --> Nav[BottomTabBar]
    Nav --> Room[RoomDecorator]
    Nav --> Av[AvatarCustomizer]
    Nav --> Jnl[Journal]
    Nav --> Exp[Explore]
    Nav --> Shp[Shop]
    Nav --> Prof[Profile]
    Room --> Anim[Shared<br/>Animations]
    Prof --> Music[MusicPlayer]
    Room --> State[(State: Redux/Context)]
    Jnl --> State
    Exp --> State
```

---

This architecture ensures modularity, maintainable code, and a reliably dreamy, cozy user experience.
