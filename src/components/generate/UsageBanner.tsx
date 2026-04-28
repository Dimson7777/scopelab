import { Zap } from "lucide-react";

interface UsageBannerProps {
  remaining: number;
  total: number;
  hasReachedLimit: boolean;
}

export default function UsageBanner({
  remaining,
  total,
  hasReachedLimit,
}: UsageBannerProps) {
  if (hasReachedLimit) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 mb-6">
        <div className="flex items-start gap-3">
          <Zap className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Free plan limit reached
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              You've used all {total} free generations. Upgrade to continue
              generating project plans.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (remaining <= 3) {
    return (
      <div className="rounded-xl border border-border bg-surface-subtle p-3 mb-6">
        <p className="text-xs text-muted-foreground text-center">
          <span className="font-medium text-foreground">{remaining}</span> of{" "}
          {total} free generations remaining
        </p>
      </div>
    );
  }

  return null;
}
