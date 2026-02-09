#!/usr/bin/env python3
"""Create a locked Blender scene for THE MIX TEMPLE frame set."""

import math
import os

import bpy
import mathutils

PROJECT_ROOT = "/Users/cloutlandishllc/Downloads/calamari-crystal-site"
BLEND_PATH = os.path.join(PROJECT_ROOT, "mix-temple.blend")
OUT_DIR = os.path.join(PROJECT_ROOT, "public", "mix-temple")

FRAME_OVERLAYS = [
    "FRAME_1_SCREEN_BRAIN",
    "FRAME_2_CAPTURE_CHAIN",
    "FRAME_3_MONITORS",
    "FRAME_4_DAW",
]


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 256
    scene.cycles.use_adaptive_sampling = True
    scene.cycles.adaptive_threshold = 0.02
    if hasattr(scene.cycles, "use_denoising"):
        scene.cycles.use_denoising = True
    if scene.view_layers and hasattr(scene.view_layers[0], "cycles"):
        if hasattr(scene.view_layers[0].cycles, "use_denoising"):
            scene.view_layers[0].cycles.use_denoising = True
    scene.render.resolution_x = 3840
    scene.render.resolution_y = 2160
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.view_settings.view_transform = "Filmic"
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.color_depth = "8"
    scene.render.image_settings.compression = 95
    scene.render.filepath = os.path.join(OUT_DIR, "frame-0-hero.png")
    return scene


def ensure_collection(name, parent):
    collection = bpy.data.collections.get(name)
    if collection is None:
        collection = bpy.data.collections.new(name)
    if collection.name not in parent.children.keys():
        parent.children.link(collection)
    return collection


def move_to_collection(obj, target_collection):
    for existing in list(obj.users_collection):
        existing.objects.unlink(obj)
    target_collection.objects.link(obj)


def look_at(obj, target_location):
    direction = mathutils.Vector(target_location) - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def make_material(
    name,
    *,
    base=(0.03, 0.03, 0.035, 1.0),
    metallic=0.0,
    roughness=0.4,
    emission_color=None,
    emission_strength=0.0,
):
    material = bpy.data.materials.new(name=name)
    material.use_nodes = True
    nodes = material.node_tree.nodes
    links = material.node_tree.links
    nodes.clear()

    output = nodes.new("ShaderNodeOutputMaterial")
    bsdf = nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.inputs["Base Color"].default_value = base
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness

    if emission_color is not None and emission_strength > 0:
        emission = nodes.new("ShaderNodeEmission")
        emission.inputs["Color"].default_value = emission_color
        emission.inputs["Strength"].default_value = emission_strength
        add_shader = nodes.new("ShaderNodeAddShader")
        links.new(bsdf.outputs["BSDF"], add_shader.inputs[0])
        links.new(emission.outputs["Emission"], add_shader.inputs[1])
        links.new(add_shader.outputs["Shader"], output.inputs["Surface"])
    else:
        links.new(bsdf.outputs["BSDF"], output.inputs["Surface"])

    return material


def create_box(name, location, scale, material, collection):
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=location)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = scale
    obj.data.materials.append(material)
    move_to_collection(obj, collection)
    return obj


def create_cylinder(name, location, radius, depth, rotation, material, collection):
    bpy.ops.mesh.primitive_cylinder_add(radius=radius, depth=depth, location=location, rotation=rotation)
    obj = bpy.context.active_object
    obj.name = name
    obj.data.materials.append(material)
    move_to_collection(obj, collection)
    return obj


def create_torus(name, location, major_radius, minor_radius, rotation, material, collection):
    bpy.ops.mesh.primitive_torus_add(
        major_radius=major_radius,
        minor_radius=minor_radius,
        location=location,
        rotation=rotation,
    )
    obj = bpy.context.active_object
    obj.name = name
    obj.data.materials.append(material)
    move_to_collection(obj, collection)
    return obj


def create_cable(name, start, end, radius, material, collection):
    start_vec = mathutils.Vector(start)
    end_vec = mathutils.Vector(end)
    vector = end_vec - start_vec
    midpoint = (start_vec + end_vec) / 2

    bpy.ops.mesh.primitive_cylinder_add(radius=radius, depth=vector.length, location=midpoint)
    obj = bpy.context.active_object
    obj.name = name
    obj.data.materials.append(material)
    obj.rotation_mode = "QUATERNION"
    obj.rotation_quaternion = vector.to_track_quat("Z", "Y")
    move_to_collection(obj, collection)
    return obj


def duplicate_glow(source_obj, name, material, collection, scale_factor=(1.01, 1.03, 1.02)):
    dup = source_obj.copy()
    dup.data = source_obj.data.copy()
    dup.name = name
    dup.scale = (
        source_obj.scale.x * scale_factor[0],
        source_obj.scale.y * scale_factor[1],
        source_obj.scale.z * scale_factor[2],
    )
    dup.data.materials.clear()
    dup.data.materials.append(material)
    bpy.context.scene.collection.objects.link(dup)
    move_to_collection(dup, collection)
    return dup


def add_area_light(name, location, target, size, energy, color):
    light_data = bpy.data.lights.new(name=name, type="AREA")
    light_data.energy = energy
    light_data.shape = "RECTANGLE"
    light_data.size = size[0]
    light_data.size_y = size[1]
    light_data.color = color

    light_obj = bpy.data.objects.new(name, light_data)
    bpy.context.scene.collection.objects.link(light_obj)
    light_obj.location = location
    look_at(light_obj, target)
    return light_obj


def build_scene():
    scene = reset_scene()
    os.makedirs(OUT_DIR, exist_ok=True)

    root_collection = scene.collection
    base = ensure_collection("BASE", root_collection)
    frame1 = ensure_collection("FRAME_1_SCREEN_BRAIN", root_collection)
    frame2 = ensure_collection("FRAME_2_CAPTURE_CHAIN", root_collection)
    frame3 = ensure_collection("FRAME_3_MONITORS", root_collection)
    frame4 = ensure_collection("FRAME_4_DAW", root_collection)

    world = bpy.data.worlds.new("MixTempleWorld")
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    bg.inputs[0].default_value = (0.02, 0.02, 0.022, 1.0)
    bg.inputs[1].default_value = 0.0

    # Camera: near-orthographic, locked look direction.
    camera_data = bpy.data.cameras.new("MixTempleCamera")
    camera_data.type = "ORTHO"
    camera_data.ortho_scale = 8.2
    camera = bpy.data.objects.new("MixTempleCamera", camera_data)
    root_collection.objects.link(camera)
    camera.location = (0.0, -7.2, 1.2)
    look_at(camera, (0.0, 0.0, 1.05))
    scene.camera = camera

    # Lighting: fixed luxury rim setup.
    add_area_light("Key", (0.0, -3.4, 3.1), (0.0, 0.0, 1.0), (4.2, 2.8), 260, (1.0, 1.0, 1.0))
    add_area_light("RimLeft", (-4.4, -2.7, 1.7), (0.0, -0.2, 1.0), (3.2, 1.8), 550, (1.0, 0.66, 1.0))
    add_area_light("RimRight", (4.4, -2.7, 1.7), (0.0, -0.2, 1.0), (3.2, 1.8), 550, (0.62, 0.88, 1.0))

    # Materials.
    mat_black = make_material("Mat_Black", base=(0.02, 0.02, 0.024, 1.0), metallic=0.2, roughness=0.35)
    mat_metal = make_material("Mat_Metal", base=(0.56, 0.58, 0.62, 1.0), metallic=1.0, roughness=0.26)
    mat_screen = make_material("Mat_Screen", base=(0.01, 0.01, 0.014, 1.0), metallic=0.0, roughness=0.08)
    mat_desk = make_material("Mat_Desk", base=(0.01, 0.01, 0.012, 1.0), metallic=0.0, roughness=0.72)
    mat_glow_cyan = make_material(
        "Mat_Glow_Cyan",
        base=(0.0, 0.0, 0.0, 1.0),
        metallic=0.0,
        roughness=0.4,
        emission_color=(0.18, 0.62, 1.0, 1.0),
        emission_strength=1.95,
    )
    mat_glow_prism = make_material(
        "Mat_Glow_Prism",
        base=(0.0, 0.0, 0.0, 1.0),
        metallic=0.0,
        roughness=0.4,
        emission_color=(0.84, 0.38, 1.0, 1.0),
        emission_strength=1.5,
    )
    mat_daw_line = make_material(
        "Mat_DawLine",
        base=(0.0, 0.0, 0.0, 1.0),
        metallic=0.0,
        roughness=0.2,
        emission_color=(0.4, 0.82, 1.0, 1.0),
        emission_strength=1.0,
    )

    # Base rig geometry.
    create_box("Desk", (0.0, 0.28, -0.01), (5.6, 1.8, 0.02), mat_desk, base)

    odyssey = create_box("Odyssey", (0.0, 0.0, 1.3), (3.2, 0.06, 0.7), mat_black, base)
    create_box("OdysseyScreen", (0.0, -0.047, 1.3), (3.05, 0.008, 0.62), mat_screen, base)
    create_cylinder("MonitorStandStem", (0.0, 0.0, 0.83), 0.11, 0.45, (0.0, 0.0, 0.0), mat_metal, base)
    create_box("MonitorStandBase", (0.0, 0.0, 0.61), (0.66, 0.34, 0.035), mat_metal, base)

    mac = create_box("MacStudio", (0.0, -0.04, 0.3), (0.45, 0.45, 0.14), mat_metal, base)
    zen = create_box("ZenGo", (1.16, -0.05, 0.255), (0.35, 0.18, 0.06), mat_black, base)

    speaker_l = create_box("ADAM_L", (-2.24, 0.0, 0.58), (0.25, 0.22, 0.55), mat_black, base)
    speaker_r = create_box("ADAM_R", (2.24, 0.0, 0.58), (0.25, 0.22, 0.55), mat_black, base)
    woofer_l = create_torus(
        "ADAM_L_Woofer",
        (-2.24, -0.192, 0.53),
        0.108,
        0.014,
        (math.radians(-90), 0.0, 0.0),
        mat_black,
        base,
    )
    woofer_r = create_torus(
        "ADAM_R_Woofer",
        (2.24, -0.192, 0.53),
        0.108,
        0.014,
        (math.radians(-90), 0.0, 0.0),
        mat_black,
        base,
    )

    create_cylinder(
        "SM7B",
        (-3.08, -0.08, 0.58),
        0.07,
        0.36,
        (0.0, math.radians(90), math.radians(22)),
        mat_black,
        base,
    )
    create_cylinder(
        "BoomArm",
        (-3.2, 0.03, 0.89),
        0.02,
        1.42,
        (math.radians(32), 0.0, math.radians(14)),
        mat_metal,
        base,
    )

    cloud = create_box("Cloudlifter", (-2.55, -0.03, 0.232), (0.18, 0.06, 0.04), mat_black, base)

    create_cable("XLR_1", (-3.08, -0.08, 0.58), (-2.55, -0.03, 0.232), 0.0075, mat_black, base)
    create_cable("XLR_2", (-2.55, -0.03, 0.232), (1.16, -0.05, 0.255), 0.0075, mat_black, base)
    create_cable("TB_1", (1.16, -0.05, 0.255), (0.0, -0.04, 0.3), 0.0055, mat_black, base)

    # Frame 1 overlay: screen + brain glow.
    duplicate_glow(odyssey, "Odyssey_Glow", mat_glow_prism, frame1, (1.01, 1.06, 1.02))
    duplicate_glow(mac, "MacStudio_Glow", mat_glow_cyan, frame1, (1.03, 1.03, 1.04))

    # Frame 2 overlay: capture chain glow.
    create_cable("Glow_XLR_1", (-3.08, -0.08, 0.58), (-2.55, -0.03, 0.232), 0.011, mat_glow_cyan, frame2)
    create_cable("Glow_XLR_2", (-2.55, -0.03, 0.232), (1.16, -0.05, 0.255), 0.011, mat_glow_cyan, frame2)
    create_cable("Glow_TB_1", (1.16, -0.05, 0.255), (0.0, -0.04, 0.3), 0.009, mat_glow_cyan, frame2)

    # Frame 3 overlay: monitor woofer glow.
    duplicate_glow(woofer_l, "ADAM_L_Woofer_Glow", mat_glow_prism, frame3, (1.0, 1.0, 1.0))
    duplicate_glow(woofer_r, "ADAM_R_Woofer_Glow", mat_glow_prism, frame3, (1.0, 1.0, 1.0))

    # Frame 4 overlay: abstract DAW lines on the screen.
    create_box("DAW_ScreenGlow", (0.0, -0.046, 1.3), (3.02, 0.004, 0.6), mat_glow_cyan, frame4)
    lane_z = [1.58, 1.49, 1.4, 1.31, 1.22, 1.13, 1.04]
    lane_lengths = [1.8, 2.2, 1.3, 2.5, 1.7, 2.0, 1.4]
    for idx, z in enumerate(lane_z):
        lane = create_box(
            f"DAW_Lane_{idx+1}",
            (0.0, -0.052, z),
            (2.9, 0.0025, 0.012),
            mat_daw_line,
            frame4,
        )
        lane.scale.x = 2.9
        # Add clip blocks per lane for abstract timeline rhythm.
        for block_idx in range(4):
            x = -2.2 + block_idx * 1.35 + (0.12 if idx % 2 == 0 else -0.08)
            width = 0.24 + (0.16 * ((idx + block_idx) % 3))
            create_box(
                f"DAW_Lane_{idx+1}_Block_{block_idx+1}",
                (x, -0.053, z),
                (width, 0.0026, 0.02),
                mat_glow_prism if block_idx % 2 == 0 else mat_daw_line,
                frame4,
            )

    # Lock overlay visibility off by default.
    for overlay_name in FRAME_OVERLAYS:
        overlay = bpy.data.collections.get(overlay_name)
        overlay.hide_viewport = True
        overlay.hide_render = True

    bpy.ops.wm.save_mainfile(filepath=BLEND_PATH)

    print("Scene ready:", BLEND_PATH)
    print("Output directory:", OUT_DIR)
    print("Render frame-0 with BASE only; then render_batch.py for all five frames.")


if __name__ == "__main__":
    build_scene()
