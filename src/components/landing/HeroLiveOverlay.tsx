import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { DollarSign, UserPlus, Send, CheckCircle2 } from "lucide-react";

// ── Floating notification toast ────────────────────────────────────────────────

const NOTIFICATIONS = [
  {
    id: 0,
    Icon: DollarSign,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    glow: "rgba(52,211,153,0.12)",
    label: "+ $2,400 received",
  },
  {
    id: 1,
    Icon: UserPlus,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
    glow: "rgba(167,139,250,0.12)",
    label: "Client added",
  },
  {
    id: 2,
    Icon: Send,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    glow: "rgba(34,211,238,0.12)",
    label: "Proposal sent",
  },
] as const;

function FloatingNotifications({ shouldReduce }: { shouldReduce: boolean | null }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (shouldReduce) return;
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((c) => (c + 1) % NOTIFICATIONS.length);
        setVisible(true);
      }, 380);
    }, 3300);
    return () => clearInterval(id);
  }, [shouldReduce]);

  const n = NOTIFICATIONS[index];
  const { Icon } = n;

  return (
    <div className="pointer-events-none select-none" aria-hidden="true">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-flex items-center gap-2 rounded-full border ${n.border} ${n.bg} px-3.5 py-1.5 backdrop-blur-sm`}
            style={{ boxShadow: `0 0 18px ${n.glow}` }}
          >
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${n.bg} border ${n.border}`}
            >
              <Icon className={`h-3 w-3 ${n.color}`} />
            </div>
            <span className={`text-[12px] font-semibold ${n.color}`}>{n.label}</span>
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full animate-pulse`}
              style={{ backgroundColor: "currentColor" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Status demo: Pending → Paid ────────────────────────────────────────────────

function StatusDemo({ shouldReduce }: { shouldReduce: boolean | null }) {
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (shouldReduce) {
      setPaid(true);
      return;
    }
    const id = setInterval(() => setPaid((p) => !p), 3800);
    return () => clearInterval(id);
  }, [shouldReduce]);

  return (
    <div
      className="pointer-events-none select-none flex items-center gap-2"
      aria-hidden="true"
    >
      <span className="text-[11px] font-medium text-muted-foreground/45 whitespace-nowrap">
        Invoice #042
      </span>
      <AnimatePresence mode="wait">
        {paid ? (
          <motion.span
            key="paid"
            initial={{ opacity: 0, scale: 0.75, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: -5 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400"
            style={{ boxShadow: "0 0 12px rgba(52,211,153,0.18)" }}
          >
            <CheckCircle2 className="h-3 w-3" />
            Paid
          </motion.span>
        ) : (
          <motion.span
            key="pending"
            initial={{ opacity: 0, scale: 0.75, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: -5 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Pending
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Demo timeline: 3 steps ─────────────────────────────────────────────────────

const TIMELINE_STEPS = [
  "Client brief received",
  "Scope generated",
  "Proposal ready",
] as const;

function DemoTimeline({ shouldReduce }: { shouldReduce: boolean | null }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (shouldReduce) {
      setActive(TIMELINE_STEPS.length - 1);
      return;
    }
    const id = setInterval(
      () => setActive((s) => (s + 1) % TIMELINE_STEPS.length),
      2400
    );
    return () => clearInterval(id);
  }, [shouldReduce]);

  return (
    <div
      className="pointer-events-none select-none flex items-center"
      aria-hidden="true"
    >
      {TIMELINE_STEPS.map((step, i) => (
        <div key={step} className="flex items-center">
          <motion.div
            animate={
              i <= active ? { opacity: 1 } : { opacity: 0.3 }
            }
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5"
          >
            {/* Step dot */}
            <motion.div
              animate={
                i < active
                  ? {
                      backgroundColor: "rgba(52,211,153,1)",
                      boxShadow: "0 0 7px rgba(52,211,153,0.55)",
                    }
                  : i === active
                  ? {
                      backgroundColor: "rgba(167,139,250,1)",
                      boxShadow: "0 0 7px rgba(167,139,250,0.55)",
                    }
                  : {
                      backgroundColor: "rgba(100,100,130,0.35)",
                      boxShadow: "none",
                    }
              }
              transition={{ duration: 0.35 }}
              className="h-2 w-2 shrink-0 rounded-full"
            />
            {/* Step label */}
            <motion.span
              animate={
                i < active
                  ? { color: "rgba(110,231,183,0.8)" }
                  : i === active
                  ? { color: "rgba(196,181,253,1)" }
                  : { color: "rgba(120,120,150,0.35)" }
              }
              transition={{ duration: 0.35 }}
              className="text-[10px] font-medium whitespace-nowrap"
            >
              {step}
            </motion.span>
          </motion.div>

          {/* Connector line */}
          {i < TIMELINE_STEPS.length - 1 && (
            <motion.div
              animate={
                i < active
                  ? { opacity: 0.45, scaleX: 1 }
                  : { opacity: 0.15, scaleX: 1 }
              }
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mx-2 h-px w-8 origin-left rounded-full"
              style={{
                background:
                  i < active
                    ? "linear-gradient(90deg, rgba(52,211,153,0.6), rgba(167,139,250,0.4))"
                    : "rgba(120,120,150,0.3)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Exported overlay strip ─────────────────────────────────────────────────────

export function HeroLiveOverlay() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-5 py-3.5 backdrop-blur-sm"
      aria-hidden="true"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
    >
      {/* Left: timeline */}
      <DemoTimeline shouldReduce={shouldReduce} />

      {/* Right: status badge + notification */}
      <div className="flex items-center gap-4 ml-auto">
        <StatusDemo shouldReduce={shouldReduce} />
        <div className="h-3 w-px bg-white/10 hidden sm:block" />
        <FloatingNotifications shouldReduce={shouldReduce} />
      </div>
    </motion.div>
  );
}
