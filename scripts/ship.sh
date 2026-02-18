#!/usr/bin/env bash
set -euo pipefail

# Check if NVM exists before sourcing (supports default location or NVM_DIR env var)
NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
NVM_SCRIPT="$NVM_DIR/nvm.sh"

if [ -s "$NVM_SCRIPT" ]; then
  source "$NVM_SCRIPT"
  nvm use 20 >/dev/null 2>&1 || true
else
  echo "⚠️  Warning: NVM not found at $NVM_SCRIPT. Skipping Node version management."
  echo "   If Node.js 20.x is not active, the build may fail."
fi

echo "✅ Cleaning caches..."
rm -rf node_modules/.vite dist

echo "✅ Running build..."
npm run build

echo "✅ Git status:"
git status -sb

echo "✅ Committing (if needed)..."
git add -A
git commit -m "${1:-Ship updates}" || echo "Nothing to commit."

echo "✅ Pushing..."
git push
