#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."

pnpm --filter @kunst/eslint-plugin-ui build
pnpm --filter @kunst/ui build
pnpm --filter sink build
pnpm --filter nuxt-sink build
