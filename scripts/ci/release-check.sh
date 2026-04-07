#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."

pnpm --filter @kunst/ui build

# Pack with pnpm so publishConfig.exports are applied
TARBALL=$(cd packages/ui && pnpm pack --pack-destination /tmp 2>/dev/null | tail -1)

npx --yes publint packages/ui
npx --yes @arethetypeswrong/cli "$TARBALL" \
  --ignore-rules cjs-resolves-to-esm no-resolution \
  --exclude-entrypoints "@kunst/ui/styles.css"
