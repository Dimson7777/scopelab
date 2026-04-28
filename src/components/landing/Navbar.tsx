import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { user, loading } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow transition-transform group-hover:scale-105">
            <Zap className="h-4 w-4 text-primary-foreground" fill="currentColor" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            ProjectPilot
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm">
          <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <a href="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            How it works
          </a>
        </div>

        <div className="flex items-center gap-3">
          {!loading && user ? (
            <Button size="sm" asChild className="transition-all duration-200 hover:scale-[1.02]">
              <Link to="/dashboard">Go to dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="transition-colors duration-200">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild className="transition-all duration-200 hover:scale-[1.02]">
                <Link to="/signup">Get started free</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
