#!/usr/bin/env python3
"""Build free in-repo Mix Temple asset models as GLB files.

All assets are original procedural meshes (no external downloads, no logos).
"""

from __future__ import annotations

import math
import os

import bpy
from mathutils import Vector

PROJECT_ROOT = "/Users/cloutlandishllc/Downloads/calamari-crystal-site"
MODEL_DIR = os.path.join(PROJECT_ROOT, "assets", "mix-temple", "models")


def wipe_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for block in (
        bpy.data.meshes,
        bpy.data.materials,
        bpy.data.images,
        bpy.data.lights,
        bpy.data.textures,
        bpy.data.cameras,
    ):
        for data in list(block):
            if data.users == 0:
                block.remove(data)


def make_material(
    name,
    *,
    base=(0.1, 0.1, 0.1, 1.0),
    metallic=0.0,
    roughness=0.4,
    specular=0.5,
    emission=None,
):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    out = nodes.new("ShaderNodeOutputMaterial")
    bsdf = nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.inputs["Base Color"].default_value = base
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if "Specular IOR Level" in bsdf.inputs:
        bsdf.inputs["Specular IOR Level"].default_value = specular
    elif "Specular" in bsdf.inputs:
        bsdf.inputs["Specular"].default_value = specular

    if emission is None:
        links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])
        return mat

    emit = nodes.new("ShaderNodeEmission")
    emit.inputs["Color"].default_value = emission[0]
    emit.inputs["Strength"].default_value = emission[1]
    add = nodes.new("ShaderNodeAddShader")
    links.new(bsdf.outputs["BSDF"], add.inputs[0])
    links.new(emit.outputs["Emission"], add.inputs[1])
    links.new(add.outputs["Shader"], out.inputs["Surface"])
    return mat


def add_bevel(obj, width=0.01, segments=3):
    mod = obj.modifiers.new(name="Bevel", type="BEVEL")
    mod.width = width
    mod.segments = segments
    mod.limit_method = "ANGLE"
    mod.angle_limit = math.radians(30)


def add_weighted_normal(obj):
    mod = obj.modifiers.new(name="WeightedNormal", type="WEIGHTED_NORMAL")
    mod.keep_sharp = True
    mod.weight = 60


def smooth_mesh(obj):
    if obj.type != "MESH":
        return
    for poly in obj.data.polygons:
        poly.use_smooth = True


def apply_modifiers(obj):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    for mod in list(obj.modifiers):
        try:
            bpy.ops.object.modifier_apply(modifier=mod.name)
        except RuntimeError:
            pass
    obj.select_set(False)


def assign_material(obj, mat):
    if obj.type != "MESH":
        return
    obj.data.materials.clear()
    obj.data.materials.append(mat)


def finalize_mesh(obj, *, bevel=0.0, bevel_segments=3):
    if obj.type != "MESH":
        return
    if bevel > 0:
        add_bevel(obj, width=bevel, segments=bevel_segments)
    add_weighted_normal(obj)
    smooth_mesh(obj)
    apply_modifiers(obj)


def parent_to_root(root, objects):
    for obj in objects:
        obj.parent = root


def select_hierarchy(root):
    bpy.ops.object.select_all(action="DESELECT")
    root.select_set(True)
    for child in root.children_recursive:
        child.select_set(True)
    bpy.context.view_layer.objects.active = root


def export_asset(root, filename):
    os.makedirs(MODEL_DIR, exist_ok=True)
    path = os.path.join(MODEL_DIR, filename)
    select_hierarchy(root)
    bpy.ops.export_scene.gltf(
        filepath=path,
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_normals=True,
        export_tangents=True,
        export_materials="EXPORT",
    )
    print(f"Exported {path}")


def create_link(start, end, radius=0.014, name="Link", material=None, bevel=0.004):
    sx, sy, sz = start
    ex, ey, ez = end
    midpoint = ((sx + ex) / 2, (sy + ey) / 2, (sz + ez) / 2)
    vec = Vector((ex - sx, ey - sy, ez - sz))

    bpy.ops.mesh.primitive_cylinder_add(radius=radius, depth=vec.length, location=midpoint, vertices=24)
    link = bpy.context.active_object
    link.name = name
    link.rotation_mode = "QUATERNION"
    link.rotation_quaternion = vec.to_track_quat("Z", "Y")
    finalize_mesh(link, bevel=bevel, bevel_segments=2)
    if material:
        assign_material(link, material)
    return link


def build_monitor():
    wipe_scene()
    root = bpy.data.objects.new("UltrawideMonitor", None)
    bpy.context.scene.collection.objects.link(root)

    mat_bezel = make_material("Mat_MonitorBezel", base=(0.05, 0.055, 0.06, 1), metallic=0.35, roughness=0.24)
    mat_screen = make_material("Mat_MonitorScreen", base=(0.03, 0.05, 0.09, 1), metallic=0.0, roughness=0.08, emission=((0.02, 0.03, 0.05, 1), 0.2))
    mat_stand = make_material("Mat_MonitorStand", base=(0.74, 0.76, 0.78, 1), metallic=1.0, roughness=0.2)
    mat_back = make_material("Mat_MonitorBack", base=(0.08, 0.09, 0.1, 1), metallic=0.2, roughness=0.32)

    bpy.ops.mesh.primitive_cube_add(location=(0, 0, 1.0), scale=(2.62, 0.072, 0.74))
    back = bpy.context.active_object
    back.name = "Monitor_BackShell"
    bpy.ops.object.modifier_add(type="SIMPLE_DEFORM")
    back.modifiers["SimpleDeform"].deform_method = "BEND"
    back.modifiers["SimpleDeform"].deform_axis = "Z"
    back.modifiers["SimpleDeform"].angle = math.radians(22)
    finalize_mesh(back, bevel=0.02, bevel_segments=6)
    assign_material(back, mat_back)

    bpy.ops.mesh.primitive_cube_add(location=(0, -0.06, 1.0), scale=(2.55, 0.022, 0.69))
    bezel = bpy.context.active_object
    bezel.name = "Monitor_Bezel"
    bpy.ops.object.modifier_add(type="SIMPLE_DEFORM")
    bezel.modifiers["SimpleDeform"].deform_method = "BEND"
    bezel.modifiers["SimpleDeform"].deform_axis = "Z"
    bezel.modifiers["SimpleDeform"].angle = math.radians(22)
    finalize_mesh(bezel, bevel=0.012, bevel_segments=4)
    assign_material(bezel, mat_bezel)

    bpy.ops.mesh.primitive_cube_add(location=(0, -0.069, 1.0), scale=(2.46, 0.005, 0.62))
    screen = bpy.context.active_object
    screen.name = "Monitor_Screen"
    bpy.ops.object.modifier_add(type="SIMPLE_DEFORM")
    screen.modifiers["SimpleDeform"].deform_method = "BEND"
    screen.modifiers["SimpleDeform"].deform_axis = "Z"
    screen.modifiers["SimpleDeform"].angle = math.radians(22)
    finalize_mesh(screen, bevel=0.004, bevel_segments=2)
    assign_material(screen, mat_screen)

    bpy.ops.mesh.primitive_cylinder_add(radius=0.085, depth=0.56, location=(0, 0.015, 0.43), vertices=32)
    stem = bpy.context.active_object
    stem.name = "Monitor_Stem"
    finalize_mesh(stem, bevel=0.005, bevel_segments=2)
    assign_material(stem, mat_stand)

    bpy.ops.mesh.primitive_cube_add(location=(0, 0.02, 0.73), scale=(0.24, 0.11, 0.07))
    neck = bpy.context.active_object
    neck.name = "Monitor_Neck"
    finalize_mesh(neck, bevel=0.01, bevel_segments=3)
    assign_material(neck, mat_stand)

    bpy.ops.mesh.primitive_cube_add(location=(0, 0.0, 0.09), scale=(0.66, 0.35, 0.038))
    foot = bpy.context.active_object
    foot.name = "Monitor_Foot"
    finalize_mesh(foot, bevel=0.012, bevel_segments=4)
    assign_material(foot, mat_stand)

    bpy.ops.mesh.primitive_cube_add(location=(0, 0.0, 0.03), scale=(0.62, 0.24, 0.013))
    base = bpy.context.active_object
    base.name = "Monitor_BasePlate"
    finalize_mesh(base, bevel=0.005, bevel_segments=2)
    assign_material(base, mat_bezel)

    parent_to_root(root, [back, bezel, screen, stem, neck, foot, base])
    export_asset(root, "ultrawide_monitor.glb")


def build_speaker():
    wipe_scene()
    root = bpy.data.objects.new("StudioSpeaker", None)
    bpy.context.scene.collection.objects.link(root)

    mat_body = make_material("Mat_SpeakerBody", base=(0.08, 0.085, 0.095, 1), metallic=0.08, roughness=0.34)
    mat_face = make_material("Mat_SpeakerFace", base=(0.03, 0.033, 0.036, 1), metallic=0.05, roughness=0.26)
    mat_driver = make_material("Mat_SpeakerDriver", base=(0.22, 0.23, 0.24, 1), metallic=0.12, roughness=0.45)
    mat_metal = make_material("Mat_SpeakerMetal", base=(0.55, 0.57, 0.6, 1), metallic=1.0, roughness=0.2)

    bpy.ops.mesh.primitive_cube_add(location=(0, 0, 0.48), scale=(0.33, 0.22, 0.48))
    body = bpy.context.active_object
    body.name = "Speaker_Body"
    finalize_mesh(body, bevel=0.015, bevel_segments=5)
    assign_material(body, mat_body)

    bpy.ops.mesh.primitive_cube_add(location=(0, -0.214, 0.48), scale=(0.29, 0.012, 0.44))
    face = bpy.context.active_object
    face.name = "Speaker_Face"
    finalize_mesh(face, bevel=0.006, bevel_segments=3)
    assign_material(face, mat_face)

    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.109,
        minor_radius=0.013,
        location=(0, -0.227, 0.31),
        rotation=(math.radians(-90), 0, 0),
        major_segments=52,
        minor_segments=18,
    )
    woofer_ring = bpy.context.active_object
    woofer_ring.name = "Speaker_WooferRing"
    finalize_mesh(woofer_ring, bevel=0.002, bevel_segments=2)
    assign_material(woofer_ring, mat_metal)

    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.085,
        depth=0.03,
        location=(0, -0.223, 0.31),
        rotation=(math.radians(-90), 0, 0),
        vertices=36,
    )
    woofer = bpy.context.active_object
    woofer.name = "Speaker_Woofer"
    finalize_mesh(woofer, bevel=0.003, bevel_segments=2)
    assign_material(woofer, mat_driver)

    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.052,
        minor_radius=0.008,
        location=(0, -0.227, 0.59),
        rotation=(math.radians(-90), 0, 0),
        major_segments=42,
        minor_segments=16,
    )
    tweeter_ring = bpy.context.active_object
    tweeter_ring.name = "Speaker_TweeterRing"
    finalize_mesh(tweeter_ring, bevel=0.0015, bevel_segments=2)
    assign_material(tweeter_ring, mat_metal)

    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.041, location=(0, -0.223, 0.59), segments=28, ring_count=14)
    tweeter = bpy.context.active_object
    tweeter.name = "Speaker_Tweeter"
    finalize_mesh(tweeter, bevel=0.0)
    assign_material(tweeter, mat_driver)

    parent_to_root(root, [body, face, woofer_ring, woofer, tweeter_ring, tweeter])
    export_asset(root, "studio_speaker.glb")


def build_mac_compact():
    wipe_scene()
    root = bpy.data.objects.new("CompactDesktop", None)
    bpy.context.scene.collection.objects.link(root)

    mat_shell = make_material("Mat_DesktopShell", base=(0.78, 0.79, 0.81, 1), metallic=1.0, roughness=0.24)
    mat_dark = make_material("Mat_DesktopDark", base=(0.2, 0.21, 0.23, 1), metallic=0.25, roughness=0.36)

    bpy.ops.mesh.primitive_cube_add(location=(0, 0, 0.12), scale=(0.39, 0.39, 0.12))
    body = bpy.context.active_object
    body.name = "Desktop_Body"
    finalize_mesh(body, bevel=0.03, bevel_segments=6)
    assign_material(body, mat_shell)

    bpy.ops.mesh.primitive_cube_add(location=(0, 0, 0.22), scale=(0.35, 0.35, 0.02))
    top = bpy.context.active_object
    top.name = "Desktop_TopInset"
    finalize_mesh(top, bevel=0.006, bevel_segments=2)
    assign_material(top, mat_dark)

    bpy.ops.mesh.primitive_cube_add(location=(0, -0.36, 0.1), scale=(0.2, 0.01, 0.02))
    front_slot = bpy.context.active_object
    front_slot.name = "Desktop_FrontSlot"
    finalize_mesh(front_slot, bevel=0.001, bevel_segments=2)
    assign_material(front_slot, mat_dark)

    parent_to_root(root, [body, top, front_slot])
    export_asset(root, "mac_compact.glb")


def build_audio_interface():
    wipe_scene()
    root = bpy.data.objects.new("AudioInterface", None)
    bpy.context.scene.collection.objects.link(root)

    mat_body = make_material("Mat_InterfaceBody", base=(0.07, 0.075, 0.085, 1), metallic=0.28, roughness=0.3)
    mat_plate = make_material("Mat_InterfacePlate", base=(0.2, 0.22, 0.24, 1), metallic=0.62, roughness=0.2)
    mat_knob = make_material("Mat_InterfaceKnob", base=(0.62, 0.64, 0.66, 1), metallic=1.0, roughness=0.14)
    mat_indicator = make_material("Mat_InterfaceLED", base=(0.02, 0.03, 0.03, 1), metallic=0.0, roughness=0.15, emission=((0.14, 0.35, 0.32, 1), 0.35))

    bpy.ops.mesh.primitive_cube_add(location=(0, 0, 0.06), scale=(0.41, 0.24, 0.06))
    body = bpy.context.active_object
    body.name = "Interface_Body"
    finalize_mesh(body, bevel=0.014, bevel_segments=4)
    assign_material(body, mat_body)

    bpy.ops.mesh.primitive_cube_add(location=(0, 0.0, 0.1), scale=(0.36, 0.19, 0.01))
    plate = bpy.context.active_object
    plate.name = "Interface_TopPlate"
    finalize_mesh(plate, bevel=0.004, bevel_segments=2)
    assign_material(plate, mat_plate)

    knobs = []
    for idx, x in enumerate([-0.15, -0.05, 0.05, 0.15]):
        bpy.ops.mesh.primitive_cylinder_add(
            radius=0.0185,
            depth=0.023,
            location=(x, -0.178, 0.086),
            rotation=(math.radians(-90), 0, 0),
            vertices=28,
        )
        knob = bpy.context.active_object
        knob.name = f"Interface_Knob_{idx+1}"
        finalize_mesh(knob, bevel=0.0015, bevel_segments=2)
        assign_material(knob, mat_knob)
        knobs.append(knob)

    bpy.ops.mesh.primitive_cube_add(location=(0, -0.18, 0.115), scale=(0.08, 0.008, 0.005))
    led = bpy.context.active_object
    led.name = "Interface_LED"
    finalize_mesh(led, bevel=0.001, bevel_segments=2)
    assign_material(led, mat_indicator)

    parent_to_root(root, [body, plate, led, *knobs])
    export_asset(root, "audio_interface.glb")


def build_cloudlifter():
    wipe_scene()
    root = bpy.data.objects.new("InlinePreamp", None)
    bpy.context.scene.collection.objects.link(root)

    mat_body = make_material("Mat_PreampBody", base=(0.1, 0.105, 0.11, 1), metallic=0.2, roughness=0.34)
    mat_metal = make_material("Mat_PreampConnector", base=(0.62, 0.63, 0.65, 1), metallic=1.0, roughness=0.18)

    bpy.ops.mesh.primitive_cube_add(location=(0, 0, 0.03), scale=(0.2, 0.07, 0.03))
    body = bpy.context.active_object
    body.name = "Preamp_Body"
    finalize_mesh(body, bevel=0.008, bevel_segments=3)
    assign_material(body, mat_body)

    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.022,
        depth=0.03,
        location=(-0.215, 0, 0.03),
        rotation=(0, math.radians(90), 0),
        vertices=24,
    )
    left = bpy.context.active_object
    left.name = "Preamp_Left"
    finalize_mesh(left, bevel=0.001, bevel_segments=2)
    assign_material(left, mat_metal)

    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.022,
        depth=0.03,
        location=(0.215, 0, 0.03),
        rotation=(0, math.radians(90), 0),
        vertices=24,
    )
    right = bpy.context.active_object
    right.name = "Preamp_Right"
    finalize_mesh(right, bevel=0.001, bevel_segments=2)
    assign_material(right, mat_metal)

    parent_to_root(root, [body, left, right])
    export_asset(root, "inline_preamp.glb")


def build_broadcast_mic():
    wipe_scene()
    root = bpy.data.objects.new("BroadcastMic", None)
    bpy.context.scene.collection.objects.link(root)

    mat_body = make_material("Mat_MicBody", base=(0.05, 0.055, 0.06, 1), metallic=0.18, roughness=0.34)
    mat_grille = make_material("Mat_MicGrille", base=(0.19, 0.205, 0.22, 1), metallic=0.46, roughness=0.29)
    mat_mount = make_material("Mat_MicMount", base=(0.34, 0.36, 0.38, 1), metallic=0.7, roughness=0.24)

    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.057,
        depth=0.34,
        location=(-0.03, 0, 0.12),
        rotation=(0, math.radians(90), 0),
        vertices=30,
    )
    body = bpy.context.active_object
    body.name = "Mic_Body"
    finalize_mesh(body, bevel=0.004, bevel_segments=2)
    assign_material(body, mat_body)

    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.074,
        depth=0.15,
        location=(0.21, 0, 0.12),
        rotation=(0, math.radians(90), 0),
        vertices=40,
    )
    grille = bpy.context.active_object
    grille.name = "Mic_Grille"
    finalize_mesh(grille, bevel=0.003, bevel_segments=2)
    assign_material(grille, mat_grille)

    rings = []
    for i in range(4):
        x = 0.16 + i * 0.03
        bpy.ops.mesh.primitive_torus_add(
            major_radius=0.072,
            minor_radius=0.0018,
            location=(x, 0, 0.12),
            rotation=(0, math.radians(90), 0),
            major_segments=30,
            minor_segments=8,
        )
        ring = bpy.context.active_object
        ring.name = f"Mic_GrilleRing_{i+1}"
        finalize_mesh(ring, bevel=0.0)
        assign_material(ring, mat_mount)
        rings.append(ring)

    bpy.ops.mesh.primitive_cube_add(location=(0.02, 0.08, 0.12), scale=(0.1, 0.012, 0.04))
    yoke_l = bpy.context.active_object
    yoke_l.name = "Mic_Yoke_L"
    finalize_mesh(yoke_l, bevel=0.003, bevel_segments=2)
    assign_material(yoke_l, mat_mount)

    bpy.ops.mesh.primitive_cube_add(location=(0.02, -0.08, 0.12), scale=(0.1, 0.012, 0.04))
    yoke_r = bpy.context.active_object
    yoke_r.name = "Mic_Yoke_R"
    finalize_mesh(yoke_r, bevel=0.003, bevel_segments=2)
    assign_material(yoke_r, mat_mount)

    parent_to_root(root, [body, grille, yoke_l, yoke_r, *rings])
    export_asset(root, "broadcast_mic.glb")


def build_boom_arm():
    wipe_scene()
    root = bpy.data.objects.new("BoomArm", None)
    bpy.context.scene.collection.objects.link(root)

    mat_arm = make_material("Mat_BoomArm", base=(0.28, 0.3, 0.33, 1), metallic=0.72, roughness=0.23)
    mat_joint = make_material("Mat_BoomJoint", base=(0.66, 0.68, 0.7, 1), metallic=1.0, roughness=0.17)

    bpy.ops.mesh.primitive_cube_add(location=(-0.48, 0.0, 0.06), scale=(0.09, 0.09, 0.06))
    clamp = bpy.context.active_object
    clamp.name = "Boom_Clamp"
    finalize_mesh(clamp, bevel=0.01, bevel_segments=3)
    assign_material(clamp, mat_arm)

    post = create_link((-0.48, 0.0, 0.06), (-0.48, 0.0, 0.37), radius=0.013, name="Boom_Post", material=mat_arm)
    arm_1 = create_link((-0.48, 0.0, 0.37), (-0.03, 0.0, 0.6), radius=0.016, name="Boom_Arm_1", material=mat_arm)
    arm_2 = create_link((-0.03, 0.0, 0.6), (0.37, 0.0, 0.52), radius=0.014, name="Boom_Arm_2", material=mat_arm)

    joints = []
    for idx, loc in enumerate([(-0.48, 0.0, 0.37), (-0.03, 0.0, 0.6), (0.37, 0.0, 0.52)]):
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.028 if idx < 2 else 0.022, location=loc, segments=24, ring_count=12)
        joint = bpy.context.active_object
        joint.name = f"Boom_Joint_{idx+1}"
        finalize_mesh(joint, bevel=0.0)
        assign_material(joint, mat_joint)
        joints.append(joint)

    parent_to_root(root, [clamp, post, arm_1, arm_2, *joints])
    export_asset(root, "boom_arm.glb")


def build_all_assets():
    os.makedirs(MODEL_DIR, exist_ok=True)
    build_monitor()
    build_speaker()
    build_mac_compact()
    build_audio_interface()
    build_cloudlifter()
    build_broadcast_mic()
    build_boom_arm()


if __name__ == "__main__":
    build_all_assets()
