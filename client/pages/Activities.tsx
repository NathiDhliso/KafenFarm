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
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop"
            alt="Hiking trails at golden hour"
            className="w-full h-72 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/40" />
        </div>
        <div className="container py-20 md:py-28">
          <h1 className="text-white text-4xl md:text-5xl font-semibold">Our Activities</h1>
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
    </main>
  );
}
