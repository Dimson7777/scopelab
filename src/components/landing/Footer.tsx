import { Zap, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import ContactDialog from "@/components/ContactDialog";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/60 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-glow">
                <Zap className="h-3.5 w-3.5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="font-display text-sm font-bold text-foreground">
                ProjectPilot
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              A small tool for freelancers and studios who'd rather build than scope.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <div>
              <p className="font-semibold text-foreground mb-2">Product</p>
              <ul className="space-y-1.5 text-muted-foreground">
                <li><Link to="/signup" className="hover:text-foreground transition-colors">Get started</Link></li>
                <li><Link to="/login" className="hover:text-foreground transition-colors">Sign in</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Company</p>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>
                  <ContactDialog
                    trigger={
                      <button
                        type="button"
                        className="group inline-flex items-center gap-1.5 rounded-md text-muted-foreground transition-all duration-200 hover:text-foreground hover:[text-shadow:_0_0_18px_hsl(var(--primary)/0.6)]"
                      >
                        <Mail className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-primary" />
                        Contact
                      </button>
                    }
                  />
                </li>
                <li><span className="text-muted-foreground/60">Privacy</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} ProjectPilot. Built by an indie dev.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
