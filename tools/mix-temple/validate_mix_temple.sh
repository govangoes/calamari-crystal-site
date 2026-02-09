#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/cloutlandishllc/Downloads/calamari-crystal-site/public/mix-temple"
MIN_BYTES="${MIN_BYTES:-100000}"

FILES=(
  "frame-0-hero.png"
  "frame-1-screen-brain.png"
  "frame-2-capture-chain.png"
  "frame-3-monitors.png"
  "frame-4-logic-pro-workflow.png"
)

require_bin() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Missing dependency: $1" >&2
    exit 1
  }
}

require_bin sips
require_bin stat

for name in "${FILES[@]}"; do
  file="$ROOT/$name"

  if [[ ! -f "$file" ]]; then
    echo "MISSING: $file" >&2
    exit 1
  fi

  info="$(sips -g format -g pixelWidth -g pixelHeight -g hasAlpha "$file" 2>/dev/null)"
  format="$(awk '/format:/{print $2}' <<<"$info")"
  width="$(awk '/pixelWidth:/{print $2}' <<<"$info")"
  height="$(awk '/pixelHeight:/{print $2}' <<<"$info")"
  alpha="$(awk '/hasAlpha:/{print $2}' <<<"$info")"
  bytes="$(stat -f%z "$file")"

  [[ "$format" == "png" ]] || { echo "BAD FORMAT: $file ($format)" >&2; exit 1; }
  [[ "$width" == "3840" && "$height" == "2160" ]] || {
    echo "BAD RESOLUTION: $file (${width}x${height})" >&2
    exit 1
  }
  [[ "$alpha" == "yes" ]] || { echo "NO ALPHA: $file" >&2; exit 1; }
  [[ "$bytes" -ge "$MIN_BYTES" ]] || {
    echo "SUSPICIOUS SIZE: $file (${bytes} bytes, min ${MIN_BYTES})" >&2
    exit 1
  }

  echo "OK: $name | ${width}x${height} | alpha=$alpha | ${bytes} bytes"
done

echo "All Mix Temple PNG outputs validated."
