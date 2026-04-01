#!/usr/bin/env bash
# Build a Debian .deb package for book-publish-forge.
#
# Usage:  bash packaging/debian/build-deb.sh [VERSION]
# Output: packaging/debian/book-publish-forge_<VERSION>_all.deb
#
# Requirements (install once):
#   sudo apt install dpkg-dev fakeroot
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
VERSION="${1:-0.1.0}"
PKG="book-publish-forge"
ARCH="all"

for tool in dpkg-deb fakeroot; do
    if ! command -v "$tool" >/dev/null 2>&1; then
        echo "ERROR: '$tool' is required. Install with: sudo apt install dpkg-dev fakeroot" >&2
        exit 1
    fi
done

if [[ ! -f "${ROOT_DIR}/app/book_publish_forge_app.py" ]]; then
    echo "ERROR: app/book_publish_forge_app.py not found." >&2
    exit 1
fi

WORK_DIR="$(mktemp -d)"
trap 'rm -rf "$WORK_DIR"' EXIT

PKG_ROOT="${WORK_DIR}/${PKG}_${VERSION}_${ARCH}"

# ── DEBIAN control directory ─────────────────────────────────────────
DEBIAN_DIR="${PKG_ROOT}/DEBIAN"
mkdir -p "${DEBIAN_DIR}"

# Substitute version into the control template
sed "s/\${VERSION}/${VERSION}/g" \
    "${ROOT_DIR}/packaging/debian/control" > "${DEBIAN_DIR}/control"

install -Dm0755 "${ROOT_DIR}/packaging/debian/postinst" "${DEBIAN_DIR}/postinst"

# ── App payload ──────────────────────────────────────────────────────
install -Dm0644 "${ROOT_DIR}/app/book_publish_forge_app.py" \
    "${PKG_ROOT}/usr/share/${PKG}/book_publish_forge_app.py"

install -Dm0755 "${ROOT_DIR}/packaging/fedora/book-publish-forge-launch.sh" \
    "${PKG_ROOT}/usr/bin/${PKG}"

install -Dm0755 "${ROOT_DIR}/packaging/fedora/diagnose.sh" \
    "${PKG_ROOT}/usr/bin/${PKG}-diagnose"

install -Dm0644 "${ROOT_DIR}/packaging/fedora/book-publish-forge.desktop" \
    "${PKG_ROOT}/usr/share/applications/${PKG}.desktop"

install -Dm0644 "${ROOT_DIR}/packaging/fedora/book-publish-forge.svg" \
    "${PKG_ROOT}/usr/share/icons/hicolor/scalable/apps/${PKG}.svg"

# ── Build .deb ───────────────────────────────────────────────────────
OUT_DIR="${ROOT_DIR}/packaging/debian"
DEB_FILE="${OUT_DIR}/${PKG}_${VERSION}_${ARCH}.deb"

fakeroot dpkg-deb --build "${PKG_ROOT}" "${DEB_FILE}"

echo "Debian package built: ${DEB_FILE}"
echo "Install with:  sudo dpkg -i ${DEB_FILE}"
echo "Fix deps with: sudo apt-get install -f"
