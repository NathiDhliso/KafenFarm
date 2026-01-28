import { Clock, Coins, Backpack, Droplet, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { usePageMeta } from "@/hooks/use-page-meta";
import { staggerContainer, fadeInUp } from "@/lib/animation-variants";

export default function Activities() {
  usePageMeta({
    title: "Hiking, Picnic Spots & Activities at Kafen Farm | Johannesburg South",
    description:
      "Looking for things to do near Lawley? Kafen Farm offers safe hiking trails, picnic spots, swimming pool access, and seasonal farmers market food stalls for the whole family at our Elandsfontein farm.",
    keywords:
      "hiking trails near Lawley, family farm activities JHB South, picnic spots Elandsfontein, swimming pool Johannesburg South, things to do in Johannesburg South, Kafen Farm",
  });

  return (
    <main>
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <img
            src="/KafenFarmPics/KafenFarm_Grass_Picnic_005.webp"
            alt="Hiking trails at golden hour"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-72 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/40" />
        </div>
        <div className="container py-20 md:py-28">
          <h1 className="text-white text-[48px] md:text-[56px] font-semibold leading-tight">Our Activities</h1>
          <p className="text-white/90 max-w-2xl mt-4">
            Hiking, picnic spots and more. Explore joyful experiences for families and friends across Kafen Farm — including hiking trails near Lawley, family-friendly picnic lawns, a seasonal farmers market with food stalls, and a swimming pool for warm days.
          </p>
        </div>
      </section>

      <motion.section
        className="container py-14 md:py-20 grid gap-10 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div variants={fadeInUp} className="rounded-xl border bg-card p-6 shadow-card">
          <div className="flex items-center gap-3">
            <Clock className="text-accent" />
            <h3 className="text-base">Operating Hours</h3>
          </div>
          <p className="mt-4 text-muted-foreground">
            Wed–Sun: 8:00–17:30. Public holidays open. Last trail entry 16:00.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="rounded-xl border bg-card p-6 shadow-card">
          <div className="flex items-center gap-3">
            <Coins className="text-accent" />
            <h3 className="text-base">Pricing</h3>
          </div>
          <p className="mt-4 text-muted-foreground">
            Adults from R60, kids under 12 from R30. Swimming pool access R30. Farmers market items priced by vendor.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="rounded-xl border bg-card p-6 shadow-card">
          <div className="flex items-center gap-3">
            <Backpack className="text-accent" />
            <h3 className="text-base">What to Bring</h3>
          </div>
          <p className="mt-4 text-muted-foreground">
            Comfortable shoes, sunscreen, water, swimwear and towel for pool access, and cash or card for market stalls. Don't forget a camera for golden-hour magic.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="rounded-xl border bg-card p-6 shadow-card">
          <div className="flex items-center gap-3">
            <Droplet className="text-accent" />
            <h3 className="text-base">Swimming Pool</h3>
          </div>
          <p className="mt-4 text-muted-foreground">
            A family-friendly pool area open seasonally. Supervision and lifeguard services may be available during busy periods.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="rounded-xl border bg-card p-6 shadow-card">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-accent" />
            <h3 className="text-base">Farmers Market Food Stalls</h3>
          </div>
          <p className="mt-4 text-muted-foreground">
            Seasonal market with local producers offering fresh produce, baked goods, and casual food stalls—perfect for a relaxed lunch or picnic.
          </p>
        </motion.div>
      </motion.section>

      <section className="container py-12 space-y-12">
        <div id="trails" className="grid gap-6 md:grid-cols-2 items-center">
          <div>
            <h3 className="text-xl font-bold mb-3">Trail Head & Hiking</h3>
            <p className="text-muted-foreground">Our scenic loop trail is perfect for families and beginners. The well-maintained path offers beautiful views and photo opportunities, with gentle terrain suitable for all fitness levels. Trail markers guide you through native vegetation areas.</p>
          </div>
          <div className="rounded-xl overflow-hidden border shadow-card">
            <img src="/KafenFarmPics/KafenFarm_Candid_Moments_003.webp" alt="Hiking trail through native vegetation" loading="lazy" className="h-48 w-full object-cover" />
          </div>
        </div>

        <div id="pool" className="grid gap-6 md:grid-cols-2 items-center">
          <div className="order-2 md:order-1">
            <div className="rounded-xl overflow-hidden border shadow-card">
              <img src="/KafenFarmPics/KafenFarm_Pool_Fun_001.webp" alt="Family-friendly swimming pool area" loading="lazy" className="h-48 w-full object-cover" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-xl font-bold mb-3">Swimming Pool</h3>
            <p className="text-muted-foreground">Our family-friendly pool area is open seasonally during warm months. The pool features shallow and deep sections, with poolside seating areas. Changing rooms and restroom facilities are available nearby. Lifeguard supervision may be provided during busy periods.</p>
          </div>
        </div>

        <div id="market" className="grid gap-6 md:grid-cols-2 items-center">
          <div>
            <h3 className="text-xl font-bold mb-3">Farmers Market & Food Stalls</h3>
            <p className="text-muted-foreground">Our seasonal farmers market features local producers offering fresh produce, artisanal baked goods, and prepared foods. Browse unique items from regional vendors, enjoy casual dining options, and discover local flavors in a relaxed outdoor setting.</p>
          </div>
          <div className="rounded-xl overflow-hidden border shadow-card">
            <img src="/KafenFarmPics/KafenFarm_Braai_and_Prep_008.webp" alt="Local farmers market with fresh produce and food stalls" loading="lazy" className="h-48 w-full object-cover" />
          </div>
        </div>

        <div id="picnic" className="grid gap-6 md:grid-cols-2 items-center">
          <div className="order-2 md:order-1">
            <div className="rounded-xl overflow-hidden border shadow-card">
              <img src="/KafenFarmPics/KafenFarm_Grass_Picnic_001.webp" alt="Peaceful picnic area under acacia trees" loading="lazy" className="h-48 w-full object-cover" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-xl font-bold mb-3">West Ridge Picnic Spots</h3>
            <p className="text-muted-foreground">Quiet picnic areas scattered across our west ridge offer stunning golden-hour views. These peaceful spots under mature acacia trees provide natural shade and scenic backgrounds. Bring your own blanket and enjoy the tranquil farm atmosphere.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
