import { FormEvent, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function EventPlan() {
  usePageMeta({
    title: "Host Your Event | Kafen Farm | Johannesburg South Venues",
    description: "Book Kafen Farm in Elandsfontein for your next event. We are a top-rated party and celebration venue in Johannesburg South, perfect for all age groups.",
    keywords: "party venues Joburg South, event venues Elandsfontein, Kafen Farm bookings, team building venues Johannesburg South, farm resort Johannesburg South",
  });

  type Rec = { title: string; description: string; href?: string };
  const [result, setResult] = useState<{ summary: string; recs: Rec[] } | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const buildRecs = (picks: string[], vibe: string | null, _group: string | null) => {
    const recs: Rec[] = [];
    const add = (t: string, d: string, h?: string) => recs.push({ title: t, description: d, href: h });

    if (picks.includes("Hiking")) {
      add("Trail Head", "Scenic loop suitable for families and beginners — perfect for photos and gentle exercise.", "/activities#trails");
    }
    if (picks.includes("Swimming")) {
      add("Swimming Pool", "Seasonal pool area for warm days; suitable for families. Towels and changing rooms available on request.", "/activities#pool");
    }
    if (picks.includes("Market")) {
      add("Farmers Market", "Seasonal food stalls from local producers — great for casual lunches and discovering local flavours.", "/activities#market");
    }
    if (picks.includes("Festive Party")) {
      add("Celebration Lawn", "Large open lawn ideal for parties, graduations and ceremonies. We support event logistics and photography.", "/event-plan#celebration");
    }
    if (picks.includes("Relaxed Picnic")) {
      add("Picnic Spots", "Quiet west-ridge picnic sites with golden-hour views — bring a blanket and relax.", "/activities#picnic");
    }

    // If no specific picks, provide a friendly starter set
    if (recs.length === 0) {
      add("Celebration Lawn", "A versatile event space that works for parties and photos.", "/event-plan#celebration");
      add("Trail Head", "Short, scenic trails perfect for family walks.", "/activities#trails");
      add("Picnic Spots", "Relaxed picnic areas under acacia trees.", "/activities#picnic");
    }

    // Tailor copy slightly based on vibe
    if (vibe === "celebratory") {
      recs.unshift({ title: "Party-Ready Spaces", description: "We recommend our Celebration Lawn and sheltered marquee areas to keep your guests comfortable.", href: "/event-plan#celebration" });
    }

    return recs;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const vibe = String(data.get("vibe") || "relaxing");
    const group = String(data.get("group") || "my family");
    const picks: string[] = [];

    if (data.get("hiking")) picks.push("Hiking");
    if (data.get("swimming")) picks.push("Swimming");
    if (data.get("market")) picks.push("Market");
    if (data.get("party")) picks.push("Festive Party");
    if (data.get("picnic")) picks.push("Relaxed Picnic");

    const summary = `A ${vibe} day for ${group}, including ${picks.length ? picks.join(", ") : "a mix of activities"}.`;
    const recs = buildRecs(picks, vibe, group);
    setResult({ summary, recs });
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const onClear = () => {
    formRef.current?.reset();
    setResult(null);
  };

  return (
    <main>
      <section className="container py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-semibold font-serif tracking-wide">Plan Your Perfect Day</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Tell us how you want it to feel. We’ll guide you to spaces and activities
          that match your style.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-6 rounded-xl border bg-card p-6 shadow-card">
          <div className="grid gap-2">
            <label htmlFor="name">Your Name</label>
            <Input id="name" name="name" placeholder="e.g. Nkosinathi" required />
          </div>

          <div className="grid gap-2">
            <label>I want to plan a</label>
            <select
              name="vibe"
              className="h-12 rounded-lg border border-input bg-background/80 px-4 text-base focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              defaultValue="relaxing"
            >
              <option value="relaxing">relaxing</option>
              <option value="adventurous">adventurous</option>
              <option value="celebratory">celebratory</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label>day for</label>
            <select
              name="group"
              className="h-12 rounded-lg border border-input bg-background/80 px-4 text-base focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              defaultValue="my family"
            >
              <option value="my family">my family</option>
              <option value="my friends">my friends</option>
              <option value="my colleagues">my colleagues</option>
            </select>
          </div>

          <div className="grid gap-3">
            <label>We'd love to start with</label>
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="hiking" className="h-5 w-5 rounded border-input text-primary focus:ring-ring" />
                <span>Hiking</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="swimming" className="h-5 w-5 rounded border-input text-primary focus:ring-ring" />
                <span>Swimming Pool</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="market" className="h-5 w-5 rounded border-input text-primary focus:ring-ring" />
                <span>Farmers Market</span>
              </label>
            </div>
          </div>

          <div className="grid gap-3">
            <label>Then enjoy</label>
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="party" className="h-5 w-5 rounded border-input text-primary focus:ring-ring" />
                <span>Festive Party</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="picnic" className="h-5 w-5 rounded border-input text-primary focus:ring-ring" />
                <span>Relaxed Picnic</span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" size="lg">Show me what's possible</Button>
            <Button type="button" variant="outline" size="lg" onClick={onClear}>Clear</Button>
          </div>
        </form>
      </section>

      <section ref={resultsRef} className="bg-secondary text-secondary-foreground/95">
        <div className="container py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-serif">Curated for You</h2>
          {result ? (
            <div className="mt-6 grid gap-4">
              <p className="text-lg">{result.summary}</p>
              <div className="grid gap-4 md:grid-cols-2 mt-4">
                {result.recs.map((r) => (
                  <Card key={r.title} className="p-4">
                    <h4 className="text-lg font-semibold">{r.title}</h4>
                    <p className="mt-2 text-muted-foreground">{r.description}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <Link to={r.href || '/activities'}>
                        <Button size="sm" asChild>
                          <span>Learn more</span>
                        </Button>
                      </Link>
                      <Link to="/contact">
                        <Button variant="outline" size="sm" asChild>
                          <span>Enquire</span>
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-3 text-secondary-foreground/80">
              Make a few selections above to see suggestions tailored to you.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
