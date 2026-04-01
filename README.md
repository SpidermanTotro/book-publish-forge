# 📚 Book Publish Forge

> A modular, ethics-first, all-in-one publishing platform for writers — with a suite of unified AI writing tools, consent management, local-AI integration, and a 2026-style web UI.

[![CI](https://github.com/SpidermanTotro/book-publish-forge/actions/workflows/ci.yml/badge.svg)](https://github.com/SpidermanTotro/book-publish-forge/actions/workflows/ci.yml)

---

## ✨ Features

- **10 unified AI writing tools** — all sharing the same toolbar UX, tone/style selectors, loading/error states, copy, save & clear actions
- **Consistent 2026-style design system** — CSS custom properties, dark/light mode, responsive, accessible
- **Ethics & consent management** — audit log, consent/takedown portal, regional compliance
- **Local AI support** — works offline with Ollama (LLM) + Stable Diffusion WebUI (image gen)
- **Linux desktop app** — native Tkinter application packaged as an RPM for Fedora

---

## 🛠 Tech stack

| Layer        | Technology                               |
|--------------|------------------------------------------|
| Web frontend | React 18, Vite, plain CSS design tokens  |
| Desktop app  | Python 3, Tkinter                        |
| Local AI     | Ollama (LLM), Stable Diffusion WebUI     |
| Packaging    | RPM (Fedora/RHEL)                        |
| CI/CD        | GitHub Actions                           |

---

## 🚀 Quick start — Web app

### Prerequisites
- Node.js 18 or later
- npm 9+

### Run locally

```bash
cd web
npm install
npm run dev
```

Then open http://localhost:5173.

### Build for production

```bash
cd web
npm run build
# Static output is in web/dist/
```

### Lint

```bash
cd web
npm run lint
```

---

## 🖥 Quick start — Desktop app (Linux / Fedora)

### Prerequisites

- Python 3 with Tkinter (`python3-tkinter`)
- Ollama (optional, for local LLM): https://ollama.com
- Stable Diffusion WebUI (optional, for image gen): https://github.com/AUTOMATIC1111/stable-diffusion-webui

### Run directly

```bash
python3 app/book_publish_forge_app.py
```

### Environment variables

```bash
export BOOK_PUBLISH_FORGE_OLLAMA_URL=http://127.0.0.1:11434   # optional
export BOOK_PUBLISH_FORGE_IMAGE_URL=http://127.0.0.1:7860     # optional
```

### Build and install RPM (Fedora/RHEL)

```bash
cd packaging/fedora
./build-rpm.sh
sudo dnf install book-publish-forge-*.rpm
book-publish-forge           # launch
book-publish-forge-diagnose  # diagnose missing deps
```

---

## 🤖 AI Writing Tools

All tools share the same unified shell: **header + controls row + content + toolbar** (Generate · Regenerate · Copy · Save · Clear).

| Tool | Description |
|------|-------------|
| 🎬 Beat Generator | Generate whole-story beats, chapter ideas, or next-scene suggestions |
| 🪄 Writing Helper | Project blurbs, character descriptions, location prose, scene summaries |
| 💡 Inline Suggestions | Next sentence, paragraph, scene beat, or dialogue continuation |
| ✍️ Co-Writing | Turn-based human ↔ AI co-authoring with accept/reject |
| 🔍 Proofreading Agents | Tone checker, voice consistency, in-character dialogue, grammar |
| ⚙️ Correction Engines | Arc gap detection, style corrections, with accept/reject feedback |
| 🔎 Plot Checker | Detect plot holes, dropped characters, timeline inconsistencies |
| 🖊️ Style Extractor | Identify writing style, themes, tropes, and signature words |
| 📖 Sequel Generator | Generate title, summary, and opening hook for a sequel |
| 🤝 AI Companion | Always-on assistant with continuity tips, works offline/online |

---

## 🎨 Design system

The web app uses a CSS custom-properties design system (`web/src/design-system.css`) with:

- **Color tokens** — brand purple/indigo palette + semantic colors
- **Dark mode** — `data-theme="dark"` on `<html>` (toggled by the moon button)
- **Typography** — Inter (UI) + JetBrains Mono (code/output)
- **Spacing scale** — `--space-1` through `--space-16`
- **Shadow, radius, transition** tokens
- **Responsive** — sidebar collapses to a mobile drawer at 768 px and below
- **Accessibility** — focus rings, `aria-label` on interactive elements, semantic HTML

---

## 🗂 Repository structure

```
book-publish-forge/
├── web/                        <- React + Vite web app
│   ├── src/
│   │   ├── design-system.css   <- CSS tokens (colors, typography, spacing)
│   │   ├── shared/
│   │   │   ├── AIToolShell.jsx <- Unified AI tool wrapper (shared toolbar)
│   │   │   └── AIToolShell.css
│   │   ├── ai/                 <- 10 AI tool components (all use AIToolShell)
│   │   ├── App.jsx             <- Main app (navbar + sidebar + tool routing)
│   │   └── App.css
│   ├── public/index.html
│   └── package.json
├── app/
│   └── book_publish_forge_app.py  <- Python/Tkinter desktop app
├── extracted_components/          <- Original loose component library (reference)
├── packaging/fedora/              <- RPM packaging (Fedora/RHEL)
├── .github/workflows/ci.yml       <- CI: lint + build (Node + Python + Shell)
└── README.md
```

---

## 🔁 CI

GitHub Actions runs on every push and pull request to `main`:

| Job              | What it checks                              |
|------------------|---------------------------------------------|
| `web-lint-build` | `npm run lint` + `npm run build` in `web/`  |
| `python-lint`    | `flake8` on `app/`                          |
| `shell-lint`     | `shellcheck` on `packaging/**/*.sh`         |

---

## 📋 Changelog (2026 update)

- **New `web/` app** — proper Vite + React 18 setup (replaces loose `extracted_components/`)
- **Unified `AIToolShell`** — all AI tools now share one header/toolbar component
- **Design system** — CSS tokens, dark mode, responsive layout, accessible focus states
- **GitHub Actions CI** — lint + build checks on every PR
- **Updated README** — clear setup and usage instructions
