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

See `/components` for all functional modules!

## Quick Start

Clone & install (Linux RPM):
```bash
book-publish-forge
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
