#!/usr/bin/env bash
# Claude Code Stop hook.
#
# Runs when Claude is about to end its turn. Executes the fast verification
# suite (lint + typecheck + rule-coverage). If anything fails, the hook exits
# non-zero and Claude's turn reopens — Claude cannot declare done while the
# substrate is red.
#
# This is the primary guarantee that Claude never leaves broken code behind.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

echo "[stop-hook] running verify:quick"
pnpm verify:quick
