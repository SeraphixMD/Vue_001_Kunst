#!/usr/bin/env bash
# Claude Code PostToolUse hook.
#
# Runs after every Edit or Write tool call. For files in paths we care about,
# runs a fast check and fails the hook if the check fails (Claude then sees
# the hook output and must fix before continuing).
#
# Paths we enforce:
#   - packages/ui/src/**            → single-file lint via verify:file
#   - packages/ui/rules.config.ts   → full rule-coverage check
#   - packages/ui/src/styles/tokens.css → tokens-vs-rulesConfig consistency
#
# Other paths: no-op (hook exits 0 silently).

set -euo pipefail

PATHS="${1:-}"
if [[ -z "$PATHS" ]]; then
  exit 0
fi

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

# CLAUDE_FILE_PATHS is a newline-separated list; iterate each
while IFS= read -r FILE; do
  [[ -z "$FILE" ]] && continue

  # Make path repo-relative
  REL="${FILE#$REPO_ROOT/}"

  case "$REL" in
    packages/ui/rules.config.ts)
      echo "[hook] rules.config.ts edited — running verify:rule-coverage"
      pnpm verify:rule-coverage
      ;;
    packages/ui/src/styles/tokens.css)
      echo "[hook] tokens.css edited — running verify:rule-coverage"
      pnpm verify:rule-coverage
      ;;
    packages/ui/src/*.ts|packages/ui/src/*.vue|packages/ui/src/**/*.ts|packages/ui/src/**/*.vue)
      echo "[hook] $REL edited — running verify:file"
      pnpm verify:file "$FILE"
      ;;
    *)
      # Not a path we care about — silent no-op
      ;;
  esac
done <<< "$PATHS"

exit 0
