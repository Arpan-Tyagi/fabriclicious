const fs = require("fs");
const path = require("path");

const publicImages = path.join(__dirname, "..", "public", "images");

// 1. Read files
const horizPath = path.join(publicImages, "logo_logo horizontal.svg");
const squarePath = path.join(publicImages, "logo_logo.svg");

const horiz = fs.readFileSync(horizPath, "utf8");
const square = fs.readFileSync(squarePath, "utf8");

// 2. Write logo-horizontal.svg (clean URL-friendly copy)
fs.writeFileSync(path.join(publicImages, "logo-horizontal.svg"), horiz);

// 3. Write logo.svg (clean URL-friendly copy for square/preloader)
fs.writeFileSync(path.join(publicImages, "logo.svg"), square);

// 4. Create logo-horizontal-light.svg for dark backgrounds (e.g. footer on #1C1A18)
// We add CSS rule for .text-light path to fill with #E6E2D8 (Pumice Linen)
const lightHoriz = horiz
  .replace(
    "</style>",
    "      .text-light path { fill: #E6E2D8 !important; }\n    </style>"
  )
  .replace("<g>", '<g class="text-light">');

fs.writeFileSync(path.join(publicImages, "logo-horizontal-light.svg"), lightHoriz);

// 5. Create logo-rosette.svg: isolating the upper rosette emblem (viewBox 180 120 664 660)
const rosetteSvg = square.replace(
  'viewBox="0 0 1024 1024"',
  'viewBox="180 120 664 660"'
);
fs.writeFileSync(path.join(publicImages, "logo-rosette.svg"), rosetteSvg);

console.log("Successfully processed and generated all logo assets!");
