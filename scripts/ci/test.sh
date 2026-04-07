#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."

pnpm --filter @kunst/ui test
pnpm --filter @kunst/eslint-plugin-ui test
