import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Check, FileText, Clock, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const Hero = () => {
  const { user, loading } = useAuth();

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Layered backdrop */}
      <div className="hero-spotlight" />
      <div className="absolute inset-0 bg-dot-grid opacity-50 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,black,transparent)]" />
      {/* Floating glow orbs */}
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-[120px] animate-glow-pulse" aria-hidden />
      <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* LEFT: Headline + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Now in open beta · v1.2 shipped
            </div>

            <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Scope it.
              <br />
              Price it.
              <br />
              <span className="relative inline-block">
                <span className="text-gradient">Send it.</span>
                <span
                  className="absolute -inset-x-6 -bottom-3 -z-10 h-16 rounded-full bg-primary/30 blur-3xl animate-glow-pulse"
                  aria-hidden
                />
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Turn a messy client brief into a real project plan — scope,
              timeline, price, proposal. In a minute, not an afternoon.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/login">Sign in</Link>
                  </Button>
                </>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground/80">
              {["No credit card", "Free forever plan", "Export anywhere"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-accent" />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Product preview — floating UI cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-5"
          >
            {/* Glow halo */}
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/30 via-transparent to-accent/25 blur-3xl" />

            {/* Main brief card */}
            <div className="glass-strong relative rounded-2xl p-5 shadow-float">
              <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                <Sparkles className="h-3 w-3 text-accent" />
                Client brief
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                "We're a streetwear brand. Need an online store — product pages,
                cart, Stripe, and a way for the team to upload drops."
              </p>
              <div className="mt-4 flex items-center gap-2 text-[11px] text-accent">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Generating plan…
              </div>
            </div>

            {/* Floating output cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -right-4 top-8 w-52 rotate-3 rounded-xl border border-border bg-card/90 p-3.5 shadow-float backdrop-blur-md sm:-right-10"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Clock className="h-3.5 w-3.5" />
                </div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Timeline</p>
              </div>
              <p className="mt-2 font-display text-base font-semibold text-foreground">8–10 weeks</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">Design → Dev → QA</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -left-4 -bottom-2 w-56 -rotate-2 rounded-xl border border-border bg-card/90 p-3.5 shadow-float backdrop-blur-md sm:-left-10"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <DollarSign className="h-3.5 w-3.5" />
                </div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Price range</p>
              </div>
              <p className="mt-2 font-display text-base font-semibold text-foreground">$12.5k – $18k</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">Defendable rationale</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute right-6 -bottom-8 w-44 rotate-2 rounded-xl border border-border bg-card/90 p-3 shadow-float backdrop-blur-md"
            >
              <div className="flex items-center gap-2 text-[11px] text-foreground">
                <FileText className="h-3.5 w-3.5 text-primary" />
                Proposal.pdf
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary to-accent" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-24 border-t border-border/40 pt-8"
        >
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground/70">
            Trusted by indie devs at
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
            {["Northwind Studio", "Pixelhaus", "Forge & Co.", "Lumen Labs", "Studio Halt", "Driftworks"].map((n) => (
              <span key={n} className="font-display text-sm font-semibold tracking-tight text-foreground/70">
                {n}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
