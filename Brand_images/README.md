# TrustMe Brand Assets

This folder contains the official TrustMe brand assets including logos, icons, and mascot images.

## Folder Structure

```
Brand_images/
├── original/          # Original PNG images with background
│   ├── icon.png      # Original icon (302×312px)
│   ├── Logo.png      # Original logo (560×314px)
│   ├── MrHandy.png   # Original MrHandy mascot (388×528px)
│   └── Trosmi.png    # Original Trosmi mascot (378×436px)
│
└── processed/         # Processed images - transparent & optimized
    ├── icon.png      # Icon - transparent background
    ├── icon.svg      # Icon - vector format
    ├── Logo.png      # Logo - transparent background
    ├── Logo.svg      # Logo - vector format
    ├── MrHandy.png   # MrHandy - optimized
    └── Trosmi.png    # Trosmi - optimized
```

## Processed Assets

### Background Removal
The logo and icon have had their light gray backgrounds removed using an automated script that:
- Detects light gray pixels (RGB values > 200 and similar to each other)
- Makes those pixels transparent
- Maintains the original image quality and dimensions

### Vectorization
The logo and icon have been traced to SVG format using `potrace` for:
- Scalability without loss of quality
- Smaller file sizes
- Better performance in web applications

## Usage

### In Frontend Application
All processed brand assets are copied to:
```
frontend/public/brand/
```

Use them in React components:
```tsx
// Transparent PNG
<img src="/brand/Logo.png" alt="TrustMe Logo" />

// Vector SVG (recommended)
<img src="/brand/Logo.svg" alt="TrustMe Logo" />

// Mascots
<img src="/brand/Trosmi.png" alt="Trosmi" />
<img src="/brand/MrHandy.png" alt="MrHandy" />
```

## Processing Script

To reprocess images if originals change:

```bash
cd backend
node process-brand-images.js
```

This will:
1. Remove light gray backgrounds from icon and logo
2. Optimize all PNG files
3. Save to `Brand_images/processed/`

## Manual Vectorization

For higher quality SVG vectorization, use professional tools:
- **Adobe Illustrator**: Image Trace feature
- **Inkscape**: Trace Bitmap (Path > Trace Bitmap)
- **Online**: vectorizer.io or vectormagic.com

## Brand Colors

**Primary Sky Blue:**
- Tailwind: `sky-500` (#0ea5e9)
- Tailwind: `sky-600` (#0284c7)

**Gradients:**
- Trosmi background: `from-sky-200 to-sky-100`
- MrHandy background: `from-sky-300 to-sky-200`
- Hero section: `from-sky-500 to-sky-600`

## Technical Details

**Original Images:**
- Format: PNG with RGBA
- Background: Light gray (#E5E5E5 approximately)
- Compression: Standard

**Processed Images:**
- Format: PNG with transparency
- Background: Fully transparent
- Compression: Level 9 (maximum)
- Adaptive filtering: Enabled

**SVG Images:**
- Generated using: potrace
- Format: Scalable Vector Graphics
- Optimized for: Web use

## License

These brand assets are proprietary to TrustMe and should not be used without permission.

---

Last updated: November 8, 2025
