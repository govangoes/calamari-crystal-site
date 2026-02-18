#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PROJECT_ROOT = "/Users/cloutlandishllc/Downloads/calamari-crystal-site";
const INPUT_DIR = path.join(PROJECT_ROOT, "public", "mix-temple");
const OUTPUT_DIR = "/tmp/mix-temple-qa/previews";
const FRAMES = [
  "frame-0-hero.png",
  "frame-1-screen-brain.png",
  "frame-2-capture-chain.png",
  "frame-3-monitors.png",
  "frame-4-logic-pro-workflow.png",
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function buildPreviews() {
  await ensureDir(OUTPUT_DIR);

  for (const frame of FRAMES) {
    const inputPath = path.join(INPUT_DIR, frame);
    const outputName = `${path.parse(frame).name}.jpg`;
    const outputPath = path.join(OUTPUT_DIR, outputName);

    await sharp(inputPath)
      .resize({ width: 1280, height: 720, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .flatten({ background: { r: 5, g: 7, b: 15 } })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(outputPath);

    process.stdout.write(`preview: ${outputPath}\n`);
  }
}

buildPreviews().catch((error) => {
  process.stderr.write(`visual_qa_previews failed: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
