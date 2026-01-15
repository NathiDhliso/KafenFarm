import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <main>
      <section className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-serif">Get in Touch</h1>
          <p className="mt-3 text-muted-foreground">
            Ready to plan your visit? Reach out via WhatsApp for the fastest response, or give us a call.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/27681405792?text=Hi%20Kafen%20Farm,%20I'd%20like%20to%20enquire%20about..."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-white font-semibold shadow-card hover:bg-[#22c55e] transition-all hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </a>
            <a
              href="tel:+27681405792"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-primary/5 px-8 py-4 text-primary font-semibold hover:bg-primary/10 transition-all hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              Call 068 140 5792
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          <div className="rounded-xl overflow-hidden border shadow-card h-[400px]">
            <iframe
              title="Kafen Farm location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3575.524458514936!2d27.852386175419913!3d-26.3418509769919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95a51242371b69%3A0x6b8401314948a90e!2sDalmore%20Rd%2C%20Elandsfontein%20308-Iq%2C%20Johannesburg%20South!5e0!3m2!1sen!2sza!4v1727366763567!5m2!1sen!2sza"
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-8 shadow-card">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                  <p className="text-muted-foreground">
                    Dalmore Rd, Elandsfontein 308IQ<br />
                    (next to Lawley)<br />
                    Johannesburg South
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-8 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Phone</p>
                    <a href="tel:+27681405792" className="text-sm text-primary hover:underline">
                      068 140 5792
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Email</p>
                    <a href="mailto:hello@kafenfarm.co.za" className="text-sm text-primary hover:underline">
                      hello@kafenfarm.co.za
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">WhatsApp</p>
                    <a
                      href="https://wa.me/27681405792"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#25D366] hover:underline"
                    >
                      Message us directly
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-muted/50 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Operating Hours: Wed–Sun, 8:00–17:30<br />
                Public holidays open • Last entry 16:00
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
