# Mix Temple Render Pipeline

Reproducible Blender pipeline for THE MIX TEMPLE frame assets used by the homepage section.

## Prerequisites

- Blender CLI installed and available as `blender`
- Node.js + npm
- macOS `sips` (validator dependency)

## Option A Source-Of-Truth

- `/Users/cloutlandishllc/Downloads/calamari-crystal-site/mix-temple.blend` is intentionally local and ignored.
- Tracked source-of-truth for regeneration:
  - `/Users/cloutlandishllc/Downloads/calamari-crystal-site/tools/mix-temple/`
  - `/Users/cloutlandishllc/Downloads/calamari-crystal-site/assets/mix-temple/manifest.json`
  - `/Users/cloutlandishllc/Downloads/calamari-crystal-site/assets/mix-temple/LICENSES.md`

## Asset Inputs

- Generated free/no-logo model files live at:
  - `/Users/cloutlandishllc/Downloads/calamari-crystal-site/assets/mix-temple/models/`
- Texture files (if needed later) live at:
  - `/Users/cloutlandishllc/Downloads/calamari-crystal-site/assets/mix-temple/textures/`

## Proof-First Workflow (from repo root)

```bash
npm run mix-temple:proof
```

`mix-temple:proof` runs:

1. `mix-temple:assets` (procedurally build free/no-logo GLB assets)
2. `mix-temple:setup` (create locked scene from manifest, 4K, transparent alpha)
3. `render_batch.py --proof` (render `frame-0-hero.png` and `frame-2-capture-chain.png` at faster proof samples)
4. validator on those two files only

## Expected Output Files

- `public/mix-temple/frame-0-hero.png`
- `public/mix-temple/frame-1-screen-brain.png`
- `public/mix-temple/frame-2-capture-chain.png`
- `public/mix-temple/frame-3-monitors.png`
- `public/mix-temple/frame-4-logic-pro-workflow.png`

Render intent:

- `frame-0-hero.png` includes the `BASE` collection (hero composition).
- `frame-1` through `frame-4` are transparent overlays only (base hidden), designed to stack on top
  of `frame-0-hero.png` in the web section.

Validator pass criteria:

- file exists
- PNG format
- resolution `3840x2160`
- alpha channel present
- non-trivial file size threshold

## Full Workflow

1. Create/refresh assets + scene:

```bash
npm run mix-temple:setup
```

2. Render all five frames:

```bash
npm run mix-temple:render
```

3. Validate all outputs:

```bash
npm run mix-temple:validate
```

4. Full pipeline in one command:

```bash
npm run mix-temple:all
```

## Model Quality Constraints

- No downloaded third-party meshes are required for V2 in this repo.
- No logos or trademarks are embedded in generated meshes.
- Geometry + materials are generated reproducibly by `build_asset_library.py`.

## Build + Route Smoke

After rerendering and validation:

```bash
npm run build
npm run preview
```

Verify `/`, `/services`, `/contact`, and `/press` load.

## Visual QA

Run the harness:

```bash
tools/mix-temple/visual_qa.sh
```

What it does:

- prints preview command (`npm run preview -- --host 127.0.0.1 --port 4176`)
- prints manual QA checklist for alpha edges, transition stability, and overlay clarity
- writes a quick QA bundle to `/tmp/mix-temple-qa/`
- generates downscaled JPG previews for all five frames
- generates RMSE diff images + metrics for frame transitions `0->1`, `1->2`, `2->3`, `3->4` when ImageMagick is available
- falls back to `tools/mix-temple/visual_qa_previews.mjs` (Sharp-only previews) when ImageMagick is unavailable
