import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "@/components/dashboard/DashboardNav";
import BriefInput from "@/components/generate/BriefInput";
import GenerationLoader, { STEPS } from "@/components/generate/GenerationLoader";
import PlanResult from "@/components/generate/PlanResult";
import UsageBanner from "@/components/generate/UsageBanner";
import GenerationHistory from "@/components/generate/GenerationHistory";
import { AnimatePresence } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";
import { useGenerations } from "@/hooks/useGenerations";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { generatePlanFromAPI, saveGeneration } from "@/lib/generatePlanAPI";
import type { GeneratedPlan } from "@/lib/planGenerator";

const Generate = () => {
  const [brief, setBrief] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<GeneratedPlan | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const { user } = useAuth();
  const { generations, refetch, remaining, hasReachedLimit, FREE_LIMIT } =
    useGenerations();

  useEffect(() => {
    if (!isGenerating) return;
    const interval = setInterval(() => {
      setLoadingStep((prev) =>
        prev < STEPS.length - 1 ? prev + 1 : prev
      );
    }, 1500);
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async () => {
    if (!brief.trim() || brief.trim().length < 10) return;
    if (hasReachedLimit) {
      toast.error("You've reached your free generation limit.");
      return;
    }

    setIsGenerating(true);
    setResult(null);
    setLoadingStep(0);
    setSaved(false);
    setError(null);

    try {
      const plan = await generatePlanFromAPI(brief);
      setResult(plan);

      // Save to generation history
      if (user) {
        await saveGeneration(user.id, brief, plan);
        refetch();
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Generation failed. Try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    await addProject.mutateAsync({
      title: result.title,
      client_brief: brief,
      scope: result.scope,
      timeline: result.timeline,
      price_range: result.priceRange,
      tasks: result.tasks,
      status: "planning",
    });
    setSaved(true);
    toast.success("Saved to dashboard");
  };

  const handleSelectHistory = (gen: typeof generations[0]) => {
    setBrief(gen.brief);
    setResult(gen.result);
    setSaved(false);
    setError(null);
  };

  return (
    <div className="min-h-screen">
      <DashboardNav />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-foreground">
            New project plan
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Paste the client brief. You'll get a scope, timeline, price range,
            and proposal draft in about a minute.
          </p>
        </div>

        <UsageBanner
          remaining={remaining}
          total={FREE_LIMIT}
          hasReachedLimit={hasReachedLimit}
        />

        <BriefInput
          brief={brief}
          onChange={setBrief}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          disabled={hasReachedLimit}
        />

        <AnimatePresence>
          {isGenerating && <GenerationLoader step={loadingStep} />}
        </AnimatePresence>

        {error && !isGenerating && (
          <div className="mt-8 rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
            <p className="text-sm text-foreground font-medium mb-2">
              Something went wrong
            </p>
            <p className="text-xs text-muted-foreground mb-4">{error}</p>
            <button
              onClick={handleGenerate}
              className="text-sm font-medium text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        <AnimatePresence>
          {result && !isGenerating && (
            <PlanResult
              plan={result}
              onRegenerate={handleGenerate}
              onSave={handleSave}
              saved={saved}
              onViewDashboard={() => navigate("/dashboard")}
            />
          )}
        </AnimatePresence>

        <GenerationHistory
          generations={generations}
          onSelect={handleSelectHistory}
        />
      </main>
    </div>
  );
};

export default Generate;
