#!/usr/bin/env python3
"""Batch render THE MIX TEMPLE frame set from a locked Blender scene."""

import os
import sys

import bpy

PROJECT_ROOT = "/Users/cloutlandishllc/Downloads/calamari-crystal-site"
OUT_DIR = os.path.join(PROJECT_ROOT, "public", "mix-temple")
BLEND_PATH = os.path.join(PROJECT_ROOT, "mix-temple.blend")

OVERLAY_COLLECTIONS = [
    "FRAME_1_SCREEN_BRAIN",
    "FRAME_2_CAPTURE_CHAIN",
    "FRAME_3_MONITORS",
    "FRAME_4_DAW",
]

FRAMES = [
    ("frame-0-hero.png", set()),
    ("frame-1-screen-brain.png", {"FRAME_1_SCREEN_BRAIN"}),
    ("frame-2-capture-chain.png", {"FRAME_2_CAPTURE_CHAIN"}),
    ("frame-3-monitors.png", {"FRAME_3_MONITORS"}),
    ("frame-4-logic-pro-workflow.png", {"FRAME_4_DAW"}),
]


def parse_args():
    args = []
    if "--" in sys.argv:
        args = sys.argv[sys.argv.index("--") + 1 :]

    options = {
        "lock_base": False,
        "only": None,
    }

    for idx, arg in enumerate(args):
        if arg == "--lock-base":
            options["lock_base"] = True
        elif arg.startswith("--only="):
            options["only"] = arg.split("=", 1)[1]
        elif arg == "--only" and idx + 1 < len(args):
            options["only"] = args[idx + 1]

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
    scene.cycles.samples = max(scene.cycles.samples, 256)
    scene.cycles.use_adaptive_sampling = True
    scene.cycles.adaptive_threshold = min(getattr(scene.cycles, "adaptive_threshold", 0.02), 0.02)
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


def selected_frames(only_filename):
    if not only_filename:
        return FRAMES

    filtered = [frame for frame in FRAMES if frame[0] == only_filename]
    if not filtered:
        known = ", ".join(name for name, _ in FRAMES)
        raise RuntimeError(f"Unknown --only target '{only_filename}'. Expected one of: {known}")
    return filtered


def render_frame(scene, filename, active_overlays):
    set_collection_enabled("BASE", True)

    for overlay in OVERLAY_COLLECTIONS:
        set_collection_enabled(overlay, overlay in active_overlays)

    output_path = os.path.join(OUT_DIR, filename)
    scene.render.filepath = output_path
    bpy.ops.render.render(write_still=True)
    print(f"Rendered {filename} with overlays: {sorted(active_overlays) if active_overlays else 'none'}")


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

    for filename, active_overlays in selected_frames(options["only"]):
        render_frame(scene, filename, active_overlays)

    # Restore overlay off-state at end.
    for overlay in OVERLAY_COLLECTIONS:
        set_collection_enabled(overlay, False)

    bpy.ops.wm.save_mainfile(filepath=bpy.data.filepath or BLEND_PATH)
    print("Batch complete.")


if __name__ == "__main__":
    main()
