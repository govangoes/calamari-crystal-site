#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="/Users/cloutlandishllc/Downloads/calamari-crystal-site"
FRAME_DIR="$PROJECT_ROOT/public/mix-temple"
QA_ROOT="/tmp/mix-temple-qa"
PREVIEW_DIR="$QA_ROOT/previews"
DIFF_DIR="$QA_ROOT/diffs"
METRIC_FILE="$QA_ROOT/rmse_metrics.txt"
PREVIEW_URL="http://127.0.0.1:4176/#mix-temple"

FRAMES=(
  "frame-0-hero.png"
  "frame-1-screen-brain.png"
  "frame-2-capture-chain.png"
  "frame-3-monitors.png"
  "frame-4-logic-pro-workflow.png"
)

rm -rf "$QA_ROOT"
mkdir -p "$PREVIEW_DIR" "$DIFF_DIR"

echo "Mix Temple Visual QA Harness"
echo "==========================="
echo "QA bundle: $QA_ROOT"
echo
echo "Preview:"
echo "Run in another terminal:"
echo "  npm run preview -- --host 127.0.0.1 --port 4176"
if command -v open >/dev/null 2>&1; then
  echo "Then open:"
  echo "  $PREVIEW_URL"
fi
echo

echo "Checklist"
echo "---------"
echo "- Alpha/halo edges on dark background:"
echo "  - Monitor curved border and stand edges"
echo "  - Mic silhouette and boom joints"
echo "  - Rim-lit speaker outer edges"
echo "- Step transition quality (desktop + mobile):"
echo "  - No flicker/jitter around active-step threshold"
echo "  - Overlay only highlights intended target per step"
echo "- Overlay style guardrails:"
echo "  - No solid slabs or filled blocks"
echo "  - Contours stay thin and readable"
echo "  - Glow intensity remains subtle"
echo

for frame in "${FRAMES[@]}"; do
  if [[ ! -f "$FRAME_DIR/$frame" ]]; then
    echo "Missing frame: $FRAME_DIR/$frame" >&2
    exit 1
  fi
done

has_magick=0
if command -v magick >/dev/null 2>&1; then
  has_magick=1
elif command -v convert >/dev/null 2>&1 && command -v compare >/dev/null 2>&1; then
  has_magick=2
fi

if [[ "$has_magick" -gt 0 ]]; then
  echo "ImageMagick detected: generating downscaled previews + RMSE diffs"
  for frame in "${FRAMES[@]}"; do
    name="${frame%.png}"
    input="$FRAME_DIR/$frame"
    output="$PREVIEW_DIR/${name}.jpg"
    if [[ "$has_magick" -eq 1 ]]; then
      magick "$input" -resize 1280x720 -background '#05070f' -alpha remove -alpha off -quality 90 "$output"
    else
      convert "$input" -resize 1280x720 -background '#05070f' -alpha remove -alpha off -quality 90 "$output"
    fi
    echo "preview: $output"
  done

  : >"$METRIC_FILE"
  for i in 0 1 2 3; do
    a="${FRAMES[$i]%.png}.jpg"
    b="${FRAMES[$((i + 1))]%.png}.jpg"
    out="$DIFF_DIR/diff-${i}-$((i + 1)).png"
    metric=""
    if [[ "$has_magick" -eq 1 ]]; then
      metric=$(magick compare -metric RMSE "$PREVIEW_DIR/$a" "$PREVIEW_DIR/$b" "$out" 2>&1 >/dev/null || true)
    else
      metric=$(compare -metric RMSE "$PREVIEW_DIR/$a" "$PREVIEW_DIR/$b" "$out" 2>&1 >/dev/null || true)
    fi
    echo "rmse $i->$((i + 1)): $metric" | tee -a "$METRIC_FILE"
  done

  echo
  echo "RMSE metrics:"
  cat "$METRIC_FILE"
else
  echo "ImageMagick not found: using Sharp fallback for previews (no RMSE diffs)."
  node "$PROJECT_ROOT/tools/mix-temple/visual_qa_previews.mjs"
fi

echo
echo "Done. Open bundle:"
echo "  $QA_ROOT"
