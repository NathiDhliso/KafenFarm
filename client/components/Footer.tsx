import { Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

function TikTokIcon(props: { className?: string }) {
  return (
    <img
      src="https://www.tiktok.com/favicon.ico"
      alt="TikTok"
      className={props.className}
      style={{ display: 'inline-block' }}
    />
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-background">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="flex items-start gap-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fffbdffacfb9e45418bd2a8c1820c180d%2Fa04b37d7c29c4515894f59e026bebccc?format=webp&width=300"
              alt="Kafen Farm logo"
              loading="lazy"
              decoding="async"
              className="h-12 w-12 rounded-sm object-cover"
            />
            <div>
              <h3 className="text-lg font-serif">Kafen Farm</h3>
              <p className="mt-2 text-muted-foreground">The Ekhaya Escape</p>
              <p className="mt-4 text-sm text-muted-foreground">Dalmore Road, Elandsfontein 308IQ (next to Lawley), Johannesburg South</p>
              <p className="mt-1 text-sm text-muted-foreground">Phone: 068 140 5792</p>
              <p className="mt-1 text-sm text-muted-foreground">Email: hello@kafenfarm.co.za</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/activities">Activities</Link>
              </li>
              <li>
                <Link to="/event-plan">Plan Your Day</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold">Stay in touch</h4>
            <p className="mt-3 text-sm text-muted-foreground max-w-xl">
              Sign up for occasional updates, news about events, and special offers
              from Kafen Farm.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a href="https://www.instagram.com/kafen.farm" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-foreground">
                <Instagram />
              </a>
              <a href="https://www.facebook.com/share/18WcxPuCYs/" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-foreground">
                <Facebook />
              </a>
              <a href="https://www.tiktok.com/@kafen.farm?_t=ZS-8zvzsWYYlso&_r=1" target="_blank" rel="noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-foreground">
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 bg-background/90">
        <div className="container py-4 text-sm text-muted-foreground flex items-center justify-between">
          <div>© 2025 Kafen Farm. All Rights Reserved.</div>
          <div className="text-muted-foreground">Built with care • The Ekhaya Escape System</div>
        </div>
      </div>
    </footer>
  );
}
