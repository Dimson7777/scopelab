import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Check,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import type { GeneratedPlan } from "@/lib/planGenerator";

interface PlanResultProps {
  plan: GeneratedPlan;
  onRegenerate: () => void;
  onSave: () => Promise<void>;
  saved: boolean;
  onViewDashboard: () => void;
}

export default function PlanResult({
  plan,
  onRegenerate,
  onSave,
  saved,
  onViewDashboard,
}: PlanResultProps) {
  const [copied, setCopied] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleCopy = () => {
    const text = `# ${plan.title}\n\n## Scope\n${plan.scope}\n\n## Timeline\n${plan.timeline}\n\n## Estimated Price\n${plan.priceRange}\n\n## Tasks\n${plan.tasks.map((t, i) => `${i + 1}. ${t}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Plan copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySummary = () => {
    if (!plan.clientSummary) return;
    navigator.clipboard.writeText(plan.clientSummary);
    setCopiedSummary(true);
    toast.success("Client summary copied");
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-8 space-y-4"
    >
      {/* Title + Scope */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-card"
      >
        <h2 className="font-display text-xl font-bold text-foreground mb-2">
          {plan.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed">{plan.scope}</p>
      </motion.div>

      {/* Timeline + Price */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-2"
      >
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Timeline
          </p>
          <p className="font-display text-2xl font-bold text-foreground">
            {plan.timeline}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Estimated price
          </p>
          <p className="font-display text-2xl font-bold text-foreground">
            {plan.priceRange}
          </p>
        </div>
      </motion.div>

      {/* Pricing justification */}
      {plan.pricingJustification && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="rounded-xl border border-border bg-surface-subtle p-4"
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Pricing rationale
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {plan.pricingJustification}
          </p>
        </motion.div>
      )}

      {/* Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-card"
      >
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">
          Task breakdown
        </h2>
        <ol className="space-y-2.5">
          {plan.tasks.map((task, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary mt-0.5">
                {i + 1}
              </span>
              <span className="text-foreground">{task}</span>
            </li>
          ))}
        </ol>
      </motion.div>

      {/* Client summary */}
      {plan.clientSummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-2xl border border-primary/20 bg-card p-6 shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">
                Client proposal
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopySummary}
            >
              {copiedSummary ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copiedSummary ? "Copied" : "Copy"}
            </Button>
          </div>
          <div className="rounded-xl bg-surface-subtle p-5 text-sm text-foreground leading-relaxed whitespace-pre-line">
            {plan.clientSummary}
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="flex flex-wrap gap-3 justify-end pt-2"
      >
        <Button variant="outline" size="sm" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy plan"}
        </Button>
        <Button variant="outline" size="sm" onClick={onRegenerate}>
          <RefreshCw className="h-4 w-4" />
          Regenerate
        </Button>
        {saved ? (
          <Button
            size="sm"
            variant="outline"
            onClick={onViewDashboard}
            className="text-primary border-primary/30"
          >
            <CheckCircle2 className="h-4 w-4" />
            View in dashboard
          </Button>
        ) : (
          <Button
            onClick={handleSave}
            size="sm"
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
            {isSaving ? "Saving…" : "Save to dashboard"}
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
}
