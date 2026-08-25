# Development & Coding Rules

## 1. Documentation & Workspace Rules
- **Markdown Documentation**: All project documentation must reside inside `/docs/` formatted as `.md` files.
- **Protected Components**: Do not alter core store logic unless requested.
- **Memory Tracking**: `Memory.md` will be initiated when active code refactoring or multi-session coding commences.

---

## 2. Code Quality & Standards
- **Vanilla Performance**: Favor native browser APIs and lightweight Vanilla CSS / JS.
- **Path Resolution**: Keep relative links resilient so the web app can run seamlessly on both standard static file hosts (GitHub Pages / Vercel) and the custom Node.js server.
- **Media Optimization**: Compress images and serve modern formats (`.webp`, `.svg`). Keep hero videos streamed or optimized for rapid initial buffering.

---

## 3. Version Control & Git Guidelines
- Clear, descriptive commit messages.
- Clean `.gitignore` excluding unnecessary OS cache (`.DS_Store`, `Thumbs.db`), logs, and `node_modules`.
