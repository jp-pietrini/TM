const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const brandImagesDir = path.join(__dirname, '../Brand_images');
const outputDir = path.join(__dirname, '../Brand_images/processed');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const images = [
  { name: 'icon.png', removeBackground: true },
  { name: 'Logo.png', removeBackground: true },
  { name: 'MrHandy.png', removeBackground: false }, // Character images might not need it
  { name: 'Trosmi.png', removeBackground: false },
];

async function removeBackground(inputPath, outputPath) {
  try {
    // Read the image
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`Processing ${path.basename(inputPath)}...`);
    console.log(`  Original: ${metadata.width}x${metadata.height}, ${metadata.format}`);

    // Remove light gray background by making it transparent
    // This targets light gray colors (RGB values close to each other and high)
    const processed = await image
      .removeAlpha() // Remove existing alpha to work with raw RGB
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data, info } = processed;
    const pixelArray = new Uint8ClampedArray(data.length / 3 * 4);

    // Process each pixel
    for (let i = 0; i < data.length; i += 3) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Check if pixel is light gray (close to white/gray)
      // Light gray is when R, G, B are similar and above a threshold
      const isLightGray =
        Math.abs(r - g) < 20 &&
        Math.abs(g - b) < 20 &&
        Math.abs(r - b) < 20 &&
        r > 200 && g > 200 && b > 200;

      const pixelIndex = (i / 3) * 4;
      pixelArray[pixelIndex] = r;
      pixelArray[pixelIndex + 1] = g;
      pixelArray[pixelIndex + 2] = b;
      pixelArray[pixelIndex + 3] = isLightGray ? 0 : 255; // Make light gray transparent
    }

    // Create new image from processed pixels
    await sharp(pixelArray, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4,
      },
    })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(outputPath);

    const outputMetadata = await sharp(outputPath).metadata();
    console.log(`  Output: ${outputMetadata.width}x${outputMetadata.height}, transparent background`);
    console.log(`  Saved to: ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
  }
}

async function copyWithOptimization(inputPath, outputPath) {
  try {
    console.log(`Optimizing ${path.basename(inputPath)}...`);

    await sharp(inputPath)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(outputPath);

    console.log(`  Saved to: ${outputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
  }
}

async function processAllImages() {
  console.log('🎨 Processing brand images...\n');

  for (const img of images) {
    const inputPath = path.join(brandImagesDir, img.name);
    const outputPath = path.join(outputDir, img.name);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  ${img.name} not found, skipping...`);
      continue;
    }

    if (img.removeBackground) {
      await removeBackground(inputPath, outputPath);
    } else {
      await copyWithOptimization(inputPath, outputPath);
    }

    console.log('');
  }

  console.log('✅ All images processed!');
  console.log(`📁 Output directory: ${outputDir}`);
  console.log('\nFor SVG vectorization, you can use:');
  console.log('  - Adobe Illustrator (Image Trace)');
  console.log('  - Inkscape (Trace Bitmap)');
  console.log('  - Online: vectorizer.io or vectormagic.com');
  console.log('  - Command line: potrace (brew install potrace)');
}

processAllImages().catch(console.error);
