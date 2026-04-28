import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING_TIERS } from "@/lib/pricing";

const PricingTeaser = () => {
  return (
    <section id="pricing" className="relative border-t border-border/50 py-28">
      <div className="absolute inset-0 bg-dot-grid opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Pricing</p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Simple plans. <span className="text-muted-foreground">Cancel any time.</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            Start free. Upgrade when you start sending more proposals than you can write.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-0.5 ${
                tier.featured
                  ? "border-primary/40 bg-gradient-card shadow-elevated"
                  : "border-border bg-gradient-card hover:border-primary/30 hover:shadow-elevated"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-7 inline-flex items-center rounded-full border border-primary/40 bg-background px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  Most popular
                </span>
              )}
              <p className="font-display text-lg font-semibold text-foreground">{tier.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{tier.tagline}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-tight text-foreground">
                  ${tier.priceMonthly}
                </span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>

              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                className="mt-7"
                variant={tier.featured ? "hero" : "outline"}
                asChild
              >
                <Link to="/signup">
                  {tier.cta}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground/80">
          All plans include unlimited exports, client-ready proposals, and email support.
        </p>
      </div>
    </section>
  );
};

export default PricingTeaser;