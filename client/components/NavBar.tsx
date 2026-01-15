import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const linkBase =
    "text-sm md:text-base font-semibold text-foreground/80 hover:text-foreground transition-colors";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        scrolled ? "py-2 shadow-sm" : "py-4",
      )}
   >
      <div className="container flex items-center justify-between gap-4">
        <Link to="/" className="group inline-flex items-center gap-3">
          <Logo className="h-10 w-10 md:h-12 md:w-12 shrink-0 rounded-sm" />
          <div className="flex flex-col leading-tight">
            <span className="text-lg md:text-2xl font-serif tracking-wide text-foreground">Kafen Farm</span>
            <span className="text-xs md:text-sm text-foreground/60">The Ekhaya Escape</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({ isActive }) => cn(linkBase, isActive && "text-foreground")}>
            Home
          </NavLink>
          <NavLink
            to="/activities"
            className={({ isActive }) => cn(linkBase, isActive && "text-foreground")}
          >
            Activities
          </NavLink>
          <NavLink
            to="/event-plan"
            className={({ isActive }) => cn(linkBase, isActive && "text-foreground")}
          >
            Plan Your Day
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {/* Mobile menu trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Logo className="h-8 w-8 shrink-0 rounded-sm" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-lg font-serif tracking-wide text-foreground">Kafen Farm</span>
                      <span className="text-xs text-foreground/60">The Ekhaya Escape</span>
                    </div>
                  </div>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => cn(
                      "text-lg font-semibold text-foreground/80 hover:text-foreground transition-colors py-2",
                      isActive && "text-foreground"
                    )}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/activities"
                    className={({ isActive }) => cn(
                      "text-lg font-semibold text-foreground/80 hover:text-foreground transition-colors py-2",
                      isActive && "text-foreground"
                    )}
                  >
                    Activities
                  </NavLink>
                  <NavLink
                    to="/event-plan"
                    className={({ isActive }) => cn(
                      "text-lg font-semibold text-foreground/80 hover:text-foreground transition-colors py-2",
                      isActive && "text-foreground"
                    )}
                  >
                    Plan Your Day
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) => cn(
                      "text-lg font-semibold text-foreground/80 hover:text-foreground transition-colors py-2",
                      isActive && "text-foreground"
                    )}
                  >
                    Contact
                  </NavLink>
                </nav>
                
                <div className="pt-4 border-t">
                  <Button asChild className="w-full">
                    <Link to="/event-plan">Enquire Now</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <a
            href="https://wa.me/27681405792?text=Hi%20Kafen%20Farm,%20I'd%20like%20to%20enquire%20about..."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-white font-semibold text-sm hover:bg-[#22c55e] transition-colors shadow-sm"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          
          <Button asChild className="hidden md:inline-flex">
            <Link to="/event-plan">Enquire Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
