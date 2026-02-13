# Book Publish Forge

A modular, ethical, all-in-one suite for writing, publishing, and managing books—including erotica—with full respect/consent, transparency, auditability, and cutting-edge AI automation.

**Available in two versions:**
- 🖥️ **Desktop Application** (Linux) - Standalone Tkinter app with local AI integration
- 🌐 **Web Application** (React) - Modern web-based suite with comprehensive features

## Features

### Desktop Application (`/app`)
- **Local AI integrations** (Ollama + Stable Diffusion WebUI)
- **Instant mode detection** (normal/erotic) on import
- **Naughty/non-naughty conversion** and merge
- **Ethics, audit, and consent panels built in**
- **Export with badges** for compliance, region, and content
- **Works completely offline**

### Web Application (`/web`)
- **Comprehensive AI writing tools suite**
- **Cloud sync with offline capability**
- **Multi-project dashboard**
- **Advanced export and publishing options**
- **Plugin system and marketplace**
- **Magazine and media tools**
- **Modern, responsive UI design**

Both versions share the same ethical foundation: **Respect, transparency, and consent-first approach**.

## Quick Start

### Desktop Application (Linux)

Clone & install (Linux RPM):
```bash
book-publish-forge
```

Run diagnostics (checks local dependencies and AI endpoints):
```bash
book-publish-forge-diagnose
```

Configure local AI endpoints with environment variables:
```bash
BOOK_PUBLISH_FORGE_OLLAMA_URL=http://127.0.0.1:11434
BOOK_PUBLISH_FORGE_IMAGE_URL=http://127.0.0.1:7860
book-publish-forge
```

### Web Application

Navigate to the web directory and install dependencies:
```bash
cd web
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

For production deployment, see [`web/README.md`](web/README.md).

## Project Structure

```
book-publish-forge/
├── app/                      # Python/Tkinter desktop application
│   └── book_publish_forge_app.py
├── web/                      # React web application
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/      # React components
│   │   ├── App.jsx         # Main application
│   │   └── index.js        # Entry point
│   └── package.json        # Dependencies
├── packaging/               # Linux packaging files
│   └── fedora/             # Fedora RPM packaging
└── README.md               # This file
```

## Documentation

- [Web Application README](web/README.md) - Detailed web app documentation
- [Feature Comparison](extracted_files/comparison-summary.md) - Comparison with competitors
- [Advancement Level](extracted_files/advancement-level.md) - Technology advancement status

## Ethics & Transparency

This application includes built-in:
- **Ethics Review Panel** - Ensures content meets ethical standards
- **Audit Log** - Full transparency of all actions
- **Consent Management** - Respect and consent-first approach
- **Legal Region Compliance** - Regional law awareness
- **Anti-Bias Tools** - Promoting fair and respectful content

---

© 2025 Book Publish Forge Team — Safe, creative, and ethical AI for every story.
