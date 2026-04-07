#!/usr/bin/env bash
# Fast verification suite used by the Claude `Stop` hook, pre-commit, and
# local dev loops. Runs lint + typecheck + rule coverage. Skips Vitest and
# Playwright. Target: under 15 seconds.
#
# Exit non-zero on any failure so calling hooks can halt Claude's turn.

set -euo pipefail

cd "$(dirname "$0")/.."

echo "→ verify:quick (lint + typecheck + rule-coverage)"

echo "  → lint"
pnpm lint

echo "  → typecheck"
pnpm typecheck

echo "  → rule coverage"
pnpm verify:rule-coverage

echo "verify:quick OK"
