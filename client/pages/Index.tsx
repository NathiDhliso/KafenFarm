import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { usePageMeta } from "@/hooks/use-page-meta";
import { staggerContainer, fadeInUp } from "@/lib/animation-variants";

function PathCard({
  title,
  description,
  href,
  image,
  note,
}: {
  title: string;
  description: string;
  href: string;
  image: string;
  note?: string;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={href} className="block rounded-2xl overflow-hidden border bg-card shadow-card">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={image}
            srcSet={`${image.replace('.webp', '_mobile.webp')} 600w, ${image} 1200w`}
            sizes="(max-width: 768px) 100vw, 33vw"
            alt={`${title} at Kafen Farm${note ? ` — ${note}` : ""}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          {note && (
            <div className="absolute bottom-2 right-3 rounded-full bg-black/30 px-3 py-1 text-white/90 text-sm italic">
              {note}
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 className="text-xl md:text-2xl font-semibold drop-shadow">{title}</h3>
            <p className="mt-1 text-white/90 text-sm md:text-base line-clamp-2">{description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Index() {
  usePageMeta({
    title: "Kafen Farm | Farm Resort, Lodge & Venue in Johannesburg South",
    description: "Experience Kafen Farm, a beautiful farm resort and lodge in Elandsfontein, next to Lawley. We cater to all age groups for events, getaways, hiking, and family fun.",
    keywords: "Kafen Farm, farm resort Johannesburg South, lodge near Lawley, event venues Elandsfontein, Kafen Farm bookings, party venues Joburg South, resort in Lawley, hiking trails near Lawley, family activities Johannesburg South",
  });

  const testimonials = [
    {
      quote: "A magical place — our graduation photos were perfect and the team were so helpful.",
      author: "Naledi S.",
      event: "Birthday Celebration",
    },
    {
      quote: "We had the best family day out. The trails and picnic spots are beautiful.",
      author: "Thabo M.",
      event: "Family Day",
    },
    {
      quote: "Wonderful venue for our company retreat — relaxed, private and scenic.",
      author: "Sibongile K.",
      event: "Corporate Retreat",
    },
  ];

  return (
    <main>
      <Hero />

      <section className="container py-12 md:py-16">
        <div className="max-w-3xl">
          <h2 className="text-[32px] md:text-[36px] font-serif tracking-wide">Find Your Path</h2>
          <p className="mt-3 text-muted-foreground">
            Whether you’re hosting a milestone or seeking a relaxed family day, start
            here.
          </p>
        </div>

        <motion.div
          className="mt-8 grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <PathCard
            title="Host an Event"
            description="Graduations, birthdays, showers and more. Beautiful spaces that feel special and welcoming."
            href="/event-plan"
            image="/KafenFarmPics/KafenFarm_Tent_Dining_001.webp"
            note="The Celebration Lawn"
          />
          <PathCard
            title="Family Day Out"
            description="Pack a picnic, play lawn games, wander the trails. Fresh air and golden light."
            href="/activities"
            image="/KafenFarmPics/KafenFarm_Kids_Party_003.webp"
            note="West Ridge Picnic"
          />
          <PathCard
            title="Our Activities"
            description="Hiking, picnic spots, lawn games and more. See what’s open and plan your flow."
            href="/activities"
            image="/KafenFarmPics/KafenFarm_Pool_Fun_005.webp"
            note="Trail Head"
          />
        </motion.div>

        <div className="mt-10">
          <Button asChild size="lg">
            <Link to="/event-plan">Enquire Now</Link>
          </Button>
        </div>
      </section>

      <section className="relative">
        <div className="container py-12 md:py-16 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-[32px] md:text-[36px] font-serif tracking-wide">A Place to Breathe</h2>
            <p className="mt-3 text-muted-foreground">
              Light, air, and warmth shape every corner. Subtle textures and organic
              lines keep the experience human and joyful.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden border shadow-card">
            <img
              src="/KafenFarmPics/KafenFarm_Candid_Moments_012.webp"
              srcSet="/KafenFarmPics/KafenFarm_Candid_Moments_012_mobile.webp 600w, /KafenFarmPics/KafenFarm_Candid_Moments_012.webp 1200w"
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="Warm-toned gallery with ambient hover details"
              loading="lazy"
              decoding="async"
              className="h-64 w-full object-cover"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="bg-muted text-foreground py-12">
        <div className="container">
          <h3 className="text-2xl font-serif">What Our Guests Are Saying</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.author} className="p-6">
                <blockquote className="text-lg text-foreground">“{t.quote}”</blockquote>
                <footer className="mt-4 text-sm text-muted-foreground">
                  <strong>{t.author}</strong> — <span className="text-sm">{t.event}</span>
                </footer>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
