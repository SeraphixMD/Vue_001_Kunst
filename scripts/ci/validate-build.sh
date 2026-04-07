#!/usr/bin/env bash
# Smoke-test the built @kunst/ui package by packing it into a tarball,
# installing it in a temp project, and verifying that all published exports
# resolve correctly.
set -euo pipefail
cd "$(dirname "$0")/../.."

echo "→ validate-build"

# Build if dist doesn't exist yet (CI may have built in a prior step)
if [ ! -d packages/ui/dist ]; then
  echo "  → building @kunst/ui"
  pnpm --filter @kunst/ui build
fi

# Pack the library into a tarball (pnpm pack applies publishConfig.exports)
echo "  → packing tarball"
TARBALL_PATH=$(cd packages/ui && pnpm pack --pack-destination /tmp 2>/dev/null | tail -1)

if [ ! -f "$TARBALL_PATH" ]; then
  echo "ERROR: tarball not found at $TARBALL_PATH"
  exit 1
fi

# Create a temporary consumer project
TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

cd "$TMPDIR"

cat > package.json << 'PKGJSON'
{
  "name": "validate-consumer",
  "version": "0.0.0",
  "private": true,
  "type": "module"
}
PKGJSON

echo "  → installing tarball in temp project"
npm install --no-audit --no-fund "$TARBALL_PATH" vue@^3.5.0 > /dev/null 2>&1

# 1. Verify main export resolves and exposes components
echo "  → verifying main export"
node -e "
  import('@kunst/ui').then(m => {
    const names = Object.keys(m);
    if (names.length === 0) {
      console.error('ERROR: main export is empty');
      process.exit(1);
    }
    console.log('    exports:', names.join(', '));
  }).catch(e => {
    console.error('ERROR: main export failed to resolve:', e.message);
    process.exit(1);
  });
"

# 2. Verify rules-config export resolves
echo "  → verifying rules-config export"
node -e "
  import('@kunst/ui/rules-config').then(m => {
    if (!m.rulesConfig) {
      console.error('ERROR: rules-config does not export rulesConfig');
      process.exit(1);
    }
    console.log('    rulesConfig: OK');
  }).catch(e => {
    console.error('ERROR: rules-config export failed to resolve:', e.message);
    process.exit(1);
  });
"

# 3. Verify styles.css exists in the package
echo "  → verifying styles.css"
STYLES_PATH="node_modules/@kunst/ui/dist/styles.css"
if [ ! -f "$STYLES_PATH" ]; then
  echo "ERROR: $STYLES_PATH not found"
  exit 1
fi
echo "    styles.css: OK ($(wc -c < "$STYLES_PATH") bytes)"

echo "validate-build OK"
