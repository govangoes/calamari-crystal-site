# Mix Temple Phase 2 Plan

## Scope Summary

Phase 2 adds a small set of high-signal physical elements and up to three optional story frames that deepen the "decision speed -> clean capture -> translation confidence -> delivery" narrative without cluttering the current hero composition.

## 1) Candidate Item List (Clean, Non-Cluttered)

1. Low-profile keyboard (centered, shallow depth, no gamer styling).
2. Minimal mouse/trackball (right side, low silhouette).
3. Headphone stand + neutral headphones (left-mid accent, vertical anchor).
4. Compact MIDI controller (narrow footprint, lower-third placement).
5. 1U rack channel strip/preamp (subtle backend layer under monitor line).
6. Patchbay strip (rear desk line, cable-story support only).
7. Small desk acoustic absorber blocks (far left/right rear, very low contrast).
8. Cable management anchors/clips (functional detail, no focal competition).

Selection rule: choose 3-4 items total for first Phase 2 increment; do not add more in one release.

## 2) Proposed New Step Frames (3 Additional Frames)

### Frame 5: `frame-5-control-surface.png`

- Frame intent: emphasize fast tactile decisions and session velocity.
- Overlay approach: wireframe contour on keyboard + mouse only (thin cyan with low-strength prism accents).
- Outcome-first support: "Faster navigation, fewer interruptions, tighter revisions."

### Frame 6: `frame-6-room-confidence.png`

- Frame intent: show monitoring confidence from room/placement discipline.
- Overlay approach: soft glow-path arcs from speakers to listener zone plus tiny contour hints on treatment accents.
- Outcome-first support: "Mix choices translate because monitoring context is controlled."

### Frame 7: `frame-7-delivery-chain.png`

- Frame intent: highlight export/print/delivery readiness with minimal visual noise.
- Overlay approach: screen-lane overlay variant (shorter lanes, fewer clips) + one contour on final output device node.
- Outcome-first support: "Delivery-ready masters with clean handoff artifacts."

Guardrail: keep overlays contour/path-based only; no filled slabs and no UI iconography.

## 3) Asset Strategy

### Source and Licensing

- Prefer production-ready real models (GLB/OBJ/FBX) from commercial/royalty-free marketplaces or manufacturer CAD when available.
- Required license metadata per asset in `assets/mix-temple/LICENSES.md`:
  - source URL
  - creator/vendor
  - license type and redistribution terms
  - purchase/order reference where applicable
  - transformation notes (logo removal, decimation, material harmonization)

### Asset Locations

- Models: `assets/mix-temple/models/`
- Textures (if used): `assets/mix-temple/textures/`

### Manifest Additions Required

Add new `instances` entries in `assets/mix-temple/manifest.json` with:

- `id`
- `file`
- `name`
- `role`
- `location`
- `rotation_deg`
- `scale`

Suggested naming convention:

- `keyboard_lowprofile.glb`, `mouse_minimal.glb`, `headphones_stand.glb`, `midi_compact.glb`, `rack_1u.glb`, `patchbay_1u.glb`

Add overlay controls for new frames under `overlays`:

- `frame5_control_ids`
- `frame6_translation_paths`
- `frame7_delivery_screen_*`

## 4) Acceptance Criteria

### Premium Bar Checklist

1. Silhouette fidelity: each new item is instantly recognizable at hero scale.
2. Material quality: neutralized PBR with believable roughness variation and edge catchlights.
3. Lighting integration: new items match existing key/rim/fill response; no disconnected brightness.
4. Alpha edge quality: no visible fringing on dark backgrounds around thin geometry.
5. Overlay clarity: exactly one message per frame, with non-blocking contour/path overlays.
6. Mobile readability: overlay intent remains obvious in narrow viewport and during scroll transitions.

### Performance Constraints

1. Keep all-frame PNG total under 9.5 MB target (hard cap 12 MB).
2. Export WebP derivatives for runtime usage with per-frame target under 450 KB at display resolution.
3. Preserve immutable cache headers for generated frame assets.
4. Keep lazy-loading for non-active frame assets and prefetch only next/previous step.
5. Avoid adding runtime JS animation cost; transitions stay CSS/opacity-based.
