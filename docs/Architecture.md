# System Architecture Document

## Overview
Quetta Arfat Hotel platform is structured as a lightweight, blazing-fast web solution combining modern static front-end assets with a high-performance native Node.js HTTP server.

```
[ Client Browser ]
        │
        ▼ (HTTP / HTTPS)
[ Node.js Static & Streaming Server (server.js) ]
        │
        ├── Clean URL Router (/, /checkout, /index)
        ├── Video Range Streamer (MP4 streaming 206 Partial Content)
        ├── Static Asset Cache Engine (CSS, JS, Fonts, Images)
        └── Fallback & Next.js chunk mapper
```

---

## Directory Structure
```
Quetta-Arfat-Hotel/
├── docs/                   # System & project documentation
│   ├── PRD.md              # Product requirements
│   ├── Architecture.md     # System architecture
│   ├── Rules.md            # Development & architectural rules
│   ├── Phases.md           # Implementation & roadmap phases
│   └── Design.md           # UI/UX design tokens & guidelines
├── css/                    # Stylesheets & CSS bundles
├── js/                     # Client JavaScript bundles & scripts
├── fonts/                  # Web fonts (woff, woff2, ttf)
├── images/                 # Image assets (menu items, logo, icons)
├── media/                  # Video assets (hero background video)
├── index.html              # Main landing page & storefront
├── checkout.html           # Checkout & order completion page
├── package.json            # Project manifest & execution scripts
└── server.js               # Node.js production & development server
```

---

## Core Technical Components

### 1. Web Server (`server.js`)
- **Zero-Dependency Native Architecture**: Built on Node's native `http`, `fs`, and `path` modules without third-party framework overhead.
- **Range Request Handler**: Full support for `206 Partial Content` enabling smooth seeking, looping, and buffer management for video assets (e.g. `herovideo.mp4`).
- **Clean Routing**: Automatic resolution for extensionless paths (`/`, `/checkout`, `/index`).
- **MIME Type Mapping**: Precise content headers for fonts, modern image formats (`.webp`, `.svg`), scripts, and styles.

### 2. Client Front-End
- **Rendering**: Clean Semantic HTML5 and Vanilla CSS styling.
- **State Management**: Client-side cart persistence using browser `localStorage` and DOM event listeners.
- **Responsive Layout**: CSS Grid and Flexbox with mobile-first viewport design.
