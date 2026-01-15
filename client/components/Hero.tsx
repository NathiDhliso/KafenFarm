import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const img = imgRef.current;
    const section = sectionRef.current;
    if (!img || !section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(img, { y: 50, ease: "none" });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate min-h-[78vh] flex items-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop"
          alt="Golden-hour fields and joyful gathering"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          srcSet="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=768&auto=format&fit=crop 768w, https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop 1200w, https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop 1920w"
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(161,93,67,0.35),rgba(232,161,58,0.25))] mix-blend-multiply" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl text-warm"
        >
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fffbdffacfb9e45418bd2a8c1820c180d%2Fa04b37d7c29c4515894f59e026bebccc?format=webp&width=400"
              alt="Kafen Farm logo"
              className="h-10 w-10 rounded-sm object-cover"
            />
            <p className="text-sm uppercase tracking-wider text-white/80">Kafen Farm</p>
          </div>

          <h1 className="text-[48px] md:text-[56px] font-semibold text-white leading-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
            Your Escape in the South. Celebrate, Relax, Play.
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/90 max-w-2xl">
            At Kafen Farm — a farm and resort in Elandsfontein next to Lawley — sun-drenched spaces, rustic textures, and effortless joy. We’re a lodge and event venue that caters to all ages for getaways, hiking, family days, and celebrations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link to="/event-plan">Plan Your Event</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/activities">Explore Activities</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm tracking-widest">
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex items-center gap-2"
        >
          <span>SCROLL</span>
          <span className="h-5 w-px bg-white/50" />
        </motion.div>
      </div>
    </section>
  );
}
