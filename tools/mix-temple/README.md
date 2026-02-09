# Mix Temple Render Pipeline

Reproducible Blender pipeline for THE MIX TEMPLE frame assets used by the homepage section.

## Prerequisites

- Blender CLI installed and available as `blender`
- Node.js + npm
- macOS `sips` (validator dependency)

## Option A Source-Of-Truth

- `/Users/cloutlandishllc/Downloads/calamari-crystal-site/mix-temple.blend` is intentionally local and ignored.
- Tracked source-of-truth for regeneration is this scripts directory.

## Commands (from repo root)

1. Create or refresh the local blend scene:

```bash
npm run mix-temple:setup
```

2. Render all five 4K transparent PNG frames with locked overlays:

```bash
npm run mix-temple:render
```

3. Validate required output contract:

```bash
npm run mix-temple:validate
```

4. Run full pipeline in one command:

```bash
npm run mix-temple:all
```

## Expected Output Files

- `public/mix-temple/frame-0-hero.png`
- `public/mix-temple/frame-1-screen-brain.png`
- `public/mix-temple/frame-2-capture-chain.png`
- `public/mix-temple/frame-3-monitors.png`
- `public/mix-temple/frame-4-logic-pro-workflow.png`

Validator pass criteria:

- file exists
- PNG format
- resolution `3840x2160`
- alpha channel present
- non-trivial file size threshold

## Build + Route Smoke

After rerendering and validation:

```bash
npm run build
npm run preview
```

Verify `/`, `/services`, `/contact`, and `/press` load.
