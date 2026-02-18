#!/usr/bin/env python3
"""Batch render THE MIX TEMPLE frame set from a locked Blender scene."""

import os
import sys

import bpy

PROJECT_ROOT = "/Users/cloutlandishllc/Downloads/calamari-crystal-site"
OUT_DIR = os.path.join(PROJECT_ROOT, "public", "mix-temple")
BLEND_PATH = os.path.join(PROJECT_ROOT, "mix-temple.blend")
SAMPLES = int(os.getenv("MIX_TEMPLE_SAMPLES", "128"))

OVERLAY_COLLECTIONS = [
    "FRAME_1_SCREEN_BRAIN",
    "FRAME_2_CAPTURE_CHAIN",
    "FRAME_3_MONITORS",
    "FRAME_4_DAW",
]

FRAMES = [
    ("frame-0-hero.png", set(), True),
    ("frame-1-screen-brain.png", {"FRAME_1_SCREEN_BRAIN"}, False),
    ("frame-2-capture-chain.png", {"FRAME_2_CAPTURE_CHAIN"}, False),
    ("frame-3-monitors.png", {"FRAME_3_MONITORS"}, False),
    ("frame-4-logic-pro-workflow.png", {"FRAME_4_DAW"}, False),
]

PROOF_FRAME_NAMES = {"frame-0-hero.png", "frame-2-capture-chain.png"}


def parse_args():
    args = []
    if "--" in sys.argv:
        args = sys.argv[sys.argv.index("--") + 1 :]

    options = {
        "lock_base": False,
        "only": [],
        "proof": False,
    }

    idx = 0
    while idx < len(args):
        arg = args[idx]
        if arg == "--lock-base":
            options["lock_base"] = True
        elif arg == "--proof":
            options["proof"] = True
        elif arg.startswith("--only="):
            options["only"].extend([part for part in arg.split("=", 1)[1].split(",") if part])
        elif arg == "--only" and idx + 1 < len(args):
            options["only"].extend([part for part in args[idx + 1].split(",") if part])
            idx += 1
        idx += 1

    return options


def ensure_collection(name):
    collection = bpy.data.collections.get(name)
    if collection is None:
        raise RuntimeError(f"Missing collection: {name}")
    return collection


def set_collection_enabled(name, enabled):
    collection = ensure_collection(name)
    collection.hide_render = not enabled
    collection.hide_viewport = not enabled


def configure_render_settings(scene):
    scene.render.engine = "CYCLES"
    scene.cycles.samples = max(SAMPLES, 32)
    scene.cycles.use_adaptive_sampling = True
    scene.cycles.adaptive_threshold = min(getattr(scene.cycles, "adaptive_threshold", 0.02), 0.02)
    if hasattr(scene.cycles, "filter_width"):
        scene.cycles.filter_width = 1.0
    if hasattr(scene.cycles, "use_denoising"):
        scene.cycles.use_denoising = True
    if scene.view_layers and hasattr(scene.view_layers[0], "cycles"):
        if hasattr(scene.view_layers[0].cycles, "use_denoising"):
            scene.view_layers[0].cycles.use_denoising = True
    scene.render.resolution_x = 3840
    scene.render.resolution_y = 2160
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.color_depth = "8"
    scene.render.image_settings.compression = 95
    scene.view_settings.view_transform = "Filmic"
    scene.view_settings.look = "Medium High Contrast"
    scene.view_settings.exposure = 0.15


def lock_object_transforms(obj):
    obj.lock_location = (True, True, True)
    obj.lock_rotation = (True, True, True)
    obj.lock_scale = (True, True, True)


def lock_scene_invariants():
    base_collection = ensure_collection("BASE")
    for obj in base_collection.objects:
        lock_object_transforms(obj)

    for obj in bpy.data.objects:
        if obj.type in {"CAMERA", "LIGHT"}:
            lock_object_transforms(obj)


def selected_frames(only_filenames, proof_mode):
    if proof_mode and only_filenames:
        raise RuntimeError("Do not combine --proof with --only.")

    if proof_mode:
        return [frame for frame in FRAMES if frame[0] in PROOF_FRAME_NAMES]

    if not only_filenames:
        return FRAMES

    targets = set(only_filenames)
    filtered = [frame for frame in FRAMES if frame[0] in targets]
    if not filtered:
        known = ", ".join(name for name, _, _ in FRAMES)
        raise RuntimeError(f"Unknown --only target(s). Expected one of: {known}")
    if len(filtered) != len(targets):
        known = {name for name, _, _ in FRAMES}
        unknown = sorted(targets - known)
        raise RuntimeError(f"Unknown --only target(s): {', '.join(unknown)}")
    return filtered


def render_frame(scene, filename, active_overlays, include_base):
    set_collection_enabled("BASE", include_base)

    for overlay in OVERLAY_COLLECTIONS:
        set_collection_enabled(overlay, overlay in active_overlays)

    output_path = os.path.join(OUT_DIR, filename)
    scene.render.filepath = output_path
    bpy.ops.render.render(write_still=True)
    print(
        f"Rendered {filename} with overlays: {sorted(active_overlays) if active_overlays else 'none'}"
        f" | include_base={include_base}"
    )


def main():
    if not bpy.data.filepath:
        raise RuntimeError(
            "No .blend loaded. Run with blender -b /Users/cloutlandishllc/Downloads/calamari-crystal-site/mix-temple.blend --python tools/mix-temple/render_batch.py"
        )

    os.makedirs(OUT_DIR, exist_ok=True)
    options = parse_args()

    scene = bpy.context.scene
    configure_render_settings(scene)

    ensure_collection("BASE")
    for overlay in OVERLAY_COLLECTIONS:
        ensure_collection(overlay)

    if options["lock_base"]:
        lock_scene_invariants()
        bpy.ops.wm.save_mainfile(filepath=bpy.data.filepath or BLEND_PATH)
        print("Locked BASE/CAMERA/LIGHT transforms and saved blend.")

    for filename, active_overlays, include_base in selected_frames(options["only"], options["proof"]):
        render_frame(scene, filename, active_overlays, include_base)

    # Restore overlay off-state at end.
    for overlay in OVERLAY_COLLECTIONS:
        set_collection_enabled(overlay, False)

    bpy.ops.wm.save_mainfile(filepath=bpy.data.filepath or BLEND_PATH)
    print("Batch complete.")


if __name__ == "__main__":
    main()
