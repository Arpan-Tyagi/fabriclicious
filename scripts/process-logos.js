const fs = require("fs");
const path = require("path");

const publicImages = path.join(__dirname, "..", "public", "images");

// 1. Read source SVGs
const horizSource = path.join(publicImages, "logo_logo horizontal.svg");
const squareSource = path.join(publicImages, "logo_logo.svg");

if (!fs.existsSync(horizSource) || !fs.existsSync(squareSource)) {
  console.error("Source logo SVGs not found in public/images!");
  process.exit(1);
}

const horizRaw = fs.readFileSync(horizSource, "utf8");
const squareRaw = fs.readFileSync(squareSource, "utf8");

// 2. Create trimmed horizontal logo with tightly cropped viewBox (0 90 1485 675)
// Removes dead margins on top (0-90), right (1485-1785), and bottom (765-1025)
const horizTrimmed = horizRaw.replace(
  'viewBox="0 0 1785.19 1025.4"',
  'viewBox="0 90 1485 675"'
);
fs.writeFileSync(path.join(publicImages, "logo-horizontal.svg"), horizTrimmed);

// 3. Create trimmed horizontal light logo for dark backgrounds (footer)
const horizLight = horizTrimmed
  .replace(
    "</style>",
    "      .text-light path { fill: #E6E2D8 !important; }\n    </style>"
  )
  .replace("<g>", '<g class="text-light">');
fs.writeFileSync(path.join(publicImages, "logo-horizontal-light.svg"), horizLight);

// 4. Create trimmed square logo for preloader / splash (viewBox 0 115 885 815)
const squareTrimmed = squareRaw.replace(
  /viewBox="[^"]+"/,
  'viewBox="0 115 885 815"'
);
fs.writeFileSync(path.join(publicImages, "logo.svg"), squareTrimmed);

// 5. Create standalone rosette emblem (viewBox 0 100 675 665)
const rosetteSvg = squareRaw.replace(
  /viewBox="[^"]+"/,
  'viewBox="0 100 675 665"'
);
fs.writeFileSync(path.join(publicImages, "logo-rosette.svg"), rosetteSvg);

console.log("Successfully generated all optimized logo assets with calibrated viewBoxes!");
