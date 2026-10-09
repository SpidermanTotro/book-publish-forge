# Book Publish Forge

A modular, ethical, all-in-one Linux desktop program for writing, publishing, and managing books—including erotica—​with full respect/consent, transparency, auditability, and cutting-edge AI automation.

## Features

- **Instant mode detection** (normal/erotic) on import
- **Naughty/non-naughty conversion** and merge
- **Ethics, audit, and consent panels built in**
- **Export with badges** for compliance, region, and content
- **Admin and user empowerment tools**
- **Works offline with local AI integrations**
- **Local LLM + image generator integration (Ollama + Stable Diffusion WebUI compatible)**

The supported app is the native Tkinter desktop application. The separate React
web prototype is included under `web/` on this development branch, but is
**experimental and not production-verified**. Cloud inference and automated
external sharing are disabled in the local-only prototype.

## Quick Start

Run the current desktop app from a checkout:
```bash
python3 app/book_publish_forge_app.py
```

Build the Fedora RPM (requires `rpmbuild`):

```bash
./packaging/fedora/build-rpm.sh
```

Run diagnostics (checks local dependencies and AI endpoints):
```bash
book-publish-forge-diagnose
```

## Local AI integrations (Linux desktop)
The desktop program uses local Ollama (writing) and Stable Diffusion WebUI (cover
art) endpoints. Configure these endpoints with environment variables:

```bash
BOOK_PUBLISH_FORGE_OLLAMA_URL=http://127.0.0.1:11434
BOOK_PUBLISH_FORGE_IMAGE_URL=http://127.0.0.1:7860
book-publish-forge
```

---

© 2025 Book Publish Forge Team — Safe, creative, and ethical AI for every story.

## Experimental web prototype (not production verified)

The React application lives in `web/`. For development with an existing Node.js installation:

```bash
cd web
npm ci
npm test -- --watch=false --runInBand
npm run build
```

Only connect to a locally running Ollama instance. It does not need or accept OpenAI/cloud API keys. The browser-backup control uses browser storage, **not cloud synchronization**, and live WebRTC collaboration is disabled. Manual file exports are needed for durable backups.

The web UI retains early demonstration components; advertised features are not proof of implemented backend services. Prefer the desktop app for your working book manuscripts until the web CI and privacy checks are complete.
