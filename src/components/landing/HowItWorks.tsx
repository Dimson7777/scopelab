import { motion } from "framer-motion";
import { ClipboardPaste, Wand2, Send } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: ClipboardPaste,
    title: "Paste the brief",
    description: "Drop the client email — or a few bullet points. That's it.",
  },
  {
    n: "02",
    icon: Wand2,
    title: "Get a real plan",
    description: "Scope, timeline, price, and a proposal draft in under a minute.",
  },
  {
    n: "03",
    icon: Send,
    title: "Edit and send",
    description: "Tweak anything, copy to your tool of choice, hit send.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative border-t border-border/50 py-28 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">How it works</p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Three steps. <span className="text-muted-foreground">No setup.</span>
          </h2>
        </div>

        <div className="relative grid gap-6 md:grid-cols-3">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative z-10 mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-border bg-gradient-card shadow-elevated">
                <step.icon className="h-9 w-9 text-primary" />
                <span className="absolute -top-2 -right-2 inline-flex h-7 items-center justify-center rounded-full border border-border bg-background px-2.5 font-mono text-[11px] font-semibold text-accent">
                  {step.n}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;