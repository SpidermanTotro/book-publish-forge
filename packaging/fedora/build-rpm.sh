#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
VERSION="${1:-0.1.0}"

TARBALL_DIR="${ROOT_DIR}/packaging/fedora"
RPM_DIR="${TARBALL_DIR}/rpm"

if ! command -v rpmbuild >/dev/null 2>&1; then
  echo "rpmbuild is required. Install rpm-build and try again." >&2
  exit 1
fi

if [[ ! -f "${ROOT_DIR}/app/book_publish_forge_app.py" ]]; then
  echo "Desktop app entrypoint missing at app/book_publish_forge_app.py" >&2
  exit 1
fi

WORK_DIR="$(mktemp -d)"
STAGING_DIR="${WORK_DIR}/book-publish-forge-${VERSION}"
mkdir -p "${STAGING_DIR}"

cp -a "${ROOT_DIR}/app" "${STAGING_DIR}/"
cp -a "${ROOT_DIR}/packaging" "${STAGING_DIR}/"

TARBALL_NAME="book-publish-forge-${VERSION}.tar.gz"
rm -f "${TARBALL_DIR}/${TARBALL_NAME}"

(tar -czf "${TARBALL_DIR}/${TARBALL_NAME}" -C "${WORK_DIR}" "book-publish-forge-${VERSION}")

mkdir -p "${RPM_DIR}"

rpmbuild -bb "${ROOT_DIR}/packaging/fedora/book-publish-forge.spec" \
  --define "_sourcedir ${TARBALL_DIR}" \
  --define "_rpmdir ${RPM_DIR}" \
  --define "version ${VERSION}"

echo "RPM build complete. Find packages in: ${RPM_DIR}"
