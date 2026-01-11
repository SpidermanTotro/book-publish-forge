#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="${BOOK_PUBLISH_FORGE_ROOT:-/usr/share/book-publish-forge}"
APP_FILE="${ROOT_DIR}/book_publish_forge_app.py"

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 is required to launch Book Publish Forge." >&2
  exit 1
fi

if ! python3 - <<'PY' >/dev/null 2>&1
import tkinter
PY
then
  echo "python3-tkinter is required to run Book Publish Forge." >&2
  exit 1
fi

if [[ ! -d "$ROOT_DIR" ]]; then
  echo "Book Publish Forge assets not found at $ROOT_DIR" >&2
  echo "Rebuild the package or ensure build artifacts are installed." >&2
  exit 1
fi

if [[ ! -f "$APP_FILE" ]]; then
  echo "Book Publish Forge app is missing at $APP_FILE" >&2
  echo "Rebuild the package to install the desktop program." >&2
  exit 1
fi

exec python3 "$APP_FILE"
