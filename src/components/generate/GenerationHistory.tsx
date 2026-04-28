import { formatDistanceToNow } from "date-fns";
import { Clock } from "lucide-react";
import type { Generation } from "@/hooks/useGenerations";

interface GenerationHistoryProps {
  generations: Generation[];
  onSelect: (gen: Generation) => void;
}

export default function GenerationHistory({
  generations,
  onSelect,
}: GenerationHistoryProps) {
  if (generations.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">
        Previous generations
      </h2>
      <div className="space-y-2">
        {generations.slice(0, 5).map((gen) => (
          <button
            key={gen.id}
            onClick={() => onSelect(gen)}
            className="w-full text-left rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-card hover:-translate-y-px"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {gen.result.title}
                </p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {gen.brief}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(gen.created_at), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
