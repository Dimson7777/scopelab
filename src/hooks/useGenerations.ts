import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { FREE_GENERATION_LIMIT } from "@/lib/constants";
import type { GeneratedPlan } from "@/lib/planGenerator";

export interface Generation {
  id: string;
  brief: string;
  result: GeneratedPlan;
  created_at: string;
}

export function useGenerations() {
  const { user } = useAuth();

  const { data: generations = [], isLoading, refetch } = useQuery({
    queryKey: ["generations", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("generations")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as Generation[];
    },
    enabled: !!user,
  });

  const remaining = Math.max(0, FREE_GENERATION_LIMIT - generations.length);
  const hasReachedLimit = generations.length >= FREE_GENERATION_LIMIT;

  return {
    generations,
    isLoading,
    refetch,
    remaining,
    hasReachedLimit,
    FREE_LIMIT: FREE_GENERATION_LIMIT,
  };
}
