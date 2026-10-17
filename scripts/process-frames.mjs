import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const rawZipsDir = fs.existsSync(path.join(rootDir, 'raw-zips'))
  ? path.join(rootDir, 'raw-zips')
  : path.join(rootDir, 'raw_zips');

const framesZipDir = path.join(rootDir, 'Frames');

const publicFramesDir = path.join(rootDir, 'public', 'frames');
const tempDir = path.join(rootDir, '.temp_frames_extraction');
const srcDataDir = path.join(rootDir, 'src', 'data');

console.log('🚀 Starting Celestial Codex Frame Processing Pipeline...');

// Clean and prepare output directories
if (fs.existsSync(publicFramesDir)) {
  fs.rmSync(publicFramesDir, { recursive: true, force: true });
}
fs.mkdirSync(publicFramesDir, { recursive: true });

if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

if (!fs.existsSync(srcDataDir)) {
  fs.mkdirSync(srcDataDir, { recursive: true });
}

// Identify the 5 zip files in order
let zipFiles = [];
if (fs.existsSync(rawZipsDir)) {
  const files = fs.readdirSync(rawZipsDir).filter(f => f.endsWith('.zip'));
  // Sort naturally 1.zip, 2.zip, etc.
  files.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
    const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
    return numA - numB;
  });
  zipFiles = files.map(f => path.join(rawZipsDir, f));
} else if (fs.existsSync(framesZipDir)) {
  const files = fs.readdirSync(framesZipDir).filter(f => f.endsWith('.zip'));
  files.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
    const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
    return numA - numB;
  });
  zipFiles = files.map(f => path.join(framesZipDir, f));
}

if (zipFiles.length < 5) {
  throw new Error(`Expected at least 5 ZIP files, found: ${zipFiles.length}`);
}

console.log(`Found ${zipFiles.length} zip files in chronological sequence:`);
zipFiles.slice(0, 5).forEach((zf, idx) => console.log(`  Act ${idx + 1}: ${path.basename(zf)}`));

let globalFrameIndex = 1;
let detectedExtension = 'jpg';

for (let zipIdx = 0; zipIdx < 5; zipIdx++) {
  const zipPath = zipFiles[zipIdx];
  const zipTempDir = path.join(tempDir, `zip_${zipIdx + 1}`);
  fs.mkdirSync(zipTempDir, { recursive: true });

  console.log(`\n📦 Processing ZIP ${zipIdx + 1}/5: ${path.basename(zipPath)}...`);

  // Extract using native tar (supports zip on modern Windows/macOS/Linux)
  try {
    execSync(`tar -xf "${zipPath}" -C "${zipTempDir}"`, { stdio: 'pipe' });
  } catch (err) {
    console.warn(`tar extraction warning, trying powershell Expand-Archive...`);
    execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${zipTempDir}' -Force"`, { stdio: 'inherit' });
  }

  // Find all image files recursively in zipTempDir
  function findImages(dir) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(findImages(fullPath));
      } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const images = findImages(zipTempDir);

  // Sort naturally by frame number
  images.sort((a, b) => {
    const nameA = path.basename(a);
    const nameB = path.basename(b);
    const numA = parseInt(nameA.match(/\d+/)?.[0] || '0', 10);
    const numB = parseInt(nameB.match(/\d+/)?.[0] || '0', 10);
    return numA - numB;
  });

  console.log(`   Found ${images.length} frame images in ZIP ${zipIdx + 1}.`);

  for (const srcImg of images) {
    const ext = path.extname(srcImg).replace('.', '').toLowerCase();
    detectedExtension = ext;
    const paddedIndex = String(globalFrameIndex).padStart(4, '0');
    const destName = `frame_${paddedIndex}.${ext}`;
    const destPath = path.join(publicFramesDir, destName);

    fs.copyFileSync(srcImg, destPath);
    globalFrameIndex++;
  }
}

const totalExtracted = globalFrameIndex - 1;
console.log(`\n✨ Successfully extracted and renamed ${totalExtracted} frames into ./public/frames/`);

// Clean up temporary extraction folder
fs.rmSync(tempDir, { recursive: true, force: true });

// Write frameManifest.json
const manifest = {
  totalFrames: totalExtracted,
  extension: detectedExtension,
  prefix: 'frame_',
  padLength: 4,
  pathPattern: `/frames/frame_%s.${detectedExtension}`,
  firstFrame: `/frames/frame_0001.${detectedExtension}`,
  lastFrame: `/frames/frame_${String(totalExtracted).padStart(4, '0')}.${detectedExtension}`,
  keyFrames: [1, 28, 56, 84, 112, 140],
  acts: [
    { act: 'Act 0', range: [1, 12], title: 'The Shrouded Book in Blue Clouds' },
    { act: 'Act I', range: [13, 28], title: 'Front Cover Reveal — Name, Role & Portrait' },
    { act: 'Transition 1', range: [29, 40], title: 'Book Lands on Table & Opens' },
    { act: 'Act II', range: [41, 56], title: 'Chapter 1 — About Me & Engineering Architecture' },
    { act: 'Transition 2', range: [57, 68], title: 'First Page Turn Animation' },
    { act: 'Act III', range: [69, 84], title: 'Chapter 2 — Curated Top Projects' },
    { act: 'Transition 3', range: [85, 96], title: 'Second Page Turn Animation' },
    { act: 'Act IV', range: [97, 112], title: 'Chapter 3 — Live GitHub Repository Matrix' },
    { act: 'Transition 4', range: [113, 126], title: 'The Book Closes' },
    { act: 'Act V', range: [127, 140], title: 'Closed Book Cover — Contact & Recruiter Terminal' }
  ]
};

const manifestPath = path.join(srcDataDir, 'frameManifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
console.log(`📄 Generated frame manifest at ${manifestPath}`);
console.log(`Total frames verified: ${manifest.totalFrames}, Extension: .${manifest.extension}`);
