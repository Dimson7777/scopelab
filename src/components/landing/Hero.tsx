import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { HeroAnimation } from "./HeroAnimation";
import { HeroLiveOverlay } from "./HeroLiveOverlay";

// ── Headline typewriter ────────────────────────────────────────────────────────
const HEADLINE_LINES = ["Scope it.", "Price it.", "Send it."] as const;

function useTypewriterLines(shouldReduce: boolean | null) {
  const [ready, setReady] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Initial delay aligns with container fade-in (700 ms)
  useEffect(() => {
    if (shouldReduce) { setReady(true); return; }
    const t = setTimeout(() => setReady(true), 480);
    return () => clearTimeout(t);
  }, [shouldReduce]);

  // Show all lines immediately when reduced-motion is preferred
  useEffect(() => {
    if (!shouldReduce) return;
    setLineIdx(HEADLINE_LINES.length - 1);
    setCharIdx(HEADLINE_LINES[HEADLINE_LINES.length - 1].length);
    setShowCursor(false);
  }, [shouldReduce]);

  // Typing engine
  useEffect(() => {
    if (shouldReduce || !ready) return;
    const current = HEADLINE_LINES[lineIdx];
    if (charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 58 + Math.random() * 38);
      return () => clearTimeout(t);
    }
    if (lineIdx < HEADLINE_LINES.length - 1) {
      const t = setTimeout(() => { setLineIdx((l) => l + 1); setCharIdx(0); }, 290);
      return () => clearTimeout(t);
    }
    // All done — keep cursor blinking 2 s then hide
    const t = setTimeout(() => setShowCursor(false), 2200);
    return () => clearTimeout(t);
  }, [ready, lineIdx, charIdx, shouldReduce]);

  return { lineIdx, charIdx, showCursor };
}

// ── Flow indicator ─────────────────────────────────────────────────────────────
const FLOW_STEPS = ["Client brief", "AI processing", "Scope ready", "Proposal sent"] as const;

function FlowIndicator({ shouldReduce }: { shouldReduce: boolean | null }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (shouldReduce) return;
    const id = setInterval(() => setActive((s) => (s + 1) % FLOW_STEPS.length), 1900);
    return () => clearInterval(id);
  }, [shouldReduce]);

  return (
    <div className="mt-5 hidden flex-wrap items-center gap-y-1.5 sm:flex" aria-hidden="true">
      {FLOW_STEPS.map((step, i) => (
        <span key={step} className="flex items-center">
          <span
            className={`relative flex items-center gap-1.5 rounded px-2 py-0.5 text-[11px] font-medium transition-all duration-500 ${
              active === i
                ? "text-violet-300 bg-violet-500/[0.08] border border-violet-400/20"
                : "text-muted-foreground/45"
            }`}
            style={active === i ? { boxShadow: "0 0 10px rgba(139,92,246,0.18)" } : undefined}
          >
            <span
              className={`h-1 w-1 shrink-0 rounded-full transition-all duration-500 ${
                active === i ? "bg-violet-400" : "bg-muted-foreground/30"
              }`}
              style={active === i ? { boxShadow: "0 0 5px rgba(167,139,250,0.8)" } : undefined}
            />
            {step}
          </span>
          {i < FLOW_STEPS.length - 1 && (
            <span className="mx-0.5 text-[10px] text-muted-foreground/25">›</span>
          )}
        </span>
      ))}
    </div>
  );
}

const Hero = () => {
  const { user, loading } = useAuth();
  const shouldReduce = useReducedMotion();
  const { lineIdx, charIdx, showCursor } = useTypewriterLines(shouldReduce);

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
              {/* Line 0 — Scope it. */}
              <span className="block" style={{ minHeight: "0.95em" }}>
                {lineIdx === 0
                  ? HEADLINE_LINES[0].slice(0, charIdx)
                  : HEADLINE_LINES[0]}
                <span
                  className={`ml-0.5 inline-block h-[0.75em] w-[3px] translate-y-[0.1em] rounded-[1px] bg-foreground/70 align-middle transition-opacity duration-300 ${
                    lineIdx === 0 && showCursor ? "opacity-100 animate-pulse" : "opacity-0"
                  }`}
                />
              </span>
              {/* Line 1 — Price it. */}
              <span className="block" style={{ minHeight: "0.95em" }}>
                {lineIdx >= 1
                  ? lineIdx === 1
                    ? HEADLINE_LINES[1].slice(0, charIdx)
                    : HEADLINE_LINES[1]
                  : ""}
                <span
                  className={`ml-0.5 inline-block h-[0.75em] w-[3px] translate-y-[0.1em] rounded-[1px] bg-foreground/70 align-middle transition-opacity duration-300 ${
                    lineIdx === 1 && showCursor ? "opacity-100 animate-pulse" : "opacity-0"
                  }`}
                />
              </span>
              {/* Line 2 — Send it. (gradient) */}
              <span className="block" style={{ minHeight: "0.95em" }}>
                {lineIdx >= 2 && (
                  <span className="relative inline-block">
                    <span className="text-gradient">
                      {HEADLINE_LINES[2].slice(0, charIdx)}
                    </span>
                    <span
                      className={`ml-0.5 inline-block h-[0.75em] w-[3px] translate-y-[0.1em] rounded-[1px] bg-accent/80 align-middle transition-opacity duration-300 ${
                        lineIdx === 2 && showCursor ? "opacity-100 animate-pulse" : "opacity-0"
                      }`}
                    />
                    <span
                      className="absolute -inset-x-6 -bottom-3 -z-10 h-16 rounded-full bg-primary/30 blur-3xl animate-glow-pulse"
                      aria-hidden
                    />
                  </span>
                )}
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Turn a messy client brief into a real project plan — scope,
              timeline, price, proposal. In a minute, not an afternoon.
            </p>

            <FlowIndicator shouldReduce={shouldReduce} />

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

          {/* RIGHT: Product animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-5"
          >
            <HeroAnimation />
          </motion.div>
        </div>

        {/* Live product feel overlay — NEW, no existing elements modified */}
        <HeroLiveOverlay />

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
