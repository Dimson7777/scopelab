import { supabase } from "@/integrations/supabase/client";
import type { GeneratedPlan } from "@/lib/planGenerator";

export async function generatePlanFromAPI(brief: string): Promise<GeneratedPlan> {
  const { data, error } = await supabase.functions.invoke("generate-plan", {
    body: { brief },
  });

  if (error) {
    throw new Error(error.message || "Failed to generate plan");
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data as GeneratedPlan;
}

export async function saveGeneration(
  userId: string,
  brief: string,
  result: GeneratedPlan
) {
  const { error } = await supabase.from("generations").insert({
    user_id: userId,
    brief,
    result: result as any,
  } as any);
  if (error) throw error;
}
