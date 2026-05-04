import { motion } from "framer-motion";
import { AlertTriangle, Zap, TrendingUp } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

// ── Reusable section wrapper ──────────────────────────────────────────────────
function NarrativeBlock({
  eyebrow,
  icon: Icon,
  iconClass,
  iconBg,
  title,
  titleEmphasis,
  body,
  delay,
  accent,
  children,
}: {
  eyebrow: string;
  icon: React.ElementType;
  iconClass: string;
  iconBg: string;
  title: string;
  titleEmphasis: string;
  body: string;
  delay: number;
  accent: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
      variants={fadeUp}
      className="relative"
    >
      {/* Left accent bar */}
      <div
        className="absolute -left-6 top-0 h-full w-px rounded-full opacity-40 hidden lg:block"
        style={{ background: `linear-gradient(to bottom, transparent, ${accent}, transparent)` }}
      />

      <div className="flex items-start gap-4 mb-6">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border ${iconBg}`}
        >
          <Icon className={`h-5 w-5 ${iconClass}`} />
        </div>
        <p className="pt-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">
          {eyebrow}
        </p>
      </div>

      <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}{" "}
        <span
          className="text-gradient"
          style={
            {
              "--tw-gradient-from": accent,
              backgroundImage: `linear-gradient(135deg, ${accent} 0%, rgba(34,211,238,0.85) 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            } as React.CSSProperties
          }
        >
          {titleEmphasis}
        </span>
      </h2>

      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {body}
      </p>

      {children && <div className="mt-8">{children}</div>}
    </motion.div>
  );
}

const Features = () => {
  return (
    <section className="relative border-t border-border/50 py-28 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-dot-grid opacity-35 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-destructive/10 blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-accent/8 blur-[100px]" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">

        {/* ── Section label ───────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/40"
        >
          The product story
        </motion.p>

        <div className="flex flex-col gap-32 lg:gap-36">

          {/* ── 1. PROBLEM ──────────────────────────────────────────────── */}
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            <NarrativeBlock
              eyebrow="The problem"
              icon={AlertTriangle}
              iconClass="text-rose-400"
              iconBg="bg-rose-400/10"
              accent="rgba(251,113,133,0.9)"
              title="You lose deals before you even"
              titleEmphasis="send the proposal."
              body="A vague brief arrives. You guess the scope, price from gut feel, spend an afternoon drafting. The client waits, the deal cools — and half the time they've already signed with someone faster."
              delay={0}
            />

            {/* Pain cards */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              {[
                { label: "Time lost per proposal", value: "2–4 hrs", sub: "on average, unpaid" },
                { label: "Deals lost to slow response", value: "~40%", sub: "before a proposal lands" },
                { label: "Scope disputes per project", value: "1 in 3", sub: "due to unclear agreements" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/60 bg-gradient-card px-5 py-4 shadow-float"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <span className="font-display text-xl font-bold text-rose-400 shrink-0">{stat.value}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground/45">{stat.sub}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-full origin-left rounded-full bg-gradient-to-r from-transparent via-border to-transparent"
          />

          {/* ── 2. SOLUTION ─────────────────────────────────────────────── */}
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            {/* Visual mock — shows first on mobile, second on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 lg:order-1 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 backdrop-blur-sm shadow-elevated"
            >
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                Generated in &lt; 60 s
              </p>
              <div className="space-y-2.5">
                {[
                  { label: "Scope", value: "23 deliverables", color: "text-violet-400", bar: "from-violet-500 to-violet-400", w: "90%" },
                  { label: "Timeline", value: "8–10 weeks", color: "text-cyan-400", bar: "from-cyan-500 to-cyan-400", w: "72%" },
                  { label: "Price range", value: "$12.5k – $18k", color: "text-emerald-400", bar: "from-emerald-500 to-emerald-400", w: "60%" },
                  { label: "Proposal draft", value: "Ready to edit", color: "text-blue-400", bar: "from-blue-500 to-blue-400", w: "45%" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="rounded-xl border border-border/50 bg-card/60 px-4 py-3"
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-muted-foreground/70">{row.label}</span>
                      <span className={`font-semibold ${row.color}`}>{row.value}</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-muted/60">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${row.bar}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: row.w }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="order-1 lg:order-2">
              <NarrativeBlock
                eyebrow="The solution"
                icon={Zap}
                iconClass="text-violet-400"
                iconBg="bg-violet-400/10"
                accent="rgba(167,139,250,0.9)"
                title="ProjectPilot turns vague briefs into"
                titleEmphasis="structured plans."
                body="Paste the client's message. In under a minute you get a full scope breakdown, a week-by-week timeline, a defendable price range, and a proposal draft ready to customise and send."
                delay={0}
              />
            </div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-full origin-right rounded-full bg-gradient-to-r from-transparent via-border to-transparent"
          />

          {/* ── 3. OUTCOME ──────────────────────────────────────────────── */}
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            <NarrativeBlock
              eyebrow="The outcome"
              icon={TrendingUp}
              iconClass="text-emerald-400"
              iconBg="bg-emerald-400/10"
              accent="rgba(52,211,153,0.9)"
              title="Faster proposals. Higher confidence."
              titleEmphasis="More deals closed."
              body="Stop losing work to slow turnarounds. Respond the same day with a credible, detailed plan — one that shows you've thought it through and earns the signature."
              delay={0}
            />

            {/* Outcome metrics */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-3"
            >
              {[
                { value: "< 2 min", label: "Brief to proposal", color: "text-emerald-400", glow: "rgba(52,211,153,0.12)" },
                { value: "3×", label: "Faster response", color: "text-cyan-400", glow: "rgba(34,211,238,0.12)" },
                { value: "0", label: "Scope surprises", color: "text-violet-400", glow: "rgba(167,139,250,0.12)" },
                { value: "100%", label: "Confidence walking in", color: "text-blue-400", glow: "rgba(96,165,250,0.12)" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col gap-1 rounded-2xl border border-border/60 bg-gradient-card p-5 shadow-float"
                  style={{ boxShadow: `0 4px 24px ${m.glow}` }}
                >
                  <span className={`font-display text-3xl font-bold tracking-tight ${m.color}`}>
                    {m.value}
                  </span>
                  <span className="text-[11px] leading-snug text-muted-foreground/60">{m.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;

