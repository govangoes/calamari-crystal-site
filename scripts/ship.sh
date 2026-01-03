#!/usr/bin/env bash
set -euo pipefail

source ~/.nvm/nvm.sh
nvm use 20 >/dev/null

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
