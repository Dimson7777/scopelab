import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Plus, LogOut, Menu, X, LayoutDashboard, Sparkles, Settings as SettingsIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const DashboardNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  const navLinks = [
    { to: "/dashboard", label: "Projects", icon: LayoutDashboard },
    { to: "/generate", label: "Generate", icon: Sparkles },
    { to: "/settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <nav className="sticky top-0 z-40 glass border-b border-border/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow transition-transform group-hover:scale-105">
              <Zap className="h-4 w-4 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-foreground hidden sm:inline">
              ProjectPilot
            </span>
          </Link>
          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.to
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" asChild className="hidden sm:inline-flex">
            <Link to="/generate">
              <Plus className="h-4 w-4" />
              New plan
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hidden sm:flex"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-border bg-background px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { setMobileOpen(false); handleLogout(); }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary/50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
};

export default DashboardNav;
