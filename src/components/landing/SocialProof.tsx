import { motion } from "framer-motion";
import { Star } from "lucide-react";

const stats = [
  { value: "120+", label: "Freelancers using it weekly" },
  { value: "2,300+", label: "Project plans generated" },
  { value: "47 min", label: "Avg. time saved per proposal" },
];

const quotes = [
  {
    text: "I used to spend half a Sunday writing proposals. Now it's 10 minutes on Monday morning.",
    name: "Marta K.",
    role: "Freelance designer",
  },
  {
    text: "The price ranges are scarily close to what I'd quote myself. Saves the back-and-forth.",
    name: "Jonas R.",
    role: "Indie dev · 6 yrs",
  },
  {
    text: "Finally something that doesn't feel like another bloated PM tool. It does one thing well.",
    name: "Priya S.",
    role: "Studio lead, 4 people",
  },
];

const SocialProof = () => {
  return (
    <section className="relative border-t border-border/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Stats row */}
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center sm:text-left"
            >
              <p className="font-display text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quotes */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-border bg-gradient-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
            >
              <div className="mb-3 flex gap-0.5 text-warning">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground">
                "{q.text}"
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-border/60 pt-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-semibold text-primary-foreground">
                  {q.name[0]}
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">{q.name}</p>
                  <p className="text-[11px] text-muted-foreground">{q.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;