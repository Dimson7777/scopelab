import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

const EXAMPLE_BRIEFS = [
  "Online store for a coffee roaster — Stripe checkout, subscriptions, and a stock admin.",
  "Internal dashboard for a small team to track time, projects, and invoices.",
  "Portfolio site for a photographer with a gallery, simple blog, and contact form.",
  "Booking app for a yoga studio — class schedule, online payments, reminders.",
];

interface BriefInputProps {
  brief: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

export default function BriefInput({
  brief,
  onChange,
  onGenerate,
  isGenerating,
  disabled,
}: BriefInputProps) {
  const tooShort = brief.trim().length > 0 && brief.trim().length < 10;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <label className="block text-sm font-medium text-foreground mb-1">
        What does your client need?
      </label>
      <p className="text-xs text-muted-foreground mb-2">
        Describe the project type, features, and any specific requirements. More detail = better plan.
      </p>
      <Textarea
        placeholder="Describe the project in detail — the more specific you are, the better the plan."
        className="min-h-[130px] resize-none text-base transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        value={brief}
        onChange={(e) => onChange(e.target.value)}
        disabled={isGenerating || disabled}
      />
      <div className="mt-3 flex items-center justify-between">
        <div>
          {tooShort ? (
            <p className="text-xs text-destructive">
              Add more detail (at least 10 characters)
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              {brief.length > 0
                ? `${brief.length} characters`
                : "Or try an example below"}
            </p>
          )}
        </div>
        <Button
          onClick={onGenerate}
          disabled={!brief.trim() || brief.trim().length < 10 || isGenerating || disabled}
          size="lg"
          className="transition-all duration-200 hover:scale-[1.02]"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate plan
            </>
          )}
        </Button>
      </div>

      {!brief && (
        <div className="mt-4 flex flex-wrap gap-2">
          {EXAMPLE_BRIEFS.map((example, i) => (
            <button
              key={i}
              onClick={() => onChange(example)}
              className="rounded-lg border border-border bg-surface-subtle px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200 text-left"
            >
              {example.length > 60 ? example.slice(0, 57) + "…" : example}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
