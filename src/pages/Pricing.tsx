import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { PRICING_TIERS } from "@/lib/pricing";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "Can I switch plans later?",
    a: "Yep. Upgrade or downgrade any time from your account settings. We prorate the difference.",
  },
  {
    q: "What happens when I hit the Free limit?",
    a: "You'll still see your existing projects, but you can't generate new plans until next month — or until you upgrade.",
  },
  {
    q: "Do I need a credit card to start?",
    a: "No. The Free plan is genuinely free, no card required. Pro has a 7-day trial — card up front, cancel anytime.",
  },
  {
    q: "Is there a yearly discount?",
    a: "Pay yearly and get two months free. Reach out and we'll set it up.",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header */}
        <section className="relative">
          <div className="hero-spotlight" />
          <div className="absolute inset-0 bg-dot-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Pricing</p>
            <h1 className="font-display text-5xl font-bold leading-[1] tracking-tight text-foreground sm:text-6xl">
              Pay for what you{" "}
              <span className="text-gradient">actually send.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Free for the occasional proposal. Pro for the people sending them every week. Agency for small teams.
            </p>
          </div>
        </section>

        {/* Tier cards */}
        <section className="mt-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-5 md:grid-cols-3">
              {PRICING_TIERS.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex flex-col rounded-3xl border p-8 ${
                    tier.featured
                      ? "border-primary/40 bg-gradient-card shadow-float"
                      : "border-border bg-gradient-card"
                  }`}
                >
                  {tier.featured && (
                    <span className="absolute -top-3 left-8 inline-flex items-center rounded-full border border-primary/40 bg-background px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      Most popular
                    </span>
                  )}
                  <p className="font-display text-xl font-semibold text-foreground">{tier.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{tier.tagline}</p>
                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="font-display text-5xl font-bold tracking-tight text-foreground">
                      ${tier.priceMonthly}
                    </span>
                    <span className="text-sm text-muted-foreground">/ month</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{tier.limits}</p>

                  <ul className="mt-7 flex-1 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="mt-8"
                    variant={tier.featured ? "hero" : "outline"}
                    size="lg"
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

            <p className="mt-10 text-center text-xs text-muted-foreground/70">
              No credit card on Free · Cancel any time · VAT added where applicable
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-32 border-t border-border/50 pt-24">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Common questions
            </h2>
            <div className="mt-10 divide-y divide-border/60 border-y border-border/60">
              {faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <h3 className="font-display text-base font-semibold text-foreground">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;