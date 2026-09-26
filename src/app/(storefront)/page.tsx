"use client";

import Link from "next/link";
import { AtelierHeroSection } from "@/components/AtelierHeroSection";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;

    // Cinematic Intro Sequence
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-text-line", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.1, ease: "power4.out", delay: 0.2 }
    )
    .fromTo(".hero-image",
      { scale: 1.1, opacity: 0, filter: "blur(20px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 2, ease: "power3.out" },
      "-=1"
    );

    // Scroll pinned section
    ScrollTrigger.create({
      trigger: ".manifesto-section",
      start: "top top",
      end: "+=150%",
      pin: true,
      animation: gsap.fromTo(".manifesto-text", 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2, ease: "power2.out" }
      ),
      scrub: 1,
    });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-linen text-umber min-h-screen selection:bg-loam selection:text-linen">
      
      <AtelierHeroSection />

      {/* Manifesto Pinned Section */}
      <section className="manifesto-section h-screen bg-limestone flex flex-col items-center justify-center p-6 md:p-24 relative overflow-hidden">
        <div className="max-w-4xl text-center">
          <span className="manifesto-text font-mono text-xs uppercase tracking-[0.3em] text-loam block mb-8 md:mb-12">
            OUR CONVICTION
          </span>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight tracking-tight mb-8">
            <span className="manifesto-text inline-block">A garment's silhouette is decided long before the shears touch the cloth.</span>
          </h2>
          <div className="space-y-6 font-sans text-sm md:text-base text-umber/80 leading-relaxed text-left max-w-3xl mx-auto">
            <p className="manifesto-text">
              Every master tailor understands that true garment longevity is determined by yarn physics. Our fibers originate in the mineral-rich soil of Northern France, the alpine grazing valleys of New Zealand, and the historic water-powered mills of Lombardy. We refuse synthetic polyester dilution, selecting only natural fibers spun with balanced twist to prevent seam torque.
            </p>
            <p className="manifesto-text">
              Purchasing textiles online often creates anxiety over texture and weight. Fabriclicious replaces guesswork with transparent mechanical data: exact GSM weight, weave architecture, and drape coefficients. From the cool, dry friction of unbleached linen to the heavy, liquid glide of 19-momme silk charmeuse, our cloth behaves predictably on the cutting table.
            </p>
            <p className="manifesto-text">
              In our atelier, fabric is never pulled or mechanically stressed. Every bolt rests for 24 hours on hardwood tables before cutting. When your pattern calls for 3.4 meters, our cutters slice precisely 3.4 unbroken meters along the weft line, preserving the grainline for your garment.
            </p>
          </div>
        </div>
      </section>

      {/* Our Range of Fabrics */}
      <section className="py-32 px-6 md:px-10">
        <div className="mb-16">
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight">Our Range of Fabrics</h2>
        </div>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 pb-10 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {[
            { name: "Normandy Dry-Retted Flax", slug: "linen", weight: "160–240 GSM", image: "/cat_linen.jpg", category: "Linen", description: "Dry, cooling hand-feel with natural slub yarn variation; softens gradually with laundering.", silhouette: "Unlined blazers, wide-leg trousers, relaxed summer shirting.", aeo: "Pure linen is a breathable bast fiber fabric woven from flax, offering high tensile strength, natural cooling, and distinctive slub texture for warm-weather tailoring." },
            { name: "Giza Long-Staple Twill", slug: "cotton", weight: "130–220 GSM", image: "/cat_cotton.jpg", category: "Cotton", description: "Combed, mercerized long-staple yarns with a compact weave and a subtle natural luster.", silhouette: "Bespoke dress shirting, tailored trench accents, pleated dresses.", aeo: "Long-staple cotton twill is a durable diagonal-weave textile woven from extra-long fibers, delivering superior tear resistance and a smooth, pill-resistant surface." },
            { name: "Lenzing Fluid Twill", slug: "viscose", weight: "140–190 GSM", image: "/cat_viscose.jpg", category: "Viscose", description: "Heavy, cooling liquid drape that mimics silk filament fall without synthetic static cling.", silhouette: "Bias-cut slip dresses, draped cowl necklines, resort robes.", aeo: "High-grade viscose is a semi-synthetic cellulosic fiber derived from certified wood pulp, engineered for ultra-fluid drape and high breathability." },
            { name: "Emerized Cotton Loam", slug: "flannel", weight: "180–230 GSM", image: "/cat_flannel.jpg", category: "Flannel", description: "Double-brushed surface producing a velvet-like nap that traps thermal warmth without bulk.", silhouette: "Overshirts, tailored loungewear, lined winter trousers.", aeo: "Cotton flannel is a soft woven fabric brushed on both sides to lift fiber ends, creating insulating air pockets for lightweight winter warmth." },
            { name: "Architectural Wale Cotton", slug: "corduroy", weight: "280–380 GSM", image: "/cat_corduroy.jpg", category: "Corduroy", description: "Cut-pile rounded ribs that absorb raking light; dense, durable, and naturally wind-resistant.", silhouette: "Tailored workwear jackets, A-line skirts, winter trousers.", aeo: "Corduroy is a durable ribbed textile woven with extra weft threads that are cut to form distinct vertical wales, providing structural warmth and durability." },
            { name: "Cavalry Worsted Wool", slug: "twill", weight: "260–340 GSM", image: "/cat_twill.jpg", category: "Twill", description: "Pronounced double-diagonal twill lines offering natural wrinkle recovery and sharp press retention.", silhouette: "Military-style coats, sharp pencil skirts, formal suiting.", aeo: "Cavalry twill is a rugged, steep-angled twill textile woven from worsted wool yarns, known for its diagonal ribs, shape retention, and wear resistance." },
            { name: "Micro-Filament Matte Cloth", slug: "suede", weight: "300–420 GSM", image: "/cat_suede.jpg", category: "Suede", description: "Fine, velvety surface mimicking brushed calfskin; substantial weight with fluid flexibility.", silhouette: "Wrap trench coats, modular overshirts, structured capelets.", aeo: "Technical fabric suede is a dense, non-woven micro-fiber textile offering the matte appearance and tactile nap of animal suede with uniform drape." },
            { name: "Cotton-Silk High-Pile", slug: "velvet", weight: "320–460 GSM", image: "/cat_velvet.jpg", category: "Velvet", description: "Deep, light-absorbing pile with multi-directional luster and saturated dye depth.", silhouette: "Formal dinner jackets, winter evening capes, structural gowns.", aeo: "Cotton-silk velvet is a tufted, cut-pile woven fabric featuring dense vertical surface yarns that reflect light and offer rich thermal weight." },
            { name: "Super 120s Worsted Suiting", slug: "wool", weight: "220–310 GSM", image: "/cat_wool.jpg", category: "Wool", description: "Lightweight, four-season virgin wool with natural crimp bounce and sharp crease memory.", silhouette: "Classic two-piece suits, pleated trousers, structured vests.", aeo: "Super 120s worsted wool is a fine suiting textile woven from combed virgin wool fibers measuring 17.5 microns, providing breathable, year-round comfort." },
            { name: "Boiled Pure Wool Knit", slug: "fleece", weight: "340–480 GSM", image: "/cat_fleece.jpg", category: "Fleece", description: "Controlled-shrinkage felted wool; raw edges will not fray; naturally water-repellent.", silhouette: "Unlined cocoon coats, modern car coats, sculptural jackets.", aeo: "Boiled wool is a felted knit textile pre-shrunk in hot water to create a dense, wind-resistant fabric with stable raw-edge cutting properties." },
            { name: "Donegal Flecked Cheviot", slug: "tweed", weight: "380–520 GSM", image: "/cat_tweed.jpg", category: "Tweed", description: "Rustic woolen yarns woven with multi-colored flecks; substantial, wind-breaking body.", silhouette: "Heavy winter overcoats, hacking jackets, tailored capes.", aeo: "Donegal tweed is a traditional woolen textile woven from coarse, sturdy yarns with contrasting color neps, offering rugged durability and weather defense." }
          ].map((cat, idx) => (
            <Link href={`/fabrics?category=${cat.slug}`} key={cat.slug} className={`relative block snap-center shrink-0 w-[80vw] md:w-auto h-[70vh] md:h-[60vh] overflow-hidden group rounded-2xl bg-limestone border border-hemp transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(28,26,24,0.06)] hover:border-loam flex flex-col justify-end ${idx === 0 || idx === 7 ? 'md:col-span-2 md:row-span-2 md:h-[90vh]' : ''}`}>
              <motion.div 
                whileHover={{ scale: 1.08 }} 
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0 w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </motion.div>
              <div className="relative z-10 p-6 bg-limestone/85 backdrop-blur-xl border-t border-hemp transition-all duration-500 ease-in-out transform translate-y-0 group-hover:-translate-y-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-umber/80 mb-2">{cat.category}</p>
                <h3 className="font-serif text-2xl md:text-3xl text-umber mb-2 transition-transform duration-500 group-hover:translate-x-1">{cat.name}</h3>
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-bark mb-4">{cat.weight}</p>
                <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  <div className="overflow-hidden space-y-3 border-t border-hemp/50 pt-3">
                    <p className="font-sans text-xs leading-relaxed text-umber/85">{cat.description}</p>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-loam leading-relaxed">
                      <span className="font-semibold">Silhouette //</span> {cat.silhouette}
                    </p>
                    <p className="font-sans text-[10px] leading-relaxed text-umber/70 border-t border-hemp/30 pt-2 italic">
                      {cat.aeo}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-umber' : 'bg-hemp'}`} />
          ))}
        </div>
      </section>

      {/* The Tactile Swatch Guarantee */}
      <section className="py-24 px-6 md:px-10 bg-umber text-linen">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-8">Never Guess a Drape. Inspect the Fiber First.</h2>
          <div className="bg-loam/20 p-6 rounded-xl border border-linen/20 mb-12">
            <p className="font-sans text-sm md:text-base leading-relaxed text-linen/90">
              To eliminate the uncertainty of purchasing high-end fabrics online, Fabriclicious provides 10&times;10 cm specimen swatches for a nominal fee of $4.00. When you place a subsequent order of 2.0 meters or more of any sampled fabric, your sampling investment is automatically credited to your order.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div>
              <span className="text-mint font-mono text-sm block mb-2">01. Order Curated Specimens</span>
              <p className="font-sans text-sm text-linen/80">Select up to five swatches in a protective portfolio.</p>
            </div>
            <div>
              <span className="text-mint font-mono text-sm block mb-2">02. Inspect in Your Atelier</span>
              <p className="font-sans text-sm text-linen/80">Test the hand-feel, stretch along the true bias, examine the dye in natural daylight, and evaluate drape over a dress form.</p>
            </div>
            <div>
              <span className="text-mint font-mono text-sm block mb-2">03. 100% Credit on Yardage</span>
              <p className="font-sans text-sm text-linen/80">Check out with continuous meterage, and your credit applies automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Master Weaver FAQ Module */}
      <section className="py-24 px-6 md:px-10 bg-limestone">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h3 className="font-serif text-2xl mb-3">What is the minimum cut length for fabrics at Fabriclicious?</h3>
            <p className="font-sans text-sm text-umber/80 leading-relaxed">
              The minimum cut length at Fabriclicious is exactly 0.5 meters (50 centimeters). Above 0.5 meters, continuous yardage can be ordered in precision increments of 0.1 meters (10 centimeters), allowing you to acquire only the yardage your garment marker demands without unnecessary waste.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl mb-3">How does Fabriclicious ensure continuous yardage without roll breaks?</h3>
            <p className="font-sans text-sm text-umber/80 leading-relaxed">
              Every continuous order is allocated from a single physical warehouse roll using atomic inventory locking. We never splice or combine fragmented remnants; your order is guaranteed to arrive as a single, unbroken length from one matching dye lot.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl mb-3">What does fabric GSM mean and how do I choose the correct weight?</h3>
            <p className="font-sans text-sm text-umber/80 leading-relaxed">
              GSM stands for Grams per Square Meter, measuring the physical density of the cloth. Lightweight fabrics (80–150 GSM) suit fluid blouses and bias dresses; medium weights (160–250 GSM) suit tailored shirts and trousers; heavy weights (260–500+ GSM) provide the structure required for blazers and coats.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Journal Preview */}
      <section className="py-32 px-6 md:px-10 bg-linen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-loam mb-4 block">Mithila Enterprises Journal</span>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-umber">Sartorial Masterclasses</h2>
            </div>
            <Link href="/journal" className="font-mono text-xs uppercase tracking-widest text-umber hover:text-loam transition-colors border-b border-umber pb-1 hover:border-loam">
              Explore Full Archive →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/journal/mastering-true-bias" className="group block bg-limestone rounded-2xl p-8 border border-hemp hover:border-loam/50 transition-colors">
              <span className="font-mono text-[10px] uppercase tracking-wider text-loam bg-loam/10 px-3 py-1 rounded-full border border-loam/30 mb-4 inline-block">Craftsmanship</span>
              <h3 className="font-serif text-3xl text-umber group-hover:text-loam transition-colors mb-4">Mastering the True Bias: Cutting Silk Charmeuse</h3>
              <p className="font-sans text-sm text-umber/70 leading-relaxed mb-6">An atelier guide to calculating diagonal grainline ease, preventing seam puckering, and calibrating needle tension.</p>
              <span className="font-mono text-[10px] uppercase tracking-widest text-umber group-hover:text-loam transition-colors">Read Masterclass →</span>
            </Link>
            <Link href="/journal/belgian-flax-linen-tailoring-guide" className="group block bg-limestone rounded-2xl p-8 border border-hemp hover:border-loam/50 transition-colors">
              <span className="font-mono text-[10px] uppercase tracking-wider text-loam bg-loam/10 px-3 py-1 rounded-full border border-loam/30 mb-4 inline-block">Tailoring Masterclass</span>
              <h3 className="font-serif text-3xl text-umber group-hover:text-loam transition-colors mb-4">Bespoke Linen Construction: Pressing Protocols</h3>
              <p className="font-sans text-sm text-umber/70 leading-relaxed mb-6">Why high-GSM Belgian flax linen demands traditional haircloth interfacing and steam molding.</p>
              <span className="font-mono text-[10px] uppercase tracking-widest text-umber group-hover:text-loam transition-colors">Read Masterclass →</span>
            </Link>
          </div>
        </div>
      </section>
      
    </main>
  );
}
