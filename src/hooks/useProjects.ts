import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Tables } from "@/integrations/supabase/types";

export type Project = Tables<"projects">;

export function useProjects() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading, isError, error } = useQuery({
    queryKey: ["projects", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Project[];
    },
    enabled: !!user,
    retry: 2,
  });

  const addProject = useMutation({
    mutationFn: async (project: {
      title: string;
      client_brief: string;
      scope: string;
      timeline: string;
      price_range: string;
      tasks: string[];
      status?: string;
    }) => {
      const { data, error } = await supabase
        .from("projects")
        .insert({ ...project, user_id: user!.id } as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  const deleteProject = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  const updateProject = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Project> & { id: string }) => {
      const { data, error } = await supabase
        .from("projects")
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  const duplicateProject = useMutation({
    mutationFn: async (id: string) => {
      const original = projects.find((p) => p.id === id);
      if (!original) throw new Error("Project not found");
      const { data, error } = await supabase
        .from("projects")
        .insert({
          user_id: user!.id,
          title: `${original.title} (copy)`,
          client_brief: original.client_brief,
          scope: original.scope,
          timeline: original.timeline,
          price_range: original.price_range,
          tasks: original.tasks,
          status: "draft",
        } as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  return {
    projects,
    isLoading,
    isError,
    error,
    addProject,
    deleteProject,
    updateProject,
    duplicateProject,
  };
}
