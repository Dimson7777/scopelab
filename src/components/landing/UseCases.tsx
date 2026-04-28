import { motion } from "framer-motion";
import { User, Building2, Code2 } from "lucide-react";

const cases = [
  {
    icon: User,
    title: "Freelancers",
    description: "Stop losing leads while you write proposals after dinner. Send something polished within the hour.",
    points: ["Cuts proposal time from 3h → 15min", "Realistic, defensible pricing", "Looks professional from day one"],
    accent: "primary",
  },
  {
    icon: Building2,
    title: "Small agencies",
    description: "Get every team member quoting consistently. No more ten different scope formats across one studio.",
    points: ["Consistent scoping across the team", "Faster turnaround on inbound leads", "Reusable structure for retainers"],
    accent: "accent",
  },
  {
    icon: Code2,
    title: "Indie developers",
    description: "You like building, not writing 1,500 word emails. Skip the part you hate, keep the part you're good at.",
    points: ["Tech-aware breakdowns", "Effort-based estimates", "Editable proposal drafts"],
    accent: "primary",
  },
];

const UseCases = () => {
  return (
    <section className="relative border-t border-border/50 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Who this is for</p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Built for the people <span className="text-muted-foreground">actually doing the work.</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-card p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
            >
              <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div
                className={`relative mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border ${
                  c.accent === "accent" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                }`}
              >
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="relative font-display text-xl font-semibold text-foreground">{c.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
              <ul className="relative mt-5 space-y-2 border-t border-border/60 pt-4">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-foreground/90">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;