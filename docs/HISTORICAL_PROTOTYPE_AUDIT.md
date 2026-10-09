# Historical React prototype audit

This records the review of `files (2).zip` without importing its contents into the maintained application.

## Artifact integrity

- SHA-256: `b64acb87fa90ee0bde09034f3ccf18c30ebda19e11c90af98a7266d895f80da1`
- 86 files; archive integrity test passed
- No path traversal entries, symbolic links, embedded credentials, or private keys were found
- All 77 JavaScript/JSX files passed a static syntax parse

## Build and dependency findings

The snapshot is not a runnable application as stored:

- `package.json` is invalid JSON (a JavaScript comment and trailing comma)
- no lockfile, application entry point, bundler configuration, Electron entry, or license file
- undeclared imports include `yjs`, `y-webrtc`, `jszip`, `file-saver`, and `react-force-graph-2d`
- the README describes Electron commands that the package does not provide

## Security and product findings

Do not copy the snapshot wholesale into the maintained app.

- `PluginWizardPanel` evaluates user-provided code with `eval`
- the plugin market fetches an arbitrary discovery URL without restricting or validating it
- collaboration initializes a default `y-webrtc` provider, introducing signaling/network behavior
- several cloud, authentication, AI, analytics, sync, and subscription screens are placeholders or simulations
- “DOCX” export produces plain text with a DOCX filename/MIME type
- EPUB XML/XHTML and archive filenames are built from unsanitized project data
- a service worker performs network fallback, and one UI image loads from a remote CDN

## Recovery decision

| Area | Decision | Conditions |
|---|---|---|
| Outline, world-building, search, and editor UX concepts | Rewrite | Implement against the maintained architecture and test accessibility/state behavior |
| Local JSON/ZIP export | Rewrite | Sanitize filenames, validate data, and test round trips |
| Audit/history/consent UI concepts | Rewrite | Do not claim compliance without real enforcement |
| Local AI | Rewrite | Use an explicit local Ollama adapter; no required account, cloud, telemetry, or subscription |
| Plugin execution and remote marketplace | Reject | Never evaluate untrusted code in the application context |
| WebRTC collaboration | Reject for local-first baseline | Reconsider only as an explicit opt-in feature with documented network behavior |
| Cloud/auth/subscription and simulated status features | Reject | Remove misleading or nonfunctional claims |
| Existing DOCX/EPUB exporters | Reject | Replace with standards-compliant, tested exporters |

## Follow-up

Preserve the ZIP only as historical evidence. Recover ideas individually in small reviewed changes; do not extract its source tree into the maintained branch.
