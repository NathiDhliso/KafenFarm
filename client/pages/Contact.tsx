import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const formData = {
      name: data.get('name') as string,
      email: data.get('email') as string,
      subject: data.get('subject') as string,
      message: data.get('message') as string,
    };

    const nextErrors: Record<string, string> = {};
    if (!formData.name?.trim()) nextErrors.name = "Please add your name.";
    if (!formData.email?.trim()) {
      nextErrors.email = "Please add your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please use a valid email.";
    }
    if (!formData.message?.trim()) nextErrors.message = "Tell us a bit about your plans.";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setFeedback({ type: "error", message: "Please fix the highlighted fields." });
      setLoading(false);
      return;
    }

    setErrors({});
    setFeedback(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok && json.success !== false) {
        setFeedback({ type: "success", message: "Thanks — we received your message and will reply soon." });
        toast({ title: 'Message sent', description: 'Thanks — we received your message and will reply soon.' });
        form.reset();
      } else {
        setFeedback({ type: "error", message: json.message || 'Unable to send message. Please try again later.' });
        toast({ title: 'Submission failed', description: json.message || 'Unable to send message. Please try again later.' });
      }
    } catch (err) {
      console.error('Contact submit error', err);
      setFeedback({ type: "error", message: 'Unable to reach the server. Please try again later.' });
      toast({ title: 'Network error', description: 'Unable to reach the server. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="container py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-serif">Get in Touch</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Questions about bookings, events or availability? Send us a message and we’ll get back to you.</p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <form onSubmit={onSubmit} className="grid gap-4">
            <div aria-live="polite" className="text-sm">
              {feedback && (
                <p className={feedback.type === "success" ? "text-emerald-600" : "text-destructive"}>
                  {feedback.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="name">Your Name</label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Nkosinathi"
                required
                aria-required="true"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <p id="name-error" className="mt-1 text-sm text-destructive">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="email">Your Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="hello@you.com"
                required
                aria-required="true"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <p id="email-error" className="mt-1 text-sm text-destructive">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="subject">Subject</label>
              <Input id="subject" name="subject" placeholder="Booking enquiry" />
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full rounded-lg border border-input bg-background/80 p-4 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Tell us a bit about your plans..."
                required
                aria-required="true"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && <p id="message-error" className="mt-1 text-sm text-destructive">{errors.message}</p>}
            </div>

            <div className="pt-2">
              <Button type="submit" size="lg" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</Button>
            </div>
          </form>

          <div>
            <div className="rounded-xl overflow-hidden border shadow-card">
              <iframe
                title="Kafen Farm location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3575.524458514936!2d27.852386175419913!3d-26.3418509769919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95a51242371b69%3A0x6b8401314948a90e!2sDalmore%20Rd%2C%20Elandsfontein%20308-Iq%2C%20Johannesburg%20South!5e0!3m2!1sen!2sza!4v1727366763567!5m2!1sen!2sza"
                className="h-64 w-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className="mt-6 rounded-xl border bg-card p-6 shadow-card">
              <h3 className="text-lg font-semibold">Visit Us</h3>
              <p className="mt-2 text-muted-foreground">Dalmore Rd, Elandsfontein 308IQ (next to Lawley), Johannesburg South</p>
              <p className="mt-2 text-muted-foreground">Phone: 068 140 5792</p>
              <p className="mt-2 text-muted-foreground">Email: hello@kafenfarm.co.za</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
