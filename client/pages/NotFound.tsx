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
        <h1 className="text-6xl font-serif">404</h1>
        <p className="mt-3 text-muted-foreground">Oops! Page not found.</p>
        <Link to="/" className="inline-block mt-6 text-primary underline-offset-4 hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
