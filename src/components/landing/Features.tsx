import { FileText, Clock, DollarSign, ListChecks, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const supporting = [
  {
    icon: Clock,
    title: "Realistic timelines",
    description: "Week-by-week breakdown. Design, dev, QA, revisions — all of it.",
    accent: "accent",
  },
  {
    icon: DollarSign,
    title: "Defendable pricing",
    description: "A range with rationale you can actually show the client.",
    accent: "primary",
  },
  {
    icon: ListChecks,
    title: "Proposal drafts",
    description: "Editable client message and task list. Skip the blank page.",
    accent: "accent",
  },
];

const Features = () => {
  return (
    <section className="relative border-t border-border/50 py-28">
      <div className="absolute inset-0 bg-dot-grid opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* SPOTLIGHT — large horizontal feature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden rounded-3xl border border-border bg-gradient-card shadow-elevated"
        >
          <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative grid gap-10 p-8 lg:grid-cols-2 lg:gap-12 lg:p-14">
            {/* Text */}
            <div className="flex flex-col justify-center">
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <Sparkles className="h-3.5 w-3.5" /> The main feature
              </p>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
                A scope you can{" "}
                <span className="text-gradient">actually defend.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Pages, features, integrations — broken down so nothing gets
                missed on the kickoff call. No more "we thought that was
                included" three weeks in.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-foreground">
                {[
                  "Granular page + feature list",
                  "Effort estimates per item",
                  "Inline notes for tricky parts",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <FileText className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual mock */}
            <div className="relative">
              <div className="rounded-2xl border border-border bg-surface-subtle/80 p-5 shadow-float">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-display text-sm font-semibold text-foreground">Scope breakdown</p>
                  <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">Approved</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { k: "Storefront pages", v: "12", w: "85%" },
                    { k: "Cart & checkout", v: "Stripe", w: "65%" },
                    { k: "Admin dashboard", v: "8 views", w: "50%" },
                    { k: "Email + receipts", v: "Resend", w: "30%" },
                    { k: "QA + handoff", v: "1 wk", w: "20%" },
                  ].map((row) => (
                    <div key={row.k} className="rounded-lg border border-border/70 bg-card/70 px-3 py-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-foreground">{row.k}</span>
                        <span className="font-medium text-muted-foreground">{row.v}</span>
                      </div>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: row.w }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Supporting features — smaller grid */}
        <div className="mt-20">
          <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Plus everything else you need.
            </h3>
            <p className="text-sm text-muted-foreground">Three things, every plan.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {supporting.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
              >
                <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div
                  className={`relative mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border ${
                    feature.accent === "accent" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                  }`}
                >
                  <feature.icon className="h-5 w-5" />
                </div>
                <h4 className="relative font-display text-lg font-semibold text-foreground">{feature.title}</h4>
                <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
