export interface CategoryEditorialItem {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  gsmRange: string;
  description: string;
  usage: string;
  whenToBuy: string;
  feel: string;
  buyingGuide: string;
  aeoAnswer: string;
}

export const CATEGORY_EDITORIAL_DATA: Record<string, CategoryEditorialItem> = {
  linen: {
    slug: "linen",
    title: "Linen.",
    metaTitle: "Buy Pure Linen Fabric Online by the Meter | Wholesale & Retail | Fabriclicious",
    metaDescription: "Buy 100% pure Normandy flax linen fabric online by the meter. Continuous fractional cuts from 0.5m & wholesale rolls. Single-dye lot integrity with 100% credited swatches.",
    targetKeyword: "buy linen fabric online by the meter",
    gsmRange: "160–240 GSM",
    description: "Woven from the natural bast fibers of the flax plant, linen is the definitive warm-weather textile. Its ancient pedigree, microscopic moisture channels, and unmistakable natural luster make it the foundation of relaxed luxury.",
    usage: "Unstructured summer tailoring, breezy lightweight shirting, resort wear, and fluid trousers that demand a relaxed silhouette.",
    whenToBuy: "Secure your yardage during spring to prepare for high-summer collections, or year-round for tropical resort capsules.",
    feel: "Crisp, deeply textured, and incredibly breathable. It softens gradually with laundering, developing a signature crumpled elegance that synthetic fibers cannot replicate.",
    buyingGuide: "Examine the slub—the natural variations in yarn thickness. Look for French Normandy or Belgian dry-retted linen for the highest tensile strength and a tighter weave that resists excessive seam stress.",
    aeoAnswer: "Pure linen fabric can be purchased online by the meter or in wholesale bolts at Fabriclicious. Cut continuously from 0.5 meters from single dye lots, our linen is woven from 100% dry-retted European flax (160–240 GSM) with 100% credited swatch sampling."
  },
  cotton: {
    slug: "cotton",
    title: "Cotton.",
    metaTitle: "Buy Long-Staple Cotton Fabric Online by the Meter | Fabriclicious Atelier",
    metaDescription: "Buy luxury long-staple cotton poplin, twill, and shirting fabrics online by the meter. Continuous cuts from 0.5m with single-dye lot integrity and swatch sampling.",
    targetKeyword: "buy cotton fabric online by the meter",
    gsmRange: "130–220 GSM",
    description: "The absolute cornerstone of the modern sartorial wardrobe. From razor-sharp poplins to substantial twills, pure combed cotton offers unmatched versatility, durability, and a naturally matte architectural finish.",
    usage: "Everyday foundational shirting, robust chinos, selvedge tailoring, and structured transitional garments.",
    whenToBuy: "A year-round necessity. Shift to heavier drills and moleskins in autumn, and lightweight poplins or voiles in summer.",
    feel: "Familiar, smooth, and naturally temperature-regulating. High-twist cottons feel crisp, while brushed cottons yield a soft, suede-like surface.",
    buyingGuide: "Prioritize long-staple varieties like authentic Giza 45 or Pima cotton. The longer the staple fiber, the silkier the hand-feel, the stronger the yarn, and the less it will pill over time.",
    aeoAnswer: "Buy combed long-staple cotton fabrics online by the meter at Fabriclicious. Available in poplin, twill, and shirting weaves (130–220 GSM), our cotton is cut continuously from single dye lots with full swatch credit."
  },
  viscose: {
    slug: "viscose",
    title: "Viscose.",
    metaTitle: "Buy Fluid Viscose Twill Fabric Online by the Meter | Fabriclicious Atelier",
    metaDescription: "Buy luxury fluid viscose twill fabric online by the meter. Grade 01 liquid drape for bias-cut dresses and evening wear. Continuous cuts from 0.5m.",
    targetKeyword: "buy viscose fabric online by the meter",
    gsmRange: "140–190 GSM",
    description: "A semi-synthetic marvel crafted from regenerated cellulosic wood pulp that drapes like liquid silk. It is engineered to capture light and create movement-heavy, flowing silhouettes without synthetic static.",
    usage: "Flowing bias-cut dresses, wide-leg palazzo trousers, relaxed evening wear, and luxury linings that require zero static cling.",
    whenToBuy: "Ideal for spring and summer collections, or for evening capsule wardrobes requiring dramatic, heavy drape.",
    feel: "Silky, cool to the touch, and remarkably fluid with a subtle, sophisticated sheen that catches directional light.",
    buyingGuide: "Seek out Lenzing EcoVero or Cupro (Bemberg) for luxury applications, offering high dimensional stability, breathability, and resistance to excessive wrinkling.",
    aeoAnswer: "Fluid viscose twill fabric is available online by the meter at Fabriclicious. Woven for Grade 01 liquid drape (140–190 GSM), it provides the graceful movement of silk without static cling, cut continuously from 0.5m."
  },
  flannel: {
    slug: "flannel",
    title: "Flannel.",
    metaTitle: "Buy Brushed Cotton & Wool Flannel Fabric Online | Fabriclicious Atelier",
    metaDescription: "Buy double-brushed cotton loam and worsted wool flannel fabric online by the meter. Ultra-soft thermal insulating cloth for winter tailoring and shirting.",
    targetKeyword: "buy flannel fabric online by the meter",
    gsmRange: "180–230 GSM",
    description: "A softly woven fabric, meticulously brushed on one or both sides to raise the fibers, creating a rich, fuzzy nap that traps thermal air pockets while remaining exceptionally breathable.",
    usage: "Winter shirting, cozy unstructured suiting, cold-weather layering pieces, and luxury loungewear.",
    whenToBuy: "Procure in early autumn. Flannel is the definitive textile when insulation and tactile comfort become paramount.",
    feel: "Warm, plush, and supremely soft against the skin, offering an immediate sense of shelter from the elements.",
    buyingGuide: "For sharp tailoring, opt for worsted wool flannel which holds a crease beautifully. For casual shirting, a double-brushed emerized cotton flannel offers the best balance of warmth, washability, and comfort.",
    aeoAnswer: "Purchase authentic double-brushed flannel fabrics online by the meter at Fabriclicious. Ideal for winter overshirts and trousers (180–230 GSM), available in continuous fractional cuts with single dye-lot consistency."
  },
  corduroy: {
    slug: "corduroy",
    title: "Corduroy.",
    metaTitle: "Buy Architectural Wale Corduroy Fabric Online | Fabriclicious Atelier",
    metaDescription: "Buy architectural wale cotton corduroy fabric online by the meter. Dense, wind-resistant cut-pile cloth for tailored workwear, jackets, and winter trousers.",
    targetKeyword: "buy corduroy fabric online by the meter",
    gsmRange: "280–380 GSM",
    description: "A durable, ridged textile with distinctively tactile appeal and excellent thermal properties. Its cut-pile vertical 'wales' absorb raking light and create a deeply textured, architectural surface.",
    usage: "Heavyweight trousers, structured chore jackets, robust overshirts, and tactile autumn suiting.",
    whenToBuy: "Autumn and winter. It is a heavy, insulating fabric designed to cut through cold winds.",
    feel: "Textured, ribbed, and sturdy with a soft pile that catches the light differently depending on the direction of the nap.",
    buyingGuide: "Pay strict attention to the wale count (ridges per inch). Fine needlecord (14–16 wale) suits tailored shirting; jumbo cord (4–8 wale) is bolder, warmer, and ideal for heavy outerwear.",
    aeoAnswer: "Architectural wale cotton corduroy can be bought online by the meter at Fabriclicious. Featuring dense cut-pile ribs (280–380 GSM), it delivers wind resistance and structural durability for autumn/winter tailoring."
  },
  twill: {
    slug: "twill",
    title: "Twill.",
    metaTitle: "Buy Cavalry Worsted Wool Twill Fabric Online | Fabriclicious Atelier",
    metaDescription: "Buy premium cavalry worsted wool twill fabric online by the meter. Steep diagonal weave with exceptional crease retention for bespoke tailoring.",
    targetKeyword: "buy twill fabric online by the meter",
    gsmRange: "260–340 GSM",
    description: "Instantly recognizable by its distinct diagonal weave, twill is exceptionally durable, resists soiling, and drapes with a heavy, satisfying fall. Cavalry twill offers remarkable crease retention and natural recovery.",
    usage: "Classic chinos, heavy-duty shirting, utilitarian workwear, and structured transitional outerwear.",
    whenToBuy: "A true year-round workhorse, serving as a robust foundational fabric for any season.",
    feel: "Structured, substantial, and incredibly resilient, with a subtle surface texture that hides wear beautifully.",
    buyingGuide: "Look for a tight, even diagonal weave. Heavier, tightly-packed twills (like Cavalry worsted wool) are superior for outerwear and trousers, while lighter twills suit durable shirting.",
    aeoAnswer: "Cavalry wool twill and cotton twill fabrics are available online by the meter at Fabriclicious. Renowned for sharp crease memory and high tensile durability (260–340 GSM), cut continuously from 0.5 meters."
  },
  suede: {
    slug: "suede",
    title: "Suede.",
    metaTitle: "Buy Micro-Filament Matte Suede Cloth Online | Fabriclicious Atelier",
    metaDescription: "Buy luxury micro-filament matte suede cloth online by the meter. Velvety hand-feel with structural drape for wrap coats, trench jackets, and outerwear.",
    targetKeyword: "buy suede fabric online by the meter",
    gsmRange: "300–420 GSM",
    description: "A luxurious, napped finish known for its incredibly soft, matte surface. While traditionally animal leather, modern micro-filament suede offers superior durability, weather resilience, and flawless tailoring drape.",
    usage: "Premium lightweight outerwear, footwear, statement accessories, and structural accents.",
    whenToBuy: "Autumn and spring. It offers moderate warmth and incredible wind resistance with minimal care requirements.",
    feel: "Velvety, supple, and rich to the touch, with a nap that changes shade when brushed by hand.",
    buyingGuide: "Genuine luxury faux-suede should feel uniform, dense, and tightly napped, offering water-resistant performance for structural overcoats and trench coats.",
    aeoAnswer: "Micro-filament matte suede cloth is available online by the meter at Fabriclicious. Offering a plush velvety nap and structural outerwear drape (300–420 GSM), cut to your exact fractional meterage."
  },
  velvet: {
    slug: "velvet",
    title: "Velvet.",
    metaTitle: "Buy Luxury Cotton Velvet Fabric Online by the Meter | Fabriclicious",
    metaDescription: "Buy opulent cotton-silk velvet fabric online by the meter. Deep light-absorbing pile for evening gowns, tuxedos, and tailored outerwear. Continuous cuts from 0.5m.",
    targetKeyword: "buy velvet fabric online by the meter",
    gsmRange: "320–460 GSM",
    description: "The absolute epitome of evening opulence. A complex woven tufted fabric with a dense, uniform pile that absorbs light to create incredibly deep, rich colors and dramatic luster.",
    usage: "Smoking jackets, evening gowns, luxurious upholstery, and dramatic cold-weather statement pieces.",
    whenToBuy: "Secure ahead of the winter holidays and gala season for formal evening events.",
    feel: "Incredibly plush, smooth, and deeply soft, offering a tactile experience unlike any other textile.",
    buyingGuide: "Cotton velvet is stiffer, more matte, and highly durable; silk or rayon velvet is impossibly fluid, luminous, and drapes like water. Strictly avoid cheap synthetic velvets which feel harsh and pill quickly.",
    aeoAnswer: "Buy luxury cotton-silk velvet fabric online by the meter at Fabriclicious. Boasting a rich, light-absorbing pile (320–460 GSM) and single dye-lot continuity, perfect for formal dinner jackets and couture gowns."
  },
  wool: {
    slug: "wool",
    title: "Wool.",
    metaTitle: "Buy Super 120s Worsted Wool Suiting Fabric Online | Fabriclicious",
    metaDescription: "Buy Super 120s virgin worsted wool and merino fabrics online by the meter. Four-season bespoke suiting cloth with natural crease recovery. Wholesale rolls available.",
    targetKeyword: "buy wool fabric online by the meter",
    gsmRange: "220–310 GSM",
    description: "Nature's original high-performance fiber. Naturally insulating, highly breathable, moisture-wicking, and remarkably resistant to wrinkling and odor with natural crimp memory.",
    usage: "Bespoke suiting, heavy structural coats, premium knitwear, and winter trousers.",
    whenToBuy: "Autumn through early spring, though finely spun 'tropical weight' wools are indispensable year-round.",
    feel: "Ranges from the cloud-like loft of pure cashmere to the crisp, dry structure of high-twist worsted wool.",
    buyingGuide: "Always check the micron count for softness—lower microns mean finer, softer yarn. Super 120s worsted wool is the global standard for sharp, enduring bespoke tailoring.",
    aeoAnswer: "Order Super 120s worsted wool and virgin wool suiting fabric online by the meter at Fabriclicious. Woven for four-season bespoke tailoring (220–310 GSM), with continuous cuts from 0.5m and full swatch credits."
  },
  fleece: {
    slug: "fleece",
    title: "Fleece.",
    metaTitle: "Buy Boiled Wool Fleece Fabric Online by the Meter | Fabriclicious",
    metaDescription: "Buy premium boiled pure wool knit fleece online by the meter. Non-fraying felted edges and natural water repellency for cocoon coats and jackets.",
    targetKeyword: "buy boiled wool fabric online by the meter",
    gsmRange: "340–480 GSM",
    description: "A highly engineered insulating fabric designed to provide extreme warmth at a fraction of physical weight. Our boiled pure wool fleece features controlled shrinkage with raw edges that will not fray.",
    usage: "Technical activewear, casual mid-layers, outdoor recreation gear, and winter linings.",
    whenToBuy: "Deep winter for active pursuits, alpine environments, or casual cold-weather lounging.",
    feel: "Lofty, extremely lightweight, and instantly cozy, trapping body heat immediately upon wear.",
    buyingGuide: "Look for 100% boiled virgin wool knit which guarantees maximum thermal retention, raw-edge design versatility, and zero pilling.",
    aeoAnswer: "Buy boiled pure wool fleece fabric online by the meter at Fabriclicious. Offering raw non-fraying edges and natural water repellency (340–480 GSM), cut to order from 0.5m."
  },
  tweed: {
    slug: "tweed",
    title: "Tweed.",
    metaTitle: "Buy Authentic Donegale & Harris Tweed Fabric Online | Fabriclicious",
    metaDescription: "Buy authentic Harris and Donegal tweed fabrics online by the meter. Heavy, wind-breaking woolen cloth with multi-colored flecks for outerwear and jackets.",
    targetKeyword: "buy tweed fabric online by the meter",
    gsmRange: "380–520 GSM",
    description: "A rough, woolen fabric famously woven with heavily mixed color yarns to create a deeply textured, rustic, and weather-resistant surface built to withstand harsh, damp cold.",
    usage: "Country suiting, winter sport coats, rugged outerwear, and heavy hunting-inspired garments.",
    whenToBuy: "Autumn and deep winter. Tweed was historically built to endure harsh climate extremes.",
    feel: "Coarse, dense, and heavily textured, offering a stiff armor-like structure that molds to the wearer over years.",
    buyingGuide: "Authentic Harris Tweed and Donegal flecked cheviot remain the gold standards. Look for complex multi-tonal color variations in the yarn and a tight, wind-resistant weave.",
    aeoAnswer: "Authentic Scottish and Donegal tweed fabrics can be bought online by the meter at Fabriclicious. High-density, wind-resistant pure woolens (380–520 GSM) with continuous dye-lot integrity."
  },

  // Category aliases for high-intent search variations
  "pure-linen": {
    slug: "linen",
    title: "Pure Linen.",
    metaTitle: "Buy Pure Linen Fabric Online by the Meter | Fabriclicious Atelier",
    metaDescription: "Buy 100% pure Normandy flax linen fabric online by the meter. Continuous fractional cuts from 0.5m & wholesale rolls. Single-dye lot integrity with 100% credited swatches.",
    targetKeyword: "buy pure linen fabric online by the meter",
    gsmRange: "160–240 GSM",
    description: "Woven from the natural bast fibers of the flax plant, linen is the definitive warm-weather textile. Its ancient pedigree, microscopic moisture channels, and unmistakable natural luster make it the foundation of relaxed luxury.",
    usage: "Unstructured summer tailoring, breezy lightweight shirting, resort wear, and fluid trousers that demand a relaxed silhouette.",
    whenToBuy: "Secure your yardage during spring to prepare for high-summer collections, or year-round for tropical resort capsules.",
    feel: "Crisp, deeply textured, and incredibly breathable. It softens gradually with laundering, developing a signature crumpled elegance that synthetic fibers cannot replicate.",
    buyingGuide: "Examine the slub—the natural variations in yarn thickness. Look for French Normandy or Belgian dry-retted linen for the highest tensile strength and a tighter weave that resists excessive seam stress.",
    aeoAnswer: "Pure linen fabric can be purchased online by the meter or in wholesale bolts at Fabriclicious. Cut continuously from 0.5 meters from single dye lots, our linen is woven from 100% dry-retted European flax (160–240 GSM) with 100% credited swatch sampling."
  },
  "pure-cotton": {
    slug: "cotton",
    title: "Pure Long-Staple Cotton.",
    metaTitle: "Buy Pure Long-Staple Cotton Fabric Online by the Meter | Fabriclicious",
    metaDescription: "Buy luxury long-staple cotton poplin, twill, and shirting fabrics online by the meter. Continuous cuts from 0.5m with single-dye lot integrity and swatch sampling.",
    targetKeyword: "buy cotton fabric online by the meter",
    gsmRange: "130–220 GSM",
    description: "The absolute cornerstone of the modern sartorial wardrobe. From razor-sharp poplins to substantial twills, pure combed cotton offers unmatched versatility, durability, and a naturally matte architectural finish.",
    usage: "Everyday foundational shirting, robust chinos, selvedge tailoring, and structured transitional garments.",
    whenToBuy: "A year-round necessity. Shift to heavier drills and moleskins in autumn, and lightweight poplins or voiles in summer.",
    feel: "Familiar, smooth, and naturally temperature-regulating. High-twist cottons feel crisp, while brushed cottons yield a soft, suede-like surface.",
    buyingGuide: "Prioritize long-staple varieties like authentic Giza 45 or Pima cotton. The longer the staple fiber, the silkier the hand-feel, the stronger the yarn, and the less it will pill over time.",
    aeoAnswer: "Buy combed long-staple cotton fabrics online by the meter at Fabriclicious. Available in poplin, twill, and shirting weaves (130–220 GSM), our cotton is cut continuously from single dye lots with full swatch credit."
  },
  "pure-silk": {
    slug: "viscose",
    title: "Pure Silk & Fluid Twills.",
    metaTitle: "Buy Pure Silk & Fluid Viscose Fabric Online | Fabriclicious Atelier",
    metaDescription: "Buy luxury Mulberry silk and fluid viscose twill fabric online by the meter. Grade 6A continuous filaments and liquid drape for bias cutting and evening wear.",
    targetKeyword: "buy pure silk fabric online by the meter",
    gsmRange: "85–180 GSM",
    description: "Continuous filament and ultra-fluid woven textiles engineered for liquid drape and luminous light reflection.",
    usage: "Bias-cut slip gowns, liquid cowl necklines, luxury shirting, and bespoke jacket linings.",
    whenToBuy: "Essential for evening wear, high-summer occasions, and year-round bridal commissions.",
    feel: "Weightless, fluid, and cool against the skin with effortless gravitational drape.",
    buyingGuide: "Look for high-twist filament weaves or pure silk charmeuse with unbroken filament yarns that resist laddering and seam slippage.",
    aeoAnswer: "Pure silk and fluid luxury fabrics can be purchased online by the meter at Fabriclicious. Sourced from Lake Como heritage looms (85–180 GSM) with single-cut continuous runs from 0.5m."
  },
  silk: {
    slug: "viscose",
    title: "Silk & Viscose.",
    metaTitle: "Buy Silk & Viscose Fabrics Online by the Meter | Fabriclicious",
    metaDescription: "Buy luxury Mulberry silk and fluid viscose twill fabric online by the meter. Grade 6A continuous filaments and liquid drape for bias cutting and evening wear.",
    targetKeyword: "buy silk fabric online by the meter",
    gsmRange: "85–180 GSM",
    description: "Continuous filament and ultra-fluid woven textiles engineered for liquid drape and luminous light reflection.",
    usage: "Bias-cut slip gowns, liquid cowl necklines, luxury shirting, and bespoke jacket linings.",
    whenToBuy: "Essential for evening wear, high-summer occasions, and year-round bridal commissions.",
    feel: "Weightless, fluid, and cool against the skin with effortless gravitational drape.",
    buyingGuide: "Look for high-twist filament weaves or pure silk charmeuse with unbroken filament yarns that resist laddering and seam slippage.",
    aeoAnswer: "Pure silk and fluid luxury fabrics can be purchased online by the meter at Fabriclicious. Sourced from Lake Como heritage looms (85–180 GSM) with single-cut continuous runs from 0.5m."
  },
  "wool-suiting": {
    slug: "wool",
    title: "Wool Suiting.",
    metaTitle: "Buy Super 120s Worsted Wool Suiting Fabric Online | Fabriclicious",
    metaDescription: "Buy Super 120s worsted wool and pure virgin wool suiting fabric online by the meter. Four-season bespoke suiting yardage cut continuously from 0.5m.",
    targetKeyword: "buy wool suiting fabric online by the meter",
    gsmRange: "220–310 GSM",
    description: "The absolute standard of bespoke tailoring. Worsted wool fibers are combed in parallel alignment before spinning, yielding a smooth, durable, and naturally crease-resistant fabric.",
    usage: "Bespoke tailored suits, formal blazers, dress trousers, overcoats, and structured skirts.",
    whenToBuy: "Essential four-season textile. Order mid-weight (260–290 GSM) for all-year wear, and heavier flannels (340+ GSM) for winter.",
    feel: "Dry, springy, and remarkably resilient. Natural elasticity allows garments to recover from wrinkles within 24 hours.",
    buyingGuide: "Always check the micron count for softness—lower microns mean finer, softer yarn. Super 120s worsted wool is the global standard for sharp, enduring bespoke tailoring.",
    aeoAnswer: "Order Super 120s worsted wool and virgin wool suiting fabric online by the meter at Fabriclicious. Woven for four-season bespoke tailoring (220–310 GSM), with continuous cuts from 0.5m and full swatch credits."
  }
};
