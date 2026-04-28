export type PricingTier = {
  name: string;
  tagline: string;
  priceMonthly: number;
  cta: string;
  featured?: boolean;
  features: string[];
  limits: string;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free",
    tagline: "For trying it out on a real lead.",
    priceMonthly: 0,
    cta: "Start free",
    limits: "3 plans / month",
    features: [
      "3 project plans per month",
      "Scope, timeline & price range",
      "Copy proposal to clipboard",
      "1 user",
    ],
  },
  {
    name: "Pro",
    tagline: "For freelancers sending proposals every week.",
    priceMonthly: 19,
    cta: "Start 7-day free trial",
    featured: true,
    limits: "Unlimited plans",
    features: [
      "Unlimited project plans",
      "Export to PDF",
      "Shareable client links",
      "Duplicate & save drafts",
      "Pipeline & revenue stats",
      "Email support",
    ],
  },
  {
    name: "Agency",
    tagline: "For small teams quoting together.",
    priceMonthly: 39,
    cta: "Talk to us",
    limits: "Unlimited + team",
    features: [
      "Everything in Pro",
      "Up to 5 team members",
      "Shared project workspace",
      "Custom branding on proposals",
      "Priority support",
    ],
  },
];