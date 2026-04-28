import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-border/40 bg-[length:200%_100%] animate-shimmer",
        "bg-[linear-gradient(90deg,hsl(var(--muted)/0.3)_0%,hsl(var(--muted)/0.55)_50%,hsl(var(--muted)/0.3)_100%)]",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
