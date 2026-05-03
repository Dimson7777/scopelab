import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock, DollarSign, FileText, Sparkles } from "lucide-react";

// ── AI-orb sub-component ──────────────────────────────────────────────────────
function AiOrb({ active, shouldReduce }: { active: boolean; shouldReduce: boolean | null }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 56, height: 56 }}>
      {/* Outer pulse rings — only when AI is working */}
      {active && !shouldReduce && (
        <>
          <motion.div
            className="absolute rounded-full border border-violet-400/25"
            style={{ width: 52, height: 52 }}
            animate={{ scale: [1, 1.65, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full border border-cyan-400/15"
            style={{ width: 52, height: 52 }}
            animate={{ scale: [1, 1.95, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          />
        </>
      )}
      {/* Slow rotating outer ring */}
      {!shouldReduce && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 46,
            height: 46,
            background: "conic-gradient(from 0deg, rgba(139,92,246,0.0) 0%, rgba(139,92,246,0.35) 40%, rgba(34,211,238,0.35) 70%, rgba(139,92,246,0.0) 100%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      )}
      {/* Core orb */}
      <motion.div
        className="relative z-10 flex items-center justify-center rounded-full"
        style={{ width: 32, height: 32 }}
        animate={active && !shouldReduce ? { scale: [1, 1.07, 1] } : { scale: 1 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 38% 32%, rgba(192,160,255,0.95) 0%, rgba(139,92,246,0.85) 45%, rgba(34,211,238,0.65) 100%)",
            boxShadow: active
              ? "0 0 14px rgba(139,92,246,0.7), 0 0 32px rgba(139,92,246,0.35), 0 0 6px rgba(34,211,238,0.5)"
              : "0 0 6px rgba(139,92,246,0.25)",
          }}
        />
        {/* Inner specular highlight */}
        <div className="absolute top-1.5 left-2 h-1.5 w-1.5 rounded-full bg-white/50 blur-[1px]" />
      </motion.div>
    </div>
  );
}

// ── SVG connection lines ──────────────────────────────────────────────────────
// viewBox "0 0 100 100" with preserveAspectRatio="none".
// Orb sits at y≈15, card row-1 centers at y≈50, card row-2 at y≈84.
// Cards are in a 2-col grid so left centres ≈ x=25, right ≈ x=75.
const LINE_PATHS = [
  { d: "M 50 16 L 24 50", color: "rgba(34,211,238,0.45)",   delay: 0    },  // price
  { d: "M 50 16 L 76 50", color: "rgba(167,139,250,0.45)",  delay: 0.12 },  // timeline
  { d: "M 50 16 L 24 84", color: "rgba(96,165,250,0.45)",   delay: 0.26 },  // proposal
  { d: "M 50 16 L 76 84", color: "rgba(52,211,153,0.45)",   delay: 0.38 },  // scope
];

function ConnectionLines({ show, shouldReduce }: { show: boolean; shouldReduce: boolean | null }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.svg
          key="lines"
          className="absolute inset-0 h-full w-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {LINE_PATHS.map(({ d, color, delay }, i) => (
            <motion.path
              key={i}
              d={d}
              stroke={color}
              strokeWidth="0.45"
              fill="none"
              // vector-effect keeps stroke pixel-width despite non-scaling SVG
              vectorEffect="non-scaling-stroke"
              initial={shouldReduce ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.55, delay, ease: "easeOut" }}
            />
          ))}
          {/* Subtle glow dots on each line endpoint */}
          {LINE_PATHS.map(({ d, color, delay }, i) => {
            // Parse end-point from the d string: "M 50 16 L x y"
            const parts = d.split(" ");
            const ex = parts[4];
            const ey = parts[5];
            return (
              <motion.circle
                key={`dot-${i}`}
                cx={ex}
                cy={ey}
                r="1.5"
                fill={color}
                vectorEffect="non-scaling-stroke"
                initial={shouldReduce ? false : { opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.6], scale: [0, 1.4, 1] }}
                transition={{ duration: 0.4, delay: delay + 0.5, ease: "easeOut" }}
              />
            );
          })}
        </motion.svg>
      )}
    </AnimatePresence>
  );
}

const BRIEF = "Build a SaaS platform for freelancers";

const TAGS = ["Scope", "Price", "Timeline", "Proposal"] as const;

const CARDS = [
  {
    id: "price",
    Icon: DollarSign,
    label: "Price range",
    value: "$12.5k – $18k",
    sub: "Defendable rationale",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    glow: "rgba(34,211,238,0.10)",
    delay: 0,
  },
  {
    id: "timeline",
    Icon: Clock,
    label: "Timeline",
    value: "8–10 weeks",
    sub: "Design → Dev → QA",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-400/10",
    border: "border-violet-400/20",
    glow: "rgba(167,139,250,0.10)",
    delay: 0.13,
  },
  {
    id: "proposal",
    Icon: FileText,
    label: "Proposal",
    value: "Proposal.pdf",
    sub: "Ready to send",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-400/10",
    border: "border-blue-400/20",
    glow: "rgba(96,165,250,0.10)",
    delay: 0.26,
  },
  {
    id: "scope",
    Icon: CheckCircle2,
    label: "Scope",
    value: "Scope ready",
    sub: "23 deliverables",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    glow: "rgba(52,211,153,0.10)",
    delay: 0.39,
  },
];

type Phase = "typing" | "processing" | "tags" | "cards" | "done";

const SEQUENCE: { phase: Phase; duration: number }[] = [
  { phase: "typing",     duration: 2600 },
  { phase: "processing", duration: 1700 },
  { phase: "tags",       duration: 1900 },
  { phase: "cards",      duration: 2300 },
  { phase: "done",       duration: 2600 },
];

export function HeroAnimation() {
  const shouldReduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("typing");
  const [typedLen, setTypedLen] = useState(0);
  const [activeTags, setActiveTags] = useState<number[]>([]);

  // ── Phase sequencer ────────────────────────────────────────────────
  useEffect(() => {
    if (shouldReduce) {
      setPhase("done");
      setTypedLen(BRIEF.length);
      setActiveTags([0, 1, 2, 3]);
      return;
    }
    const current = SEQUENCE.find((s) => s.phase === phase)!;
    const t = setTimeout(() => {
      const idx = SEQUENCE.findIndex((s) => s.phase === phase);
      const next = SEQUENCE[(idx + 1) % SEQUENCE.length];
      if (next.phase === "typing") {
        setTypedLen(0);
        setActiveTags([]);
      }
      setPhase(next.phase);
    }, current.duration);
    return () => clearTimeout(t);
  }, [phase, shouldReduce]);

  // ── Typing effect ─────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "typing" || shouldReduce) return;
    if (typedLen >= BRIEF.length) return;
    const t = setTimeout(
      () => setTypedLen((n) => n + 1),
      30 + Math.random() * 45
    );
    return () => clearTimeout(t);
  }, [phase, typedLen, shouldReduce]);

  // ── Tag reveal ────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "tags" || shouldReduce) return;
    const timers = TAGS.map((_, i) =>
      setTimeout(
        () => setActiveTags((prev) => (prev.includes(i) ? prev : [...prev, i])),
        i * 310
      )
    );
    return () => timers.forEach(clearTimeout);
  }, [phase, shouldReduce]);

  const isTypingDone   = typedLen >= BRIEF.length;
  const showProcessing = phase === "processing";
  const showTags       = ["tags", "cards", "done"].includes(phase);
  const showCards      = ["cards", "done"].includes(phase);
  const showDone       = phase === "done";

  // Orb is active (glowing/pulsing) from processing onward
  const orbActive = ["processing", "tags", "cards", "done"].includes(phase);
  // Show orb from processing onward
  const showOrb = ["processing", "tags", "cards", "done"].includes(phase);

  return (
    <div
      className="relative flex flex-col items-center gap-3 select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Ambient glow behind the whole block */}
      <div className="absolute -inset-12 -z-10 rounded-[4rem] bg-gradient-to-br from-primary/20 via-transparent to-cyan-500/10 blur-3xl" />

      {/* ── Brief input card ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-md shadow-[0_4px_32px_rgba(0,0,0,0.55)]"
      >
        <div className="mb-2.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
          <Sparkles className="h-3 w-3 text-violet-400" />
          Client Brief
        </div>

        {/* Typed text + cursor */}
        <p className="min-h-[1.5rem] font-mono text-[13px] leading-relaxed text-foreground/85">
          {BRIEF.slice(0, typedLen)}
          {phase === "typing" && !isTypingDone && (
            <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-0.5 animate-pulse rounded-sm bg-violet-400 align-middle" />
          )}
        </p>

        {/* Status row */}
        <div className="mt-3 flex h-4 items-center gap-2">
          <AnimatePresence mode="wait">
            {phase === "typing" && isTypingDone && (
              <motion.span
                key="ready"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5 text-[11px] text-violet-400"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                Ready to generate
              </motion.span>
            )}

            {showProcessing && (
              <motion.span
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-violet-400"
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.2, 0.7] }}
                    transition={{
                      duration: 0.85,
                      repeat: Infinity,
                      delay: i * 0.18,
                      ease: "easeInOut",
                    }}
                  />
                ))}
                <span className="ml-1 text-[11px] text-violet-400">AI processing…</span>
              </motion.span>
            )}

            {showTags && !showProcessing && (
              <motion.span
                key="building"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5 text-[11px] text-cyan-400"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Building plan…
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Floating tag pills ─────────────────────────────────────── */}
      <div className="flex min-h-[2rem] w-full flex-wrap justify-center gap-2">
        <AnimatePresence>
          {showTags &&
            TAGS.map(
              (tag, i) =>
                activeTags.includes(i) && (
                  <motion.span
                    key={tag}
                    initial={shouldReduce ? false : { opacity: 0, y: -8, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-0.5 text-[11px] font-medium text-violet-300"
                  >
                    {tag}
                  </motion.span>
                )
            )}
        </AnimatePresence>
      </div>

      {/* ── AI orb + connection lines + result cards ──────────────── */}
      <div className="relative w-full">
        {/* SVG overlay — connection lines drawn from orb to each card */}
        <ConnectionLines show={showCards} shouldReduce={shouldReduce} />

        {/* AI Core orb — appears from processing phase onward */}
        <AnimatePresence>
          {showOrb && (
            <motion.div
              key="orb"
              initial={shouldReduce ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex justify-center pb-1 pt-0.5"
            >
              <AiOrb active={orbActive} shouldReduce={shouldReduce} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Result cards 2 × 2 ──────────────────────────────────── */}
        <div className="grid w-full grid-cols-2 gap-2.5">
          <AnimatePresence>
            {showCards &&
              CARDS.map(({ id, Icon, label, value, sub, iconColor, iconBg, border, glow, delay }) => (
                <motion.div
                  key={id}
                  initial={shouldReduce ? false : { opacity: 0, y: 14, scale: 0.94 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    // brief "AI-generated" glow flash on entry
                    boxShadow: shouldReduce
                      ? `0 0 24px ${glow}`
                      : [
                          `0 0 0px rgba(139,92,246,0)`,
                          `0 0 22px rgba(139,92,246,0.55)`,
                          `0 0 24px ${glow}`,
                        ],
                  }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{
                    duration: 0.55,
                    delay,
                    ease: [0.16, 1, 0.3, 1],
                    boxShadow: { duration: 0.8, delay: delay + 0.3, ease: "easeOut" },
                  }}
                  className={`relative z-10 rounded-xl border ${border} ${iconBg} p-3 backdrop-blur-sm`}
                >
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${iconBg} border ${border}`}
                    >
                      <Icon className={`h-2.5 w-2.5 ${iconColor}`} />
                    </div>
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                      {label}
                    </span>
                  </div>
                  <p className="font-display text-[13px] font-semibold leading-snug text-foreground">
                    {value}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground/55">{sub}</p>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Proposal generated badge ───────────────────────────────── */}
      <AnimatePresence>
        {showDone && (
          <motion.div
            key="done"
            initial={shouldReduce ? false : { opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 shadow-[0_0_22px_rgba(52,211,153,0.18)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[12px] font-medium text-emerald-300">Proposal generated</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
