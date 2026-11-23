export interface JournalArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  publishDay: string;
  publishSlot: "Morning" | "Evening";
  targetKeyword: string;
  pastel: string;
  content: string;
}

export const ATELIER_JOURNAL_ARTICLES: Record<string, JournalArticle> = {
  // ================= DAY 1 (MONDAY) =================
  "anatomy-of-drape-silk-satin": {
    slug: "anatomy-of-drape-silk-satin",
    title: "The Physics of Fluidity: Working with 85 GSM Mulberry Silk Satin",
    category: "Textile Physics",
    readTime: "7 min read",
    publishDay: "Monday",
    publishSlot: "Morning",
    targetKeyword: "mulberry silk satin drape physics",
    pastel: "bg-pastel-rose/40",
    excerpt: "Master seam stabilization, Microtex needle pairing, and grainline tension control for ultra-fluid silk drapes.",
    content: `
Silk satin woven from continuous Grade 6A Mulberry filaments possesses an ultra-fluid drape index that behaves fundamentally different from staple-spun yarns. In couture ateliers, cutting and stitching fluid silk requires strict micro-mechanical calibration.

## 1. Loom Relaxation & Table Friction
Before shears touch silk satin, unroll the yardage onto a wool-felt or heavy muslin cutting table and allow it to rest for at least 18 hours. This neutralizes residual roll-tension and allows the warp filaments to achieve natural equilibrium.

- **Cutting Matting**: Pure wool felt or textured craft paper prevents fabric slippage during shearing.
- **Shearing Tool**: 10-inch razor-edge tailor's shears or a 45mm rotary blade with fresh carbide disc.
- **Pinning Protocol**: Ultra-fine glass-head silk pins (0.4mm gauge) placed strictly within seam allowances.

## 2. Needle, Thread & Machine Calibration
- **Needle**: Schmetz Microtex 60/8 (sharp acute point prevents filament snagging).
- **Thread**: Gütermann 100% Fine Silk or Mara 120 extra-fine continuous filament poly.
- **Stitch Length**: 1.8mm to 2.0mm with reduced presser foot pressure (1.5 kg).
- **Seam Construction**: 5mm French seams with trimmed first passes to eliminate raw edge fraying.

## 3. Pressing & Crease Protocols
Silk satin marks permanently under uneven moisture. Always use a dry silk organza press cloth with iron temperatures capped at 120°C (Silk setting). Never spray direct steam onto the satin face to prevent water-spotting.
    `
  },
  "mastering-true-bias": {
    slug: "mastering-true-bias",
    title: "Mastering the True Bias: Cutting and Stabilizing Silk Charmeuse",
    category: "Craftsmanship",
    readTime: "8 min read",
    publishDay: "Monday",
    publishSlot: "Evening",
    targetKeyword: "cutting silk charmeuse true bias",
    pastel: "bg-pastel-sky/40",
    excerpt: "An atelier guide to calculating diagonal grainline ease, preventing seam puckering, and calibrating needle tension.",
    content: `
Cutting garments on the true bias involves orienting pattern pieces at an exact 45-degree angle to the warp and weft threads. This geometry converts non-stretch woven silk into a fluid, self-molding sheath.

## 1. The 45-Degree Mathematical Alignment
When layout angles deviate even 2 degrees off the 45-degree axis, diagonal shear forces cause one side of the garment to spiral around the torso. 

- Use a 24-inch drafting square aligned to pulled thread grainlines.
- Cut single-ply face up—never cut bias garments on the fold.
- Allow 25% to 30% additional yardage allowance for pattern nesting.

## 2. Hang Relaxation Before Hemming
A bias-cut gown will stretch vertically under its own weight for 24 to 48 hours after seam assembly:
1. Complete side seams and bodice attachment.
2. Hang the garment on a padded dress form for a minimum of 36 hours.
3. Level and mark the hemline with a chalk atomizer while on the form.
4. Finish with a delicate 3mm hand-rolled hem using silk thread.
    `
  },

  // ================= DAY 2 (TUESDAY) =================
  "belgian-flax-linen-tailoring-guide": {
    slug: "belgian-flax-linen-tailoring-guide",
    title: "Bespoke Linen Construction: Pressing Protocols & Canvas Interfacing",
    category: "Tailoring Masterclass",
    readTime: "8 min read",
    publishDay: "Tuesday",
    publishSlot: "Morning",
    targetKeyword: "bespoke linen tailoring canvas interfacing",
    pastel: "bg-pastel-sage/40",
    excerpt: "Why high-GSM Belgian flax linen demands traditional floating haircloth interfacing and steam molding.",
    content: `
Pure Belgian flax linen yields structured yet breathable summer tailoring. Because linen fibers lack the natural crimp and elasticity of wool, jacket shaping depends entirely on traditional internal canvas construction.

## 1. Dimensional Pre-Shrinking
Flax fibers absorb up to 20% of their dry weight in ambient moisture before feeling damp:
- Cold-soak uncut yardage in distilled water for 30 minutes without agitation.
- Flat-drape over wide wooden bars until damp-dry.
- Steam-press thoroughly on high heat (200°C) with heavy mechanical pressure to pre-shrink and stabilize the weave.

## 2. Floating Horsehair Chest Canvas
Never fuse synthetic interfacings to pure linen suiting. Fused interlinings bubble under humidity and alter linen's natural drape. Instead, construct a floating chest piece from 180 GSM unbleached horsehair canvas pad-stitched by hand to the linen lapel roll line.
    `
  },
  "fabric-gsm-weight-selection-guide": {
    slug: "fabric-gsm-weight-selection-guide",
    title: "The Tailor's GSM Matrix: Decoding Grams per Square Meter for Every Garment Class",
    category: "Textile Physics",
    readTime: "9 min read",
    publishDay: "Tuesday",
    publishSlot: "Evening",
    targetKeyword: "fabric gsm guide for tailors",
    pastel: "bg-pastel-sand/40",
    excerpt: "The definitive weight and density breakdown: how to calibrate fabric GSM against pattern silhouettes from shirting to heavy overcoats.",
    content: `
GSM (Grams per Square Meter) is the metric gold standard of textile density. Selecting the wrong GSM compromises garment silhouette regardless of sewing precision.

## The Atelier GSM Classification Matrix

| Garment Class | Ideal GSM Range | Recommended Weaves & Fibers | Drape Behavior |
|:---|:---:|:---|:---|
| **Couture Blouses & Slips** | 60 – 110 GSM | Silk Charmeuse, Habotai, Chiffon | Grade 01 Ultra-Fluid |
| **Bespoke Shirting** | 110 – 150 GSM | Giza Long-Staple Poplin, Linen Voile | Crisp, moderate body |
| **Dresses & Summer Trousers** | 160 – 230 GSM | Normandy Flax Linen, Viscose Twill | Fluid drape with structural recovery |
| **Year-Round Tailored Suiting** | 240 – 320 GSM | Super 120s Worsted Wool, Cotton Drill | Balanced memory, sharp crease hold |
| **Heavy Outerwear & Overcoats** | 380 – 600 GSM | Harris Tweed, Meltons, Boiled Wool | Self-supporting architectural volume |

## How to Test Swatch Density
When curating swatches from our archive, weigh a 10x10 cm square swatch on a precision 0.01g scale. Multiply the swatch weight by 100 to calculate the exact true GSM of the delivered lot.
    `
  },

  // ================= DAY 3 (WEDNESDAY) =================
  "herringbone-tweed-pattern-matching": {
    slug: "herringbone-tweed-pattern-matching",
    title: "Precision Chevron Matching Across Harris Tweed Tailored Lapels",
    category: "Craftsmanship",
    readTime: "10 min read",
    publishDay: "Wednesday",
    publishSlot: "Morning",
    targetKeyword: "chevron matching harris tweed tailoring",
    pastel: "bg-pastel-sky/40",
    excerpt: "Eliminating pattern shear on heavy woolen weaves with friction chalking and single-ply cutting protocols.",
    content: `
Heavy woolen tweeds (450–520 GSM) present prominent herringbone chevrons that must align with millimeter accuracy across chest pieces, pocket flaps, and center-back seams.

## 1. Single-Ply Layout Protocol
Never cut heavy tweed folded double. The thickness of woolen yarns causes the lower layer to shift up to 8mm during shearing:
- Lay out yardage single-ply with the right side facing up.
- Match chevron apexes along horizontal alignment strings pegged to the cutting table.
- Flip pattern pieces to cut opposing left and right panels individually, verifying stripe alignment at all critical notch points.

## 2. Friction Chalking & Stay-Basting
Use pure pipeclay chalk. Machine basting shifts heavy twill; hand-baste chevrons at 20mm intervals using un-waxed cotton thread before running final machine seams.
    `
  },
  "single-dye-lot-integrity-continuous-cuts": {
    slug: "single-dye-lot-integrity-continuous-cuts",
    title: "Single-Dye Lot Integrity: Why Continuous Bolt Runs Matter in Haute Couture",
    category: "Textile Physics",
    readTime: "7 min read",
    publishDay: "Wednesday",
    publishSlot: "Evening",
    targetKeyword: "single dye lot continuous cuts fabric",
    pastel: "bg-pastel-rose/40",
    excerpt: "Understanding metamerism, liquor ratio variance in artisan dye vats, and why fractional continuous yardage guarantees gown perfection.",
    content: `
Even in Europe's most renowned mills, natural fibers absorb dye according to seasonal temperature, water hardness, and yarn tension. Two bolts of identical silk dyed in consecutive vats often exhibit chromatic metamerism—appearing identical under daylight but clashing under evening tungsten light.

## 1. The Cost of Roll Breaks in Couture
When cutting continuous 4-meter train gowns or tiered ballgowns, piecing panels from two different bolts risks visible shading along side seams. 

## 2. The Fabriclicious Continuous Cut Promise
We inspect every bolt upon arrival and guarantee continuous uninterrupted yardage from 0.5m to 25m within single-dye bath numbers. When you order 4.5 meters, it is cut from a single unbroken bolt roll.
    `
  },

  // ================= DAY 4 (THURSDAY) =================
  "tailoring-without-puckering-wool-twill": {
    slug: "tailoring-without-puckering-wool-twill",
    title: "Tailoring Without Puckering: Needle Calibration & Pressing for Cavalry Wool Twill",
    category: "Tailoring Masterclass",
    readTime: "8 min read",
    publishDay: "Thursday",
    publishSlot: "Morning",
    targetKeyword: "prevent puckering wool twill tailoring",
    pastel: "bg-pastel-sage/40",
    excerpt: "Eliminating differential feeding puckers and tension drag across steep-angle cavalry twill suitings.",
    content: `
Cavalry twill features prominent steep diagonal ribs (63-degree twill line). When machine needle entry strikes tightly wound worsted yarns, differential feed dog friction can create stubborn seam puckering.

## 1. Needle & Tension Calibration
- **Needle**: Schmetz Microtex 70/10 or 80/12. Acute sharp points pierce cleanly between warp fibers without displacing yarn bundles.
- **Thread Tension**: Loosen upper needle tension by 15-20% compared to poplin settings.
- **Feed Dogs**: Adjust feed dog height so both fabric plies feed at exact 1:1 speed.

## 2. Wooden Tailor's Clapper Technique
Wool retains steam memory. After pressing the seam open with heavy steam:
1. Immediately remove the iron.
2. Apply a dense hardwood tailor's clapper with firm downward body weight for 10 seconds.
3. The wood absorbs the trapped steam while holding the wool flat as it cools, locking in crisp, pucker-free seam edges.
    `
  },
  "normandy-flax-vs-commercial-linen": {
    slug: "normandy-flax-vs-commercial-linen",
    title: "The Normandy Harvest: Why Dry-Retted Flax Outlives Commercial Linen by Decades",
    category: "Heritage & Provenance",
    readTime: "8 min read",
    publishDay: "Thursday",
    publishSlot: "Evening",
    targetKeyword: "french normandy dry retted flax linen quality",
    pastel: "bg-pastel-sand/40",
    excerpt: "A deep dive into field dew-retting, staple fiber lengths, and why European heritage flax softens without thinning.",
    content: `
Commercial fast-fashion linens frequently feel coarse on the bolt, then weaken and tear after multiple laundering cycles. The secret to heirloom linen lies in French Normandy's temperate oceanic microclimate and centuries-old dew-retting traditions.

## 1. Dew Retting in Normandy Fields
Unlike chemical acid-retting used in mass production, Normandy flax is left spread across fields for weeks where natural humidity, dew, and soil microorganisms break down cellular pectins without damaging the cellulose core.

## 2. Tensile Longevity
- **Fiber Staple Length**: Heritage flax fibers measure up to 90 cm in length compared to short 20 cm fibers in industrial linen.
- **Washing Dynamics**: Pure Normandy flax increases in tensile strength when wet and naturally softens with every wash cycle without fiber degradation.
    `
  },

  // ================= DAY 5 (FRIDAY) =================
  "giza-cotton-poplin-shirting-masterclass": {
    slug: "giza-cotton-poplin-shirting-masterclass",
    title: "The Architecture of Crisp Shirting: Working with Giza 45 Long-Staple Poplin",
    category: "Craftsmanship",
    readTime: "7 min read",
    publishDay: "Friday",
    publishSlot: "Morning",
    targetKeyword: "giza cotton poplin shirting construction",
    pastel: "bg-pastel-sky/40",
    excerpt: "Single-needle flat felled seams, collar stay positioning, and 24-stitch-per-inch precision for bespoke shirting.",
    content: `
Giza 45 is celebrated as the queen of Egyptian cottons, boasting extra-long staple fibers spun into silky, high-density poplin weaves.

## 1. Seam Precision: 22 to 24 Stitches Per Inch
True bespoke shirting requires ultra-high stitch density:
- Calibrate your machine to 22-24 SPI (Stitches Per Inch).
- Pair with fine 120-weight mercerized Egyptian cotton thread.
- Needle: Schmetz Microtex 60/8 or 70/10 sharp point.

## 2. Single-Needle Flat-Felled Seams
Never use mock overlock seams on luxury shirting. Construct 3mm single-needle flat-felled side seams. This encases raw edges, providing clean internal lines and unparalleled skin comfort.
    `
  },
  "the-swatch-sampling-protocol": {
    slug: "the-swatch-sampling-protocol",
    title: "Before You Cut: The 5-Point Atelier Swatch Inspection Protocol",
    category: "Atelier Standards",
    readTime: "6 min read",
    publishDay: "Friday",
    publishSlot: "Evening",
    targetKeyword: "fabric swatch inspection testing protocol",
    pastel: "bg-pastel-rose/40",
    excerpt: "How to evaluate hand, bias recovery, steam shrinkage, and color fidelity under daylight before ordering continuous bolt lengths.",
    content: `
Digital screens display RGB pixels; your hands understand tactile structure. Before committing pattern scissors to multi-meter yardage, run your 10x10 cm specimen swatches through our atelier testing protocol.

## The 5-Point Inspection Checklist
1. **Bias Recovery Test**: Pull the swatch firmly along the 45-degree angle. Observe how quickly the weave snaps back to square.
2. **Steam Shrinkage Calibration**: Trace the dry swatch onto paper, steam aggressively for 15 seconds, let dry, and measure dimensional delta.
3. **Drape Fall Velocity**: Hold the swatch at one corner and release; observe whether the fabric breaks into soft ripples (fluid) or sharp planes (structured).
4. **Color Accuracy Under North Light**: Inspect the swatch under diffuse natural northern daylight between 10 AM and 2 PM.
5. **Needle Penetration Test**: Hand-push your intended sewing needle through double layers to verify zero yarn snagging.
    `
  },

  // ================= DAY 6 (SATURDAY) =================
  "como-silk-finishing-hems-seams": {
    slug: "como-silk-finishing-hems-seams",
    title: "Couture Edge Finishes: Master the 3mm Hand-Rolled Hem on Silk",
    category: "Couture Techniques",
    readTime: "9 min read",
    publishDay: "Saturday",
    publishSlot: "Morning",
    targetKeyword: "hand rolled hem silk couture technique",
    pastel: "bg-pastel-sage/40",
    excerpt: "Step-by-step masterclass on rolling, twisting, and invisible slip-stitching fine Italian silk charmeuse edges.",
    content: `
A machine-stitched baby hem adds stiffness to fluid silk gowns. True haute couture finishes luxury silk scarves and gowns with a minuscule 3mm hand-rolled hem.

## Tools Required
- **Needle**: John James Size 10 or 12 English Crewel / Betweens.
- **Thread**: Au Ver à Soie pure fine silk thread matched to fabric ground.
- **Moisture Cushion**: Damp linen sponge for finger tips.

## Step-by-Step Hand Rolling Technique
1. Trim raw fabric edge with sharp shears leaving no stray threads.
2. Dampen thumb and index finger slightly.
3. Roll 3mm to 4mm of raw silk tightly toward the wrong side between your fingers.
4. Take a tiny 1-thread bite through the main silk ground, then slip the needle 5mm inside the rolled cylinder.
5. Pull gently every 4 stitches to form a round, supple, pearl-like edge that moves with the gown.
    `
  },
  "architectural-velvet-pile-direction": {
    slug: "architectural-velvet-pile-direction",
    title: "Cutting and Pressing High-Pile Cotton Velvet: The Direction of Nap",
    category: "Tailoring Masterclass",
    readTime: "8 min read",
    publishDay: "Saturday",
    publishSlot: "Evening",
    targetKeyword: "cutting pressing velvet fabric nap direction",
    pastel: "bg-pastel-sand/40",
    excerpt: "Nap-up vs. nap-down optical depth, needle boards, and seam basting to prevent velvet creep under machine feed.",
    content: `
Cotton velvet is an opulent three-dimensional textile consisting of a woven backing and upright cut pile fibers. Incorrect cutting or pressing destroys velvet irrecoverably.

## 1. Determining Nap Direction
Run your hand flat across the pile surface:
- **Nap Down (Smooth)**: Reflects light, giving a silvery sheen and standard drape.
- **Nap Up (Rough)**: Absorbs light, yielding deep, rich, saturated color (preferred for couture evening jackets).
- **Rule**: All pattern pieces must point in the exact same nap direction—never rotate pieces 180 degrees.

## 2. The Needle Board Pressing Mandate
Never place a hot iron directly onto velvet on a flat ironing board; doing so crushes the pile permanently. Use a wire needle board (velvet board) where the fabric pile sinks between flexible metal needles while steam penetrates from the back.
    `
  },

  // ================= DAY 7 (SUNDAY) =================
  "sustainable-textile-provenance-natural-fibers": {
    slug: "sustainable-textile-provenance-natural-fibers",
    title: "The Luxury of Permanence: Natural Fiber Provenance vs. Synthetic Blends",
    category: "Heritage & Provenance",
    readTime: "7 min read",
    publishDay: "Sunday",
    publishSlot: "Morning",
    targetKeyword: "natural luxury fabric provenance sustainability",
    pastel: "bg-pastel-rose/40",
    excerpt: "Why pure silk, linen, and wool decompose gracefully while polyester microplastics contaminate waterways for centuries.",
    content: `
Fast fashion built an empire on cheap synthetic petroleum blends—polyester, nylon, and acrylic—disguised under tactile softening treatments. At Fabriclicious, our textile archive is dedicated exclusively to natural, unadulterated fibers.

## 1. The Breathability Dynamic
Natural fibers breathe through organic micro-pores. Wool regulates thermal micro-climates; linen dissipates body heat rapidly; silk provides year-round insulation. Synthetics trap perspiration against the skin, fostering odor and moisture retention.

## 2. Soil-to-Soil Circularity
Pure natural textiles return to the earth. A 100% Normandy linen garment or pure wool coat will fully biodegrade in composting soil within months, replenishing natural nutrients rather than shedding non-biodegradable microplastics.
    `
  },
  "the-bespoke-atelier-wardrobe-blueprint": {
    slug: "the-bespoke-atelier-wardrobe-blueprint",
    title: "The Bespoke Capsule: 5 Core Textiles for an Enduring Wardrobe",
    category: "Editorial Collection",
    readTime: "8 min read",
    publishDay: "Sunday",
    publishSlot: "Evening",
    targetKeyword: "bespoke capsule wardrobe natural fabrics",
    pastel: "bg-pastel-sky/40",
    excerpt: "The 5 essential fabric cuts every maker needs: Normandy linen, Como silk satin, Giza poplin, worsted wool, and Harris tweed.",
    content: `
Building an enduring bespoke wardrobe does not require dozens of garments. It requires five quintessential textiles sourced from the world's most storied looms.

## The Core 5 Fabric Foundations
1. **French Normandy Linen (220 GSM)**: The timeless foundational fabric for relaxed summer tailoring, shirting, and chore coats.
2. **Como Mulberry Silk Charmeuse (85 GSM)**: For bias slip dresses, liquid cowl necklines, and luxury blouse foundations.
3. **Giza 45 Cotton Poplin (120 GSM)**: The crisp, razor-sharp standard for bespoke shirting and classic structured cuffs.
4. **Super 120s Worsted Suiting (280 GSM)**: The year-round backbone for tailored trousers, blazers, and structured pencil skirts.
5. **Scottish Harris Tweed (480 GSM)**: The rugged, lifetime-guaranteed woolen cloth for heritage outerwear and winter waistcoats.

All five textiles are available for immediate swatch curation or continuous unbroken cuts starting at 0.5 meters in our digital archive.
    `
  }
};
