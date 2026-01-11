#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="${BOOK_PUBLISH_FORGE_ROOT:-/usr/share/book-publish-forge}"
APP_FILE="${ROOT_DIR}/book_publish_forge_app.py"

check_command() {
  local label="$1"
  local cmd="$2"
  if command -v "$cmd" >/dev/null 2>&1; then
    echo "[ok] ${label}: ${cmd}"
  else
    echo "[missing] ${label}: ${cmd}"
  fi
}

check_command "Python" "python3"
check_command "Ollama" "ollama"

if [[ -d "$ROOT_DIR" ]]; then
  if [[ -f "$APP_FILE" ]]; then
    echo "[ok] Desktop app: ${APP_FILE}"
  else
    echo "[missing] Desktop app: ${APP_FILE}"
  fi
else
  echo "[missing] Desktop app directory: ${ROOT_DIR}"
fi

if command -v python3 >/dev/null 2>&1; then
  if python3 - <<'PY' >/dev/null 2>&1
import tkinter
PY
  then
    echo "[ok] Python module: tkinter"
  else
    echo "[missing] Python module: tkinter"
  fi
fi
