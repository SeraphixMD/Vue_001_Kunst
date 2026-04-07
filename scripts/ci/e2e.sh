#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."

pnpm --filter sink test:e2e
pnpm --filter nuxt-sink test:e2e
