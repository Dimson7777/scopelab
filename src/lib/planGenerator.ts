// Type definition for AI-generated project plans.
// The actual generation happens server-side via the generate-plan edge function.

export interface GeneratedPlan {
  title: string;
  scope: string;
  timeline: string;
  priceRange: string;
  tasks: string[];
  pricingJustification: string;
  clientSummary: string;
}
