import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-serif">404</h1>
        <p className="mt-3 text-muted-foreground">Oops! Page not found.</p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-primary-foreground font-semibold shadow-card hover:shadow-md transition-shadow">
            Return to Home
          </Link>
          <Link to="/activities" className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-foreground hover:bg-muted">
            Explore Activities
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
