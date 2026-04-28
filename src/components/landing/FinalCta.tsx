import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const FinalCta = () => {
  const { user, loading } = useAuth();

  return (
    <section className="relative border-t border-border/50 py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-card p-10 text-center shadow-float sm:p-16"
        >
          {/* Glow layers */}
          <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-primary/25 blur-[100px] animate-glow-pulse" />
          <div className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[500px] -translate-x-1/2 rounded-full bg-accent/15 blur-[100px]" />
          <div className="absolute inset-0 bg-dot-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              Start planning{" "}
              <span className="text-gradient">better projects</span> today.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              Free to start. Takes a minute. You'll send your next proposal
              before lunch.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {!loading && user ? (
                <Button variant="hero" size="lg" asChild>
                  <Link to="/generate">
                    Open the generator
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/signup">
                      Start for free
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="lg" asChild>
                    <Link to="/login">I already have an account</Link>
                  </Button>
                </>
              )}
            </div>

            <p className="mt-6 text-xs text-muted-foreground/70">
              No credit card · Free forever plan · Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCta;