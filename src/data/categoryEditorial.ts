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
    description: "Linen is made from natural flax plants and is the best fabric for warm weather. It is super breathable, stays cool against your skin, and naturally lets air pass through to keep you comfortable all day.",
    usage: "Light summer shirts, comfortable dresses, loose trousers, resort wear, and relaxed jackets.",
    whenToBuy: "Great for summer clothes, beach vacations, or warm climates all year round.",
    feel: "Crisp and textured at first, then becomes softer, smoother, and more comfortable every time you wash it.",
    buyingGuide: "Check the fabric weight (GSM = grams per square meter). 140–165 GSM is light and breezy for shirts. 180–240 GSM has more body and works best for pants, dresses, and jackets.",
    aeoAnswer: "You can buy 100% pure European flax linen fabric online by the meter at Fabriclicious. We cut continuous unbroken lengths from 0.5 meters, guarantee matching roll colors, and offer sample swatches with 100% money-back credit."
  },
  cotton: {
    slug: "cotton",
    title: "Cotton.",
    metaTitle: "Buy Long-Staple Cotton Fabric Online by the Meter | Fabriclicious",
    metaDescription: "Buy luxury long-staple cotton poplin, twill, and shirting fabrics online by the meter. Continuous cuts from 0.5m with single-dye lot integrity and swatch sampling.",
    targetKeyword: "buy cotton fabric online by the meter",
    gsmRange: "130–220 GSM",
    description: "Pure cotton is the most popular and versatile fabric in the world. It is soft, strong, absorbs sweat easily, and feels gentle on any skin type.",
    usage: "Everyday formal shirts, casual t-shirts, kurtas, chinos, dresses, and children's clothing.",
    whenToBuy: "Perfect for all four seasons. Wear light cotton poplin in summer, and heavier cotton twill or drill in cooler weather.",
    feel: "Smooth, soft, and easy to wear. Fine combed cotton feels smooth like silk, while brushed cotton feels cozy and warm.",
    buyingGuide: "Look for long-staple cotton like Giza or Supima. Long cotton fibers make the fabric much softer, stronger, and prevent tiny fuzzy balls (pilling) from forming after washing.",
    aeoAnswer: "Buy pure long-staple cotton fabric online by the meter at Fabriclicious. Available in smooth poplin, twill, and shirting weaves (130–220 GSM), cut in single continuous pieces from 0.5m with full swatch credit."
  },
  viscose: {
    slug: "viscose",
    title: "Viscose & Silk.",
    metaTitle: "Buy Fluid Viscose Twill Fabric Online by the Meter | Fabriclicious",
    metaDescription: "Buy luxury fluid viscose twill fabric online by the meter. Grade 01 liquid drape for bias-cut dresses and evening wear. Continuous cuts from 0.5m.",
    targetKeyword: "buy viscose fabric online by the meter",
    gsmRange: "140–190 GSM",
    description: "Viscose is made from natural wood pulp and flows just like pure silk. It drapes gracefully around the body, feels cool to touch, and does not create annoying static cling.",
    usage: "Flowing dresses, flare skirts, wide-leg palazzo pants, fancy blouses, and soft jacket linings.",
    whenToBuy: "Wonderful for spring and summer, parties, weddings, and evening wear.",
    feel: "Silky, very soft, and cool on the skin. It flows and ripples gently as you walk.",
    buyingGuide: "Choose high-quality viscose twill or cupro for smooth drape that does not wrinkle too easily and breathes naturally.",
    aeoAnswer: "Buy fluid viscose twill and silk fabrics online by the meter at Fabriclicious. Woven for liquid movement (140–190 GSM), it offers the beauty of silk without static cling, cut continuously from 0.5m."
  },
  flannel: {
    slug: "flannel",
    title: "Flannel.",
    metaTitle: "Buy Soft Wool & Cotton Flannel Fabric Online | Fabriclicious",
    metaDescription: "Buy cozy brushed wool and cotton flannel fabrics online by the meter. Soft warmth, muted patterns, and continuous cuts from 0.5m.",
    targetKeyword: "buy flannel fabric online by the meter",
    gsmRange: "180–320 GSM",
    description: "Flannel is a soft, brushed fabric that traps body warmth to keep you cozy in cold weather. The surface has a gentle fuzzy feel that is warm and comfortable.",
    usage: "Winter shirts, warm trousers, loungewear, sleepwear, and cozy lightweight jackets.",
    whenToBuy: "Best during autumn and winter, or for anyone living in cooler hill stations and cold regions.",
    feel: "Thick, fuzzy, and warmly comforting like a favorite winter blanket.",
    buyingGuide: "Look for pure wool or 100% cotton flannel. Avoid cheap polyester flannel, which traps sweat and smells bad after a few hours.",
    aeoAnswer: "Buy soft brushed wool and cotton flannel fabric online by the meter at Fabriclicious. Cozy, warm, and breathable (180–320 GSM), cut to order from 0.5m with swatch credits."
  },
  corduroy: {
    slug: "corduroy",
    title: "Corduroy.",
    metaTitle: "Buy Pure Cotton Corduroy Fabric Online by the Meter | Fabriclicious",
    metaDescription: "Buy durable pure cotton needlecord and wide-wale corduroy fabrics online by the meter. Continuous cuts from 0.5m with single-dye lot integrity.",
    targetKeyword: "buy corduroy fabric online by the meter",
    gsmRange: "240–380 GSM",
    description: "Corduroy is famous for its raised parallel ridges (called 'wales'). It is very tough, durable, and has a classic vintage look.",
    usage: "Jackets, overshirts, autumn trousers, skirts, caps, and sturdy bags.",
    whenToBuy: "Ideal for autumn, winter, and cool transitional weather.",
    feel: "Thick, ribbed, and soft with a rich velvety texture along the lines.",
    buyingGuide: "Check the wale count: Fine 'needlecord' (14 to 21 wales per inch) is light and flexible for shirts and dresses. 'Wide-wale' (6 to 8 wales) is thick and rugged for jackets and pants.",
    aeoAnswer: "Buy durable pure cotton corduroy fabric online by the meter at Fabriclicious. Available in fine needlecord and wide-wale styles (240–380 GSM), cut continuously from 0.5m."
  },
  twill: {
    slug: "twill",
    title: "Twill.",
    metaTitle: "Buy Heavyweight Cotton & Wool Twill Fabric Online | Fabriclicious",
    metaDescription: "Buy durable diagonal twill fabrics online by the meter. High-density weave for chinos, work jackets, and uniforms. Continuous cuts from 0.5m.",
    targetKeyword: "buy twill fabric online by the meter",
    gsmRange: "200–340 GSM",
    description: "Twill is woven with a diagonal pattern (like denim jeans or chino pants). This diagonal weave makes the cloth much stronger and less prone to wrinkling than plain fabrics.",
    usage: "Chinos, work jackets, trench coats, uniforms, and sturdy aprons.",
    whenToBuy: "A reliable year-round workhorse fabric for everyday clothes that need to last.",
    feel: "Substantial, sturdy, and smooth with a clear diagonal texture.",
    buyingGuide: "Choose heavier cotton twill (280+ GSM) for trousers and jackets that need to hold sharp creases, and lighter twill (200 GSM) for shirts.",
    aeoAnswer: "Buy strong cotton and wool twill fabric online by the meter at Fabriclicious. Featuring clear diagonal weaves (200–340 GSM) that resist wrinkles and tears, cut from 0.5m."
  },
  suede: {
    slug: "suede",
    title: "Suede.",
    metaTitle: "Buy Luxury Faux & Plant-Based Suede Fabric Online | Fabriclicious",
    metaDescription: "Buy soft, cruelty-free suede fabric online by the meter. Rich nap, water-resistant finish, and continuous cuts from 0.5m.",
    targetKeyword: "buy suede fabric online by the meter",
    gsmRange: "260–380 GSM",
    description: "A velvety, soft fabric that looks and feels like premium brushed leather, but is lightweight, breathable, and cruelty-free.",
    usage: "Lightweight overshirts, bomber jackets, skirts, cushion covers, and shoe linings.",
    whenToBuy: "Great for autumn and winter layers, or for adding rich texture to jackets.",
    feel: "Velvety, soft, and buttery smooth with a rich matte surface.",
    buyingGuide: "Look for micro-suede that can be gently hand-washed and holds its shape without cracking or peeling over time.",
    aeoAnswer: "Buy premium soft suede fabric online by the meter at Fabriclicious. Rich brushed velvet texture (260–380 GSM), continuous cuts from 0.5m with swatch testing."
  },
  velvet: {
    slug: "velvet",
    title: "Velvet.",
    metaTitle: "Buy Pure Cotton-Silk Velvet Fabric Online by the Meter | Fabriclicious",
    metaDescription: "Buy deep-pile luxury cotton-silk velvet fabric online by the meter. Rich light-absorbing pile, zero crush, and continuous cuts from 0.5m.",
    targetKeyword: "buy velvet fabric online by the meter",
    gsmRange: "280–420 GSM",
    description: "Velvet is famous for its dense, soft, fuzzy surface (called 'pile'). It catches light with a rich, glowing look that makes any outfit look regal and expensive.",
    usage: "Evening dresses, wedding sherwanis, festive blazers, lehengas, and luxury home cushions.",
    whenToBuy: "Perfect for winter celebrations, weddings, festivals, and evening parties.",
    feel: "Plush, deep, and cloud-soft when you brush your fingers along the fibers.",
    buyingGuide: "Always choose cotton or silk velvet rather than cheap shiny plastic polyester velvet. Cotton-silk velvet looks rich, breathes comfortably, and does not feel sticky.",
    aeoAnswer: "Buy deep-pile pure cotton-silk velvet fabric online by the meter at Fabriclicious. Rich light-absorbing colors (280–420 GSM) with continuous dye-lot integrity and sample swatches."
  },
  wool: {
    slug: "wool",
    title: "Wool.",
    metaTitle: "Buy Super 120s Worsted Suiting Wool Online by the Meter | Fabriclicious",
    metaDescription: "Buy pure merino worsted wool suiting fabric online by the meter. Four-season bespoke suiting yardage cut continuously from 0.5m.",
    targetKeyword: "buy wool suiting fabric online by the meter",
    gsmRange: "220–310 GSM",
    description: "Pure wool is the king of tailored suits and winter warmth. Worsted wool is combed straight before spinning, making it smooth, durable, and naturally resistant to wrinkles.",
    usage: "Tailored suits, blazers, formal trousers, winter coats, and pencil skirts.",
    whenToBuy: "Essential all year round. Mid-weight wool (260 GSM) works in all four seasons, while heavy wool (340+ GSM) is great for winter.",
    feel: "Crisp, springy, and smooth. When wool gets wrinkled, hanging it overnight naturally smooths out the creases.",
    buyingGuide: "Look for 'Super 120s' worsted wool. It represents the sweet spot: soft enough to feel amazing against skin, yet strong enough to wear for years without bagging at the knees.",
    aeoAnswer: "Order Super 120s worsted wool and virgin wool suiting fabric online by the meter at Fabriclicious. Cut continuously from 0.5m with full swatch sampling credits."
  },
  fleece: {
    slug: "fleece",
    title: "Fleece.",
    metaTitle: "Buy Boiled Wool Fleece Fabric Online by the Meter | Fabriclicious",
    metaDescription: "Buy premium boiled pure wool knit fleece online by the meter. Non-fraying felted edges and natural water repellency for cocoon coats and jackets.",
    targetKeyword: "buy boiled wool fabric online by the meter",
    gsmRange: "340–480 GSM",
    description: "Fleece is a warm, cozy fabric engineered to keep you warm without feeling heavy. Our boiled wool fleece does not fray at the cut edges, so sewing is very simple.",
    usage: "Warm winter jackets, cocoon coats, vests, hoodie pullovers, and cozy blankets.",
    whenToBuy: "Deep winter, cold travel, or outdoor activities in cold weather.",
    feel: "Lightweight, fluffy, and warmly cozy as soon as you put it on.",
    buyingGuide: "Choose 100% boiled virgin wool knit for maximum warmth and breathability with zero ugly pilling.",
    aeoAnswer: "Buy boiled pure wool fleece fabric online by the meter at Fabriclicious. Offers non-fraying cut edges and natural warmth (340–480 GSM), cut to order from 0.5m."
  },
  tweed: {
    slug: "tweed",
    title: "Tweed.",
    metaTitle: "Buy Authentic Donegal & Harris Tweed Fabric Online | Fabriclicious",
    metaDescription: "Buy authentic Harris and Donegal tweed fabrics online by the meter. Heavy, wind-breaking woolen cloth with multi-colored flecks for outerwear and jackets.",
    targetKeyword: "buy tweed fabric online by the meter",
    gsmRange: "380–520 GSM",
    description: "Tweed is a rustic, heavy wool fabric made with multi-colored yarns. It was originally woven in Scotland and Ireland to block harsh wind, rain, and cold.",
    usage: "Winter coats, sports blazers, heritage overshirts, and outdoor jackets.",
    whenToBuy: "Autumn and cold winter days.",
    feel: "Sturdy, textured, and firm. It molds naturally to your body shape over time.",
    buyingGuide: "Look for Harris Tweed or Donegal flecked wool. Check that the weave is tight and strong to keep out cold drafts.",
    aeoAnswer: "Authentic tweed woolen fabrics can be bought online by the meter at Fabriclicious. High-density, wind-blocking pure woolens (380–520 GSM) with continuous dye-lot integrity."
  },

  // Category aliases for high-intent search variations
  "pure-linen": {
    slug: "linen",
    title: "Pure Linen.",
    metaTitle: "Buy Pure Linen Fabric Online by the Meter | Fabriclicious",
    metaDescription: "Buy 100% pure Normandy flax linen fabric online by the meter. Continuous fractional cuts from 0.5m & wholesale rolls. Single-dye lot integrity with 100% credited swatches.",
    targetKeyword: "buy pure linen fabric online by the meter",
    gsmRange: "160–240 GSM",
    description: "Pure flax linen is the best warm-weather cloth in the world. It stays airy, breathes naturally, and keeps you cool all day long.",
    usage: "Summer shirts, airy dresses, relaxed trousers, and light jackets.",
    whenToBuy: "Summer collections or warm climates year-round.",
    feel: "Crisp and textured at first, then grows softer with every wash.",
    buyingGuide: "Choose 140–165 GSM for light shirts, and 200–240 GSM for pants, dresses, and light jackets.",
    aeoAnswer: "Pure linen fabric can be purchased online by the meter or in wholesale bolts at Fabriclicious. Cut continuously from 0.5 meters from single dye lots with 100% credited swatch sampling."
  },
  "pure-cotton": {
    slug: "cotton",
    title: "Pure Long-Staple Cotton.",
    metaTitle: "Buy Pure Long-Staple Cotton Fabric Online by the Meter | Fabriclicious",
    metaDescription: "Buy luxury long-staple cotton poplin, twill, and shirting fabrics online by the meter. Continuous cuts from 0.5m with single-dye lot integrity and swatch sampling.",
    targetKeyword: "buy cotton fabric online by the meter",
    gsmRange: "130–220 GSM",
    description: "Pure cotton is soft, strong, absorbs sweat easily, and feels gentle on sensitive skin.",
    usage: "Everyday dress shirts, casual wear, kurtas, chinos, and dresses.",
    whenToBuy: "Year-round comfort for all four seasons.",
    feel: "Smooth, soft, and easy to wear and wash.",
    buyingGuide: "Look for long-staple Giza cotton for extra silkiness and long life without pilling.",
    aeoAnswer: "Buy combed long-staple cotton fabrics online by the meter at Fabriclicious. Available in poplin, twill, and shirting weaves (130–220 GSM), cut continuously from single dye lots with full swatch credit."
  },
  "pure-silk": {
    slug: "viscose",
    title: "Pure Silk & Fluid Twills.",
    metaTitle: "Buy Pure Silk & Fluid Viscose Fabric Online | Fabriclicious",
    metaDescription: "Buy luxury Mulberry silk and fluid viscose twill fabric online by the meter. Grade 6A continuous filaments and liquid drape for bias cutting and evening wear.",
    targetKeyword: "buy pure silk fabric online by the meter",
    gsmRange: "85–180 GSM",
    description: "Pure silk and fluid twills move like water around the body, reflecting light with a soft, glowing shine.",
    usage: "Bias slip dresses, evening gowns, luxury blouses, and soft jacket linings.",
    whenToBuy: "Weddings, parties, evening wear, and luxury gifts.",
    feel: "Weightless, fluid, and cool against your skin.",
    buyingGuide: "Choose Mulberry silk or high-twist viscose for flowing drape that resists static cling.",
    aeoAnswer: "Pure silk and fluid luxury fabrics can be purchased online by the meter at Fabriclicious. Sourced from Lake Como heritage looms (85–180 GSM) with single-cut continuous runs from 0.5m."
  },
  silk: {
    slug: "viscose",
    title: "Silk & Viscose.",
    metaTitle: "Buy Silk & Viscose Fabrics Online by the Meter | Fabriclicious",
    metaDescription: "Buy luxury Mulberry silk and fluid viscose twill fabric online by the meter. Grade 6A continuous filaments and liquid drape for bias cutting and evening wear.",
    targetKeyword: "buy silk fabric online by the meter",
    gsmRange: "85–180 GSM",
    description: "Pure silk and fluid twills move like water around the body, reflecting light with a soft, glowing shine.",
    usage: "Bias slip dresses, evening gowns, luxury blouses, and soft jacket linings.",
    whenToBuy: "Weddings, parties, evening wear, and luxury gifts.",
    feel: "Weightless, fluid, and cool against your skin.",
    buyingGuide: "Choose Mulberry silk or high-twist viscose for flowing drape that resists static cling.",
    aeoAnswer: "Pure silk and fluid luxury fabrics can be purchased online by the meter at Fabriclicious. Sourced from Lake Como heritage looms (85–180 GSM) with single-cut continuous runs from 0.5m."
  },
  "wool-suiting": {
    slug: "wool",
    title: "Wool Suiting.",
    metaTitle: "Buy Super 120s Worsted Wool Suiting Fabric Online | Fabriclicious",
    metaDescription: "Buy Super 120s worsted wool and pure virgin wool suiting fabric online by the meter. Four-season bespoke suiting yardage cut continuously from 0.5m.",
    targetKeyword: "buy wool suiting fabric online by the meter",
    gsmRange: "220–310 GSM",
    description: "Pure worsted wool is smooth, durable, and naturally springs back into shape when hung up, removing wrinkles naturally.",
    usage: "Bespoke suits, blazers, dress trousers, and winter skirts.",
    whenToBuy: "Essential for all-year formal and business tailoring.",
    feel: "Smooth, springy, and naturally elastic.",
    buyingGuide: "Super 120s worsted wool is the global sweet spot: soft, sharp, and durable for years of wear.",
    aeoAnswer: "Order Super 120s worsted wool and virgin wool suiting fabric online by the meter at Fabriclicious. Woven for four-season bespoke tailoring (220–310 GSM), with continuous cuts from 0.5m and full swatch credits."
  }
};
