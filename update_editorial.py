import re

content = """const editorialData: Record<string, { title: string; description: string; usage: string; whenToBuy: string; feel: string; buyingGuide: string }> = {
  linen: {
    title: "Linen.",
    description: "Woven from the fibers of the flax plant, linen is the definitive warm-weather textile. Its ancient pedigree and unmistakable natural luster make it a foundation of relaxed luxury.",
    usage: "Unstructured summer tailoring, breezy lightweight shirting, resort wear, and fluid trousers that demand a relaxed silhouette.",
    whenToBuy: "Secure your yardage during spring to prepare for high-summer collections, or year-round for tropical resort capsules.",
    feel: "Crisp, deeply textured, and incredibly breathable. It softens beautifully over time, developing a signature crumpled elegance that synthetic fibers cannot replicate.",
    buyingGuide: "Examine the slub—the natural variations in yarn thickness. Look for Irish or Belgian linen for the highest tensile strength and a tighter weave that resists excessive wrinkling.",
  },
  cotton: {
    title: "Cotton.",
    description: "The absolute cornerstone of the modern wardrobe. From razor-sharp poplins to substantial twills, pure cotton offers unmatched versatility, durability, and a naturally matte architectural finish.",
    usage: "Everyday foundational shirting, robust chinos, selvedge denim, and structured transitional knitwear.",
    whenToBuy: "A year-round necessity. Shift to heavier drills and moleskins in autumn, and lightweight poplins or voiles in summer.",
    feel: "Familiar, smooth, and naturally temperature-regulating. High-twist cottons feel crisp, while brushed cottons yield a soft, suede-like surface.",
    buyingGuide: "Prioritize long-staple varieties like authentic Egyptian, Pima, or Sea Island cotton. The longer the staple fiber, the silkier the hand-feel, the stronger the yarn, and the less it will pill over time.",
  },
  viscose: {
    title: "Viscose.",
    description: "A semi-synthetic marvel crafted from regenerated wood pulp that drapes like liquid silk. It is engineered to capture light and create movement-heavy, flowing silhouettes.",
    usage: "Flowing bias-cut dresses, wide-leg palazzo trousers, relaxed evening wear, and luxury linings that require zero static cling.",
    whenToBuy: "Ideal for spring and summer collections, or for evening capsule wardrobes requiring dramatic, heavy drape.",
    feel: "Silky, cool to the touch, and remarkably fluid with a subtle, sophisticated sheen that catches directional light.",
    buyingGuide: "Seek out Cupro (bemberg) for high-end linings, or EcoVero for a more sustainable, high-quality variation that offers better dimensional stability and resists excessive wrinkling.",
  },
  flannel: {
    title: "Flannel.",
    description: "A softly woven fabric, meticulously brushed on one or both sides to raise the fibers, creating a rich, fuzzy surface that traps heat while remaining exceptionally breathable.",
    usage: "Winter shirting, cozy unstructured suiting, cold-weather layering pieces, and luxury loungewear.",
    whenToBuy: "Procure in early autumn. Flannel is the definitive textile when insulation and tactile comfort become paramount.",
    feel: "Warm, plush, and supremely soft against the skin, offering an immediate sense of shelter from the elements.",
    buyingGuide: "For sharp tailoring, opt for worsted wool flannel which holds a crease beautifully. For casual shirting, a double-brushed cotton flannel offers the best balance of warmth, washability, and comfort.",
  },
  corduroy: {
    title: "Corduroy.",
    description: "A durable, ridged fabric with a distinctively retro appeal and excellent thermal properties. Its woven 'wales' create a deeply textured, architectural surface.",
    usage: "Heavyweight trousers, structured chore jackets, robust overshirts, and tactile autumn suiting.",
    whenToBuy: "Autumn and winter. It is a heavy, insulating fabric designed to cut through the chill.",
    feel: "Textured, ribbed, and sturdy with a soft pile that catches the light differently depending on the direction of the nap.",
    buyingGuide: "Pay strict attention to the 'wale' count (number of ridges per inch). Fine needlecord (14-16 wale) is subtler and suits shirting; thick jumbo cord (4-8 wale) is bolder, warmer, and ideal for outerwear.",
  },
  twill: {
    title: "Twill.",
    description: "Instantly recognizable by its distinct diagonal weave, twill is exceptionally durable, resists soiling, and drapes with a heavy, satisfying fall.",
    usage: "Classic chinos, heavy-duty shirting, utilitarian workwear, and structured transitional outerwear.",
    whenToBuy: "A true year-round workhorse, serving as a robust foundational fabric for any season.",
    feel: "Structured, substantial, and incredibly resilient, with a subtle surface texture that hides wear beautifully.",
    buyingGuide: "Look for a tight, even diagonal weave. Heavier, tightly-packed twills (like Cavalry twill) are superior for outerwear and trousers, while lighter twills suit durable shirting.",
  },
  suede: {
    title: "Suede.",
    description: "A luxurious, napped finish known for its incredibly soft, matte surface. While traditionally leather, modern micro-fiber suede offers exceptional durability and a flawless drape.",
    usage: "Premium lightweight outerwear, footwear, statement accessories, and structural accents.",
    whenToBuy: "Autumn and spring. It offers moderate warmth and incredible wind resistance, though it demands care in heavy rain.",
    feel: "Velvety, supple, and rich to the touch, with a nap that changes shade when brushed by hand.",
    buyingGuide: "Genuine suede should feel uniform, dense, and tightly napped. High-end faux suede (like Alcantara) can be a brilliant, durable, and water-resistant alternative for structural garments.",
  },
  velvet: {
    title: "Velvet.",
    description: "The absolute epitome of evening opulence. A complex woven tufted fabric with a dense, uniform pile that absorbs light to create incredibly deep, rich colors.",
    usage: "Smoking jackets, evening gowns, luxurious upholstery, and dramatic cold-weather statement pieces.",
    whenToBuy: "Secure ahead of the winter holidays and gala season for formal evening events.",
    feel: "Incredibly plush, smooth, and deeply soft, offering a tactile experience unlike any other textile.",
    buyingGuide: "Cotton velvet is stiffer, more matte, and highly durable; silk or rayon velvet is impossibly fluid, luminous, and drapes like water. Strictly avoid cheap synthetic velvets which look plastic and feel harsh.",
  },
  wool: {
    title: "Wool.",
    description: "Nature's original high-performance fiber. Naturally insulating, highly breathable, moisture-wicking, and remarkably resistant to wrinkling and odor.",
    usage: "Bespoke suiting, heavy structural coats, premium knitwear, and winter trousers.",
    whenToBuy: "Autumn through early spring, though finely spun 'tropical weight' wools are indispensable year-round.",
    feel: "Ranges dramatically from the cloud-like loft of pure cashmere to the crisp, dry structure of a high-twist worsted wool.",
    buyingGuide: "Always check the micron count for softness—lower microns mean finer, softer yarn. Merino is excellent for next-to-skin knitwear, while tightly spun worsted wool is the global standard for sharp tailoring.",
  },
  fleece: {
    title: "Fleece.",
    description: "A highly engineered insulating fabric designed to mimic the extreme warmth of wool at a fraction of the physical weight.",
    usage: "Technical activewear, casual mid-layers, outdoor recreation gear, and winter linings.",
    whenToBuy: "Deep winter for active pursuits, alpine environments, or casual cold-weather lounging.",
    feel: "Lofty, extremely lightweight, and instantly cozy, trapping body heat immediately upon wear.",
    buyingGuide: "Look for high-pile or branded Polartec variants which guarantee maximum thermal retention and structural durability without the excessive pilling found in cheaper alternatives.",
  },
  tweed: {
    title: "Tweed.",
    description: "A rough, woolen fabric, famously woven with heavily mixed color yarns to create a deeply textured, rustic, and weather-resistant surface.",
    usage: "Country suiting, winter sport coats, rugged outerwear, and heavy hunting-inspired garments.",
    whenToBuy: "Autumn and deep winter. Tweed was historically built to withstand the harsh, damp cold of the Scottish Highlands.",
    feel: "Coarse, dense, and heavily textured, offering a stiff armor-like structure that molds to the wearer over years.",
    buyingGuide: "Authentic Harris Tweed remains the gold standard. Look for complex, multi-tonal color variations in the yarn and a tight, wind-resistant weave that feels virtually indestructible.",
  }
};
"""

with open("src/app/(storefront)/fabrics/page.tsx", "r", encoding="utf-8") as f:
    code = f.read()

# Find the start of the object
start_idx = code.find("const editorialData:")
if start_idx == -1:
    print("Could not find editorialData")
    exit(1)

# Find the end of the object
end_idx = code.find("};\n\ntype Props = {", start_idx)
if end_idx == -1:
    print("Could not find end of editorialData")
    exit(1)

end_idx += 2

new_code = code[:start_idx] + content + code[end_idx:]

with open("src/app/(storefront)/fabrics/page.tsx", "w", encoding="utf-8") as f:
    f.write(new_code)

print("Replaced successfully")
