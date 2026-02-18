#!/usr/bin/env python3
"""Create a locked Blender scene for THE MIX TEMPLE using manifest-driven assets."""

import json
import math
import os
from typing import Dict, List

import bpy
import mathutils

PROJECT_ROOT = "/Users/cloutlandishllc/Downloads/calamari-crystal-site"
BLEND_PATH = os.path.join(PROJECT_ROOT, "mix-temple.blend")
OUT_DIR = os.path.join(PROJECT_ROOT, "public", "mix-temple")
MANIFEST_PATH = os.path.join(PROJECT_ROOT, "assets", "mix-temple", "manifest.json")
SAMPLES = int(os.getenv("MIX_TEMPLE_SAMPLES", "128"))

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
    scene.cycles.samples = max(SAMPLES, 32)
    scene.cycles.use_adaptive_sampling = True
    scene.cycles.adaptive_threshold = 0.02
    if hasattr(scene.cycles, "filter_width"):
        scene.cycles.filter_width = 1.0
    if hasattr(scene.cycles, "use_denoising"):
        scene.cycles.use_denoising = True
    if scene.view_layers and hasattr(scene.view_layers[0], "cycles"):
        if hasattr(scene.view_layers[0].cycles, "use_denoising"):
            scene.view_layers[0].cycles.use_denoising = True
    if hasattr(scene.cycles, "seed"):
        scene.cycles.seed = 23
    if hasattr(scene.cycles, "use_animated_seed"):
        scene.cycles.use_animated_seed = False
    scene.render.resolution_x = 3840
    scene.render.resolution_y = 2160
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.view_settings.view_transform = "Filmic"
    scene.view_settings.look = "Medium High Contrast"
    scene.view_settings.exposure = 0.15
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


def link_hierarchy_to_collection(root, target_collection):
    move_to_collection(root, target_collection)
    for child in root.children_recursive:
        move_to_collection(child, target_collection)


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
    link_hierarchy_to_collection(obj, collection)
    return obj


def make_shadow_catcher(location=(0, 0, 0), size=14):
    bpy.ops.mesh.primitive_plane_add(size=size, location=location)
    plane = bpy.context.active_object
    plane.name = "ShadowCatcher"
    try:
        plane.is_shadow_catcher = True
    except Exception:
        pass
    try:
        plane.cycles.is_shadow_catcher = True
    except Exception:
        pass
    return plane


def add_grounding_desk(collection):
    mat = make_material("Mat_DeskGround", base=(0.035, 0.04, 0.045, 1.0), metallic=0.26, roughness=0.25)
    bpy.ops.mesh.primitive_cube_add(location=(0, 0.18, 0.018), scale=(5.9, 1.45, 0.018))
    desk = bpy.context.active_object
    desk.name = "DeskGround"
    desk.data.materials.append(mat)
    link_hierarchy_to_collection(desk, collection)
    return desk


def load_manifest():
    if not os.path.exists(MANIFEST_PATH):
        raise FileNotFoundError(f"Manifest missing: {MANIFEST_PATH}")
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def scrub_logo_markings(root):
    branding_terms = (
        "logo",
        "watermark",
        "decal",
        "brand",
        "samsung",
        "odyssey",
        "asus",
        "tuf",
        "rog",
        "shure",
        "rode",
        "krk",
        "adam",
        "dell",
        "philips",
    )

    for obj in [root, *root.children_recursive]:
        low_name = obj.name.lower()
        if "logo" in low_name or "watermark" in low_name:
            obj.hide_render = True
            obj.hide_viewport = True

        if obj.type != "MESH":
            continue
        for mat in obj.data.materials:
            if not mat or not mat.use_nodes:
                continue

            mat_low = mat.name.lower()
            branded_material = any(term in mat_low for term in branding_terms)

            for node in mat.node_tree.nodes:
                if node.type != "TEX_IMAGE" or node.image is None:
                    continue
                img_name = node.image.name.lower()
                if any(term in img_name for term in branding_terms):
                    node.mute = True
                    branded_material = True

            if branded_material:
                principled_nodes = [n for n in mat.node_tree.nodes if n.type == "BSDF_PRINCIPLED"]
                for node in principled_nodes:
                    node.inputs["Base Color"].default_value = (0.17, 0.18, 0.19, 1.0)
                    node.inputs["Roughness"].default_value = max(node.inputs["Roughness"].default_value, 0.3)


def neutralize_external_textures(root):
    """Disable image textures on imported assets to avoid visible brand marks."""
    for obj in [root, *root.children_recursive]:
        if obj.type != "MESH":
            continue
        for mat in obj.data.materials:
            if not mat or not mat.use_nodes:
                continue
            for node in mat.node_tree.nodes:
                if node.type == "TEX_IMAGE":
                    node.mute = True


def rebuild_principled(material, *, base, metallic, roughness, specular=0.42):
    if not material:
        return
    material.use_nodes = True
    nodes = material.node_tree.nodes
    links = material.node_tree.links
    nodes.clear()

    output = nodes.new("ShaderNodeOutputMaterial")
    bsdf = nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.inputs["Base Color"].default_value = base
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if "Specular IOR Level" in bsdf.inputs:
        bsdf.inputs["Specular IOR Level"].default_value = specular
    elif "Specular" in bsdf.inputs:
        bsdf.inputs["Specular"].default_value = specular
    links.new(bsdf.outputs["BSDF"], output.inputs["Surface"])


def harmonize_external_asset_materials(root, role):
    """Apply role-tuned neutral materials for imported assets."""
    for obj in [root, *root.children_recursive]:
        if obj.type != "MESH":
            continue

        for idx, mat in enumerate(obj.data.materials):
            if not mat:
                continue

            # Detach from shared datablocks so role/object tuning stays local.
            local_mat = mat.copy()
            obj.data.materials[idx] = local_mat

            mat_name = local_mat.name.lower()
            obj_name = obj.name.lower()
            descriptor = f"{obj_name} {mat_name}"

            if role == "monitor":
                if any(token in descriptor for token in ("display__0", "screen", "lcd")):
                    rebuild_principled(
                        local_mat,
                        base=(0.014, 0.016, 0.021, 1.0),
                        metallic=0.0,
                        roughness=0.055,
                        specular=0.24,
                    )
                elif any(token in descriptor for token in ("aluminum", "stand", "metal")):
                    rebuild_principled(
                        local_mat,
                        base=(0.61, 0.63, 0.66, 1.0),
                        metallic=1.0,
                        roughness=0.25,
                        specular=0.52,
                    )
                else:
                    rebuild_principled(
                        local_mat,
                        base=(0.075, 0.08, 0.088, 1.0),
                        metallic=0.12,
                        roughness=0.45,
                        specular=0.35,
                    )
            elif role == "speaker":
                if any(token in descriptor for token in ("driver", "woofer", "tweeter")):
                    rebuild_principled(
                        local_mat,
                        base=(0.14, 0.145, 0.155, 1.0),
                        metallic=0.02,
                        roughness=0.36,
                        specular=0.28,
                    )
                elif any(token in descriptor for token in ("chrome", "metal")):
                    rebuild_principled(
                        local_mat,
                        base=(0.54, 0.56, 0.58, 1.0),
                        metallic=1.0,
                        roughness=0.28,
                        specular=0.5,
                    )
                else:
                    rebuild_principled(
                        local_mat,
                        base=(0.082, 0.086, 0.094, 1.0),
                        metallic=0.05,
                        roughness=0.49,
                        specular=0.31,
                    )
            elif role == "mic":
                rebuild_principled(
                    local_mat,
                    base=(0.055, 0.06, 0.066, 1.0),
                    metallic=0.09,
                    roughness=0.5,
                    specular=0.3,
                )


def imported_objects_after(filepath):
    before = set(bpy.data.objects.keys())
    bpy.ops.import_scene.gltf(filepath=filepath)
    new_objs = [bpy.data.objects[name] for name in bpy.data.objects.keys() if name not in before]
    if not new_objs:
        raise RuntimeError(f"No objects imported from {filepath}")
    return new_objs


def collect_top_level(new_objects: List[bpy.types.Object]) -> List[bpy.types.Object]:
    new_set = set(new_objects)
    tops = []
    for obj in new_objects:
        if obj.parent not in new_set:
            tops.append(obj)
    return tops


def is_placeholder_cube(obj):
    if obj.type != "MESH":
        return False
    mats = [m.name for m in obj.data.materials if m]
    if mats != ["Material"]:
        return False
    corners = [mathutils.Vector(corner) for corner in obj.bound_box]
    min_v = mathutils.Vector((min(c.x for c in corners), min(c.y for c in corners), min(c.z for c in corners)))
    max_v = mathutils.Vector((max(c.x for c in corners), max(c.y for c in corners), max(c.z for c in corners)))
    size = max_v - min_v
    return abs(size.x - 2.0) < 1e-3 and abs(size.y - 2.0) < 1e-3 and abs(size.z - 2.0) < 1e-3


def remove_import_artifacts(objects: List[bpy.types.Object]) -> List[bpy.types.Object]:
    kept = []
    for obj in objects:
        if obj.name not in bpy.data.objects:
            continue
        if is_placeholder_cube(obj):
            bpy.data.objects.remove(obj, do_unlink=True)
            continue
        kept.append(obj)
    return kept


def set_root_pivot_bottom_center(root):
    if not root.children:
        return

    inv = root.matrix_world.inverted()
    points = []
    for obj in root.children_recursive:
        if obj.type != "MESH":
            continue
        for corner in obj.bound_box:
            points.append(inv @ (obj.matrix_world @ mathutils.Vector(corner)))

    if not points:
        return

    min_v = mathutils.Vector((min(p.x for p in points), min(p.y for p in points), min(p.z for p in points)))
    max_v = mathutils.Vector((max(p.x for p in points), max(p.y for p in points), max(p.z for p in points)))
    pivot = mathutils.Vector(((min_v.x + max_v.x) / 2, (min_v.y + max_v.y) / 2, min_v.z))

    for child in list(root.children):
        child.location -= pivot


def import_asset_instance(instance, model_root, base_collection):
    filepath = os.path.join(model_root, instance["file"])
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Asset missing for '{instance['id']}': {filepath}")

    imported = imported_objects_after(filepath)
    imported = remove_import_artifacts(imported)
    if not imported:
        raise RuntimeError(f"Imported asset had no usable objects: {filepath}")
    tops = collect_top_level(imported)

    root = bpy.data.objects.new(instance["name"], None)
    bpy.context.scene.collection.objects.link(root)

    for top in tops:
        top.parent = root

    loc = instance.get("location", [0.0, 0.0, 0.0])
    rot = instance.get("rotation_deg", [0.0, 0.0, 0.0])
    scl = instance.get("scale", [1.0, 1.0, 1.0])

    scrub_logo_markings(root)
    if instance.get("role") in {"monitor", "speaker", "mic"}:
        neutralize_external_textures(root)
        harmonize_external_asset_materials(root, instance["role"])
    set_root_pivot_bottom_center(root)

    root.location = tuple(float(v) for v in loc)
    root.rotation_euler = tuple(math.radians(float(v)) for v in rot)
    root.scale = tuple(float(v) for v in scl)

    link_hierarchy_to_collection(root, base_collection)
    return root


def world_bbox_extents(root):
    points = []
    for obj in [root, *root.children_recursive]:
        if obj.type != "MESH":
            continue
        for corner in obj.bound_box:
            points.append(obj.matrix_world @ mathutils.Vector(corner))

    if not points:
        origin = root.matrix_world.translation
        min_v = origin - mathutils.Vector((0.1, 0.1, 0.1))
        max_v = origin + mathutils.Vector((0.1, 0.1, 0.1))
        return min_v, max_v

    min_v = mathutils.Vector((min(p.x for p in points), min(p.y for p in points), min(p.z for p in points)))
    max_v = mathutils.Vector((max(p.x for p in points), max(p.y for p in points), max(p.z for p in points)))
    return min_v, max_v


def world_bbox(root):
    min_v, max_v = world_bbox_extents(root)
    center = (min_v + max_v) / 2
    half = (max_v - min_v) / 2
    return center, half


def create_glow_outline(name, center, half_extents, material, collection, pad=(0.04, 0.02, 0.02), thickness=0.01):
    bpy.ops.mesh.primitive_cube_add(location=center)
    outline = bpy.context.active_object
    outline.name = name
    outline.scale = (
        half_extents.x + pad[0],
        max(half_extents.y + pad[1], 0.01),
        half_extents.z + pad[2],
    )
    wireframe = outline.modifiers.new(name="Wireframe", type="WIREFRAME")
    wireframe.use_replace = True
    wireframe.use_even_offset = True
    wireframe.use_relative_offset = False
    wireframe.use_boundary = True
    wireframe.thickness = max(thickness, 0.002)
    outline.data.materials.append(material)
    link_hierarchy_to_collection(outline, collection)
    return outline


def apply_premium_polish(scene, root_collection, camera_settings=None):
    # World: near-black base with low-saturation edge-biased ultraviolet/cyan energy.
    world = bpy.data.worlds.new("MixTempleWorld")
    scene.world = world
    world.use_nodes = True
    wnodes = world.node_tree.nodes
    wlinks = world.node_tree.links
    wnodes.clear()

    w_out = wnodes.new("ShaderNodeOutputWorld")
    w_bg = wnodes.new("ShaderNodeBackground")
    w_bg.inputs["Strength"].default_value = 0.02
    w_mix = wnodes.new("ShaderNodeMixRGB")
    w_mix.blend_type = "MIX"
    w_mix.inputs["Fac"].default_value = 0.26
    w_mix.inputs["Color1"].default_value = (0.016, 0.018, 0.024, 1.0)

    w_coord = wnodes.new("ShaderNodeTexCoord")
    w_mapping = wnodes.new("ShaderNodeMapping")
    w_mapping.inputs["Scale"].default_value = (0.3, 1.0, 1.0)
    w_mapping.inputs["Rotation"].default_value = (0.0, 0.0, 0.02)
    w_grad = wnodes.new("ShaderNodeTexGradient")
    w_grad.gradient_type = "LINEAR"
    w_ramp = wnodes.new("ShaderNodeValToRGB")
    w_ramp.color_ramp.elements[0].position = 0.0
    w_ramp.color_ramp.elements[0].color = (0.08, 0.075, 0.14, 1.0)
    w_mid = w_ramp.color_ramp.elements.new(0.5)
    w_mid.color = (0.013, 0.015, 0.02, 1.0)
    w_ramp.color_ramp.elements[1].position = 1.0
    w_ramp.color_ramp.elements[1].color = (0.045, 0.085, 0.11, 1.0)

    wlinks.new(w_coord.outputs["Generated"], w_mapping.inputs["Vector"])
    wlinks.new(w_mapping.outputs["Vector"], w_grad.inputs["Vector"])
    wlinks.new(w_grad.outputs["Color"], w_ramp.inputs["Fac"])
    wlinks.new(w_ramp.outputs["Color"], w_mix.inputs["Color2"])
    wlinks.new(w_mix.outputs["Color"], w_bg.inputs["Color"])
    wlinks.new(w_bg.outputs["Background"], w_out.inputs["Surface"])

    # Camera: keep framing intent, perspective product lens, deterministic focus (no bokeh blur).
    camera_data = bpy.data.cameras.new("MixTempleCamera")
    camera_data.type = "PERSP"
    camera_defaults = {
        "lens": 95,
        "location": (0.0, -18.55, 1.24),
        "target": (0.0, -0.02, 0.5),
    }
    if camera_settings:
        camera_defaults["lens"] = float(camera_settings.get("lens", camera_defaults["lens"]))
        camera_defaults["location"] = tuple(camera_settings.get("location", camera_defaults["location"]))
        camera_defaults["target"] = tuple(camera_settings.get("target", camera_defaults["target"]))

    camera_data.lens = camera_defaults["lens"]
    camera_data.sensor_width = 36
    camera_data.dof.use_dof = False
    camera = bpy.data.objects.new("MixTempleCamera", camera_data)
    root_collection.objects.link(camera)
    camera.location = camera_defaults["location"]
    look_at(camera, camera_defaults["target"])
    scene.camera = camera

    # Filmic contrast polish to keep blacks deep without muddy midtone haze.
    scene.view_settings.look = "High Contrast"
    scene.view_settings.exposure = 0.06

    # Lighting: clean key + cyan rim + very low fill, keeping black depth intact.
    add_area_light(
        "Key",
        (0.06, -3.5, 3.72),
        (0.0, -0.02, 0.86),
        (4.2, 2.2),
        174,
        (0.96, 0.97, 1.0),
    )
    add_area_light(
        "RimCyan",
        (4.85, -1.18, 1.85),
        (0.0, -0.02, 0.78),
        (3.9, 0.38),
        83,
        (0.47, 0.75, 0.9),
    )
    add_area_light(
        "FillLow",
        (-3.2, -4.6, 1.6),
        (-0.2, -0.02, 0.76),
        (2.2, 0.8),
        15,
        (0.82, 0.81, 0.9),
    )


def build_scene():
    scene = reset_scene()
    os.makedirs(OUT_DIR, exist_ok=True)

    manifest = load_manifest()
    model_root = manifest["model_root"]

    root_collection = scene.collection
    base = ensure_collection("BASE", root_collection)
    frame1 = ensure_collection("FRAME_1_SCREEN_BRAIN", root_collection)
    frame2 = ensure_collection("FRAME_2_CAPTURE_CHAIN", root_collection)
    frame3 = ensure_collection("FRAME_3_MONITORS", root_collection)
    frame4 = ensure_collection("FRAME_4_DAW", root_collection)

    apply_premium_polish(scene, root_collection, manifest.get("camera"))

    add_grounding_desk(base)
    shadow_catcher = make_shadow_catcher(location=(0, 0, 0.0), size=16)
    link_hierarchy_to_collection(shadow_catcher, base)

    # Import manifest-driven assets.
    roots: Dict[str, bpy.types.Object] = {}
    for instance in manifest["instances"]:
        roots[instance["id"]] = import_asset_instance(instance, model_root, base)

    overlays = manifest["overlays"]

    # Overlay materials.
    mat_glow_cyan = make_material(
        "Mat_Glow_Cyan",
        base=(0.0, 0.0, 0.0, 1.0),
        metallic=0.0,
        roughness=0.4,
        emission_color=(0.2, 0.59, 0.95, 1.0),
        emission_strength=1.15,
    )
    mat_glow_prism = make_material(
        "Mat_Glow_Prism",
        base=(0.0, 0.0, 0.0, 1.0),
        metallic=0.0,
        roughness=0.4,
        emission_color=(0.76, 0.44, 0.95, 1.0),
        emission_strength=0.92,
    )
    mat_daw = make_material(
        "Mat_DAW",
        base=(0.0, 0.0, 0.0, 1.0),
        metallic=0.0,
        roughness=0.24,
        emission_color=(0.44, 0.84, 1.0, 1.0),
        emission_strength=0.86,
    )

    # Frame 1: screen + brain contours (wire outlines, no filled blocks).
    outline_pad = overlays.get("screen_outline_pad", [0.04, 0.02, 0.03])
    outline_thickness = float(overlays.get("screen_outline_thickness", 0.01))
    for idx, target_id in enumerate(overlays["screen_brain_ids"]):
        center, half = world_bbox(roots[target_id])
        mat = mat_glow_prism if idx == 0 else mat_glow_cyan
        id_thickness = outline_thickness if target_id == "odyssey" else outline_thickness * 0.58
        create_glow_outline(
            f"Glow_{target_id}",
            center,
            half,
            mat,
            frame1,
            pad=tuple(float(v) for v in outline_pad),
            thickness=id_thickness,
        )

    # Frame 2: capture chain glow path.
    points = overlays["capture_chain_points"]
    capture_chain_radius = float(overlays.get("capture_chain_radius", 0.0105))
    for idx in range(len(points) - 1):
        create_cable(
            f"Glow_Chain_{idx+1}",
            points[idx],
            points[idx + 1],
            capture_chain_radius,
            mat_glow_cyan,
            frame2,
        )

    # Frame 3: speaker woofer glow rings.
    woofer_offset = overlays["speaker_woofer_offset"]
    speaker_ring_major = float(overlays.get("speaker_ring_major_radius", 0.112))
    speaker_ring_minor = float(overlays.get("speaker_ring_minor_radius", 0.013))
    for speaker_id in ("speaker_left", "speaker_right"):
        root = roots[speaker_id]
        center = root.matrix_world.translation + mathutils.Vector(woofer_offset)
        bpy.ops.mesh.primitive_torus_add(
            major_radius=speaker_ring_major,
            minor_radius=speaker_ring_minor,
            location=center,
            rotation=(math.radians(-90), 0, math.radians(root.rotation_euler.z)),
        )
        ring = bpy.context.active_object
        ring.name = f"Glow_{speaker_id}_Woofer"
        ring.data.materials.append(mat_glow_prism)
        link_hierarchy_to_collection(ring, frame3)

    # Frame 4: DAW overlay sits inside monitor screen plane.
    monitor_id = overlays.get("daw_plane_monitor_id", "odyssey")
    monitor_root = roots.get(monitor_id, roots["odyssey"])
    monitor_min, monitor_max = world_bbox_extents(monitor_root)

    daw_y_offset = float(overlays.get("daw_plane_y_offset", 0.004))
    daw_inset_x = float(overlays.get("daw_inset_x", 0.86))
    daw_inset_z = float(overlays.get("daw_inset_z", 0.6))
    daw_z_bias = float(overlays.get("daw_plane_z_bias", 0.0))
    daw_lane_count = max(3, int(overlays.get("daw_lane_count", 5)))
    daw_lane_height = float(overlays.get("daw_lane_height", 0.011))
    daw_lane_spacing = float(overlays.get("daw_lane_spacing", 0.082))
    daw_clip_rows = max(3, int(overlays.get("daw_clip_rows", 4)))

    monitor_center = (monitor_min + monitor_max) / 2
    daw_center = (
        monitor_center.x,
        monitor_min.y - daw_y_offset,
        monitor_center.z + daw_z_bias,
    )
    daw_scale = (
        max((monitor_max.x - monitor_min.x) * 0.5 * daw_inset_x, 0.8),
        0.001,
        max((monitor_max.z - monitor_min.z) * 0.5 * daw_inset_z, 0.14),
    )

    create_glow_outline(
        "DAW_ScreenOutline",
        mathutils.Vector(daw_center),
        mathutils.Vector((daw_scale[0], 0.0006, daw_scale[2])),
        mat_glow_cyan,
        frame4,
        pad=(0.01, 0.00025, 0.01),
        thickness=0.0032,
    )

    top_lane_z = daw_center[2] + ((daw_lane_count - 1) * daw_lane_spacing * 0.5)
    for idx in range(daw_lane_count):
        z = top_lane_z - idx * daw_lane_spacing
        bpy.ops.mesh.primitive_cube_add(
            location=(daw_center[0], daw_center[1] - 0.0002, z),
            scale=(daw_scale[0] * 0.96, 0.0004, daw_lane_height),
        )
        lane = bpy.context.active_object
        lane.name = f"DAW_Lane_{idx+1}"
        lane.data.materials.append(mat_daw)
        link_hierarchy_to_collection(lane, frame4)

        lane_span = daw_scale[0] * 1.92
        clip_step = lane_span / daw_clip_rows
        for block in range(daw_clip_rows):
            width = clip_step * (0.34 + 0.1 * ((idx + block) % 3))
            lane_jitter = clip_step * (0.08 if idx % 2 == 0 else -0.05)
            x = -daw_scale[0] * 0.94 + clip_step * (block + 0.5) + lane_jitter
            min_x = -daw_scale[0] * 0.9 + width * 0.5
            max_x = daw_scale[0] * 0.9 - width * 0.5
            x = min(max_x, max(min_x, x))
            bpy.ops.mesh.primitive_cube_add(
                location=(x, daw_center[1] - 0.00035, z),
                scale=(width, 0.00038, daw_lane_height * 1.35),
            )
            clip = bpy.context.active_object
            clip.name = f"DAW_Lane_{idx+1}_Clip_{block+1}"
            clip.data.materials.append(mat_glow_prism if block % 2 == 0 else mat_daw)
            link_hierarchy_to_collection(clip, frame4)

    # Hide overlays by default.
    for overlay_name in FRAME_OVERLAYS:
        overlay = bpy.data.collections.get(overlay_name)
        overlay.hide_viewport = True
        overlay.hide_render = True

    bpy.ops.wm.save_mainfile(filepath=BLEND_PATH)
    print("Scene ready:", BLEND_PATH)
    print("Output directory:", OUT_DIR)
    print("Manifest source:", MANIFEST_PATH)


if __name__ == "__main__":
    build_scene()
