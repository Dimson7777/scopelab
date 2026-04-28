import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

const STEPS = [
  "Reading your brief…",
  "Identifying features and requirements…",
  "Scoping the development work…",
  "Estimating timeline…",
  "Calculating pricing…",
  "Writing task breakdown…",
  "Drafting client proposal…",
];

interface GenerationLoaderProps {
  step: number;
}

export default function GenerationLoader({ step }: GenerationLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mt-8 rounded-2xl border border-border bg-card p-8 shadow-card"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        </div>
        <div className="space-y-2.5 w-full max-w-sm">
          {STEPS.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: i <= step ? 1 : 0.2,
                x: 0,
              }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className={`flex items-center gap-2.5 text-sm ${
                i === step
                  ? "text-foreground font-medium"
                  : i < step
                  ? "text-muted-foreground"
                  : "text-muted-foreground/30"
              }`}
            >
              {i < step ? (
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              ) : i === step ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-border shrink-0" />
              )}
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export { STEPS };
